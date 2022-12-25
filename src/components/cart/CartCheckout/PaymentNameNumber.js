import React from "react";
import PhoneNumber from "../PhoneNumber";
import CheckoutField from "./CheckoutField";
import CheckoutGridContainer from "./CheckoutGridContainer";
import CheckoutValue from "./CheckoutValue";
import ValueInput from "./ValueInput";

const PaymentNameNumber = () => {
  return (
    <>
      <CheckoutField>
        <div style={{ textAlign: "right", fontSize: "0.9rem" }}>Name</div>
      </CheckoutField>
      <CheckoutField>:</CheckoutField>
      <CheckoutValue>
        <ValueInput />
      </CheckoutValue>

      <CheckoutField>
        <div style={{ textAlign: "right", fontSize: "0.9rem" }}>Number</div>
      </CheckoutField>
      <CheckoutField>:</CheckoutField>
      <CheckoutValue>
        <PhoneNumber />
      </CheckoutValue>
    </>
  );
};

export default PaymentNameNumber;
