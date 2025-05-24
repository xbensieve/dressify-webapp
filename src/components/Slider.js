import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react"; // Lucide Icons

const slides = [
  {
    id: 1,
    imgSrc:
      "https://rare-gallery.com/uploads/posts/1152281-women-model-simple-background-short-hair-Asian-white-dress-dress-fashion-hands-on-hips-wedding-dress-spring-clothing-Masami-Nagasawa-bride-dance-arm-gown-photo-shoot-ab.jpg",
    alt: "Elegant White Dress",
    caption: "Dressing up like I am already famous, that is my confidence",
  },
  {
    id: 2,
    imgSrc:
      "https://images.pexels.com/photos/432059/pexels-photo-432059.jpeg?cs=srgb&dl=pexels-rfera-432059.jpg&fm=jpg",
    alt: "Stylish Urban Look",
    caption: "Leaving a little sparkle wherever I go",
  },
  {
    id: 3,
    imgSrc: "https://images6.alphacoders.com/919/919104.jpg",
    alt: "Vibrant Fashion",
    caption: "Making the world my own runway with one outfit at a time",
  },
  {
    id: 4,
    imgSrc:
      "https://wallpapercat.com/w/full/3/c/8/1224493-1080x1920-mobile-1080p-fashion-model-background.jpg",
    alt: "Vibrant Fashion",
    caption: "I am chasing my dreams in high heels",
  },
  {
    id: 5,
    imgSrc: "https://images5.alphacoders.com/729/729559.jpg",
    alt: "Vibrant Fashion",
    caption: "Style is a way to say who you are without speaking",
  },
];

const Slide = ({ slide, isActive, index, totalSlides, currentIndex }) => {
  const radius = 700;
  const angle = (360 / totalSlides) * index;
  const rotateY = angle - (360 / totalSlides) * currentIndex;

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center"
      style={{
        transformStyle: "preserve-3d",
        transformOrigin: "center",
      }}
      animate={{
        opacity: isActive ? 1 : 0.15,
        scale: isActive ? 1 : 0.8,
        rotateY,
        x: radius * Math.sin((rotateY * Math.PI) / 180),
        z: isActive ? 0 : -radius,
        y: 0,
      }}
      transition={{
        duration: 1,
        ease: "easeInOut",
      }}
    >
      <div className="relative w-[80%] sm:w-[60%] md:w-[45%] h-[80%] sm:h-[75%] overflow-hidden shadow-2xl border border-white/20 backdrop-blur-md">
        <img
          src={slide.imgSrc}
          alt={slide.alt}
          className="w-full h-full object-cover"
          style={{ backfaceVisibility: "hidden" }}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"></div>
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white font-semibold text-xl sm:text-3xl md:text-4xl text-center px-4"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1 : 0.95 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {slide.caption}
        </motion.div>
      </div>
    </motion.div>
  );
};

const Controls = ({ onPrev, onNext, currentIndex, goToSlide, slides }) => (
  <>
    {/* Arrows */}
    <motion.button
      onClick={onPrev}
      className="absolute top-1/2 left-1 z-50 p-3 rounded-full bg-white/70 text-black shadow-xl hover:bg-white"
      aria-label="Previous"
      whileHover={{ rotate: -15 }}
    >
      <ChevronLeft size={24} />
    </motion.button>

    <motion.button
      onClick={onNext}
      className="absolute top-1/2 right-1 z-50 p-3 rounded-full bg-white/70 text-black shadow-xl hover:bg-white"
      aria-label="Next"
      whileHover={{ rotate: 15 }}
    >
      <ChevronRight size={24} />
    </motion.button>
  </>
);

const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isPaused]);

  const goToSlide = (index) => setCurrentIndex(index);
  const prevSlide = () =>
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % slides.length);

  return (
    <div
      className="relative w-full max-w-screen-xl mx-auto h-[400px] sm:h-[500px] md:h-[650px] lg:h-[750px] px-2 sm:px-4"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <motion.div
        className="relative w-full h-full overflow-hidden rounded-3xl"
        style={{ perspective: 1200 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <AnimatePresence>
          {slides.map((slide, index) => (
            <Slide
              key={slide.id}
              slide={slide}
              isActive={currentIndex === index}
              index={index}
              totalSlides={slides.length}
              currentIndex={currentIndex}
            />
          ))}
        </AnimatePresence>
        <Controls
          onPrev={prevSlide}
          onNext={nextSlide}
          currentIndex={currentIndex}
          goToSlide={goToSlide}
          slides={slides}
        />
      </motion.div>
    </div>
  );
};

export default Slider;
