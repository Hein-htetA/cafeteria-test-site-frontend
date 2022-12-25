import React from "react";
import AddressValue from "../../CartCheckout/AddressValue";
import CheckoutField from "../../CartCheckout/CheckoutField";
import CheckoutGridContainer from "../../CartCheckout/CheckoutGridContainer";
import CheckoutValue from "../../CartCheckout/CheckoutValue";
import DeliverySelect from "../../CartCheckout/DeliverySelect";
import PaymentNameNumber from "../../CartCheckout/PaymentNameNumber";
import RadioPaymentMethod from "../../CartCheckout/RadioPaymentMethod";
import ValueInput from "../../CartCheckout/ValueInput";
import PhoneNumber from "../../PhoneNumber";

const CustomerDetail = () => {
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
  );
};

export default CustomerDetail;
