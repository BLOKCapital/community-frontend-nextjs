import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SlArrowDown } from "react-icons/sl";
import { useWeb3AuthSigner } from "@/app/context/web3-auth-signer";
import { IoMdCreate } from "react-icons/io";
import { MdLibraryAdd } from "react-icons/md";
import { FaReply } from "react-icons/fa6";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import axiosInstanceAuth from "../apiInstances/axiosInstanceAuth";
import "./editor-styles.css";

const modules = {
  toolbar: [
    [{ font: [] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline", "strike"],
    [
      { color: [] },
      {
        background: [
          "black",
          "white",
          "red",
          "green",
          "blue",
          "yellow",
          "orange",
          "purple",
          "pink",
          "primary",
          "gray",
          "lightgray",
          "darkgray",
          "cyan",
          "magenta",
          "maroon",
          "navy",
          "olive",
          "teal",
        ],
      },
    ],
    [{ script: "sub" }, { script: "super" }],
    ["blockquote", "code-block"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "image", "video"],
    ["clean"],
  ],
};

const Example = () => {
  const {
    setopenediter,
    userinfo,
    registerUser,
    viewPostByUsers,
    sendApiRequest,
    viewsinglePosts,
    isEditPost,
    setIsEditPost,
    viewSinglePost,
    isEditdata,
    setIsEditdata,
    isReply,
    setReply,
    isCommentdata,
    setIsComment,
    isComment,
  } = useWeb3AuthSigner();
  const [BlogsData, setBlogsData] = useState({
    title: "",
    content: "",
  });
  //console.log("isEditdata-->", isEditdata);
  useEffect(() => {
    if (isEditPost && isEditdata) {
      setBlogsData({
        title: isEditdata?.title || "",
        content: isEditdata?.content || "",
      });
    }
    if (isComment && isCommentdata) {
      console.log("Edit isCommentdata->", isCommentdata);
      setBlogsData({
        title: "",
        content: isCommentdata?.content || "",
      });
    }
  }, [isComment, isCommentdata, isEditPost, isEditdata]);

  const close = () => {
    setopenediter(false);
    setIsEditPost(false);
    setIsEditdata(undefined);
    setReply(false);
    setBlogsData({
      title: "",
      content: "",
    });
  };

  const createpremises = async () => {
    if (isEditPost) {
      Editpost();
    } else if (isComment) {
      editComment();
    } else {
      Addpost();
    }
  };

  const Editpost = async () => {
    if (!BlogsData.title || !BlogsData.content) {
      toast.error("Please fill in all the fields");
      return;
    }

    const postId = viewsinglePosts?._id;
    const dataToSend = {
      title: BlogsData.title,
      content: BlogsData.content,
      images: userinfo?.profileImage,
      //id: registerUser?._id,
    };
    console.log("dataToSend--->", dataToSend);
    try {
      await axiosInstanceAuth
        .put(`editPost/${postId}`, dataToSend)
        .then((response) => {
          console.log("editPost API Response:", response);
          toast.success(response.data.message);
          if (response) {
            setopenediter(false);
            setBlogsData({
              title: "",
              content: "",
            });
            setIsEditPost(false);
            viewPostByUsers(postId);
            sendApiRequest();
            viewSinglePost();
          }
        });
    } catch (error) {
      console.error("editPost API Error:", error);
      toast.error(response.data.message);
    }
  };

  const Addpost = async () => {
    if (!BlogsData.title || !BlogsData.content) {
      toast.error("Please fill in all the fields");
      return;
    }

    const dataToSend = {
      title: BlogsData.title,
      content: BlogsData.content,
      images: userinfo?.profileImage,
      id: registerUser?._id,
    };
    //console.log("dataToSend--->", dataToSend);
    try {
      await axiosInstanceAuth
        .post(`addPost`, dataToSend)
        .then(async (response) => {
          console.log("Createpremises API Response:", response);
          toast.success(response.data.message);
          if (response) {
            setopenediter(false);
            setBlogsData({
              title: "",
              content: "",
            });
            await viewPostByUsers();
            await sendApiRequest();
          }
        });
    } catch (error) {
      console.error("Createpremises API Error:", error);
      toast.error(response.data.message);
    }
  };

  const editComment = async () => {
    const commentId = isCommentdata?._id;
    const dataToSend = {
      content: BlogsData.content,
    };
    //console.log("dataToSend--->", dataToSend);
    try {
      await axiosInstanceAuth
        .put(`editComment/${commentId}`, dataToSend)
        .then(async (response) => {
          console.log("Createpremises API Response:", response);
          toast.success(response.data.message);
          if (response) {
            setopenediter(false);
            setBlogsData({
              title: "",
              content: "",
            });
            await viewPostByUsers();
            await sendApiRequest();
            await viewSinglePost();
          }
        });
    } catch (error) {
      console.error("Createpremises API Error:", error);
      toast.error(response.data.message);
    }
  };

  const createreply = async () => {
    if (!BlogsData.content) {
      toast.error("Please fill in all the fields");
      return;
    }

    const postId = viewsinglePosts?._id;
    const dataToSend = {
      content: BlogsData.content,
    };
    console.log("addComment-->", postId);
    try {
      await axiosInstanceAuth
        .post(`addComment/${postId}`, dataToSend)
        .then((response) => {
          console.log("addComment API Response:", response);
          toast.success(response.data.message);
          if (response) {
            setopenediter(false);
            setBlogsData({
              title: "",
              content: "",
            });
            setIsEditPost(false);
            viewPostByUsers();
            sendApiRequest();
            viewSinglePost();
          }
        });
    } catch (error) {
      console.error("addComment API Error:", error);
    }
  };

  return (
    <>
      <div className={`space-y-4 `}>
        {isComment ? null : (
          <>
            {isReply ? (
              <div className="flex justify-between text-white ">
                <div></div>
                <div className="flex gap-3 items-center">
                  <SlArrowDown
                    onClick={() => close()}
                    className="cursor-pointer"
                  />
                </div>
              </div>
            ) : (
              <>
                <div className=" text-lg text-white flex justify-between">
                  <div className="flex items-center justify-center gap-1">
                    <IoMdCreate />
                    <p>
                      {isEditPost ? "Edit premises" : "Create a new premises"}
                    </p>
                  </div>
                  <div className="flex gap-3 items-center">
                    <SlArrowDown
                      onClick={() => close()}
                      className="cursor-pointer"
                    />
                  </div>
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Enter title"
                    value={BlogsData?.title}
                    onChange={(e) =>
                      setBlogsData({ ...BlogsData, title: e.target.value })
                    }
                    className="outline-none w-full py-1 px-2  text-black  border border-stone-400 rounded-md "
                  />
                </div>
              </>
            )}
          </>
        )}
        <div className="rounded-md bg-white ">
          <ReactQuill
            theme="snow"
            modules={modules}
            value={BlogsData?.content}
            onChange={(newContent) =>
              setBlogsData({ ...BlogsData, content: newContent })
            }
            className="quill-editor"
          />
        </div>
        <div className={`flex space-x-2 ${isReply ? "hidden" : "block"}`}>
          <button
            className="bg-white hover:bg-opacity-20 rounded-lg px-3 py-2 hover:text-white flex justify-center items-center space-x-1"
            onClick={() => createpremises()}
          >
            <MdLibraryAdd />
            <p>
              {isComment ? (
                "Update Comment"
              ) : (
                <>{isEditPost ? "Updtae Premises" : "Create Premises"} </>
              )}
            </p>
          </button>
          <button
            className="px-2 py-2 text-white hover:font-semibold"
            onClick={() => close()}
          >
            Close
          </button>
        </div>

        <div className={`flex space-x-2 ${isReply ? "block" : "hidden"}`}>
          <button
            className="bg-white hover:bg-opacity-20 rounded-lg px-3 py-2 hover:text-white flex justify-center items-center space-x-1"
            onClick={() => createreply()}
          >
            <FaReply size={20} />
            <p>Reply</p>
          </button>
          <button
            className="px-2 py-2 text-white hover:font-semibold"
            onClick={() => close()}
          >
            Close
          </button>
        </div>
      </div>
    </>
  );
};

export default Example;
