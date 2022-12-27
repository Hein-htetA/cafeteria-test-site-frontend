import React, { useEffect, useState } from "react";
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
  const { checkout, clearCheckout, backToCart } = useCartContext();
  const navigate = useNavigate();

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
        name: user.name,
        phone: user.phone,
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

  // const handlePlaceOrder = () => {
  //   const error = ValidateCheckout(formValues);
  //   setFormErrors({ ...formErrors, ...error });
  // };

  const handlePlaceOrder = async () => {
    const error = ValidateCheckout(formValues);
    setFormErrors({ ...formErrors, ...error });
    if (Object.keys(error).length !== 0) return;

    //preparing for req body
    const order = checkout.menuArray.map((menu) => {
      const { _id, name, count } = menu;
      return { menuId: _id, name, count };
    });

    const restaurantId = checkout.restaurantId;

    const message = checkout.message;

    const customerId = user._id;

    const customerName = user.name;

    const totalAmount = checkout.totalAmount;

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...formValues,
        phoneNumber:
          formValues.phoneNumber[0] === "0"
            ? formValues.phoneNumber.slice(1)
            : formValues.phoneNumber.slice(0),
        order,
        restaurantId,
        message,
        customerId,
        customerName,
        totalAmount,
      }),
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
      // const { restaurant, user } = await response.json();
      setPlaceOrderStatus({
        ...placeOrderStatus,
        placeOrderLoading: false,
        placeOrderError: false,
        placeOrderSuccess: true,
      });

      // navigate(`/myAccount/cart/cartOrder`, {
      //   replace: true,
      // });
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

  if (Object.keys(checkout).length === 0) {
    return <EmptyCheckout />;
  }

  return (
    <>
      {JSON.stringify(formValues)}
      {JSON.stringify(formErrors)}
      <CheckoutContainer>
        {/* <CheckoutError />
        <CheckoutLoading /> */}
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
        <OrderSummary checkout={checkout} />
        <RemoveFromCheckout clearCheckout={clearCheckout} />
        {/*Cross sign at the top*/}
      </CheckoutContainer>
      <Total amount={checkout.restaurantTotalAmount + 100} />
      <CheckoutBtn
        backToCart={backToCart}
        handlePlaceOrder={handlePlaceOrder}
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
