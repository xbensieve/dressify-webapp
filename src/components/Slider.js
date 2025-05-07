import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "antd";

const slides = [
  {
    id: 1,
    imgSrc:
      "https://rare-gallery.com/uploads/posts/1152281-women-model-simple-background-short-hair-Asian-white-dress-dress-fashion-hands-on-hips-wedding-dress-spring-clothing-Masami-Nagasawa-bride-dance-arm-gown-photo-shoot-ab.jpg",
    alt: "First Slide",
  },
  {
    id: 2,
    imgSrc:
      "https://images.pexels.com/photos/432059/pexels-photo-432059.jpeg?cs=srgb&dl=pexels-rfera-432059.jpg&fm=jpg",
    alt: "Second Slide",
  },
  {
    id: 3,
    imgSrc: "https://images6.alphacoders.com/919/919104.jpg",
    alt: "Third Slide",
  },
];

const Slide = ({ slide, isActive }) => (
  <motion.div
    className={`absolute inset-0 ${isActive ? "block" : "hidden"}`}
    initial={{ opacity: 0 }}
    animate={{ opacity: isActive ? 1 : 0 }}
    transition={{ duration: 0.8 }}
    aria-hidden={!isActive}
  >
    <img
      src={slide.imgSrc}
      className="object-cover w-full h-full"
      alt={slide.alt}
    />
    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black via-transparent to-transparent opacity-50"></div>
    <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-3xl font-extrabold text-white md:text-4xl lg:text-5xl">
      {slide.caption}
    </span>
  </motion.div>
);

const Controls = ({ onPrev, onNext, currentIndex, goToSlide, slides }) => (
  <>
    {/* Indicators */}
    <div
      className="flex absolute bottom-5 left-1/2 z-30 -translate-x-1/2 space-x-2"
      aria-label="Slide indicators"
    >
      {slides.map((_, index) => (
        <button
          key={index}
          type="button"
          onClick={() => goToSlide(index)}
          className={`w-4 h-4 rounded-full ${
            currentIndex === index
              ? "bg-indigo-600"
              : "bg-gray-300 hover:bg-gray-400 focus:outline-none"
          } transition-all`}
          aria-label={`Go to slide ${index + 1}`}
        ></button>
      ))}
    </div>

    {/* Previous Button */}
    <Button
      type="primary"
      shape="circle"
      onClick={onPrev}
      className="absolute top-1/2 left-3 z-40 flex items-center justify-center bg-gray-800/50 hover:bg-gray-700 transition"
      aria-label="Previous slide"
      icon={
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 19l-7-7 7-7"
          ></path>
        </svg>
      }
    />

    {/* Next Button */}
    <Button
      type="primary"
      shape="circle"
      onClick={onNext}
      className="absolute top-1/2 right-3 z-40 flex items-center justify-center bg-gray-800/50 hover:bg-gray-700 transition"
      aria-label="Next slide"
      icon={
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 5l7 7-7 7"
          ></path>
        </svg>
      }
    />
  </>
);

const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [isPaused]);

  const goToSlide = (index) => setCurrentIndex(index);

  const prevSlide = () =>
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );

  const nextSlide = () =>
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);

  return (
    <div
      className="relative max-w-full mx-auto px-4 sm:px-6 lg:px-8"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="relative overflow-hidden shadow-lg rounded-lg">
        <div className="relative h-56 sm:h-72 md:h-96 lg:h-[500px]">
          {slides.map((slide, index) => (
            <Slide
              key={slide.id}
              slide={slide}
              isActive={currentIndex === index}
            />
          ))}
        </div>
        <Controls
          onPrev={prevSlide}
          onNext={nextSlide}
          currentIndex={currentIndex}
          goToSlide={goToSlide}
          slides={slides}
        />
      </div>
    </div>
  );
};

export default Slider;
