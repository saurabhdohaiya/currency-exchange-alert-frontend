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
} from "chart.js";
import { Line } from "react-chartjs-2";
import axios from "axios";
import { MdAddBox } from "react-icons/md";
import CustomDropdown from "./CustomDropdown";
import CreateRateAlertModal from "./CreateRateAlertModal"; // Import the modal component
import { FaIndianRupeeSign } from "react-icons/fa6";

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
  const [chartData, setChartData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // State to manage modal visibility

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
          labels: data.map((entry) => entry.resDate), // Dates on the x-axis
          datasets: [
            {
              label: `${selectedCountry}/INR`,
              data: data.map((entry) => parseFloat(entry.close)), // Closing rates on the y-axis
              borderColor: "blue",
              backgroundColor: "rgba(0, 0, 255, 0.1)",
              tension: 0.3, // Smooth line
            },
          ],
        };

        setChartData(processedData);
      } catch (err) {
        setError("Failed to fetch exchange rate data.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedCountry]);

  return (
    <div className="flex flex-col justify-center items-center bg-[#222222] rounded-2xl gap-6 py-6 px-4 w-full">
      <CustomDropdown
        selected={selectedCountry}
        onChange={setSelectedCountry}
      />

      {/* Loading or Error States */}
      {loading && <p>Loading chart...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {chartData && !loading && !error && (
        <div className="flex w-full p-1 border border-white border-opacity-15 rounded-md">
          <Line
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: true,
              plugins: {
                legend: { display: false, position: "top" },
              },
            }}
          />
        </div>
      )}
      <div className="w-full flex flex-row items-center justify-between px-2">
        <p className="font-bold text-3xl">₹ 84.00</p>
        <button
          onClick={() => setIsModalOpen(true)} // Open the modal
          className="flex flex-row items-center justify-center gap-2 bg-green-400 text-[#0B0B0B] rounded-full px-4 py-3 hover:bg-green-500"
        >
          <p className="text-xs">Set alert</p>
          <MdAddBox />
        </button>
      </div>

      {/* Create Rate Alert Modal */}
      {isModalOpen && (
        <CreateRateAlertModal
          closeModal={() => setIsModalOpen(false)} // Close the modal
          selectedCountry={selectedCountry} // Pass the selected country
        />
      )}
    </div>
  );
};

export default ExchangeRateHistory;
