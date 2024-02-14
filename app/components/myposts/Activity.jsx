import React, { useState } from "react";
import All from "./All";
import Likes from "./Likes";
import Bookmarks from "./Bookmarks";
const Activity = () => {
  const [selectedButton, setSelectedButton] = useState("Topics");

  const handleButtonClick = (label) => {
    setSelectedButton(label);
  };

  const contentMap = {
    Topics: <All />,
    Likes: <Likes />,
    Bookmarks: <Bookmarks />,
    Vote: (
      <div className="flex justify-center items-center text-2xl font-bold text-blue-500   ">
        <span className="underline text-green-500">Coming Soon</span>
      </div>
    ),
  };

  return (
    <div>
      <div className="flex space-x-4 w-full bg-gray-600 bg-opacity-40 rounded-md ">
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
