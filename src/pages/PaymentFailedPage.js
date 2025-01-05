const PaymentFailedPage = () => {
  return (
    <div className="bg-gray-100 h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-center">
          <svg
            viewBox="0 0 24 24"
            className="text-red-600 w-16 h-16"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="currentColor"
              d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0ZM15.535,8.464a1,1,0,0,1,0,1.414L13.414,12l2.121,2.121a1,1,0,0,1-1.414,1.414L12,13.414l-2.121,2.121a1,1,0,1,1-1.414-1.414L10.586,12,8.464,9.879a1,1,0,0,1,1.414-1.414L12,10.586l2.121-2.121A1,1,0,0,1,15.535,8.464Z"
            ></path>
          </svg>
        </div>
        <div className="text-center mt-6">
          <h3 className="text-2xl text-gray-900 font-semibold">
            Payment Failed!
          </h3>
          <p className="text-gray-600 mt-2">
            Unfortunately, your payment could not be processed.
          </p>
          <p className="text-gray-600 mt-1">
            Please try again or contact support for assistance.
          </p>
          <div className="mt-6">
            <a
              href="/product"
              className="px-6 py-2 bg-red-600 hover:bg-red-500 text-white font-semibold rounded-lg transition duration-300 ease-in-out"
            >
              Return
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentFailedPage;
