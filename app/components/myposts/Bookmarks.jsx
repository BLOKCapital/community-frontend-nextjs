import React from "react";
import { useWeb3AuthSigner } from "../../context/web3-auth-signer";
import Image from "next/image";
import Link from "next/link";
//import { useRouter } from "next/router";

const Bookmarks = () => {
  const {
    viewSavedPostByUser,
    setShowcontent,
    viewSinglePost,
    userinfo,
    optionsdata,
    postLikedByUser,
  } = useWeb3AuthSigner();
  //console.log("🚀 ~ Bookmarks ~ viewSavedPostByUser:", viewSavedPostByUser);

  const formatTitle = (title) => {
    // Your implementation here
    return title?.toLowerCase()?.replace(/\s+/g, "-");
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
    viewSinglePost(e);
    localStorage.setItem("_id", e);
  };
  return (
    <>
      {userinfo ? (
        <>
          {viewSavedPostByUser && viewSavedPostByUser?.length > 0 ? (
            <>
              {viewSavedPostByUser?.map((likedItem, index) => (
                <div
                  className="rounded-xl cursor-pointer mb-2 hover:bg-slate-300  hover:rounded-xl"
                  key={index}
                >
                  <Link
                    href={`/my-posts/${formatTitle(
                      likedItem?.postData[0]?.title
                    )}`}
                  >
                    <div
                      className="bg-slate-800 bg-opacity-90 rounded-xl flex flex-col md:flex-row justify-between items-center gap-2 p-2"
                      onClick={() => Opencontent(likedItem?.postData[0]?._id)}
                    >
                      <div className="flex items-center space-x-2 space-y-2">
                        <div className="px-2">
                          {likedItem?.postData[0]?.images &&
                          !Array.isArray(likedItem?.postData[0]?.images) ? (
                            <Image
                              src={likedItem?.postData[0]?.images}
                              alt="Image"
                              height={50}
                              width={50}
                              className="rounded-full "
                            />
                          ) : (
                            Array.isArray(likedItem?.postData[0]?.images) &&
                            likedItem?.postData[0]?.images?.map(
                              (image, imageIndex) => (
                                <Image
                                  key={imageIndex}
                                  src={image}
                                  alt={`Image ${imageIndex}`}
                                  height={50}
                                  width={50}
                                  className="rounded-full"
                                />
                              )
                            )
                          )}
                        </div>
                        <div className="">
                          <div className="cursor-pointer font-semibold text-lg">
                            <p>{likedItem?.postData[0]?.title}</p>
                            <div className="flex items-center gap-2 py-1">
                              {optionsdata?.find(
                                (option) =>
                                  option?.name ===
                                  likedItem?.postData[0]?.subject
                              ) && (
                                <span
                                  className={`p-1.5 rounded-full ${
                                    optionsdata?.find(
                                      (option) =>
                                        option?.name ===
                                        likedItem?.postData[0]?.subject
                                    )?.color
                                  }`}
                                ></span>
                              )}
                              {likedItem?.postData[0]?.subject && (
                                <p className="text-sm  font-light">
                                  {likedItem?.postData[0]?.subject}
                                </p>
                              )}
                            </div>
                          </div>

                          {/*<div className="px-2 py-1">
                            {likedItem?.postData &&
                              likedItem?.postData[0]?.content && (
                                <div
                                  dangerouslySetInnerHTML={{
                                    __html:
                                      likedItem?.postData[0]?.content?.slice(
                                        0,
                                        200
                                      ) + "...",
                                  }}
                                />
                              )}
                          </div>*/}
                        </div>
                      </div>
                      <div className="flex items-center text-slate-300 text-sm space-y-2 md:pl-2">
                        <p>{formatDate(likedItem?.createdAt)}</p>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </>
          ) : (
            <div className="flex justify-center items-center">
              <p>There is no Topic Save.</p>
            </div>
          )}
        </>
      ) : (
        <div className="shadow rounded-md p-4 mx-auto animate-pulse bg-slate-800 bg-opacity-90">
          <div className="flex space-x-4  w-96">
            <div className="rounded-full bg-slate-700 h-10 w-10"></div>
            <div className="flex flex-col space-y-3 w-full">
              <div className="flex justify-between w-full bg-slate-700 rounded space-y-6 py-1"></div>
              <div className="h-2 bg-slate-700 rounded w-20"></div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Bookmarks;
