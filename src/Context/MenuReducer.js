const reducer = (state, action) => {
  // console.log("menu reducer run");
  switch (action.type) {
    case "SET_MENU_STATE":
      return {
        ...state,
        data: action.payload.data,
        menuLoading: false,
        menuError: false,
      };

    case "UPDATE_LOCAL_RESTAURANT":
      return {
        ...state,
        restaurant: action.payload,
        restaurantLoading: false,
        restaurantError: false,
      };

    case "RESTAURANT_LOADING":
      return { ...state, restaurantLoading: true, restaurantError: false };

    case "RESTAURANT_ERROR":
      return { ...state, restaurantLoading: false, restaurantError: true };

    case "MENU_LOADING":
      return { ...state, menuLoading: true, menuError: false };

    case "MENU_ERROR":
      return { ...state, menuLoading: false, menuError: true };

    case "UPDATE_MENU_STATE":
      //const { _id, name, price, description, imageUrl } = action.payload;
      const tempState2 = state.data.map((menu) => {
        if (menu._id === action.payload._id) {
          return { ...menu, ...action.payload };
        }
        return menu;
      });
      return { ...state, data: tempState2 };

    case "DELETE_MENU_STATE":
      const tempState3 = state.data.filter(
        (menu) => menu._id !== action.payload._id
      );
      return { ...state, data: tempState3 };

    case "ADD_NEW_MENU":
      return { ...state, data: [...state.data, action.payload.data] };
    default:
      throw new Error("action type not supported");
  }
};

export { reducer };
