import React, { useState } from "react";
import { availableCountries } from "../config/countriesConfig";
import { MdKeyboardArrowDown } from "react-icons/md";

const CustomDropdown: React.FC<{
  selected: string;
  onChange: (value: string) => void;
}> = ({ selected, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectedCountry = availableCountries.find(
    (country) => country.value === selected
  );

  const handleSelect = (value: string) => {
    onChange(value);
    setIsOpen(false);
  };

  return (
    <div className="relative w-1/3 ml-2 mr-auto">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-[#393939] text-white flex items-center justify-between p-2 rounded-md"
      >
        {selectedCountry ? (
          <div className="flex flex-row gap-2 justify-center items-center">
            <img
              src={selectedCountry.flag}
              alt={`${selectedCountry.label} flag`}
              className="w-5 h-5 rounded-full"
            />
            <p>{selectedCountry.label}</p>
          </div>
        ) : (
          <p>Select Country</p>
        )}
        <span>
          <MdKeyboardArrowDown />
        </span>
      </button>

      {isOpen && (
        <ul className="absolute bg-[#393939] w-full shadow-lg rounded-md mt-2 z-10">
          {availableCountries.map((country) => (
            <li
              key={country.value}
              onClick={() => handleSelect(country.value)}
              className="flex items-center gap-2 p-2 border-b border-b-[#efedfa3a] hover:bg-[#efedfa3a] cursor-pointer"
            >
              <img
                src={country.flag}
                alt={`${country.label} flag`}
                className="w-6 h-6 rounded-full"
              />
              <span>{country.label}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomDropdown;
