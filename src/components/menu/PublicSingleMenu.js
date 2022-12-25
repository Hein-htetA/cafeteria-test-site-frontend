import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useCartContext } from "../../Context/CartContext";
import { usePublicDataContext } from "../../Context/PublicDataContext";
import { defaultImageUrl } from "../utils/baseUrl";
import FullCart from "./MenuLoadingError/FullCart";
import "./PublicSingleMenu.css";

const PublicSingleMenu = (props) => {
  const { name, menuPhotoUrl, price, _id, restaurantId } = props.menu;
  const { restaurants } = usePublicDataContext();

  //to add to cart(it is required to extract restaurant name in cart)
  const restaurant = restaurants.find(
    (restaurant) => restaurant._id === restaurantId
  );

  const { addToCart, cart } = useCartContext();

  //extract count of single menu to display
  const resInCart = cart.find((res) => res.restaurantId === restaurantId);
  let count = undefined;
  if (resInCart) {
    const menuInCart = resInCart.menuArray.find((menu) => menu._id === _id);
    if (menuInCart) {
      count = menuInCart.count;
    }
  }

  const navigate = useNavigate();
  const viewDetail = () => {
    navigate(`${_id}`);
  };
  return (
    <>
      <div className="public-item-image-container">
        <img src={menuPhotoUrl || defaultImageUrl} alt="menu" />
        <div className="public-item-btn-container">
          <button
            className="public-add-to-cart-btn"
            onClick={() => addToCart(restaurant, props.menu, 1)}
          >
            <FontAwesomeIcon icon={faCartPlus} style={{ marginRight: "5px" }} />
            Cart
          </button>
          <button className="detail-btn" onClick={viewDetail}>
            Detail
          </button>
        </div>
      </div>
      <div className="public-item-info-container">
        <h4 className="public-item-name">{name}</h4>
        <div className="public-item-price">{price} MMK</div>
        {count && <div className="public-item-count">{count}</div>}
      </div>
    </>
  );
};

export default PublicSingleMenu;
