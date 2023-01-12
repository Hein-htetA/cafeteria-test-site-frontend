import React, { useState } from "react";
import "./SingleMenuDetail.css";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmark,
  faCamera,
  faArrowRotateRight,
} from "@fortawesome/free-solid-svg-icons";
import Resizer from "react-image-file-resizer";
import MenuDeleteLoading from "./MenuDelete/MenuDeleteLoading";
import MenuDeleteConfirmation from "./MenuDelete/MenuDeleteConfirmation";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteMenu,
  resetUpdateMenuStatus,
  updateMenu,
} from "../../features/restaurantSlice";
import { defaultImageUrl } from "../utils/baseUrl";
const resizeFile = (file) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      800,
      800,
      "JPEG",
      80,
      0,
      (uri) => {
        resolve(uri);
      },
      "base64"
    );
  });

const SingleMenuDetail = () => {
  const menuData = useSelector((state) => state.restaurant.menuData);
  const updateMenuStatus = useSelector(
    (state) => state.restaurant.updateMenuStatus
  );

  const { menuId, menuCategory } = useParams();

  const [formValues, setFormValues] = useState(() => ({
    ...menuData.find((menu) => menu._id === menuId),
    menuImage: "",
    deleteConfirmationBox: false,
  }));

  const [formErrors, setFormErrors] = useState({
    imageError: false,
    nameError: false,
    priceError: false,
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onChangeInput = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
    setFormErrors({
      imageError: false,
      nameError: false,
      priceError: false,
    });
    dispatch(resetUpdateMenuStatus());
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
        ...formErrors,
        imageError: false,
        nameError: false,
        priceError: false,
      });
      dispatch(resetUpdateMenuStatus());
    } catch (err) {
      console.log(err);
    }
  };

  const resetMenu = () => {
    navigate(`/myAccount/myRestaurant/menu/${formValues.category}`);
  };

  const handleUpdateMenu = async () => {
    const error = {};
    if (formValues.name.length < 1) {
      error.nameError = true;
    }

    if (formValues.price.toString().length < 1) {
      error.priceError = true;
    }

    setFormErrors(error);
    if (Object.keys(error).length !== 0) return;

    await dispatch(updateMenu(formValues)).unwrap();

    navigate(`/myAccount/myRestaurant/menu/${menuCategory}`, {
      replace: true,
      state: { message: "update successful" },
    });
  };

  const handleDeleteMenu = async () => {
    await dispatch(deleteMenu(formValues._id)).unwrap();
    navigate(`/myAccount/myRestaurant/menu/${formValues.category}`, {
      replace: true,
    });
  };

  const displayDeleteConfirmationBox = () => {
    setFormValues({ ...formValues, deleteConfirmationBox: true });
  };

  const hideDeleteConfirmationBox = () => {
    setFormValues({ ...formValues, deleteConfirmationBox: false });
  };

  return (
    <div className="detail-container">
      <h2 className="category-title" onClick={resetMenu}>
        {menuCategory === "curry"
          ? "rice & curries"
          : menuCategory === "sideDish"
          ? "side dishes"
          : menuCategory === "drink"
          ? "snacks & drinks"
          : "additionals"}
      </h2>
      <div className="image-info-container">
        <div className="img-container">
          <img
            src={
              formValues.menuImage || formValues.menuPhotoUrl || defaultImageUrl
            }
            alt="uploadImg"
          />
          <label
            htmlFor="inputTag"
            style={{
              opacity:
                formValues.deleteConfirmationBox ||
                updateMenuStatus === "loading"
                  ? 0.5
                  : 1,
            }}
          >
            <FontAwesomeIcon icon={faCamera} />
            <input
              id="inputTag"
              type="file"
              accept="image/png, image/jpg, image/gif, image/jpeg"
              onChange={onChangeImage}
              style={{ display: "none" }}
              disabled={
                formValues.deleteConfirmationBox ||
                updateMenuStatus === "loading"
              }
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
              value={formValues.name}
              name="name"
              onChange={onChangeInput}
              placeholder="Name"
              disabled={
                formValues.deleteConfirmationBox ||
                updateMenuStatus === "loading"
              }
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
              style={{
                backgroundColor:
                  formValues.deleteConfirmationBox ||
                  updateMenuStatus === "loading"
                    ? "transparent"
                    : "white",
              }}
            >
              <input
                type={"number"}
                name="price"
                className={"food-price"}
                value={formValues.price}
                placeholder="Price"
                onChange={onChangeInput}
                disabled={
                  formValues.deleteConfirmationBox ||
                  updateMenuStatus === "loading"
                }
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
              className={"description"}
              name="description"
              value={formValues.description}
              onChange={onChangeInput}
              disabled={
                formValues.deleteConfirmationBox ||
                updateMenuStatus === "loading"
              }
            ></textarea>
          </div>
        </div>
        {updateMenuStatus === "loading" && <MenuDeleteLoading />}
        {formValues.deleteConfirmationBox && (
          <MenuDeleteConfirmation
            handleDeleteMenu={handleDeleteMenu}
            hideDeleteConfirmationBox={hideDeleteConfirmationBox}
          />
        )}
      </div>
      <div className={"order-btn-container"}>
        <div className="remove-btn-container">
          <button
            className="remove-order-btn"
            onClick={displayDeleteConfirmationBox}
            disabled={
              formValues.deleteConfirmationBox || updateMenuStatus === "loading"
            }
          >
            <FontAwesomeIcon icon={faXmark} />
            Remove
          </button>
        </div>
        <div className="save-cancel-container">
          <button
            className="save-change-btn"
            onClick={handleUpdateMenu}
            disabled={
              formValues.deleteConfirmationBox || updateMenuStatus === "loading"
            }
          >
            {updateMenuStatus === "loading" ? (
              <div style={{ minWidth: "60px" }}>Saving...</div>
            ) : updateMenuStatus === "succeeded" ? (
              <div style={{ minWidth: "60px" }}>Saved!</div>
            ) : updateMenuStatus === "failed" ? (
              <div>
                <FontAwesomeIcon
                  icon={faArrowRotateRight}
                  style={{ marginRight: "5px" }}
                />
                Try again!
              </div>
            ) : (
              <div style={{ minWidth: "60px" }}>Save</div>
            )}
          </button>
          <button
            className="cancel-change-btn"
            onClick={resetMenu}
            disabled={
              formValues.deleteConfirmationBox || updateMenuStatus === "loading"
            }
          >
            <div style={{ minWidth: "60px" }}>Cancel</div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleMenuDetail;
