import React from "react";
import Slider from "../components/Slider";
import CategorySection from "../components/CategorySection";
import Gallery from "../components/Gallery";
import VideoPlayer from "../components/VideoPlayer";
const HomePage = () => {
  return (
    <>
      <Slider />
      <Gallery />
      <CategorySection />
      <VideoPlayer />
    </>
  );
};

export default HomePage;
