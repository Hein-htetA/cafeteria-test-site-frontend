import React, { useState } from "react";
import "./NewSingleMenu.css";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCloudArrowUp,
  faCamera,
  faArrowRotateRight,
} from "@fortawesome/free-solid-svg-icons";
import Resizer from "react-image-file-resizer";
import MenuDeleteLoading from "./MenuDelete/MenuDeleteLoading";
import { defaultImageUrl } from "../utils/baseUrl";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewMenu,
  resetAddNewMenuStatus,
} from "../../features/restaurantSlice";
const resizeFile = (file) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      800,
      800,
      "JPEG",
      90,
      0,
      (uri) => {
        resolve(uri);
      },
      "base64"
    );
  });

const NewSingleMenu = () => {
  const { menuCategory } = useParams();

  const [formValues, setFormValues] = useState({
    name: "",
    price: "",
    description: "",
    menuPhotoUrl: "",
    menuPhotoId: "",
    menuImage: "",
  });

  const [formErrors, setFormErrors] = useState({
    imageError: false,
    nameError: false,
    priceError: false,
  });

  const addNewMenuStatus = useSelector(
    (state) => state.restaurant.addNewMenuStatus
  );

  const dispatch = useDispatch();

  const onChangeInput = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
    setFormErrors({
      imageError: false,
      nameError: false,
      priceError: false,
    });
    dispatch(resetAddNewMenuStatus());
  };

  const onChangeImage = async (e) => {
    if (e.target.files[0].size > 6000000) {
      setFormErrors({ ...formErrors, imageError: true });
      return;
    }
    try {
      const image = await resizeFile(e.target.files[0]);
      setFormValues({ ...formValues, menuImage: image });
      setFormErrors({
        imageError: false,
        nameError: false,
        priceError: false,
      });
      dispatch(resetAddNewMenuStatus());
    } catch (err) {
      console.log(err);
    }
  };

  const handleAddNewMenu = async () => {
    const error = {};
    if (formValues.name.length < 1) {
      error.nameError = true;
    }

    if (formValues.price.toString().length < 1) {
      error.priceError = true;
    }

    setFormErrors(error);
    if (Object.keys(error).length !== 0) return;
    await dispatch(addNewMenu({ formValues, menuCategory })).unwrap();
    setFormValues({
      name: "",
      price: "",
      description: "",
      menuPhotoUrl: "",
      menuPhotoId: "",
      menuImage: "",
    });
  };

  const resetForm = () => {
    setFormValues({
      name: "",
      price: "",
      description: "",
      menuPhotoUrl: "",
      menuPhotoId: "",
      menuImage: "",
    });
  };

  return (
    <div className="detail-container">
      <div className="image-info-container">
        <div className="img-container">
          <img
            src={
              formValues.menuImage || formValues.menuPhotoUrl || defaultImageUrl
            }
            alt="uploadImg"
          />
          <label htmlFor="inputTag">
            <FontAwesomeIcon icon={faCamera} />
            <input
              id="inputTag"
              type="file"
              accept="image/png, image/jpg, image/gif, image/jpeg"
              onChange={onChangeImage}
              style={{ display: "none" }}
            />
          </label>
          {formErrors.imageError && (
            <div className="image-error-message">
              <div className="image-error-message-first">
                Image Size {">"} 6MB
              </div>
              <div className="image-error-message-second">
                Upload Unsuccessful!
              </div>
            </div>
          )}
        </div>
        <div className="info-container">
          <div className="food-title-box">
            <input
              className={
                formErrors.nameError
                  ? "food-title food-title-error"
                  : "food-title"
              }
              name="name"
              value={formValues.name}
              onChange={onChangeInput}
              placeholder="Name"
            />
            <div
              className={
                formErrors.nameError
                  ? "error-msg"
                  : "error-msg error-msg-hidden"
              }
            >
              required
            </div>
          </div>
          <div className="food-price-box">
            <div
              className={
                formErrors.priceError
                  ? "price-postfix price-postfix-error"
                  : "price-postfix"
              }
            >
              <input
                type={"number"}
                name="price"
                className={"food-price"}
                value={formValues.price}
                placeholder="Price"
                onChange={onChangeInput}
                onKeyDown={(event) => {
                  if (!/[0-9]/.test(event.key) && event.key !== "Backspace") {
                    event.stopPropagation();
                    event.preventDefault();
                  }
                }}
              />
              <span className="postfix">MMK</span>
            </div>
            <div
              className={
                formErrors.priceError
                  ? "error-msg"
                  : "error-msg error-msg-hidden"
              }
            >
              required
            </div>
          </div>
          <div className="textarea-container">
            <textarea
              name="description"
              className={"description"}
              value={formValues.description}
              onChange={onChangeInput}
            ></textarea>
          </div>
        </div>
        {addNewMenuStatus === "loading" && <MenuDeleteLoading />}
      </div>
      <div className="upload-clear-container">
        <button
          className="upload-btn"
          onClick={handleAddNewMenu}
          disabled={addNewMenuStatus === "loading"}
        >
          <FontAwesomeIcon
            icon={faCloudArrowUp}
            style={{
              display: addNewMenuStatus === "failed" ? "none" : "block",
              marginRight: "5px",
            }}
          />
          {addNewMenuStatus === "loading" ? (
            <div style={{ minWidth: "60px" }}>Uploading...</div>
          ) : addNewMenuStatus === "succeeded" ? (
            <div style={{ minWidth: "60px" }}>Uploaded!</div>
          ) : addNewMenuStatus === "failed" ? (
            <div>
              <FontAwesomeIcon
                icon={faArrowRotateRight}
                style={{ marginRight: "5px" }}
              />
              Try again!
            </div>
          ) : (
            <div>Upload</div>
          )}
        </button>
        <button
          className="cancel-change-btn"
          onClick={resetForm}
          disabled={addNewMenuStatus === "loading"}
        >
          <div style={{ minWidth: "60px" }}>Clear</div>
        </button>
      </div>
    </div>
  );
};

export default NewSingleMenu;
