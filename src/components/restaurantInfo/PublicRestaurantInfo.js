import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./PublicRestaurantInfo.css";
import RestaurantInfoContainer from "./RestaurantInfoContainer";
import RestaurantNameTitle from "./RestaurantNameTitle";
import RestaurantPhoto from "./RestaurantPhoto";
import RestaurantDetailGrid from "./RestaurantDetailGrid";
import RestaurantName from "./RestaurantName";
import RestaurantPhone from "./RestaurantPhone";
import RestaurantAddress from "./RestaurantAddress";
import RestaurantEstablished from "./RestaurantEstablished";
import RegisterPaymentMethod from "../registerRestaurant/RegisterPaymentMethod";
import RegisterDelivery from "../registerRestaurant/RegisterDelivery";
import { useSelector } from "react-redux";

const PublicRestaurantInfo = () => {
  const publicRestaurants = useSelector(
    (state) => state.publicData.publicRestaurants
  );
  const { restaurantId } = useParams();
  const restaurant = publicRestaurants.find(
    (restaurant) => restaurant._id === restaurantId
  );
  const navigate = useNavigate();
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
          <RegisterDelivery delivery={delivery} isOwner={false} />
        </RestaurantDetailGrid>
      </RestaurantInfoContainer>
      <button
        className="view-profile"
        onClick={() =>
          navigate("../profile", { state: { resId: restaurantId } })
        }
      >
        View Owner's Profile
      </button>
    </div>
  );
};

export default PublicRestaurantInfo;
