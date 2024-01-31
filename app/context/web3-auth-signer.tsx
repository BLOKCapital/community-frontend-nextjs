"use client";
import { type SafeEventEmitterProvider } from "@web3auth/base";
import { createContext, useContext, useEffect, useState } from "react";
import React from "react";
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

  viewPostByUsers: () => Promise<void>;
  sendApiRequest: () => Promise<void>;
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
  const [viewsinglePosts, SetViewsinglePosts] = useState<any>();
  const [showcontent, setShowcontent] = useState<any>();
  const Token = localStorage.getItem("Token");
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
    const getid = localStorage.getItem("_id");

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
    try {
      await axiosInstanceAuth
        .get(`viewSinglePost/${getid}`)
        .then((response) => {
          console.log("viewSinglePost API Response:", response.data.data.post);
          SetViewsinglePosts(response.data.data.post);
        });
    } catch (error) {
      console.error("viewSinglePost API Error:", error);
    }
  };

  useEffect(() => {
    if ( getid) {
      viewSinglePost();
    }
  }, [showcontent]);

  useEffect(() => {
    sendApiRequest();
    if (Token) {
      viewPostByUsers();
    }
  }, [Token]);

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
      }}
    >
      {children}
    </Web3AuthSigner.Provider>
  );
}
