import { createListenerMiddleware } from "@reduxjs/toolkit";

const menuStorageMiddleware = createListenerMiddleware();

menuStorageMiddleware.startListening({
  predicate: (action, currentState, previousState) => {
    return (
      currentState.restaurant.menuData !== previousState.restaurant.menuData
    );
  },
  effect: (action, listenerApi) => {
    sessionStorage.setItem(
      "menu",
      JSON.stringify(listenerApi.getState().restaurant.menuData)
    );
  },
});

export default menuStorageMiddleware;
