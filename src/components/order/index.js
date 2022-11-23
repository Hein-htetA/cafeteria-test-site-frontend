import { text } from "@fortawesome/fontawesome-svg-core";
import React, { useEffect, useRef, useState } from "react";
import { useOrderContext } from "../../Context/OrderContext";
import "./index.css";
import OrderNav from "./OrderNav";
import SingleOrder from "./SingleOrder";

const Order = () => {
  const { data } = useOrderContext();
  const [activeState, setActiveState] = useState({
    queue: true,
    newOrder: false,
    delivery: false,
  });

  //console.log("order rerender");
  console.log("active state outside", activeState);
  const orderReceivedRef = useRef(null);
  const orderAcceptedRef = useRef(null);
  const onDeliveryRef = useRef(null);

  const onClick1 = () => {
    console.log("scrollY", window.scrollY);
    console.log("offsetTop", orderReceivedRef.current.offsetTop);
    // window.scrollTo(0, onDeliveryRef.current.offsetTop);
  };
  const onClick2 = () => {
    orderReceivedRef.current.scrollIntoView();
  };
  const onClick3 = () => {
    onDeliveryRef.current.scrollIntoView();
  };

  useEffect(() => {
    const handleScroll = () => {
      // console.log("window.scrollY", window.scrollY);
      // console.log("offsetTop acc", orderAcceptedRef.current.offsetTop);
      // console.log("offsetTop rec", orderReceivedRef.current.offsetTop);
      // console.log("offsetTop deli", onDeliveryRef.current.offsetTop);
      let copyState = {
        queue: false,
        newOrder: false,
        delivery: false,
      };
      if (orderAcceptedRef.current.offsetTop - window.scrollY < 150) {
        console.log("scroll exceed orderAcctp by 150");
        copyState = {
          queue: true,
          newOrder: false,
          delivery: false,
        };
      }
      if (orderReceivedRef.current.offsetTop - window.scrollY < 150) {
        console.log("scroll exceed orderRec by 150");
        copyState = {
          queue: false,
          newOrder: true,
          delivery: false,
        };
      }
      if (onDeliveryRef.current.offsetTop - window.scrollY < 150) {
        console.log("scroll exceed dekuverty by 150");
        copyState = {
          queue: false,
          newOrder: false,
          delivery: true,
        };
      }
      // console.log("copySTate", copyState);
      // console.log("activeState", activeState);

      for (const key in copyState) {
        if (copyState[key] !== activeState[key]) {
          console.log(key);
          console.log(activeState[key]);
          console.log("state updated");
          setActiveState({ ...copyState });
          break;
        }
      }
    };

    // console.log("useEffect run");
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [activeState]);

  return (
    <main className="order-container">
      <OrderNav {...{ ...activeState, onClick1, onClick2, onClick3 }} />
      <h3 ref={orderAcceptedRef}>Order Queue</h3>
      {data.map((order) => {
        return <SingleOrder {...order} key={order.id} />;
      })}

      <OrderNav {...{ ...activeState, onClick1, onClick2, onClick3 }} />
      <h3 ref={orderReceivedRef}>New Orders</h3>
      {data.map((order) => {
        return <SingleOrder {...order} key={order.id} />;
      })}

      <OrderNav {...{ ...activeState, onClick1, onClick2, onClick3 }} />
      <h3 ref={onDeliveryRef}>On Delievery</h3>
      {data.map((order) => {
        return <SingleOrder {...order} key={order.id} />;
      })}
    </main>
  );
};

export default Order;
