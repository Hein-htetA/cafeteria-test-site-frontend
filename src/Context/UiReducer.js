const reducer = (state, action) => {
  // console.log("ui reducer run");
  switch (action.type) {
    case "TOGGLE_NAVBAR":
      const { navbar } = { ...state };
      return { ...state, navbar: !navbar };
    case "TOGGLE_ORDER_NAV":
      const { orderNav } = { ...state };
      return { ...state, orderNav: !orderNav };
    case "ONLINE_INDICATE":
      return { ...state, online: action.payload.value };
    default:
      throw new Error("action type not supported");
  }
};

export { reducer };
