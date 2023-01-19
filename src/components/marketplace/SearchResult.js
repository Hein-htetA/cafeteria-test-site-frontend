import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { fetchRestaurantsByName } from "../../features/publicDataSlice";
import EmptySearchResult from "./EmptySearchResult";
import RestaurantLoading from "./Marketplace_States/RestaurantLoading";
import SearchBox from "./SearchBox";
import SingleRestaurant from "./SingleRestaurant";

const SearchResult = () => {
  const [query] = useSearchParams();
  const searchStatus = useSelector((state) => state.publicData.searchStatus);
  const searchResult = useSelector((state) => state.publicData.searchResult);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (searchStatus === "idle") {
      dispatch(fetchRestaurantsByName(query.get("name")));
    }
  }, []);

  return (
    <div className="restaurant-link-container">
      <div
        className="marketplace-title"
        onClick={() => navigate("/marketplace")}
      >
        Marketplace
      </div>
      <SearchBox />
      {searchStatus === "loading" || searchStatus === "failed" ? (
        <RestaurantLoading />
      ) : searchStatus === "succeeded" && searchResult.length === 0 ? (
        <EmptySearchResult />
      ) : (
        searchResult.map((restaurant) => {
          return (
            <Link
              key={restaurant._id}
              className="restaurant-link"
              to={`../restaurant/${restaurant._id}/menu`}
            >
              <SingleRestaurant {...restaurant} />
            </Link>
          );
        })
      )}
    </div>
  );
};

export default SearchResult;
