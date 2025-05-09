import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import productAPI from "../API/ProductAPI";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

import Navbar from "./Navbar";
import "../Styles/ProductDetails.css";
import "../Styles/LoadingScreen.css";

const Product = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [availableColors, setAvailableColors] = useState([]);
  const [availableStorages, setAvailableStorages] = useState([]);
  const [error, setError] = useState(null);
  const [imageIndex, setImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState();
  const [selectedStorage, setSelectedStorage] = useState();
  const [cm, setCm] = useState();
  const camera = "https://res.cloudinary.com/du6xftpht/image/upload/v1746515070/camera_buhiqe.png";
  const battery = "https://res.cloudinary.com/du6xftpht/image/upload/v1746515069/battery_fpiou7.png";
  const ram = "https://res.cloudinary.com/du6xftpht/image/upload/v1746515079/ram_ve1zix.png";
  const loading = "https://res.cloudinary.com/du6xftpht/image/upload/v1746515073/loading_fwczgg.png";

  const handleDisplaySize = (displaySize) => {
    setCm(displaySize * 2.54); 
  };

  // Helper function to map color names to CSS color values
  const getColorValue = (colorName) => {
    const mapping = {
      Black: "#000000",
      Blue: "#0000FF",
      White: "#FFFFFF",
      Obsidian: "#2E2E2E",
    };
    return mapping[colorName] || colorName;
  };

  // Fetch product details based on productId
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await productAPI.getProductById(productId);
        setProduct(response.data);
        handleDisplaySize(response.data.displaySize); // Call handleDisplaySize with the displaySize value
      } catch (error) {
        console.error("Error fetching product details", error);
        setError("Failed to load product details. Please try again.");
      }
    };
    fetchProductDetails();
  }, [productId]);

  // Fetch available colors based on the product's name
  useEffect(() => {
    const fetchAvailableColors = async () => {
      try {
        if (product && product.productName) {
          const response = await productAPI.getColorsByProductName(
            product.productName
          );
          const sortedColors = response.data.sort();
          setAvailableColors(sortedColors);
        }
      } catch (error) {
        console.error("Error fetching available colors", error);
      }
    };
    fetchAvailableColors();
  }, [product]);

  useEffect(() => {
    const fetchAvailableStorages = async () => {
      try {
        if (product && product.productName && product.color) {
          const response = await productAPI.getStoragesByProductName(
            product.productName,
            product.color
          );
          const sortedStorages = response.data.sort();
          setAvailableStorages(sortedStorages);
        }
      } catch (error) {
        console.error("Error fetching available colors");
      }
    };
    fetchAvailableStorages();
  }, [product]);

  // When a color is clicked, fetch the variant for that color
  const handleColorClick = async (color) => {
    try {
      setSelectedColor(color);

      const response = await productAPI.getProductByNameAndColor(
        product.productName,
        color
      );
      if (response.data && response.data.length > 0) {
        const variant = response.data[0];

        setProduct((prevProduct) => ({
          ...prevProduct,
          images: variant.images,
          color: variant.color,
          storage: variant.storage,
        }));

        setSelectedStorage(undefined);
        setImageIndex(0);

        // Fetch available storages for the newly selected color
        const storageResponse = await productAPI.getStoragesByProductName(
          product.productName,
          color
        );
        setAvailableStorages(storageResponse.data.sort());
      }
    } catch (error) {
      console.error("Error fetching variant", error);
    }
  };

  const handleStorageClick = async (storage) => {
    try {
      setSelectedStorage(storage);
      const response = await productAPI.getProductByNameAndStorage(
        product.productName,
        product.color,
        storage
      );
      if (response.data && response.data.length > 0) {
        const variant = response.data[0];
        setProduct((prevProduct) => ({
          ...prevProduct,
          images: variant.images,
          color: variant.color,
          storage: variant.storage,
          price: variant.price,
          finalPrice: variant.finalPrice,
          ram: variant.ram,
          batteryCapacity: variant.batteryCapacity,
          description: variant.description,
        }));
        setImageIndex(0);
      }
    } catch (error) {
      console.error("Error fetching variant", error);
    }
  };

  // Handler for previous image in slider
  const handlePrevImage = () => {
    setImageIndex((prevIndex) =>
      prevIndex === 0 ? product.images.length - 1 : prevIndex - 1
    );
  };

  // Handler for next image in slider
  const handleNextImage = () => {
    setImageIndex((prevIndex) =>
      prevIndex === product.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  if (error) {
    return <div className="error">{error}</div>;
  }
  if (!product) {
    return (
      
      <div className="loading-screen">
        <Navbar />
        <img className="loading-image" src={loading} alt="loading" />
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="product-details">
        <button className="left-btn" onClick={handlePrevImage}>
          <FontAwesomeIcon icon={faChevronLeft} style={{ height: "20px" }} />
        </button>
        <button
          onClick={handleNextImage}
          style={{
            position: "fixed",
            top: "50%",
            right: "0",
            transform: "translateY(-50%)",
            background: "black",
            color: "white",
            border: "none",
            width: "55px",
            height: "55px",
            cursor: "pointer",
            marginTop: "30px",
            marginRight: "600px",
          }}
        >
          <FontAwesomeIcon icon={faChevronRight} style={{ height: "20px" }} />
        </button>
        {product.images && product.images.length > 0 ? (
          <div className="image-container">
            <img
              className="image"
              src={product.images[imageIndex]}
              alt={`${product.productName} Image`}
            />
          </div>
        ) : (
          <p>No images available</p>
        )}

        <div className="container4">
          <p className="brandName">
            <strong>{product.brand}</strong>
          </p>
          <h1 style={{ marginRight: "22px" }}>
            {product.productName} <span>{product.storage}</span>
          </h1>
          <h1 style={{ marginTop: "-10px", marginLeft: "-300px" }}>
            {product.color}
          </h1>
          <p
            style={{
              fontSize: "26px",
              fontWeight: "bold",
              marginTop: "-2px",
              marginLeft: "-22px",
            }}
          >
            ₹{product.finalPrice} .00
            <s style={{ fontSize: "20px", color: "black", marginLeft: "20px" }}>
              ₹{product.price}.00
            </s>{" "}
            <s style={{ color: "green", fontSize: "22px", marginLeft: "20px" }}>
              {product.discount}% Off
            </s>
          </p>
          <span className="offer">
            <img
              src="https://assets.sangeethamobiles.com/general_settings/offer_icon_pdp/168128830664366c7242526.gif"
              alt="Offer"
              style={{
                width: "100%",
                height: "auto",
                marginTop: "-40px",
                marginLeft: "200px",
              }}
            />
          </span>

          <div className="available-colors">
            {availableColors.length > 0 ? (
              availableColors.map((color, index) => (
                <span
                  key={index}
                  className="color-badge"
                  style={{
                    backgroundColor: getColorValue(color),
                    border:
                      selectedColor === color || product.color === color
                        ? "2px solid black"
                        : "1px solid #ccc",
                  }}
                  onClick={() => handleColorClick(color)}
                ></span>
              ))
            ) : (
              <p></p>
            )}
          </div>
          <div className="available-storages">
            {availableStorages.length > 0 ? (
              availableStorages.map((storage, index) => (
                <span
                  key={index}
                  className="storage-badge"
                  style={{
                    color: "black",
                    border:
                      selectedStorage === storage || product.storage === storage
                        ? "2px solid black"
                        : "1px solid #ccc",
                  }}
                  onClick={() => handleStorageClick(storage)}
                >
                  {storage}
                </span>
              ))
            ) : (
              <p></p>
            )}
          </div>
          <div className="container5-ram">
            <div className="icon-container">
              <img src={ram} className="icon-image" alt="RAM" />
              <p
                className="icon-name"
                style={{ fontSize: "15px", color: "#619ae8" }}
              >
                RAM
              </p>
              <p className="icon-value">{product.ram}</p>
            </div>
            <div className="icon-container">
              <img src={battery} className="icon-image" alt="Battery" />
              <p
                className="icon-name"
                style={{ fontSize: "15px", color: "#619ae8" }}
              >
                Battery
              </p>
              <p className="icon-value">{product.batteryCapacity}mAh</p>
            </div>
            <div className="icon-container">
              <img src={camera} className="icon-image" alt="Camera" />
              <p
                className="icon-name"
                style={{ fontSize: "15px", color: "#619ae8" }}
              >
                Camera
              </p>
              <p className="icon-value">
                {product.camera} | {product.frontCamera}
              </p>
            </div>
          </div>

          <div className="specifications">
            <h5 className="highlights">Highlights : </h5>
            <ul className="ul-style">
              <li>
                <p>{product.storage} ROM</p>
              </li>
              <li>
                <p>
                  <span>
                    {cm ? cm.toFixed(2) : ""} cm ({product.displaySize} inch){" "}
                    <span> {product.screenType} Display</span>
                  </span>
                </p>
              </li>
              <li>
                <p> {product.processor} Processor</p>
              </li>

              <li>
                <p> {product.warranty}</p>
              </li>
            </ul>
          </div>

          <h5 className="highlights">Description : </h5>
          <div className="desc">
            <p className="description">{product.description}</p>
          </div>
          <div className="specifications">
            <h5 className="highlights">Specifications : </h5>

            <p>
              Resolution : <span>{product.resolution}</span>
            </p>
            <p>
              RefreshRate : <span>{product.refreshRate}</span>
            </p>
            <p>
              OS Type : <span>{product.osType}</span>
            </p>
            <p>
              OS Version : <span>{product.osVersion}</span>
            </p>
            <p>
              Network : <span>{product.network}</span>
            </p>
            <p>
              Wieght : <span>{product.weight} g</span>
            </p>
            <p>
              Charge Watt : <span>{product.chargeWatt}</span>
            </p>
            <p>
              {" "}
              <span>{product.isFastCharging}</span>
            </p>
            <p>
              {" "}
              <span>{product.isWirelessCharging}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
