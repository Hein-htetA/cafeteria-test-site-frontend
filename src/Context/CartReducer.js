const orderHistoryUiState = {
  hideOrderSummary: true,
  hideRestaurantDetails: true,
  hideCustomerDetails: true,
};

export const reducer = (state, action) => {
  const copyState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case "ADD_TO_CART":
      const count = action.payload.count;
      const restaurantName = action.payload.restaurant.name;
      const deliveryService = action.payload.restaurant.deliveryService; //required to disable delivery in checkout page
      const { _id: menuId, name, price, restaurantId } = action.payload.menu;

      let isRestaurantMatch = false; //restaurant exist check

      const cartArray = copyState.cart.map((singleOrder) => {
        //Check restaurant exist in array and update
        let menuArray = singleOrder.menuArray;
        if (singleOrder.restaurantId === restaurantId) {
          isRestaurantMatch = true;
          let isMenuMatch = false; //menu exist check

          menuArray = singleOrder.menuArray.map((order) => {
            //check menu exist in array and update
            if (order._id === menuId) {
              isMenuMatch = true;
              order.count = order.count + count;
            }
            return order;
          });
          if (!isMenuMatch) {
            //menu didnt exist
            menuArray[menuArray.length] = {
              _id: menuId,
              name,
              price,
              count: count,
            };
          }
        }
        return { ...singleOrder, menuArray };
      });

      if (!isRestaurantMatch) {
        //restaurant didnt exist
        if (copyState.cart.length < 3) {
          //maximum number of restaurant in cart context
          copyState.cart[copyState.cart.length] = {
            restaurantId,
            menuArray: [{ _id: menuId, name, price, count: 1 }],
            restaurantName,
            deliveryService, //required to disable delivery select in checkout
          };
        } else {
          copyState.fullCartWarning = true;
        }
        return copyState;
      } else {
        //restaurant was matched
        return { ...copyState, cart: cartArray };
      }

    case "INC_COUNT":
      const incCart = copyState.cart.map((restaurant) => {
        let menuArray = restaurant.menuArray;
        if (restaurant.restaurantId === action.payload.restaurantId) {
          menuArray = restaurant.menuArray.map((menu) => {
            if (menu._id === action.payload.menuId) {
              menu.count = menu.count + 1;
            }
            return menu;
          });
        }
        return { ...restaurant, menuArray };
      });

      return { ...copyState, cart: incCart };

    case "DEC_COUNT":
      const decCart = copyState.cart.map((restaurant) => {
        let menuArray = restaurant.menuArray;
        if (restaurant.restaurantId === action.payload.restaurantId) {
          const menuArrayDec = restaurant.menuArray.map((menu) => {
            if (menu._id === action.payload.menuId) {
              menu.count = menu.count - 1;
            }
            return menu;
          });
          menuArray = menuArrayDec.filter((menu) => menu.count > 0); //remove menu when count is less than 0
        }
        return { ...restaurant, menuArray };
      });

      const decCartFilter = decCart.filter(
        (restaurant) => restaurant.menuArray.length !== 0
      ); //remove restaurant when there is no menu array

      return { ...copyState, cart: decCartFilter };

    case "CALCULATE_TOTAL":
      const cartWithTotal = copyState.cart.map((restaurant) => {
        let { restaurantTotalCount, restaurantTotalAmount } =
          restaurant.menuArray.reduce(
            (accu, current) => {
              accu.restaurantTotalCount += current.count;
              accu.restaurantTotalAmount += current.count * current.price;
              return accu;
            },
            { restaurantTotalCount: 0, restaurantTotalAmount: 0 }
          );
        return { ...restaurant, restaurantTotalCount, restaurantTotalAmount };
      });
      let { totalCount, totalAmount } = cartWithTotal.reduce(
        (accu, current) => {
          accu.totalCount += current.restaurantTotalCount;
          accu.totalAmount += current.restaurantTotalAmount;
          return accu;
        },
        { totalCount: 0, totalAmount: 0 }
      );

      return {
        ...copyState,
        cart: cartWithTotal,
        totalAmount,
        totalCount,
      };

    case "REMOVE_FROM_CART":
      const newCart = copyState.cart.filter(
        (restaurant) => restaurant.restaurantId !== action.payload.restaurantId
      );

      return { ...copyState, cart: newCart };

    case "HIDE_FULL_CART_WARNING":
      return { ...copyState, fullCartWarning: false };

    case "HIDE_CROWDED_CHECKOUT_WARNING":
      return { ...copyState, crowdedCheckoutWarning: false, tempCheckout: {} };

    case "ADD_MESSAGE":
      const cartWithMessage = copyState.cart.map((restaurant, index) => {
        restaurant.message = action.payload.messageArray[index] || ""; //it is undefined or empty string
        return restaurant;
      });

      return { ...copyState, cart: cartWithMessage };

    case "TO_CHECKOUT":
      const restaurantToChange = copyState.cart.find(
        (restaurant) => restaurant.restaurantId === action.payload.restaurantId
      );

      if (Object.keys(copyState.checkout).length === 0) {
        //there isnt an order in checkout
        const restaurantInCartFilter = copyState.cart.filter(
          (restaurant) =>
            restaurant.restaurantId !== action.payload.restaurantId
        );

        return {
          ...copyState,
          cart: restaurantInCartFilter,
          checkout: restaurantToChange,
        };
      } else {
        //there is an order in checkout

        copyState.crowdedCheckoutWarning = true;
        copyState.tempCheckout = restaurantToChange; // add tempCheckout

        return {
          ...copyState,
        };
      }

    case "CLEAR_CHECKOUT":
      return { ...copyState, checkout: {} };

    case "CLEAR_AND_PROCEED_CHECKOUT":
      const cartAfterFilter = copyState.cart.filter(
        (restaurant) =>
          restaurant.restaurantId !== copyState.tempCheckout.restaurantId
      );
      copyState.checkout = copyState.tempCheckout;
      copyState.tempCheckout = {};
      return {
        ...copyState,
        cart: cartAfterFilter,
        crowdedCheckoutWarning: false,
      };

    case "BACK_TO_CART":
      copyState.cart.push(copyState.checkout);
      copyState.checkout = {};

      return { ...copyState };

    case "SET_ORDER_HISTORY_LOADING":
      return {
        ...copyState,
        orderHistoryLoading: !copyState.orderHistoryLoading,
      };

    case "SET_ORDER_HISTORY":
      return {
        ...copyState,
        orderHistory: action.payload.orderHistory.map((order) => ({
          ...order,
          ...orderHistoryUiState,
        })),
      };

    case "UNSHIFT_ORDER_HISTORY":
      copyState.orderHistory.unshift({
        ...action.payload.newOrder,
        ...orderHistoryUiState, //adding ui state on first fetch
      });
      return { ...copyState };

    case "SHOW_HIDE_ORDER_HISTORY":
      const orderHistory = copyState.orderHistory.map((order) => {
        if (order._id === action.payload.orderId) {
          //console.log("show hide if");
          order[action.payload.type] = !order[action.payload.type];
        }
        return order;
      });
      return { ...copyState, orderHistory };

    case "UPDATE_ORDER_HISTORY":
      const updatedOrderHistory = copyState.orderHistory.map((order) => {
        if (order._id === action.payload.orderId) {
          order.orderState = action.payload.orderState;
          order.paymentStatus = action.payload.paymentStatus;
          order.updatedAt = action.payload.updatedAt;
        }
        return order;
      });
      return { ...copyState, orderHistory: updatedOrderHistory };
    default:
      throw new Error("Action Type Not Supported Yet");
  }
};
