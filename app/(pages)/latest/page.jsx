import React from "react";
import Image from "next/image";

import { useWeb3AuthSigner } from "@/app/context/web3-auth-signer";

const Latest = () => {
  const { viewPosts } = useWeb3AuthSigner();

  const formatDate = (dateString) => {
    const options = { day: "numeric", month: "short", year: "numeric" };
    const formattedDate = new Date(dateString).toLocaleDateString(
      "en-US",
      options
    );
    return formattedDate;
  };
  return (
    <>
      <div className="text-xl font-semibold py-3">
        <div>Latest</div>
      </div>
      <>
        {viewPosts ? (
          <>
            {" "}
            {viewPosts.map((item, index) => (
              <div
                className={`rounded-xl cursor-pointer mb-2 hover:bg-slate-300  hover:rounded-xl`}
                key={index}
              >
                <div className="bg-slate-800 bg-opacity-90 rounded-xl flex flex-col md:flex-row justify-between items-center gap-2 p-2">
                  <div className="flex items-center space-x-2 space-y-2">
                    <div className="px-2">
                      {item.images && (
                        <Image
                          src={item.images}
                          alt="Image"
                          height={50}
                          width={50}
                          className="rounded-full bg-white"
                        />
                      )}
                    </div>
                    <div className="">
                      <div className={`cursor-pointer space-y-3 break-words`}>
                        <p className="sm:w-40 md:w-48 lg:w-56 xl:w-64">
                          {item.title}
                        </p>
                      </div>
                      <div className="flex items-center">
                        <p
                          style={{
                            backgroundColor: item.color,
                            padding: "6px",
                            margin: "10px",
                            color: "white",
                          }}
                        ></p>
                        {item.maintitle}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center text-slate-300 text-sm space-y-2 md:pl-2">
                    {formatDate(item.createdAt)}
                  </div>
                </div>
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
