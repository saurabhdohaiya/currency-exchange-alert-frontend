import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import Logo from "../assets/logo.svg";
import { FaCircleArrowDown } from "react-icons/fa6";

const HeaderComponent: React.FC = () => {
  const navigate = useNavigate();

  const redirectToHome = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeIn" }}
      className="flex justify-between items-center py-4 px-52 bg-[#111111] border-b border-b-white border-opacity-10"
    >
      <div
        className="text-green-400 text-2xl font-bold hover:cursor-pointer"
        onClick={(e) => redirectToHome(e)}
      >
        <img src={Logo} alt="Vance_Logo" className="h-8" />
      </div>
      <button className="bg-green-400 text-[#0b0b0b] font-semibold py-2 px-6 mx-1 rounded-full flex items-center justify-center gap-2">
        <span>Download app</span>
        <FaCircleArrowDown />
      </button>
    </motion.header>
  );
};

export default HeaderComponent;
