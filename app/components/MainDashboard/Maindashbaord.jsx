"use client";
import { useEffect, useState } from "react";
import { RiSearchLine } from "react-icons/ri";
import { GrFormClose } from "react-icons/gr";
import Announcements from "../Announcements/Announcements";
import Started from "../Started/Started";
import Optioncatagery from "../Optioncatagery/optioncatagery";
import Link from "next/link";
import Searchall from "../Search/Search";
//import Contract from "../Contract/frist/Contract";
const Maindashbaord = () => {
  const [selectedCategory, setSelectedCategory] = useState(0);

  return (
    <div className=" mx-auto md:mt-0 mt-10">
      <div className="bg-gradient-to-r from-indigo-500 via-black to-pink-500 rounded-xl mb-5 text-white">
        <div className="py-14 flex flex-col justify-center items-center space-y-8">
          <div className="flex flex-col justify-center items-center space-y-3">
            <h1 className="text-3xl font-extrabold text-center">
              Welcome to BLOK Capital Community
            </h1>
            <p className="text-center">
              We are happy to have you here 💖 If you need help, please search
              before posting a new topic.
            </p>
          </div>
          <div className="flex justify-center items-center w-full px-2">
            <Searchall />
          </div>
        </div>
      </div>
      {/*<div>
        <Contract />
      </div>*/}

      <div
        className={`md:gap-5 my-8  ${
          selectedCategory === 0
            ? "lg:flex lg:space-y-0 space-y-5   "
            : "hidden"
        }`}
      >
        <Started />
        <Announcements />
      </div>

      <div>
        <Optioncatagery
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </div>
    </div>
  );
};

export default Maindashbaord;
