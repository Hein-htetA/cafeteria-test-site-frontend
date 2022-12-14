import React from "react";
import { useParams } from "react-router-dom";
import "./RestaurantInfo.css";
import photo4 from "../../img/photo4.jpg";
import RestaurantInfoContainer from "./RestaurantInfoContainer";
import RestaurantNameTitle from "./RestaurantNameTitle";
import RestaurantPhoto from "./RestaurantPhoto";
import RestaurantDetailGrid from "./RestaurantDetailGrid";
import RestaurantName from "./RestaurantName";
import RestaurantPhone from "./RestaurantPhone";
import RestaurantAddress from "./RestaurantAddress";
import RestaurantEstablished from "./RestaurantEstablished";
import RestaurantPaymentMethod from "./RestaurantPaymentMethod";
import RestaurantDelivery from "./RestaurantDelivery";
import { useUiContext } from "../../Context/UiContext";

const RestaurantInfo = () => {
  const { restaurant } = useUiContext();
  const {
    name,
    firstPhone,
    secondPhone,
    address,
    establishedIn,
    paymentMethods,
    delivery,
  } = restaurant;
  return (
    <div className="restaurant-info-top-container">
      <RestaurantNameTitle restaurantName={name} />
      <RestaurantInfoContainer>
        <RestaurantPhoto restaurantPhotoUrl={photo4} />
        <hr />
        <RestaurantDetailGrid>
          <RestaurantName />
          <RestaurantPhone />
          <RestaurantAddress />
          <RestaurantEstablished />
          <RestaurantPaymentMethod />
          <RestaurantDelivery />
        </RestaurantDetailGrid>
      </RestaurantInfoContainer>
    </div>
  );
};

export default RestaurantInfo;
