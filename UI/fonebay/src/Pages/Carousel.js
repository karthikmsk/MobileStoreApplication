import React, { useState, useEffect } from "react";
import "../Styles/Carousel.css";

const images = [
  "https://assets.sangeethamobiles.com/placeholder_banner/placeholderBanner_1739788627_601.jpg",
  "https://assets.sangeethamobiles.com/placeholder_banner/placeholderBanner_1739787960_606.jpg",
  "https://assets.sangeethamobiles.com/placeholder_banner/placeholderBanner_1739461032_605.jpg",
  "https://assets.sangeethamobiles.com/placeholder_banner/placeholderBanner_1739362274_592.jpg",
  "https://assets.sangeethamobiles.com/placeholder_banner/placeholderBanner_1739341742_600.jpg",
  "https://assets.sangeethamobiles.com/placeholder_banner/placeholderBanner_1738569628_589.jpg",
  "https://assets.sangeethamobiles.com/placeholder_banner/placeholderBanner_1737962286_591.jpg",
  "https://assets.sangeethamobiles.com/placeholder_banner/placeholderBanner_1736762155_584.jpg",
  "https://assets.sangeethamobiles.com/placeholder_banner/placeholderBanner_1736488311_582.jpg",
  "https://assets.sangeethamobiles.com/placeholder_banner/placeholderBanner_1736494231_580.jpg",
  "https://assets.sangeethamobiles.com/placeholder_banner/placeholderBanner_1736140308_578.jpg",
  "https://assets.sangeethamobiles.com/placeholder_banner/placeholderBanner_1736140454_569.jpg",
  "https://assets.sangeethamobiles.com/placeholder_banner/placeholderBanner_1736140157_566.jpg",
];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg">
      <div className="carousel">
        <img
          src={images[currentIndex]}
          alt="Slide"
          className="carousel-image"
        />
      </div>
      <div className="dots">
        {images.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === currentIndex ? "active" : ""}`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
