export const reducer = (state, action) => {
  // const copyState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case "RESTAURANT_LOADING":
      return {
        ...state,
        restaurantLoading: true,
        restaurantError: false,
      };
    case "RESTAURANT_ERROR":
      return {
        ...state,
        restaurantLoading: false,
        restaurantError: true,
      };
    case "MORE_RESTAURANT_LOADING":
      return {
        ...state,
        moreRestaurantLoading: true,
        moreRestaurantError: false,
      };
    case "MORE_RESTAURANT_ERROR":
      return {
        ...state,
        moreRestaurantError: true,
        moreRestaurantLoading: false,
      };
    case "ADD_RESTAURANT_STATE":
      return {
        ...state,
        moreRestaurantLoading: false,
        restaurantLoading: false,
        moreRestaurantError: false,
        restaurantError: false,
        firstLoadSuccess: true, //hiding load more trigger in first fetch
        restaurants: [...state.restaurants, ...action.payload],
      };
    case "NO_MORE_RESTAURANTS":
      return {
        ...state,
        noMoreRestaurant: true,
      };
    case "INCREASE_PAGE":
      return {
        ...state,
        page: state.page + 1,
      };
    case "MENU_LOADING":
      return {
        ...state,
        menuLoading: true,
        menuError: false,
      };
    case "MENU_ERROR":
      return {
        ...state,
        menuLoading: false,
        menuError: true,
      };
    case "ADD_MENU_STATE":
      return {
        ...state,
        menu: [...state.menu, ...action.payload],
        menuLoading: false,
        menuError: false,
      };

    default:
      throw new Error("action type not supported");
  }
};
