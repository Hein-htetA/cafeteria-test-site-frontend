const reducer = (state, action) => {
  // console.log("menu reducer run");
  const stateCopy = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case "EDIT_INPUT":
      const { id, category, name, ref, item } = action.payload;
      const tempState = stateCopy.map((menu) => {
        if (menu.id === id) {
          ref.current.focus();
          if (category !== "priceEdit") {
            ref.current.setSelectionRange(0, JSON.stringify(menu[name]).length);
          }
          menu.beatOnce[item] = true;
          menu[category] = true;
        }
        return menu;
      });
      return tempState;

    case "STOP_ANIMATION":
      const tempState1 = stateCopy.map((menu) => {
        if (menu.id === action.payload.id) {
          menu.beatOnce[action.payload.item] = false;
        }
        return menu;
      });
      return tempState1;

    case "ONCHANGE_INPUT":
      // console.log("onchange reducer run");
      // console.log("payload", action.payload);
      const tempState2 = stateCopy.map((menu) => {
        if (menu.id === action.payload.id) {
          console.log("if in reducer run");
          menu[action.payload.category] = action.payload.value;
        }
        return menu;
      });
      return tempState2;

    case "ONCHANGE_IMAGE":
      const tempState3 = stateCopy.map((menu) => {
        if (menu.id === action.payload.id) {
          menu.image = action.payload.image;
        }
        return menu;
      });
      return tempState3;
    case "IMAGE_ERROR_TRUE":
      const tempState4 = stateCopy.map((menu) => {
        if (menu.id === action.payload.id) {
          menu.imageError = true;
          menu.image = "";
        }
        return menu;
      });
      return tempState4;
    case "IMAGE_ERROR_FALSE":
      const tempState5 = stateCopy.map((menu) => {
        if (menu.id === action.payload.id) {
          menu.imageError = false;
        }
        return menu;
      });
      return tempState5;

    default:
      throw new Error("action type not supported");
  }
};

export { reducer };
