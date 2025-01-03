const AboutUsPage = () => {
  return (
    <>
      <section class="py-24 relative">
        <div class="w-full max-w-7xl px-4 md:px-5 lg:px-5 mx-auto">
          <div class="w-full justify-start items-center gap-12 grid lg:grid-cols-2 grid-cols-1">
            <div class="w-full justify-center items-start gap-6 grid sm:grid-cols-2 grid-cols-1 lg:order-first order-last">
              <div class="pt-24 lg:justify-center sm:justify-end justify-start items-start gap-2.5 flex">
                <img
                  class="rounded-xl object-cover"
                  src="https://example.com/clothing-image1.jpg"
                  alt="About Us - Clothing"
                />
              </div>
              <img
                class="sm:ml-0 ml-auto rounded-xl object-cover"
                src="https://example.com/clothing-image2.jpg"
                alt="About Us - Fashion"
              />
            </div>
            <div class="w-full flex-col justify-center lg:items-start items-center gap-10 inline-flex">
              <div class="w-full flex-col justify-center items-start gap-8 flex">
                <div class="w-full flex-col justify-start lg:items-start items-center gap-3 flex">
                  <h2 class="text-gray-900 text-4xl font-bold font-manrope leading-normal lg:text-start text-center">
                    Dressing Dreams, One Outfit at a Time
                  </h2>
                  <p class="text-gray-500 text-base font-normal leading-relaxed lg:text-start text-center">
                    Our journey began with a vision to redefine fashion by
                    blending comfort and style. Each piece in our collection
                    tells a story of craftsmanship, creativity, and a deep
                    understanding of our customers’ desires.
                  </p>
                </div>
                <div class="w-full lg:justify-start justify-center items-center sm:gap-10 gap-5 inline-flex">
                  <div class="flex-col justify-start items-start inline-flex">
                    <h3 class="text-gray-900 text-4xl font-bold font-manrope leading-normal">
                      10+ Years
                    </h3>
                    <h6 class="text-gray-500 text-base font-normal leading-relaxed">
                      Experience in Fashion
                    </h6>
                  </div>
                  <div class="flex-col justify-start items-start inline-flex">
                    <h4 class="text-gray-900 text-4xl font-bold font-manrope leading-normal">
                      200+ Styles
                    </h4>
                    <h6 class="text-gray-500 text-base font-normal leading-relaxed">
                      Unique Clothing Designs
                    </h6>
                  </div>
                  <div class="flex-col justify-start items-start inline-flex">
                    <h4 class="text-gray-900 text-4xl font-bold font-manrope leading-normal">
                      95% Happy Customers
                    </h4>
                    <h6 class="text-gray-500 text-base font-normal leading-relaxed">
                      Customer Satisfaction Guaranteed
                    </h6>
                  </div>
                </div>
              </div>
              <button class="sm:w-fit w-full px-3.5 py-2 bg-indigo-600 hover:bg-indigo-800 transition-all duration-700 ease-in-out rounded-lg shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] justify-center items-center flex">
                <span class="px-1.5 text-white text-sm font-medium leading-6">
                  Explore Collection
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>
      <section class="py-24 relative xl:mr-0 lg:mr-5 mr-0">
        <div class="w-full max-w-7xl px-4 md:px-5 lg:px-5 mx-auto">
          <div class="w-full justify-start items-center xl:gap-12 gap-10 grid lg:grid-cols-2 grid-cols-1">
            <div class="w-full flex-col justify-center lg:items-start items-center gap-10 inline-flex">
              <div class="w-full flex-col justify-center items-start gap-8 flex">
                <div class="flex-col justify-start lg:items-start items-center gap-4 flex">
                  <h6 class="text-gray-400 text-base font-normal leading-relaxed">
                    About Us
                  </h6>
                  <div class="w-full flex-col justify-start lg:items-start items-center gap-3 flex">
                    <h2 class="text-indigo-700 text-4xl font-bold font-manrope leading-normal lg:text-start text-center">
                      Our Fashion Journey
                    </h2>
                    <p class="text-gray-500 text-base font-normal leading-relaxed lg:text-start text-center">
                      We believe fashion is an art, and our collections are the
                      canvas. Every design reflects our commitment to quality,
                      sustainability, and innovation in style.
                    </p>
                  </div>
                </div>
                <div class="w-full flex-col justify-center items-start gap-6 flex">
                  <div class="w-full justify-start items-center gap-8 grid md:grid-cols-2 grid-cols-1">
                    <div class="w-full h-full p-3.5 rounded-xl border border-gray-200 hover:border-gray-400 transition-all duration-700 ease-in-out flex-col justify-start items-start gap-2.5 inline-flex">
                      <h4 class="text-gray-900 text-2xl font-bold font-manrope leading-9">
                        10+ Years
                      </h4>
                      <p class="text-gray-500 text-base font-normal leading-relaxed">
                        Expertise in Tailored Elegance
                      </p>
                    </div>
                    <div class="w-full h-full p-3.5 rounded-xl border border-gray-200 hover:border-gray-400 transition-all duration-700 ease-in-out flex-col justify-start items-start gap-2.5 inline-flex">
                      <h4 class="text-gray-900 text-2xl font-bold font-manrope leading-9">
                        200+ Styles
                      </h4>
                      <p class="text-gray-500 text-base font-normal leading-relaxed">
                        Exclusive Fashion Lines
                      </p>
                    </div>
                  </div>
                  <div class="w-full h-full justify-start items-center gap-8 grid md:grid-cols-2 grid-cols-1">
                    <div class="w-full p-3.5 rounded-xl border border-gray-200 hover:border-gray-400 transition-all duration-700 ease-in-out flex-col justify-start items-start gap-2.5 inline-flex">
                      <h4 class="text-gray-900 text-2xl font-bold font-manrope leading-9">
                        15+ Awards
                      </h4>
                      <p class="text-gray-500 text-base font-normal leading-relaxed">
                        Celebrating Creativity and Craftsmanship
                      </p>
                    </div>
                    <div class="w-full h-full p-3.5 rounded-xl border border-gray-200 hover:border-gray-400 transition-all duration-700 ease-in-out flex-col justify-start items-start gap-2.5 inline-flex">
                      <h4 class="text-gray-900 text-2xl font-bold font-manrope leading-9">
                        99% Happy Clients
                      </h4>
                      <p class="text-gray-500 text-base font-normal leading-relaxed">
                        A Testament to Our Commitment
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <button class="sm:w-fit w-full group px-3.5 py-2 bg-indigo-50 hover:bg-indigo-100 rounded-lg shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] transition-all duration-700 ease-in-out justify-center items-center flex">
                <span class="px-1.5 text-indigo-600 text-sm font-medium leading-6 group-hover:-translate-x-0.5 transition-all duration-700 ease-in-out">
                  Discover More
                </span>
                <svg
                  class="group-hover:translate-x-0.5 transition-all duration-700 ease-in-out"
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                >
                  <path
                    d="M6.75265 4.49658L11.2528 8.99677L6.75 13.4996"
                    stroke="#4F46E5"
                    stroke-width="1.6"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>
            </div>
            <div class="w-full lg:justify-start justify-center items-start flex">
              <div class="sm:w-[564px] w-full sm:h-[646px] h-full sm:bg-gray-100 rounded-3xl sm:border border-gray-200 relative">
                <img
                  class="sm:mt-5 sm:ml-5 w-full h-full rounded-3xl object-cover"
                  src="https://example.com/clothing-image3.jpg"
                  alt="Fashion Store"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutUsPage;
