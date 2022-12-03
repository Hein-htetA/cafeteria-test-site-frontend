export const reducer = (state, action) => {
  const copyState = JSON.parse(JSON.stringify(state)); //treating react state as Read-Only
  const orderUiState = {
    messageHide: true,
    detailHide: false,
    detailContainerHeight: 0,
    updateLoading: false,
    updateError: false,
    displayConfirmationBox: false,
    deleteConfirmation: false,
    paymentStatusLoading: false,
    paymentStatusError: false,
    paymentStatusNoEdit: true, //To display nothing before editing payment status
  };

  switch (action.type) {
    case "ON_CHANGE_INPUT_SELECT":
      const tempState1 = state.map((order) => {
        if (order._id === action.payload.id) {
          order.paymentStatus = action.payload.value === "true";
          order.paymentStatusLoading = true;
          order.paymentStatusNoEdit = false;
          order.paymentStatusError = false;
        }
        return order;
      });
      return tempState1;
    case "STOP_PAYMENT_STATUS_UPDATE_LOADING":
      const tempState15 = state.map((order) => {
        if (order._id === action.payload.id) {
          order.paymentStatusLoading = false;
        }
        return order;
      });
      return tempState15;
    case "PAYMENT_STATUS_UPDATE_ERROR":
      const tempState16 = state.map((order) => {
        if (order._id === action.payload.id) {
          order.paymentStatusLoading = false;
          order.paymentStatusError = true;
        }
        return order;
      });
      return tempState16;
    case "ON_CLICK_HIDE_SHOW":
      const tempState2 = copyState.map((order) => {
        if (order._id === action.payload.id) {
          order[action.payload.item] = !order[action.payload.item];
        }
        return order;
      });

      return tempState2;

    case "SEND_TO_ORDER":
      const tempState3 = copyState.map((order) => {
        if (order._id === action.payload.id) {
          order.orderState = "order";
          order.status = "accepted";
          order.updateError = false;
          order.updateLoading = false;
          order.updatedAt = action.payload.updatedAt;
        }
        return order;
      });

      return tempState3;

    case "UPDATE_LOADING":
      const tempState11 = copyState.map((order) => {
        if (order._id === action.payload.id) {
          order.updateLoading = true;
          order.updateError = false;
        }
        return order;
      });

      return tempState11;

    case "UPDATE_ERROR":
      const tempState12 = copyState.map((order) => {
        if (order._id === action.payload.id) {
          order.updateLoading = false;
          order.updateError = true;
        }
        return order;
      });

      return tempState12;

    case "SEND_TO_RECYCLE_BIN":
      const tempState4 = copyState.map((order) => {
        if (order._id === action.payload.id) {
          order.status = "received";
          order.orderState = "recycleBin";
          order.updateLoading = false;
          order.updatedAt = action.payload.updatedAt;
        }
        return order;
      });

      return tempState4;

    case "SEND_TO_HISTORY":
      const tempState6 = copyState.map((order) => {
        if (order._id === action.payload.id) {
          console.log("send to history if run");
          order.status = "onDelivery";
          order.paymentStatus = true;
          order.orderState = "history";
          order.updateLoading = false;
          order.updatedAt = action.payload.updatedAt;
        }
        return order;
      });

      return tempState6;

    case "SEND_TO_ON_DELIVERY":
      const tempState9 = copyState.map((order) => {
        if (order._id === action.payload.id) {
          order.status = "onDelivery";
          order.orderState = "onDelivery";
          order.updateLoading = false;
          order.updatedAt = action.payload.updatedAt;
        }
        return order;
      });
      return tempState9;

    case "SET_DETAIL_CONTAINER_HEIGHT":
      //console.log("detail conainer reducer run");
      const tempState5 = copyState.map((order) => {
        if (order._id === action.payload.id) {
          order.detailContainerHeight = action.payload.value;
        }
        return order;
      });

      return tempState5;
    case "ON_CLICK_DETAIL_HIDE":
      const tempState7 = copyState.map((order) => {
        if (order._id === action.payload.id) {
          order.detailHide = true;
        }
        return order;
      });

      return tempState7;

    case "SET_ORDER_STATE":
      const tempState8 = action.payload.data.map((order) => {
        return { ...order, ...orderUiState };
      });
      return tempState8;

    case "ADD_NEW_ORDER": //For SSE
      copyState.push({ ...action.payload.data, ...orderUiState });
      return copyState;

    case "REMOVE_ORDER":
      const tempState10 = copyState.filter(
        (order) => order._id !== action.payload.id
      );
      return tempState10;

    case "SHOW_DELETE_CONFIRMATION_BOX":
      const tempState13 = copyState.map((order) => {
        if (order._id === action.payload.id) {
          order.displayConfirmationBox = true;
        }
        return order;
      });
      return tempState13;

    case "HIDE_DELETE_CONFIRMATION_BOX":
      const tempState14 = copyState.map((order) => {
        if (order._id === action.payload.id) {
          order.displayConfirmationBox = false;
        }
        return order;
      });
      return tempState14;

    default:
      throw new Error("action type not supported yet");
  }
};
