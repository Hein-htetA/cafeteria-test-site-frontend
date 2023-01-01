import { createContext, useContext, useReducer } from "react";
import { localBaseUrl } from "../components/utils/baseUrl";
import { reducer } from "./OrderReducer";

const OrderContext = createContext();

const OrderContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    data: [],
    orderLoading: false,
    orderError: false,
    sseUpdateLoading: false,
    sseUpdateError: false,
  });

  // console.log(state);

  const onChangeInputSelect = async (id, event) => {
    dispatch({
      type: "ON_CHANGE_INPUT_SELECT",
      payload: {
        id,
        value: event.target.value,
      },
    });

    const order = state.data.find((order) => order._id === id);

    const requestOptions = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        orderId: id,
        paymentStatus: !order.paymentStatus, //this state is before dispatch state change
      }),
    };
    try {
      const response = await fetch(`${localBaseUrl}/orders`, requestOptions);

      if (!response.ok) {
        dispatch({
          type: "PAYMENT_STATUS_UPDATE_ERROR",
          payload: {
            id,
          },
        });
        throw new Error("Update Failed");
      }

      dispatch({
        type: "STOP_PAYMENT_STATUS_UPDATE_LOADING",
        payload: {
          id,
        },
      });
    } catch (error) {
      dispatch({
        type: "PAYMENT_STATUS_UPDATE_ERROR",
        payload: {
          id,
        },
      });
      console.log(error);
    }
  };

  const retryPaymentStatus = async (id) => {
    const order = state.data.find((order) => order._id === id);

    dispatch({
      type: "ON_CHANGE_INPUT_SELECT",
      payload: {
        id,
        value: order.paymentStatus,
      },
    });

    const requestOptions = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        orderId: id,
        paymentStatus: order.paymentStatus,
      }),
    };
    try {
      const response = await fetch(`${localBaseUrl}/orders`, requestOptions);

      if (!response.ok) {
        dispatch({
          type: "PAYMENT_STATUS_UPDATE_ERROR",
          payload: {
            id,
          },
        });
        throw new Error("Update Failed");
      }

      dispatch({
        type: "STOP_PAYMENT_STATUS_UPDATE_LOADING",
        payload: {
          id,
        },
      });
    } catch (error) {
      dispatch({
        type: "PAYMENT_STATUS_UPDATE_ERROR",
        payload: {
          id,
        },
      });
      console.log(error);
    }
  };

  const onClickHideShow = (id, item) => {
    dispatch({
      type: "ON_CLICK_HIDE_SHOW",
      payload: {
        id,
        item,
      },
    });
  };

  const onClickDetailHide = (id) => {
    dispatch({
      type: "ON_CLICK_DETAIL_HIDE",
      payload: {
        id,
      },
    });
  };

  const setDetailContainerHeight = (id, value) => {
    dispatch({
      type: "SET_DETAIL_CONTAINER_HEIGHT",
      payload: {
        id,
        value,
      },
    });
  };

  const sendToRecycleBin = async (id) => {
    const requestOptions = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        orderId: id,
        orderState: "recycleBin",
        status: "received",
      }),
    };
    try {
      dispatch({
        type: "UPDATE_LOADING",
        payload: {
          id,
        },
      });
      const response = await fetch(`${localBaseUrl}/orders`, requestOptions);
      if (!response.ok) {
        dispatch({
          type: "UPDATE_ERROR",
          payload: {
            id,
          },
        });
        throw new Error("Update Failed");
      }
      const { updatedAt } = await response.json();
      dispatch({
        type: "SEND_TO_RECYCLE_BIN",
        payload: {
          id,
          updatedAt,
        },
      });
    } catch (error) {
      dispatch({
        type: "UPDATE_ERROR",
        payload: {
          id,
        },
      });
      console.log(error);
    }
  };

  const sendToOrderReceived = async (id) => {
    const requestOptions = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        orderId: id,
        orderState: "order",
        status: "accepted",
      }),
    };
    try {
      dispatch({
        type: "UPDATE_LOADING",
        payload: {
          id,
        },
      });
      const response = await fetch(`${localBaseUrl}/orders`, requestOptions);
      if (!response.ok) {
        dispatch({
          type: "UPDATE_ERROR",
          payload: {
            id,
          },
        });
        throw new Error("Update Failed");
      }
      const { updatedAt } = await response.json();
      dispatch({
        type: "SEND_TO_ORDER",
        payload: {
          id,
          updatedAt,
        },
      });
    } catch (error) {
      dispatch({
        type: "UPDATE_ERROR",
        payload: {
          id,
        },
      });
      console.log(error);
    }
  };

  const sendToHistory = async (id) => {
    const requestOptions = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        orderId: id,
        orderState: "history",
        status: "accepted",
        paymentState: true,
      }),
    };
    try {
      dispatch({
        type: "UPDATE_LOADING",
        payload: {
          id,
        },
      });
      const response = await fetch(`${localBaseUrl}/orders`, requestOptions);
      if (!response.ok) {
        dispatch({
          type: "UPDATE_ERROR",
          payload: {
            id,
          },
        });
        throw new Error("Update Failed");
      }
      const { updatedAt } = await response.json();
      dispatch({
        type: "SEND_TO_HISTORY",
        payload: {
          id,
          updatedAt,
        },
      });
    } catch (error) {
      dispatch({
        type: "UPDATE_ERROR",
        payload: {
          id,
        },
      });
      console.log(error);
    }
  };

  const sendToOnDelivery = async (id) => {
    const requestOptions = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        orderId: id,
        orderState: "onDelivery",
        status: "accepted",
      }),
    };
    try {
      dispatch({
        type: "UPDATE_LOADING",
        payload: {
          id,
        },
      });
      const response = await fetch(`${localBaseUrl}/orders`, requestOptions);
      if (!response.ok) {
        dispatch({
          type: "UPDATE_ERROR",
          payload: {
            id,
          },
        });
        throw new Error("Update Failed");
      }
      const { updatedAt } = await response.json();
      dispatch({
        type: "SEND_TO_ON_DELIVERY",
        payload: {
          id,
          updatedAt,
        },
      });
    } catch (error) {
      dispatch({
        type: "UPDATE_ERROR",
        payload: {
          id,
        },
      });
      console.log(error);
    }
  };

  const removeOrder = async (id) => {
    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        orderId: id,
      }),
    };
    try {
      dispatch({
        type: "UPDATE_LOADING",
        payload: {
          id,
        },
      });
      const response = await fetch(
        `${localBaseUrl}/orders/${id}`,
        requestOptions
      );
      if (!response.ok) {
        dispatch({
          type: "UPDATE_ERROR",
          payload: {
            id,
          },
        });
        throw new Error("Update Failed");
      }
      dispatch({
        type: "REMOVE_ORDER",
        payload: {
          id,
        },
      });
    } catch (error) {
      dispatch({
        type: "UPDATE_ERROR",
        payload: {
          id,
        },
      });
      console.log(error);
    }
  };

  const setUpdateOrderState = (controller, restaurantId) => {
    const fetchOrder = async () => {
      try {
        dispatch({ type: "SSE_UPDATE_LOADING" });
        const requestOptions = {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          signal: controller.signal,
        };
        const response = await fetch(
          `${localBaseUrl}/orders/restaurant/${restaurantId}`,
          requestOptions
        );
        if (!response.ok) {
          const message = `An error has occured: ${response.status}`;
          throw new Error(message);
        }
        const responseData = await response.json();
        dispatch({
          type: "SET_ORDER_STATE",
          payload: {
            data: responseData.data,
          },
        });
        // updateFetchSuccessful();
        // console.log("data", responseData.data);
      } catch (e) {
        //setUpdateError();
        dispatch({
          type: "SSE_UPDATE_ERROR",
        });
        console.log(e);
      }
    };
    fetchOrder();
  };

  const setOrderState = (controller, restaurantId) => {
    const fetchOrder = async () => {
      try {
        //setOrderLoading();
        dispatch({ type: "ORDER_LOADING" });
        const requestOptions = {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          signal: controller.signal,
        };
        const response = await fetch(
          `${localBaseUrl}/orders/restaurant/${restaurantId}`,
          requestOptions
        );
        if (!response.ok) {
          const message = `An error has occured: ${response.status}`;
          throw new Error(message);
        }
        const responseData = await response.json();
        dispatch({
          type: "SET_ORDER_STATE",
          payload: {
            data: responseData.data,
          },
        });
        //orderFetchSuccessful();
        // console.log("data", responseData.data);
      } catch (e) {
        //setOrderError();
        dispatch({ type: "ORDER_ERROR" });
        console.log(e);
      }
    };
    fetchOrder();
  };

  const addNewOrder = (data) => {
    //for sse
    dispatch({
      type: "ADD_NEW_ORDER",
      payload: {
        data,
      },
    });
  };

  const displayRejectConfirmationBox = (id) => {
    dispatch({
      type: "DISPLAY_REJECT_CONFIRMATION_BOX",
      payload: {
        id,
      },
    });
  };

  const hideRejectConfirmationBox = (id) => {
    dispatch({
      type: "HIDE_REJECT_CONFIRMATION_BOX",
      payload: {
        id,
      },
    });
  };

  return (
    <OrderContext.Provider
      value={{
        ...state,
        onChangeInputSelect,
        onClickHideShow,
        sendToRecycleBin,
        sendToOrderReceived,
        setDetailContainerHeight,
        sendToHistory,
        onClickDetailHide,
        sendToOnDelivery,
        setOrderState,
        addNewOrder,
        removeOrder,
        displayRejectConfirmationBox,
        hideRejectConfirmationBox,
        retryPaymentStatus,
        setUpdateOrderState,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

const useOrderContext = () => {
  return useContext(OrderContext);
};

export { OrderContext, OrderContextProvider, useOrderContext };
