import { faPhoneFlip } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { usePublicDataContext } from "../../../../Context/PublicDataContext";
import CheckoutField from "../../CartCheckout/CheckoutField";
import CheckoutGridContainer from "../../CartCheckout/CheckoutGridContainer";

const RestaurantDetail = ({ restaurantId }) => {
  const { restaurants } = usePublicDataContext();
  const restaurant = restaurants.find(
    (restaurant) => restaurant._id === restaurantId
  );
  return (
    <CheckoutGridContainer>
      <CheckoutField>Name</CheckoutField>
      <CheckoutField>:</CheckoutField>
      <div>{restaurant.name}</div>

      <CheckoutField>Phone</CheckoutField>
      <CheckoutField>:</CheckoutField>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div>{"+95" + restaurant.firstPhone}</div>
        <div style={{ marginLeft: "auto" }}>
          <a href={`tel:+95${restaurant.firstPhone}`}>
            <FontAwesomeIcon
              icon={faPhoneFlip}
              style={{ color: "rgb(238, 94, 118)" }}
            />
          </a>
        </div>
      </div>
    </CheckoutGridContainer>
  );
};

export default RestaurantDetail;
