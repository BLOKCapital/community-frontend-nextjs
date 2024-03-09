"use client";
import { useEffect, useRef, useState } from "react";
import { RiAccountPinCircleFill, RiSearchLine } from "react-icons/ri";
import { HiMenu } from "react-icons/hi";
import { PiUserBold } from "react-icons/pi";
import Image from "next/image";
import logo from "../../assets/images/MianBlokclogo.png";
import Link from "next/link";
import Web3 from "web3";
import { FaAngleRight, FaCirclePlus } from "react-icons/fa6";
import { useWeb3AuthSigner } from "../../context/web3-auth-signer";
import {
  COREKIT_STATUS,
  WEB3AUTH_NETWORK,
  Web3AuthMPCCoreKit,
} from "@web3auth/mpc-core-kit";
import {
  ECDSAProvider,
  getRPCProviderOwner,
  SessionKeyProvider,
  getPermissionFromABI,
} from "@zerodev/sdk";
import { LocalAccountSigner } from "@alchemy/aa-core";
import { generatePrivateKey } from "viem/accounts";
import { TbLogout } from "react-icons/tb";
import { MdDone } from "react-icons/md";
import { BsCopy } from "react-icons/bs";
import axiosInstanceAuth from "../apiInstances/axiosInstanceAuth";
import Example from "../Editer/Editer";
import toast, { Toaster } from "react-hot-toast";
import { zeroAddress } from "viem";
import { BiMenu } from "react-icons/bi";
import clipboardCopy from "clipboard-copy";
import { CgClose } from "react-icons/cg";

