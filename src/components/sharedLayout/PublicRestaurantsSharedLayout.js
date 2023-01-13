import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useParams } from "react-router-dom";
import { fetchMenuByRestaurantId } from "../../features/publicDataSlice";
import MenuInfoNav from "../menu/MenuInfoNav/MenuInfoNav";

const PublicRestaurantsSharedLayout = () => {
  const { restaurantId } = useParams();

  const publicRestaurant = useSelector(
    (state) => state.publicData.publicRestaurants
  ).find((restaurant) => restaurant._id === restaurantId);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!publicRestaurant.menu) {
      dispatch(fetchMenuByRestaurantId(restaurantId));
    }
  }, []);
  return (
    <div className="restaurant-container">
      <MenuInfoNav />
      <Outlet />
    </div>
  );
};

export default PublicRestaurantsSharedLayout;
