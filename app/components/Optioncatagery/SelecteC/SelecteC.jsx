"use client";
import React, { useEffect, useState } from "react";
import { RiArrowDownSLine } from "react-icons/ri";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useWeb3AuthSigner } from "../../../context/web3-auth-signer";

const CustomSelect = () => {
  const pathname = usePathname();
  //console.log("🚀 ~ CustomSelect ~ pathname:", pathname);
  const [isOpen, setIsOpen] = useState(false);

  //console.log("🚀 ~ CustomSelect ~ selectedOption:", selectedOption);
  const { selectedOption, setSelectedOption, optionsdata } =
    useWeb3AuthSigner();

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    //console.log("Selected category:", option);
  };

  useEffect(() => {
    switch (pathname) {
      case "/wallet-features":
        setSelectedOption({ name: "Wallet-Features", color: "bg-[#0c63e7]" });
        break;
      case "/metaverse":
        setSelectedOption({ name: "Metaverse", color: "bg-[#d704b2]" });
        break;
      case "/gardens":
        setSelectedOption({ name: "Gardens", color: "bg-[#7bd909]" });
        break;
      case "/gardeners":
        setSelectedOption({ name: "Gardeners", color: "bg-[#228B22]" });
        break;
      case "/proposals":
        setSelectedOption({ name: "Proposals", color: "bg-[#ffbc0a]" });
        break;
      case "/governance":
        setSelectedOption({ name: "Governance", color: "bg-[#0affc2]" });
        break;

      case "/announcement":
        setSelectedOption({
          name: "Announcement",
          color: "bg-[#ff7d00]",
        });
        break;
      default:
        setSelectedOption({
          name: "Select Category",
        });
        break;
    }
  }, [pathname]);

  return (
    <div className="custom-select-container">
      <div className="flex gap-2 justify-center items-center">
        <div
          className="custom-select cursor-pointer flex gap-2 justify-center items-center"
          onClick={() => setIsOpen(!isOpen)}
        >
          {selectedOption.color ? (
            <span className={`p-1.5 ${selectedOption.color}`}></span>
          ) : null}

          <p>{selectedOption.name || "Select Categories"}</p>
        </div>
        <div className={`${isOpen ? "" : "-rotate-90"}`}>
          <RiArrowDownSLine />
        </div>
      </div>
      {isOpen && (
        <div className="options-container absolute bg-gray-800 p-2 space-y-2 w-44  cursor-pointer shadow-md shadow-slate-700 ">
          {optionsdata.map((option, index) => (
            <Link href={`/${option.link}`} key={index}>
              <div
                className="option hover:bg-slate-300 hover:bg-opacity-10 flex gap-2 justify-start items-center px-2 py-1 "
                onClick={() => handleOptionSelect(option)}
              >
                <span className={`p-1.5 ${option.color}`}></span>
                {option.name}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
