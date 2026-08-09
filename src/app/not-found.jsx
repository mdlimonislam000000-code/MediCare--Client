import Link from "next/link";
import { HiHome } from "react-icons/hi2";
import { FaExclamationTriangle } from "react-icons/fa";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-100 px-4 py-12">
      <div className="max-w-md w-full text-center space-y-6">
        
        <div className="relative flex justify-center">
          <div className="text-9xl font-black text-primary/10 tracking-widest select-none">
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-primary text-4xl shadow-inner animate-bounce">
              <FaExclamationTriangle />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-base-content">
            Page Not Found
          </h1>
          <p className="text-sm text-base-content/60 max-w-sm mx-auto">
            Oops! The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
        </div>

        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-content font-semibold text-sm shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all duration-200 cursor-pointer"
          >
            <HiHome className="text-lg" />
            <span>Back To Home</span>
          </Link>
        </div>

      </div>
    </div>
  );
};

export default NotFound;