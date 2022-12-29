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

const CustomerDetail = (props) => {
  const { customerName, phoneNumber, requestDelivery, address, paymentMethod } =
    props;

  console.log("payment method cus detail", paymentMethod);
  return (
    <CheckoutGridContainer>
      <CheckoutField>Name</CheckoutField>
      <CheckoutField>:</CheckoutField>
      <div>{customerName}</div>

      <CheckoutField>Phone</CheckoutField>
      <CheckoutField>:</CheckoutField>
      <div>{"+95" + phoneNumber}</div>

      <CheckoutField>Delivery</CheckoutField>
      <CheckoutField>:</CheckoutField>
      <select
        name="requestDelivery"
        id="delivery"
        className="deli-select"
        value={requestDelivery}
        disabled
      >
        <option value="true">Request Delivery</option>
        <option value="false">Pick-Up at Restaurant</option>
      </select>

      <CheckoutField>Address</CheckoutField>
      <CheckoutField>:</CheckoutField>
      <div>{address}</div>

      <CheckoutField>Payment</CheckoutField>
      <CheckoutField>:</CheckoutField>

      <div className="radio-container">
        <div className="single-radio">
          <input
            type="radio"
            id="cash"
            name={paymentMethod.additionalInfo._id}
            value="Cash"
            checked={paymentMethod.value === "Cash"}
            readOnly
          />
          <label htmlFor="cash">Cash</label>
        </div>
        <div className="single-radio">
          <input
            type="radio"
            id="KBZPay"
            name={paymentMethod.additionalInfo._id}
            value="KBZPay"
            checked={paymentMethod.value === "KBZPay"}
            readOnly
          />
          <label htmlFor="KBZPay">KBZPay</label>
        </div>
        <div className="single-radio">
          <input
            type="radio"
            id="WavePay"
            name={paymentMethod.additionalInfo._id}
            value="WavePay"
            checked={paymentMethod.value === "WavePay"}
            readOnly
          />
          <label htmlFor="WavePay">WavePay</label>
        </div>
      </div>
      {paymentMethod.value !== "Cash" && (
        <>
          <CheckoutField>
            <div style={{ textAlign: "right", fontSize: "0.9rem" }}>
              Name<span style={{ color: "red" }}>*</span>
            </div>
          </CheckoutField>
          <CheckoutField>:</CheckoutField>
          <div>{paymentMethod.additionalInfo.name}</div>

          <CheckoutField>
            <div style={{ textAlign: "right", fontSize: "0.9rem" }}>
              Number<span style={{ color: "red" }}>*</span>
            </div>
          </CheckoutField>
          <CheckoutField>:</CheckoutField>
          <div>{paymentMethod.additionalInfo.number}</div>
        </>
      )}
    </CheckoutGridContainer>
  );
};

export default CustomerDetail;
