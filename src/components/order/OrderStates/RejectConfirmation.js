import React from "react";
import { useOrderContext } from "../../../Context/OrderContext";
import "./RejectConfirmation.css";

const DeleteConfirmation = (props) => {
  const { hideRejectConfirmationBox, sendToRecycleBin } = useOrderContext();
  const recycleBinAndHide = (id) => {
    sendToRecycleBin(id);
    hideRejectConfirmationBox(id);
  };
  return (
    <div className="confirmation-container">
      <h5>Reject this Order?</h5>
      <p>This order will be moved to Recycle Bin.</p>
      <div className="confirmation-btn-container">
        <button onClick={() => hideRejectConfirmationBox(props.id)}>
          Cancel
        </button>
        <button onClick={() => recycleBinAndHide(props.id)}>Reject</button>
      </div>
    </div>
  );
};

export default DeleteConfirmation;
