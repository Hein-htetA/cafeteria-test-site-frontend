import React from "react";
import CartRestaurantName from "../CartRestaurantName";
import PhoneNumber from "../PhoneNumber";
import AddressValue from "./AddressValue";
import CheckoutContainer from "./CheckoutContainer";
import CheckoutField from "./CheckoutField";
import CheckoutGridContainer from "./CheckoutGridContainer";
import CheckoutValue from "./CheckoutValue";
import NameValue from "./ValueInput";
import RadioPaymentMethod from "./RadioPaymentMethod";
import ValueInput from "./ValueInput";
import PaymentNameNumber from "./PaymentNameNumber";
import AccountInfoCheckbox from "./AccountInfoCheckbox";
import OrderSummary from "./OrderSummary";
import Total from "../Total";
import ReviewPaymentBtn from "../CartMenu/ReviewPaymentBtn";
import PlaceOrderBtn from "./Btn/PlaceOrderBtn";
import DeliverySelect from "./DeliverySelect";
import CheckoutBtn from "./Btn";
import OrderSummaryTitle from "./OrderSummary/OrderSummaryTitle";
import CustomerInfoTitle from "./CustomerInfoTitle";
import RemoveFromCheckout from "./Btn/RemoveFromCheckout";

const CartCheckout = () => {
  return (
    <>
      <CheckoutContainer>
        <CustomerInfoTitle />
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

          <CheckoutField>Delivery</CheckoutField>
          <CheckoutField>:</CheckoutField>

          <DeliverySelect />

          <CheckoutField>Address</CheckoutField>
          <CheckoutField>:</CheckoutField>
          <CheckoutValue>
            <AddressValue />
          </CheckoutValue>

          <CheckoutField>Payment</CheckoutField>
          <CheckoutField>:</CheckoutField>

          <RadioPaymentMethod />
          <PaymentNameNumber />
        </CheckoutGridContainer>
        <AccountInfoCheckbox />
        <OrderSummaryTitle />
        <OrderSummary />
        <RemoveFromCheckout />
      </CheckoutContainer>
      <Total />
      <CheckoutBtn />
      <hr
        style={{
          border: "1px solid white",
          width: "100%",
          marginBottom: "20px",
          marginTop: "20px",
        }}
      />
    </>
  );
};

export default CartCheckout;
