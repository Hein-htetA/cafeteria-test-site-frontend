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
        firstLoadSuccess: true, //only hide load more trigger in first fetch
        restaurants: [...state.restaurants, ...action.payload],
      };
    case "INCREASE_PAGE":
      return {
        ...state,
        page: state.page + 1,
      };

    default:
      throw new Error("action type not supported");
  }
};
