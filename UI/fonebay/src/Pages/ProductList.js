import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import productAPI from "../API/ProductAPI";
import userAPI from "../API/UserAPI";
import Navbar from "./Navbar";
import SortContainer from "./SortContainer";
import Filter from "./Filter";
import "../Styles/Product.css";
import "../Styles/LoadingScreen.css";

const ProductList = () => {
  const { brand } = useParams();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [brandCount, setBrandCount] = useState(0);
  const [error, setError] = useState(null);
  const [imageIndex, setImageIndex] = useState({});
  const [selectedPriceRange, setSelectedPriceRange] = useState([]);
  const [userId, setUserId] = useState(null);
  const [user, setUser] = useState(null);
  const [successMessage, setSuccessMessage] = useState(false);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [isInCart, setIsInCart] = useState(false);
  const [wishlistStatus, setWishlistStatus] = useState({});
  const [isHeartIcon, setHeartIcon] = useState(false);
  const navigate = useNavigate();
  const loading = "https://res.cloudinary.com/du6xftpht/image/upload/v1746515074/loading2_ciludi.png";
  const blackHeart = "https://res.cloudinary.com/du6xftpht/image/upload/v1746514956/BlackHeart_qsvtu6.png";
  const redHeart = "https://res.cloudinary.com/du6xftpht/image/upload/v1747134069/redheart_he5qqj.png";
  const showSuccessMessage = (message) => {
    setSuccessMessage(message);
  };

  const navigateProduct = (productId) => {
    navigate(`/product/${productId}`);
  };

  useEffect(() => {
      const token = localStorage.getItem("jwtToken");
      console.log("Token : ", token);
      if (token) {
        fetchUserProfile(token);
      }
    }, []);
  
    const fetchUserProfile = async (token) => {
      try {
        const response = await userAPI.getUserProfile(token);
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };
  

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await productAPI.getProductByBrand(brand);
        setProducts(response.data);
        setFilteredProducts(response.data);

        // Initialize image index for each product
        const initialIndex = response.data.reduce((acc, product) => {
          acc[product.productId] = 0;
          return acc;
        }, {});
        setImageIndex(initialIndex);
      } catch (error) {
        console.error("Error fetching products", error);
        setError("Failed to load products. Please try again.");
      }
    };
    fetchProducts();
  }, [brand]);

  useEffect(() => {
    const storedUserId = localStorage.getItem("id");
    console.log("Retrived user", storedUserId);
    setUserId(storedUserId);
  }, []);

  const handleWishlist = async (productId) => {
   console.log("User id in wishlist : ",userId);
    if (!userId) {
      showSuccessMessage(
        "You must be logged in to add/remove items from your wishlist."
      );
      navigate("/login");
      return;
    }

    // Toggle wishlist status immediately
    const isInWishlist = wishlistStatus[productId];
    setWishlistStatus((prevStatus) => ({
      ...prevStatus,
      [productId]: !isInWishlist, // Optimistic UI update
    }));

    const method = isInWishlist ? "DELETE" : "POST";
    //setIsInWishlist(!isInWishlist);
    showSuccessMessage(
      isInWishlist
        ? "Mobile removed from wishlist!"
        : "Mobile added to wishlist!"
    );
    try {
      const response = await fetch(
        `http://localhost:9009/api/users/${userId}/wishlist/${productId}`,
        {
          method: method,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        // Revert UI if the server responds with an error
        setWishlistStatus((prevStatus) => ({
          ...prevStatus,
          [productId]: isInWishlist, // Revert to previous state if the update fails
        }));
        showSuccessMessage("Failed to update wishlist.");
      }
    } catch (error) {
      console.error("Error updating wishlist:", error);
      // Revert UI if there is an error
      setWishlistStatus((prevStatus) => ({
        ...prevStatus,
        [productId]: isInWishlist, // Revert to previous state if the update fails
      }));
      showSuccessMessage("An error occurred while updating the wishlist.");
    }
  };

  // Handle filter change
  const handleFilterChange = (updatedFilters) => {
    setSelectedPriceRange(updatedFilters.priceRange);
    filterProducts(updatedFilters);
  };

  // Handle sort change
  const handleSortChange = (sortedProducts) => {
    setFilteredProducts(sortedProducts);
  };

  useEffect(() => {
    const fetchBrandCount = async () => {
      try {
        const response = await productAPI.getProductCountByBrand(brand);
        setBrandCount(response.data);
      } catch (error) {
        console.error("Error fetching brand count", error);
      }
    };
    if (brand) {
      fetchBrandCount();
    }
  }, [brand]);

  // Filter products based on selected filters
  const filterProducts = (filters) => {
    let filtered = products;

    if (filters.priceRange?.length > 0) {
      filtered = filtered.filter((product) => {
        return filters.priceRange.some((range) => {
          const [minPrice, maxPrice] = range
            .replace(/₹|,/g, "")
            .split(" - ")
            .map(Number);
          const productPrice = product.finalPrice;
          return (
            productPrice >= minPrice &&
            (maxPrice ? productPrice <= maxPrice : true)
          );
        });
      });
    }

    if (filters.ram?.length > 0) {
      filtered = filtered.filter((product) =>
        filters.ram.includes(product.ram)
      );
    }

    if (filters.storage?.length > 0) {
      filtered = filtered.filter((product) =>
        filters.storage.includes(product.storage)
      );
    }

    if (filters.battery?.length > 0) {
      filtered = filtered.filter((product) => {
        return filters.battery.some((range) => {
          const [minBattery, maxBattery] = range.split(" - ").map(Number);
          const productBattery = product.battery;
          return (
            productBattery >= minBattery &&
            (maxBattery ? productBattery <= maxBattery : true)
          );
        });
      });
    }

    if (filters.ratings?.length > 0) {
      filtered = filtered.filter((product) =>
        filters.ratings.some((ratings) => {
          const minRating = parseInt(ratings.charAt(0), 10);
          return product.ratings >= minRating;
        })
      );
    }

    setFilteredProducts(filtered);
  };

  if (!products.length) {
    return (
      <div>
        <Navbar />
        <div className="loading-overlay">
          <img className="loading-image" src={loading} alt="loading" />
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="heading-container">
        <span>
          {" "}
          <h1>
            Results for {brand} ({brandCount}){" "}
          </h1>{" "}
        </span>

        <SortContainer onSortChange={handleSortChange} />
      </div>
      <div className="product-list-container">
        <div className="filter-container">
          <Filter onFilterChange={handleFilterChange} />
        </div>
        <div className="product-container">
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              marginTop: "-12px",
              backgroundColor: "white",
              color: "black",
              borderTop: "1px solid #ddd",
            }}
          >
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <li
                  key={product.productId}
                  style={{
                    borderBottom: "1px solid #ddd",
                    padding: "10px",
                    marginBottom: "1px",
                  }}
                >
                  <div>
                    <p
                      style={{
                        fontFamily: "monospace",
                        padding: "20px",
                        fontSize: "25px",
                        fontWeight: "bold",
                      }}
                      onClick={() => navigateProduct(product.productId)}
                    >
                      {product.productName} {product.storage}
                    </p>
                    <p style={{ fontWeight: "bold", color: "#444" }}>
                      <span>
                        {product.color} , {product.ram}
                      </span>
                    </p>
                    <p style={{ fontWeight: "bold" }}>
                      ₹ {product.finalPrice}.00{" "}
                      <s style={{ color: "#888" }}>₹ {product.price}.00</s>{" "}
                      <span style={{ color: "green", fontWeight: "bold" }}>
                        {product.discount}% Off
                      </span>
                    </p>
                    <img
                      src={product.images[imageIndex[product.productId]]}
                      alt={`${product.productName} Image`}
                      width="250"
                      height="270"
                      style={{
                        borderRadius: "8px",
                        marginTop: "-190px",
                        marginRight: "650px",
                      }}
                    />
                    <div className="image-nav">
                      <button
                        className="image-toggle-button"
                        onClick={handleWishlist}
                      >
                        <img
                          src={isHeartIcon ? blackHeart : redHeart}
                          className="toggle-image"
                          alt="toggle-image"
                        />
                      </button>
                      <div
                        className={`wishlist-btn ${
                          wishlistStatus[product.productId] ? "filled" : ""
                        }`}
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent triggering the card click
                          handleWishlist(product.productId);
                        }}
                      >
                        <img src={wishlistStatus[product.productId] ? redHeart : blackHeart} alt="Wishlist" className = "wishlist-icon" />
                      </div>
                    </div>
                  </div>
                </li>
              ))
            ) : (
              <div className="loading-screen">
                <img className="loading-image" src={loading} alt="loading" />
              </div>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
