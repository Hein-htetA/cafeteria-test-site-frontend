import React, { useEffect } from "react";
import { useState } from "react";
import { useCartContext } from "../../../Context/CartContext";
import { useUserContext } from "../../../Context/UserContext";
import LoadingOrder from "../../order/OrderStates/LoadingOrder";
import { localBaseUrl } from "../../utils/baseUrl";
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
import EmptyOrderHistory from "./OrderHistoryState/EmptyOrderHistory";
import OrderStatus from "./OrderStatus";
import OrderSummaryTitleInOrder from "./OrderSummaryTitleInOrder";
import OrderSummaryTotal from "./OrderSummaryTotal";
import RestaurantDetail from "./RestaurantDetail/RestaurantDetail";
import RestaurantDetailTitle from "./RestaurantDetail/RestaurantDetailTitle";
import TodayOrdersTitle from "./TodayOrdersTitle";

const CartOrder = () => {
  const { orderHistory, showHideOrderHistory, orderHistoryLoading } =
    useCartContext();

  if (orderHistoryLoading) {
    return (
      <>
        <TodayOrdersTitle />
        <div style={{ height: "15px" }}></div>
        <LoadingOrder />
      </>
    );
  }

  if (orderHistory.length === 0) {
    return (
      <>
        <TodayOrdersTitle />
        <EmptyOrderHistory />;
      </>
    );
  }

  return (
    <>
      <TodayOrdersTitle />
      {orderHistory.map((order) => {
        return (
          <CartOrderContainer key={order._id} orderState={order.orderState}>
            <CheckoutGridContainer>
              <CheckoutField>Order Id</CheckoutField>
              <CheckoutField>:</CheckoutField>
              <div>{order._id}</div>

              <CheckoutField>Status</CheckoutField>
              <CheckoutField>:</CheckoutField>
              <OrderStatus
                orderState={order.orderState}
                updatedAt={order.updatedAt}
              />
            </CheckoutGridContainer>
            <hr
              style={{
                border: "1px solid white",
                width: "100%",
                marginBottom: "10px",
                marginTop: "10px",
              }}
            />
            <OrderSummaryTitleInOrder
              hideOrderSummary={order.hideOrderSummary}
              type="hideOrderSummary"
              showHideOrderHistory={showHideOrderHistory}
              orderId={order._id}
            />
            {!order.hideOrderSummary && (
              <>
                <OrderSummary
                  menuArray={order.menuArray}
                  amount={order.totalAmount}
                  deliveryFee={(order.requestDelivery === "true" ? 1 : 0) * 100}
                />
                <OrderSummaryTotal
                  amount={
                    order.totalAmount +
                    (order.requestDelivery === "true" ? 1 : 0) * 100
                  }
                />
              </>
            )}

            <hr
              style={{
                border: "1px solid white",
                width: "100%",
                marginBottom: "10px",
              }}
            />

            <RestaurantDetailTitle
              hideRestaurantDetails={order.hideRestaurantDetails}
              type="hideRestaurantDetails"
              showHideOrderHistory={showHideOrderHistory}
              orderId={order._id}
            />
            {!order.hideRestaurantDetails && (
              <RestaurantDetail restaurantId={order.restaurantId} />
            )}
            <hr
              style={{
                border: "1px solid white",
                width: "100%",
                marginBottom: "10px",
                marginTop: "10px",
              }}
            />
            <CustomerDetailTitle
              hideCustomerDetails={order.hideCustomerDetails}
              type="hideCustomerDetails"
              showHideOrderHistory={showHideOrderHistory}
              orderId={order._id}
            />
            {!order.hideCustomerDetails && (
              <CustomerDetail
                customerName={order.customerName}
                phoneNumber={order.phoneNumber}
                requestDelivery={order.requestDelivery}
                address={order.address}
                paymentMethod={order.paymentMethod}
              />
            )}
          </CartOrderContainer>
        );
      })}
    </>
  );
};

export default CartOrder;
