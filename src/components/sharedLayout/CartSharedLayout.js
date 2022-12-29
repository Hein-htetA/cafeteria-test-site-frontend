import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useCartContext } from "../../Context/CartContext";
import { useUserContext } from "../../Context/UserContext";
import CartNavBar from "../cart/CartNavBar";
import { localBaseUrl } from "../utils/baseUrl";
import "./CartSharedLayout.css";

const CartSharedLayout = () => {
  const { user } = useUserContext();
  const { setOrderHistoryLoading, setOrderHistory, orderHistory } =
    useCartContext();

  useEffect(() => {
    if (orderHistory.length !== 0) return; //dont fetch when there is already order history
    const fetchOrder = async () => {
      try {
        //setOrderLoading();
        const controller = new AbortController();
        setOrderHistoryLoading();
        const response = await fetch(
          `${localBaseUrl}/orders/customer/${user._id}`,
          {
            signal: controller.signal,
          }
        );
        if (!response.ok) {
          const message = `An error has occured: ${response.status}`;
          throw new Error(message);
        }
        const { orderHistory } = await response.json();
        setOrderHistoryLoading();
        setOrderHistory(orderHistory);
        //orderFetchSuccessful();
        // console.log("data", responseData.data);
      } catch (e) {
        //setOrderError();
        console.log(e);
      }
    };
    fetchOrder();
  }, []);

  return (
    <div className="cart-shared-layout-container">
      <CartNavBar />
      <Outlet />
    </div>
  );
};

export default CartSharedLayout;
