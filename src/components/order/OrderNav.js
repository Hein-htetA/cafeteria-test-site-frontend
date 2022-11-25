import React, { useState } from "react";
import "./OrderNav.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight, faCaretLeft } from "@fortawesome/free-solid-svg-icons";
import { useUiContext } from "../../Context/UiContext";

const OrderNav = (props) => {
  const { onClick1, onClick3 } = props;
  const { orderNav, toggleOrderNav } = useUiContext();

  return (
    <div
      className={
        orderNav
          ? "order-nav-container"
          : "order-nav-container order-nav-container-hidden"
      }
    >
      <button className="order-nav-icon" onClick={toggleOrderNav}>
        {orderNav ? (
          <FontAwesomeIcon icon={faCaretRight} />
        ) : (
          <FontAwesomeIcon icon={faCaretLeft} />
        )}
      </button>
      <div className="btn-container">
        <button onClick={onClick1}>Order Queue</button>
        <hr />
        <button onClick={onClick3}>On Delivery</button>
      </div>
    </div>
  );
};

export default OrderNav;
