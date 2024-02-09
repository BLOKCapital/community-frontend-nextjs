"use client";
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from "react";
//import { GoSidebarExpand } from "react-icons/go";
import Image from "next/image";
import { useWeb3AuthSigner } from "@/app/context/web3-auth-signer";
import clipboardCopy from "clipboard-copy";
import DashboardHeader from "../../components/myposts/Buttonspage";
import { MdDone } from "react-icons/md";
import { BsCopy } from "react-icons/bs";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Mypost = () => {
  const { accountAddress, userinfo, registerUser } = useWeb3AuthSigner();
  const [profiledetails, setProfiledetails] = useState(false);
  const [copy, setcopy] = useState(false);

  const imageSize = profiledetails ? 120 : 60;
  const storedData =
    typeof window !== "undefined" ? localStorage.getItem("UserData") : null;
  const storedData1 = storedData ? JSON.parse(storedData) : null;
  //const storedData = localStorage.getItem("UserData");
  //const storedData1 = storedData ? JSON.parse(storedData) : null;
  //console.log("storedData-->", storedData);

  const opendetails = () => {
    setProfiledetails(!profiledetails);
  };

  const formatDate = (dateString) => {
    const options = { day: "numeric", month: "short", year: "numeric" };
    const formattedDate = new Date(dateString).toLocaleDateString(
      "en-US",
      options
    );
    return formattedDate;
  };

  const notify = () => {
    if (accountAddress) {
      void clipboardCopy(accountAddress);
      toast.success("Address Copied!");
      setcopy(true);
      setTimeout(() => {
        setcopy(false);
      }, 100);
    }
  };

  return (
    <div className="text-white bg-gray-500 bg-opacity-20  rounded-t-3xl w-full h-screen  border-t-4 border-[#84AD69]">
      <div className="p-5">
        {userinfo ? (
          <div className="flex justify-between items-center py-3">
            <div className="flex items-center space-x-3">
              <div>
                {" "}
                {userinfo?.profileImage && (
                  <Image
                    src={userinfo?.profileImage}
                    width={imageSize}
                    height={imageSize}
                    alt="ProfileImage"
                    className="rounded-full"
                  />
                )}
              </div>
              <div className="flex flex-col space-y-1">
                <p
                  className={`text-xl font-bold ${
                    profiledetails ? "text-3xl" : ""
                  }`}
                >
                  {userinfo?.name}
                </p>
                <p className={` ${profiledetails ? "text-xl" : ""}`}>
                  {userinfo?.email}
                </p>
                <div className="flex gap-1">
                  <p className=" font-semibold">AA wallet:</p>
                  <div className="flex gap-2">
                    <p className="font-light">{accountAddress}</p>
                    <div>
                      <button onClick={notify} className="">
                        {copy ? <MdDone size={15} /> : <BsCopy size={15} />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="flex gap-1">
                <p className=" font-semibold">Joined:</p>
                <p className="font-light">
                  {storedData1 ? formatDate(storedData1.createdAt) : null}
                </p>
              </div>
              <div className="flex gap-1">
                <p className=" font-semibold">Role:</p>
                <p className="font-light">
                  {storedData1 ? storedData1.role : null}
                </p>
              </div>
            </div>
            {/*<div>
            <button
              className="flex gap-2 items-center bg-gray-800 bg-opacity-25 border border-slate-500 px-5 py-2 rounded-xl "
              onClick={opendetails}
            >
              <GoSidebarExpand
                size={20}
                className={`${profiledetails ? "rotate-90" : "-rotate-90"}`}
              />
              {profiledetails ? "Close" : "Open"}
            </button>
          </div>*/}
          </div>
        ) : (
          <div className=" shadow rounded-md p-4  w-full mx-auto animate-pulse">
            <div className="flex space-x-4">
              <div className="rounded-full bg-slate-700 h-10 w-10"></div>
              <div className="flex-1 space-y-6 py-1">
                <div className="h-2 bg-slate-700 rounded"></div>
                <div className="space-y-3">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="h-2 bg-slate-700 rounded col-span-2"></div>
                    <div className="h-2 bg-slate-700 rounded col-span-1"></div>
                  </div>
                  <div className="h-2 bg-slate-700 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/*<div className="border-spacing-1 border-b border-slate-300 border-opacity-25 ">
          <div className="flex space-x-2 items-center py-1">
            <div className="flex gap-2">
              <div className="flex gap-1">
                <p className=" font-semibold">AA wallet:</p>
                <p className="font-light">{storedData1.wallet}</p>
              </div>
              <div>
                <button onClick={notify} className="">
                  {copy ? <MdDone size={15} /> : <BsCopy size={15} />}
                </button>
              </div>
            </div>
            <div className="flex gap-1">
              <p className=" font-semibold">Joined:</p>
              <p className="font-light">{formatDate(storedData1.createdAt)}</p>
            </div>
            <div className="flex gap-1">
              <p className=" font-semibold">Role:</p>
              <p className="font-light">{storedData1.role}</p>
            </div>
          </div>
        </div>*/}

        <div className="border-t border-slate-400">
          <div>
            <DashboardHeader />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mypost;
