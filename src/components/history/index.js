import React from "react";
import { useOrderContext } from "../../Context/OrderContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import SingleOrder from "../order/SingleOrder";
import { displayOrder } from "../order";
import { useUiContext } from "../../Context/UiContext";

const History = () => {
  const { data } = useOrderContext();
  const { orderLoading, orderError } = useUiContext();

  return (
    <div className="trashbin-container">
      <div className="trashbin-title">Completed Orders</div>
      {displayOrder(data, "history", orderLoading, orderError)}
    </div>
  );
};

export default History;
