import { createListenerMiddleware } from "@reduxjs/toolkit";

const publicRestaurantsStorageMiddleware = createListenerMiddleware();

publicRestaurantsStorageMiddleware.startListening({
  predicate: (action, currentState, previousState) => {
    return (
      currentState.publicData.publicRestaurants !==
      previousState.publicData.publicRestaurants
    );
  },
  effect: (action, listenerApi) => {
    sessionStorage.setItem(
      "publicRestaurants",
      JSON.stringify(listenerApi.getState().publicData.publicRestaurants)
    );
  },
});

export default publicRestaurantsStorageMiddleware;
