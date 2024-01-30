import React, { useState } from "react";
import All from "./All";
const Activity = () => {
  const [selectedButton, setSelectedButton] = useState("All");

  const handleButtonClick = (label) => {
    setSelectedButton(label);
  };

  const contentMap = {
    All: <All />,
    Topics: <div>Topics content goes here</div>,
    Likes: <div>Likes content goes here</div>,
    Bookmarks: <div>Bookmarks content goes here</div>,
    Solved: <div>Solved content goes here</div>,
  };

  return (
    <div>
      <div className="flex space-x-4 w-full bg-gray-600 bg-opacity-40 rounded-md">
        {Object.keys(contentMap).map((label, index) => (
          <button
            key={index}
            className={`px-4 py-2 w-full  ${
              selectedButton === label
                ? "text-white bg-blue-500 hover:bg-blue-600"
                : "text-blue-500 bg-dark-800 hover:bg-dark-700"
            } rounded-md transition-all duration-300`}
            onClick={() => handleButtonClick(label)}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="py-5">{contentMap[selectedButton]}</div>
    </div>
  );
};

export default Activity;
