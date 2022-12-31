import React, { useEffect, useRef } from "react";
import "./SingleOrder.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaperPlane,
  faTrashCan,
  faClock,
  faSquareCaretDown,
  faSquareCaretUp,
  faArrowRotateRight,
  faCircleCheck,
  faSpinner,
  faPhoneFlip,
} from "@fortawesome/free-solid-svg-icons";
import { useOrderContext } from "../../Context/OrderContext";
import CollapsibleContainer from "./CollapsibleContainer";
import NewOrderBtnGroup from "./BtnGroup/NewOrderBtnGroup";
import OrderBtnGroup from "./BtnGroup/OrderBtnGroup";
import RecycleBinBtnGroup from "./BtnGroup/RecycleBinBtnGroup";
import OnDeliveryBtnGroup from "./BtnGroup/OnDeliveryBtnGroup";
import HistoryBtnGroup from "./BtnGroup/HistoryBtnGroup";
import UpdateLoading from "./OrderStates/UpdateLoading";
import UpdateError from "./OrderStates/UpdateError";
import DeleteConfirmation from "./OrderStates/RejectConfirmation";

export const getAmPmTime = (dateString) => {
  const date = new Date(dateString);
  let hour = date.getHours();
  let amPm = "AM";
  const minute = date.getMinutes();
  const minStr = minute < 10 ? "0" + minute : minute;
  if (hour > 12) {
    hour = hour - 12;
    amPm = "PM";
  }
  const string = `${hour}:${minStr} ${amPm}`;
  return string;
};

const SingleOrder = (props) => {
  const {
    _id,
    menuArray,
    message,
    updatedAt,
    customerName,
    address,
    totalAmount,
    requestDelivery,
    paymentStatus,
    phoneNumber,
    messageHide,
    detailContainerHeight,
    detailHide,
    orderState,
    paymentMethod,
    updateLoading,
    updateError,
    displayConfirmationBox,
    paymentStatusNoEdit,
    paymentStatusLoading,
    paymentStatusError,
  } = props;

  const { onChangeInputSelect, onClickHideShow, retryPaymentStatus } =
    useOrderContext();

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
          orderState === "order" || orderState === "onDelivery"
            ? "single-order-container"
            : orderState === "recycleBin"
            ? "single-order-container-recycleBin"
            : orderState === "newOrder"
            ? "single-order-container-newOrder"
            : "single-order-container-history"
        }
      >
        {displayConfirmationBox && <DeleteConfirmation id={_id} />}
        {updateLoading && <UpdateLoading />}
        {updateError && <UpdateError />}

        <ul className="order-ul">
          {menuArray.map((order) => {
            return (
              <li className="name-count-container" key={order._id}>
                <div className="food-name">
                  <input
                    value={order.name}
                    placeholder="Name"
                    onChange={(e) =>
                      onChangeInputSelect(order._id, "foodName", e)
                    }
                    readOnly
                  />
                </div>
                <div className="food-count">
                  <div style={{ marginRight: "20px" }}>x</div>
                  <input type="text" value={order.count} readOnly />
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
                  orderState === "newOrder"
                    ? "status-select-newOrder"
                    : orderState === "order"
                    ? "status-select-order"
                    : orderState === "recycleBin"
                    ? "status-select-recycleBin"
                    : orderState === "onDelivery"
                    ? "status-select-onDelivery"
                    : "status-select-history"
                }
                onChange={(e) => onChangeInputSelect(_id, "status", e)}
                value={orderState}
                disabled
              >
                <option value="newOrder">Order Received</option>
                <option value="order">Order Accepted</option>
                <option value="onDelivery">On Delivery</option>
                <option value="history">Completed</option>
                <option value="recycleBin">Rejected</option>
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
                <div className={"address-text"}>
                  {requestDelivery ? <div>Pick-up at restaurant</div> : address}
                </div>
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
            <li>
              <div>Payment</div>
              <div>:</div>
              <div className="payment-box">
                <div>
                  Total Amount -{" "}
                  <span className="total-amount">
                    {JSON.stringify(totalAmount)}
                  </span>
                  MMK
                </div>
                <div className="payment-info">
                  <div className="payment-method-name">
                    {paymentMethod.value}
                  </div>
                  {paymentMethod.value !== "Cash" && (
                    <div>
                      {" - "}
                      {paymentMethod.additionalInfo.number +
                        " (" +
                        paymentMethod.additionalInfo.name +
                        ")"}
                    </div>
                  )}
                </div>
                <div className="select-spinner">
                  <select
                    onChange={(e) => onChangeInputSelect(_id, e)}
                    value={paymentStatus}
                    disabled={paymentStatusLoading}
                    className={
                      paymentStatus
                        ? "payment-select-received"
                        : "payment-select-pending"
                    }
                  >
                    <option value={false}>Pending</option>
                    <option value={true}>Received</option>
                  </select>
                  <span
                    className={
                      paymentStatusNoEdit
                        ? "payment-status-container payment-status-container-hide"
                        : "payment-status-container"
                    }
                  >
                    {paymentStatusError && (
                      <>
                        <button
                          className="try-again-btn"
                          onClick={() => retryPaymentStatus(_id)}
                        >
                          <FontAwesomeIcon icon={faArrowRotateRight} />
                        </button>
                      </>
                    )}{" "}
                    {paymentStatusLoading && (
                      <FontAwesomeIcon
                        icon={faSpinner}
                        spin
                        style={{ color: "blue" }}
                      />
                    )}
                  </span>
                </div>
              </div>
            </li>
          </CollapsibleContainer>
          {orderState === "newOrder" ? (
            <NewOrderBtnGroup _id={_id} detailHide={detailHide} />
          ) : orderState === "recycleBin" ? (
            <RecycleBinBtnGroup _id={_id} detailHide={detailHide} />
          ) : orderState === "onDelivery" ? (
            <OnDeliveryBtnGroup _id={_id} detailHide={detailHide} />
          ) : orderState === "history" ? (
            <HistoryBtnGroup _id={_id} detailHide={detailHide} />
          ) : (
            <OrderBtnGroup _id={_id} detailHide={detailHide} />
          )}
        </ul>
      </div>
      <hr className="single-order-hr" />
    </>
  );
};

export default SingleOrder;
