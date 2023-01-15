import { createListenerMiddleware } from "@reduxjs/toolkit";

const menuStorageMiddleware = createListenerMiddleware();

menuStorageMiddleware.startListening({
  predicate: (action, currentState, previousState) => {
    return (
      currentState.restaurant.menuData !== previousState.restaurant.menuData
    );
  },
  effect: (action, listenerApi) => {
    console.log("menu storage ran");
    sessionStorage.setItem(
      "menu",
      JSON.stringify(listenerApi.getState().restaurant.menuData)
    );
  },
});

export default menuStorageMiddleware;
