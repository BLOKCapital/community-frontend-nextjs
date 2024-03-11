"use client";
import React, { useState } from "react";
import { SiDatabricks } from "react-icons/si";
import {
  PiDotsThreeOutlineVerticalFill,
  PiInfoDuotone,
  PiQuestionDuotone,
} from "react-icons/pi";
import { MdKeyboardArrowDown } from "react-icons/md";
import { TfiMenuAlt } from "react-icons/tfi";
import { ImPriceTag } from "react-icons/im";
import { AiFillSetting } from "react-icons/ai";
import { CiKeyboard } from "react-icons/ci";
import { BsPersonWorkspace } from "react-icons/bs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useWeb3AuthSigner } from "../../context/web3-auth-signer";
import { LuBadge } from "react-icons/lu";

const Sidebar = () => {
  const pathname = usePathname();
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(true);
  const [istagOpen, setIstagOpen] = useState(false);
  const [openmore, setOpenmore] = useState(false);
  const { Token, accountAddress, isSidebar, setIsSidebar } =
    useWeb3AuthSigner();

  const tagData = [
    { icon: <PiInfoDuotone size={22} />, name: "About" },
    { icon: <PiQuestionDuotone size={22} />, name: "FAQ" },
    { icon: <LuBadge size={22} />, name: "Badges" },
  ];
  const colorData = [
    { name: "Wallet Features", color: "#0c63e7", link: "wallet-features" },
    { name: "Metaverse", color: "#d704b2", link: "metaverse" },
    { name: "Gardens", color: "#7bd909", link: "gardens" },
    { name: "Gardeners", color: "#228B22", link: "gardeners" },
    { name: "Proposals", color: "#ffbc0a", link: "proposals" },
    { name: "Governance", color: "#0affc2", link: "governance" },
    { name: "Announcement", color: "#ff7d00", link: "announcement" },
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

  const toggleSidebar = () => {
    setIsSidebar(!isSidebar);
  };

  const formatTitle = (title) => {
    // Your implementation here
    return title.toLowerCase().replace(/\s+/g, "-");
  };

  return (
    <div
      className={`md:w-64 lg:bg-gray-500 lg:bg-opacity-20 bg-black fixed transition-transform ease-in-out duration-700  lg:rounded-3xl text-white lg:border-t-4  lg:border-t-[#3e4cc9] lg:h-[82vh] h-screen lg:z-0 z-[999] ${
        isSidebar ? "translate-x-0" : "lg:translate-x-0 -translate-x-full "
      }
      `}
    >
      <div className="py-5 space-y-2">
        <div className="flex items-center space-x-2 mx-5 py-1">
          <SiDatabricks />
          <p>All Topics</p>
        </div>

        <div>
          {accountAddress && (
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
                <div key={index} className="space-y-2">
                  <Link href={`/${formatTitle(box.name)}`}>
                    <div
                      className={`flex items-center hover:bg-slate-500 hover:bg-opacity-20 hover:rounded cursor-pointer  ${
                        pathname === `/${box.link}`
                          ? "bg-slate-500  bg-opacity-20"
                          : ""
                      }`}
                      onClick={() => toggleSidebar()}
                    >
                      <p
                        className="w-1"
                        style={{
                          backgroundColor: box.color,
                          padding: "6px 3px",
                          margin: "10px",
                          color: "white",
                        }}
                      ></p>
                      {box.name}
                    </div>
                  </Link>
                </div>
              ))}
            </div>
            <Link href="/">
              <div
                className={`py-1 px-2 flex items-center space-x-2 hover:bg-slate-500 hover:rounded hover:bg-opacity-20 text-base cursor-pointer  ${
                  pathname === "/" ? "bg-slate-500  bg-opacity-20 rounded" : ""
                }`}
                onClick={() => toggleSidebar()}
              >
                <TfiMenuAlt />
                <p>All categories</p>
              </div>
            </Link>
          </div>
        </div>
        <div className="">
          <div
            className="hover:bg-slate-500 hover:bg-opacity-20 hover:rounded text-base cursor-pointer"
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
            <div
              className="hover:bg-slate-500 text-base hover:bg-opacity-20 hover:rounded cursor-pointer"
              onClick={() => toggleSidebar()}
            >
              <div className="flex items-center space-x-2 mx-2 py-1  ">
                <ImPriceTag />
                <p>Authentication </p>
              </div>
            </div>
            <div
              className="hover:bg-slate-500 text-base hover:bg-opacity-20 hover:rounded cursor-pointer"
              onClick={() => toggleSidebar()}
            >
              <div className="flex items-center space-x-2 mx-2 py-1  ">
                <TfiMenuAlt />
                <p>All tags </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="space-y-1">
        <div
          className={`hover:bg-slate-500 hover:bg-opacity-20 text-base cursor-pointer ${
            pathname === "/about" ? "bg-slate-500  bg-opacity-20" : ""
          }`}
          onClick={() => toggleSidebar()}
        >
          <div className="flex items-center space-x-2 mx-5 py-1">
            <PiInfoDuotone size={20} />
            <p>About</p>
          </div>
        </div>
        <div
          className={`hover:bg-slate-500 hover:bg-opacity-20 text-base cursor-pointer ${
            pathname === "/faq" ? "bg-slate-500  bg-opacity-20" : ""
          }`}
          onClick={() => toggleSidebar()}
        >
          <div className="flex items-center space-x-2 mx-5 py-1">
            <PiQuestionDuotone size={20} />
            <p>FAQ</p>
          </div>
        </div>
        <div
          className={`hover:bg-slate-500 hover:bg-opacity-20 text-base cursor-pointer ${
            pathname === "/badges" ? "bg-slate-500  bg-opacity-20" : ""
          }`}
          onClick={() => toggleSidebar()}
        >
          <div className="flex items-center space-x-2 mx-5 py-1">
            <LuBadge size={20} />
            <p>Badges</p>
          </div>
        </div>
      </div>

      <div
        className="fixed bottom-3 right-0 flex gap-3 px-5 py-1"
        onClick={toggleSidebar}
      >
        <AiFillSetting
          size={23}
          className={`cursor-pointer ${isSidebar ? "hover:rotate-90" : ""}`}
        />
        <CiKeyboard size={23} className="cursor-pointer" />
      </div>
    </div>
  );
};

export default Sidebar;
