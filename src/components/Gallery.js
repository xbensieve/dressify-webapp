import { useState, useEffect } from "react";
import categoryApi from "../api/categoryApi";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
const Gallery = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await categoryApi.getAll();
        setCategories(response.data);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
        setError("Unable to load categories. Please try again later.");
      }
    };

    fetchCategories();
  }, []);

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
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className=" min-h-screen">
      <div className="flex items-center justify-center py-6 flex-wrap gap-4">
        <Button
          type="primary"
          size="large"
          className="rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 shadow-lg transition-all duration-300"
        >
          All Categories
        </Button>
        {categories &&
          categories.map((category) => (
            <Button
              key={category._id}
              type="default"
              size="large"
              className="rounded-full font-serif bg-white text-gray-800 border border-gray-300 hover:bg-gray-100 shadow-md transition-all duration-300 active:scale-95 animate-blink"
              onClick={() => navigate(`/search?keyword=${category.name}`)}
            >
              {category.name}
            </Button>
          ))}
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
