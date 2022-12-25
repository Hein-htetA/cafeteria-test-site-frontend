import React from "react";
import CheckoutField from "../../CartCheckout/CheckoutField";
import CheckoutGridContainer from "../../CartCheckout/CheckoutGridContainer";
import CheckoutValue from "../../CartCheckout/CheckoutValue";
import ValueInput from "../../CartCheckout/ValueInput";
import PhoneNumber from "../../PhoneNumber";

const RestaurantDetail = () => {
  return (
    <CheckoutGridContainer>
      <CheckoutField>Name</CheckoutField>
      <CheckoutField>:</CheckoutField>
      <CheckoutValue>
        <ValueInput />
      </CheckoutValue>

      <CheckoutField>Phone</CheckoutField>
      <CheckoutField>:</CheckoutField>
      <CheckoutValue>
        <PhoneNumber />
      </CheckoutValue>
    </CheckoutGridContainer>
  );
};

export default RestaurantDetail;
