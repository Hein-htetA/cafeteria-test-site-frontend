import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useParams } from "react-router-dom";
import {
  fetchMenuByRestaurantId,
  fetchRestaurantsByPage,
  fetchUserByRestaurantId,
} from "../../features/publicDataSlice";
import MenuInfoNav from "../menu/MenuInfoNav/MenuInfoNav";

const PublicRestaurantsSharedLayout = () => {
  const { restaurantId } = useParams();

  const publicRestaurant = useSelector(
    (state) => state.publicData.publicRestaurants
  ).find((restaurant) => restaurant._id === restaurantId);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMenuByRestaurantId(restaurantId));
    dispatch(fetchUserByRestaurantId(restaurantId));
  }, []);

  return (
    <div className="restaurant-container">
      <MenuInfoNav />
      <Outlet />
    </div>
  );
};

export default PublicRestaurantsSharedLayout;
