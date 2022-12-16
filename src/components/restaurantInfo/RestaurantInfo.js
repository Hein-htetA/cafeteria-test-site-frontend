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
import { useMenuContext } from "../../Context/MenuContext";

const RestaurantInfo = () => {
  const { restaurant } = useMenuContext();
  const {
    name,
    firstPhone,
    secondPhone,
    address,
    establishedIn,
    paymentMethods,
    delivery,
    restaurantPhotoUrl,
  } = restaurant;
  return (
    <div className="restaurant-info-top-container">
      <RestaurantNameTitle restaurantName={name} />
      <RestaurantInfoContainer>
        <RestaurantPhoto restaurantPhotoUrl />
        <hr />
        <RestaurantDetailGrid>
          <RestaurantName />
          <RestaurantPhone />
          <RestaurantAddress />
          <RestaurantEstablished />
          <RestaurantPaymentMethod paymentMethods />
          <RestaurantDelivery />
        </RestaurantDetailGrid>
      </RestaurantInfoContainer>
    </div>
  );
};

export default RestaurantInfo;
