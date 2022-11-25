import React, { useEffect, useRef } from "react";
import "./SingleOrder.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaperPlane,
  faTrashCan,
  faClock,
  faSquareCaretDown,
  faSquareCaretUp,
  faChevronUp,
  faChevronDown,
  faCheck,
  faPhoneFlip,
} from "@fortawesome/free-solid-svg-icons";
import { useOrderContext } from "../../Context/OrderContext";
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
    status,
    statusDate,
    customerName,
    address,
    paymentMethod,
    paymentStatus,
    phoneNumber,
    messageHide,
    detailContainerHeight,
    detailHide,
    orderState,
    isRecycleBin, //for Trash Bin Component
  } = props;
  console.log("detail heinght in single rder", detailContainerHeight);

  const {
    onChangeInputSelect,
    onClickHideShow,
    sendToRecycleBin,
    sendToOrderReceived,
    sendToHistory,
  } = useOrderContext();

  const scrollRef = useRef(null);

  const hideShowScroll = () => {
    onClickHideShow(id, "messageHide");
    scrollRef.current.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <div
        className={
          orderState === "order"
            ? "single-order-container"
            : orderState === "recycleBin"
            ? "single-order-container-recycleBin"
            : "single-order-container-history"
        }
      >
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
                ref={scrollRef}
              >
                {message}
              </div>
              <div className="message-button-toggle">
                {messageHide ? (
                  <button onClick={hideShowScroll}>
                    <FontAwesomeIcon icon={faSquareCaretDown} />
                  </button>
                ) : (
                  <button onClick={hideShowScroll}>
                    <FontAwesomeIcon icon={faSquareCaretUp} />
                  </button>
                )}
              </div>
            </div>
          </li>
          <li>
            <div>Status</div>
            <div>:</div>
            <div className={"status-select"}>
              <select
                className={
                  status === "received"
                    ? "status-select status-select-received"
                    : status === "accepted"
                    ? "status-select status-select-accepted"
                    : "status-select status-select-delievery"
                }
                onChange={(e) => onChangeInputSelect(id, "status", e)}
                value={status}
              >
                <option value="received">Order Received</option>
                <option value="accepted">Order Accepted</option>
                <option value="onDelivery">On Delivery</option>
              </select>
              <div className="status-time">
                <FontAwesomeIcon
                  icon={faClock}
                  style={{ marginRight: "2px" }}
                />
                {getAmPmTime(statusDate)}
              </div>
            </div>
          </li>
          <CollapsibleContainer
            id={id}
            detailContainerHeight={detailContainerHeight}
            detailHide={detailHide}
          >
            <li>
              <div>Name</div>
              <div>:</div>
              <div>{customerName}</div>
            </li>
            <li>
              <div>Address</div>
              <div>:</div>
              <div className="address-box">
                <div className={"address-text"}>{address}</div>
                {/* <div className="address-button-toggle">
                  {addressHide ? (
                    <button onClick={() => onClickHideShow(id, "addressHide")}>
                      <FontAwesomeIcon icon={faSquareCaretDown} />
                    </button>
                  ) : (
                    <button onClick={() => onClickHideShow(id, "addressHide")}>
                      <FontAwesomeIcon icon={faSquareCaretUp} />
                    </button>
                  )}
                </div> */}
              </div>
            </li>
            <li>
              <div>Payment</div>
              <div>:</div>
              <div className="payment-box">
                <div className="payment-method-name">{paymentMethod}</div>
                <select
                  onChange={(e) => onChangeInputSelect(id, "paymentState", e)}
                  value={paymentStatus}
                  className={
                    paymentStatus
                      ? "payment-select-received"
                      : "payment-select-pending"
                  }
                >
                  <option value={false}>Pending</option>
                  <option value={true}>Received</option>
                </select>
              </div>
            </li>
            <li>
              <div>Phone</div>
              <div>:</div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>+{phoneNumber}</div>
                <a href={`tel:+${phoneNumber}`}>
                  <FontAwesomeIcon icon={faPhoneFlip} />
                </a>
              </div>
            </li>
          </CollapsibleContainer>

          <div className={"order-btn-container"}>
            <div className="recycle-bin-btn-container">
              <button
                className={"recycle-bin-btn"}
                onClick={
                  orderState === "order"
                    ? () => sendToRecycleBin(id)
                    : () => sendToOrderReceived(id)
                }
              >
                {orderState === "order" ? "Recycle Bin" : "Orders"}
                <FontAwesomeIcon
                  icon={orderState === "order" ? faTrashCan : faPaperPlane}
                />
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
            <button
              className={
                orderState !== "order"
                  ? "recycle-bin-btn button-hide"
                  : "recycle-bin-btn"
              }
              onClick={() => sendToHistory(id)}
            >
              Completed
              <FontAwesomeIcon icon={faCheck} />
            </button>
          </div>
        </ul>
      </div>
      <hr className="single-order-hr" />
    </>
  );
};

export default SingleOrder;
