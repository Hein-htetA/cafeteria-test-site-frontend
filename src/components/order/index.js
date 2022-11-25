import { text } from "@fortawesome/fontawesome-svg-core";
import React, { useEffect, useRef, useState } from "react";
import { useOrderContext } from "../../Context/OrderContext";
import EmptyOrder from "./EmptyOrder";
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

const displayOrder = (data, type) => {
  const afterFilter = data.filter(
    (order) => order.status === type && order.orderState === "order"
  );
  if (afterFilter.length === 0) {
    return <EmptyOrder />;
  }
  return afterFilter.map((order) => <SingleOrder {...order} key={order.id} />);
};

const Order = () => {
  const { data } = useOrderContext();
  const orderReceivedRef = useRef(null);
  const orderAcceptedRef = useRef(null);
  const onDeliveryRef = useRef(null);
  // console.log("order rerender");

  const onClick1 = () => {
    window.scrollTo(0, orderAcceptedRef.current.offsetTop);
  };
  const onClick2 = () => {
    window.scrollTo(0, orderReceivedRef.current.offsetTop);
  };
  const onClick3 = () => {
    window.scrollTo(0, onDeliveryRef.current.offsetTop);
  };

  return (
    <main className="order-container">
      <OrderNav {...{ onClick1, onClick2, onClick3 }} />
      <h3 ref={orderAcceptedRef}>Order Queue</h3>
      {displayOrder(data, "accepted")}

      <h3 ref={onDeliveryRef}>On Delivery</h3>
      {displayOrder(data, "onDelivery")}
    </main>
  );
};

export default Order;
