import { createContext, useContext, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { reducer } from "./CartReducer";

const CartContext = createContext();
const cartState = {
  totalAmount: 0,
  totalCount: 0,
  message: "",
  fullCartWarning: false,
  crowdedCheckoutWarning: false,
  tempCheckout: {},
  orderHistoryLoading: false,
};

const initializeFun = (arg) => {
  let cart = [];
  let checkout = {};
  let orderHistory = [];

  if (arg.cartString) {
    cart = JSON.parse(arg.cartString);
  }

  if (arg.checkoutString) {
    checkout = JSON.parse(arg.checkoutString);
  }

  return { cart, ...cartState, checkout, orderHistory };
};

const CartContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(
    reducer,

    {
      cartString: sessionStorage.getItem("cart"),
      checkoutString: sessionStorage.getItem("checkout"),
    },

    initializeFun
  );

  const navigate = useNavigate();

  const addToCart = (restaurant, menu, count) => {
    dispatch({ type: "ADD_TO_CART", payload: { restaurant, menu, count } });
    dispatch({ type: "CALCULATE_TOTAL" });
  };

  const incCount = (restaurantId, menuId) => {
    dispatch({ type: "INC_COUNT", payload: { restaurantId, menuId } });
    dispatch({ type: "CALCULATE_TOTAL" });
  };
  const decCount = (restaurantId, menuId) => {
    dispatch({ type: "DEC_COUNT", payload: { restaurantId, menuId } });
    dispatch({ type: "CALCULATE_TOTAL" });
  };

  const removeFromCart = (restaurantId) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: { restaurantId } });
    dispatch({ type: "CALCULATE_TOTAL" });
  };

  const hideFullCartWarning = () => {
    dispatch({ type: "HIDE_FULL_CART_WARNING" });
  };

  const hideCrowdedCheckoutWarning = () => {
    dispatch({ type: "HIDE_CROWDED_CHECKOUT_WARNING" });
  };

  const checkCheckout = () => {
    dispatch({ type: "HIDE_CROWDED_CHECKOUT_WARNING" });
    navigate("/myAccount/cart/cartCheckout");
  };

  const clearAndProceedCheckout = () => {
    dispatch({ type: "CLEAR_AND_PROCEED_CHECKOUT" });
    dispatch({ type: "CALCULATE_TOTAL" });
    navigate("/myAccount/cart/cartCheckout");
  };

  const addMessage = (messageArray) => {
    dispatch({
      type: "ADD_MESSAGE",
      payload: {
        messageArray: messageArray,
      },
    });
  };

  const toCheckout = (restaurantId) => {
    dispatch({
      type: "TO_CHECKOUT",
      payload: {
        restaurantId,
      },
    });
    if (Object.keys(state.checkout).length === 0) {
      dispatch({ type: "CALCULATE_TOTAL" });
      navigate("/myAccount/cart/cartCheckout");
    }
  };

  const clearCheckout = () => {
    dispatch({ type: "CLEAR_CHECKOUT" });
  };

  const backToCart = () => {
    dispatch({ type: "BACK_TO_CART" });
    dispatch({ type: "CALCULATE_TOTAL" });
    navigate("/myAccount/cart/cartMenu");
  };

  const setOrderHistoryLoading = () => {
    dispatch({ type: "SET_ORDER_HISTORY_LOADING" });
  };

  const setOrderHistory = (orderHistory) => {
    dispatch({ type: "SET_ORDER_HISTORY", payload: { orderHistory } });
  };

  const unshiftOrderHistory = (newOrder) => {
    dispatch({ type: "UNSHIFT_ORDER_HISTORY", payload: { newOrder } });
  };

  const showHideOrderHistory = (orderId, type) => {
    dispatch({
      type: "SHOW_HIDE_ORDER_HISTORY",
      payload: { orderId, type },
    });
  };

  const updateOrderHistory = (
    orderId,
    orderState,
    paymentStatus,
    updatedAt
  ) => {
    dispatch({
      type: "UPDATE_ORDER_HISTORY",
      payload: { orderId, orderState, paymentStatus, updatedAt },
    });
  };

  useEffect(() => {
    dispatch({ type: "CALCULATE_TOTAL" });
  }, []);

  // useEffect(() => {
  //   sessionStorage.setItem("checkout", JSON.stringify(state.checkout));
  // }, [state.checkout]);

  // useEffect(() => {
  //   sessionStorage.setItem("cart", JSON.stringify(state.cart));
  //   sessionStorage.setItem("orderHistory", JSON.stringify(state.orderHistory));
  // });

  return (
    <CartContext.Provider
      value={{
        ...state,
        addToCart,
        incCount,
        decCount,
        removeFromCart,
        hideFullCartWarning,
        addMessage,
        toCheckout,
        clearCheckout,
        backToCart,
        hideCrowdedCheckoutWarning,
        checkCheckout,
        clearAndProceedCheckout,
        unshiftOrderHistory,
        showHideOrderHistory,
        setOrderHistory,
        setOrderHistoryLoading,
        updateOrderHistory,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

const useCartContext = () => {
  return useContext(CartContext);
};

export { CartContextProvider, useCartContext };
