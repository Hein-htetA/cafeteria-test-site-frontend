import React from "react";
import { useOrderContext } from "../../Context/OrderContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import "./index.css";
import SingleOrder from "../order/SingleOrder";

const TrashBin = () => {
  const { data } = useOrderContext();
  return (
    <div className="trashbin-container">
      <div className="trashbin-title">Trash Bin</div>
      {data
        .filter((order) => order.status === "trashBin")
        .map((order) => (
          <SingleOrder {...order} key={order.id} isTrashBin={true} />
        ))}
    </div>
  );
};

export default TrashBin;
