import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./features/user/userSlice";
import orderSlice from "./features/user/orderSlice";
import { handleLocalStorageMiddleware } from "./middleware/handleLocalStorage";

const store = configureStore({
  reducer: {
    user: userSlice,
    order: orderSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(handleLocalStorageMiddleware),
});

export default store;
