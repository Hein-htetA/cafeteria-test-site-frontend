import { createListenerMiddleware } from "@reduxjs/toolkit";
import { calculateTotalWholeCart } from "../features/cartSlice";

const calculateTotalMiddleware = createListenerMiddleware();

calculateTotalMiddleware.startListening({
  predicate: (action, currentState, previousState) => {
    return currentState.cart.cart !== previousState.cart.cart;
  },
  effect: (action, listenerApi) => {
    listenerApi.dispatch(calculateTotalWholeCart());
    sessionStorage.setItem(
      "totalCount",
      JSON.stringify(listenerApi.getState().cart.totalCount)
    );
  },
});

export default calculateTotalMiddleware;
