import React from "react";
import { useSelector } from "react-redux";
import LoadingOrder from "../../order/OrderStates/LoadingOrder";
import CheckoutField from "../CartCheckout/CheckoutField";
import CheckoutGridContainer from "../CartCheckout/CheckoutGridContainer";
import OrderSummary from "../CartCheckout/OrderSummary";
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
  const orderHistory = useSelector((state) => state.cart.orderHistory);
  const orderHistoryStatus = useSelector(
    (state) => state.cart.orderHistoryStatus
  );

  if (orderHistoryStatus === "loading") {
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
              hideOrderSummary={order.orderHistoryUiState.hideOrderSummary}
              type="hideOrderSummary"
              //showHideOrderHistory={showHideOrderHistory}
              orderId={order._id}
            />
            {!order.orderHistoryUiState.hideOrderSummary && (
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
              hideRestaurantDetails={
                order.orderHistoryUiState.hideRestaurantDetails
              }
              type="hideRestaurantDetails"
              //showHideOrderHistory={showHideOrderHistory}
              orderId={order._id}
            />
            {!order.orderHistoryUiState.hideRestaurantDetails && (
              <RestaurantDetail restaurantName={order.restaurantName} />
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
              hideCustomerDetails={
                order.orderHistoryUiState.hideCustomerDetails
              }
              type="hideCustomerDetails"
              //showHideOrderHistory={showHideOrderHistory}
              orderId={order._id}
            />
            {!order.orderHistoryUiState.hideCustomerDetails && (
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
