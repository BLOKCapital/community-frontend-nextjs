"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useWeb3AuthSigner } from "@/app/context/web3-auth-signer";
import { BiSolidEditAlt } from "react-icons/bi";
import { IoBookmarkOutline } from "react-icons/io5";
import { IoBookmark } from "react-icons/io5";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { GrLink } from "react-icons/gr";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import deleteimg from "../../assets/icons/delete.png";
import { FaHeart, FaRegHeart, FaReply } from "react-icons/fa6";
import axiosInstanceAuth from "@/app/components/apiInstances/axiosInstanceAuth";
import "./Datastyle.css";
//import * as XLSX from "xlsx";
//import axios from "axios";

const Datashow = () => {
  const router = useRouter();
  const {
    viewsinglePosts,
    setopenediter,
    userinfo,
    viewPostByUsers,
    sendApiRequest,
    viewSinglePost,
    coreKitStatus,
    setIsEditPost,
    setIsEditdata,
    setReply,
    CheckLikesclick,
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

  console.log("view single Posts -->", viewsinglePosts);
  const handleDeleteClick = () => {
    console.log("deleet");
    setIsDeletePopupVisible(true);
  };

  const handleDeleteConfirm = () => {
    SingledeletePost();
    // Handle deletion logic here
    setIsDeletePopupVisible(false);
  };

  const handleDeleteCancel = () => {
    // Handle cancellation logic here
    setIsDeletePopupVisible(false);
  };

  const handleLikeClick = () => {
    if (coreKitStatus === "LOGGED_IN") {
      SinglelikePost();
      setIsLiked(!isLiked);
    } else {
      toast.error("Please Login!");
    }
  };

  const Bookmark = () => {
    if (coreKitStatus === "LOGGED_IN") {
      setIoBookmark(!ioBookmark);
      SinglesavePost();
    } else {
      toast.error("Please Login!");
    }
  };

  const handleReplyClick = () => {
    if (coreKitStatus === "LOGGED_IN") {
      setopenediter(true);
      setReply(true);
    } else {
      toast.error("Please Login!");
    }
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

  const handleEditClick = (e) => {
    setIsEditdata(e);
    setopenediter(true);
    setIsEditPost(true);
  };

  const SinglelikePost = async () => {
    try {
      await axiosInstanceAuth.post(`likePost/${getid}`).then((response) => {
        console.log("SinglelikePost API Response:", response);
        toast.success(response.data.message);
        viewSinglePost();
        sendApiRequest();
        CheckLikesclick();
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
      await axiosInstanceAuth.post(`deletePost/${getid}`).then((response) => {
        console.log("SinglelikePost API Response:", response);
        toast.success(response.data.message);

        viewPostByUsers();
        sendApiRequest();
        router.push("/my-posts");
        localStorage.removeItem("_id");
      });
    } catch (error) {
      console.error("SinglelikePost API Error:", error);
    }
  };

  const popupRef = useRef();

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (popupRef.current && !popupRef.current.contains(e.target)) {
        setIsDeletePopupVisible(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [popupRef]);

  return (
    <>
      <div className="border-t-4 border-amber-600 rounded-t-xl  w-full text-white">
        <div className="bg-gray-800 bg-opacity-90 rounded-t-xl  ">
          {viewsinglePosts ? (
            <>
              <div className="md:p-8 p-3 text-white space-y-3  ">
                <div className="border-b py-2 font-bold ">
                  <h2 className="text-xl">{viewsinglePosts.title}</h2>
                </div>
                <div className="flex space-x-5 justify-start">
                  <div>
                    {viewsinglePosts.images && (
                      <Image
                        src={viewsinglePosts.images}
                        alt="Image"
                        height={60}
                        width={60}
                        className="rounded-full "
                      />
                    )}
                  </div>
                  <div className="w-4/5 ">
                    <div className="flex justify-between items-center">
                      <div className="py-2">
                        {viewsinglePosts.userData &&
                          viewsinglePosts.userData.length > 0 && (
                            <p className="text-lg font-semibold ">
                              {viewsinglePosts.userData[0].email}
                            </p>
                          )}
                      </div>
                      <div className="flex gap-3 justify-center text-center">
                        {userinfo?.email === userEmail && (
                          <div
                            className="cursor-pointer text-lg"
                            onClick={() => handleEditClick(post)}
                          >
                            <BiSolidEditAlt size={22} />
                          </div>
                        )}

                        <div>
                          <p>
                            {calculateTimeDifference(viewsinglePosts.updatedAt)}
                            d
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-5">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: viewsinglePosts.content,
                        }}
                      />
                      <div className="flex justify-end items-center  ">
                        <div className="flex space-x-5 justify-center items-center">
                          <div className="cursor-pointer flex gap-2 justify-center items-center">
                            {viewsinglePosts.likeCount > 0 ? (
                              <p
                                className={`text-base ${
                                  viewsinglePosts.likeCount > 0
                                    ? "delay-75"
                                    : ""
                                } `}
                              >
                                {viewsinglePosts.likeCount}
                              </p>
                            ) : null}

                            <button onClick={() => handleLikeClick()}>
                              {userinfo?.email ? (
                                <FaRegHeart
                                  className="text-white hover:text-gray-300"
                                  size={24}
                                />
                              ) : (
                                <FaHeart
                                  className="text-red-500 hover:text-red-700"
                                  size={24}
                                />
                              )}
                            </button>
                          </div>
                          <div
                            className="cursor-pointer"
                            onClick={() => Bookmark()}
                          >
                            {ioBookmark ? (
                              <div className="text-blue-600">
                                <IoBookmark size={24} />
                              </div>
                            ) : (
                              <div>
                                <IoBookmarkOutline size={24} />
                              </div>
                            )}
                          </div>
                          {userinfo?.email === userEmail && (
                            <div
                              className="text-red-500 cursor-pointer text-lg"
                              onClick={() => handleDeleteClick()}
                            >
                              <RiDeleteBin6Fill size={24} />
                            </div>
                          )}
                          {/*<div className="cursor-pointer text-lg">
                            <GrLink size={24} />
                          </div>*/}

                          <div
                            className="cursor-pointer flex gap-2 text-lg items-center px-2 py-1  hover:bg-slate-600 hover:rounded-lg hover:delay-75"
                            onClick={() => handleReplyClick()}
                          >
                            <FaReply size={20} />
                            <p>Reply</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-center">
                    <p> {formatDate(viewsinglePosts.createdAt)} </p>
                    <p className="text-xs">days ago</p>
                  </div>
                </div>
              </div>
              {viewsinglePosts.comments ? (
                <div className="border-t border-gray-600">
                  <div className="md:p-8 p-3 text-white space-y-3">
                    <div className="flex space-x-5 justify-start">
                      {viewsinglePosts.comments.map((comment, index) => (
                        <div key={index} className="w-full">
                          <div className="flex justify-between items-center">
                            <div>
                              <Image
                                src={viewsinglePosts.images}
                                alt="User Image"
                                height={60}
                                width={60}
                                className="rounded-full"
                              />
                            </div>

                            <div className="flex items-center">
                              <div>
                                <p className="text-lg font-semibold">
                                  {comment.userDetails &&
                                    comment.userDetails.length > 0 &&
                                    comment.userDetails[0].email}
                                </p>
                              </div>
                            </div>
                            <div className="flex gap-3 justify-center text-center">
                              <div>
                                <p>
                                  {calculateTimeDifference(comment.updatedAt)}d
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="space-y-5">
                            <div
                              dangerouslySetInnerHTML={{
                                __html: comment.content,
                              }}
                            />
                            <div className="flex justify-end items-center">
                              <div className="flex space-x-5 justify-center items-center">
                                {/* Like, Bookmark, Delete, and Reply buttons */}
                                {/* You can use the existing logic to handle these buttons */}
                              </div>
                            </div>
                          </div>
                          <div className="text-center">
                            <p>{formatDate(comment.createdAt)}</p>
                            <p className="text-xs">days ago</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : null}
            </>
          ) : (
            <p className="flex text-center justify-center items-center py-10 text-3xl">
              Loding <span className="animate-pulse">...</span>
            </p>
          )}
        </div>

        {isDeletePopupVisible && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[99]">
            <div className="bg-slate-700  p-8 rounded z-[999] " ref={popupRef}>
              <div className="flex flex-col  gap-3  justify-center items-center">
                <Image
                  src={deleteimg}
                  alt="delete"
                  height={60}
                  width={60}
                  className="rounded-full "
                />
                <p className="mb-4">Are you sure you want to delete?</p>
              </div>
              <div className="flex justify-center">
                <button
                  onClick={handleDeleteConfirm}
                  className="bg-red-500 text-white px-4 py-2 rounded mr-2"
                >
                  Delete
                </button>
                <button
                  onClick={handleDeleteCancel}
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Datashow;
