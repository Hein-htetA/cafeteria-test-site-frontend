export const reducer = (state, action) => {
  console.log("reducer run");
  const copyState = JSON.parse(JSON.stringify(state)); //treating react state as Read-Only

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
      const tempState2 = copyState.map((order) => {
        if (order.id === action.payload.id) {
          order[action.payload.item] = !order[action.payload.item];
        }
        return order;
      });

      return tempState2;

    case "SEND_TO_ORDER_RECEIVED":
      const tempState3 = copyState.map((order) => {
        if (order.id === action.payload.id) {
          order.status = "accepted";
        }
        return order;
      });

      return tempState3;

    case "SEND_TO_RECYCLE_BIN":
      const tempState4 = copyState.map((order) => {
        if (order.id === action.payload.id) {
          order.status = "recycleBin";
        }
        return order;
      });

      return tempState4;

    case "SET_DETAIL_CONTAINER_HEIGHT":
      const tempState5 = copyState.map((order) => {
        if (order.id === action.payload.id) {
          order.detailContainerHeight = action.payload.value;
        }
        return order;
      });

      return tempState5;
    // case "DETAIL_HIDE":
    //   const tempState3 = copyState.map((order) => {
    //     if (order.id === action.payload.id) {
    //       order.detailHide = true;
    //     }
    //     return order;
    //   });
    //   return tempState3;

    default:
      throw new Error("action type not supported yet");
  }
};
