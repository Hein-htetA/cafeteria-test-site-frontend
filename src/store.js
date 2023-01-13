import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./features/userSlice";
import orderSlice from "./features/orderSlice";
import { handleLocalStorageMiddleware } from "./middleware/handleLocalStorage";
import restaurantSlice from "./features/restaurantSlice";
import publicDataSlice from "./features/publicDataSlice";
import cartSlice from "./features/cartSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    order: orderSlice,
    restaurant: restaurantSlice,
    publicData: publicDataSlice,
    cart: cartSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(handleLocalStorageMiddleware),
});

export default store;
