import React from "react";
import { useDispatch } from "react-redux";
import {
  rejectOrder,
  toggleRejectConfirmationBox,
} from "../../../features/orderSlice";
import "./RejectConfirmation.css";

const DeleteConfirmation = (props) => {
  const dispatch = useDispatch();

  return (
    <div className="confirmation-container">
      <h5>Reject this Order?</h5>
      <p>This order will be rejected and moved to Recycle Bin.</p>
      <div className="confirmation-btn-container">
        <button onClick={() => dispatch(toggleRejectConfirmationBox(props.id))}>
          Cancel
        </button>
        <button onClick={() => dispatch(rejectOrder(props.id))}>Move</button>
      </div>
    </div>
  );
};

export default DeleteConfirmation;
