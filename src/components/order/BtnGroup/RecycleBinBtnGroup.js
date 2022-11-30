import {
  faCheck,
  faChevronDown,
  faChevronUp,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const RecycleBinBtnGroup = (props) => {
  const {
    _id,
    orderState,
    sendToOrderReceived,
    sendToRecycleBin,
    detailHide,
    onClickHideShow,
  } = props;
  return (
    <div className={"order-btn-container"}>
      <div className="recycle-bin-btn-container">
        <button
          className={"recycle-bin-btn"}
          onClick={() => sendToRecycleBin(_id)}
        >
          Remove
          <FontAwesomeIcon icon={faTrashCan} />
        </button>
      </div>
      <div className="toggle-detail-btn-container">
        <button
          className="toggle-detail-btn"
          onClick={() => onClickHideShow(_id, "detailHide")}
        >
          {detailHide ? (
            <>
              <FontAwesomeIcon icon={faChevronDown} />
              <FontAwesomeIcon icon={faChevronDown} />
            </>
          ) : (
            <>
              <FontAwesomeIcon icon={faChevronUp} />
              <FontAwesomeIcon icon={faChevronUp} />
            </>
          )}
        </button>
      </div>
      <button
        className={"recycle-bin-btn"}
        onClick={() => sendToOrderReceived(_id)}
      >
        Restore To Orders
        <FontAwesomeIcon icon={faCheck} />
      </button>
    </div>
  );
};

export default RecycleBinBtnGroup;
