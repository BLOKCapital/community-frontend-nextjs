"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useWeb3AuthSigner } from "@/app/context/web3-auth-signer";
import { BiSolidEditAlt } from "react-icons/bi";
import { IoBookmarkOutline } from "react-icons/io5";
import { IoBookmark } from "react-icons/io5";
import { RiDeleteBin6Fill } from "react-icons/ri";
import toast, { Toaster } from "react-hot-toast";

import { useRouter } from "next/navigation";
import deleteimg from "../../assets/icons/delete.png";
import { FaHeart, FaRegHeart, FaReply } from "react-icons/fa6";
import axiosInstanceAuth from "@/app/components/apiInstances/axiosInstanceAuth";
import "./Datastyle.css";
import { PulseLoader } from "react-spinners";
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
    setIsCommentdata,
    setIsComment,
    viewComments,
    checkuserlike,
    checkuserlikeComment,
    postLikedByUser,
    PostLikedByUser,
    ViewSavedPostByUser,
    setIsreplycomment,
    setReplycommentdata,
  } = useWeb3AuthSigner();
  const [isLiked, setIsLiked] = useState(false);
  const [ioBookmark, setIoBookmark] = useState(false);
  const [isDeletePopupVisible, setIsDeletePopupVisible] = useState(false);
  const [deletew, setDeletew] = useState({
    title: "",
    Id: "",
  });
  const [userEmail, setUserEmail] = useState("");
  const [getid, setGetid] = useState("");
  const liked =
    checkuserlike && checkuserlike.length > 0 && checkuserlike[0]?.liked;

  const saved =
    checkuserlike && checkuserlike.length > 0 && checkuserlike[1]?.saved;

  const Likecomment =
    checkuserlikeComment &&
    checkuserlikeComment.length > 0 &&
    checkuserlikeComment[0]?.liked;

  useEffect(() => {
    const getid = localStorage.getItem("_id");
    setGetid(getid);
    // Check if post has user data and is not an empty array
    if (viewsinglePosts) {
      const post = viewsinglePosts;
      //console.log("post", post);
      // Check if user data exists and is not an empty array
      if (post.userData && post.userData.length > 0) {
        // Set email to state
        setUserEmail(post.userData[0].email);
      }
    }
  }, [viewsinglePosts]);

  //console.log("view single Posts -->", viewsinglePosts);

  const handleReplyComment = () => {
    if (coreKitStatus === "LOGGED_IN") {
      setopenediter(true);
      setIsreplycomment(true);
    } else {
      toast.error("Please Login!");
    }
    //toast.error("Upcoming!!");
  };

  const handleDeleteClick = (e, id) => {
    setDeletew({
      title: e,
      Id: id,
    });
    //console.log("delete");
    setIsDeletePopupVisible(true);
  };

  const handleDeleteConfirm = () => {
    if (deletew.title === "comment") {
      SingledeleteComment();
    } else if (deletew.title === "replycomment") {
      Singledeletereply();
    } else {
      SingledeletePost();
    }
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

  const handleLikeClickComment = (e) => {
    if (coreKitStatus === "LOGGED_IN") {
      SinglelikeComment(e);
    } else {
      toast.error("Please Login!");
    }
  };

  const Bookmark = (e) => {
    if (coreKitStatus === "LOGGED_IN") {
      SinglesavePost(e);
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

  const calculateTimeDifference = (dateString) => {
    const currentDate = new Date();
    const updatedDate = new Date(dateString);
    const timeDifference = currentDate.getTime() - updatedDate.getTime();
    // Convert milliseconds to days
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    //console.log(daysDifference);
    return daysDifference;
  };

  const handleEditClick = (e) => {
    setIsEditdata(e);
    setopenediter(true);
    setIsEditPost(true);
  };

  const handleEditcomment = (e) => {
    setIsCommentdata(e);
    setIsComment(true);
    setopenediter(true);
  };

  const handleEditreply = (e) => {
    setReplycommentdata(e);
    setIsreplycomment(true);
    setopenediter(true);
  };

  const SinglelikePost = async () => {
    const postId = getid;
    try {
      await axiosInstanceAuth.post(`likePost/${postId}`).then((response) => {
        console.log("SinglelikePost API Response:", response);
        toast.success(response.data.message);
        viewSinglePost(postId);
        sendApiRequest();
        PostLikedByUser();
        CheckLikesclick(postId);
      });
    } catch (error) {
      console.error("SinglelikePost API Error:", error);
    }
  };

  const SinglelikeComment = async (e) => {
    try {
      await axiosInstanceAuth.post(`likeComment/${e}`).then((response) => {
        console.log("SinglelikeComment API Response:", response);
        toast.success(response.data.message);
        viewSinglePost(getid);
        sendApiRequest();
        postLikedByUser();
        CheckCommentLike(e);
      });
    } catch (error) {
      console.error("SinglelikeComment API Error:", error);
    }
  };

  const SinglesavePost = async (e) => {
    try {
      await axiosInstanceAuth.post(`savePost/${getid}`).then((response) => {
        console.log("savePost API Response:", response);
        toast.success(response.data.message);
        CheckLikesclick(e);
        ViewSavedPostByUser();
      });
    } catch (error) {
      console.error("savePost API Error:", error);
    }
  };

  const SingledeletePost = async () => {
    try {
      await axiosInstanceAuth.delete(`deletePost/${getid}`).then((response) => {
        console.log("deletePost API Response:", response);
        toast.success(response.data.message);

        viewPostByUsers();
        sendApiRequest();

        router.push("/");
        localStorage.removeItem("_id");
      });
    } catch (error) {
      console.error("deletePost API Error:", error);
    }
  };

  const Singledeletereply = async () => {
    const Id = deletew.Id;
    try {
      await axiosInstanceAuth.delete(`deleteReply/${Id}`).then((response) => {
        console.log("deleteReply API Response:", response);
        if (response.data.status === false) {
          toast.warn(response.data.message);
        } else {
          toast.success(response.data.message);
          viewSinglePost(getid);
        }
      });
    } catch (error) {
      console.error("deleteReply API Error:", error);
    }
  };

  const SingledeleteComment = async () => {
    const commentId = deletew.Id;
    console.log("deleteComment-->", deletew.Id);
    try {
      await axiosInstanceAuth
        .delete(`deleteComment/${commentId}`)
        .then((response) => {
          console.log("deleteComment API Response:", response);
          if (response.data.status === false) {
            toast.warn(response.data.message);
          } else {
            toast.success(response.data.message);
            viewSinglePost(getid);
          }
        });
    } catch (error) {
      console.error("deleteComment API Error:", error);
    }
  };

  const getEmailSubstring = (email) => {
    // Split the email by '@' and take the first part
    const username = email.split("@")[0];
    return username;
  };

  return (
    <>
      <div className="border-t-4 border-amber-600 rounded-t-xl  w-full text-white">
        <div className="bg-gray-800 bg-opacity-90  rounded-t-xl">
          {viewsinglePosts ? (
            <>
              <div className="md:p-8 p-3 text-white space-y-3  ">
                <div className="border-b py-2 font-bold ">
                  <h2 className="text-xl">{viewsinglePosts.title}</h2>
                </div>
                <div className="flex md:space-x-10 space-x-3 justify-start">
                  <div className="sticky top-0">
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
                    <div className="flex justify-between items-center pb-5">
                      <div className="py-2">
                        {viewsinglePosts.userData &&
                          viewsinglePosts.userData.length > 0 && (
                            <>
                              <p className="text-lg font-semibold ">
                                {getEmailSubstring(
                                  viewsinglePosts.userData[0].email
                                )}
                              </p>
                              {/*<p className="text-lg font-semibold block md:hidden">
                                {viewsinglePosts.userData[0].email.slice(0, 8)}
                              </p>*/}
                            </>
                          )}
                      </div>
                      <div className="flex gap-3 justify-center text-center">
                        {userinfo?.email === userEmail && (
                          <div
                            className="cursor-pointer text-lg"
                            onClick={() => handleEditClick(viewsinglePosts)}
                          >
                            <BiSolidEditAlt size={22} />
                          </div>
                        )}

                        <div>
                          <p>
                            {calculateTimeDifference(
                              viewsinglePosts?.createdAt
                            )}
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
                              {liked ? (
                                <FaHeart
                                  className="text-red-500 hover:text-red-700"
                                  size={24}
                                />
                              ) : (
                                <FaRegHeart
                                  className="text-white hover:text-gray-300"
                                  size={24}
                                />
                              )}
                            </button>
                          </div>
                          <div
                            className="cursor-pointer"
                            onClick={() => Bookmark(viewsinglePosts._id)}
                          >
                            {saved ? (
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
                              onClick={() => handleDeleteClick("post")}
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
                  <div className=" md:block hidden">
                    <div className="flex flex-col order-last text-center">
                      <p> {formatDate(viewsinglePosts.createdAt)} </p>
                      <p className="text-xs">days ago</p>
                    </div>
                  </div>
                </div>
                {/*----------------------Comments--------------------------------*/}
                <div
                  className={`${
                    viewComments ? "border-t border-gray-600 py-3" : null
                  }`}
                >
                  {viewComments &&
                    viewComments.map((comment, index) => (
                      <>
                        <div
                          className="flex md:space-x-10 space-x-3 pb-5"
                          key={index}
                        >
                          <div className="sticky top-0">
                            {comment.user && (
                              <Image
                                src={comment.user.userImage}
                                alt="Image"
                                height={60}
                                width={60}
                                className="rounded-full "
                              />
                            )}
                          </div>
                          <div className="w-4/5 ">
                            <div className="flex justify-between items-center pb-5">
                              <div className="py-2">
                                {comment.user && (
                                  <p className="text-lg font-semibold ">
                                    {getEmailSubstring(comment.user.email)}
                                  </p>
                                )}
                              </div>
                              <div className="flex gap-3 justify-center text-center">
                                {userinfo?.email === comment.user.email && (
                                  <div
                                    className="cursor-pointer text-lg"
                                    onClick={() => handleEditcomment(comment)}
                                  >
                                    <BiSolidEditAlt size={22} />
                                  </div>
                                )}

                                <div>
                                  <p>
                                    {calculateTimeDifference(
                                      comment?.createdAt
                                    )}
                                    d
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
                              <div className="flex justify-end items-center  ">
                                <div className="flex space-x-5 justify-center items-center">
                                  <div className="cursor-pointer flex gap-2 justify-center items-center">
                                    {comment.commentLikeCount > 0 ? (
                                      <p
                                        className={`text-base ${
                                          comment.commentLikeCount > 0
                                            ? "delay-75"
                                            : ""
                                        } `}
                                      >
                                        {comment.commentLikeCount}
                                      </p>
                                    ) : null}

                                    <button
                                      onClick={() =>
                                        handleLikeClickComment(comment._id)
                                      }
                                    >
                                      {Likecomment ? (
                                        <FaHeart
                                          className="text-red-500 hover:text-red-700"
                                          size={24}
                                        />
                                      ) : (
                                        <FaRegHeart
                                          className="text-white hover:text-gray-300"
                                          size={24}
                                        />
                                      )}
                                    </button>
                                  </div>

                                  {userinfo?.email === comment.user.email && (
                                    <div
                                      className="text-red-500 cursor-pointer text-lg"
                                      onClick={() =>
                                        handleDeleteClick(
                                          "comment",
                                          comment._id
                                        )
                                      }
                                    >
                                      <RiDeleteBin6Fill size={24} />
                                    </div>
                                  )}

                                  <div
                                    className="cursor-pointer flex gap-2 text-lg items-center px-2 py-1  hover:bg-slate-600 hover:rounded-lg hover:delay-75"
                                    onClick={() => handleReplyComment()}
                                  >
                                    <FaReply size={20} />
                                    <p>Reply Comment</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className=" md:block hidden">
                            <div className="flex flex-col order-last text-center">
                              <p> {formatDate(viewsinglePosts.createdAt)} </p>
                              <p className="text-xs">days ago</p>
                            </div>
                          </div>
                        </div>

                        {/*----------------------comment repy---------------------*/}
                        <div
                          className={`${
                            comment.replies
                              ? "border-t border-gray-600 py-3"
                              : null
                          }`}
                        >
                          {comment.replies && (
                            <>
                              {comment?.replies?.map((data, index1) => (
                                <div
                                  className="flex md:space-x-10 space-x-3 "
                                  key={index1}
                                >
                                  <div className="sticky top-0">
                                    {data.user && (
                                      <Image
                                        src={data.user.userImage}
                                        alt="Image"
                                        height={60}
                                        width={60}
                                        className="rounded-full "
                                      />
                                    )}
                                  </div>
                                  <div className="w-4/5 ">
                                    <div className="flex justify-between items-center pb-5">
                                      <div className="py-2">
                                        {data.user && (
                                          <p className="text-lg font-semibold ">
                                            {getEmailSubstring(data.user.email)}
                                          </p>
                                        )}
                                      </div>
                                      <div className="flex gap-3 justify-center text-center">
                                        {userinfo?.email ===
                                          data.user.email && (
                                          <div
                                            className="cursor-pointer text-lg"
                                            onClick={() =>
                                              handleEditreply(data)
                                            }
                                          >
                                            <BiSolidEditAlt size={22} />
                                          </div>
                                        )}

                                        <div>
                                          <p>
                                            {calculateTimeDifference(
                                              data?.createdAt
                                            )}
                                            d
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="space-y-5">
                                      <div
                                        dangerouslySetInnerHTML={{
                                          __html: data.content,
                                        }}
                                      />
                                      <div className="flex justify-end items-center  ">
                                        <div className="flex space-x-5 justify-center items-center">
                                          <div className="cursor-pointer flex gap-2 justify-center items-center">
                                            {comment.commentLikeCount > 0 ? (
                                              <p
                                                className={`text-base ${
                                                  data.commentLikeCount > 0
                                                    ? "delay-75"
                                                    : ""
                                                } `}
                                              >
                                                {data.commentLikeCount}
                                              </p>
                                            ) : null}

                                            <button
                                              onClick={() =>
                                                handleLikeClickComment(data._id)
                                              }
                                            >
                                              {Likecomment ? (
                                                <FaHeart
                                                  className="text-red-500 hover:text-red-700"
                                                  size={24}
                                                />
                                              ) : (
                                                <FaRegHeart
                                                  className="text-white hover:text-gray-300"
                                                  size={24}
                                                />
                                              )}
                                            </button>
                                          </div>

                                          {userinfo?.email ===
                                            data.user.email && (
                                            <div
                                              className="text-red-500 cursor-pointer text-lg"
                                              onClick={() =>
                                                handleDeleteClick(
                                                  "replycomment",
                                                  data._id
                                                )
                                              }
                                            >
                                              <RiDeleteBin6Fill size={24} />
                                            </div>
                                          )}

                                          <div
                                            className="cursor-pointer flex gap-2 text-lg items-center px-2 py-1  hover:bg-slate-600 hover:rounded-lg hover:delay-75"
                                            onClick={() => handleReplyComment()}
                                          >
                                            <FaReply size={20} />
                                            <p>Reply Comment</p>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className=" md:block hidden">
                                    <div className="flex flex-col order-last text-center">
                                      <p> {formatDate(data.createdAt)} </p>
                                      <p className="text-xs">days ago</p>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </>
                          )}
                        </div>
                      </>
                    ))}
                </div>
              </div>
            </>
          ) : (
            <div className="bg-gray-800 bg-opacity-90 rounded-xl  h-screen">
              <div className="flex justify-center items-center py-10">
                <PulseLoader color="#ffffff" size={10} />
              </div>
            </div>
          )}
        </div>
        {isDeletePopupVisible && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[99]">
            <div className="bg-slate-700  p-8 rounded ">
              <div className="flex flex-col  gap-3  justify-center items-center">
                <Image
                  src={deleteimg}
                  alt="delete"
                  height={60}
                  width={60}
                  className="rounded-full "
                />
                <p className="mb-4">{`Are you sure you want to delete ${deletew.title}?`}</p>
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
