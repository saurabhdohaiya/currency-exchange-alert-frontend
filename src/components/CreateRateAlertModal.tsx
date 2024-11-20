import React, { useState } from "react";
import { availableCountries } from "../config/countriesConfig";
import { saveRateAlert } from "../services/fireStoreService";
import { MdAddBox } from "react-icons/md";
import { toast } from "react-toastify";

interface Props {
  closeModal: () => void;
  selectedCountry: string;
  setAlerts: React.Dispatch<React.SetStateAction<any[]>>;
}

const CreateRateAlertModal: React.FC<Props> = ({
  closeModal,
  selectedCountry,
  setAlerts,
}) => {
  const [title, setTitle] = useState("Send money home");
  const [targetRate, setTargetRate] = useState("1000");
  const selectedCountryData = availableCountries.find(
    (country) => country.value === selectedCountry
  );

  const createAlert = async () => {
    try {
      const newAlert = await saveRateAlert(
        title,
        selectedCountry,
        parseFloat(targetRate)
      );
      setAlerts((prevAlerts) => [newAlert, ...prevAlerts]);
      toast.success("Rate alert created successfully!", {
        autoClose: 2000,
        style: {
          color: "#79E7A5",
          backgroundColor: "#222222",
          borderRadius: "8px",
        },
      });
      closeModal();
    } catch (error) {
      toast.error("Failed to create rate alert. Please try again.", {
        autoClose: 3000,
        style: {
          color: "#79E7A5",
          backgroundColor: "#222222",
          borderRadius: "8px",
        },
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-[#11111180] backdrop-blur-[24px] flex items-center justify-center z-50">
      <div className="bg-[#333333] p-8 rounded-xl max-w-md w-1/6 flex flex-col items-center justify-center gap-6">
        <p className="text-xl font-semibold text-white">Set Rate Alert!</p>
        {selectedCountry ? (
          <div className="flex flex-col gap-3 justify-center items-center">
            <img
              src={selectedCountryData?.flag}
              alt={`${selectedCountryData?.label} flag`}
              className="w-16 h-16 rounded-full border border-[#efedfa3a]"
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
        )}
        <div className="flex flex-col gap-4 w-full">
          <div className="flex flex-col">
            <label
              htmlFor="title"
              className="text-white text-sm mb-3 text-left"
            >
              Title
            </label>
            <input
              type="text"
              className="py-3 px-4 bg-[#444444] text-white rounded-lg text-base"
              placeholder="Enter alert title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="relative flex flex-col">
            <label
              htmlFor="targetRate"
              className="text-white text-sm mb-3 text-left"
            >
              Rate alert value
            </label>
            <span className="absolute left-3 top-10 transform text-white opacity-70">
              ₹
            </span>
            <input
              type="number"
              className="pl-8 p-2 bg-[#444444] text-white rounded-lg w-full"
              placeholder="Enter target rate"
              value={targetRate}
              onChange={(e) => setTargetRate(e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-col w-full justify-end gap-4">
          <button
            disabled={
              !title.trim() || !targetRate || parseFloat(targetRate) <= 0
            }
            className={`flex flex-row items-center justify-center gap-2 ${
              title.trim() && targetRate && parseFloat(targetRate) > 0
                ? "bg-green-400 hover:bg-green-500"
                : "bg-green-400 opacity-50"
            } text-[#0B0B0B] rounded-full px-4 py-3`}
            onClick={createAlert}
          >
            <p className="font-semibold">Set alert</p>
            <MdAddBox />
          </button>
          <button
            className="flex flex-row items-center justify-center gap-2 bg-[#333333] text-white opacity-50 rounded-full px-4 py-3 hover:bg-[#efedfa3a]"
            onClick={closeModal}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateRateAlertModal;
