import React from "react";
import { Link } from "react-router-dom";
import {
  additionalItemPhoto,
  riceCurryPhoto,
  sideDishPhoto,
  signatureDishPhoto,
  snackDrinkPhoto,
} from "../../utils/baseUrl";
import "./MenuCategory.css";

const MenuCategory = () => {
  return (
    <>
      <div className="category-container">
        <Link to="curry" className="category-link">
          <img
            src={riceCurryPhoto}
            alt="Rice & Curry"
            className="category-image"
          />
          <div className="category-text">rice & Curries</div>
        </Link>
        <Link to="sideDish" className="category-link">
          <img src={sideDishPhoto} alt="Side Dish" className="category-image" />
          <div className="category-text">side dishes</div>
        </Link>
        <Link to="drink" className="category-link">
          <img src={snackDrinkPhoto} alt="curry" className="category-image" />
          <div className="category-text">snacks & drinks</div>
        </Link>
        <Link to="signature" className="category-link">
          <img
            src={signatureDishPhoto}
            alt="Signature Dishes"
            className="category-image"
          />
          <div className="category-text">signature dishes</div>
        </Link>
        <Link to="additional" className="category-link">
          <img
            src={additionalItemPhoto}
            alt="Store"
            className="category-image"
          />
          <div className="category-text">additionals</div>
        </Link>
      </div>
    </>
  );
};

export default MenuCategory;
