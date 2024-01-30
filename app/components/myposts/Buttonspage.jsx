import React, { useState } from "react";
import { FiActivity, FiBell, FiAward, FiSettings } from "react-icons/fi";
import Activity from "./Activity";
import Notifications from "./Notifications";
import Preferences from "./Preferences";

const DashboardHeader = () => {
  const [showComponent, setShowComponent] = useState(true);
  const [showComponent1, setShowComponent1] = useState(false);
  const [showComponent2, setShowComponent2] = useState(false);

  const handleButtonClick = (e) => {
    if (e === 1) {
      setShowComponent(true);
      setShowComponent1(false);
      setShowComponent2(false);
    } else if (e === 2) {
      setShowComponent(false);
      setShowComponent1(true);
      setShowComponent2(false);
    } else if (e === 3) {
      setShowComponent(false);
      setShowComponent1(false);
      setShowComponent2(true);
    }
  };

  return (
    <>
      <div className="flex items-center justify-end space-x-4 py-4">
        <button
          className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-md"
          onClick={() => handleButtonClick(1)}
        >
          <FiActivity size={20} />
          <span>Activity</span>
        </button>
        <button
          className="flex items-center space-x-2 bg-yellow-500 text-white px-4 py-2 rounded-md"
          onClick={() => handleButtonClick(2)}
        >
          <FiBell size={20} />
          <span>Notifications</span>
        </button>
        {/*<button
          className="flex items-center space-x-2 bg-green-500 text-white px-4 py-2 rounded-md"
          onClick={handleButtonClick}
        >
          <FiAward size={20} />
          <span>Badges</span>
        </button>*/}
        <button
          className="flex items-center space-x-2 bg-gray-500 text-white px-4 py-2 rounded-md"
          onClick={() => handleButtonClick(3)}
        >
          <FiSettings size={20} />
          <span>Preferences</span>
        </button>
      </div>
      {showComponent && <Activity />}
      {showComponent1 && <Notifications />}
      {showComponent2 && <Preferences />}
    </>
  );
};

export default DashboardHeader;
