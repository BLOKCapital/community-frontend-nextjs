"use client";
import React, { useState } from "react";
import { GrFormClose } from "react-icons/gr";
import { RiSearchLine } from "react-icons/ri";
import Link from "next/link";

const Searchall = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const handleInputChange = (e) => {
    setSearchInput(e.target.value);
    //setShowPopup(e.target.value.trim() !== "");
  };

  const clearInput = () => {
    setSearchInput("");
    // Hide the popup when the input is cleared
    setShowPopup(false);
  };

  const formatTitle = (title) => {
    // Your implementation here
    return title.toLowerCase().replace(/\s+/g, "-");
  };
  return (
    <>
      <div className="flex items-center justify-between md:w-[60%] w-full py-2 bg-white text-black rounded-md">
        <input
          type="text"
          placeholder="Search..."
          value={searchInput}
          onChange={handleInputChange}
          className="ml-2 w-full outline-none"
        />

        <div className="flex gap-2 px-2 cursor-pointer">
          {searchInput ? <GrFormClose size={23} onClick={clearInput} /> : null}
          <RiSearchLine size={23} />
        </div>
      </div>
      {showPopup && (
        <div className="absolute pb-80 text-white text-lg z-10">
          <div className="flex justify-center">
            <div className="bg-slate-800 bg-opacity-100 border rounded-lg p-4 w-[full] md:w-[107vh] ">
              {/* Render the relevant data based on search input */}
              {/* Example: <SearchResults searchInput={searchInput} /> */}
              <div className="space-y-3">
                <div className=" cursor-pointer hover:bg-slate-300 hover:bg-opacity-25 px-3 py-2 rounded-lg">
                  <p>Popup content based on search input</p>
                </div>
                <Link href={`/search/${formatTitle(searchInput)}`}>
                  <div className="cursor-pointer hover:bg-slate-300 hover:bg-opacity-25 px-3 py-2 rounded-lg ">
                    More..
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Searchall;
