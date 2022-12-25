import React from "react";
import "./MessageBox.css";

const MessageBox = ({ messageArray, onChangeTextarea, index }) => {
  return (
    <div className="message-box">
      <div className="message-title">Message About Your Order</div>
      <textarea
        value={messageArray[index]}
        className="message-box-textarea"
        onChange={(e) => onChangeTextarea(e, index)}
        placeholder="Message..."
      ></textarea>
    </div>
  );
};

export default MessageBox;
