import React from "react";

const CategoryCard = ({ image, altText, label }) => (
  <div className="relative group flex justify-center items-center h-full w-full">
    <img
      className="object-center object-cover h-full w-full rounded-lg"
      src={image}
      alt={altText}
      loading="lazy"
    />
    <button
      aria-label={`Shop ${label} Category`}
      className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 absolute bottom-6 z-10 text-base font-medium text-gray-800 py-2 px-6 bg-white rounded-lg shadow hover:bg-gray-100 transition duration-300"
    >
      {label}
    </button>
    <div className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-500 bottom-0 left-0 w-full h-full bg-gray-800 bg-opacity-25 rounded-lg" />
  </div>
);

const CategorySection = () => {
  const categories = [
    {
      image:
        "https://i.ibb.co/ThPFmzv/omid-armin-m-VSb6-PFk-VXw-unsplash-1-1.png",
      altText: "Woman in a stylish outfit",
      label: "Women",
    },
    {
      image:
        "https://i.ibb.co/SXZvYHs/irene-kredenets-DDqx-X0-7v-KE-unsplash-1.png",
      altText: "Shoes displayed in a minimalist setting",
      label: "Shoes",
    },
    {
      image:
        "https://i.ibb.co/Hd1pVxW/louis-mornaud-Ju-6-TPKXd-Bs-unsplash-1-2.png",
      altText: "Luxury watch on display",
      label: "Watches",
    },
  ];

  return (
    <div className="pb-16 bg-gray-50">
      <div className="flex justify-center items-center">
        <div className="2xl:mx-auto 2xl:container py-12 px-4 sm:px-6 xl:px-20 w-full">
          <div className="flex flex-col justify-center items-center space-y-8">
            {/* Header Section */}
            <div className="text-center">
              <p className="text-lg text-gray-600">
                {new Date().getFullYear()} Trendsetters
              </p>
              <h1 className="text-3xl xl:text-4xl font-semibold text-gray-800">
                Shop By Category
              </h1>
            </div>

            {/* Categories Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((category, index) => (
                <CategoryCard
                  key={index}
                  image={category.image}
                  altText={category.altText}
                  label={category.label}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategorySection;
