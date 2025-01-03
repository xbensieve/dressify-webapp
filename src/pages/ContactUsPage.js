const ContactUsPage = () => {
  return (
    <>
      <section className="bg-white dark:bg-gray-900">
        <div className="py-12 lg:py-20 px-6 mx-auto max-w-screen-lg">
          <h2 className="mb-6 text-4xl font-extrabold text-center text-gray-900 dark:text-white">
            Contact Us
          </h2>
          <p className="mb-10 text-center text-lg font-light text-gray-500 dark:text-gray-400">
            Got questions about our latest clothing collection? Need help with
            your order? We’re here to help you every step of the way.
          </p>
          <form
            action="#"
            className="space-y-8 bg-gray-50 dark:bg-gray-800 p-8 rounded-xl shadow-lg"
          >
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Your Email
              </label>
              <input
                type="email"
                id="email"
                className="block w-full p-3 text-sm text-gray-900 bg-white border border-gray-300 rounded-lg shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="yourname@example.com"
                required
              />
            </div>
            <div>
              <label
                htmlFor="subject"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Subject
              </label>
              <input
                type="text"
                id="subject"
                className="block w-full p-3 text-sm text-gray-900 bg-white border border-gray-300 rounded-lg shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="Let us know how we can assist you"
                required
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Your Message
              </label>
              <textarea
                id="message"
                rows="6"
                className="block w-full p-3 text-sm text-gray-900 bg-white border border-gray-300 rounded-lg shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="Leave your comment or question here..."
                required
              ></textarea>
            </div>
            <div>
              <label
                htmlFor="orderNumber"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Order Number (if applicable)
              </label>
              <input
                type="text"
                id="orderNumber"
                className="block w-full p-3 text-sm text-gray-900 bg-white border border-gray-300 rounded-lg shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="Enter your order number"
              />
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="inline-flex items-center py-3 px-6 text-sm font-medium text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 transition duration-300"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.828 9.172a4 4 0 010 5.656m0 0L9.172 9.172m5.656 5.656L19.071 19.07a4 4 0 01-5.656-5.657z"
                  ></path>
                </svg>
                Submit
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default ContactUsPage;
