import { useState, useEffect, useCallback, useRef } from "react";
import { usePublicDataContext } from "../../Context/PublicDataContext";
import { localBaseUrl } from "../utils/baseUrl";

function useRestaurantsFetch() {
  const {
    page,
    setMoreRestaurantLoading,
    setMoreRestaurantError,
    addRestaurantState,
    setRestaurantLoading,
    setRestaurantError,
    noMoreRestaurant,
  } = usePublicDataContext();

  const fetchRestaurants = useCallback(
    async (controller) => {
      const signal = controller.signal;
      try {
        if (page === 1) {
          //distinguish between first time loading vs more restaurants loading
          setRestaurantLoading();
        } else {
          setMoreRestaurantLoading();
        }
        // console.log("use fetch", localStorage.getItem("token"));
        const requestOptions = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          signal,
        };
        const response = await fetch(
          `${localBaseUrl}/restaurants?page=${page}`,
          requestOptions
        );
        if (!response.ok) {
          throw new Error("Something went wrong!");
        }
        const { restaurants } = await response.json();
        addRestaurantState(restaurants);
      } catch (error) {
        if (page === 1) {
          //distinguish between first time loading vs more restaurants loading
          setRestaurantError();
        } else {
          setMoreRestaurantError();
        }
      }
    },
    [page]
  );

  useEffect(() => {
    if (noMoreRestaurant) return;
    const controller = new AbortController();
    fetchRestaurants(controller);

    return () => {
      controller.abort();
    };
  }, [page, fetchRestaurants]);
}

export default useRestaurantsFetch;
