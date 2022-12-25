import { createContext, useContext, useEffect, useReducer } from "react";
import { reducer } from "./CartReducer";

const CartContext = createContext();
const cartState = {
  totalAmount: 0,
  totalCount: 0,
  message: "",
  fullCartWarning: false,
};

const initializeFun = (arg) => {
  let cart = [];
  let checkout = [];

  if (arg.cartString) {
    cart = JSON.parse(arg.cartString);
  }

  if (arg.checkoutString) {
    checkout = JSON.parse(arg.checkoutString);
  }

  return { cart, ...cartState, checkout };
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

  const addMessage = (messageArray) => {
    console.log("contxt mess arr", messageArray);
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
  };

  useEffect(() => {
    dispatch({ type: "CALCULATE_TOTAL" });
  }, []);

  useEffect(() => {
    sessionStorage.setItem("cart", JSON.stringify(state.cart));
  });

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