const Navbar = () => {
  const modalRef = useRef(null);
  const [coreKitInstance, setCoreKitInstance] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [web3, setWeb3] = useState();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [copy, setcopy] = useState(false);
  const [Token, setToken] = useState("false");
  const [storedData1, setStoredData1] = useState("");
  const {
    setWeb3AuthSigner,
    web3AuthSigner,
    accountAddress,
    setAccountAddress,
    setSessionKeyProvider,
    setUserinfo,
    userinfo,
    setEcdsaProvider,
    setSessionethProvider,
    openediter,
    setopenediter,
    setRegisterUser,
    coreKitStatus,
    setCoreKitStatus,

    isSidebar,
    setIsSidebar,
  } = useWeb3AuthSigner();

  const uiConsole = (...args) => {
    const el = document.querySelector("#console>p");
    if (el) {
      el.innerHTML = JSON.stringify(args || {}, null, 2);
    }
    console.log(...args);
  };
  useEffect(() => {
    const initMPC = async () => {
      try {
        const selectedNetwork = WEB3AUTH_NETWORK.MAINNET;
        const clientidweb3 = process.env.NEXT_PUBLIC_WEB3AUTH_CLIENTID;

        const coreKitInstance = new Web3AuthMPCCoreKit({
          web3AuthClientId: clientidweb3,
          web3AuthNetwork: selectedNetwork,
          uxMode: "redirect",
          chainConfig: {
            chainNamespace: "eip155",
            chainId: "0xa4ba",
            rpcTarget: "https://nova.arbitrum.io/rpc",
            displayName: "Arbitrum Nova",
            blockExplorer: "https://explorer.arbitrum.io/nova",
            ticker: "NOVA",
            tickerName: "Nova",
          },
        });

        await coreKitInstance.init();

        setCoreKitInstance(coreKitInstance);
        setCoreKitStatus(coreKitInstance.status);
        //console.log("coreKitInstance-->", coreKitInstance);
        if (coreKitInstance.provider) {
          const web3Instance = new Web3(coreKitInstance.provider);
          setWeb3(web3Instance);
          setWeb3AuthSigner(coreKitInstance.provider);
          const userdata = coreKitInstance?.getUserInfo();
          setUserinfo(userdata);
          //console.log("userdata-->", userdata);

          //const postboxKey = coreKitInstance.getKeyDetails();
          //uiConsole(postboxKey);
          //console.log("coreKitInstance-->", coreKitInstance);
        }
      } catch (error) {
        console.error("Error initializing MPC Core Kit:", error);
      }
    };

    initMPC();
  }, [setCoreKitStatus, setUserinfo, setWeb3AuthSigner]);

  const settingpage = () => {
    setOpenPopup(false);
  };

  useEffect(() => {
    // Perform localStorage action
    const storedData = localStorage.getItem("UserData");
    const storedData2 = storedData ? JSON.parse(storedData) : null;
    setStoredData1(storedData2);
    const Token = localStorage.getItem("Token");
    setToken(Token);
  }, []);

  //useEffect(() => {
  //  if (coreKitInstance) {
  //    const init = async () => {
  //      await coreKitInstance.init();

  //      if (coreKitInstance.provider) {
  //        setWeb3AuthSigner(coreKitInstance.provider);
  //      }

  //      setCoreKitStatus(coreKitInstance.status);
  //      console.log("coreKitInstance.status-->", coreKitInstance.status);
  //    };
  //    init();
  //  }
  //}, [setCoreKitStatus, setWeb3AuthSigner]);

  const notify = () => {
    if (accountAddress) {
      void clipboardCopy(accountAddress);
      toast.success("Address Copied!");
      setcopy(true);
      setTimeout(() => {
        setcopy(false);
      }, 100);
    }
  };

  const formatDate = (dateString) => {
    const options = { day: "numeric", month: "short", year: "numeric" };
    const formattedDate = new Date(dateString).toLocaleDateString(
      "en-US",
      options
    );
    return formattedDate;
  };

  useEffect(() => {
    const delayLoading = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(delayLoading);
  }, []);

  //useEffect(() => {
  //  if (web3AuthSigner) {
  //    const web3 = new Web3(web3AuthSigner);
  //    setWeb3(web3);
  //  }
  //}, [web3AuthSigner]);

  const login = async () => {
    try {
      if (!coreKitInstance) {
        throw new Error("initiated to login");
      }
      // console.log("1");
      const verifierConfig = {
        subVerifierDetails: {
          typeOfLogin: "google",
          verifier: "blok-capital",
          clientId: process.env.NEXT_PUBLIC_GOOGLE_ID,
        },
      };

      await coreKitInstance.loginWithOauth(verifierConfig);

      if (coreKitInstance.status === COREKIT_STATUS.REQUIRED_SHARE) {
        console.log(
          "required more shares, please enter your backup/ device factor key, or reset account unrecoverable once reset, please use it with caution]"
        );
        //setResetaccount(true);
      }

      if (coreKitInstance.provider) {
        setWeb3AuthSigner(coreKitInstance.provider);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (web3) {
      const getChainID = async () => {
        if (!web3) {
          console.log("web3 not initialized yet");
          return;
        }
        const chainId = await web3.eth.getChainId();
        //console.log("chainid--->", chainId);
        return chainId;
      };
      getChainID();
    }
  }, [web3]);

  useEffect(() => {
    if (web3AuthSigner && coreKitInstance.status === "") {
      const userdata = coreKitInstance?.getUserInfo();
      setUserinfo(userdata);
      //console.log("userdata-->", userdata);
    }
  }, [coreKitInstance, setUserinfo, web3AuthSigner]);

  const logout = async () => {
    //console.log("logout");
    if (!coreKitInstance) {
      throw new Error("coreKitInstance not found");
    }
    await coreKitInstance.logout();

    setWeb3AuthSigner(undefined);
    setAccountAddress(undefined);
    setCoreKitStatus(undefined);
    setOpenPopup(false);
    localStorage.clear();
  };

  useEffect(() => {
    if (web3AuthSigner) {
      const sessionKey = LocalAccountSigner.privateKeyToAccountSigner(
        generatePrivateKey()
      );

      const contractAddress = "0xdAC17F958D2ee523a2206206994597C13D831ec7";
      //const contractAddresseth = "0x377Fdd37E53E5036aBeA0e8b2203AE6750812446";
      const ecdcfunction = async () => {
        if (web3AuthSigner) {
          const ecdsaProvider = await ECDSAProvider.init({
            projectId: process.env.NEXT_PUBLIC_ZERODEV_PROJECT_ID,
            owner: getRPCProviderOwner(web3AuthSigner),
          });
          const address = await ecdsaProvider.getAddress();
          //console.log("ecdsaProvider-->", ecdsaProvider);

          setAccountAddress(address);
          setEcdsaProvider(ecdsaProvider);

          //const sessionKeyProvider = await SessionKeyProvider.init({
          //  projectId: process.env.NEXT_PUBLIC_ZERODEV_PROJECT_ID,
          //  bundlerProvider: "PIMLICO",
          //  defaultProvider: ecdsaProvider,
          //  opts: {
          //    paymasterConfig: {
          //      onlySendSponsoredTransaction: true,
          //      policy: "VERIFYING_PAYMASTER",
          //    },
          //  },
          //  sessionKey,
          //  sessionKeyData: {
          //    validAfter: 0,
          //    validUntil: 0,
          //    permissions: [
          //      //getPermissionFromABI({
          //      //  target: contractAddress,
          //      //  valueLimit: BigInt(0),
          //      //  abi: contractABI,
          //      //  functionName: "transfer",
          //      //  args: [null, null],
          //      //}),
          //    ],
          //    paymaster: zeroAddress,
          //  },
          //});
        }
      };
      ecdcfunction();
    }
  }, [
    setAccountAddress,
    setEcdsaProvider,
    setSessionKeyProvider,
    setSessionethProvider,
    web3AuthSigner,
  ]);

  useEffect(() => {
    if (!Token) {
      if (accountAddress) {
        const sendApiRequest = async () => {
          const dataToSend = {
            wallet: accountAddress,
            email: userinfo?.email,
            username: userinfo?.name,
            userImage: userinfo?.profileImage,
          };
          //console.log("registerUser dataToSend--->", dataToSend);

          try {
            await axiosInstanceAuth
              .post(`registerUser`, dataToSend)
              .then((response) => {
                //console.log("registerUser Response:", response);
                //console.log("message-->", response.data.data.checkUser);
                localStorage.setItem("Token", response.data.data.token);
                setRegisterUser(response.data.data.userData);
                localStorage.setItem(
                  "UserData",
                  JSON.stringify(response.data.data.userData)
                );
                toast.success(response.data.message);
              });
          } catch (error) {
            console.error("RegisterUser API Error:", error);
          }
        };
        sendApiRequest();
      }
    }
  }, [
    Token,
    accountAddress,
    setRegisterUser,
    userinfo?.email,
    userinfo?.name,
    userinfo?.profileImage,
  ]);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setOpenPopup(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div className="bg-black text-white">
      <div className="container mx-auto sm:px-6 py-2 lg:px-5 flex justify-between items-center">
        <div className="flex justify-center items-center gap-2">
          <div
            onClick={() => setIsSidebar(!isSidebar)}
            className="cursor-pointer lg:hidden block"
          >
            <BiMenu size={30} />
          </div>
          <div className="flex justify-center items-center space-x-3">
            <Link href="/">
              <div className="md:w-52 w-20 h-auto">
                <Image src={logo} alt="Logo" layout="responsive" />
              </div>
            </Link>
          </div>
        </div>

        <div className="flex justify-center items-center space-x-4">
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
          <div
            className="relative lg:block hidden"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="bg-gray-200 bg-opacity-20 px-2 py-2 rounded-full">
              <HiMenu size={20} />
            </div>
            {isHovered && (
              <div className="absolute top-full md:left-0 w-36 right-5 mt-2 p-5  bg-gray-700 rounded-md shadow-md transition-all duration-300 z-40">
                <div>
                  <a
                    href="https://blokcapital.io"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-gray-300"
                  >
                    Website
                  </a>
                </div>
                <div>
                  <a
                    href="https://docsend.com/view/qqzdvsv2q47g6t9y"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-gray-300"
                  >
                    Whitepaper
                  </a>
                </div>
                <div>
                  <a
                    href="https://prototype.blokcapital.io"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-gray-300"
                  >
                    Prototype
                  </a>
                </div>
              </div>
            )}
          </div>
          {/*<div className="relative md:block hidden">
            <button className="text-white bg-slate-400 bg-opacity-20 px-2 py-1 rounded-xl flex justify-center items-center gap-2">
              <input
                type="text"
                placeholder="Search..."
                className="w-48 md:px-2 px-1 py-1 bg-transparent outline-none"
              />
              <div className="md:pr-1.5">
                <RiSearchLine size={20} />
              </div>
            </button>
          </div>*/}
          <div className="">
            {coreKitStatus === "LOGGED_IN" ? (
              <>
                <div className="flex justify-center items-center gap-2">
                  <button className="" onClick={() => setOpenPopup(!openPopup)}>
                    <Image
                      src={userinfo?.profileImage}
                      width={38}
                      height={38}
                      alt="Profile"
                      className="rounded-full"
                    />
                  </button>
                  {openPopup && (
                    <div
                      className="fixed top-0 right-0 w-full h-full flex xl:items-start items-center md:items-start xl:justify-end md:justify-end justify-center "
                      ref={modalRef}
                    >
                      <div className="bg-gray-700 rounded-3xl  xl:mr-24 mr-0 md:mr-5 md:mt-20 xl:mt-20 mt-0">
                        <div
                          className="text-white flex justify-end p-3 cursor-pointer"
                          onClick={() => setOpenPopup(false)}
                        >
                          <CgClose size={20} />
                        </div>
                        <div className="px-8 py-3">
                          <div className="flex flex-col space-y-1 justify-center items-center pb-8">
                            <Image
                              src={userinfo?.profileImage}
                              width={100}
                              height={100}
                              alt="Profile"
                              className="rounded-full"
                            />
                            <p className="font-bold text-lg">
                              {userinfo?.name}
                            </p>

                            <div className="flex justify-center items-center gap-2">
                              <div className="flex justify-center items-center gap-2">
                                <p className="font-semibold">AA wallet: </p>
                                <p>
                                  {accountAddress
                                    ? accountAddress.slice(0, 3) +
                                      "...." +
                                      accountAddress.slice(-3)
                                    : null}
                                </p>
                              </div>

                              <div
                                onClick={() => notify()}
                                className="cursor-pointer"
                              >
                                {copy ? (
                                  <MdDone size={15} />
                                ) : (
                                  <BsCopy size={15} />
                                )}
                              </div>
                            </div>
                            <p className="text-sm ">{userinfo?.email}</p>
                            <p className="text-xs ">
                              Last Update:
                              {storedData1 ? (
                                <span className="text-xm ">
                                  {formatDate(storedData1.createdAt)}
                                </span>
                              ) : null}
                            </p>
                          </div>
                          <hr />
                          <Link href="/my-posts">
                            <div
                              className="flex flex-row items-center justify-between cursor-pointer hover:scale-105 py-4 hover:font-bold"
                              onClick={() => settingpage()}
                            >
                              <div className="flex flex-row gap-2 items-center justify-between ">
                                <RiAccountPinCircleFill size={20} />
                                <p className="">Account</p>
                              </div>
                              <div>
                                <FaAngleRight size={20} />
                              </div>
                            </div>
                          </Link>
                          <hr />
                          <Link href="/">
                            <div
                              onClick={() => logout()}
                              className="flex flex-row gap-2 items-center justify-between py-4 disconnect cursor-pointer hover:font-bold hover:scale-105"
                            >
                              <div className="flex flex-row gap-2 items-center justify-between ">
                                <TbLogout size={20} />
                                <p className="text-[#FF4085]">Disconnect</p>
                              </div>
                              <div>
                                <FaAngleRight size={20} />
                              </div>
                            </div>
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <button
                className="flex justify-center items-center space-x-3 text-white cursor-pointer bg-gray-200 bg-opacity-20 rounded-3xl px-2 py-2"
                onClick={() => !isLoading && login()}
              >
                {isLoading ? (
                  <div className=" ">
                    <svg
                      aria-hidden="true"
                      className="w-5 h-5 text-gray-200 animate-spin dark:text-white fill-blue-600"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                  </div>
                ) : (
                  <>
                    <PiUserBold size={20} />
                  </>
                )}
                <p> LOGIN </p>
              </button>
            )}
            <Toaster position="top-right" />
          </div>
        </div>
      </div>

      <div
        className={`fixed bottom-0 left-0 w-full flex justify-center items-end  transition-transform ease-in-out duration-700 z-[999999] ${
          openediter ? "translate-y-10" : "translate-y-full"
        }`}
      >
        <div className="bg-gray-900 pb-10  p-5 !text-black md:w-4/5 w-full rounded-xl border-t-4 border-rose-400">
          <Example />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
