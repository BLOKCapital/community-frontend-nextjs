import React from "react";
import { useWeb3AuthSigner } from "../../context/web3-auth-signer";
import Image from "next/image";
import Link from "next/link";
//import { useRouter } from "next/router";

const All = () => {
  const {
    viewPostByUser,
    setShowcontent,
    viewSinglePost,
    userinfo,
    optionsdata,
  } = useWeb3AuthSigner();
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
    viewSinglePost(e);
    localStorage.setItem("_id", e);
  };
  console.log("viewPostByUser", viewPostByUser);
  return (
    <>
      {userinfo ? (
        <>
          {viewPostByUser && viewPostByUser.length > 0 ? (
            <>
              {viewPostByUser.map((item, index) => (
                <div
                  className={`rounded-xl cursor-pointer mb-2 hover:bg-slate-300  hover:rounded-xl`}
                  key={index}
                >
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
                              className="rounded-full"
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
                                className="rounded-full"
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
                            {optionsdata?.find(
                              (option) => option?.name === item?.subject
                            ) && (
                              <span
                                className={` p-1.5 rounded-full ${
                                  optionsdata?.find(
                                    (option) => option?.name === item?.subject
                                  )?.color
                                }`}
                              ></span>
                            )}
                            {item.subject && item.userData.length > 0 && (
                              <p className="text-sm  font-light">
                                {item.subject}
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
                </div>
              ))}
            </>
          ) : (
            <div className="flex justify-center items-center">
              <p>There is no Topic.</p>
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

export default All;
