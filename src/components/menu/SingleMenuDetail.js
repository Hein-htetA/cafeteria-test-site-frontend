import React, { useRef } from "react";
import "./SingleMenuDetail.css";
import { useParams } from "react-router-dom";
import { useMenuContext } from "../../Context/MenuContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { faXmark, faCamera } from "@fortawesome/free-solid-svg-icons";

const SingleMenuDetail = () => {
  const { menuId } = useParams();
  const { menuData, editInput, stopAnimation, onChangeInput, onChangeImage } =
    useMenuContext();
  const menu = menuData.find((menu) => menu.id === parseInt(menuId));
  const nameRef = useRef();
  const priceRef = useRef();
  const descriptionRef = useRef();

  //console.log("menu", menu);
  return (
    <div className="detail-container">
      <div className="image-info-container">
        <div className="img-container">
          <img src={menu.image} alt="uploadImg" />
          <label htmlFor="inputTag">
            <FontAwesomeIcon icon={faCamera} bounce />
            <input
              id="inputTag"
              type="file"
              accept="image/png, image/jpg, image/gif, image/jpeg"
              onChange={(e) => onChangeImage(menu.id, e.target.files[0])}
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
                menu.nameEdit ? "food-title food-title-edit" : "food-title"
              }
              value={menu.name}
              readOnly={menu.nameEdit ? false : true}
              ref={nameRef}
              onChange={(e) => onChangeInput(menu.id, "name", e.target.value)}
            />
            <button
              className={
                menu.beatOnce.firstBtn
                  ? "title-icon icon-animation"
                  : "title-icon"
              }
              onClick={() =>
                editInput(menu.id, "nameEdit", "name", "firstBtn", nameRef)
              }
              onAnimationEnd={() => stopAnimation(menu.id, "firstBtn")}
            >
              <FontAwesomeIcon icon={faPenToSquare} />
            </button>
          </div>
          <div className="food-price-box">
            <div
              className={
                menu.priceEdit
                  ? "price-postfix price-postfix-edit"
                  : "price-postfix"
              }
            >
              <input
                type={"number"}
                className={"food-price"}
                value={menu.price}
                readOnly={menu.priceEdit ? false : true}
                ref={priceRef}
                onChange={(e) =>
                  onChangeInput(menu.id, "price", e.target.value)
                }
              />
              <span className="postfix">MMK</span>
            </div>
            <button
              className={
                menu.beatOnce.secondBtn
                  ? "price-icon icon-animation"
                  : "price-icon"
              }
              onClick={() =>
                editInput(menu.id, "priceEdit", "price", "secondBtn", priceRef)
              }
              onAnimationEnd={() => stopAnimation(menu.id, "secondBtn")}
            >
              <FontAwesomeIcon icon={faPenToSquare} />
            </button>
          </div>
          <div className="textarea-container">
            <textarea
              className={
                menu.descriptionEdit
                  ? "description description-edit"
                  : "description"
              }
              value={menu.description}
              readOnly={menu.descriptionEdit ? false : true}
              ref={descriptionRef}
              onChange={(e) =>
                onChangeInput(menu.id, "description", e.target.value)
              }
            >
              <FontAwesomeIcon icon={faPenToSquare} />
            </textarea>
            <button
              className={
                menu.beatOnce.thirdBtn
                  ? "textarea-icon icon-animation"
                  : "textarea-icon"
              }
              onClick={() =>
                editInput(
                  menu.id,
                  "descriptionEdit",
                  "description",
                  "thirdBtn",
                  descriptionRef
                )
              }
              onAnimationEnd={() => stopAnimation(menu.id, "thirdBtn")}
            >
              <FontAwesomeIcon icon={faPenToSquare} />
            </button>
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
