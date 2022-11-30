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
import NewOrderBtnGroup from "./BtnGroup/NewOrderBtnGroup";
import OrderBtnGroup from "./BtnGroup/OrderBtnGroup";
import RecycleBinBtnGroup from "./BtnGroup/RecycleBinBtnGroup";

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
    _id,
    order,
    message,
    status,
    updatedAt,
    customerName,
    address,
    paymentStatus,
    phoneNumber,
    messageHide,
    detailContainerHeight,
    detailHide,
    orderState,
    paymentMethod,
  } = props;

  const {
    onChangeInputSelect,
    onClickHideShow,
    sendToRecycleBin,
    sendToOrderReceived,
    sendToHistory,
  } = useOrderContext();

  const scrollRef = useRef(null);

  const hideShowScroll = () => {
    onClickHideShow(_id, "messageHide");
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
            : orderState === "newOrder"
            ? "single-order-container-newOrder"
            : "single-order-container-history"
        }
      >
        <ul className="order-ul">
          {order.map((order) => {
            return (
              <li className="name-count-container" key={order._id}>
                <div className="food-name">
                  <input
                    value={order.foodName}
                    placeholder="Name"
                    onChange={(e) =>
                      onChangeInputSelect(order._id, "foodName", e)
                    }
                    readOnly
                  />
                </div>
                <div className="food-count">
                  <div style={{ marginRight: "20px" }}>x</div>
                  <input type="text" value={order.foodCount} readOnly />
                </div>
              </li>
            );
          })}
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
                onChange={(e) => onChangeInputSelect(_id, "status", e)}
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
                {getAmPmTime(updatedAt)}
              </div>
            </div>
          </li>
          <CollapsibleContainer
            id={_id}
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
              </div>
            </li>
            <li>
              <div>Payment</div>
              <div>:</div>
              <div className="payment-box">
                <div className="payment-method-name">
                  {paymentMethod.method}
                </div>
                <div>{paymentMethod.additionalInfo}</div>
                <select
                  onChange={(e) => onChangeInputSelect(_id, "paymentStatus", e)}
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
                <div>{phoneNumber}</div>
                <a href={`tel:${phoneNumber}`}>
                  <FontAwesomeIcon icon={faPhoneFlip} />
                </a>
              </div>
            </li>
          </CollapsibleContainer>
          {orderState === "newOrder" ? (
            <NewOrderBtnGroup
              {...{
                _id,
                orderState,
                sendToOrderReceived,
                sendToRecycleBin,
                detailHide,
                onClickHideShow,
              }}
            />
          ) : orderState === "recycleBin" ? (
            <RecycleBinBtnGroup
              {...{
                _id,
                orderState,
                sendToRecycleBin,
                detailHide,
                onClickHideShow,
                sendToOrderReceived,
              }}
            />
          ) : (
            <OrderBtnGroup
              {...{
                _id,
                orderState,
                sendToHistory,
                sendToRecycleBin,
                detailHide,
                onClickHideShow,
              }}
            />
          )}
        </ul>
      </div>
      <hr className="single-order-hr" />
    </>
  );
};

export default SingleOrder;
