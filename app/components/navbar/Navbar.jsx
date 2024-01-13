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
      <div className="container mx-auto  sm:px-6 lg:px-8 flex justify-between items-center">
        <div className="flex justify-center items-center space-x-3">
          <Link href="/">
            <Image src={logo} height={58} alt="Picture of the author " />
          </Link>
        </div>

        <div className="flex justify-center items-center space-x-4">
          <div className="relative">
            <button className="text-white bg-slate-400 bg-opacity-20 px-2 py-1 rounded-xl flex justify-center items-center gap-2">
              <input
                type="text"
                placeholder="Search..."
                className="w-full md:px-2 px-1 py-1 bg-transparent outline-none"
              />
              <div className="md:pr-1.5">
                <RiSearchLine size={20} />
              </div>
            </button>
          </div>

          <div
            className="relative lg:hidden"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <HiMenu size={20} />
            {isHovered && (
              <div className="absolute top-full md:left-0 right-0 mt-1 p-5 bg-slate-700 bg-opacity-55 rounded-md shadow-md transition-all duration-300 z-10">
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
            )}
          </div>

          {/* Search Bar Icon */}

          {/* Login Button */}
          <button className="hidden lg:flex justify-center items-center space-x-3 text-white cursor-pointer bg-gray-200 bg-opacity-20 rounded-3xl px-8 py-3">
            <PiUserBold size={20} />
            <p> LOGIN </p>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
