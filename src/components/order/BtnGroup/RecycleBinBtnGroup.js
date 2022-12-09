import {
  faChevronDown,
  faChevronUp,
  faXmark,
  faTrashCanArrowUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useOrderContext } from "../../../Context/OrderContext";
import "./RecycleBinBtnGroup.css";

const RecycleBinBtnGroup = (props) => {
  const { _id, detailHide } = props;
  const { sendToOrderReceived, onClickHideShow } = useOrderContext();
  return (
    <div className={"order-btn-container"}>
      {/* <div className="recycle-bin-btn-container">
        <button className={"recycle-bin-btn delete-btn"} onClick={() => {}}>
          delete
          <FontAwesomeIcon icon={faXmark} />
        </button>
        
      </div> */}
      <button
        className={"recycle-bin-btn"}
        onClick={() => sendToOrderReceived(_id)}
      >
        Restore
        <FontAwesomeIcon icon={faTrashCanArrowUp} />
      </button>
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
    </div>
  );
};

export default RecycleBinBtnGroup;
