import React from "react";
import { useOrderContext } from "../../Context/OrderContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import "./index.css";
import SingleOrder from "../order/SingleOrder";

const RecycleBin = () => {
  const { data } = useOrderContext();
  return (
    <div className="trashbin-container">
      <div className="trashbin-title">Recycle Bin</div>
      {data
        .filter((order) => order.status === "recycleBin")
        .map((order) => (
          <SingleOrder {...order} key={order.id} isRecycleBin={true} />
        ))}
    </div>
  );
};

export default RecycleBin;
