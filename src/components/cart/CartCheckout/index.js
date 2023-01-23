import React, { useEffect, useState } from "react";
import PhoneNumber from "../PhoneNumber";
import AddressValue from "./AddressValue";
import CheckoutContainer from "./CheckoutContainer";
import CheckoutField from "./CheckoutField";
import CheckoutGridContainer from "./CheckoutGridContainer";
import CheckoutValue from "./CheckoutValue";
import RadioPaymentMethod from "./RadioPaymentMethod";
import ValueInput from "./ValueInput";
import PaymentNameNumber from "./PaymentNameNumber";
import AccountInfoCheckbox from "./AccountInfoCheckbox";
import OrderSummary from "./OrderSummary";
import Total from "../Total";
import DeliverySelect from "./DeliverySelect";
import CheckoutBtn from "./Btn";
import OrderSummaryTitle from "./OrderSummary/OrderSummaryTitle";
import CustomerInfoTitle from "./CustomerInfoTitle";
import RemoveFromCheckout from "./Btn/RemoveFromCheckout";
import EmptyCheckout from "./CheckoutStates/EmptyCheckout";
import CheckoutLoading from "./CheckoutStates/CheckoutLoading";
import CheckoutError from "./CheckoutStates/CheckoutError";
import { ValidateCheckout } from "./ValidateCheckout";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  hideRestaurantRecentlyClosedModal,
  placeOrder,
} from "../../../features/cartSlice";
import RestaurantClosedModal from "./Modal/RestaurantClosedModal";

const CartCheckout = () => {
  const [formValues, setFormValues] = useState({
    customerName: "",
    phoneNumber: "",
    requestDelivery: "false", //mongoose will convert it to boolean
    address: "",
    paymentMethod: {
      value: "Cash",
      additionalInfo: {
        name: "",
        number: "",
      },
    },
  });

  const [formErrors, setFormErrors] = useState({
    nameError: "",
    phoneError: "",
    addressError: "",
    paymentNameError: "",
    paymentNumberError: "",
  });

  const checkout = useSelector((state) => state.cart.checkout);
  const userData = useSelector((state) => state.user.userData);
  const placeOrderStatus = useSelector((state) => state.cart.placeOrderStatus);
  const restaurantRecentlyClosedModal = useSelector(
    (state) => state.cart.restaurantRecentlyClosedModal
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onChangeInput = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const onChangeAccountInfo = (e) => {
    if (e.target.checked) {
      setFormValues({
        ...formValues,
        customerName: userData.name,
        phoneNumber: userData.phone,
        address: userData.address,
      });
    }
  };

  const onChangePaymentRadio = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: { ...formValues.paymentMethod, value: e.target.value },
    });
  };

  const onChangeAdditionalInfo = (e) => {
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

  const handlePlaceOrder = async () => {
    const error = ValidateCheckout(formValues);
    setFormErrors({ ...formErrors, ...error });
    if (Object.keys(error).length !== 0) return;
    await dispatch(placeOrder(formValues)).unwrap();
  };

  useEffect(() => {
    setFormErrors({
      nameError: "",
      phoneError: "",
      addressError: "",
      paymentNameError: "",
      paymentNumberError: "",
    });
  }, [formValues]);

  if (Object.keys(checkout).length === 0) {
    return <EmptyCheckout />;
  }

  return (
    <>
      <CheckoutContainer>
        {placeOrderStatus === "loading" && <CheckoutLoading />}
        {placeOrderStatus === "failed" && <CheckoutError />}

        <CustomerInfoTitle />
        <CheckoutGridContainer>
          <CheckoutField>
            Name<span style={{ color: "red" }}>*</span>
          </CheckoutField>
          <CheckoutField>:</CheckoutField>
          <CheckoutValue error={formErrors.nameError}>
            <ValueInput
              customerName={formValues.customerName}
              onChangeInput={onChangeInput}
              nameError={formErrors.nameError}
            />
          </CheckoutValue>

          <CheckoutField>
            Phone<span style={{ color: "red" }}>*</span>
          </CheckoutField>
          <CheckoutField>:</CheckoutField>
          <CheckoutValue error={formErrors.phoneError}>
            <PhoneNumber
              phoneNumber={formValues.phoneNumber}
              onChangeInput={onChangeInput}
              phoneError={formErrors.phoneError}
            />
          </CheckoutValue>

          <CheckoutField>Delivery</CheckoutField>
          <CheckoutField>:</CheckoutField>

          <DeliverySelect
            requestDelivery={formValues.requestDelivery}
            onChangeInput={onChangeInput}
          />

          <CheckoutField>
            Location
            <span
              style={{
                color: "red",
                visibility: JSON.parse(formValues.requestDelivery)
                  ? "visible"
                  : "hidden",
              }}
            >
              *
            </span>
          </CheckoutField>
          <CheckoutField>:</CheckoutField>
          <CheckoutValue error={formErrors.addressError}>
            <AddressValue
              address={formValues.address}
              onChangeInput={onChangeInput}
              addressError={formErrors.addressError}
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
              paymentNameError={formErrors.paymentNameError}
              paymentNumberError={formErrors.paymentNumberError}
            />
          )}
        </CheckoutGridContainer>
        <AccountInfoCheckbox onChangeAccountInfo={onChangeAccountInfo} />
        <OrderSummaryTitle />
        <OrderSummary
          menuArray={checkout.menuArray}
          amount={checkout.restaurantTotalAmount}
          deliveryFee={(formValues.requestDelivery === "true" ? 1 : 0) * 100}
        />
        <RemoveFromCheckout />
        {restaurantRecentlyClosedModal && <RestaurantClosedModal />}
        {/*Cross sign at the top*/}
      </CheckoutContainer>
      <Total
        amount={
          checkout.restaurantTotalAmount +
          (formValues.requestDelivery === "true" ? 1 : 0) * 100
        }
      />

      <CheckoutBtn handlePlaceOrder={handlePlaceOrder} />
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
