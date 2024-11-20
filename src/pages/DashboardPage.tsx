import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../config/firebaseConfig";
import { fetchCurrencyAlerts } from "../services/fireStoreService";
import { toast } from "react-toastify";
import ExchangeRateHistory from "../components/ExchangeRateHistory";
import RateAlertHistory from "../components/RateAlertHistory";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  const [alerts, setAlerts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const fetchedAlerts = await fetchCurrencyAlerts();
        setAlerts(fetchedAlerts);
        setError(null);
        toast.success("Alerts fetched successfully!", {
          autoClose: 2000,
          style: {
            color: "#79E7A5",
            backgroundColor: "#222222",
            borderRadius: "8px",
          },
        });
      } catch (err) {
        console.error("Error fetching alerts:", err);
        setError("Failed to fetch alerts. Please try again.");
        toast.error("Failed to fetch alerts. Please try again.", {
          autoClose: 3000,
          style: {
            color: "#EF4444",
            backgroundColor: "#222222",
            borderRadius: "8px",
          },
        });
      } finally {
        setLoading(false);
      }
    };

    fetchAlerts();
  }, []);

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
          {/* Pass setAlerts to ExchangeRateHistory */}
          <ExchangeRateHistory alerts={alerts} setAlerts={setAlerts} />
        </div>
        <div className="flex flex-col items-center justify-center w-full">
          {/* Pass alerts to RateAlertHistory */}
          <RateAlertHistory alerts={alerts} loading={loading} error={error} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
