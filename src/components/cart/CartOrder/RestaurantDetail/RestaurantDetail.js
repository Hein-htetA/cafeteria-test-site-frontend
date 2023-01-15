import React from "react";
import CheckoutField from "../../CartCheckout/CheckoutField";
import CheckoutGridContainer from "../../CartCheckout/CheckoutGridContainer";

const RestaurantDetail = ({ restaurantName }) => {
  return (
    <CheckoutGridContainer>
      <CheckoutField>Name</CheckoutField>
      <CheckoutField>:</CheckoutField>
      <div>{restaurantName}</div>

      {/* <CheckoutField>Phone</CheckoutField>
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
      </div> */}
    </CheckoutGridContainer>
  );
};

export default RestaurantDetail;
