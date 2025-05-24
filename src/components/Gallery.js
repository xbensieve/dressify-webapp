import { useState, useEffect } from "react";
import categoryApi from "../api/categoryApi";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

const Gallery = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await categoryApi.getAll();
        setCategories(response.data);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
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

  // Float + slow rotate + pulse + bounce keyframes injected once
  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      @keyframes float {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-15px); }
      }
      @keyframes slow-rotate {
        0% { transform: rotateY(0deg); }
        50% { transform: rotateY(10deg); }
        100% { transform: rotateY(0deg); }
      }
      @keyframes bounce-scale {
        0%, 100% { transform: scale(1) rotateX(0deg) rotateY(0deg); }
        50% { transform: scale(1.15) rotateX(15deg) rotateY(15deg); }
      }
      @keyframes pulse-glow {
        0%, 100% { box-shadow: 0 0 10px rgba(59, 130, 246, 0.5); }
        50% { box-shadow: 0 0 25px rgba(59, 130, 246, 0.9); }
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  return (
    <div className="min-h-screen">
      <div className="flex flex-wrap justify-center gap-4 py-6 px-4">
        <Button
          type="primary"
          size="large"
          className="rounded-full bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 shadow-xl transition-all duration-300"
        >
          All Categories
        </Button>
        {categories?.map((category) => (
          <Button
            key={category._id}
            type="default"
            size="large"
            className="rounded-full font-serif bg-white text-gray-900 border border-gray-300 hover:bg-gray-100 shadow-md transition-all duration-300 active:scale-95"
            onClick={() => navigate(`/search?keyword=${category.name}`)}
          >
            {category.name}
          </Button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 px-4 sm:px-6 lg:px-8">
        {images.map((src, index) => (
          <div
            key={index}
            className="relative rounded-lg"
            style={{ perspective: "1200px" }}
          >
            <img
              src={src}
              alt={`Gallery item ${index + 1}`}
              loading="lazy"
              draggable={false}
              className="w-full h-auto rounded-lg border border-gray-200 shadow-lg object-cover cursor-pointer"
              style={{
                animation:
                  "float 5s ease-in-out infinite, slow-rotate 10s ease-in-out infinite",
                transformStyle: "preserve-3d",
                transition:
                  "transform 0.3s ease, box-shadow 0.3s ease, filter 0.3s ease",
                boxShadow: "0 8px 15px rgba(0,0,0,0.12)",
                filter: "brightness(1)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.animation =
                  "bounce-scale 0.6s ease forwards";
                e.currentTarget.style.boxShadow =
                  "0 0 20px 4px rgba(59, 130, 246, 0.8), 0 0 40px 10px rgba(59, 130, 246, 0.6)";
                e.currentTarget.style.filter = "brightness(1.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.animation =
                  "float 5s ease-in-out infinite, slow-rotate 10s ease-in-out infinite";
                e.currentTarget.style.boxShadow = "0 8px 15px rgba(0,0,0,0.12)";
                e.currentTarget.style.filter = "brightness(1)";
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
