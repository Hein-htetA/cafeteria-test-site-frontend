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
import { useCartContext } from "../../../Context/CartContext";
import EmptyCheckout from "./CheckoutStates/EmptyCheckout";
import { useUserContext } from "../../../Context/UserContext";
import CheckoutLoading from "./CheckoutStates/CheckoutLoading";
import CheckoutError from "./CheckoutStates/CheckoutError";
import { ValidateCheckout } from "./ValidateCheckout";
import { localBaseUrl } from "../../utils/baseUrl";
import { useNavigate } from "react-router-dom";

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

  const [placeOrderStatus, setPlaceOrderStatus] = useState({
    placeOrderLoading: false,
    placeOrderError: false,
    placeOrderSuccess: false,
  });

  const { user } = useUserContext();
  const { checkout, clearCheckout, backToCart, unshiftOrderHistory } =
    useCartContext();
  const navigate = useNavigate();

  const closePlaceOrderError = () => {
    setPlaceOrderStatus({ ...placeOrderStatus, placeOrderError: false });
  };

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
        customerName: user.name,
        phoneNumber: user.phone,
        address: user.address,
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

  const controller = new AbortController();

  const handlePlaceOrder = async () => {
    const error = ValidateCheckout(formValues);
    setFormErrors({ ...formErrors, ...error });
    if (Object.keys(error).length !== 0) return;

    //preparing for req body

    const restaurantId = checkout.restaurantId;

    const message = checkout.message;

    const customerId = user._id;

    const customerName = user.name;

    const totalAmount =
      checkout.restaurantTotalAmount +
      (formValues.requestDelivery === "true" ? 1 : 0) * 100;

    const menuArray = checkout.menuArray;

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        ...formValues,
        phoneNumber:
          formValues.phoneNumber[0] === "0"
            ? formValues.phoneNumber.slice(1)
            : formValues.phoneNumber.slice(0),
        restaurantId,
        message,
        customerId,
        customerName,
        totalAmount,
        menuArray,
      }),
      signal: controller.signal,
    };
    try {
      setPlaceOrderStatus({
        ...placeOrderStatus,
        placeOrderLoading: true,
        placeOrderError: false,
      });

      const response = await fetch(`${localBaseUrl}/orders`, requestOptions);

      if (!response.ok) {
        throw new Error("something went wrong!");
      }
      const { newOrder } = await response.json();

      unshiftOrderHistory(newOrder);

      clearCheckout();

      setPlaceOrderStatus({
        ...placeOrderStatus,
        placeOrderLoading: false,
        placeOrderError: false,
        placeOrderSuccess: true,
      });

      navigate(`/myAccount/cart/cartOrder`, {
        replace: true,
      });
    } catch (error) {
      setPlaceOrderStatus({
        ...placeOrderStatus,
        placeOrderLoading: false,
        placeOrderError: true,
      });
    }
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

  useEffect(() => {
    return () => {
      controller.abort();
    };
  }, []);

  if (Object.keys(checkout).length === 0) {
    return <EmptyCheckout />;
  }

  return (
    <>
      <CheckoutContainer>
        {placeOrderStatus.placeOrderLoading && <CheckoutLoading />}
        {placeOrderStatus.placeOrderError && (
          <CheckoutError closePlaceOrderError={closePlaceOrderError} />
        )}

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
        <RemoveFromCheckout clearCheckout={clearCheckout} />
        {/*Cross sign at the top*/}
      </CheckoutContainer>
      <Total
        amount={
          checkout.restaurantTotalAmount +
          (formValues.requestDelivery === "true" ? 1 : 0) * 100
        }
      />
      <CheckoutBtn
        backToCart={backToCart}
        handlePlaceOrder={handlePlaceOrder}
        placeOrderError={placeOrderStatus.placeOrderError}
        placeOrderLoading={placeOrderStatus.placeOrderLoading}
      />
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
