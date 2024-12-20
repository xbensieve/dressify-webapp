import React, { useState, useEffect } from "react";

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

const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Automatic slide change every 3 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  return (
    <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
      <div id="default-carousel" className="relative overflow-hidden shadow-lg">
        <div className="relative h-56 sm:h-72 md:h-96 lg:h-[500px]">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`${
                currentIndex === index ? "block" : "hidden"
              } duration-700 ease-in-out`}
              aria-hidden={currentIndex !== index}
            >
              <img
                src={slide.imgSrc}
                className="object-cover w-full h-full"
                alt={slide.alt}
              />
              <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xl font-semibold text-white md:text-2xl dark:text-gray-800">
                {slide.caption}
              </span>
            </div>
          ))}
        </div>

        <div
          className="flex absolute bottom-5 left-1/2 z-30 -translate-x-1/2 space-x-2"
          aria-label="Slide indicators"
        >
          {slides.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full ${
                currentIndex === index
                  ? "bg-blue-600"
                  : "bg-gray-300 hover:bg-gray-400 focus:outline-none"
              } transition`}
              aria-label={`Go to slide ${index + 1}`}
            ></button>
          ))}
        </div>

        <button
          type="button"
          onClick={prevSlide}
          className="flex absolute top-1/2 left-3 z-40 items-center justify-center w-10 h-10 bg-gray-200/50 rounded-full hover:bg-gray-300 focus:outline-none transition"
          aria-label="Previous slide"
        >
          <svg
            className="w-5 h-5 text-gray-600"
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
        </button>

        <button
          type="button"
          onClick={nextSlide}
          className="flex absolute top-1/2 right-3 z-40 items-center justify-center w-10 h-10 bg-gray-200/50 rounded-full hover:bg-gray-300 focus:outline-none transition"
          aria-label="Next slide"
        >
          <svg
            className="w-5 h-5 text-gray-600"
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
        </button>
      </div>
    </div>
  );
};

export default Slider;
