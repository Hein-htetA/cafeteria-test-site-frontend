export const reducer = (state, action) => {
  console.log("reducer run");
  switch (action.type) {
    case "ON_CHANGE_INPUT_SELECT":
      const tempState1 = state.map((order) => {
        if (order.id === action.payload.id) {
          order[action.payload.item] = action.payload.value;
        }
        return order;
      });
      return tempState1;
    case "ON_CLICK_HIDE_SHOW":
      const copyState = JSON.parse(JSON.stringify(state)); //treating react state as Read-Only
      const tempState2 = copyState.map((order) => {
        if (order.id === action.payload.id) {
          order[action.payload.item] = !order[action.payload.item];
        }
        return order;
      });

      return tempState2;

    default:
      throw new Error("action type not supported yet");
  }
};
