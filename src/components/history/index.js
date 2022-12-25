import React from "react";
import { useOrderContext } from "../../Context/OrderContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import SingleOrder from "../order/SingleOrder";
import { displayOrder } from "../order";
import { useUiContext } from "../../Context/UserContext";

const History = () => {
  const { data, orderLoading, orderError } = useOrderContext();

  return (
    <div className="trashbin-container">
      <div className="trashbin-title">Completed Orders</div>
      {displayOrder(data, "history", orderLoading, orderError)}
    </div>
  );
};

export default History;
