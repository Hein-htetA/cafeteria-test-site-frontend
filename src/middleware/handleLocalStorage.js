export const handleLocalStorageMiddleware =
  (storeAPI) => (next) => (action) => {
    if (action.type === "user/logoutUser") {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    }

    return next(action);
  };
