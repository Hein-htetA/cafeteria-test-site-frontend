import {
  faCheck,
  faChevronDown,
  faChevronUp,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useOrderContext } from "../../../Context/OrderContext";

const NewOrderBtnGroup = (props) => {
  const { _id, detailHide } = props;

  const { displayRejectConfirmationBox, sendToOrderReceived, onClickHideShow } =
    useOrderContext();

  return (
    <div className={"order-btn-container-order"}>
      <div className="recycle-bin-btn-container">
        <button
          className={"recycle-bin-btn"}
          onClick={() => displayRejectConfirmationBox(_id)}
        >
          Recycle Bin
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
        Accept
        <FontAwesomeIcon icon={faCheck} />
      </button>
    </div>
  );
};

export default NewOrderBtnGroup;
