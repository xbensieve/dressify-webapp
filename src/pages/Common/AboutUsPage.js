import React from "react";
import { Button } from "antd";
import { motion } from "framer-motion";

const AboutUsPage = () => {
  return (
    <>
      <motion.section
        className="bg-white py-24"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-full max-w-7xl px-4 md:px-5 lg:px-5 mx-auto">
          <div className="w-full grid lg:grid-cols-2 grid-cols-1 gap-12">
            <motion.div
              className="w-full grid sm:grid-cols-2 grid-cols-1 gap-6 lg:order-first order-last"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <div className="pt-24 flex justify-center sm:justify-end">
                <motion.img
                  className="rounded-xl object-cover w-full max-w-md"
                  src="https://www.instyle.com/thmb/5QKqC0VHnLZaViKofSuQDXAcU54=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/is-best-online-clothing-brands-tout-9dd0a27d621c45dcaaa52274d3dd8dc6.jpg"
                  alt="About Us - Clothing"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <motion.img
                className="sm:ml-0 ml-auto rounded-xl object-cover w-full max-w-md"
                src="https://www.sanctuaryclothing.com/cdn/shop/files/OurStory-Explore_NAVBLOCKS__720x1068_1dea101b-301f-49ed-bef1-2b14e84f7108.png?v=1733940170"
                alt="About Us - Fashion"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
            <motion.div
              className="w-full flex flex-col justify-center items-start gap-10"
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <div className="w-full flex flex-col justify-start items-start gap-8">
                <div className="w-full flex flex-col justify-start items-start gap-3">
                  <h2 className="text-gray-900 text-4xl font-bold leading-normal">
                    Dressing Dreams, One Outfit at a Time
                  </h2>
                  <p className="text-gray-500 text-base font-normal leading-relaxed">
                    Our journey began with a vision to redefine fashion by
                    blending comfort and style. Each piece in our collection
                    tells a story of craftsmanship, creativity, and a deep
                    understanding of our customers’ desires.
                  </p>
                </div>
                <div className="w-full flex flex-wrap justify-start items-center gap-10">
                  <div className="flex flex-col justify-start items-start">
                    <h3 className="text-gray-900 text-4xl font-bold leading-normal">
                      10+ Years
                    </h3>
                    <h6 className="text-gray-500 text-base font-normal leading-relaxed">
                      Experience in Fashion
                    </h6>
                  </div>
                  <div className="flex flex-col justify-start items-start">
                    <h4 className="text-gray-900 text-4xl font-bold leading-normal">
                      200+ Styles
                    </h4>
                    <h6 className="text-gray-500 text-base font-normal leading-relaxed">
                      Unique Clothing Designs
                    </h6>
                  </div>
                  <div className="flex flex-col justify-start items-start">
                    <h4 className="text-gray-900 text-4xl font-bold leading-normal">
                      95% Happy Customers
                    </h4>
                    <h6 className="text-gray-500 text-base font-normal leading-relaxed">
                      Customer Satisfaction Guaranteed
                    </h6>
                  </div>
                </div>
              </div>
              <motion.div whileTap={{ scale: 0.95 }}>
                <Button
                  type="primary"
                  className="w-full sm:w-auto px-3.5 py-2 text-sm font-medium text-white bg-gray-800 hover:bg-gray-700 rounded-lg shadow-sm transition duration-300"
                >
                  Explore Collection
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>
      <motion.section
        className="bg-white py-24"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <div className="w-full max-w-7xl px-4 md:px-5 lg:px-5 mx-auto">
          <div className="w-full grid lg:grid-cols-2 grid-cols-1 gap-10">
            <motion.div
              className="w-full flex flex-col justify-center items-start gap-10"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <div className="w-full flex flex-col justify-start items-start gap-8">
                <div className="flex flex-col justify-start items-start gap-4">
                  <h6 className="text-gray-400 text-base font-normal leading-relaxed">
                    About Us
                  </h6>
                  <div className="w-full flex flex-col justify-start items-start gap-3">
                    <h2 className="text-gray-800 text-4xl font-bold leading-normal">
                      Our Fashion Journey
                    </h2>
                    <p className="text-gray-500 text-base font-normal leading-relaxed">
                      We believe fashion is an art, and our collections are the
                      canvas. Every design reflects our commitment to quality,
                      sustainability, and innovation in style.
                    </p>
                  </div>
                </div>
                <div className="w-full flex flex-col justify-center items-start gap-6">
                  <div className="w-full grid md:grid-cols-2 grid-cols-1 gap-8">
                    <motion.div
                      className="w-full p-3.5 rounded-xl border border-gray-200 hover:border-gray-400 transition duration-300"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h4 className="text-gray-900 text-2xl font-bold leading-9">
                        10+ Years
                      </h4>
                      <p className="text-gray-500 text-base font-normal leading-relaxed">
                        Expertise in Tailored Elegance
                      </p>
                    </motion.div>
                    <motion.div
                      className="w-full p-3.5 rounded-xl border border-gray-200 hover:border-gray-400 transition duration-300"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h4 className="text-gray-900 text-2xl font-bold leading-9">
                        200+ Styles
                      </h4>
                      <p className="text-gray-500 text-base font-normal leading-relaxed">
                        Exclusive Fashion Lines
                      </p>
                    </motion.div>
                  </div>
                  <div className="w-full grid md:grid-cols-2 grid-cols-1 gap-8">
                    <motion.div
                      className="w-full p-3.5 rounded-xl border border-gray-200 hover:border-gray-400 transition duration-300"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h4 className="text-gray-900 text-2xl font-bold leading-9">
                        15+ Awards
                      </h4>
                      <p className="text-gray-500 text-base font-normal leading-relaxed">
                        Celebrating Creativity and Craftsmanship
                      </p>
                    </motion.div>
                    <motion.div
                      className="w-full p-3.5 rounded-xl border border-gray-200 hover:border-gray-400 transition duration-300"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h4 className="text-gray-900 text-2xl font-bold leading-9">
                        99% Happy Clients
                      </h4>
                      <p className="text-gray-500 text-base font-normal leading-relaxed">
                        A Testament to Our Commitment
                      </p>
                    </motion.div>
                  </div>
                </div>
              </div>
              <motion.div whileTap={{ scale: 0.95 }}>
                <Button className="w-full sm:w-auto px-3.5 py-2 text-sm font-medium text-gray-800 bg-gray-100 hover:bg-gray-200 rounded-lg shadow-sm transition duration-300 flex items-center">
                  <span className="px-1.5">Discover More</span>
                  <svg
                    className="ml-1 hover:translate-x-0.5 transition duration-300"
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                  >
                    <path
                      d="M6.75265 4.49658L11.2528 8.99677L6.75 13.4996"
                      stroke="#4B5563"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Button>
              </motion.div>
            </motion.div>
            <motion.div
              className="w-full flex justify-center lg:justify-start"
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <div className="sm:w-[564px] w-full sm:h-[646px] h-full bg-gray-100 rounded-3xl border border-gray-200">
                <motion.img
                  className="sm:mt-5 sm:ml-5 w-full h-full rounded-3xl object-cover"
                  src="https://spiritclothing.ie/cdn/shop/files/spirit_clothing_story_6fb11e74-44c2-47a3-af89-84ba60f8c8c2.jpg?v=1668557396"
                  alt="Fashion Store"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </>
  );
};

export default AboutUsPage;
