import React, { useEffect, useRef, useState } from "react";
import "./SingleMenuDetail.css";
import { Navigate, redirect, useNavigate, useParams } from "react-router-dom";
import { useMenuContext } from "../../Context/MenuContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import {
  faXmark,
  faCamera,
  faArrowRotateRight,
} from "@fortawesome/free-solid-svg-icons";
import Resizer from "react-image-file-resizer";
import MenuDeleteLoading from "./MenuDelete/MenuDeleteLoading";
import MenuDeleteConfirmation from "./MenuDelete/MenuDeleteConfirmation";
import { localBaseUrl, defaultImageUrl } from "../utils/baseUrl";
import { useUiContext } from "../../Context/UiContext";
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
  const [menu, setMenu] = useState({
    name: "",
    price: 0,
    description: "",
    menuPhotoUrl: "",
    menuPhotoId: "",
    menuImage: "",
  });
  const { menuId, menuCategory } = useParams();
  const { user } = useUiContext();
  const { data, updateMenuState, deleteMenuState } = useMenuContext();
  const navigate = useNavigate();

  useEffect(() => {
    const menuInitial = data.find((menu) => menu._id === menuId);
    if (!menuInitial) {
      //menu delete case
      // navigating to parent route on refresh
      navigate(`/menu/${menuCategory}`);
      return;
    }
    setMenu({ ...menuInitial, menuImage: "" });
  }, []);

  const onChangeName = (e) => {
    if (e.target.value.length < 1) {
      setMenu({ ...menu, name: e.target.value, nameError: true });
      return;
    }
    setMenu({ ...menu, name: e.target.value, nameError: false });
  };

  const onChangePrice = (e) => {
    if (e.target.value.length < 1) {
      setMenu({ ...menu, price: e.target.value, priceError: true });
      return;
    }
    setMenu({ ...menu, price: e.target.value, priceError: false });
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
      setMenu({ ...menu, imageError: true });
    }
  };

  const resetMenu = () => {
    navigate(`/myAccount/myRestaurant/${menu.category}`);
  };

  const updateMenuServer = async () => {
    const {
      _id,
      name,
      price,
      description,
      menuImage,
      menuPhotoId,
      menuPhotoUrl,
    } = menu;
    const requestOptions = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        _id,
        name,
        price,
        description,
        menuImage,
        menuPhotoUrl,
        menuPhotoId,
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

      setMenu({
        ...menu,
        saveLoading: false,
        saveError: false,
        saveSuccess: true,
      });

      navigate(`/myAccount/myRestaurant/${menu.category}`, {
        replace: true,
        state: { message: "update successful" },
      });

      if (!response.ok) {
        throw new Error("Update Failed");
      }
      const { editedMenu } = await response.json();
      console.log("editedMenu", editedMenu);
      updateMenuState(editedMenu);
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

  const deleteMenuServer = async () => {
    const { _id } = menu;
    const requestOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    };
    try {
      setMenu({
        ...menu,
        deleteLoading: true,
        deleteError: false,
        deleteConfirmationBox: false,
      });
      const response = await fetch(
        `${localBaseUrl}/menu/${user.restaurantId}/${_id}`,
        requestOptions
      );

      if (!response.ok) {
        throw new Error("Update Failed");
      }
      setMenu({
        ...menu,
        deleteLoading: false,
        deleteError: false,
        deleteSuccess: true,
      });
      deleteMenuState(_id);
      navigate(`/myAccount/myRestaurant/${menu.category}`, {
        replace: true,
        state: { message: "delete successful" },
      });
      navigate(-1); // required to prevent need to double back in browser path
    } catch (error) {
      setMenu({
        ...menu,
        deleteLoading: false,
        deleteError: true,
      });
      console.log(error);
    }
  };

  const displayDeleteConfirmationBox = () => {
    setMenu({ ...menu, deleteConfirmationBox: true });
  };

  const hideDeleteConfirmationBox = () => {
    setMenu({ ...menu, deleteConfirmationBox: false });
  };

  return (
    <div className="detail-container">
      <h2 className="category-title" onClick={resetMenu}>
        {menu.category === "curry"
          ? "rice & curries"
          : menu.category === "sideDish"
          ? "side dishes"
          : menu.category === "drink"
          ? "snacks & drinks"
          : "additionals"}
      </h2>
      <div className="image-info-container">
        <div className="img-container">
          <img
            src={menu.menuImage || menu.menuPhotoUrl || defaultImageUrl}
            alt="uploadImg"
          />
          <label
            htmlFor="inputTag"
            style={{
              opacity: menu.deleteConfirmationBox || menu.saveLoading ? 0.5 : 1,
            }}
          >
            <FontAwesomeIcon icon={faCamera} />
            <input
              id="inputTag"
              type="file"
              accept="image/png, image/jpg, image/gif, image/jpeg"
              onChange={onChangeImage}
              style={{ display: "none" }}
              disabled={menu.deleteConfirmationBox || menu.saveLoading}
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
              disabled={menu.deleteConfirmationBox || menu.saveLoading}
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
              style={{
                backgroundColor:
                  menu.deleteConfirmationBox || menu.saveLoading
                    ? "transparent"
                    : "white",
              }}
            >
              <input
                type={"number"}
                className={"food-price"}
                value={menu.price}
                placeholder="Price"
                onChange={onChangePrice}
                disabled={menu.deleteConfirmationBox || menu.saveLoading}
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
              disabled={menu.deleteConfirmationBox || menu.saveLoading}
            ></textarea>
          </div>
        </div>
        {menu.deleteLoading && <MenuDeleteLoading />}
        {menu.deleteConfirmationBox && (
          <MenuDeleteConfirmation
            deleteMenuServer={deleteMenuServer}
            hideDeleteConfirmationBox={hideDeleteConfirmationBox}
          />
        )}
      </div>
      <div className={"order-btn-container"}>
        <div className="remove-btn-container">
          <button
            className="remove-order-btn"
            onClick={displayDeleteConfirmationBox}
            disabled={menu.deleteConfirmationBox || menu.saveLoading}
          >
            <FontAwesomeIcon icon={faXmark} />
            Remove
          </button>
        </div>
        <div className="save-cancel-container">
          <button
            className="save-change-btn"
            onClick={updateMenuServer}
            disabled={
              menu.deleteConfirmationBox ||
              menu.saveLoading ||
              menu.nameError ||
              menu.priceError
            }
          >
            {menu.saveLoading ? (
              <div style={{ minWidth: "60px" }}>Saving...</div>
            ) : menu.saveSuccess ? (
              <div style={{ minWidth: "60px" }}>Saved!</div>
            ) : menu.saveError ? (
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
            disabled={menu.deleteConfirmationBox || menu.saveLoading}
          >
            <div style={{ minWidth: "60px" }}>Cancel</div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleMenuDetail;
