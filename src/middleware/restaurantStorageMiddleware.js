import { createListenerMiddleware } from "@reduxjs/toolkit";

const restaurantStorageMiddleware = createListenerMiddleware();

restaurantStorageMiddleware.startListening({
  predicate: (action, currentState, previousState) => {
    return (
      currentState.restaurant.restaurantData !==
      previousState.restaurant.restaurantData
    );
  },
  effect: (action, listenerApi) => {
    sessionStorage.setItem(
      "restaurant",
      JSON.stringify(listenerApi.getState().restaurant.restaurantData)
    );
  },
});

export default restaurantStorageMiddleware;
