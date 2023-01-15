import { createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit";
import { backToCart } from "../features/cartSlice";

const checkoutStorageMiddleware = createListenerMiddleware();

checkoutStorageMiddleware.startListening({
  matcher: isAnyOf(backToCart),
  effect: (action, listenerApi) => {
    console.log("checkout midd ran");
    sessionStorage.setItem(
      "checkout",
      JSON.stringify(listenerApi.getState().cart.checkout)
    );
  },
});

export default checkoutStorageMiddleware;
