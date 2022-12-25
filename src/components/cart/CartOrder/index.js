import React from "react";
import CheckoutField from "../CartCheckout/CheckoutField";
import CheckoutGridContainer from "../CartCheckout/CheckoutGridContainer";
import CheckoutValue from "../CartCheckout/CheckoutValue";
import OrderSummary from "../CartCheckout/OrderSummary";
import OrderSummaryTitle from "../CartCheckout/OrderSummary/OrderSummaryTitle";
import ValueInput from "../CartCheckout/ValueInput";
import Total from "../Total";
import CartOrderContainer from "./CartOrderContainer";
import CustomerDetail from "./CustomerDetail/CustomerDetail";
import CustomerDetailTitle from "./CustomerDetail/CustomerDetailTitle";
import OrderStatus from "./OrderStatus";
import OrderSummaryTitleInOrder from "./OrderSummaryTitleInOrder";
import RestaurantDetail from "./RestaurantDetail/RestaurantDetail";
import RestaurantDetailTitle from "./RestaurantDetail/RestaurantDetailTitle";

const CartOrder = () => {
  return (
    <CartOrderContainer>
      <CheckoutGridContainer>
        <CheckoutField>Order Id</CheckoutField>
        <CheckoutField>:</CheckoutField>
        <CheckoutValue>
          <ValueInput />
        </CheckoutValue>

        <CheckoutField>Status</CheckoutField>
        <CheckoutField>:</CheckoutField>
        <OrderStatus />
      </CheckoutGridContainer>
      <hr
        style={{
          border: "1px solid white",
          width: "100%",
          marginBottom: "10px",
          marginTop: "10px",
        }}
      />
      <OrderSummaryTitleInOrder />
      <OrderSummary />
      <Total />
      <hr
        style={{
          border: "1px solid white",
          width: "100%",
          marginBottom: "10px",
        }}
      />

      <RestaurantDetailTitle />
      <RestaurantDetail />
      <hr
        style={{
          border: "1px solid white",
          width: "100%",
          marginBottom: "10px",
          marginTop: "10px",
        }}
      />
      <CustomerDetailTitle />
      <CustomerDetail />
    </CartOrderContainer>
  );
};

export default CartOrder;
