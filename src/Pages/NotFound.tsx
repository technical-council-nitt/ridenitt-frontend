import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="gradient-background flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-4xl font-bold text-red-600">404 - Page Not Found</h1>
      <p className="text-gray-600 mt-2">Oops! The page you're looking for doesn't exist.</p>
      <Link to="/" className="mt-4 px-4 py-2 bg-[#008955] text-white rounded-md">
        Get Back!
      </Link>
    </div>
  );
};

export default NotFound;
