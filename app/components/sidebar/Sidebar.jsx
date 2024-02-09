"use client";
import React, { useState } from "react";
import { SiDatabricks } from "react-icons/si";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import { MdKeyboardArrowDown } from "react-icons/md";
import { TfiMenuAlt } from "react-icons/tfi";
import { ImPriceTag } from "react-icons/im";
import { PiInfoDuotone } from "react-icons/pi";
import { PiQuestionDuotone } from "react-icons/pi";
import { LuBadge } from "react-icons/lu";
import { AiFillSetting } from "react-icons/ai";
import { CiKeyboard } from "react-icons/ci";
import { BsPersonWorkspace } from "react-icons/bs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useWeb3AuthSigner } from "@/app/context/web3-auth-signer";

const Sidebar = () => {
  const pathname = usePathname();
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(true);
  const [istagOpen, setIstagOpen] = useState(false);
  const [openmore, setOpenmore] = useState(false);
  const { newpremises, coreKitStatus } = useWeb3AuthSigner();
  const [istoken, setIstoken] = useState();
  //console.log("newpremises--->", newpremises);

  const tagData = [
    { icon: <PiInfoDuotone size={22} />, name: "About" },
    { icon: <PiQuestionDuotone size={22} />, name: "FAQ" },
    { icon: <LuBadge size={22} />, name: "Badges" },
  ];
  const colorData = [
    { name: "Box 1", color: "red" },
    { name: "Box 2", color: "blue" },
    { name: "Box 3", color: "green" },
    { name: "Box 4", color: "yellow" },
    { name: "Box 5", color: "purple" },
  ];

  const toggleCategories = () => {
    setIsCategoriesOpen(!isCategoriesOpen);
  };

  const toggleTags = () => {
    setIstagOpen(!istagOpen);
  };

  const toggleMorepopup = () => {
    setOpenmore(!openmore);
  };

  return (
    <div
      className={`bg-gray-500 bg-opacity-20 rounded-3xl text-white border-t-4  border-t-[#3e4cc9] h-[82vh] md:block hidden`}
    >
      <div className="py-5 space-y-2">
        <Link href="/">
          <div
            className={`hover:bg-slate-500 hover:bg-opacity-20 text-base cursor-pointer  ${
              pathname === "/" ? "bg-slate-500  bg-opacity-20" : ""
            }`}
          >
            <div className="flex items-center space-x-2 mx-5 py-1">
              <SiDatabricks />
              <p>All Topics</p>
            </div>
          </div>
        </Link>
        <div>
          {newpremises ? (
            <Link href="/my-posts">
              <div
                className={`hover:bg-slate-500 hover:bg-opacity-20 text-base cursor-pointer ${
                  pathname === "/my-posts" ? "bg-slate-500  bg-opacity-20" : ""
                }`}
              >
                <div className="flex items-center space-x-2 mx-5 py-1">
                  <BsPersonWorkspace />
                  <p>My Posts</p>
                </div>
              </div>
            </Link>
          ) : null}
        </div>
        <div className="">
          <div
            className={`hover:bg-slate-500 hover:bg-opacity-20 hover:rounded text-base cursor-pointer ${
              istagOpen ? "active" : ""
            }`}
            onClick={() => toggleTags()}
          >
            <div className="flex items-center space-x-2 mx-5 py-1">
              <PiDotsThreeOutlineVerticalFill />
              <p>More</p>
            </div>
          </div>
          {istagOpen && (
            <div className="absolute bg-slate-800 mt-2   rounded-lg  w-72">
              {tagData.map((tag, index) => (
                <div
                  key={index}
                  className={`px-5 py-1  cursor-pointer hover:bg-slate-500 hover:bg-opacity-20 hover:rounded ${
                    istagOpen ? "active" : ""
                  }`}
                  onClick={() => toggleTags()}
                >
                  <div className="flex items-center gap-2 text-xl py-2">
                    {tag.icon} {tag.name}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="space-y-2">
        <div className="">
          <div
            className={`hover:bg-slate-500 hover:bg-opacity-20 hover:rounded text-base cursor-pointer ${
              isCategoriesOpen ? "active" : ""
            }`}
            onClick={() => toggleCategories()}
          >
            <div className="flex items-center space-x-2 mx-5 py-1">
              <div className={`${isCategoriesOpen ? "" : "-rotate-90"}`}>
                <MdKeyboardArrowDown size={20} />
              </div>
              <p>Categories</p>
            </div>
          </div>
          <div className={`mx-5 py-1 ${isCategoriesOpen ? "block" : "hidden"}`}>
            <div>
              {colorData.map((box, index) => (
                <div
                  key={index}
                  className={`flex gap-2 items-center hover:bg-slate-500 hover:bg-opacity-20 hover:rounded cursor-pointer ${
                    isCategoriesOpen ? "active" : ""
                  }`}
                >
                  <p
                    className="w-1"
                    style={{
                      backgroundColor: box.color,
                      padding: "6px",
                      margin: "10px",
                      color: "white",
                    }}
                  ></p>
                  {box.name}
                </div>
              ))}
            </div>
            <div
              className={`py-1 px-2 flex items-center space-x-2 hover:bg-slate-500 hover:bg-opacity-20 hover:rounded cursor-pointer ${
                isCategoriesOpen ? "active" : ""
              }`}
            >
              <TfiMenuAlt />
              <p>All categories</p>
            </div>
          </div>
        </div>
        <div className="">
          <div
            className="  hover:bg-slate-500 hover:bg-opacity-20 hover:rounded text-base cursor-pointer"
            onClick={() => toggleMorepopup()}
          >
            <div className="flex items-center space-x-2 mx-5 py-1 ">
              <MdKeyboardArrowDown
                size={20}
                className={`${openmore ? "" : "-rotate-90"}`}
              />
              <p>Tags</p>
            </div>
          </div>
          <div className={`mx-5 py-1 ${openmore ? "block" : "hidden"}`}>
            <div className=" hover:bg-slate-500  text-base hover:bg-opacity-20 hover:rounded cursor-pointer">
              <div className="flex items-center space-x-2 mx-2 py-1  ">
                <ImPriceTag />
                <p>Authentication </p>
              </div>
            </div>
            <div className=" hover:bg-slate-500  text-base hover:bg-opacity-20 hover:rounded cursor-pointer">
              <div className="flex items-center space-x-2 mx-2 py-1  ">
                <TfiMenuAlt />
                <p>All tags </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="fixed bottom-3 right-0 flex gap-3 px-5 py-1">
        <AiFillSetting size={23} className="cursor-pointer hover:rotate-90" />
        <CiKeyboard size={23} className="cursor-pointer" />
      </div>
    </div>
  );
};

export default Sidebar;
