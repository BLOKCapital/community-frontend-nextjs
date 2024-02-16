"use client";
import React from "react";
import { type SafeEventEmitterProvider } from "@web3auth/base";
import { createContext, useContext, useEffect, useState } from "react";
import axiosInstanceAuth from "../components/apiInstances/axiosInstanceAuth";
export interface Wallet1 {
  email: string;
  name: string;
  profileImage: string;
  verifier: string;
  verifierId: string;
  typeOfLogin: string;
  accessToken: string;
  idToken: string;
  state: {
    instanceId: string;
    verifier: string;
    typeOfLogin: string;
    redirectToOpener: boolean;
  };
  token_type: string;
  expires_in: string;
  scope: string;
  authuser: string;
  prompt: string;
  version_info: string;
}

interface BlogData {
  content: string;
  commentId: number;
  postId: number;
}

export interface Web3AuthSignerContext {
  web3AuthSigner?: SafeEventEmitterProvider;
  setWeb3AuthSigner: React.Dispatch<
    React.SetStateAction<SafeEventEmitterProvider | undefined>
  >;

  sessionKeyProvider: any | null;
  setSessionKeyProvider: any | null;

  accountAddress?: `0x${string}`;
  setAccountAddress: React.Dispatch<
    React.SetStateAction<`0x${string}` | undefined>
  >;
  userinfo: Wallet1 | null;
  setUserinfo: React.Dispatch<React.SetStateAction<Wallet1 | null>>;

  ecdsaProvider: any | null;
  setEcdsaProvider: React.Dispatch<React.SetStateAction<any | null>>;
  // Correct variable name

  openediter: boolean;
  setopenediter: React.Dispatch<React.SetStateAction<boolean>>;

  isLiked: boolean;
  setIsLiked: React.Dispatch<React.SetStateAction<boolean>>;

  registerUser: any | null;
  setRegisterUser: React.Dispatch<React.SetStateAction<any>>;

  viewPostByUser: any | null;
  SetViewPostByUser: React.Dispatch<React.SetStateAction<any>>;

  viewPosts: any | null;
  SetViewPosts: React.Dispatch<React.SetStateAction<any>>;

  viewsinglePosts: any | null;
  SetViewsinglePosts: React.Dispatch<React.SetStateAction<any>>;

  viewComments: any | null;
  SetViewComments: React.Dispatch<React.SetStateAction<any>>;

  showcontent: any | null;
  setShowcontent: React.Dispatch<React.SetStateAction<any>>;

  coreKitStatus: any | null;
  setCoreKitStatus: React.Dispatch<React.SetStateAction<any>>;

  bookmark: any | null;
  SetBookmark: React.Dispatch<React.SetStateAction<any>>;

  isEditPost: boolean;
  setIsEditPost: React.Dispatch<React.SetStateAction<boolean>>;

  isComment: boolean;
  setIsComment: React.Dispatch<React.SetStateAction<boolean>>;

  isReply: boolean;
  setReply: React.Dispatch<React.SetStateAction<boolean>>;

  isEditdata: any | null;
  setIsEditdata: React.Dispatch<React.SetStateAction<any>>;

  isCommentdata: any | null;
  setIsCommentdata: React.Dispatch<React.SetStateAction<any>>;

  getid: any | null;
  setGetid: React.Dispatch<React.SetStateAction<any>>;

  Token: any | null;
  setToken: React.Dispatch<React.SetStateAction<any>>;

  isSidebar: boolean;
  setIsSidebar: React.Dispatch<React.SetStateAction<boolean>>;

  checkuserlike: any | null;
  setCheckuserlike: React.Dispatch<React.SetStateAction<any>>;

  checkuserlikeComment: any | null;
  setCheckuserlikeComment: React.Dispatch<React.SetStateAction<any>>;

  postLikedByUser: any | null;
  setPostLikedByUser: React.Dispatch<React.SetStateAction<any>>;

  viewSavedPostByUser: any | null;
  setViewSavedPostByUser: React.Dispatch<React.SetStateAction<any>>;

  isreplycomment: boolean;
  setIsreplycomment: React.Dispatch<React.SetStateAction<boolean>>;

  replycommentdata: any;
  setReplycommentdata: React.Dispatch<React.SetStateAction<any>>;

