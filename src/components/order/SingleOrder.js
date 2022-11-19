import React, { useEffect, useRef } from "react";
import "./SingleOrder.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowsUpDown,
  faXmark,
  faClock,
  faSquareCaretDown,
  faSquareCaretUp,
  faChevronUp,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import { useAppContext } from "../../Context/context";
import CollapsibleContainer from "./CollapsibleContainer";

const getAmPmTime = (dateString) => {
  const date = new Date(dateString);
  let hour = date.getHours();
  let amPm = "AM";
  const minute = date.getMinutes();
  if (hour > 12) {
    hour = hour - 12;
    amPm = "PM";
  }
  const string = `${hour}:${minute} ${amPm}`;
  return string;
};

const SingleOrder = (props) => {
  const {
    id,
    foodName,
    foodCount,
    message,
    statusState,
    statusDate,
    address,
    paymentMethod,
    paymentState,
    phoneNumber,
    messageHide,
    addressHide,
    detailHide,
  } = props;

  const { onChangeInputSelect, onClickHideShow } = useAppContext();

  return (
    <>
      <div className="single-order-container">
        <ul className="order-ul">
          <li className="name-count-container">
            <div className="food-name">
              <input
                value={foodName}
                placeholder="Name"
                onChange={(e) => onChangeInputSelect(id, "foodName", e)}
              />
            </div>
            <div className="food-count">
              <div style={{ marginRight: "20px" }}>x</div>
              {foodCount === "others" ? (
                <input type="text" />
              ) : (
                <select
                  value={foodCount}
                  name="foodCount"
                  id="foodCount"
                  onChange={(e) => onChangeInputSelect(id, "foodCount", e)}
                >
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                  <option value={5}>5</option>
                  <option value={"others"}>Others...</option>
                </select>
              )}
            </div>
          </li>
          <li className="message-container">
            <div>Message</div>
            <div>:</div>
            <div className="message-box">
              <div
                className={
                  messageHide
                    ? "message-text message-text-hidden"
                    : "message-text"
                }
              >
                {message}
              </div>
              <div className="message-button-toggle">
                {messageHide ? (
                  <button onClick={() => onClickHideShow(id, "messageHide")}>
                    <FontAwesomeIcon icon={faSquareCaretDown} />
                  </button>
                ) : (
                  <button onClick={() => onClickHideShow(id, "messageHide")}>
                    <FontAwesomeIcon icon={faSquareCaretUp} />
                  </button>
                )}
              </div>
            </div>
          </li>
          <CollapsibleContainer
            hide={detailHide}
            id={id}
            onClickHideShow={onClickHideShow}
            addressHide={addressHide}
          >
            <li>
              <div>Status</div>
              <div>:</div>
              <div className={"status-select"}>
                <select
                  className={
                    statusState === "received"
                      ? "status-select status-select-received"
                      : statusState === "accepted"
                      ? "status-select status-select-accepted"
                      : "status-select status-select-delievery"
                  }
                  onChange={(e) => onChangeInputSelect(id, "statusState", e)}
                  value={statusState}
                >
                  <option value="received">Order Received</option>
                  <option value="accepted">Order Accepted</option>
                  <option value="delivery">On Delivery</option>
                </select>
                <div className="status-time">
                  <FontAwesomeIcon icon={faClock} />
                  {getAmPmTime(statusDate)}
                </div>
              </div>
            </li>
            <li>
              <div>Address</div>
              <div>:</div>
              <div className="address-box">
                <div
                  className={
                    addressHide
                      ? "address-text address-text-hidden"
                      : "address-text"
                  }
                >
                  {address}
                </div>
                <div className="address-button-toggle">
                  {addressHide ? (
                    <button onClick={() => onClickHideShow(id, "addressHide")}>
                      <FontAwesomeIcon icon={faSquareCaretDown} />
                    </button>
                  ) : (
                    <button onClick={() => onClickHideShow(id, "addressHide")}>
                      <FontAwesomeIcon icon={faSquareCaretUp} />
                    </button>
                  )}
                </div>
              </div>
            </li>
            <li>
              <div>Payment</div>
              <div>:</div>
              <div className="payment-box">
                <div className="payment-method-name">{paymentMethod}</div>
                <select
                  onChange={(e) => onChangeInputSelect(id, "paymentState", e)}
                  value={paymentState}
                  className={
                    paymentState === "received"
                      ? "payment-select-received"
                      : "payment-select-pending"
                  }
                >
                  <option value={"pending"}>Pending</option>
                  <option value={"received"}>Received</option>
                </select>
              </div>
            </li>
            <li>
              <div>Phone</div>
              <div>:</div>
              <div>{phoneNumber}</div>
            </li>
          </CollapsibleContainer>

          <div className={"order-btn-container"}>
            <div className="remove-btn-container">
              <button className="remove-order-btn">
                <FontAwesomeIcon icon={faXmark} />
                Remove
              </button>
            </div>
            <div className="toggle-detail-btn-container">
              <button
                className="toggle-detail-btn"
                onClick={() => onClickHideShow(id, "detailHide")}
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
            <div className="save-cancel-container">
              <button className="save-change-btn">Save</button>
              <button className="cancel-change-btn">Cancel</button>
            </div>
          </div>
        </ul>
      </div>
      <hr className="single-order-hr" />
    </>
  );
};

export default SingleOrder;
