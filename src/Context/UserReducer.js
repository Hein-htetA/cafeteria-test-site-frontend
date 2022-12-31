const reducer = (state, action) => {
  switch (action.type) {
    case "ONLINE_INDICATE":
      return { ...state, online: action.payload.value };
    case "SET_LOGGED_IN":
      return { ...state, isLoggedIn: true };
    case "SET_USER":
      return { ...state, user: action.payload };
    case "SET_RESTAURANT":
      return { ...state, restaurant: action.payload };
    case "LOGOUT_USER":
      return { ...state, isLoggedIn: false, user: {} };
    default:
      throw new Error("action type not supported");
  }
};

export { reducer };
