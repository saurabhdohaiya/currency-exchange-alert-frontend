import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GooglePlayAppStoreButton from "../assets/GooglePlayStoreButton.svg";
import AppleAppStoreButton from "../assets/AppleAppStoreButton.svg";
import IphoneScreenZeroWithHand from "../assets/IphoneScreenZeroWithHand.svg";
import IphoneScreenOne from "../assets/IphoneScreenOne.svg";
import Testimonials from "../assets/Testimonials.svg";
import IphoneScreenTwo from "../assets/IphoneScreenTwo.svg";
import IphoneScreenThree from "../assets/IphoneScreenThree.svg";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { FaLink } from "react-icons/fa";
import { MdAddBox } from "react-icons/md";
import { useNavigate } from "react-router-dom"; // Import useNavigate

import { TbAlertTriangleFilled } from "react-icons/tb";

const LandingPage: React.FC = () => {
  const [activeScreen, setActiveScreen] = useState(0);
  const navigate = useNavigate(); // Initialize navigate function

  // Function to handle Accept button click
  const handleAccept = () => {
    navigate("/signin"); // Redirect to the dashboard
  };

  // Tab Labels
  const tabs = [
    {
      label: "Currency Converter",
      icon: <FaIndianRupeeSign />,
      backgroundColor: "bg-white",
    },
    {
      label: "Live Rates",
      icon: <FaLink />,
      backgroundColor: "bg-[#111111]",
    },
    {
      label: "Set Rate Alert",
      icon: <TbAlertTriangleFilled />,
      backgroundColor: "bg-[#111111]",
    },
  ];

  // Handle Tab Clicks
  const handleTabClick = (index: number) => {
    setActiveScreen(index);
  };

  // Optional Scroll Behavior
  useEffect(() => {
    const handleScroll = (event: WheelEvent) => {
      if (event.deltaY > 0 && activeScreen < tabs.length - 1) {
        setActiveScreen((prev) => prev + 1);
      } else if (event.deltaY < 0 && activeScreen > 0) {
        setActiveScreen((prev) => prev - 1);
      }
    };

    window.addEventListener("wheel", handleScroll);
    return () => window.removeEventListener("wheel", handleScroll);
  }, [activeScreen, tabs.length]);

  const screenVariants = {
    initial: { opacity: 0, y: "100%" },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: "-100%" },
  };

  const textVariants = {
    initial: { opacity: 0, y: "-50%" }, // Start above the view
    animate: { opacity: 1, y: 0 }, // Settle into view
    exit: { opacity: 0, y: "50%" }, // Exit below the view
  };

  const gradientVariants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 0.5, scale: 1 },
    exit: { opacity: 0, scale: 0.8 },
  };

  const imageVariants = {
    initial: { opacity: 0, scale: 1 }, // No initial scaling
    animate: { opacity: 1, scale: 1 }, // Smoothly fade into view
    exit: { opacity: 0, scale: 1 }, // Fade out without popping
  };

  return (
    <div className="h-screen w-full flex flex-1 flex-col justify-start items-center bg-white relative">
      {/* Tabs Section */}
      <div className="absolute left-1/2 top-[84%] transform -translate-x-1/2 -translate-y-1/2 flex flex-row justify-center items-center gap-4 bg-[#81EBAB] p-1 rounded-full z-50">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => handleTabClick(index)}
            className={`flex flex-row items-center justify-center gap-2 px-4 py-2 font-semibold ${
              activeScreen === index
                ? "text-white bg-[#7C5BDA] rounded-full"
                : "text-[#111111]"
            }`}
          >
            <span>{tab.label}</span>
            {tab.icon}
          </button>
        ))}
      </div>

      {/* Animate Screen here based on Scroll and tabClick */}
      <div
        className={`flex-1 w-full relative overflow-hidden ${tabs[activeScreen]?.backgroundColor}`}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeScreen}
            variants={screenVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.4 }}
            className="absolute top-0 left-0 w-full h-full"
          >
            {/* Screen Content */}
            {activeScreen === 0 && (
              <motion.div
                className="w-full flex flex-col flex-1 justify-center items-center text-black gap-24"
                variants={textVariants}
                transition={{ duration: 0.4 }}
              >
                {/* Hero content */}
                <motion.div
                  className="flex flex-col justify-center items-center mt-12 mx-auto"
                  variants={textVariants}
                >
                  <p className="text-[56px] font-bold text-[#111111] mb-2">
                    Send money to India at Google rates.
                  </p>
                  <p className="text-xl text-[#111111] mb-6">
                    Say goodbye to forex fees - get the best value for your
                    transfers
                  </p>
                  <div className="relative flex flex-row items-center justify-center gap-4">
                    <motion.img
                      src={AppleAppStoreButton}
                      alt="apple_app_store_download_btn"
                      variants={imageVariants}
                    />
                    <motion.img
                      src={GooglePlayAppStoreButton}
                      alt="google_play_store_download_btn"
                      variants={imageVariants}
                    />
                  </div>
                </motion.div>
                {/* Phone Screen */}
                <div className="w-2/3 relative flex flex-col items-center justify-center">
                  {/* Background Testimonials Image - Layer 0 */}
                  <motion.img
                    variants={imageVariants}
                    src={Testimonials}
                    alt="testimonials"
                    className="absolute top-0 left-0 w-full h-auto object-cover z-0"
                  />

                  {/* Overlapping Content */}
                  <div className="absolute h-[670px] top-0 left-0 w-full flex items-end justify-center pl-36">
                    {/* Screen0 - Layer 1 */}
                    <motion.img
                      variants={imageVariants}
                      className="absolute h-[670px] w-[642px] z-1000 ml-auto mr-6"
                      src={IphoneScreenZeroWithHand}
                      alt="IphoneScreenZeroWithHand"
                    />

                    {/* Screen1 - Layer 2 */}
                    <div className="relative h-[520px] w-[844px] z-20 p-4 flex items-start justify-center ml-16 mr-auto transform -translate-y-[160px]">
                      <motion.img
                        variants={imageVariants}
                        src={IphoneScreenOne}
                        alt="IphoneScreenOne"
                        className="h-full w-auto object-contain"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
            {activeScreen === 1 && (
              <motion.div
                variants={textVariants}
                transition={{ duration: 0.4 }}
                className="w-full flex flex-col flex-1 justify-center items-center bg-[#111111] gap-24"
              >
                {/* Hero content */}
                <motion.div
                  variants={textVariants}
                  className="flex flex-col justify-center items-center mt-12 mx-auto "
                >
                  <p className="text-[56px] font-bold text-white mb-2 text-center">
                    Always know when it’s a <br />
                    good time to transfer with.
                  </p>
                  <p className="text-xl text-white opacity-75 mb-6 text-center">
                    Say goodbye to forex fees- get the best value for your
                    <br />
                    transfers
                  </p>
                  <div className="relative flex flex-row items-center justify-center gap-4">
                    <img
                      src={AppleAppStoreButton}
                      alt="apple_app_store_download_btn"
                    />
                    <img
                      src={GooglePlayAppStoreButton}
                      alt="google_play_store_download_btn"
                    />
                  </div>
                </motion.div>

                {/* Phone Screen */}
                <div
                  className="w-1/2 relative flex flex-col items-center justify-center bg-[#111111]"
                  style={{
                    background:
                      "radial-gradient(circle at center, red 0, blue, green 100%)",
                  }}
                >
                  {/* Background Testimonials Image - Layer 0 */}
                  <motion.img
                    variants={imageVariants}
                    src={Testimonials}
                    alt="testimonials"
                    className="w-5/6 absolute top-0 left-20 h-auto object-cover z-0 opacity-20"
                  />

                  {/* Overlapping Content */}
                  <div className="absolute h-[470px] top-0 left-0 w-full flex items-end justify-center pl-36">
                    {/* Screen0 - Layer 1 */}
                    <motion.img
                      variants={imageVariants}
                      className="absolute h-[470px] w-[642px] z-1000 ml-auto mr-6"
                      src={IphoneScreenZeroWithHand}
                      alt="IphoneScreenZeroWithHand"
                    />

                    {/* Screen1 - Layer 2 */}
                    <div className="relative h-[376px] w-[568px] z-20 p-4 flex items-start justify-center ml-16 mr-auto transform -translate-y-[104px]">
                      <motion.img
                        variants={imageVariants}
                        src={IphoneScreenTwo}
                        alt="IphoneScreenTwo"
                        className="h-full w-auto object-contain"
                      />
                    </div>
                  </div>
                </div>

                <div className="absolute h-screen w-screen top-10 bg-custom-radial-bg-dark-blue opacity-25 rounded-custom backdrop-blur-[458px]"></div>
              </motion.div>
            )}
            {activeScreen === 2 && (
              <motion.div
                variants={textVariants}
                transition={{ duration: 0.4 }}
                className="w-full flex flex-col flex-1 justify-center items-center bg-[#111111] gap-24"
              >
                {/* Hero content */}
                <motion.div
                  variants={textVariants}
                  className="flex flex-col justify-center items-center mt-12 mx-auto "
                >
                  <p className="text-[56px] font-bold text-white mb-2 text-center">
                    Always know when it’s a <br />
                    good time to transfer with.
                  </p>
                  <p className="text-xl text-white opacity-75 mb-6 text-center">
                    Say goodbye to forex fees- get the best value for your
                    <br />
                    transfers
                  </p>
                  <div className="relative flex flex-row items-center justify-center gap-4">
                    <motion.img
                      variants={imageVariants}
                      src={AppleAppStoreButton}
                      alt="apple_app_store_download_btn"
                    />
                    <motion.img
                      variants={imageVariants}
                      src={GooglePlayAppStoreButton}
                      alt="google_play_store_download_btn"
                    />
                  </div>
                </motion.div>

                {/* Phone Screen */}
                <div
                  className="w-1/2 relative flex flex-col items-center justify-center bg-[#111111]"
                  style={{
                    background:
                      "radial-gradient(circle at center, red 0, blue, green 100%)",
                  }}
                >
                  <div className="absolute top-20 flex flex-row justify-center items-center bg-[#7265EE] p-2 rounded-xl gap-2 z-[1000]">
                    <div className="flex flex-row items-center justify-center text-white gap-2">
                      <MdAddBox className="text-3xl" />
                      <p className="text-[#D2D2D2]">
                        Set your first
                        <br />
                        <span className="font-semibold text-white">
                          Rate alert
                        </span>
                      </p>
                    </div>
                    <button
                      className="flex flex-row items-center justify-center text-sm font-semibold bg-[#81EBAB] text-black rounded-full px-3 py-2 hover:bg-green-500"
                      onClick={handleAccept}
                    >
                      Accept
                    </button>
                    <button className="flex flex-row items-center justify-center text-sm bg-black text-white rounded-full px-3 py-2 hover:bg-[#efedfa3a]">
                      Cancel
                    </button>
                  </div>
                  {/* Background Testimonials Image - Layer 0 */}
                  <motion.img
                    variants={imageVariants}
                    src={Testimonials}
                    alt="testimonials"
                    className="w-5/6 absolute top-0 left-20 h-auto object-cover z-0 opacity-20"
                  />

                  {/* Overlapping Content */}
                  <div className="absolute h-[470px] top-0 left-0 w-full flex items-end justify-center pl-36">
                    {/* Screen0 - Layer 1 */}
                    <motion.img
                      variants={imageVariants}
                      className="absolute h-[470px] w-[642px] z-100 ml-auto mr-6"
                      src={IphoneScreenZeroWithHand}
                      alt="IphoneScreenZeroWithHand"
                    />

                    {/* Screen1 - Layer 2 */}
                    <div className="relative h-[376px] w-[568px] z-20 p-4 flex items-start justify-center ml-16 mr-auto transform -translate-y-[104px]">
                      <motion.img
                        variants={imageVariants}
                        src={IphoneScreenThree}
                        alt="IphoneScreenThree"
                        className="h-full w-auto object-contain"
                      />
                    </div>
                  </div>
                </div>

                <div className="absolute h-screen w-screen top-10 bg-custom-radial-bg-dark-red opacity-25 rounded-custom backdrop-blur-[248px]"></div>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default LandingPage;
