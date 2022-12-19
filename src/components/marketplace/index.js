import React, { useCallback, useEffect, useRef } from "react";
import "./index.css";
import photo1 from "../../img/photo1.jpg";
import photo4 from "../../img/photo4.jpg";
import photo5 from "../../img/photo5.jpg";
import { Link } from "react-router-dom";
import { restaurantData } from "../../data";
import SingleRestaurant from "./SingleRestaurant";
import RestaurantLoading from "./Marketplace_States/RestaurantLoading";
import TryAgain from "./Marketplace_States/TryAgain";
import { usePublicDataContext } from "../../Context/PublicDataContext";
import { useLoadMoreRestaurant } from "../customHooks/UseLoadMoreRestaurant";
import { localBaseUrl } from "../utils/baseUrl";
import useRestaurantsFetch from "../customHooks/useRestaurantsFetch";
import MoreRestaurantLoading from "./Marketplace_States/MoreRestaurantLoading";

const Marketplace = () => {
  const {
    increasePage,
    restaurantLoading,
    restaurantError,
    restaurants,
    moreRestaurantLoading,
    firstLoadSuccess,
  } = usePublicDataContext();

  const containerRef = useRef(null);

  useRestaurantsFetch();

  const callbackFun = (entries) => {
    const [entry] = entries;
    if (entry.isIntersecting) {
      console.log("entry intersection & increase page");
      increasePage();
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(callbackFun, {
      root: null,
      rootMargin: "0px",
      threshold: 1,
    });
    if (containerRef.current) observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  if (restaurantLoading) {
    return (
      <div className="restaurant-link-container">
        <div className="marketplace-title">Marketplace</div>
        <RestaurantLoading />
        <RestaurantLoading />
        <div
          className={
            firstLoadSuccess
              ? "load-more-restaurant-trigger "
              : "load-more-restaurant-trigger load-more-restaurant-trigger-hide"
          }
          ref={containerRef}
        >
          I am container Ref
        </div>
      </div>
    );
  }

  if (restaurantError) {
    return (
      <div className="restaurant-link-container">
        <div className="marketplace-title">Marketplace</div>
        <RestaurantLoading>
          <TryAgain />
        </RestaurantLoading>
        <div
          className={
            firstLoadSuccess
              ? "load-more-restaurant-trigger "
              : "load-more-restaurant-trigger load-more-restaurant-trigger-hide"
          }
          ref={containerRef}
        >
          I am container Ref
        </div>
      </div>
    );
  }

  return (
    <div className="restaurant-link-container">
      <div className="marketplace-title">Marketplace</div>
      {restaurants.map((restaurant) => {
        return (
          <Link
            key={restaurant._id + Math.random()}
            className="restaurant-link"
            to={`${restaurant._id}`}
          >
            <SingleRestaurant {...restaurant} />
          </Link>
        );
      })}

      <div
        className={
          firstLoadSuccess
            ? "load-more-restaurant-trigger "
            : "load-more-restaurant-trigger load-more-restaurant-trigger-hide"
        }
        ref={containerRef}
      >
        I am container Ref
      </div>

      {moreRestaurantLoading && <MoreRestaurantLoading />}
    </div>
  );
};

export default Marketplace;
