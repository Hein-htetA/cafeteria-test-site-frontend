import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { localBaseUrl } from "../components/utils/baseUrl";

const initialState = {
  orderData: [],
  status: "idle" || "loading" || "succeeded" || "failed",
  statusAfterSSEFailed: "idle" || "loading" || "succeeded" || "failed",
};

const orderUiState = {
  detailHide: false,
  detailContainerHeight: 0,
  updateStatus: "idle" || "loading" || "succeeded" || "failed",
  displayRejectConfirmationBox: false,
  paymentStatusStatus: "idle" || "loading" || "succeeded" || "failed",
};

const fetchInitialOrders = createAsyncThunk(
  "order/fetchInitialOrders",
  async (restaurantId, { rejectWithValue }) => {
    const requestOptions = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    try {
      const response = await fetch(
        `${localBaseUrl}/orders/restaurant/${restaurantId}`,
        requestOptions
      );

      if (!response.ok) {
        const { msg } = await response.json();
        throw new Error(msg);
      }

      const { data } = await response.json();

      const dataWithUiState = data.map((singleOrder) => {
        return { ...singleOrder, ...orderUiState };
      });

      return dataWithUiState;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const fetchOrdersAfterSSEFailed = createAsyncThunk(
  "order/fetchOrdersAfterSSEFailed",
  async (restaurantId, { rejectWithValue }) => {
    const requestOptions = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    try {
      const response = await fetch(
        `${localBaseUrl}/orders/restaurant/${restaurantId}`,
        requestOptions
      );

      if (!response.ok) {
        const { msg } = await response.json();
        throw new Error(msg);
      }

      const { data } = await response.json();

      const dataWithUiState = data.map((singleOrder) => {
        return { ...singleOrder, ...orderUiState };
      });

      return dataWithUiState;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const rejectOrder = createAsyncThunk(
  "order/rejectOrder",
  async (orderId, { rejectWithValue, dispatch }) => {
    dispatch(toggleRejectConfirmationBox(orderId));
    const requestOptions = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        orderId,
        orderState: "recycleBin",
      }),
    };
    try {
      const response = await fetch(`${localBaseUrl}/orders`, requestOptions);
      if (!response.ok) {
        throw new Error();
      }
      const { updatedAt } = await response.json();
      return updatedAt;
    } catch (error) {
      return rejectWithValue();
    }
  }
);

const acceptOrder = createAsyncThunk(
  "order/acceptOrder",
  async (orderId, { rejectWithValue }) => {
    const requestOptions = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        orderId,
        orderState: "order",
      }),
    };
    try {
      const response = await fetch(`${localBaseUrl}/orders`, requestOptions);
      if (!response.ok) {
        throw new Error();
      }
      const { updatedAt } = await response.json();
      return updatedAt;
    } catch (error) {
      return rejectWithValue();
    }
  }
);

const deliverOrder = createAsyncThunk(
  "order/deliveryOrder",
  async (orderId, { rejectWithValue }) => {
    const requestOptions = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        orderId,
        orderState: "onDelivery",
      }),
    };
    try {
      const response = await fetch(`${localBaseUrl}/orders`, requestOptions);
      if (!response.ok) {
        throw new Error();
      }
      const { updatedAt } = await response.json();
      return updatedAt;
    } catch (error) {
      return rejectWithValue();
    }
  }
);

const completeOrder = createAsyncThunk(
  "order/completeOrder",
  async (orderId, { rejectWithValue }) => {
    const requestOptions = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        orderId,
        orderState: "history",
      }),
    };
    try {
      const response = await fetch(`${localBaseUrl}/orders`, requestOptions);
      if (!response.ok) {
        throw new Error();
      }
      const { updatedAt } = await response.json();
      return updatedAt;
    } catch (error) {
      return rejectWithValue();
    }
  }
);

