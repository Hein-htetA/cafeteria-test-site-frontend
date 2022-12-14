import { faShop } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "./RegisterRestaurantTitle.css";

const RegisterRestaurantTitle = () => {
  return (
    <div className="reg-res-title-container">
      <q> Open Your Restaurant Here </q>
      {/* <div>Register Your</div>
      <div>
        <FontAwesomeIcon icon={faShop} style={{ fontSize: "1.2rem" }} />
        Restaurant
        <FontAwesomeIcon icon={faShop} style={{ fontSize: "1.2rem" }} />
      </div> */}
    </div>
  );
};

export default RegisterRestaurantTitle;
