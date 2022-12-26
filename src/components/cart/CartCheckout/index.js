import React, { useState } from "react";
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
import { useCartContext } from "../../../Context/CartContext";
import EmptyCheckout from "./EmptyCheckout/EmptyCheckout";

const CartCheckout = () => {
  const [formValues, setFormValues] = useState({
    name: "",
    phone: "",
    delivery: "true",
    address: "",
    paymentMethod: {
      value: "Cash",
      additionalInfo: {
        name: "",
        number: "",
      },
    },
  });

  const onChangeInput = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const onChangePaymentRadio = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: { ...formValues.paymentMethod, value: e.target.value },
    });
  };

  const onChangeAdditionalInfo = (e) => {
    console.log("i ran");
    setFormValues({
      ...formValues,
      paymentMethod: {
        ...formValues.paymentMethod,
        additionalInfo: {
          ...formValues.paymentMethod.additionalInfo,
          [e.target.name]: e.target.value,
        },
      },
    });
  };

  const { checkout, clearCheckout, backToCart } = useCartContext();
  if (Object.keys(checkout).length === 0) {
    return <EmptyCheckout />;
  }

  return (
    <>
      {JSON.stringify(formValues)}
      <CheckoutContainer>
        <CustomerInfoTitle />
        <CheckoutGridContainer>
          <CheckoutField>Name</CheckoutField>
          <CheckoutField>:</CheckoutField>
          <CheckoutValue>
            <ValueInput name={formValues.name} onChangeInput={onChangeInput} />
          </CheckoutValue>

          <CheckoutField>Phone</CheckoutField>
          <CheckoutField>:</CheckoutField>
          <CheckoutValue>
            <PhoneNumber
              phone={formValues.phone}
              onChangeInput={onChangeInput}
            />
          </CheckoutValue>

          <CheckoutField>Delivery</CheckoutField>
          <CheckoutField>:</CheckoutField>

          <DeliverySelect
            delivery={formValues.delivery}
            onChangeInput={onChangeInput}
          />

          <CheckoutField>Location</CheckoutField>
          <CheckoutField>:</CheckoutField>
          <CheckoutValue>
            <AddressValue
              address={formValues.address}
              onChangeInput={onChangeInput}
            />
          </CheckoutValue>

          <CheckoutField>Payment</CheckoutField>
          <CheckoutField>:</CheckoutField>

          <RadioPaymentMethod
            paymentMethod={formValues.paymentMethod}
            onChangePaymentRadio={onChangePaymentRadio}
          />
          {formValues.paymentMethod.value !== "Cash" && (
            <PaymentNameNumber
              paymentMethod={formValues.paymentMethod}
              onChangeAdditionalInfo={onChangeAdditionalInfo}
            />
          )}
        </CheckoutGridContainer>
        <AccountInfoCheckbox />
        <OrderSummaryTitle />
        <OrderSummary checkout={checkout} />
        <RemoveFromCheckout clearCheckout={clearCheckout} />
        {/*Cross sign at the top*/}
      </CheckoutContainer>
      <Total amount={checkout.restaurantTotalAmount + 100} />
      <CheckoutBtn backToCart={backToCart} />
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
