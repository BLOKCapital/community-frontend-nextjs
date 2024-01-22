import React, { useState, useRef, useEffect } from "react";
import { MdOutlineArrowRight } from "react-icons/md";
import { RiSearchLine } from "react-icons/ri";
import Mainpage from "../Categories/Mainpage";
import Latest from "../Latest/Latest";
import Top from "../Top/Top";
const Dashbord = ({ setSelectedCategory, selectedCategory }) => {
  const [showAllCategoriesPopup, setShowAllCategoriesPopup] = useState(false);
  const [showTagsPopup, setShowTagsPopup] = useState(false);
  const popupRef = useRef();
  const categories = ["Categories", "Latest", "Top"];
  const wordsArray = [
    "Google",
    "Microsoft",
    "Apple",
    "Facebook",
    "Amazon",
    "Netflix",
    "Twitter",
    "Instagram",
    "LinkedIn",
    "Pinterest",
    "Snapchat",
  ];

  const allCategoriesButtonRef = useRef(null);
  const tagsButtonRef = useRef(null);

  const handleClick = (index) => {
    setSelectedCategory(index === selectedCategory ? index : index);
  };

  const handleAllCategoriesClick = () => {
    setShowTagsPopup(false);
    setShowAllCategoriesPopup(!showAllCategoriesPopup);
  };

  const handleTagsClick = () => {
    setShowAllCategoriesPopup(false);
    setShowTagsPopup(!showTagsPopup);
  };

  const calculatePopupPosition = (buttonRef) => {
    const windowHeight = window.innerHeight;
    const buttonRect = buttonRef.current.getBoundingClientRect();
    const spaceBelowButton = windowHeight - buttonRect.bottom;

    return spaceBelowButton > 300 ? "below" : "above"; // Adjust 300 based on your design
  };

  useEffect(() => {
    const handleResize = () => {
      // Close popups on window resize
      setShowAllCategoriesPopup(false);
      setShowTagsPopup(false);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleBackgroundClick = (e) => {
    if (popupRef.current === e.target) {
      setShowAllCategoriesPopup(false);
      setShowTagsPopup(false);
    }
  };

  return (
    <div>
      <div
        className="flex flex-col md:flex-row gap-5 md:justify-between items-center text-white"
        ref={popupRef}
        onClick={handleBackgroundClick}
      >
        <div className="flex space-x-3 items-center">
          {categories.map((category, index) => (
            <div key={index} className="">
              <p
                className={`cursor-pointer px-3 py-1 border-dashed ${
                  selectedCategory === index
                    ? "bg-indigo-500  text-white rounded-md bg-opacity-80"
                    : ""
                }`}
                onClick={() => {
                  handleClick(index);
                }}
              >
                {category}
              </p>
            </div>
          ))}
        </div>
        <div className="flex space-x-5">
          <div
            ref={allCategoriesButtonRef}
            className="flex items-center space-x-2 cursor-pointer px-2 py-1 border-dashed bg-slate-700 bg-opacity-55 rounded-lg"
            onClick={handleAllCategoriesClick}
          >
            <p>All categories</p>
            <MdOutlineArrowRight size={22} />
          </div>

          {showAllCategoriesPopup && (
            <div
              className={`absolute mt-5 bg-zinc-800 right-72  rounded-md  p-4 ${
                calculatePopupPosition(allCategoriesButtonRef) === "above"
                  ? "bottom-24"
                  : ""
              }`}
            >
              <div className="flex items-center justify-between py-2 bg-white w-96 text-black rounded-md">
                <input
                  type="text"
                  placeholder="Search..."
                  className="ml-2 w-full outline-none"
                />
                <div className="flex gap-2 px-2 cursor-pointer">
                  <RiSearchLine size={23} />
                </div>
              </div>
              <div className="mt-5 p-2 text-xl text-slate-500 space-y-2 h-56 overflow-y-auto">
                {wordsArray.map((word, index) => (
                  <p
                    key={index}
                    className="text-white px-2 py-1 cursor-pointer hover:bg-slate-500 hover:bg-opacity-20 hover:rounded"
                    onClick={handleAllCategoriesClick}
                  >
                    {word}
                  </p>
                ))}
              </div>
            </div>
          )}

          <div
            ref={tagsButtonRef}
            className="flex items-center space-x-2 cursor-pointer px-2 py-1 border-dashed bg-slate-700 bg-opacity-55 rounded-lg"
            onClick={handleTagsClick}
          >
            <p>Tags</p>
            <MdOutlineArrowRight size={22} />
          </div>

          {showTagsPopup && (
            <div
              className={`absolute mt-5 bg-zinc-800 p-4 rounded-lg ${
                calculatePopupPosition(tagsButtonRef) === "above"
                  ? "bottom-24"
                  : ""
              }`}
            >
              <div className="flex items-center justify-between py-2 bg-white w-60 text-black rounded-md">
                <input
                  type="text"
                  placeholder="Search..."
                  className="ml-2 w-full outline-none"
                />
                <div className="flex gap-2 px-2 cursor-pointer">
                  <RiSearchLine size={23} />
                </div>
              </div>
              <div className="mt-5 p-2 text-xl text-slate-500 space-y-2 h-56 overflow-y-auto">
                {wordsArray.map((word, index) => (
                  <p
                    key={index}
                    className="text-white px-2 py-1 cursor-pointer hover:bg-slate-500 hover:bg-opacity-20 hover:rounded"
                    onClick={handleTagsClick}
                  >
                    {word}
                  </p>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="py-5">
        {selectedCategory === 0 && <Mainpage />}
        {selectedCategory === 1 && <Latest />}
        {selectedCategory === 2 && <Top />}
      </div>
    </div>
  );
};

export default Dashbord;
