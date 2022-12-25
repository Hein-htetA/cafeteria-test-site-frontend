import React from "react";
import { useOrderContext } from "../../Context/OrderContext";

import { displayOrder } from "../order";

import "../newOrder/index.css";

const RecycleBin = () => {
  const { data, orderLoading, orderError } = useOrderContext();
  return (
    <div className="trashbin-container">
      <div className="trashbin-title">Recycle Bin</div>
      {displayOrder(data, "recycleBin", orderLoading, orderError)}
    </div>
  );
};

export default RecycleBin;
