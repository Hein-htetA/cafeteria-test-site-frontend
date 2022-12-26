import React from "react";
import PhoneNumber from "../PhoneNumber";
import CheckoutField from "./CheckoutField";
import CheckoutGridContainer from "./CheckoutGridContainer";
import CheckoutValue from "./CheckoutValue";
import PaymentNameInput from "./PaymentNameInput";
import PaymentNumberInput from "./PaymentNumberInput";
import ValueInput from "./ValueInput";

const PaymentNameNumber = ({ paymentMethod, onChangeAdditionalInfo }) => {
  return (
    <>
      <CheckoutField>
        <div style={{ textAlign: "right", fontSize: "0.9rem" }}>Name</div>
      </CheckoutField>
      <CheckoutField>:</CheckoutField>
      <CheckoutValue>
        <PaymentNameInput
          name={paymentMethod.additionalInfo.name}
          onChangeAdditionalInfo={onChangeAdditionalInfo}
        />
      </CheckoutValue>

      <CheckoutField>
        <div style={{ textAlign: "right", fontSize: "0.9rem" }}>Number</div>
      </CheckoutField>
      <CheckoutField>:</CheckoutField>
      <CheckoutValue>
        <PaymentNumberInput
          number={paymentMethod.additionalInfo.number}
          onChangeAdditionalInfo={onChangeAdditionalInfo}
        />
      </CheckoutValue>
    </>
  );
};

export default PaymentNameNumber;
