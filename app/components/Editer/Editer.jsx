import React, { useState, useRef, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import JoditEditor from "jodit-react";
import { SlArrowDown } from "react-icons/sl";
import { useWeb3AuthSigner } from "@/app/context/web3-auth-signer";
import "./editor-styles.css";
import { IoMdCreate } from "react-icons/io";
import { MdLibraryAdd } from "react-icons/md";
import { BsArrowsAngleExpand } from "react-icons/bs";
import axiosInstanceAuth from "../apiInstances/axiosInstanceAuth";

const Example = () => {
  const editor = useRef(null);
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
    setIisEditdata,
  } = useWeb3AuthSigner();
  const [BlogsData, setBlogsData] = useState({
    title: "",
    content: "",
  });

  useEffect(() => {
    if (isEditPost && isEditdata) {
      setBlogsData({
        title: isEditdata?.title || "",
        content: isEditdata?.content || "",
      });
    }
  }, [isEditPost, isEditdata]);

  const close = () => {
    setopenediter(false);
    setIsEditPost(false);
    setIisEditdata(undefined);
    setBlogsData({
      title: "",
      content: "",
    });
  };

  const createpremises = async () => {
    if (isEditPost) {
      if (!BlogsData.title || !BlogsData.content) {
        toast.error("Please fill in all the fields");
        return;
      }

      const postId = viewsinglePosts[0]?._id;
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
              viewPostByUsers();
              sendApiRequest();
              viewSinglePost();
            }
          });
      } catch (error) {
        console.error("editPost API Error:", error);
        toast.error(response.data.message);
      }
    } else {
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
    }
  };

  return (
    <>
      <div className={`space-y-4 `}>
        <div className=" text-lg text-white flex justify-between">
          <div className="flex items-center justify-center gap-1">
            <IoMdCreate />
            <p>{isEditPost ? "Edit premises" : "Create a new premises"}</p>
          </div>
          <div className="flex gap-3 items-center">
            <SlArrowDown onClick={() => close()} className="cursor-pointer" />
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
        <div className="rounded-md">
          <JoditEditor
            ref={editor}
            value={BlogsData?.content}
            onChange={(newContent) =>
              setBlogsData({ ...BlogsData, content: newContent })
            }
          />
        </div>
        <div className="flex space-x-2">
          <button
            className="bg-white hover:bg-opacity-20 rounded-lg px-3 py-2 hover:text-white flex justify-center items-center space-x-1"
            onClick={() => createpremises()}
          >
            <MdLibraryAdd />
            <p>{isEditPost ? "Updtae Premises" : "Create Premises"}</p>
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
