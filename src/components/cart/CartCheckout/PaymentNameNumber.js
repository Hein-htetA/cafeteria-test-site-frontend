import React from "react";
import CheckoutField from "./CheckoutField";
import CheckoutValue from "./CheckoutValue";
import PaymentNameInput from "./PaymentNameInput";
import PaymentNumberInput from "./PaymentNumberInput";

const PaymentNameNumber = ({
  paymentMethod,
  onChangeAdditionalInfo,
  paymentNameError,
  paymentNumberError,
}) => {
  return (
    <>
      <CheckoutField>
        <div style={{ textAlign: "right", fontSize: "0.9rem" }}>
          Name<span style={{ color: "red" }}>*</span>
        </div>
      </CheckoutField>
      <CheckoutField>:</CheckoutField>
      <CheckoutValue error={paymentNameError}>
        <PaymentNameInput
          name={paymentMethod.additionalInfo.name}
          onChangeAdditionalInfo={onChangeAdditionalInfo}
          paymentNameError={paymentNameError}
        />
      </CheckoutValue>

      <CheckoutField>
        <div style={{ textAlign: "right", fontSize: "0.9rem" }}>
          Number<span style={{ color: "red" }}>*</span>
        </div>
      </CheckoutField>
      <CheckoutField>:</CheckoutField>
      <CheckoutValue error={paymentNumberError}>
        <PaymentNumberInput
          number={paymentMethod.additionalInfo.number}
          onChangeAdditionalInfo={onChangeAdditionalInfo}
          paymentNumberError={paymentNumberError}
        />
      </CheckoutValue>
    </>
  );
};

export default PaymentNameNumber;
