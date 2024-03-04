import React, { useState } from "react";
import Categorise from "./Categories/Categoris";
import Latest from "./Categories/Latest";
import Top from "./Categories/Top";
import Alllatest from "../AllLatest/Alllatest";

const Optioncatagery = ({ setSelectedCategory, selectedCategory }) => {
  const categories = ["Categories", "Latest", "Top"];

  const handleClick = (index) => {
    setSelectedCategory(index === selectedCategory ? index : index);
  };

  return (
    <>
      <div className="flex flex-col md:flex-row gap-5 md:justify-between items-center text-white">
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
      </div>
      <div className="py-5">
        {selectedCategory === 0 && (
          <div className="lg:flex lg:space-x-10 text-white">
            <div className="lg:w-1/2 w-full">
              <Categorise />
            </div>
            <div className="lg:w-1/2 w-full">
              <Latest />
            </div>
          </div>
        )}
        {selectedCategory === 1 && <Alllatest />}
        {selectedCategory === 2 && <Top />}
      </div>
    </>
  );
};

export default Optioncatagery;
