import React from "react";
import Navbar from "./Navbar";
import Brand from "./Brand";
import Carousel from "./Carousel";
import Trending from "./Trending";

const Home = () => {
  return (
    <div className="">
      <Navbar />
      <Carousel />
      <Brand />

      <Trending />
    </div>
  );
};

export default Home;
