
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#3a9970] text-white">
      <div className="text-center space-y-4">
        <h1 className="text-9xl font-extrabold">404</h1>
        <p className="text-3xl">Oops! Page Not Found</p>
        <p className="text-xl mt-4">
          Sorry, the page you’re looking for doesn’t exist. You might have entered an incorrect URL or the page has been moved.
        </p>
        <Link to="/" className="mt-6 px-6 py-3 text-black bg-[#eaf4f4] hover:bg-blue-300 rounded-full text-lg font-semibold transition duration-300">
          Go Back to Home
        </Link>
      </div>
      <div className="absolute bottom-10 text-sm text-gray-200">
        <p>&copy; {new Date().getFullYear()} EduTrack. All Rights Reserved.</p>
      </div>
    </div>
  );
};

export default NotFound;
