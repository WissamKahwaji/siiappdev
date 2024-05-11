import logo from "../../assets/logo_black.png";
import googlePlayImg from "../../assets/google play.png";
import appleStoreImg from "../../assets/apple_store_2.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareFacebook } from "@fortawesome/free-brands-svg-icons";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  return (
    <div className="py-10 w-full  items-center justify-center ">
      <div className=" flex flex-col justify-center items-center">
        <div className="bg-white p-8 rounded-lg border shadow-md max-w-sm  flex flex-col justify-center items-center">
          <div className="mb-8">
            <img src={logo} alt="Instagram" className="w-36" />
          </div>
          <div className="w-full">
            <button
              type="button"
              className="w-full flex flex-row justify-center items-center space-x-2 bg-blue-800 text-white text-sm font-semibold rounded-full py-2  transition duration-300 hover:bg-blue-900 focus:outline-none"
            >
              <FontAwesomeIcon icon={faSquareFacebook} color="white" />
              <p>Log In with Facebook</p>
            </button>
            <div className="flex items-center my-6 ">
              <div className="border-t border-gray-300 flex-grow"></div>
              <div className="mx-4 text-sm text-gray-500">Or</div>
              <div className="border-t border-gray-300 flex-grow"></div>
            </div>
          </div>
          <form className="flex flex-col w-72 space-y-2">
            <input
              type="text"
              className="text-xs w-full font-header rounded border bg-gray-100 border-gray-300 px-2 py-2 focus:outline-none focus:border-gray-400 active:outline-none"
              placeholder="Your Email Or Phone Number"
            />
            <input
              type="text"
              className="text-xs w-full font-header mb-2 rounded border bg-gray-100 border-gray-300 px-2 py-2 focus:outline-none focus:border-gray-400 active:outline-none"
              placeholder="Username"
            />
            <input
              type="text"
              className="text-xs w-full font-header mb-2 rounded border bg-gray-100 border-gray-300 px-2 py-2 focus:outline-none focus:border-gray-400 active:outline-none"
              placeholder="Full Name"
            />
            <input
              type="password"
              className="text-xs w-full font-header mb-2 rounded border bg-gray-100 border-gray-300 px-2 py-2 focus:outline-none focus:border-gray-400 active:outline-none"
              placeholder="Password"
            />
            <input
              type="password"
              className="text-xs w-full font-header mb-2 rounded border bg-gray-100 border-gray-300 px-2 py-2 focus:outline-none focus:border-gray-400 active:outline-none"
              placeholder="Confirm Password"
            />
            <button
              type="button"
              className="text-sm font-header bg-navBackground text-secondary py-1 rounded font-medium"
              onClick={() => {
                navigate("/account");
              }}
            >
              Sign Up
            </button>
          </form>
          <div className="mt-8 text-gray-600 text-center">
            Already have an account?{" "}
            <Link
              to={"/login"}
              className="font-semibold text-blue-500 hover:underline"
            >
              Log in
            </Link>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center space-y-3">
          <p className="mt-4 text-primary font-header text-lg">Get The App</p>
          <div className="flex flex-row space-x-2">
            <img src={googlePlayImg} alt="" className="w-32 h-auto" />
            <img src={appleStoreImg} alt="" className="w-32 h-auto" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
