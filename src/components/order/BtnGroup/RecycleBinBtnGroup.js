import {
  faChevronDown,
  faChevronUp,
  faXmark,
  faTrashCanArrowUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useDispatch } from "react-redux";
import { useOrderContext } from "../../../Context/OrderContext";
import {
  acceptOrder,
  toggleDetailContainer,
} from "../../../features/orderSlice";
import "./RecycleBinBtnGroup.css";

const RecycleBinBtnGroup = (props) => {
  const { _id, detailHide } = props;
  const dispatch = useDispatch();

  return (
    <div className={"order-btn-container-order"}>
      <button
        className={"recycle-bin-btn"}
        onClick={() => dispatch(acceptOrder(_id))}
      >
        Restore
        <FontAwesomeIcon icon={faTrashCanArrowUp} />
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

export default RecycleBinBtnGroup;
