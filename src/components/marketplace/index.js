import React, { useCallback, useEffect, useRef } from "react";
import "./index.css";
import { Link } from "react-router-dom";
import SingleRestaurant from "./SingleRestaurant";
import RestaurantLoading from "./Marketplace_States/RestaurantLoading";
import TryAgain from "./Marketplace_States/TryAgain";
import { usePublicDataContext } from "../../Context/PublicDataContext";
import useRestaurantsFetch from "../customHooks/useRestaurantsFetch";
import MoreRestaurantLoading from "./Marketplace_States/MoreRestaurantLoading";
import NoMoreRestaurant from "./Marketplace_States/NoMoreRestaurant";

const Marketplace = () => {
  const {
    increasePage,
    restaurantLoading,
    restaurantError,
    restaurants,
    moreRestaurantLoading,
    firstLoadSuccess,
    noMoreRestaurant,
  } = usePublicDataContext();

  const containerRef = useRef(null);

  useRestaurantsFetch();

  const callbackFun = useCallback((entries) => {
    const [entry] = entries;
    if (entry.isIntersecting) {
      console.log("entry intersection & increase page");
      increasePage();
    }
  }, []);

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: "100px", //high margin is prefer
      threshold: 0,
    };
    const observer = new IntersectionObserver(callbackFun, option);
    if (containerRef.current) observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
    };
  }, [callbackFun]);

  return (
    <div className="restaurant-link-container">
      <div className="marketplace-title">Marketplace</div>
      {restaurantLoading ? (
        <>
          <RestaurantLoading />
          <RestaurantLoading />
        </>
      ) : restaurantError ? (
        <RestaurantLoading>
          <TryAgain />
        </RestaurantLoading>
      ) : (
        restaurants.map((restaurant) => {
          return (
            <Link
              key={restaurant._id}
              className="restaurant-link"
              to={`restaurant/${restaurant._id}/menu`}
            >
              <SingleRestaurant {...restaurant} />
            </Link>
          );
        })
      )}

      <div
        className={
          firstLoadSuccess && !moreRestaurantLoading //hide trigger while loading
            ? "load-more-restaurant-trigger "
            : "load-more-restaurant-trigger load-more-restaurant-trigger-hide"
        }
        ref={containerRef}
      ></div>

      {moreRestaurantLoading && !noMoreRestaurant && <MoreRestaurantLoading />}
      {/* This component can only be conditionally mounted to get prefer scroll behavious */}
      {noMoreRestaurant && <NoMoreRestaurant />}
    </div>
  );
};

export default Marketplace;
