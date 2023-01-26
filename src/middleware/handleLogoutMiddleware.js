import { createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit";
import { clearOrderDataOnLogout } from "../features/orderSlice";
import { clearRestaurantDataMenu } from "../features/restaurantSlice";
import { logoutUser } from "../features/userSlice";

const handleLogoutMiddleware = createListenerMiddleware();

handleLogoutMiddleware.startListening({
  matcher: isAnyOf(logoutUser),
  effect: (action, listenerApi) => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    sessionStorage.removeItem("restaurant");
    sessionStorage.removeItem("menu");
    listenerApi.dispatch(clearRestaurantDataMenu());
    listenerApi.dispatch(clearOrderDataOnLogout());
  },
});

export default handleLogoutMiddleware;
