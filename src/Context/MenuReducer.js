const reducer = (state, action) => {
  console.log("ui reducer run");
  switch (action.type) {
    case "TOGGLE_NAVBAR":
      const { navbar } = { ...state };
      return { ...state, navbar: !navbar };
    default:
      throw new Error("action type not supported");
  }
};

export { reducer };
