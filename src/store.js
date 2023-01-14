import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./features/userSlice";
import orderSlice from "./features/orderSlice";
import { handleLocalStorageMiddleware } from "./middleware/handleLocalStorage";
import restaurantSlice from "./features/restaurantSlice";
import publicDataSlice from "./features/publicDataSlice";
import cartSlice from "./features/cartSlice";
import calculateTotalMiddleware from "./middleware/calculateTotalMiddleware";
import cartStorageMiddleware from "./middleware/cartStorageMiddleware";

const store = configureStore({
  reducer: {
    user: userSlice,
    order: orderSlice,
    restaurant: restaurantSlice,
    publicData: publicDataSlice,
    cart: cartSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .prepend(
        calculateTotalMiddleware.middleware,
        cartStorageMiddleware.middleware
      )
      .concat(handleLocalStorageMiddleware),
});

export default store;
