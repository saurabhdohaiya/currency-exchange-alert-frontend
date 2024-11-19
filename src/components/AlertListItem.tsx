import React from "react";
import { availableCountries } from "../config/countriesConfig";

interface AlertListItemProps {
  alert: {
    id: string;
    title: string;
    currencyPair: string;
    targetRate: number;
    triggered: boolean;
    createdAt: { seconds: number; nanoseconds: number };
  };
}

const AlertListItem: React.FC<AlertListItemProps> = ({ alert }) => {
  const date = new Date(alert.createdAt.seconds * 1000);
  // Extract day, month, and year
  const day = String(date.getDate()).padStart(2, "0"); // Ensure 2-digit format
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  const year = date.getFullYear();

  const selectedCountryData = availableCountries.find(
    (country) => country.value === alert.currencyPair
  );

  return (
    <div className="w-full h-full flex flex-row items-start justify-between bg-[#222222] p-4 rounded-lg shadow-md text-white mb-2">
      <div className="flex flex-col items-start">
        <p className="font-semibold text-sm opacity-75 mb-1">{alert.title}</p>
        <p className="font-bold text-3xl mb-6">₹{alert.targetRate}</p>
        {selectedCountryData ? (
          <div className="flex flex-row gap-3 justify-center items-center">
            <img
              src={selectedCountryData?.flag}
              alt={`${selectedCountryData?.label} flag`}
              className="w-8 h-8 rounded-full border border-[#efedfa3a]"
            />
            <div className="text-base flex flex-row gap-2 justify-center items-center">
              <span>{`${selectedCountryData?.label.split(" ")[0]} `}</span>
              <span className="opacity-50 text-sm">
                {`${selectedCountryData?.currencySymbol} (${selectedCountryData?.value})`}
              </span>
            </div>
          </div>
        ) : (
          <p>Select Country</p>
        )}{" "}
      </div>
      <div className="flex flex-col justify-between items-end h-full">
        {/* Date at the top-right */}
        <div className="flex flex-row gap-1 items-center mb-12">
          <p className="p-2 px-3 rounded-md bg-[#333333] text-white">{day}</p>
          <p className="text-[#757575] font-bold">/</p>
          <p className="p-2 px-3 rounded-md bg-[#333333] text-white">{month}</p>
          <p className="text-[#757575] font-bold">/</p>
          <p className="p-2 px-3 rounded-md bg-[#333333] text-white">{year}</p>
        </div>

        {/* Alert triggered at the bottom-right */}
        <div className="flex items-center gap-2">
          <p className="text-right text-white opacity-50">status:</p>
          <div
            className={`w-3 h-3 rounded-full ${
              alert.triggered ? "bg-red-400" : "bg-green-400"
            }`}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default AlertListItem;
