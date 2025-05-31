import { Mail, KeyRound, User } from 'lucide-react';
import { FcGoogle } from 'react-icons/fc';
import { signInWithPopup, auth, provider } from "../firebase";
import { FaFacebook } from 'react-icons/fa';


const login = () => {
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("Logged in as:", user.displayName);
      // Optional: Redirect or save user data here
    } catch (error) {
      console.error("Google Sign-In Error:", error.message);
    }
  };

  return (
    <>
      <div className="containter">
        <form className="w-full max-w-[400px] mx-auto mt-[10%] bg-white rounded-xl shadow-xl p-8">
          <h2 className="text-4xl font-bold text-center text-gray-800 pb-6">Welcome Back!</h2>

          <label className="flex items-center gap-2 text-gray-700 mt-4">
            <Mail className="text-blue-500" />
            Email
          </label>
          <input
            type="email"
            placeholder="eg. nizar234@gmail.com"
            className="w-full h-10 mt-2 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />

          <label className="flex items-center gap-2 text-gray-700 mt-4">
            <KeyRound className="text-blue-500" />
            Password
          </label>
          <input
            type="password"
            placeholder="eg. #######"
            className="w-full h-10 mt-2 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />

          <button
            type="submit"
            className="w-full bg-green-700 hover:bg-green-800 text-white py-2 px-4 rounded-md mt-6 transition"
          >
            Login
          </button>

          <div className="flex items-center my-6">
            <div className="flex-grow h-px bg-gray-300"></div>
            <span className="px-2 text-sm text-gray-500">or</span>
            <div className="flex-grow h-px bg-gray-300"></div>
          </div>

          {/* ✅ Attach Google Sign-In handler here */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 py-2 px-4 rounded-md hover:bg-gray-100 transition mb-3"
          >
            <FcGoogle size={20} />
            <span className="text-sm font-medium">Continue with Google</span>
          </button>

          <button
            type="button"
            className="w-full flex items-center justify-center gap-3 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
          >
            <FaFacebook size={20} />
            <span className="text-sm font-medium">Continue with Facebook</span>
          </button>
        </form>
      </div>
    </>
  );
};

export default login;