  //function
  ViewSavedPostByUser: () => Promise<void>;
  PostLikedByUser: () => Promise<void>;
  viewPostByUsers: () => Promise<void>;
  sendApiRequest: () => Promise<void>;
  viewSinglePost: (e?: any) => Promise<void>;
  ViewComments: (e?: any) => Promise<void>;
  CheckLikesclick: (e?: any) => Promise<void>;
  CheckCommentLike: (e?: any) => Promise<void>;
}

export const Web3AuthSigner = createContext<Web3AuthSignerContext | null>(null);

export const useWeb3AuthSigner = () => {
  const signer = useContext(Web3AuthSigner);
  if (signer === null) {
    throw new Error(
      "useWeb3AuthSigner() can only be used inside of <Web3AuthSignerProvider />, " +
        "please declare it at a higher level."
    );
  }
  return signer;
};

export function Web3AuthSignerProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [web3AuthSigner, setWeb3AuthSigner] = useState<
    SafeEventEmitterProvider | undefined
  >(undefined);
  const [accountAddress, setAccountAddress] = useState<
    `0x${string}` | undefined
  >(undefined);
  const [sessionKeyProvider, setSessionKeyProvider] = useState<any>();
  const [userinfo, setUserinfo] = useState<Wallet1 | null>(null);
  const [ecdsaProvider, setEcdsaProvider] = useState<any | null>(null);
  const [openediter, setopenediter] = useState<boolean>(false);
  const [registerUser, setRegisterUser] = useState<any>();
  const [viewPostByUser, SetViewPostByUser] = useState<any>();
  const [viewPosts, SetViewPosts] = useState<any>();
  const [bookmark, SetBookmark] = useState<any>();
  const [viewsinglePosts, SetViewsinglePosts] = useState<any>();
  const [viewComments, SetViewComments] = useState<any>();
  const [showcontent, setShowcontent] = useState<any>();
  const [coreKitStatus, setCoreKitStatus] = useState<any>();
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isEditPost, setIsEditPost] = useState<boolean>(false);
  const [isComment, setIsComment] = useState<boolean>(false);
  const [isEditdata, setIsEditdata] = useState<any>(false);
  const [isCommentdata, setIsCommentdata] = useState<any>(false);
  const [isReply, setReply] = useState<boolean>(false);
  const [Token, setToken] = useState<any>();
  const [getid, setGetid] = useState<any>();
  const [isSidebar, setIsSidebar] = useState<boolean>(false);
  const [checkuserlike, setCheckuserlike] = useState<any>();
  const [checkuserlikeComment, setCheckuserlikeComment] = useState<any>();
  const [postLikedByUser, setPostLikedByUser] = useState<any>();
  const [viewSavedPostByUser, setViewSavedPostByUser] = useState<any>();
  const [isreplycomment, setIsreplycomment] = useState<boolean>(false);
  const [replycommentdata, setReplycommentdata] = useState<any>();
  //const [coreKitInstance, setCoreKitInstance] = useState<any>();

  useEffect(() => {
    //if (typeof window !== "undefined") {
    const Token = localStorage.getItem("Token");
    setToken(Token);
    //}
    //if (typeof window !== "undefined") {
    const getid = localStorage.getItem("_id");
    setGetid(getid);
    //}
  }, []);

  const viewPostByUsers = async () => {
    try {
      await axiosInstanceAuth.get(`viewPostByUser`).then((response) => {
        console.log("viewPostByUser API Response:", response.data.data.data);
        SetViewPostByUser(response.data.data.data);
      });
    } catch (error) {
      console.error("viewPostByUser API Error:", error);
    }
  };

  const sendApiRequest = async () => {
    try {
      await axiosInstanceAuth.get(`viewPosts`).then((response) => {
        console.log("viewPosts API Response:", response.data.data.posts);
        SetViewPosts(response.data.data.posts);
      });
    } catch (error) {
      console.error("viewPosts API Error:", error);
    }
  };

  const viewSinglePost = async (e: any) => {
    try {
      await axiosInstanceAuth
        .get(`viewSinglePost/${e ? e : getid}`)
        .then((response) => {
          console.log("viewSinglePost API Response:", response.data.data);
          SetViewsinglePosts(response.data.data);
          setIsLiked(!isLiked);
          ViewComments(response.data.data._id);
          CheckLikesclick(response.data.data._id);
        });
    } catch (error) {
      console.error("viewSinglePost API Error:", error);
    }
  };

  const ViewComments = async (e: any) => {
    try {
      await axiosInstanceAuth.get(`viewComments/${e}`).then((response) => {
        console.log(
          "ViewComments API Response:",
          response?.data?.data?.comments
        );
        SetViewComments(response?.data?.data?.comments);
        CheckCommentLike(response?.data?.data?.comments?._id);
      });
    } catch (error) {
      console.error("ViewComments API Error:", error);
    }
  };

  const ViewSavedPostByUser = async () => {
    try {
      await axiosInstanceAuth.get(`viewSavedPostByUser`).then((response) => {
        console.log(
          "viewSavedPostByUser API Response:",
          response.data.data.savedPost
        );
        setViewSavedPostByUser(response.data.data.savedPost);
      });
    } catch (error) {
      console.error("viewSavedPostByUser API Error:", error);
    }
  };

  const CheckLikesclick = async (e: any) => {
    //console.log("postIds e:---->", e);

    const postIds = e;
    //const data = { postIds: e };
    //console.log("data", data);

    try {
      await axiosInstanceAuth.get(`checkLikes/${postIds}`).then((response) => {
        console.log("CheckLikesclick API Response:", response.data.data.array);
        setCheckuserlike(response.data.data.array);
      });
    } catch (error) {
      console.error("CheckLikesclick API Error:", error);
    }
  };

  const CheckCommentLike = async (e: any) => {
    //console.log("postIds e:---->", e);

    const commentId = e;
    //const data = { postIds: e };
    //console.log("data", data);

    try {
      await axiosInstanceAuth
        .get(`checkCommentLike/${commentId}`)
        .then((response) => {
          console.log(
            "checkCommentLike API Response:",
            response.data.data.array
          );
          setCheckuserlikeComment(response.data.data.array);
        });
    } catch (error) {
      console.error("checkCommentLike API Error:", error);
    }
  };

  const PostLikedByUser = async () => {
    try {
      await axiosInstanceAuth.get(`postLikedByUser`).then((response) => {
        console.log(
          "postLikedByUser API Response:",
          response?.data?.data?.likes
        );
        setPostLikedByUser(response?.data?.data?.likes);
      });
    } catch (error) {
      console.error("postLikedByUser API Error:", error);
    }
  };

  useEffect(() => {
    sendApiRequest();
    viewPostByUsers();

    if (getid) {
      viewSinglePost(getid);
    }
    if (Token) {
      PostLikedByUser();
      ViewSavedPostByUser();
    }
  }, [Token, getid]);

  return (
    <Web3AuthSigner.Provider
      value={{
        web3AuthSigner,
        setWeb3AuthSigner,
        accountAddress,
        setAccountAddress,
        sessionKeyProvider,
        setSessionKeyProvider,
        setUserinfo,
        userinfo,
        ecdsaProvider,
        setEcdsaProvider,
        openediter,
        setopenediter,
        registerUser,
        setRegisterUser,
        viewPostByUser,
        SetViewPostByUser,
        SetViewPosts,
        viewPosts,
        showcontent,
        setShowcontent,
        viewsinglePosts,
        SetViewsinglePosts,
        coreKitStatus,
        setCoreKitStatus,
        bookmark,
        SetBookmark,
        isLiked,
        setIsLiked,
        isEditPost,
        setIsEditPost,
        isEditdata,
        setIsEditdata,
        isReply,
        setReply,
        getid,
        setGetid,
        Token,
        setToken,
        isSidebar,
        setIsSidebar,
        viewComments,
        SetViewComments,
        isComment,
        setIsComment,
        isCommentdata,
        setIsCommentdata,
        checkuserlike,
        setCheckuserlike,
        checkuserlikeComment,
        setCheckuserlikeComment,
        postLikedByUser,
        setPostLikedByUser,
        viewSavedPostByUser,
        setViewSavedPostByUser,
        isreplycomment,
        setIsreplycomment,
        replycommentdata,
        setReplycommentdata,

        //function
        viewPostByUsers,
        sendApiRequest,
        viewSinglePost,
        ViewComments,
        ViewSavedPostByUser,
        CheckLikesclick,
        CheckCommentLike,
        PostLikedByUser,
      }}
    >
      {children}
    </Web3AuthSigner.Provider>
  );
}
