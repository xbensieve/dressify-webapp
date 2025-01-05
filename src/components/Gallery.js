import { useState, useEffect } from "react";
const Gallery = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [
    "https://images.pexels.com/photos/4456815/pexels-photo-4456815.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/19852011/pexels-photo-19852011/free-photo-of-thanh-ph-th-i-trang-ng-i-kinh-ram.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
    "https://images.pexels.com/photos/20025540/pexels-photo-20025540/free-photo-of-anh-sang-th-i-trang-dan-ba-sang-t-o.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
    "https://images.pexels.com/photos/914668/pexels-photo-914668.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/15336571/pexels-photo-15336571/free-photo-of-th-i-trang-giay-cao-d-ng.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
    "https://images.pexels.com/photos/13963459/pexels-photo-13963459.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
    "https://images.pexels.com/photos/11334890/pexels-photo-11334890.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
    "https://images.pexels.com/photos/20147045/pexels-photo-20147045/free-photo-of-dan-ba-mo-hinh-qu-n-jean-d-ng.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
    "https://images.pexels.com/photos/13741783/pexels-photo-13741783.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
    "https://images.pexels.com/photos/4132651/pexels-photo-4132651.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
    "https://images.pexels.com/photos/157675/fashion-men-s-individuality-black-and-white-157675.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=600",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, []);
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="flex items-center justify-center py-6 flex-wrap gap-4">
        <button
          type="button"
          className="text-blue-700 hover:text-white border border-blue-600 bg-white hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-full text-base font-medium px-5 py-2.5 transition-all duration-300"
        >
          All Categories
        </button>
        <button
          type="button"
          className="text-gray-900 border border-gray-300 bg-white hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-full text-base font-medium px-5 py-2.5 transition-all duration-300"
        >
          Shoes
        </button>
        <button
          type="button"
          className="text-gray-900 border border-gray-300 bg-white hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-full text-base font-medium px-5 py-2.5 transition-all duration-300"
        >
          Bags
        </button>
        <button
          type="button"
          className="text-gray-900 border border-gray-300 bg-white hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-full text-base font-medium px-5 py-2.5 transition-all duration-300"
        >
          Accessories
        </button>
        <button
          type="button"
          className="text-gray-900 border border-gray-300 bg-white hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-full text-base font-medium px-5 py-2.5 transition-all duration-300"
        >
          Clothes
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 px-4 sm:px-6 lg:px-8">
        {[
          "https://images.pexels.com/photos/4456815/pexels-photo-4456815.jpeg?auto=compress&cs=tinysrgb&w=600",
          "https://images.pexels.com/photos/19852011/pexels-photo-19852011/free-photo-of-thanh-ph-th-i-trang-ng-i-kinh-ram.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
          "https://images.pexels.com/photos/20025540/pexels-photo-20025540/free-photo-of-anh-sang-th-i-trang-dan-ba-sang-t-o.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
          "https://images.pexels.com/photos/914668/pexels-photo-914668.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          "https://images.pexels.com/photos/15336571/pexels-photo-15336571/free-photo-of-th-i-trang-giay-cao-d-ng.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
          "https://images.pexels.com/photos/13963459/pexels-photo-13963459.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
          "https://images.pexels.com/photos/11334890/pexels-photo-11334890.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
          "https://images.pexels.com/photos/20147045/pexels-photo-20147045/free-photo-of-dan-ba-mo-hinh-qu-n-jean-d-ng.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
          "https://images.pexels.com/photos/13741783/pexels-photo-13741783.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
          "https://images.pexels.com/photos/4132651/pexels-photo-4132651.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
          "https://images.pexels.com/photos/157675/fashion-men-s-individuality-black-and-white-157675.jpeg?auto=compress&cs=tinysrgb&w=600",
          "https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=600",
        ].map((src, index) => (
          <div key={index} className="relative group">
            <img
              className="h-auto max-w-full rounded-lg object-cover transition-transform duration-300 group-hover:scale-105"
              src={src}
              alt={`Gallery item ${index + 1}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
