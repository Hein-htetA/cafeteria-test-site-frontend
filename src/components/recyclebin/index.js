import React from "react";
import { useOrderContext } from "../../Context/OrderContext";
import "./index.css";
import SingleOrder from "../order/SingleOrder";
import { displayOrder } from "../order";

const RecycleBin = () => {
  const { data } = useOrderContext();
  return (
    <div className="trashbin-container">
      <div className="trashbin-title">Recycle Bin</div>
      {data
        .filter((order) => order.orderState === "recycleBin")
        .map((order) => (
          <SingleOrder {...order} key={order._id} />
        ))}
    </div>
  );
};

export default RecycleBin;
