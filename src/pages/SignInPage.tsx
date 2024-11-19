import React from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../config/firebaseConfig";
import { useNavigate } from "react-router-dom";

import { FcGoogle } from "react-icons/fc";
import MegaphoneIcon1 from "../assets/megaphoneIcon1.svg";

import RadialGradientRectangle from "../components/RadialGradientRectangle";

const SignInPage: React.FC = () => {
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("User signed in:", result.user);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  return (
    <div className="h-full w-full flex flex-1 justify-center items-center bg-[#111111] overflow-hidden">
      <div className="relative w-1/5 h-auto flex flex-col items-center justify-center gap-12 text-white text-center">
        <RadialGradientRectangle />

        <img
          src={MegaphoneIcon1}
          alt={`${MegaphoneIcon1.toLowerCase()}`}
          className="relative z-10"
        />

        <div className="flex flex-col justify-center items-center gap-9 z-10">
          <p className="text-4xl font-bold">
            Access
            <br />
            rate alert dashboard
          </p>
          <p className="text-gray-400">
            Stay updated with real-time currency rates and manage your alerts.
          </p>
        </div>
        <button
          onClick={handleGoogleSignIn}
          className="w-full flex flex-row justify-center items-center gap-4 bg-[#333333] text-white font-semibold py-4 px-8 rounded-full hover:bg-[#efedfa3a] z-10"
        >
          <FcGoogle className="text-xl" />
          <p>Sign in with Google</p>
        </button>
        <p className="text-base text-white text-opacity-50 mt-6 z-10">
          By creating an account or signing in, you agree to our{" "}
          <span className="font-semibold underline">Terms and Conditions</span>
        </p>
      </div>
    </div>
  );
};

export default SignInPage;
