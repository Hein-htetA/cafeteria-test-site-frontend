import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { localBaseUrl } from "../components/utils/baseUrl";
import { updatePublicRestaurant } from "./publicDataSlice";

const orderHistoryUiState = {
  hideOrderSummary: true,
  hideRestaurantDetails: true,
  hideCustomerDetails: true,
};

const initializeFun = () => {
  const cart =
    sessionStorage.getItem("cart") !== null
      ? JSON.parse(sessionStorage.getItem("cart"))
      : [];
  const checkout =
    sessionStorage.getItem("checkout") !== null
      ? JSON.parse(sessionStorage.getItem("checkout"))
      : {};
  const orderHistory =
    sessionStorage.getItem("orderHistory") !== null
      ? JSON.parse(sessionStorage.getItem("orderHistory"))
      : [];
  const totalCount =
    sessionStorage.getItem("totalCount") !== null
      ? JSON.parse(sessionStorage.getItem("totalCount"))
      : 0;

  return {
    cart,
    checkout,
    orderHistory,
    totalCount,
    orderHistoryStatus: "idle",
    placeOrderStatus: "idle",
    fullCartWarning: false,
    fullCheckoutWarning: false,
    restaurantRecentlyClosedModal: false,
    tempCheckout: {},
    totalAmount: 0,
  };
};

const placeOrder = createAsyncThunk(
  "cart/placeOrder",
  async (formValues, { rejectWithValue, getState, dispatch }) => {
    //preparing for req body
    const restaurantId = getState().cart.checkout.restaurantId;
    const restaurantName = getState().cart.checkout.restaurantName;
    const message = getState().cart.checkout.message;
    const customerId = getState().user.userData._id;
    const customerName = getState().user.userData.name;
    const totalAmount =
      getState().cart.checkout.restaurantTotalAmount +
      (formValues.requestDelivery === "true" ? 1 : 0) * 100;
    const menuArray = getState().cart.checkout.menuArray;
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        ...formValues,
        phoneNumber:
          formValues.phoneNumber[0] === "0"
            ? formValues.phoneNumber.slice(1)
            : formValues.phoneNumber.slice(0),
        restaurantId,
        restaurantName,
        message,
        customerId,
        customerName,
        totalAmount,
        menuArray,
      }),
    };

    try {
      const response = await fetch(`${localBaseUrl}/orders`, requestOptions);
      if (!response.ok) {
        throw new Error();
      }

      if (response.status === 200) {
        const { restaurant } = await response.json();
        dispatch(updatePublicRestaurant(restaurant));
        return { restaurant };
      } else if (response.status === 201) {
        sessionStorage.removeItem("checkout");
        const { newOrder } = await response.json();
        return { newOrder };
      }
    } catch (error) {
      return rejectWithValue();
    }
  }
);

