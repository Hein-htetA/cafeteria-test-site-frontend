import React from "react";
import "./SingleOrder.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faArrowRotateRight,
  faSpinner,
  faPhoneFlip,
} from "@fortawesome/free-solid-svg-icons";
import CollapsibleContainer from "./CollapsibleContainer";
import NewOrderBtnGroup from "./BtnGroup/NewOrderBtnGroup";
import OrderBtnGroup from "./BtnGroup/OrderBtnGroup";
import RecycleBinBtnGroup from "./BtnGroup/RecycleBinBtnGroup";
import OnDeliveryBtnGroup from "./BtnGroup/OnDeliveryBtnGroup";
import HistoryBtnGroup from "./BtnGroup/HistoryBtnGroup";
import UpdateLoading from "./OrderStates/UpdateLoading";
import UpdateError from "./OrderStates/UpdateError";
import DeleteConfirmation from "./OrderStates/RejectConfirmation";
import { useDispatch } from "react-redux";
import { onChangePaymentStatus } from "../../features/orderSlice";

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
    detailContainerHeight,
    detailHide,
    orderState,
    paymentMethod,
    updateStatus,
    paymentStatusStatus,
    displayRejectConfirmationBox,
  } = props;

  const dispatch = useDispatch();

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
        {displayRejectConfirmationBox && <DeleteConfirmation id={_id} />}
        {updateStatus === "loading" && <UpdateLoading />}
        {updateStatus === "failed" && <UpdateError />}

        <ul className="order-ul">
          {menuArray.map((order) => {
            return (
              <li className="name-count-container" key={order._id}>
                <div className="food-name">
                  <input value={order.name} placeholder="Name" readOnly />
                </div>
                <div className="food-count">
                  <div style={{ marginRight: "20px" }}>x</div>
                  <input type="text" value={order.count} readOnly />
                </div>
              </li>
            );
          })}
          <li>
            <div>Message</div>
            <div>:</div>
            <div>
              <div>{message}</div>
            </div>
          </li>
          <li>
            <div>Status</div>
            <div>:</div>
            <div className="status-select">
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
              <div>
                {requestDelivery ? address : <div>Pick-up at restaurant</div>}
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
                    onChange={() => dispatch(onChangePaymentStatus(_id))}
                    value={paymentStatus}
                    disabled={paymentStatusStatus === "loading"}
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
                      false
                        ? "payment-status-container payment-status-container-hide"
                        : "payment-status-container"
                    }
                  >
                    {paymentStatusStatus === "failed" && (
                      <>
                        <button
                          className="try-again-btn"
                          onClick={() => dispatch(onChangePaymentStatus(_id))}
                        >
                          <FontAwesomeIcon icon={faArrowRotateRight} />
                        </button>
                      </>
                    )}
                    {paymentStatusStatus === "loading" && (
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