const onChangePaymentStatus = createAsyncThunk(
  "order/onChangePaymentStatus",
  async (id, { rejectWithValue, getState }) => {
    const order = getState().order.orderData;

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
        throw new Error();
      }
      return;
    } catch (error) {
      return rejectWithValue();
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    addNewOrder: (state, action) => {
      state.orderData.push({ ...action.payload, ...orderUiState });
    },
    setDetailContainerHeight: (state, action) => {
      const index = state.orderData.findIndex((singleOrder) => {
        return singleOrder._id === action.payload.id;
      });
      state.orderData[index].detailContainerHeight =
        action.payload.detailContainerHeight;
      state.orderData[index].detailHide = true;
    },
    toggleDetailContainer: (state, action) => {
      const index = state.orderData.findIndex((singleOrder) => {
        return singleOrder._id === action.payload;
      });
      state.orderData[index].detailHide = !state.orderData[index].detailHide;
    },
    toggleRejectConfirmationBox: (state, action) => {
      const index = state.orderData.findIndex((singleOrder) => {
        return singleOrder._id === action.payload;
      });
      state.orderData[index].displayRejectConfirmationBox =
        !state.orderData[index].displayRejectConfirmationBox;
    },
    clearOrderDataOnLogout: (state) => {
      state.orderData = [];
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchInitialOrders.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchInitialOrders.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.orderData = action.payload;
      })
      .addCase(fetchInitialOrders.rejected, (state, action) => {
        state.status = "failed";
      })
      //////////////
      .addCase(fetchOrdersAfterSSEFailed.pending, (state, action) => {
        state.statusAfterSSEFailed = "loading";
      })
      .addCase(fetchOrdersAfterSSEFailed.fulfilled, (state, action) => {
        state.orderData = action.payload;
        state.statusAfterSSEFailed = "succeeded";
      })
      .addCase(fetchOrdersAfterSSEFailed.rejected, (state) => {
        state.statusAfterSSEFailed = "failed";
      })
      ///RejectOrder
      .addCase(rejectOrder.pending, (state, action) => {
        const index = state.orderData.findIndex((singleOrder) => {
          return singleOrder._id === action.meta.arg;
        });
        state.orderData[index].updateStatus = "loading";
      })
      .addCase(rejectOrder.fulfilled, (state, action) => {
        const index = state.orderData.findIndex((singleOrder) => {
          return singleOrder._id === action.meta.arg;
        });
        state.orderData[index].updateStatus = "succeeded";
        state.orderData[index].orderState = "recycleBin";
        state.orderData[index].updatedAt = action.payload;
        state.orderData[index].detailContainerHeight = 0;
      })
      .addCase(rejectOrder.rejected, (state, action) => {
        const index = state.orderData.findIndex((singleOrder) => {
          return singleOrder._id === action.meta.arg;
        });
        state.orderData[index].updateStatus = "failed";
      })
      ///Accept Order
      .addCase(acceptOrder.pending, (state, action) => {
        const index = state.orderData.findIndex((singleOrder) => {
          return singleOrder._id === action.meta.arg;
        });
        state.orderData[index].updateStatus = "loading";
      })
      .addCase(acceptOrder.fulfilled, (state, action) => {
        const index = state.orderData.findIndex((singleOrder) => {
          return singleOrder._id === action.meta.arg;
        });
        state.orderData[index].updateStatus = "succeeded";
        state.orderData[index].orderState = "order";
        state.orderData[index].updatedAt = action.payload;
        state.orderData[index].detailContainerHeight = 0;
      })
      .addCase(acceptOrder.rejected, (state, action) => {
        const index = state.orderData.findIndex((singleOrder) => {
          return singleOrder._id === action.meta.arg;
        });
        state.orderData[index].updateStatus = "failed";
      })
      ///Deliver Order
      .addCase(deliverOrder.pending, (state, action) => {
        const index = state.orderData.findIndex((singleOrder) => {
          return singleOrder._id === action.meta.arg;
        });
        state.orderData[index].updateStatus = "loading";
      })
      .addCase(deliverOrder.fulfilled, (state, action) => {
        const index = state.orderData.findIndex((singleOrder) => {
          return singleOrder._id === action.meta.arg;
        });
        state.orderData[index].updateStatus = "succeeded";
        state.orderData[index].orderState = "onDelivery";
        state.orderData[index].updatedAt = action.payload;
        state.orderData[index].detailContainerHeight = 0; //to recalculate detailcontainer height
      })
      .addCase(deliverOrder.rejected, (state, action) => {
        const index = state.orderData.findIndex((singleOrder) => {
          return singleOrder._id === action.meta.arg;
        });
        state.orderData[index].updateStatus = "failed";
      })
      ///complete Order
      .addCase(completeOrder.pending, (state, action) => {
        const index = state.orderData.findIndex((singleOrder) => {
          return singleOrder._id === action.meta.arg;
        });
        state.orderData[index].updateStatus = "loading";
      })
      .addCase(completeOrder.fulfilled, (state, action) => {
        const index = state.orderData.findIndex((singleOrder) => {
          return singleOrder._id === action.meta.arg;
        });
        state.orderData[index].updateStatus = "succeeded";
        state.orderData[index].orderState = "history";
        state.orderData[index].updatedAt = action.payload;
        state.orderData[index].detailContainerHeight = 0;
      })
      .addCase(completeOrder.rejected, (state, action) => {
        const index = state.orderData.findIndex((singleOrder) => {
          return singleOrder._id === action.meta.arg;
        });
        state.orderData[index].updateStatus = "failed";
      })

      //////////////
      .addCase(onChangePaymentStatus.pending, (state, action) => {
        const index = state.orderData.findIndex((singleOrder) => {
          return singleOrder._id === action.meta.arg;
        });
        state.orderData[index].paymentStatusStatus = "loading";
        state.orderData[index].paymentStatus =
          !state.orderData[index].paymentStatus;
      })
      .addCase(onChangePaymentStatus.fulfilled, (state, action) => {
        const index = state.orderData.findIndex((singleOrder) => {
          return singleOrder._id === action.meta.arg;
        });
        state.orderData[index].paymentStatusStatus = "succeeded";
      })
      .addCase(onChangePaymentStatus.rejected, (state, action) => {
        const index = state.orderData.findIndex((singleOrder) => {
          return singleOrder._id === action.meta.arg;
        });
        state.orderData[index].paymentStatusStatus = "failed";
        state.orderData[index].paymentStatus =
          !state.orderData[index].paymentStatus;
      });
  },
});

export {
  fetchInitialOrders,
  fetchOrdersAfterSSEFailed,
  rejectOrder,
  acceptOrder,
  deliverOrder,
  completeOrder,
  onChangePaymentStatus,
};

export const {
  addNewOrder,
  setDetailContainerHeight,
  toggleDetailContainer,
  toggleRejectConfirmationBox,
  clearOrderDataOnLogout,
} = orderSlice.actions;

export default orderSlice.reducer;
