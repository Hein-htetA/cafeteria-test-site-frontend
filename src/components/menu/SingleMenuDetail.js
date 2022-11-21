import React from "react";
import "./SingleMenuDetail.css";
import { useParams } from "react-router-dom";
import { useMenuContext } from "../../Context/MenuContext";
import image from "./img1.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { faXmark, faCamera } from "@fortawesome/free-solid-svg-icons";

const SingleMenuDetail = () => {
  const { menuId } = useParams();
  const menuData = useMenuContext();
  const menu = menuData.find((menu) => menu.id === parseInt(menuId));
  console.log("menu", menu);
  return (
    <div className="detail-container">
      <div className="image-info-container">
        <div className="img-container">
          <img src={image} alt="food" width="100" height="100" />
          <label for="inputTag">
            <FontAwesomeIcon icon={faCamera} bounce />
            <input
              id="inputTag"
              type="file"
              accept="image/png, image/jpg, image/gif, image/jpeg"
              style={{ display: "none" }}
            />
          </label>
        </div>
        <div className="info-container">
          <div className="food-title-box">
            <input className="food-title" value={menu.name} />
            <div className="title-icon">
              <FontAwesomeIcon icon={faPenToSquare} />
            </div>
          </div>
          <div className="food-price-box">
            <div className="price-postfix">
              <input className="food-price" value={menu.price} />
              <span className="postfix">MMK</span>
            </div>
            <div className="price-icon">
              <FontAwesomeIcon icon={faPenToSquare} />
            </div>
          </div>
          <div className="textarea-container">
            <textarea className="description" value={menu.description}>
              <FontAwesomeIcon icon={faPenToSquare} />
            </textarea>
            <span className="textarea-icon">
              <FontAwesomeIcon icon={faPenToSquare} />
            </span>
          </div>
        </div>
      </div>
      <div className={"order-btn-container"}>
        <div className="remove-btn-container">
          <button className="remove-order-btn">
            <FontAwesomeIcon icon={faXmark} />
            Remove
          </button>
        </div>
        <div className="save-cancel-container">
          <button className="save-change-btn">Save</button>
          <button className="cancel-change-btn">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default SingleMenuDetail;
