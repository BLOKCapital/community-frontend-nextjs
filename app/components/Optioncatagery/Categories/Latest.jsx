"use client";
import React from "react";
import Image from "next/image";
import { useWeb3AuthSigner } from "@/app/context/web3-auth-signer";
import Link from "next/link";

const Latest = () => {
  const { viewPosts, setShowcontent } = useWeb3AuthSigner();

  const formatDate = (dateString) => {
    const options = { day: "numeric", month: "short", year: "numeric" };
    const formattedDate = new Date(dateString).toLocaleDateString(
      "en-US",
      options
    );
    return formattedDate;
  };

  const Opencontent = (e) => {
    setShowcontent(e);
    localStorage.setItem("_id", e);
  };

  const formatTitle = (title) => {
    // Your implementation here
    return title.toLowerCase().replace(/\s+/g, "-");
  };

  return (
    <>
      <div className="text-xl font-semibold py-3">
        <div>Latest</div>
      </div>
      <>
        {viewPosts ? (
          <>
            {viewPosts.map((item, index) => (
              <div
                className={`rounded-xl cursor-pointer mb-2 hover:bg-slate-300  hover:rounded-xl`}
                key={index}
              >
                <Link href={`/${formatTitle(item.title)}`}>
                  <div
                    className="bg-slate-800 bg-opacity-90 rounded-xl flex flex-col md:flex-row justify-between items-center gap-2 p-2"
                    onClick={() => Opencontent(item._id)}
                  >
                    <div className="flex items-center space-x-2 space-y-2">
                      <div className="px-2">
                        {item.images && !Array.isArray(item.images) ? (
                          <Image
                            src={item.images}
                            alt="Image"
                            height={50}
                            width={50}
                            className="rounded-full bg-white"
                          />
                        ) : (
                          // Handle array of images
                          Array.isArray(item.images) &&
                          item.images.map((image, imageIndex) => (
                            <Image
                              key={imageIndex}
                              src={image}
                              alt={`Image ${imageIndex}`}
                              height={50}
                              width={50}
                              className="rounded-full bg-white"
                            />
                          ))
                        )}
                      </div>
                      <div className="">
                        <div className={`cursor-pointer space-y-3 break-words`}>
                          <p className="sm:w-40 md:w-56 lg:w-64 xl:w-72">
                            {item.title}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2 py-1">
                          <span className="bg-[#1C64F2] p-1.5 rounded-full"></span>
                          {item.userData && item.userData.length > 0 && (
                            <p className="text-xs font-light">
                              {item.userData[0].username}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center text-slate-300 text-sm space-y-2 md:pl-2">
                      {formatDate(item.createdAt)}
                    </div>
                  </div>
                </Link>
              </div>
            ))}{" "}
          </>
        ) : (
          <p>Loding...</p>
        )}
      </>
    </>
  );
};

export default Latest;
