import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <section className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center px-4">
      <div className="text-center max-w-xl">
        <h1 className="text-7xl md:text-9xl font-extrabold text-primary-600 dark:text-primary-500 mb-6">
          404
        </h1>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Page not found
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-lg mb-6">
          Sorry, we couldn't find the page you're looking for. You can always go
          back to the homepage.
        </p>
        <Link
          to="/"
          className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 active:scale-95 focus:ring-4 focus:ring-primary-300 rounded-lg transition-all duration-200 ease-in-out dark:focus:ring-primary-800"
        >
          Back to Homepage
        </Link>
      </div>
    </section>
  );
};

export default NotFoundPage;
