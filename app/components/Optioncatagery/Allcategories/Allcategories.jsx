"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import CustomSelect from "../SelecteC/SelecteC";
import { useWeb3AuthSigner } from "../../../context/web3-auth-signer";
import { FaCirclePlus } from "react-icons/fa6";
const Allcategories = () => {
  const pathname = usePathname();
  const [itemColor, setItemColor] = useState("");
  const {
    accountAddress,
    setopenediter,
    Categoriesdata,
    optionsdata,
    setShowcontent,
    viewSinglePost,
    Announcementdata,
  } = useWeb3AuthSigner();
  //console.log("🚀 ~ Allcategories ~ Categoriesdata:", Categoriesdata);

  useEffect(() => {
    const itemColor = optionsdata.find(
      (option) => pathname === `/${option.link}`
    )?.border;

    setItemColor(itemColor);
  }, [optionsdata, pathname]);

  const Data = pathname === "/announcement" ? Announcementdata : Categoriesdata;

  const formatDate = (dateString) => {
    const options = { day: "numeric", month: "short" };
    const formattedDate = new Date(dateString).toLocaleDateString(
      "en-US",
      options
    );
    return formattedDate;
  };

  const formatTitle = (title) => {
    // Your implementation here
    return title.toLowerCase().replace(/\s+/g, "-");
  };

  const Opencontent = (e) => {
    setShowcontent(e);
    viewSinglePost(e);
    localStorage.setItem("_id", e);
  };

  return (
    <div
      className={`border-t-4 mt-10 ${
        itemColor ? itemColor : "border-[#0c63e7]"
      }  rounded-xl   w-full`}
    >
      <div className="bg-slate-800 bg-opacity-90 rounded-xl">
        <div className="md:p-6 p-3 text-white space-y-3">
          <div className="space-y-5">
            <div className="md:p-5 p-3 text-white space-y-3 ">
              <div className="flex justify-between items-center">
                <div>Top</div>
                <div className="flex gap-2 justify-center items-center">
                  <div>
                    <CustomSelect />
                  </div>
                  <div>
                    {accountAddress ? (
                      <>
                        <div className="flex justify-center items-center gap-2">
                          <button
                            className="flex items-center md:gap-2 gap-1 bg-gray-200 bg-opacity-20 rounded-lg md:px-3 px-1 md:py-1 py-1 md:text-base text-sm"
                            onClick={() => setopenediter(true)}
                          >
                            <FaCirclePlus />
                            <p className="uppercase">New Premises</p>
                          </button>
                        </div>
                      </>
                    ) : null}
                  </div>
                </div>
              </div>
              <div className=" space-y-5">
                <div className="flex justify-between text-base cursor-pointer text-gray-400 py-3 border-b-2 border-zinc-500 border-opacity-45 ">
                  <div>
                    <p className="">Topic</p>
                  </div>
                  <div className="flex  ">
                    <div className="hover:bg-slate-400 hover:bg-opacity-45 hover:text-white px-3 py-1 rounded-md">
                      Like
                    </div>
                    <div className="hover:bg-slate-400 hover:bg-opacity-45 hover:text-white px-3 py-1 rounded-md">
                      Comment
                    </div>
                    {/*<div className="hover:bg-slate-400 hover:bg-opacity-45 hover:text-white px-3 py-1 rounded-md">
                      Vote
                    </div>*/}
                    <div className="hover:bg-slate-400 hover:bg-opacity-45 hover:text-white px-3 py-1 rounded-md">
                      Active
                    </div>
                  </div>
                </div>
                {Data?.length > 0 ? (
                  Data?.map((item, index) => (
                    <div key={index} className="cursor-pointer ">
                      <div className="flex justify-between text-base">
                        <Link href={`/${formatTitle(item?.title)}`}>
                          <div
                            className="font-semibold"
                            onClick={() => Opencontent(item?._id)}
                          >
                            <p>{item.title}</p>
                          </div>
                        </Link>
                        <div className="flex justify-center  font-light">
                          <div className="px-3 py-1 md:w-16">
                            {item.likeCount}
                          </div>
                          <div className="px-3 py-1 md:w-16">
                            {item.commentCount}
                          </div>

                          <div className="px-3 py-1 ">
                            {formatDate(item?.createdAt)}
                          </div>
                          {/*<div className="px-3 py-1 md:w-16"> {item.date}</div>*/}
                        </div>
                      </div>
                      <div className="flex gap-2 items-center text-sm font-light ">
                        {optionsdata?.find(
                          (option) => option?.name === item?.subject
                        ) && (
                          <span
                            className={`p-1.5 rounded-full ${
                              optionsdata?.find(
                                (option) => option?.name === item?.subject
                              )?.color
                            }`}
                          ></span>
                        )}
                        <p>{item?.subject}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>{`No post created!!`}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Allcategories;
