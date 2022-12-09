import React from "react";
import { Link } from "react-router-dom";
import "./MenuCategory.css";
import Title from "./Title";

const MenuCategory = () => {
  return (
    <>
      <div className="category-container">
        <Link to="curry" className="category-link">
          <img
            src="https://www.inspiredtaste.net/wp-content/uploads/2021/03/Chicken-Curry-Recipe-2-1200.jpg"
            alt="curry"
            className="category-image"
          />
          <div className="category-text">rice & Curries</div>
        </Link>
        <Link to="sideDish" className="category-link">
          <img
            src="https://www.inspiredtaste.net/wp-content/uploads/2021/03/Chicken-Curry-Recipe-2-1200.jpg"
            alt="curry"
            className="category-image"
          />
          <div className="category-text">side dishes</div>
        </Link>
        <Link to="drink" className="category-link">
          <img
            src="https://www.inspiredtaste.net/wp-content/uploads/2021/03/Chicken-Curry-Recipe-2-1200.jpg"
            alt="curry"
            className="category-image"
          />
          <div className="category-text">snacks & drinks</div>
        </Link>
        <Link to="additional" className="category-link">
          <img
            src="https://www.inspiredtaste.net/wp-content/uploads/2021/03/Chicken-Curry-Recipe-2-1200.jpg"
            alt="curry"
            className="category-image"
          />
          <div className="category-text">signature dishes</div>
        </Link>
        <Link to="additional" className="category-link">
          <img
            src="https://www.inspiredtaste.net/wp-content/uploads/2021/03/Chicken-Curry-Recipe-2-1200.jpg"
            alt="curry"
            className="category-image"
          />
          <div className="category-text">additionals</div>
        </Link>
      </div>
    </>
  );
};

export default MenuCategory;
