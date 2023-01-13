export const handleLocalStorageMiddleware =
  (storeAPI) => (next) => (action) => {
    if (action.type === "user/logoutUser") {
      console.log("logout midddleware running");
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      sessionStorage.removeItem("restaurant");
      sessionStorage.removeItem("menu");
    }
    return next(action);
  };
