import { useState, useEffect } from "react";

const Banner = () => {
  const [isBannerVisible, setIsBannerVisible] = useState(true);
  const [currentSeason, setCurrentSeason] = useState("");

  const getSeason = () => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    console.log(currentMonth);
    if (currentMonth >= 0 && currentMonth <= 2) {
      return "Spring";
    } else if (currentMonth >= 3 && currentMonth <= 5) {
      return "Summer";
    } else if (currentMonth >= 6 && currentMonth <= 8) {
      return "Autumn";
    } else {
      return "Winter";
    }
  };

  useEffect(() => {
    setCurrentSeason(getSeason());
  }, [isBannerVisible]);

  return (
    <>
      {isBannerVisible && (
        <div
          id="banner"
          tabIndex="-1"
          aria-hidden={!isBannerVisible}
          className="fixed z-50 flex w-full items-start justify-between gap-8 border-b border-gray-200 bg-blue-500 px-4 py-3 dark:border-gray-700 dark:bg-blue-800 sm:items-center lg:py-4"
        >
          <p className="mx-auto text-base text-white">
            <span className="font-medium">{currentSeason} Sale is Here!</span>{" "}
            🌟 Whether you're prepping for the season or refreshing your home,
            now’s the time{" "}
            <a
              href="/product"
              className="font-medium underline hover:no-underline"
            >
              to shop!
            </a>
          </p>
          <button
            type="button"
            aria-label="Close banner"
            className="flex items-center rounded-lg p-1.5 text-sm text-white hover:bg-blue-400 hover:text-gray-900 dark:hover:bg-blue-700 dark:hover:text-white"
            onClick={() => setIsBannerVisible(false)}
          >
            <svg
              className="h-5 w-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
      )}
    </>
  );
};

export default Banner;
