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
export interface Web3AuthSignerContext {
  web3AuthSigner?: SafeEventEmitterProvider;
  setWeb3AuthSigner: React.Dispatch<
    React.SetStateAction<SafeEventEmitterProvider | undefined>
  >;

  sessionKeyProvider: any;
  setSessionKeyProvider: any;

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

  registerUser: any;
  setRegisterUser: React.Dispatch<React.SetStateAction<any>>;

  viewPostByUser: any;
  SetViewPostByUser: React.Dispatch<React.SetStateAction<any>>;

  viewPosts: any;
  SetViewPosts: React.Dispatch<React.SetStateAction<any>>;

  viewsinglePosts: any;
  SetViewsinglePosts: React.Dispatch<React.SetStateAction<any>>;

  showcontent: any;
  setShowcontent: React.Dispatch<React.SetStateAction<any>>;

  coreKitStatus: any;
  setCoreKitStatus: React.Dispatch<React.SetStateAction<any>>;

  bookmark: any;
  SetBookmark: React.Dispatch<React.SetStateAction<any>>;

  newpremises: boolean;
  setNewpremises: React.Dispatch<React.SetStateAction<boolean>>;

  isEditPost: boolean;
  setIsEditPost: React.Dispatch<React.SetStateAction<boolean>>;

  isReply: boolean;
  setReply: React.Dispatch<React.SetStateAction<boolean>>;

  isEditdata: any;
  setIsEditdata: React.Dispatch<React.SetStateAction<any>>;

  getid: any;
  setGetid: React.Dispatch<React.SetStateAction<any>>;

  Token: any;
  setToken: React.Dispatch<React.SetStateAction<any>>;

  //coreKitInstance: any;
  //setCoreKitInstance: React.Dispatch<React.SetStateAction<any>>;

  viewPostByUsers: () => Promise<void>;
  sendApiRequest: () => Promise<void>;
  viewSinglePost: () => Promise<void>;
  CheckLikesclick: () => Promise<void>;
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
  const [showcontent, setShowcontent] = useState<any>();
  const [coreKitStatus, setCoreKitStatus] = useState<any>();
  const [newpremises, setNewpremises] = useState<boolean>(false);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isEditPost, setIsEditPost] = useState<boolean>(false);
  const [isEditdata, setIsEditdata] = useState<any>(false);
  const [isReply, setReply] = useState<boolean>(false);
  const [Token, setToken] = useState<any>();
  const [getid, setGetid] = useState<any>();
  //const [coreKitInstance, setCoreKitInstance] = useState<any>();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const Token = localStorage.getItem("Token");
      setToken(Token);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const getid = localStorage.getItem("_id");
      setGetid(getid);
    }
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

  useEffect(() => {
    if (typeof window !== "undefined") {
      const getid = localStorage.getItem("_id");
      setGetid(getid);
    }
  }, []);

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

  const viewSinglePost = async () => {
    const storedData = localStorage.getItem("UserData");
    const storedData1 = storedData ? JSON.parse(storedData) : null;
    console.log(storedData1);
    const Id = [{ postIds: storedData1?._id }];

    try {
      await axiosInstanceAuth
        .get(`viewSinglePost/${getid}`, Id as any)
        .then((response) => {
          console.log("viewSinglePost API Response:", response.data.data);
          SetViewsinglePosts(response.data.data);
          setIsLiked(!isLiked);
        });
    } catch (error) {
      console.error("viewSinglePost API Error:", error);
    }
  };

  const ViewComments = async () => {
    const storedData = localStorage.getItem("UserData");
    const storedData1 = storedData ? JSON.parse(storedData) : null;
    console.log(storedData1);
    const Id = storedData1?._id;

    try {
      await axiosInstanceAuth.get(`viewComments/${getid}`).then((response) => {
        console.log("ViewComments API Response:", response);
      });
    } catch (error) {
      console.error("ViewComments API Error:", error);
    }
  };

  const viewSavedPostByUser = async () => {
    try {
      await axiosInstanceAuth.get(`viewSavedPostByUser`).then((response) => {
        console.log(
          "viewSavedPostByUser API Response:",
          response.data.data.savedPost
        );
      });
    } catch (error) {
      console.error("viewSavedPostByUser API Error:", error);
    }
  };

  const CheckLikesclick = async () => {
    try {
      await axiosInstanceAuth.get(`checkLikes/${getid}`).then((response) => {
        console.log("CheckLikesclick API Response:", response);
      });
    } catch (error) {
      console.error("CheckLikesclick API Error:", error);
    }
  };

  useEffect(() => {
    sendApiRequest();
    viewSavedPostByUser();
    if (Token) {
      viewPostByUsers();
    }
    if (getid) {
      viewSinglePost();
      CheckLikesclick();
      ViewComments();
    }
    if (coreKitStatus === "LOGGED_IN" && Token) {
      setNewpremises(true);
    }
  }, [Token, getid, coreKitStatus]);

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
        viewPostByUsers,
        sendApiRequest,
        showcontent,
        setShowcontent,
        viewsinglePosts,
        SetViewsinglePosts,
        coreKitStatus,
        setCoreKitStatus,
        newpremises,
        setNewpremises,
        bookmark,
        SetBookmark,
        isLiked,
        setIsLiked,
        viewSinglePost,
        isEditPost,
        setIsEditPost,
        isEditdata,
        setIsEditdata,
        isReply,
        setReply,
        CheckLikesclick,
        getid,
        setGetid,
        Token,
        setToken,
        //coreKitInstance,
        //setCoreKitInstance,
      }}
    >
      {children}
    </Web3AuthSigner.Provider>
  );
}
