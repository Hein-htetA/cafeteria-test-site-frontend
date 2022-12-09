const reducer = (state, action) => {
  // console.log("menu reducer run");
  const copyState = JSON.parse(JSON.stringify(state));
  const menuUiState = {
    imageError: false,
    nameError: false,
    priceError: false,
    deleteConfirmationBox: false,
    deleteLoading: false,
    saveLoading: false,
    deleteError: false,
    deleteSuccess: false,
    saveError: false,
    saveSuccess: false,
  };
  switch (action.type) {
    case "SET_MENU_STATE":
      const tempState1 = action.payload.data.map((menu) => ({
        ...menu,
        ...menuUiState,
      }));
      return {
        ...copyState,
        data: tempState1,
        menuLoading: false,
        menuError: false,
      };

    case "MENU_LOADING":
      return { ...copyState, menuLoading: true, menuError: false };

    case "MENU_ERROR":
      return { ...copyState, menuLoading: false, menuError: true };

    case "UPDATE_MENU_STATE":
      const { _id, name, price, description, imageUrl } = action.payload;
      const tempState2 = copyState.data.map((menu) => {
        if (menu._id === action.payload._id) {
          return { ...menu, _id, name, price, description, imageUrl };
        }
        return menu;
      });
      return { ...copyState, data: tempState2 };

    case "DELETE_MENU_STATE":
      const tempState3 = copyState.data.filter(
        (menu) => menu._id !== action.payload._id
      );
      return { ...copyState, data: tempState3 };

    case "ADD_NEW_MENU":
      console.log(action.payload.data);
      copyState.data.push({
        ...action.payload.data,
        ...menuUiState,
      });
      return { ...copyState };
    default:
      throw new Error("action type not supported");
  }
};

export { reducer };
