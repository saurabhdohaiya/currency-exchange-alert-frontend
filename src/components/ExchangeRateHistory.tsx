import React, { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
} from "chart.js";
import { Line } from "react-chartjs-2";
import axios from "axios";
import { MdAddBox } from "react-icons/md";
import CustomDropdown from "./CustomDropdown";
import CreateRateAlertModal from "./CreateRateAlertModal"; // Import the modal component
import { FaIndianRupeeSign } from "react-icons/fa6";
import Shimmer from "./Shimmer"; // Import Shimmer component
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface ExchangeRateData {
  adjClose: string;
  close: string;
  code: string;
  duration: string;
  high: string;
  id: number;
  lastUpdatedOn: string;
  low: string;
  open: string;
  resDate: string;
}

const ExchangeRateHistory: React.FC = () => {
  const [selectedCountry, setSelectedCountry] = useState<string>("AED");
  const [chartData, setChartData] = useState<ChartData<"line"> | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); //

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `https://web-api.vance.club/public/api/currency-converter/forex?code=${selectedCountry}INR%3DX&timeline=1M`
        );
        const data: ExchangeRateData[] = response.data;

        const processedData = {
          labels: data.map((entry) => entry.resDate),
          datasets: [
            {
              label: `${selectedCountry}/INR`,
              data: data.map((entry) => parseFloat(entry.close)),
              borderColor: "blue",
              backgroundColor: "rgba(0, 0, 255, 0.1)",
              tension: 0.3,
            },
          ],
        };

        setChartData(processedData);
        toast.success("Exchange rate data fetched successfully!", {
          autoClose: 2000,
          style: {
            color: "#79E7A5",
            backgroundColor: "#222222",
            borderRadius: "8px",
          },
        });
      } catch (err) {
        setError("Failed to fetch exchange rate data.");
        toast.error("Failed to fetch exchange rate data. Please try again.", {
          autoClose: 3000,
          style: {
            color: "#EF4444",
            backgroundColor: "#222222",
            borderRadius: "8px",
          },
        });
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedCountry]);

  return (
    <div className="flex flex-col justify-center items-center bg-[#222222] rounded-2xl gap-6 py-6 px-4 w-full">
      {loading ? (
        <div className="flex flex-col gap-4 w-full">
          <Shimmer className="w-full h-12 rounded-md" />
          <Shimmer className="w-full h-64 rounded-md" />
          <Shimmer className="w-1/2 h-10 rounded-md mx-auto" />
        </div>
      ) : (
        <>
          <CustomDropdown
            selected={selectedCountry}
            onChange={setSelectedCountry}
          />

          {error && <p className="text-red-500">{error}</p>}

          {chartData && !error && (
            <div className="flex w-full p-1 border border-white border-opacity-15 rounded-md">
              <Line
                data={{
                  ...chartData,
                  datasets: chartData.datasets.map((dataset) => ({
                    ...dataset,
                    borderColor: "#79E7A5",
                    borderWidth: 2,
                    backgroundColor: "rgba(121, 231, 165, 0.55)",
                    fill: "start",
                  })),
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: true,
                  plugins: {
                    legend: { display: false, position: "top" },
                  },
                  elements: {
                    line: {
                      tension: 0.4,
                    },
                    point: {
                      radius: 0,
                    },
                  },
                  scales: {
                    x: {
                      grid: {
                        color: "rgba(255, 255, 255, 0.1)",
                      },
                      ticks: {
                        color: "#FFFFFF",
                      },
                    },
                    y: {
                      grid: {
                        color: "rgba(255, 255, 255, 0.1)",
                      },
                      ticks: {
                        color: "#FFFFFF",
                      },
                    },
                  },
                }}
              />
            </div>
          )}

          <div className="w-full flex flex-row items-center justify-between px-2">
            <p className="font-bold text-3xl">₹ 84.00</p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex flex-row items-center justify-center gap-2 bg-green-400 text-[#0B0B0B] rounded-full px-4 py-3 hover:bg-green-500"
            >
              <p className="text-xs">Set alert</p>
              <MdAddBox />
            </button>
          </div>
        </>
      )}
      {isModalOpen && (
        <CreateRateAlertModal
          closeModal={() => setIsModalOpen(false)}
          selectedCountry={selectedCountry}
        />
      )}
    </div>
  );
};

export default ExchangeRateHistory;
