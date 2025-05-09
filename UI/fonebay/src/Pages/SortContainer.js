import React, { useState } from "react";
import "../Styles/Product.css"; // Import custom CSS for styling
import productAPI from "../API/ProductAPI"; // API service for fetching sorted products

const SortContainer = ({ onSortChange }) => {
  // State to hold the currently selected sort option; default is "Popularity"
  const [selectedOption, setSelectedOption] = useState("Popularity");
  // State to control whether the sort dropdown is open or closed
  const [isOpen, setIsOpen] = useState(false);

  // Array of sort options available for selection
  const sortOptions = [
    "Popularity",
    "Price - Low to High",
    "Price - High to Low",
    "NewestFirst",
    "Rating",
  ];

  const handleSortChange = async (option) => {

    setSelectedOption(option);
    setIsOpen(false);
    let sortedProducts = [];
    try {
     
      if (option === "Popularity") {
        // Using newest as a proxy for popularity, adjust if needed
        sortedProducts = await productAPI.getProductsSortedByNewest();
      } else if (option === "Price - Low to High") {
        sortedProducts = await productAPI.getProductsSortedByPriceAsc();
        console.log("Sorted Ascending:", sortedProducts);
      } else if (option === "Price - High to Low") {
        sortedProducts = await productAPI.getProductsSortedByPriceDesc();
        console.log("Sorted Descending:", sortedProducts);
      } else if (option === "NewestFirst") {
        sortedProducts = await productAPI.getProductsSortedByNewest();
        console.log("Sorted by Newest:", sortedProducts);
      } else if (option === "Rating") {
        sortedProducts = await productAPI.getProductsSortedByRating();
        console.log("Sorted by Rating:", sortedProducts);
      }
    } catch (error) {
      console.error("Error sorting products", error);
    }
    // If a callback function is provided, pass the sorted products to the parent component
    if (onSortChange) {
      onSortChange(sortedProducts);
    }
  };

  return (
    <div className="sort-container">
      {/* Button that displays the current sort option and toggles the dropdown */}
      <button className="sort-button" onClick={() => setIsOpen(!isOpen)}>
        <span className="sort-label">Sort by : </span> {selectedOption}
        <span className={`chevron-icon ${isOpen ? "rotate-icon" : ""}`}>▼</span>
      </button>

      {/* Conditionally render the dropdown if it is open */}
      {isOpen && (
        <div className="sort-dropdown">
          {sortOptions.map((option) => (
            <div
              key={option}
              // Apply a 'selected' class to highlight the active sort option
              className={`sort-option ${option === selectedOption ? "selected" : ""}`}
              // When an option is clicked, trigger the sort change
              onClick={() => handleSortChange(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SortContainer;