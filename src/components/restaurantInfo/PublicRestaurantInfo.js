import React from "react";
import { useParams } from "react-router-dom";
import "./PublicRestaurantInfo.css";
import RestaurantInfoContainer from "./RestaurantInfoContainer";
import RestaurantNameTitle from "./RestaurantNameTitle";
import RestaurantPhoto from "./RestaurantPhoto";
import RestaurantDetailGrid from "./RestaurantDetailGrid";
import RestaurantName from "./RestaurantName";
import RestaurantPhone from "./RestaurantPhone";
import RestaurantAddress from "./RestaurantAddress";
import RestaurantEstablished from "./RestaurantEstablished";
import RestaurantDelivery from "./RestaurantDelivery";
import { useMenuContext } from "../../Context/MenuContext";
import { usePublicDataContext } from "../../Context/PublicDataContext";
import RegisterPaymentMethod from "../registerRestaurant/RegisterPaymentMethod";
import RegisterDelivery from "../registerRestaurant/RegisterDelivery";

const PublicRestaurantInfo = () => {
  const { restaurants } = usePublicDataContext();
  const { restaurantId } = useParams();
  const restaurant = restaurants.find(
    (restaurant) => restaurant._id === restaurantId
  );
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
        <RestaurantPhoto restaurantPhotoUrl={restaurantPhotoUrl} />
        <hr />
        <RestaurantDetailGrid>
          <RestaurantName name={name} isOwner={false} />
          <RestaurantPhone
            firstPhone={firstPhone}
            secondPhone={secondPhone}
            isOwner={false}
          />
          <RestaurantAddress address={address} isOwner={false} />
          <RestaurantEstablished
            establishedIn={establishedIn}
            isOwner={false}
          />
          <RegisterPaymentMethod
            paymentMethods={paymentMethods}
            isOwner={false}
          />
          <RegisterDelivery isOwner={false} />
        </RestaurantDetailGrid>
      </RestaurantInfoContainer>
    </div>
  );
};

export default PublicRestaurantInfo;
