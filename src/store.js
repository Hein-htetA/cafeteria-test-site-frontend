import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./features/userSlice";
import orderSlice from "./features/orderSlice";
import { handleLocalStorageMiddleware } from "./middleware/handleLocalStorage";
import restaurantSlice from "./features/restaurantSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    order: orderSlice,
    restaurant: restaurantSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(handleLocalStorageMiddleware),
});

export default store;
