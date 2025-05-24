import { useInView } from "react-intersection-observer";
import Slider from "../../components/Slider";
import CategorySection from "../../components/CategorySection";
import Gallery from "../../components/Gallery";
import VideoPlayer from "../../components/VideoPlayer";

const HomePage = () => {
  const [sliderRef, sliderInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [galleryRef, galleryInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [categoryRef, categoryInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [videoRef, videoInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      {/* Slider Section */}
      <div className="mb-24">
        <div
          ref={sliderRef}
          className={`flex flex-col lg:flex-row items-center justify-center gap-8 transition-opacity duration-700 ${
            sliderInView ? "opacity-100" : "opacity-0"
          }`}
        >
          <Slider />
        </div>
      </div>

      {/* Gallery Section */}
      <div
        ref={galleryRef}
        className={`mb-24 transition-opacity duration-700 ${
          galleryInView ? "opacity-100" : "opacity-0"
        }`}
      >
        <Gallery />
      </div>
      {/* Category Section */}
      <div
        ref={categoryRef}
        className={`mb-24 transition-opacity duration-700 ${
          categoryInView ? "opacity-100" : "opacity-0"
        }`}
      >
        <CategorySection />
      </div>

      {/* Video Section */}
      <div
        ref={videoRef}
        className={`mb-24 transition-opacity duration-700 ${
          videoInView ? "opacity-100" : "opacity-0"
        }`}
      >
        <VideoPlayer />
      </div>
    </div>
  );
};

export default HomePage;
