import React, { useEffect, useRef, useState } from "react";
import "./NewSingleMenu.css";
import { useParams } from "react-router-dom";
import { useMenuContext } from "../../Context/MenuContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCloudArrowUp,
  faCamera,
  faArrowRotateRight,
} from "@fortawesome/free-solid-svg-icons";
import Resizer from "react-image-file-resizer";
import MenuDeleteLoading from "./MenuDelete/MenuDeleteLoading";
import { defaultImageUrl, localBaseUrl } from "../utils/baseUrl";
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
  const { addNewMenu, restaurant } = useMenuContext();

  const [menu, setMenu] = useState({
    name: "",
    price: "",
    description: "",
    menuPhotoUrl: "",
    menuPhotoId: "",
    menuImage: "",
    imageError: false,
    nameError: false,
    priceError: false,
    saveLoading: false,
    saveError: false,
    saveSuccess: false,
  });

  const onChangeName = (e) => {
    setMenu({
      ...menu,
      name: e.target.value,
      nameError: false,
      saveSuccess: false,
      saveError: false,
    });
  };

  const onChangePrice = (e) => {
    setMenu({
      ...menu,
      price: e.target.value,
      priceError: false,
      saveError: false,
      saveSuccess: false,
    });
  };

  const onChangeDescription = (e) => {
    setMenu({ ...menu, description: e.target.value });
  };

  const onChangeImage = async (e) => {
    if (e.target.files[0].size > 6000000) {
      setMenu({ ...menu, imageError: true });
      return;
    }
    try {
      const image = await resizeFile(e.target.files[0]);
      setMenu({ ...menu, menuImage: image, imageError: false });
    } catch (err) {
      console.log(err);
    }
  };

  const addMenuServer = async () => {
    const error = {};
    if (menu.name.length < 1) {
      error.nameError = true;
    }

    if (menu.price.toString().length < 1) {
      error.priceError = true;
    }

    setMenu({ ...menu, ...error });

    if (menu.name.length < 1 || menu.price.toString().length < 1) {
      return;
    }

    const { name, price, description, menuPhotoId, menuPhotoUrl, menuImage } =
      menu;
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        name,
        price,
        description,
        menuPhotoId,
        menuPhotoUrl,
        menuImage,
        restaurantId: restaurant._id,
        category: menuCategory,
      }),
    };

    try {
      setMenu({
        ...menu,
        saveLoading: true,
        saveError: false,
        saveSuccess: false,
      });

      const response = await fetch(`${localBaseUrl}/menu`, requestOptions);

      if (!response.ok) {
        throw new Error("Update Failed");
      }

      const { addedMenu } = await response.json();
      addNewMenu(addedMenu);

      setMenu({
        name: "",
        price: "",
        description: "",
        menuPhotoUrl: "",
        menuPhotoId: "",
        menuImage: "",
        imageError: false,
        nameError: false,
        priceError: false,
        saveLoading: false,
        saveError: false,
        saveSuccess: true,
      });
    } catch (error) {
      setMenu({
        ...menu,
        saveLoading: false,
        saveError: true,
        saveSuccess: false,
      });
      console.log(error);
    }
  };

  const resetMenu = () => {
    setMenu({
      name: "",
      price: "",
      description: "",
      menuPhotoUrl: "",
      menuPhotoId: "",
      menuImage: "",
      imageError: false,
      nameError: false,
      priceError: false,
      saveLoading: false,
      saveError: false,
      saveSuccess: false,
    });
  };

  return (
    <div className="detail-container">
      <div className="image-info-container">
        <div className="img-container">
          <img
            src={menu.menuImage || menu.menuPhotoUrl || defaultImageUrl}
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
          {menu.imageError && (
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
                menu.nameError ? "food-title food-title-error" : "food-title"
              }
              value={menu.name}
              onChange={onChangeName}
              placeholder="Name"
            />
            <div
              className={
                menu.nameError ? "error-msg" : "error-msg error-msg-hidden"
              }
            >
              required
            </div>
          </div>
          <div className="food-price-box">
            <div
              className={
                menu.priceError
                  ? "price-postfix price-postfix-error"
                  : "price-postfix"
              }
            >
              <input
                type={"number"}
                className={"food-price"}
                value={menu.price}
                placeholder="Price"
                onChange={onChangePrice}
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
                menu.priceError ? "error-msg" : "error-msg error-msg-hidden"
              }
            >
              required
            </div>
          </div>
          <div className="textarea-container">
            <textarea
              className={"description"}
              value={menu.description}
              onChange={onChangeDescription}
            ></textarea>
          </div>
        </div>
        {menu.saveLoading && <MenuDeleteLoading />}
      </div>
      <div className="upload-clear-container">
        <button
          className="upload-btn"
          onClick={addMenuServer}
          disabled={menu.deleteConfirmationBox || menu.saveLoading}
        >
          <FontAwesomeIcon
            icon={faCloudArrowUp}
            style={{
              display: menu.saveError ? "none" : "block",
              marginRight: "5px",
            }}
          />
          {menu.saveLoading ? (
            <div style={{ minWidth: "60px" }}>Uploading...</div>
          ) : menu.saveSuccess ? (
            <div style={{ minWidth: "60px" }}>Uploaded!</div>
          ) : menu.saveError ? (
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
          onClick={resetMenu}
          disabled={menu.deleteConfirmationBox || menu.saveLoading}
        >
          <div style={{ minWidth: "60px" }}>Clear</div>
        </button>
      </div>
    </div>
  );
};

export default NewSingleMenu;
