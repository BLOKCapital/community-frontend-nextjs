import React from "react";
import { useWeb3AuthSigner } from "@/app/context/web3-auth-signer";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

const All = () => {
  const { viewPostByUser, setShowcontent } = useWeb3AuthSigner();
  const formatTitle = (title) => {
    // Your implementation here
    return title.toLowerCase().replace(/\s+/g, "-");
  };
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
                        <Link href={`/my-posts/${formatTitle(item.title)}`}>
                          <div
                            className={`cursor-pointer space-y-3 font-semibold text-lg`}
                            onClick={() => Opencontent(item._id)}
                          >
                            <p>{item.title}</p>
                          </div>
                        </Link>
                        <div className="flex items-center gap-2 py-1">
                          <span className="bg-[#1C64F2] p-1.5 rounded-full"></span>
                          {item.userData && item.userData.length > 0 && (
                            <p className="text-sm  font-light">
                              {item.userData[0].username}
                            </p>
                          )}
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
