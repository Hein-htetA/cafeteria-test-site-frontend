import React, { useCallback, useEffect, useRef } from "react";
import "./index.css";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import SingleRestaurant from "./SingleRestaurant";
import RestaurantLoading from "./Marketplace_States/RestaurantLoading";
import TryAgain from "./Marketplace_States/TryAgain";
import MoreRestaurantLoading from "./Marketplace_States/MoreRestaurantLoading";
import NoMoreRestaurant from "./Marketplace_States/NoMoreRestaurant";
import { useDispatch, useSelector } from "react-redux";
import { increasePage as increasePageRTK } from "../../features/publicDataSlice";
import SearchBox from "./SearchBox";

const Marketplace = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const publicRestaurants = useSelector(
    (state) => state.publicData.publicRestaurants
  );
  const restaurantStatus = useSelector(
    (state) => state.publicData.restaurantStatus
  );
  const endOfResult = useSelector((state) => state.publicData.endOfResult);

  const navigate = useNavigate();

  const containerRef = useRef(null);

  const dispatch = useDispatch();

  const callbackFun = useCallback((entries) => {
    const [entry] = entries;
    if (entry.isIntersecting) {
      dispatch(increasePageRTK());
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
      <div
        className="marketplace-title"
        onClick={() => navigate("/marketplace")}
      >
        Marketplace
      </div>
      <SearchBox
        searchParams={searchParams}
        setSearchParams={setSearchParams}
      />
      {restaurantStatus === "loading" && publicRestaurants.length === 0 ? (
        <>
          <RestaurantLoading />
          <RestaurantLoading />
        </>
      ) : restaurantStatus === "failed" ? (
        <RestaurantLoading>
          <TryAgain />
        </RestaurantLoading>
      ) : (
        publicRestaurants.map((restaurant) => {
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

      <div className="loading-endOfResult">
        {restaurantStatus === "loading" && <MoreRestaurantLoading />}
        {endOfResult && <NoMoreRestaurant />}
      </div>

      <div
        className={
          restaurantStatus === "loading" || endOfResult
            ? "load-more-restaurant-trigger load-more-restaurant-trigger-hide"
            : "load-more-restaurant-trigger "
        }
        ref={containerRef}
      ></div>
    </div>
  );
};

export default Marketplace;
