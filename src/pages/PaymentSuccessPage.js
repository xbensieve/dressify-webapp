const PaymentSuccessPage = () => {
  return (
    <div className="bg-gray-100 h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-center">
          <svg
            viewBox="0 0 24 24"
            className="text-green-600 w-16 h-16"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="currentColor"
              d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
            ></path>
          </svg>
        </div>
        <div className="text-center mt-6">
          <h3 className="text-2xl text-gray-900 font-semibold">
            Payment Successful!
          </h3>
          <p className="text-gray-600 mt-2">
            Thank you for completing your secure online payment.
          </p>
          <p className="text-gray-600 mt-1">We appreciate your business!</p>
          <div className="mt-6">
            <a
              href="/product"
              className="px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-lg transition duration-300 ease-in-out"
            >
              Return
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;
