import React from "react";
import { useParams } from "react-router-dom";
import "./RestaurantInfo.css";
import photo4 from "../../img/photo4.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";

const RestaurantInfo = () => {
  const { restaurantName } = useParams();
  return (
    <div className="restaurant-detail-info-container">
      <h2 className="restaurant-name-marketplace1">{restaurantName}</h2>
      <img src={photo4} alt="restaurant" className="restaurant-photo" />
      <label htmlFor="inputTag" className="restaurant-input-image-icon">
        <FontAwesomeIcon icon={faCamera} />
        <input
          id="inputTag"
          type="file"
          accept="image/png, image/jpg, image/gif, image/jpeg"
          style={{ display: "none" }}
        />
      </label>
      <hr />
      <div className="detail-info-grid">
        <div>
          <label>Name</label>
        </div>
        <div>:</div>
        <div>
          <input value={"Shwe Latt Toe"} />
        </div>
        <div>
          <label>Phone No.</label>
        </div>
        <div>:</div>
        <div>
          <input value={"0988888888"} style={{ marginBottom: "5px" }} />
          <input value={"0988888888"} />
        </div>
        <div>
          <label>Address</label>
        </div>
        <div>:</div>
        <div>
          <textarea>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga
            perferendis provident exercitationem impedit praesentium consequatur
            ipsam non voluptatem ab corrupti consectetur quos, sint quidem
            veniam nesciunt ipsum id minima reprehenderit.
          </textarea>
        </div>
        <div>
          <label>Established In</label>
        </div>
        <div>:</div>
        <div>
          <input value={2022} />
        </div>
        <div>Payment Methods</div>
        <div>:</div>
        <div className="payment-method-container">
          <div className="single-payment-method">Cash</div>
          <div className="single-payment-method">KBZPay</div>
          <div className="single-payment-method">WavePay</div>
        </div>
        <div>
          <label>Delivery</label>
        </div>
        <div>:</div>
        <div>Available</div>
      </div>
    </div>
  );
};

export default RestaurantInfo;
