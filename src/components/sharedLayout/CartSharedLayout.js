import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { useCartContext } from "../../Context/CartContext";
import { useUserContext } from "../../Context/UserContext";
import { fetchOrder } from "../../features/cartSlice";
import CartNavBar from "../cart/CartNavBar";
import { localBaseUrl } from "../utils/baseUrl";
import "./CartSharedLayout.css";

const CartSharedLayout = () => {
  const { user } = useUserContext();
  // const { setOrderHistoryLoading, setOrderHistory, orderHistory } =
  //   useCartContext();

  const orderHistory = useSelector((state) => state.cart.orderHistory);

  const dispatch = useDispatch();

  useEffect(() => {
    if (orderHistory.length !== 0) return;
    //dont fetch when there is already order history
    dispatch(fetchOrder());
  }, []);

  return (
    <div className="cart-shared-layout-container">
      <CartNavBar />
      <Outlet />
    </div>
  );
};

export default CartSharedLayout;
