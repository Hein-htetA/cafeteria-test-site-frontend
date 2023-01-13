import React, { useState } from "react";
import CartContainer from "./CartContainer";
import CartRestaurantName from "../CartRestaurantName";
import ItemName from "../ItemName";
import ItemPrice from "../ItemPrice";
import SubTotal from "../SubTotal";
import Total from "../Total";
import AddMoreItems from "./AddMoreItems";
import MenuContainer from "./MenuContainer";
import ReviewPaymentBtn from "./ReviewPaymentBtn";
import ToggleItemNumber from "./ToggleItemNumber";
import MessageBox from "./MessageBox";
import { useCartContext } from "../../../Context/CartContext";
import EmptyCart from "../CartStates/EmptyCart";
import ClearCartBtn from "./ClearCartBtn";
import { useNavigate } from "react-router-dom";
import BackToCart from "../CartCheckout/Btn/BackToCart";
import FullCheckout from "./FullCheckout/FullCheckout";
import { useDispatch, useSelector } from "react-redux";
import { cartToCheckout } from "../../../features/cartSlice";

const CartMenu = () => {
  const [message, setMessage] = useState({});
  // const { cart, totalAmount, addMessage, toCheckout, crowdedCheckoutWarning } =
  //   useCartContext();

  const cart = useSelector((state) => state.cart.cart);
  const fullCheckoutWarning = useSelector(
    (state) => state.cart.fullCheckoutWarning
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const navigateToRestaurant = (restaurantId) => {
    navigate(`/marketplace/restaurant/${restaurantId}/menu`);
  };

  if (cart.length < 1) {
    return <EmptyCart />;
  }

  const onChangeTextarea = (e, restaurantId) => {
    setMessage((message) => ({ ...message, [restaurantId]: e.target.value }));
  };

  const handleReviewPayment = (restaurantId) => {
    dispatch(cartToCheckout({ restaurantId, message: message[restaurantId] }));
  };

  return cart.map((singleRestaurant) => {
    //index is for message array
    const { restaurantName, menuArray } = singleRestaurant;
    return (
      <div key={singleRestaurant.restaurantId}>
        <CartContainer>
          <CartRestaurantName
            restaurantName={restaurantName}
            restaurantId={singleRestaurant.restaurantId}
            navigateToRestaurant={navigateToRestaurant}
          />
          <ClearCartBtn restaurantId={singleRestaurant.restaurantId} />
          {menuArray.map((menu) => {
            return (
              <MenuContainer key={menu._id}>
                <ItemName
                  name={menu.name}
                  menuId={menu._id}
                  restaurantId={singleRestaurant.restaurantId}
                />
                <ToggleItemNumber
                  count={menu.count}
                  restaurantId={singleRestaurant.restaurantId}
                  menuId={menu._id}
                />
                <ItemPrice amount={menu.price * menu.count} />
              </MenuContainer>
            );
          })}
          <hr
            style={{
              border: "1px solid white",
              width: "90%",
              marginBottom: "10px",
              opacity: "0.5",
            }}
          />
          <AddMoreItems
            restaurantId={singleRestaurant.restaurantId}
            navigateToRestaurant={navigateToRestaurant}
          />
          <MessageBox
            restaurantId={singleRestaurant.restaurantId}
            message={message}
            onChangeTextarea={onChangeTextarea}
          />
        </CartContainer>
        <Total amount={singleRestaurant.restaurantTotalAmount} />
        <ReviewPaymentBtn
          handleReviewPayment={handleReviewPayment}
          restaurantId={singleRestaurant.restaurantId}
        />

        <hr
          style={{
            border: "1px solid white",
            width: "100%",
            marginBottom: "20px",
            marginTop: "20px",
          }}
        />
        {fullCheckoutWarning && <FullCheckout />}
      </div>
    );
  });
};

export default CartMenu;
