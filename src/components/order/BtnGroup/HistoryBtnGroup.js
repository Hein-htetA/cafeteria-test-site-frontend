import {
  faCheck,
  faChevronDown,
  faChevronUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "./HistoryBtnGroup.css";
import { toggleDetailContainer } from "../../../features/orderSlice";
import { useDispatch } from "react-redux";

const HistoryBtnGroup = (props) => {
  const { _id, detailHide } = props;

  const dispatch = useDispatch();

  return (
    <div className={"order-btn-container-order"}>
      <button className={"recycle-bin-btn"} style={{ visibility: "hidden" }}>
        <FontAwesomeIcon icon={faCheck} />
      </button>
      <div className="toggle-detail-btn-container">
        <button
          className="toggle-detail-btn"
          onClick={() => dispatch(toggleDetailContainer(_id))}
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
