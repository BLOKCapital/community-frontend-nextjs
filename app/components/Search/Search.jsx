"use client";
import React, { useState } from "react";
import { GrFormClose } from "react-icons/gr";
import { RiSearchLine } from "react-icons/ri";
import Link from "next/link";
import { useWeb3AuthSigner } from "../../context/web3-auth-signer";
import { usePathname } from "next/navigation";

const Searchall = () => {
  const pathname = usePathname();
  const {
    searchResults,
    setSearchResults,
    searchInput,
    setSearchInput,
    showPopup,
    setShowPopup,
    handleKeyDown,
    viewSinglePost,
    setShowcontent,
  } = useWeb3AuthSigner();

  const handleInputChange = (e) => {
    const input = e?.target?.value;
    setSearchInput(input);
  };

  const clearInput = () => {
    setSearchInput("");
    setShowPopup(false);
    setSearchResults();
  };

  const Opencontent = (e) => {
    setShowcontent(e);
    viewSinglePost(e);
    localStorage?.setItem("_id", e);
  };

  const formatTitle = (title) => {
    return title?.toLowerCase()?.replace(/\s+/g, "-");
  };

  const formatDate = (dateString) => {
    const options = { day: "numeric", month: "short" };
    const formattedDate = new Date(dateString)?.toLocaleDateString(
      "en-US",
      options
    );
    return formattedDate;
  };

  return (
    <div className="flex flex-col w-full justify-center items-center ">
      <div className={`md:w-[80vh]  w-full  `}>
        <div className="flex-col space-y-3 items-center ">
          <div
            className={`font-semibold text-2xl ${
              pathname === "/" ? "hidden" : "block "
            }`}
          >
            {searchResults ? (
              searchResults?.length + " " + "+result of " + " " + searchInput
            ) : (
              <p>Search</p>
            )}
          </div>
          <div
            className={`relative flex items-center justify-between w-full  py-2 bg-white text-black rounded-md `}
          >
            <input
              type="text"
              placeholder="Search..."
              value={searchInput}
              onChange={handleInputChange}
              className="ml-2 md:w-[80vh] outline-none "
            />

            <div className="flex gap-2 px-2 cursor-pointer">
              {searchInput ? (
                <GrFormClose size={23} onClick={clearInput} />
              ) : null}
              <RiSearchLine size={23} />
            </div>
          </div>
        </div>
      </div>

      {pathname === "/" && showPopup ? (
        <>
          {searchResults && (
            <div className="absolute md:top-[46%] lg:top-96 xl:top-80 top-[54%] text-white text-lg  ">
              <div className="flex justify-center">
                <div className="bg-slate-800 bg-opacity-100  rounded-lg p-3 md:w-[81vh] ">
                  <div className="space-y-3">
                    {searchResults?.map((result, index) => (
                      <div
                        key={index}
                        className="cursor-pointer hover:bg-slate-300 hover:bg-opacity-5 px-3 py-2 rounded-lg text-sm"
                        onClick={() => Opencontent(result?._id)}
                      >
                        <div className="flex justify-between">
                          <div>
                            <Link href={`/${formatTitle(result?.title)}`}>
                              <p>{result?.title}</p>
                              {result?.content ? (
                                <div
                                  dangerouslySetInnerHTML={{
                                    __html:
                                      result?.content?.slice(0, 80) + "...",
                                  }}
                                />
                              ) : null}
                            </Link>
                          </div>
                          <div>
                            {result?.createdAt ? (
                              <p>{formatDate(result?.createdAt)}</p>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    ))}
                    {searchResults?.length === 0 && (
                      <div className="px-3 py-2 text-sm">No results found</div>
                    )}
                    {searchResults?.length > 5 && (
                      <Link href={`/search`}>
                        <div className="cursor-pointer hover:bg-slate-300 hover:bg-opacity-5 px-3 py-2 rounded-lg text-sm ">
                          More..
                        </div>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}{" "}
        </>
      ) : (
        <div className={`w-full ${pathname === "/" ? "hidden" : "block"}`}>
          <div className="space-y-3 py-2">
            {searchResults?.map((result, index) => (
              <div
                key={index}
                className="cursor-pointer hover:bg-slate-300 hover:bg-opacity-5 px-3 py-2 rounded-lg"
                onClick={() => Opencontent(result?._id)}
              >
                {result ? (
                  <div className="flex justify-between w-full">
                    <div>
                      <Link href={`/${formatTitle(result?.title)}`}>
                        <p>{result?.title}</p>
                        {result?.content ? (
                          <div
                            dangerouslySetInnerHTML={{
                              __html: result?.content?.slice(0, 80) + "...",
                            }}
                          />
                        ) : null}
                      </Link>
                    </div>
                    <div>
                      {result?.createdAt ? (
                        <p>{formatDate(result?.createdAt)}</p>
                      ) : null}
                    </div>
                  </div>
                ) : (
                  <p className="flex justify-center items-center py-2">
                    No result
                  </p>
                )}{" "}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Searchall;
