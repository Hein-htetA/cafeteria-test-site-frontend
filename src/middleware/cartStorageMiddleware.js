import { createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit";
import {
  addToCart,
  backToCart,
  cartToCheckout,
  toggleItemsCount,
} from "../features/cartSlice";

const cartStorageMiddleware = createListenerMiddleware();

cartStorageMiddleware.startListening({
  matcher: isAnyOf(addToCart, toggleItemsCount, backToCart, cartToCheckout),
  effect: (action, listenerApi) => {
    sessionStorage.setItem(
      "cart",
      JSON.stringify(listenerApi.getState().cart.cart)
    );
  },
});

export default cartStorageMiddleware;
