"use client";
import React from "react";
import Image from "next/image";
import { useWeb3AuthSigner } from "@/app/context/web3-auth-signer";

const Page = () => {
  const { viewsinglePosts } = useWeb3AuthSigner();
  console.log("showcontent-->", viewsinglePosts);

  const formatDate = (dateString) => {
    const options = { day: "numeric", month: "short" };
    const formattedDate = new Date(dateString).toLocaleDateString(
      "en-US",
      options
    );
    return formattedDate;
  };
  return (
    <>
      <div className="border-t-4 border-amber-600 rounded-xl w-full text-white">
        <div className="bg-gray-800 bg-opacity-90 rounded-xl overflow-x-auto ">
          {viewsinglePosts ? (
            viewsinglePosts.map((post) => (
              <div
                key={post._id}
                className="md:p-8 p-3 text-white space-y-3 border-b border-gray-600"
              >
                <h3>{post.title}</h3>
                <div
                  dangerouslySetInnerHTML={{
                    __html: post.content,
                  }}
                />
                <p>Published on: {formatDate(post.createdAt)}</p>
              </div>
            ))
          ) : (
            <p>Something Missing</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Page;
