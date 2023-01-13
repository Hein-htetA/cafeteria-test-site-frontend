import React from "react";
import "./MessageBox.css";

const MessageBox = ({ message, restaurantId, onChangeTextarea }) => {
  return (
    <div className="message-box">
      <div className="message-title">Message About Your Order</div>
      <textarea
        value={message[restaurantId]}
        className="message-box-textarea"
        onChange={(e) => onChangeTextarea(e, restaurantId)}
        placeholder="Message..."
      ></textarea>
    </div>
  );
};

export default MessageBox;
