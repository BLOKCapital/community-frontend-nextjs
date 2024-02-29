"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useWeb3AuthSigner } from "../../context/web3-auth-signer";
import clipboardCopy from "clipboard-copy";
import DashboardHeader from "../../components/myposts/Buttonspage";
import { MdDone } from "react-icons/md";
import { BsCopy } from "react-icons/bs";
import toast, { Toaster } from "react-hot-toast";

const Mypost = () => {
  const { accountAddress, userinfo, registerUser } = useWeb3AuthSigner();
  const [copy, setCopy] = useState(false);
  const [storedData, setStoredData] = useState("");

  const formatDate = (dateString) => {
    const options = { day: "numeric", month: "short", year: "numeric" };
    const formattedDate = new Date(dateString).toLocaleDateString(
      "en-US",
      options
    );
    return formattedDate;
  };

  useState(() => {
    const storedDatas =
      typeof window !== "undefined" ? localStorage.getItem("UserData") : null;
    const storedData1 = storedDatas ? JSON.parse(storedDatas) : null;
    //console.log(storedData1);
    setStoredData(storedData1);
  });
  const notify = () => {
    if (accountAddress) {
      void clipboardCopy(accountAddress);
      toast.success("Address Copied!");
      setCopy(true);
      setTimeout(() => {
        setCopy(false);
      }, 100);
    }
  };

  return (
    <div className="bg-gray-500 bg-opacity-20 rounded-t-3xl w-full min-h-screen border-t-4 border-[#84AD69] text-white">
      <div className="p-5">
        {userinfo ? (
          <div className="md:flex justify-between items-center py-3">
            <div className="flex items-center space-x-3">
              <div>
                {userinfo?.profileImage && (
                  <Image
                    src={userinfo?.profileImage}
                    width={80}
                    height={80}
                    alt="ProfileImage"
                    className="rounded-full"
                  />
                )}
              </div>
              <div className="flex flex-col space-y-1">
                <p className={`text-xl font-bold `}>{userinfo?.name}</p>
                <p className={``}>{userinfo?.email}</p>
                <div className="flex gap-1 items-center">
                  <p className="font-semibold">AA wallet:</p>
                  <p className="lg:block hidden font-light ">
                    {accountAddress}
                  </p>
                  <p className="font-light lg:hidden block">
                    {accountAddress
                      ? accountAddress.slice(0, 5) +
                        "...." +
                        accountAddress.slice(-5)
                      : null}
                  </p>
                  <button onClick={notify} className="focus:outline-none">
                    {copy ? <MdDone size={15} /> : <BsCopy size={15} />}
                  </button>
                </div>
              </div>
            </div>
            <div>
              <div className="flex gap-1">
                <p className="font-semibold">Joined:</p>
                <p className="font-light">
                  {storedData?.createdAt
                    ? formatDate(storedData?.createdAt)
                    : null}
                </p>
              </div>
              <div className="flex gap-1">
                <p className="font-semibold">Role:</p>
                <p className="font-light">{storedData?.role}</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="shadow rounded-md p-4 w-full mx-auto animate-pulse">
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
