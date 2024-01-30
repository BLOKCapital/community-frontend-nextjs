import React from "react";
import { useWeb3AuthSigner } from "@/app/context/web3-auth-signer";
import Image from "next/image";
import Link from "next/link";

const All = () => {
  const { viewPostByUser } = useWeb3AuthSigner();
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
      {viewPostByUser ? (
        //<div>
        //  {viewPostByUser.map((post) => (
        //    <div key={post._id}>
        //      <h2>{post.title}</h2>
        //      <p>{post.content}</p>
        //      <Image
        //        src={post.images}
        //        width={20}
        //        height={20}
        //        alt="Post Thumbnail"
        //      />
        //      <p>Created At: {post.createdAt}</p>
        //      <p>Updated At: {post.updatedAt}</p>
        //    </div>
        //  ))}
        //</div>
        <>
          {viewPostByUser.map((item, index) => (
            <div
              className={`rounded-xl cursor-pointer mb-2 hover:bg-slate-300  hover:rounded-xl`}
              key={index}
            >
              {item ? (
                <>
                  {/*<Link
                href={`/[questions]`}
                as={`/${item.title.replace(/\s+/g, "-").toLowerCase()}`}
                passHref
                replace
              >*/}
                  <div className="bg-slate-800 bg-opacity-90 rounded-xl flex flex-col md:flex-row justify-between items-center gap-2 p-2">
                    <div className="flex items-center space-x-2 space-y-2">
                      <div className="px-2">
                        {item.images && (
                          <Image
                            src={item.images}
                            alt="Question Image"
                            height={50}
                            width={50}
                            className="rounded-full bg-white"
                          />
                        )}
                      </div>
                      <div className="">
                        <div
                          className={`cursor-pointer space-y-3 font-semibold text-xl`}
                        >
                          <p>{item.title}</p>
                        </div>
                        <div className="flex items-center">
                          {/*<p
                        style={{
                          backgroundColor: item.color,
                          padding: "6px",
                          margin: "10px",
                          color: "white",
                        }}
                      ></p>*/}
                          {/*<div dangerouslySetInnerHTML={{ __html: item.content }} />*/}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center text-slate-300 text-sm space-y-2 md:pl-2">
                      <p>{formatDate(item.createdAt)}</p>
                      {/*<p>{item.days}</p>*/}
                    </div>
                  </div>
                  {/*</Link>*/}
                </>
              ) : (
                <p>No Data</p>
              )}
            </div>
          ))}
        </>
      ) : (
        <p>Loding...</p>
      )}
    </>
  );
};

export default All;
