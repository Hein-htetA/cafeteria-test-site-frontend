export const handleLocalStorageMiddleware =
  (storeAPI) => (next) => (action) => {
    //console.log("middleware outside if ran");
    if (action.type === "user/logoutUser") {
      //console.log("middleware inside if ran");
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    }
    // else if (action.type === "user/loginUser") {
    //   localStorage.setItem('user', JSON.stringify(action.payload.user));
    //   localStorage.setItem('token', JSON.stringify)
    // }

    return next(action);
  };
