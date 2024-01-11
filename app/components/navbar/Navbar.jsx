"use client";
import { useState } from "react";
import { RiSearchLine } from "react-icons/ri";
import { HiMenu } from "react-icons/hi";
import { PiUserBold } from "react-icons/pi";
import Image from "next/image";
import { BsGrid } from "react-icons/bs";
import logo from "../../../assets/images/Mainlogo.svg";
import Link from "next/link";

const Navbar = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <nav className="bg-black p-5">
      <div className="container mx-auto px-20 flex justify-between items-center">
        <div className="flex justify-center items-center space-x-3">
          <Link href="/">
            <Image src={logo} alt="Picture of the author" />
          </Link>
        </div>

        <div className="flex justify-center items-center  space-x-4">
          <div className="relative ">
            <button className="text-white bg-slate-400 bg-opacity-20 px-2 py-1 rounded-xl flex justify-center items-center bg gap-2">
              {/* Add your search icon (e.g., a magnifying glass) */}

              <input
                type="text"
                placeholder="Search..."
                className="w-full px-2 py-1 bg-transparent  outline-none"
              />
              <div className="pr-1.5">
                <RiSearchLine size={23} />
              </div>
            </button>
          </div>

          <div
            className="relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div
              className={`bg-gray-200 bg-opacity-20 px-3 py-3 rounded-full cursor-pointer ${
                isHovered ? "hovered" : ""
              }`}
            >
              <BsGrid size={20} />
            </div>
            {isHovered && (
              <>
                {/* Items to be displayed on hover */}
                <div
                  className={`absolute w-36  top-full left-0 transform 
                   -translate-x-1/2 mt-1 p-5 bg-slate-700 bg-opacity-55 rounded-md shadow-md transition-all duration-300 z-10 ${
                     isHovered ? "hovered" : ""
                   }`}
                >
                  {/* Your three items go here */}
                  <ul className="space-y-2">
                    <li>
                      <a
                        href="https://blokcapital.io"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-gray-300"
                      >
                        Website
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://docsend.com/view/qqzdvsv2q47g6t9y"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-gray-300"
                      >
                        Whitepaper
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://prototype.blokcapital.io"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-gray-300"
                      >
                        Prototype
                      </a>
                    </li>
                  </ul>
                </div>
              </>
            )}
          </div>

          {/* Search Bar Icon */}

          {/* Login Button */}
          <button className="flex justify-center items-center space-x-3 text-white cursor-pointer bg-gray-200 bg-opacity-20 rounded-3xl px-8 py-3  ">
            <PiUserBold size={20} />
            <p> LOGIN </p>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
