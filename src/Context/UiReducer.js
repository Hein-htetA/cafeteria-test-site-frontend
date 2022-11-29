const reducer = (state, action) => {
  // console.log("ui reducer run");
  switch (action.type) {
    case "TOGGLE_NAVBAR":
      const { navbar } = { ...state };
      return { ...state, navbar: !navbar };
    case "TOGGLE_ORDER_NAV":
      const { orderNav } = { ...state };
      return { ...state, orderNav: !orderNav };
    case "SET_ORDER_LOADING":
      return { ...state, orderLoading: true, orderError: false };
    case "SET_ORDER_ERROR":
      return { ...state, orderLoading: false, orderError: true };
    case "ORDER_FETCH_SUCCESSFUL":
      return { ...state, orderLoading: false, orderError: false };
    default:
      throw new Error("action type not supported");
  }
};

export { reducer };
