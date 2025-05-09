import React, { useState, useEffect } from "react";
import "../Styles/Filter.css";
import productAPI from "../API/ProductAPI";

const Filter = ({ onFilterChange }) => {
  const [isOpen, setIsOpen] = useState({
    price: false,
    ram: false,
    storage: false,
    battery: false,
    ratings: false,
  });

  const [filters, setFilters] = useState({
    priceRange: [],
    ram: [],
    storage: [],
    battery: [],
    ratings: [],
  });

  const [filterCounts, setFilterCounts] = useState({
    priceRange: {},
    ram: {},
    storage: {},
    battery: {},
    ratings: {},
  });

  useEffect(() => {
    const fetchFilterCounts = async () => {
      try {
        const response = await productAPI.getFilterCounts();
        console.log("Filter counts response:", response.data);
        setFilterCounts(response.data || {});
      } catch (error) {
        console.log("Error fetching filter counts", error);
      }
    };
    fetchFilterCounts();
  }, []);

  const priceRanges = [
    { label: "₹0 - ₹10000", min: 0, max: 10000 },
    { label: "₹10000 - ₹20000", min: 10000, max: 20000 },
    { label: "₹20000 - ₹30000", min: 20000, max: 30000 },
    { label: "₹30000 - ₹40000", min: 30000, max: 40000 },
    { label: "₹40000 - ₹50000", min: 40000, max: 50000 },
    { label: "₹50000 - ₹60000", min: 50000, max: 60000 },
    { label: "₹60000 - ₹70000", min: 60000, max: 70000 },
    { label: "₹70000 - ₹80000", min: 70000, max: 80000 },
    { label: "₹80000 - ₹90000", min: 80000, max: 90000 },
    { label: "₹90000 - ₹100000", min: 90000, max: 100000 },
    { label: "₹100000 - ₹200000", min: 100000, max: 200000 },
  ];

  const ram = [{ label: "4GB" }, { label: "6GB" }, { label: "8GB" }, { label: "12GB" },{label:"16GB"}];
  const storage = [{ label: "64GB" }, { label: "128GB" }, { label: "256GB" }, { label: "512GB" }, {label: "1TB"}];
  const battery = [{ label: "3000 - 4000", min:3000, max:4000 }, { label: "4000 - 5000", min:4000, max:5000  }, { label: "5000 - 6000", min:5000, max:6000  }];
  const ratings = [{ label: "4★ & above" }, { label: "3★ & above" }];

  // Toggle dropdowns
  const toggleDropdown = (filterName) => {
    setIsOpen((prevState) => ({
      ...prevState,
      [filterName]: !prevState[filterName],
    }));
  };

  // Handle checkbox changes for price range
  const handlePriceRangeChange = (value) => {
    const newPriceRange = filters.priceRange.includes(value)
      ? filters.priceRange.filter((range) => range !== value)
      : [...filters.priceRange, value];
    const updatedFilters = { ...filters, priceRange: newPriceRange };
    setFilters(updatedFilters);

    if (typeof onFilterChange === "function") {
      onFilterChange(updatedFilters);
    }
  };

  const handleRamChange = (value) => {
    const newRam = (filters.ram ?? []).includes(value)
      ? (filters.ram ?? []).filter((ram) => ram !== value)
      : [...(filters.ram ?? []), value];
    const updatedFilters = { ...filters, ram: newRam };
    setFilters(updatedFilters);

    if (typeof onFilterChange === "function") {
      onFilterChange(updatedFilters);
    }
  };

  const handlestorageChange = (value) => {
    const newstorage = filters.storage.includes(value)
      ? filters.storage.filter((storage) => storage !== value)
      : [...filters.storage, value];
    const updatedFilters = { ...filters, storage: newstorage };
    setFilters(updatedFilters);

    if (typeof onFilterChange === "function") {
      onFilterChange(updatedFilters);
    }
  };

  const handleBatteryChange = (value) => {
    const newBattery = filters.battery.includes(value)
      ? filters.battery.filter((battery) => battery !== value)
      : [...filters.battery, value];
    const updatedFilters = { ...filters, battery: newBattery };
    setFilters(updatedFilters);

    if (typeof onFilterChange === "function") {
      onFilterChange(updatedFilters);
    }
  };

  // Handle checkbox changes for ratings
  const handleRatingsChange = (value) => {
    const newRatings = filters.ratings.includes(value)
      ? filters.ratings.filter((rating) => rating !== value)
      : [...filters.ratings, value];
    const updatedFilters = { ...filters, ratings: newRatings };
    setFilters(updatedFilters);

    if (typeof onFilterChange === "function") {
      onFilterChange(updatedFilters);
    }
  };

  return (
    <div className="container1">
      <div className="price">
        <div
          className="dropdown-header"
          onClick={() => toggleDropdown("price")}
        >
          Price
          <span className={`plus-icon ${isOpen.price ? "rotate-icon" : ""}`}>
            {isOpen.price ? "-" : "+"}
          </span>
        </div>

        <div className={`dropdown-section ${isOpen.price ? "open" : ""}`}>
          <div className="dropdown-menu checkbox-menu">
            {priceRanges.map((range) => (
              <label key={range.label} className="checkbox-label">
                <input
                  type="checkbox"
                  value={range.label}
                  checked={filters.priceRange.includes(range.label)}
                  onChange={() => handlePriceRangeChange(range.label)}
                />
                {range.label} ({filterCounts.priceRange?.[range.label] || 0})
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="RAM">
        <div
          className="dropdown-header"
          onClick={() => toggleDropdown("ram")}
        >
          RAM
          <span className={`plus-icon ${isOpen.ram ? "rotate-icon" : ""}`}>
            {isOpen.ram ? "-" : "+"}
          </span>
        </div>

        <div className={`dropdown-section ${isOpen.ram ? "open" : ""}`}>
          <div className="dropdown-menu checkbox-menu">
            {ram.map((ram) => (
              <label key={ram.label} className="checkbox-label">
                <input
                  type="checkbox"
                  value={ram.label}
                  checked={(filters.ram ?? []).includes(ram.label)}
                  onChange={() => handleRamChange(ram.label)}
                />
                {ram.label} ({filterCounts.ram?.[ram.label] || 0})
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="storage">
        <div
          className="dropdown-header"
          onClick={() => toggleDropdown("storage")}
        >
          Internal Storage
          <span className={`plus-icon ${isOpen.storage ? "rotate-icon" : ""}`}>
            {isOpen.storage ? "-" : "+"}
          </span>
        </div>

        <div className={`dropdown-section ${isOpen.storage ? "open" : ""}`}>
          <div className="dropdown-menu checkbox-menu">
            {storage.map((storage) => (
              <label key={storage.label} className="checkbox-label">
                <input
                  type="checkbox"
                  value={storage.label}
                  checked={filters.storage.includes(storage.label)}
                  onChange={() => handlestorageChange(storage.label)}
                />
                {storage.label} ({filterCounts.storage?.[storage.label] || 0})
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="battery">
        <div
          className="dropdown-header"
          onClick={() => toggleDropdown("battery")}
        >
          Battery Capacity
          <span className={`plus-icon ${isOpen.battery ? "rotate-icon" : ""}`}>
            {isOpen.battery ? "-" : "+"}
          </span>
        </div>

        <div className={`dropdown-section ${isOpen.battery ? "open" : ""}`}>
          <div className="dropdown-menu checkbox-menu">
            {battery.map((battery) => (
              <label key={battery.label} className="checkbox-label">
                <input
                  type="checkbox"
                  value={battery.label}
                  checked={filters.battery.includes(battery.label)}
                  onChange={() => handleBatteryChange(battery.label)}
                />
                {battery.label} ({filterCounts.battery?.[battery.label] || 0})
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="ratings">
        <div
          className="dropdown-header"
          onClick={() => toggleDropdown("ratings")}
        >
          Customer Ratings
          <span className={`plus-icon ${isOpen.ratings ? "rotate-icon" : ""}`}>
            {isOpen.ratings ? "-" : "+"}
          </span>
        </div>

        <div className={`dropdown-section ${isOpen.ratings ? "open" : ""}`}>
          <div className="dropdown-menu checkbox-menu">
            {ratings.map((rating) => (
              <label key={rating.label} className="checkbox-label">
                <input
                  type="checkbox"
                  value={rating.label}
                  checked={filters.ratings.includes(rating.label)}
                  onChange={() => handleRatingsChange(rating.label)}
                />
                {rating.label} ({filterCounts.ratings?.[rating.label] || 0})
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter;