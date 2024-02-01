"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useWeb3AuthSigner } from "@/app/context/web3-auth-signer";
import { BiSolidEditAlt } from "react-icons/bi";
import { IoBookmarkOutline } from "react-icons/io5";
import { IoBookmark } from "react-icons/io5";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { GrLink } from "react-icons/gr";
import * as XLSX from "xlsx";
import axios from "axios";

export const datatitle = () => {
  return {
    title: ".gggggsdgsdgdsgsdg..",
    description: "...",
  };
};

const Page = () => {
  const { viewsinglePosts, setopenediter, userinfo } = useWeb3AuthSigner();
  const [isLiked, setIsLiked] = useState(false);
  const [ioBookmark, setIoBookmark] = useState(false);
  const [isDeletePopupVisible, setIsDeletePopupVisible] = useState(false);

  const handleDeleteClick = () => {
    setIsDeletePopupVisible(true);
  };

  const handleDeleteConfirm = () => {
    // Handle deletion logic here
    setIsDeletePopupVisible(false);
  };

  const handleDeleteCancel = () => {
    // Handle cancellation logic here
    setIsDeletePopupVisible(false);
  };

  const handleLikeClick = () => {
    setIsLiked(!isLiked);
  };

  const Bookmark = () => {
    setIoBookmark(!ioBookmark);
  };

  const formatDate = (dateString) => {
    const options = { day: "numeric", month: "short" };
    const formattedDate = new Date(dateString).toLocaleDateString(
      "en-US",
      options
    );
    return formattedDate;
  };

  const calculateTimeDifference = (updatedAt) => {
    const currentDate = new Date();
    const updatedDate = new Date(updatedAt);
    const timeDifference = currentDate.getTime() - updatedDate.getTime();

    // Convert milliseconds to days
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    return daysDifference;
  };

  const updatedata = () => {
    setopenediter(true);
  };

  const downloadReport = async () => {
    console.log("downloadReport----------------------------");
    try {
      await axios
        .get(`https://core.blokcapital.io/userData`)
        .then((res) => {
          console.log("🚀 ~ .then ~ res:", res);
          const responseData = res?.data?.data;
          console.log(
            "🚀 ~ .then ~ responseData===================>",
            responseData
          );

          const formattedData = responseData?.final?.map((data) => ({
            userName: data?.user?.userName,
            wallet: data?.user?.wallet,
            email: data?.user?.email,
            accessCode: data?.user?.accessCode,
            inputToken: data?.inputToken,
            BlokcAmount: data?.BlokcAmount,
            role: data?.user?.role,
            status: data?.user?.status,
            createdAt: new Date(
              data?.user?.createdAt.toString()
            ).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            }),

            updatedAt: new Date(data?.user?.updatedAt).toLocaleDateString(
              "en-US",
              {
                year: "numeric",
                month: "short",
                day: "numeric",
              }
            ),
          }));

          const workSheet = XLSX.utils.json_to_sheet(formattedData);
          const workBook = XLSX.utils.book_new();
          XLSX.utils.book_append_sheet(workBook, workSheet, "users");
          //Buffer
          let buf = XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });
          //Binary string
          XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
          //Download
          XLSX.writeFile(workBook, "blokc.xlsx");
          setLoading1(false);
        })
        .catch((res) => {
          toast.error(res.data.message);
        });
    } catch (error) {}
  };
  return (
    <>
      <div className="border-t-4 border-amber-600 rounded-t-xl w-full text-white">
        <div className="bg-gray-800 bg-opacity-90 rounded-t-xl overflow-x-auto ">
          {viewsinglePosts ? (
            viewsinglePosts.map((post) => (
              <div
                key={post._id}
                className="md:p-8 p-3 text-white space-y-3 border-b border-gray-600"
              >
                <div className="border-b py-2 font-bold ">
                  <h2>{post.title}</h2>
                </div>
                <div
                  className="flex space-x-5 justify-start"
                  onClick={() => downloadReport()}
                >
                  <div>
                    {post.images && (
                      <Image
                        src={post.images}
                        alt="Image"
                        height={60}
                        width={60}
                        className="rounded-full "
                      />
                    )}
                  </div>
                  <div className="w-4/5">
                    <div className="flex justify-between items-center">
                      <div>
                        {post.userData && post.userData.length > 0 && (
                          <p className="text-lg font-semibold ">
                            {post.userData[0].email}
                          </p>
                        )}
                      </div>
                      <div className="flex gap-3 justify-center text-center">
                        <div
                          className="cursor-pointer"
                          onClick={() => updatedata()}
                        >
                          <BiSolidEditAlt size={22} />
                        </div>
                        <div>
                          <p>{calculateTimeDifference(post.updatedAt)}d</p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-5">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: post.content,
                        }}
                      />
                      <div className="flex justify-end items-center text-2xl space-x-5">
                        <div className="cursor-pointer">
                          <button onClick={handleLikeClick}>
                            {isLiked ? "❤️" : "🤍"}
                          </button>
                        </div>
                        <div
                          className="cursor-pointer"
                          onClick={() => Bookmark()}
                        >
                          {ioBookmark ? (
                            <div className="text-blue-600">
                              <IoBookmark />
                            </div>
                          ) : (
                            <div>
                              <IoBookmarkOutline />
                            </div>
                          )}
                        </div>
                        <div
                          className="text-red-500 cursor-pointer"
                          onClick={() => handleDeleteClick()}
                        >
                          <RiDeleteBin6Fill />
                        </div>
                        <div className="cursor-pointer">
                          <GrLink />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-center">
                    <p> {formatDate(post.createdAt)} </p>
                    <p className="text-xs">days ago</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>Something Missing</p>
          )}
        </div>
        {isDeletePopupVisible && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[99]">
            <div className="bg-slate-700  p-8 rounded z-[999]">
              <p className="mb-4">Are you sure you want to delete?</p>
              <div className="flex justify-center">
                <button
                  onClick={handleDeleteConfirm}
                  className="bg-red-500 text-white px-4 py-2 rounded mr-2"
                >
                  Yes
                </button>
                <button
                  onClick={handleDeleteCancel}
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                >
                  No
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Page;
