import React from "react";
import { useOrderContext } from "../../Context/OrderContext";
import "./index.css";
import SingleOrder from "../order/SingleOrder";
import { displayOrder } from "../order";
import { useUiContext } from "../../Context/UiContext";

const RecycleBin = () => {
  const { data } = useOrderContext();
  const { orderLoading, orderError } = useUiContext();
  return (
    <div className="trashbin-container">
      <div className="trashbin-title">Recycle Bin</div>
      {displayOrder(data, "recycleBin", orderLoading, orderError)}
    </div>
  );
};

export default RecycleBin;