const fetchOrder = createAsyncThunk(
  "cart/fetchOrder",
  async (_, { rejectWithValue, getState }) => {
    const requestOptions = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    try {
      const response = await fetch(
        `${localBaseUrl}/orders/customer/${getState().user.userData._id}`,
        requestOptions
      );
      if (!response.ok) {
        throw new Error();
      }
      const { orderHistory } = await response.json();
      return orderHistory;
    } catch (error) {
      return rejectWithValue();
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: initializeFun,
  reducers: {
    addToCart: (state, action) => {
      const count = action.payload.count;
      const restaurantName = action.payload.restaurant.name;
      const deliveryService = action.payload.restaurant.deliveryService; //required to disable delivery in checkout page
      const { _id: menuId, name, price, restaurantId } = action.payload.menu;

      const restaurantIndex = state.cart.findIndex(
        (singleOrder) => singleOrder.restaurantId === restaurantId
      );

      if (restaurantIndex === -1) {
        if (state.cart.length < 3) {
          state.cart.push({
            restaurantId,
            restaurantName,
            deliveryService,
            menuArray: [{ _id: menuId, name, price, restaurantId, count }],
          });
        } else {
          state.fullCartWarning = true;
        }
      } else {
        const menuIndex = state.cart[restaurantIndex].menuArray.findIndex(
          (menu) => menu._id === menuId
        );
        if (menuIndex === -1) {
          state.cart[restaurantIndex].menuArray.push({
            _id: menuId,
            name,
            price,
            count,
          });
        } else {
          state.cart[restaurantIndex].menuArray[menuIndex].count += count;
        }
      }

      //calculate restaurant TotalCount and TotalAmount
      const { restaurantTotalCount, restaurantTotalAmount } = state.cart[
        restaurantIndex === -1 ? state.cart.length - 1 : restaurantIndex
      ].menuArray.reduce(
        (accu, current) => {
          accu.restaurantTotalCount += current.count;
          accu.restaurantTotalAmount += current.count * current.price;
          return accu;
        },
        { restaurantTotalCount: 0, restaurantTotalAmount: 0 }
      );
      state.cart[
        restaurantIndex === -1 ? state.cart.length - 1 : restaurantIndex
      ].restaurantTotalAmount = restaurantTotalAmount;
      state.cart[
        restaurantIndex === -1 ? state.cart.length - 1 : restaurantIndex
      ].restaurantTotalCount = restaurantTotalCount;
    },
    hideFullCartWarning: (state) => {
      state.fullCartWarning = false;
    },
    hideRestaurantRecentlyClosedModal: (state) => {
      state.restaurantRecentlyClosedModal = false;
    },
    toggleItemsCount: (state, action) => {
      const restaurantIndex = state.cart.findIndex(
        (restaurant) => restaurant.restaurantId === action.payload.restaurantId
      );
      const menuIndex = state.cart[restaurantIndex].menuArray.findIndex(
        (menu) => menu._id === action.payload.menuId
      );
      state.cart[restaurantIndex].menuArray[menuIndex].count +=
        action.payload.count;

      //remove menu if count is less than 1
      if (state.cart[restaurantIndex].menuArray[menuIndex].count < 1) {
        state.cart[restaurantIndex].menuArray.splice(menuIndex, 1);
      }

      //calculate restaurant TotalCount and TotalAmount
      const { restaurantTotalCount, restaurantTotalAmount } = state.cart[
        restaurantIndex
      ].menuArray.reduce(
        (accu, current) => {
          accu.restaurantTotalCount += current.count;
          accu.restaurantTotalAmount += current.count * current.price;
          return accu;
        },
        { restaurantTotalCount: 0, restaurantTotalAmount: 0 }
      );
      //remove restaurant if totalcount is 0
      if (restaurantTotalCount === 0) {
        state.cart.splice(restaurantIndex, 1);
      } else {
        state.cart[restaurantIndex].restaurantTotalAmount =
          restaurantTotalAmount;
        state.cart[restaurantIndex].restaurantTotalCount = restaurantTotalCount;
      }
    },
    cartToCheckout: (state, action) => {
      const restaurantToChange = state.cart.find(
        (restaurant) => restaurant.restaurantId === action.payload.restaurantId
      );

      restaurantToChange.message = action.payload.message;

      if (Object.keys(state.checkout).length === 0) {
        //there isnt an order in checkout
        state.cart = state.cart.filter(
          (restaurant) =>
            restaurant.restaurantId !== action.payload.restaurantId
        );
        state.checkout = restaurantToChange;
      } else {
        //there is an order in checkout
        state.fullCheckoutWarning = true;
        state.tempCheckout = restaurantToChange; // add tempCheckout
      }
    },
    calculateTotalWholeCart: (state) => {
      let { totalCount, totalAmount } = state.cart.reduce(
        (accu, current) => {
          accu.totalCount += current.restaurantTotalCount;
          accu.totalAmount += current.restaurantTotalAmount;
          return accu;
        },
        { totalCount: 0, totalAmount: 0 }
      );

      state.totalCount = totalCount;
      state.totalAmount = totalAmount;
    },
    clearAndProceedToCheckout: (state, action) => {
      state.checkout = state.tempCheckout;
      state.tempCheckout = {};
      state.fullCheckoutWarning = false;
      state.cart = state.cart.filter(
        (restaurant) => restaurant.restaurantId !== action.payload
      );
    },
    removeRestaurantFromCart: (state, action) => {
      state.cart = state.cart.filter(
        (restaurant) => restaurant.restaurantId !== action.payload
      );
    },
    hideFullCheckoutWarning: (state) => {
      state.fullCheckoutWarning = false;
    },
    clearCheckout: (state) => {
      state.checkout = {};
    },
    backToCart: (state) => {
      state.cart.unshift(state.checkout);
      state.checkout = {};
    },
    closePlaceOrderError: (state) => {
      state.placeOrderStatus = "idle";
    },
    toggleOrderUiState: (state, action) => {
      const orderIndex = state.orderHistory.findIndex(
        (order) => order._id === action.payload.orderId
      );
      state.orderHistory[orderIndex].orderHistoryUiState[action.payload.type] =
        !state.orderHistory[orderIndex].orderHistoryUiState[
          action.payload.type
        ];
    },
    updateOrderFromOrderHistory: (state, action) => {
      const orderIndex = state.orderHistory.findIndex(
        (order) => order._id === action.payload.orderId
      );
      state.orderHistory[orderIndex] = {
        ...state.orderHistory[orderIndex],
        ...action.payload,
      };
    },
  },
  extraReducers(builder) {
    builder
      .addCase(placeOrder.pending, (state) => {
        state.placeOrderStatus = "loading";
      })
      .addCase(placeOrder.fulfilled, (state, action) => {
        const { restaurant, newOrder } = action.payload;
        if (restaurant) {
          state.restaurantRecentlyClosedModal = true;
          state.placeOrderStatus = "idle";
          return;
        }
        state.placeOrderStatus = "succeeded";
        state.checkout = {};
        state.orderHistory.unshift({
          ...newOrder,
          orderHistoryUiState,
        });
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.placeOrderStatus = "failed";
      })
      .addCase(fetchOrder.pending, (state) => {
        state.orderHistoryStatus = "loading";
      })
      .addCase(fetchOrder.fulfilled, (state, action) => {
        state.orderHistoryStatus = "succeeded";

        state.orderHistory = action.payload.map((order) => ({
          ...order,
          orderHistoryUiState,
        }));
      })
      .addCase(fetchOrder.rejected, (state, action) => {
        state.orderHistoryStatus = "failed";
      });
  },
});

export { placeOrder, fetchOrder };

export const {
  addToCart,
  cartToCheckout,
  clearAndProceedToCheckout,
  hideFullCheckoutWarning,
  hideRestaurantRecentlyClosedModal,
  calculateTotalWholeCart,
  removeRestaurantFromCart,
  toggleItemsCount,
  backToCart,
  clearCheckout,
  closePlaceOrderError,
  toggleOrderUiState,
  updateOrderFromOrderHistory,
  hideFullCartWarning,
} = cartSlice.actions;

export default cartSlice.reducer;
