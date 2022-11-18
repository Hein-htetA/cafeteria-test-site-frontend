import React from "react";
import "./SingleOrder.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowsUpDown,
  faXmark,
  faClock,
} from "@fortawesome/free-solid-svg-icons";

const getAmPmTime = (date) => {
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

const SingleOrder = () => {
  return (
    <>
      <div className="single-order-container">
        <ul className="order-ul">
          <li className="name-count-container">
            <div className="food-name">
              <input defaultValue={"chinese fried rice"} placeholder="Name" />
            </div>
            <div>x</div>
            <div className="food-count">
              <select name="foodCount" id="foodCount">
                <option value={1}>1</option>
                <option value={1}>2</option>
                <option value={1}>3</option>
                <option value={1}>4</option>
                <option value={1}>5</option>
                <option value={6}>Others...</option>
              </select>
              <input type="text" style={{ display: "none" }} />
            </div>
          </li>
          <li>
            <div>Message</div>
            <div>:</div>
            <div className="message-box">
              <div className="message-text">
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
              </div>
              <div className="message-button-down">
                <button>
                  <FontAwesomeIcon icon={faArrowsUpDown} beat />
                </button>
              </div>
            </div>
          </li>
          <li>
            <div>Status</div>
            <div>:</div>
            <div className="status-select">
              <select>
                <option value="orderReceived">Order Received</option>
                <option value="orderAccepted">Order Accepted</option>
                <option value="delivered">Delievered</option>
              </select>
              <div className="status-time">
                <FontAwesomeIcon icon={faClock} />
                <span>{getAmPmTime(new Date())}</span>
              </div>
            </div>
          </li>
          <li>
            <div>Address</div>
            <div>:</div>
            <div className="address-box">
              <div className="address-text">
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
              </div>
              <div className="address-button-down">
                <button>
                  <FontAwesomeIcon icon={faArrowsUpDown} beat />
                </button>
              </div>
            </div>
          </li>
          <li>
            <div>Payment</div>
            <div>:</div>
            <div className="payment-box">
              <div className="payment-method-name">cash on delievery</div>
              <select className="payment-select-received">
                <option value="notReceived">Pending</option>
                <option value="received">Received</option>
              </select>
            </div>
          </li>
          <li>
            <div>Phone</div>
            <div>:</div>
            <div>09788888677</div>
          </li>
          <div className="order-btn-container">
            <div className="remove-btn-container">
              <button className="remove-order-btn">
                <FontAwesomeIcon icon={faXmark} />
                Remove
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
