import {
  faMagnifyingGlass,
  faSearchLocation,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { fetchRestaurantsByName } from "../../features/publicDataSlice";
import "./SearchBox.css";

const SearchBox = () => {
  const [query] = useSearchParams();
  const [searchParams, setSearchParams] = useState(query.get("name") || "");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSearch = async () => {
    dispatch(fetchRestaurantsByName(searchParams));
    navigate(`/marketplace/search?name=${searchParams}`);
  };
  return (
    <div className="search-box-container">
      <input
        placeholder="Search..."
        className="search-input"
        onChange={(e) => setSearchParams(e.target.value)}
        value={searchParams}
      />
      <button className="search-btn" onClick={handleSearch}>
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </button>
    </div>
  );
};

export default SearchBox;
