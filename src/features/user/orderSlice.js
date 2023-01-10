import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { localBaseUrl } from "../../components/utils/baseUrl";

const initialState = {
  orderData: [],
  status: "idle" || "loading" || "succeeded" || "failed",
  sseStatus: "idle" || "loading" || "succeeded" || "failed",
};

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

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    addNewOrder: (state, action) => {
      state.orderData.push({ ...action.payload, ...orderUiState });
    },
    setDetailContainerHeight: (state, action) => {
      const newOrderData = state.orderData.map((singleOrder) => {
        if (singleOrder._id === action.payload.id) {
          singleOrder.detailContainerHeight =
            action.payload.detailContainerHeight;
        }
        return singleOrder;
      });
      state.orderData = newOrderData;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchInitialOrders.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchInitialOrders.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.orderData = [...state.orderData, ...action.payload];
      })
      .addCase(fetchInitialOrders.rejected, (state, action) => {
        state.status = "failed";
      });
  },
});

export { fetchInitialOrders };

export const { addNewOrder, setDetailContainerHeight } = orderSlice.actions;

export default orderSlice.reducer;
