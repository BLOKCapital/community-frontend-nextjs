"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useWeb3AuthSigner } from "@/app/context/web3-auth-signer";
import { BiSolidEditAlt } from "react-icons/bi";
import { IoBookmarkOutline } from "react-icons/io5";
import { IoBookmark } from "react-icons/io5";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { GrLink } from "react-icons/gr";
import axiosInstanceAuth from "../../../components/apiInstances/axiosInstanceAuth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
//import { useRouter } from "next/router";
//import * as XLSX from "xlsx";
//import axios from "axios";
export const datatitle = () => {
  return {
    title: ".gggggsdgsdgdsgsdg..",
    description: "...",
  };
};

const Page = () => {
  const router = useRouter();
  const {
    viewsinglePosts,
    setopenediter,
    userinfo,
    viewPostByUsers,
    sendApiRequest,
  } = useWeb3AuthSigner();
  const [isLiked, setIsLiked] = useState(false);
  const [ioBookmark, setIoBookmark] = useState(false);
  const [isDeletePopupVisible, setIsDeletePopupVisible] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const getid = localStorage.getItem("_id");
  useEffect(() => {
    // Check if post has user data and is not an empty array
    if (viewsinglePosts && viewsinglePosts.length > 0) {
      const post = viewsinglePosts[0];

      // Check if user data exists and is not an empty array
      if (post.userData && post.userData.length > 0) {
        // Set email to state
        setUserEmail(post.userData[0].email);
      }
    }
  }, [viewsinglePosts]);

  const handleDeleteClick = () => {
    setIsDeletePopupVisible(true);
  };

  const handleDeleteConfirm = () => {
    // Handle deletion logic here
    SingledeletePost();
    setIsDeletePopupVisible(false);
  };

  const handleDeleteCancel = () => {
    // Handle cancellation logic here
    setIsDeletePopupVisible(false);
  };

  const handleLikeClick = () => {
    SinglelikePost();
    setIsLiked(!isLiked);
  };

  const Bookmark = () => {
    setIoBookmark(!ioBookmark);
    SinglesavePost();
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

  const SinglelikePost = async () => {
    try {
      await axiosInstanceAuth.post(`likePost/${getid}`).then((response) => {
        console.log("SinglelikePost API Response:", response);
        toast.success(response.data.message);
      });
    } catch (error) {
      console.error("SinglelikePost API Error:", error);
    }
  };

  const SinglesavePost = async () => {
    try {
      await axiosInstanceAuth.post(`savePost/${getid}`).then((response) => {
        console.log("savePost API Response:", response);
        toast.success(response.data.message);
      });
    } catch (error) {
      console.error("savePost API Error:", error);
    }
  };

  const SingledeletePost = async () => {
    try {
      await axiosInstanceAuth.delete(`deletePost/${getid}`).then((response) => {
        console.log("SingledeletePost API Response:", response);
        toast.success(response.data.message);
        localStorage.removeItem("_id");
        viewPostByUsers();
        sendApiRequest();
        router.push("/my-posts");
      });
    } catch (error) {
      console.error("SingledeletePost API Error:", error);
    }
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
                <div className="flex space-x-5 justify-start">
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
                      <div className="py-2">
                        {post.userData && post.userData.length > 0 && (
                          <p className="text-lg font-semibold ">
                            {post.userData[0].email}
                          </p>
                        )}
                      </div>
                      <div className="flex gap-3 justify-center text-center">
                        {userinfo?.email === userEmail && (
                          <div
                            className="cursor-pointer"
                            onClick={() => updatedata()}
                          >
                            <BiSolidEditAlt size={22} />
                          </div>
                        )}

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
                        {userinfo?.email === userEmail && (
                          <div
                            className="text-red-500 cursor-pointer"
                            onClick={() => handleDeleteClick()}
                          >
                            <RiDeleteBin6Fill />
                          </div>
                        )}
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
