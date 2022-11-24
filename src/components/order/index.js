import { text } from "@fortawesome/fontawesome-svg-core";
import React, { useEffect, useRef, useState } from "react";
import { useOrderContext } from "../../Context/OrderContext";
import "./index.css";
import OrderNav from "./OrderNav";
import SingleOrder from "./SingleOrder";

const defaultStyle1 = {
  queue: true,
  newOrder: false,
  delivery: false,
};

const defaultStyle2 = {
  queue: false,
  newOrder: true,
  delivery: false,
};

const defaultStyle3 = {
  queue: false,
  newOrder: false,
  delivery: true,
};

const Order = () => {
  const { data } = useOrderContext();
  const orderReceivedRef = useRef(null);
  const orderAcceptedRef = useRef(null);
  const onDeliveryRef = useRef(null);
  console.log("order rerender");

  const onClick1 = () => {
    // console.log("onclick");
    window.scrollTo(0, orderAcceptedRef.current.offsetTop);
  };
  const onClick2 = () => {
    // console.log("onclick");
    window.scrollTo(0, orderReceivedRef.current.offsetTop);
  };
  const onClick3 = () => {
    // console.log("onclick");
    window.scrollTo(0, onDeliveryRef.current.offsetTop);
  };

  return (
    <main className="order-container">
      <OrderNav {...{ ...defaultStyle1, onClick1, onClick2, onClick3 }} />
      <h3 ref={orderAcceptedRef}>Order Queue</h3>
      {data
        .filter((order) => order.status === "accepted")
        .map((order) => {
          return <SingleOrder {...order} key={order.id} />;
        })}

      <OrderNav {...{ ...defaultStyle2, onClick1, onClick2, onClick3 }} />
      <h3 ref={orderReceivedRef}>New Order</h3>
      {data
        .filter((order) => order.status === "received")
        .map((order) => {
          return <SingleOrder {...order} key={order.id} />;
        })}

      <OrderNav {...{ ...defaultStyle3, onClick1, onClick2, onClick3 }} />
      <h3 ref={onDeliveryRef}>On Delivery</h3>
      {data
        .filter((order) => order.status === "onDelivery")
        .map((order) => {
          return <SingleOrder {...order} key={order.id} />;
        })}
    </main>
  );
};

export default Order;
