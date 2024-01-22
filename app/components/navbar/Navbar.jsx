"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { RiSearchLine } from "react-icons/ri";
import { HiMenu } from "react-icons/hi";
import { PiUserBold } from "react-icons/pi";
import Image from "next/image";
import logo from "../../../assets/images/Group 2952hd.png";
import Link from "next/link";
import { WEB3AUTH_NETWORK, Web3AuthMPCCoreKit } from "@web3auth/mpc-core-kit";
import { useWeb3AuthSigner } from "@/app/context/web3-auth-signer";
import Web3 from "web3";
import { LocalAccountSigner } from "@alchemy/aa-core";
import { generatePrivateKey } from "viem/accounts";
import { zeroAddress } from "viem";
import { FaCirclePlus } from "react-icons/fa6";
import {
  ECDSAProvider,
  getRPCProviderOwner,
  SessionKeyProvider,
  getPermissionFromABI,
} from "@zerodev/sdk";
import { contractABI } from "../abi/abi";
import Newtopic from "../newtopic/Newtopic";
import Example from "../Editer/Editer";

const selectedNetwork = WEB3AUTH_NETWORK.MAINNET;
const clientidweb3 = process.env.NEXT_PUBLIC_WEB3AUTH_CLIENTID;

const coreKitInstance = new Web3AuthMPCCoreKit({
  web3AuthClientId: clientidweb3,
  web3AuthNetwork: selectedNetwork,
  uxMode: "redirect",
  chainConfig: {
    chainNamespace: "eip155",
    chainId: "0xa4ba", // Chain ID for Arbitrum Nova
    rpcTarget: " https://nova.arbitrum.io/rpc ", // Official RPC endpoint
    displayName: "Arbitrum Nova",
    blockExplorer: "https://explorer.arbitrum.io/nova", // Official block explorer
    ticker: "NOVA",
    tickerName: "Nova",
  },
});

const Navbar = () => {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);
  const [web3, setWeb3] = useState();
  const [providercorkit, setProvidercorkit] = useState();
  const [coreKitStatus, setCoreKitStatus] = useState();
  const [isPopupOpen, setIsPopupOpen] = useState(false);

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
  } = useWeb3AuthSigner();

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Place the code that references window here
      // For example, if the error is at line 50:
      // Your code at line 50
    }
  }, []);

  useEffect(() => {
    if (coreKitInstance) {
      const init = async () => {
        await coreKitInstance.init();

        if (coreKitInstance.provider) {
          setWeb3AuthSigner(coreKitInstance.provider);
          setProvidercorkit(coreKitInstance.provider);
        }

        setCoreKitStatus(coreKitInstance.status);
        console.log("coreKitInstance.status-->", coreKitInstance.status);
      };
      init();
    }
  }, [setWeb3AuthSigner]);

  useEffect(() => {
    if (web3AuthSigner) {
      const userdata = coreKitInstance?.getUserInfo();
      setUserinfo(userdata);
      console.log("userdata-->", userdata);
    }
  }, [setUserinfo, web3AuthSigner]);

  useEffect(() => {
    if (web3AuthSigner) {
      const web3 = new Web3(web3AuthSigner);
      setWeb3(web3);
    }
  }, [web3AuthSigner]);

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
        console.log("chainid--->", chainId);
        return chainId;
      };
      getChainID();
    }
  }, [web3]);

  const logout = async () => {
    if (!coreKitInstance) {
      throw new Error("coreKitInstance not found");
    }
    await coreKitInstance.logout();
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
          console.log("address-->", address);

          setAccountAddress(address);
          setEcdsaProvider(ecdsaProvider);

          const sessionKeyProvider = await SessionKeyProvider.init({
            projectId: process.env.NEXT_PUBLIC_ZERODEV_PROJECT_ID,
            bundlerProvider: "PIMLICO",
            defaultProvider: ecdsaProvider,
            opts: {
              paymasterConfig: {
                onlySendSponsoredTransaction: true,
                policy: "VERIFYING_PAYMASTER",
              },
            },
            sessionKey,
            sessionKeyData: {
              validAfter: 0,
              validUntil: 0,
              permissions: [
                getPermissionFromABI({
                  target: contractAddress,
                  valueLimit: BigInt(0),
                  abi: contractABI,
                  functionName: "transfer",
                  args: [null, null],
                }),
              ],
              paymaster: zeroAddress,
            },
          });
          setSessionKeyProvider(sessionKeyProvider);
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

  return (
    <nav className="bg-black p-5  text-white">
      <div className="container mx-auto  sm:px-6 lg:px-8 flex justify-between items-center">
        <div className="flex justify-center items-center space-x-3">
          <Link href="/">
            <Image src={logo} height={60} alt="Picture of the author " />
          </Link>
        </div>

        <div className="flex justify-center items-center space-x-4">
          {coreKitStatus === "LOGGED_IN" ? (
            <>
              <div className="flex justify-center items-center gap-2">
                <button
                  className="flex items-center gap-2 bg-gray-200 bg-opacity-20 rounded-lg px-3 py-1"
                  onClick={() => setopenediter(true)}
                >
                  <FaCirclePlus />
                  <p>NEW TOPIC</p>
                </button>
              </div>
            </>
          ) : null}
          <div className="relative">
            <button className="text-white bg-slate-400 bg-opacity-20 px-2 py-1 rounded-xl flex justify-center items-center gap-2">
              <input
                type="text"
                placeholder="Search..."
                className="w-full md:px-2 px-1 py-1 bg-transparent outline-none"
              />
              <div className="md:pr-1.5">
                <RiSearchLine size={20} />
              </div>
            </button>
          </div>

          <div
            className="relative lg:hidden"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <HiMenu size={20} />
            {isHovered && (
              <div className="absolute top-full md:left-0 right-0 mt-1 p-5 bg-slate-700 bg-opacity-55 rounded-md shadow-md transition-all duration-300 z-10">
                <ul className="space-y-2">
                  <li>
                    <a
                      href="https://blokcapital.io"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-gray-300"
                    >
                      Website
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://docsend.com/view/qqzdvsv2q47g6t9y"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-gray-300"
                    >
                      Whitepaper
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://prototype.blokcapital.io"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-gray-300"
                    >
                      Prototype
                    </a>
                  </li>
                </ul>
              </div>
            )}
          </div>

          {/* Search Bar Icon */}
          {coreKitStatus === "LOGGED_IN" ? (
            <>
              <div className="flex justify-center items-center gap-2">
                <button className="" onClick={() => router.push("/about")}>
                  {userinfo?.profileImage && (
                    <Image
                      src={userinfo?.profileImage}
                      width={38}
                      height={38}
                      alt="Picture of the author"
                      className="rounded-full"
                    />
                  )}
                </button>
              </div>
            </>
          ) : (
            <button
              className="hidden lg:flex justify-center  items-center space-x-3 text-white cursor-pointer bg-gray-200 bg-opacity-20 rounded-3xl px-8 py-3"
              onClick={() => login()}
            >
              <PiUserBold size={20} />
              <p> LOGIN </p>
            </button>
          )}
        </div>
      </div>
      {isPopupOpen && <Newtopic />}

      <div
        className={`fixed bottom-0 left-0 w-full  flex  justify-center items-end p-6 transition-transform ease-in-out duration-500  ${
          openediter ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="bg-gray-900 p-5 !text-black md:w-4/5 w-3/5 h-96  overflow-auto rounded-xl border-t-4 border-rose-400">
          <Example />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
