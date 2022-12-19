import { useEffect } from "react";
import { useRef } from "react";
import { usePublicDataContext } from "../../Context/PublicDataContext";
import { localBaseUrl } from "../utils/baseUrl";

export const useLoadMoreRestaurant = () => {
  const {
    page,
    setMoreRestaurantLoading,
    setMoreRestaurantError,
    addRestaurantState,
    setRestaurantLoading,
    setRestaurantError,
  } = usePublicDataContext();
  const containerRef = useRef(null);
  console.log("page in hook", page);

  const x = page + 3;
  console.log(x);

  const callbackFun = () => {
    console.log("x in callback", x);
  };

  // const callbackFun = (entries) => {
  //   const [entry] = entries;
  //   // console.log("in callback");
  //   // console.log("page in callback", page);
  //   if (entry.isIntersecting) {
  //     const controller = new AbortController();
  //     const fetchRestaurants = async (controller) => {
  //       const signal = controller.signal;
  //       console.log("hook fetching with page", page);
  //       try {
  //         if (page === 1) {
  //           //distinguish between first time loading vs more restaurants loading
  //           setRestaurantLoading();
  //         } else {
  //           setMoreRestaurantLoading();
  //         }
  //         const response = await fetch(
  //           `${localBaseUrl}/restaurants?page=${page}`,
  //           { signal }
  //         );
  //         if (!response.ok) {
  //           throw new Error("Something went wrong!");
  //         }
  //         const { restaurants } = await response.json();
  //         console.log("restaurants", restaurants);
  //         addRestaurantState(restaurants);
  //         //appending fetch restaurants to sessionStorage
  //         const oldRestaurants = sessionStorage.getItem("restaurants");
  //         if (oldRestaurants) {
  //           const oldObj = JSON.parse(oldRestaurants);
  //           const newObj = [...oldObj, ...restaurants];
  //           sessionStorage.setItem("restaurants", JSON.stringify(newObj));
  //         } else {
  //           sessionStorage.setItem("restaurants", JSON.stringify(restaurants));
  //         }
  //       } catch (error) {
  //         if (page === 1) {
  //           //distinguish between first time loading vs more restaurants loading
  //           setRestaurantError();
  //         } else {
  //           setMoreRestaurantError();
  //         }
  //       }
  //     };
  //     fetchRestaurants(controller);
  //   }
  // };

  useEffect(() => {
    const observer = new IntersectionObserver(callbackFun);
    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  return [containerRef];
};
