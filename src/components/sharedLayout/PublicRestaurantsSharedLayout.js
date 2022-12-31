import React, { useEffect } from "react";
import { Outlet, useParams } from "react-router-dom";
import { usePublicDataContext } from "../../Context/PublicDataContext";
import MenuInfoNav from "../menu/MenuInfoNav/MenuInfoNav";
import { localBaseUrl } from "../utils/baseUrl";

const PublicRestaurantsSharedLayout = () => {
  const { restaurantId } = useParams();
  const { setMenuLoading, setMenuError, addMenuState, menu } =
    usePublicDataContext();
  useEffect(() => {
    const menuByRestaurantId = menu.find(
      (menu) => menu.restaurantId === restaurantId
    );

    if (menuByRestaurantId) return; //fetch only when there is no menu in session storage

    const fetchMenu = async (controller) => {
      const signal = controller.signal;
      try {
        setMenuLoading();
        const requestOptions = {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          signal,
        };
        const response = await fetch(
          `${localBaseUrl}/menu/${restaurantId}`,
          requestOptions
        );
        if (!response.ok) {
          throw new Error("Something went wrong");
        }
        const { data } = await response.json();
        addMenuState(data);
        //appending fetch restaurants to sessionStorage
        // const oldMenu = sessionStorage.getItem("menu");
        // if (oldMenu) {
        //   const oldObj = JSON.parse(oldMenu);
        //   const newObj = [...oldObj, ...data];
        //   sessionStorage.setItem("menu", JSON.stringify(newObj));
        // } else {
        //   sessionStorage.setItem("menu", JSON.stringify(data));
        // }
      } catch (error) {
        setMenuError();
      }
    };

    const controller = new AbortController();
    fetchMenu(controller);
    return () => {
      controller.abort();
    };
  }, []);
  return (
    <div className="restaurant-container">
      <MenuInfoNav />
      <Outlet />
    </div>
  );
};

export default PublicRestaurantsSharedLayout;
