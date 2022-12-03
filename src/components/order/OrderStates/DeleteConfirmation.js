import React from "react";
import { useOrderContext } from "../../../Context/OrderContext";
import "./DeleteConfirmation.css";

const DeleteConfirmation = (props) => {
  const { hideDeleteConfirmationBox, removeOrder } = useOrderContext();
  return (
    <div className="confirmation-container">
      <h5>Delete Order?</h5>
      <p>This order will be permanently deleted</p>
      <div className="confirmation-btn-container">
        <button onClick={() => hideDeleteConfirmationBox(props.id)}>
          Cancel
        </button>
        <button onClick={() => removeOrder(props.id)}>Delete</button>
      </div>
    </div>
  );
};

export default DeleteConfirmation;
