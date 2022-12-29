export const reducer = (state, action) => {
  const copyState = JSON.parse(JSON.stringify(state)); //treating react state as Read-Only
  const orderUiState = {
    messageHide: true,
    detailHide: false,
    detailContainerHeight: 0,
    updateLoading: false,
    updateError: false,
    displayRejectConfirmationBox: false,
    paymentStatusLoading: false,
    paymentStatusError: false,
    paymentStatusNoEdit: true, //To display nothing before editing payment status
  };

  switch (action.type) {
    case "ON_CHANGE_INPUT_SELECT":
      const tempState1 = copyState.data.map((order) => {
        if (order._id === action.payload.id) {
          order.paymentStatus = action.payload.value === "true";
          order.paymentStatusLoading = true;
          order.paymentStatusNoEdit = false;
          order.paymentStatusError = false;
        }
        return order;
      });
      return { ...copyState, data: tempState1 };

    case "STOP_PAYMENT_STATUS_UPDATE_LOADING":
      const tempState15 = copyState.data.map((order) => {
        if (order._id === action.payload.id) {
          order.paymentStatusLoading = false;
        }
        return order;
      });
      return { ...copyState, data: tempState15 };
    case "PAYMENT_STATUS_UPDATE_ERROR":
      const tempState16 = copyState.data.map((order) => {
        if (order._id === action.payload.id) {
          order.paymentStatusLoading = false;
          order.paymentStatusError = true;
        }
        return order;
      });
      return { ...copyState, data: tempState16 };

    case "ON_CLICK_HIDE_SHOW":
      const tempState2 = copyState.data.map((order) => {
        if (order._id === action.payload.id) {
          order[action.payload.item] = !order[action.payload.item];
        }
        return order;
      });

      return { ...copyState, data: tempState2 };

    case "SEND_TO_ORDER":
      const tempState3 = copyState.data.map((order) => {
        if (order._id === action.payload.id) {
          order.orderState = "order";
          order.status = "accepted";
          order.updateError = false;
          order.updateLoading = false;
          order.updatedAt = action.payload.updatedAt;
        }
        return order;
      });

      return { ...copyState, data: tempState3 };

    case "UPDATE_LOADING":
      const tempState11 = copyState.data.map((order) => {
        if (order._id === action.payload.id) {
          order.updateLoading = true;
          order.updateError = false;
        }
        return order;
      });

      return { ...copyState, data: tempState11 };

    case "UPDATE_ERROR":
      const tempState12 = copyState.data.map((order) => {
        if (order._id === action.payload.id) {
          order.updateLoading = false;
          order.updateError = true;
        }
        return order;
      });

      return { ...copyState, data: tempState12 };

    case "SEND_TO_RECYCLE_BIN":
      const tempState4 = copyState.data.map((order) => {
        if (order._id === action.payload.id) {
          order.status = "received";
          order.orderState = "recycleBin";
          order.updateLoading = false;
          order.updatedAt = action.payload.updatedAt;
        }
        return order;
      });

      return { ...copyState, data: tempState4 };

    case "SEND_TO_HISTORY":
      const tempState6 = copyState.data.map((order) => {
        if (order._id === action.payload.id) {
          order.status = "onDelivery";
          order.paymentStatus = true;
          order.orderState = "history";
          order.updateLoading = false;
          order.updatedAt = action.payload.updatedAt;
        }
        return order;
      });

      return { ...copyState, data: tempState6 };

    case "SEND_TO_ON_DELIVERY":
      const tempState9 = copyState.data.map((order) => {
        if (order._id === action.payload.id) {
          order.status = "onDelivery";
          order.orderState = "onDelivery";
          order.updateLoading = false;
          order.updatedAt = action.payload.updatedAt;
        }
        return order;
      });
      return { ...copyState, data: tempState9 };

    case "SET_DETAIL_CONTAINER_HEIGHT":
      //console.log("detail conainer reducer run");
      const tempState5 = copyState.data.map((order) => {
        if (order._id === action.payload.id) {
          order.detailContainerHeight = action.payload.value;
        }
        return order;
      });

      return { ...copyState, data: tempState5 };
    case "ON_CLICK_DETAIL_HIDE":
      const tempState7 = copyState.data.map((order) => {
        if (order._id === action.payload.id) {
          order.detailHide = true;
        }
        return order;
      });

      return { ...copyState, data: tempState7 };

    case "SET_ORDER_STATE":
      const tempState8 = action.payload.data.map((order) => {
        return { ...order, ...orderUiState };
      });
      return {
        ...copyState,
        data: tempState8,
        sseUpdateLoading: false,
        sseUpdateError: false,
        orderLoading: false,
        orderError: false,
      };

    case "ADD_NEW_ORDER": //For SSE
      copyState.data.push({ ...action.payload.data, ...orderUiState });
      return copyState;

    case "REMOVE_ORDER":
      const tempState10 = copyState.data.filter(
        (order) => order._id !== action.payload.id
      );
      return { ...copyState, data: tempState10 };

    case "DISPLAY_REJECT_CONFIRMATION_BOX":
      const tempState13 = copyState.data.map((order) => {
        if (order._id === action.payload.id) {
          order.displayConfirmationBox = true;
        }
        return order;
      });
      return { ...copyState, data: tempState13 };

    case "HIDE_REJECT_CONFIRMATION_BOX":
      const tempState14 = copyState.data.map((order) => {
        if (order._id === action.payload.id) {
          order.displayConfirmationBox = false;
        }
        return order;
      });
      return { ...copyState, data: tempState14 };

    case "SSE_UPDATE_LOADING":
      return { ...copyState, sseUpdateLoading: true, sseUpdateError: false };

    case "SSE_UPDATE_ERROR":
      return { ...copyState, sseUpdateLoading: false, sseUpdateError: true };

    case "ORDER_LOADING":
      return { ...copyState, orderLoading: true, orderError: false };

    case "ORDER_ERROR":
      return { ...copyState, orderLoading: false, orderError: true };

    default:
      throw new Error("action type not supported yet");
  }
};
