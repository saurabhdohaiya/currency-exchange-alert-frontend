import React from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../config/firebaseConfig";

import ExchangeRateHistory from "../components/ExchangeRateHistory";
import RateAlertHistory from "../components/RateAlertHistory";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      navigate("/signin");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div className="h-full w-full flex flex-1 justify-center items-start bg-[#111111] overflow-hidden">
      <div className="relative w-1/4 h-auto flex flex-col items-center justify-center gap-12 text-white text-center py-12">
        <div className="flex flex-col items-center justify-center gap-12 w-full">
          <p className="text-4xl">Rate alert dashboard</p>
          <ExchangeRateHistory />
        </div>
        <div className="flex flex-col items-center justify-center w-full">
          <RateAlertHistory />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
