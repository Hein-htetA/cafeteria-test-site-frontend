import { createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit";
import { addToCart, toggleItemsCount } from "../features/cartSlice";

const cartStorageMiddleware = createListenerMiddleware();

cartStorageMiddleware.startListening({
  matcher: isAnyOf(addToCart, toggleItemsCount),
  effect: (action, listenerApi) => {
    console.log("car midd ran");
    sessionStorage.setItem(
      "cart",
      JSON.stringify(listenerApi.getState().cart.cart)
    );
  },
});

export default cartStorageMiddleware;
