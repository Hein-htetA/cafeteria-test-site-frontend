import {
  faCheck,
  faChevronDown,
  faChevronUp,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useOrderContext } from "../../../Context/OrderContext";
import "./HistoryBtnGroup.css";

const HistoryBtnGroup = (props) => {
  const { _id, detailHide } = props;

  const { onClickHideShow } = useOrderContext();
  return (
    <div className={"order-btn-container-order"}>
      {/* <div className="recycle-bin-btn-container">
        <button
          className={"recycle-bin-btn delete-btn"}
          onClick={() => showDeleteConfirmationBox(_id)}
        >
          Delete
          <FontAwesomeIcon icon={faXmark} />
        </button>
      </div> */}

      <button className={"recycle-bin-btn"} style={{ visibility: "hidden" }}>
        <FontAwesomeIcon icon={faCheck} />
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

export default HistoryBtnGroup;
