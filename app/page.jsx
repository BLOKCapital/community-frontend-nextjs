/* eslint-disable react/no-unescaped-entities */
"use client";
import { useState } from "react";
import { RiSearchLine } from "react-icons/ri";
import { GrFormClose } from "react-icons/gr";
import Cards from "./components/cards/Cards";
import Cards2 from "./components/cards/Cards2";
import Dashbord from "./components/Dashbord/Dashbord";
export default function Home() {
  const [searchInput, setSearchInput] = useState("");

  const handleInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const clearInput = () => {
    setSearchInput("");
  };
  return (
    <>
      <div className="">
        <div className="bg-gradient-to-r from-indigo-500  via-black to-pink-500 rounded-xl">
          <div className="py-10 flex flex-col justify-center items-center space-y-8">
            <div className="flex flex-col justify-center items-center space-y-3">
              <h1 className="text-3xl font-extrabold">
                Welcome to BLOK Capital Community
              </h1>
              <p>
                We're happy to have you here 💖 If you need help, please search
                before posting a new topic.
              </p>
            </div>
            <div className="flex items-center justify-between w-[60%] py-2 bg-white text-black rounded-md">
              <input
                type="text"
                placeholder="Search..."
                value={searchInput}
                onChange={handleInputChange}
                className="ml-2 w-full outline-none"
              />
              <div className="flex gap-2 px-2 cursor-pointer">
                {searchInput ? (
                  <GrFormClose size={23} onClick={clearInput} />
                ) : null}
                <RiSearchLine size={23} />
              </div>
            </div>
          </div>
        </div>
        <div className="flex space-x-10 my-8 ">
          <Cards />
          <Cards2 />
        </div>

        <div>
          <Dashbord />
        </div>
      </div>
    </>
  );
}
