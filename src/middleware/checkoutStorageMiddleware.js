import { createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit";
import { backToCart } from "../features/cartSlice";

const checkoutStorageMiddleware = createListenerMiddleware();

checkoutStorageMiddleware.startListening({
  matcher: isAnyOf(backToCart),
  effect: (action, listenerApi) => {
    sessionStorage.setItem(
      "checkout",
      JSON.stringify(listenerApi.getState().cart.checkout)
    );
  },
});

export default checkoutStorageMiddleware;
