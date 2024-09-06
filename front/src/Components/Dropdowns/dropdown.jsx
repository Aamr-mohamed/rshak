import React, { useState, useRef, useEffect } from "react";
import BodyShape from "../../assets/dropDown.png";

const ImageDropdown = ({ selectedOption, setSelectedOption }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    setIsOpen(false);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);
  return (
    <div className="relative inline-block text-right">
      <div>
        <button
          id="dropdown"
          type="button"
          className="inline-flex justify-between w-full rounded-md border border-[#1769AE] shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={toggleDropdown}
        >
          <div className="flex flex-row justify-start">
            <svg
              className="-mr-1 ml-2 h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06 0L10 10.94l3.71-3.73a.75.75 0 111.06 1.06l-4.24 4.25a.75.75 0 01-1.06 0L5.23 8.27a.75.75 0 010-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <p className="text-sm text-[#1EA4A3]">
            {selectedOption || "شكل الجسم"}
          </p>
        </button>
      </div>

      {isOpen && (
        <div
          className="origin-top-right absolute right-0 mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex="-1"
        >
          <div className="py-1" role="none">
            {/* Image */}
            <img
              src={BodyShape}
              alt="Dropdown"
              className="w-full h-auto rounded-t-md bg-contain"
            />

            {/* Radio Buttons */}
            <div className="px-5 flex flex-row gap-8">
              <label className="block text-gray-700">
                <input
                  type="radio"
                  name="bodyType"
                  value="hourGlass"
                  checked={selectedOption === "الخصر الرفيع"}
                  onChange={handleOptionChange}
                  className="mr-2 form-radio"
                />
                الخصر الرفيع
              </label>

              <label className="block text-gray-700">
                <input
                  type="radio"
                  name="bodyType"
                  value="pearl"
                  checked={selectedOption === "كمثري"}
                  onChange={handleOptionChange}
                  className="mr-2"
                />
                كمثري
              </label>

              <label className="block text-gray-700">
                <input
                  type="radio"
                  name="bodyType"
                  value="straight"
                  checked={selectedOption === "مستقیم"}
                  onChange={handleOptionChange}
                  className="mr-2"
                />
                مستقیم
              </label>

              <label className="block text-gray-700 ">
                <input
                  type="radio"
                  name="bodyType"
                  value="apple"
                  checked={selectedOption === "تفاحه"}
                  onChange={handleOptionChange}
                  className="mr-2"
                />
                تفاحه
              </label>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageDropdown;
