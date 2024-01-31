/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import React, { useEffect, useState } from "react";
import { GoSidebarExpand } from "react-icons/go";
import Image from "next/image";
import { useWeb3AuthSigner } from "@/app/context/web3-auth-signer";
import clipboardCopy from "clipboard-copy";
import DashboardHeader from "../../components/myposts/Buttonspage";
import { MdDone } from "react-icons/md";
import { BsCopy } from "react-icons/bs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const page = () => {
  const { accountAddress, userinfo, registerUser } = useWeb3AuthSigner();
  const [profiledetails, setProfiledetails] = useState(false);
  const [copy, setcopy] = useState(false);

  const imageSize = profiledetails ? 120 : 60;
  const storedData = sessionStorage.getItem("UserData");
  const storedData1 = storedData ? JSON.parse(storedData) : null;
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
    <div className="text-white bg-gray-500 bg-opacity-20 rounded-t-3xl w-full h-screen  border-t-4 border-[#84AD69]">
      <div className="p-5">
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
            </div>
          </div>
          <div>
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
          </div>
        </div>
        {profiledetails && (
          <>
            <div className="border-spacing-1 border-t border-b border-slate-300 border-opacity-25 ">
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
                    {/*<ToastContainer />*/}
                  </div>
                </div>
                <div className="flex gap-1">
                  <p className=" font-semibold">Joined:</p>
                  <p className="font-light">
                    {formatDate(storedData1.createdAt)}
                  </p>
                </div>
                <div className="flex gap-1">
                  <p className=" font-semibold">Role:</p>
                  <p className="font-light">{storedData1.role}</p>
                </div>
              </div>
            </div>
          </>
        )}
        <div>
          <div>
            <DashboardHeader />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
