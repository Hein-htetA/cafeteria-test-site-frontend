import React from "react";
import { useOrderContext } from "../../Context/OrderContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import "./index.css";
import SingleOrder from "../order/SingleOrder";

const History = () => {
  const { data } = useOrderContext();
  return (
    <div className="trashbin-container">
      <div className="trashbin-title">History</div>
      {data
        .filter((order) => order.orderState === "history")
        .map((order) => (
          <SingleOrder {...order} key={order.id} isRecycleBin={true} />
        ))}
    </div>
  );
};

export default History;
