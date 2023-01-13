import { createSlice } from "@reduxjs/toolkit";

const initializeFun = () => {
  const cart =
    sessionStorage.getItem("cart") !== null
      ? JSON.parse(sessionStorage.getItem("cart"))
      : [];
  const checkout =
    sessionStorage.getItem("checkout") !== null
      ? JSON.parse(sessionStorage.getItem("checkout"))
      : [];
  const orderHistory =
    sessionStorage.getItem("orderHistory") !== null
      ? JSON.parse(sessionStorage.getItem("orderHistory"))
      : [];

  return {
    cart,
    checkout,
    orderHistory,
    orderHistoryStatus: "idle",
    fullCartWarning: false,
    fullCheckoutWarning: false,
    tempCheckout: {},
    totalAmount: 0,
    totalCount: 0,
    message: "",
  };
};

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
        restaurantIndex === -1 ? 0 : restaurantIndex
      ].menuArray.reduce(
        (accu, current) => {
          accu.restaurantTotalCount += current.count;
          accu.restaurantTotalAmount += current.count * current.price;
          return accu;
        },
        { restaurantTotalCount: 0, restaurantTotalAmount: 0 }
      );
      state.cart[
        restaurantIndex === -1 ? 0 : restaurantIndex
      ].restaurantTotalAmount = restaurantTotalAmount;
      state.cart[
        restaurantIndex === -1 ? 0 : restaurantIndex
      ].restaurantTotalCount = restaurantTotalCount;

      //total count and total amount of whole cart

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
    cartToCheckout: (state, action) => {
      console.log(action.payload);
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
    clearAndProceedToCheckout: (state, action) => {
      state.checkout = state.tempCheckout;
      state.tempCheckout = {};
      state.cart = state.cart.filter(
        (restaurant) => restaurant._id !== action.payload
      );
    },
  },
});

export const { addToCart, cartToCheckout, clearAndProceedToCheckout } =
  cartSlice.actions;

export default cartSlice.reducer;
