"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useWeb3AuthSigner } from "../../context/web3-auth-signer";
const Announcements = () => {
  const pathname = usePathname();

  const { Announcementdata, viewSinglePost, setShowcontent } =
    useWeb3AuthSigner();

  const formatDate = (dateString) => {
    const options = { day: "numeric", month: "short" };
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

  const formatTitle = (title) => {
    return title.toLowerCase().replace(/\s+/g, "-");
  };

  return (
    <>
      {Announcementdata?.length > 0 ? (
        <div className={`border-t-4 border-green-500 rounded-xl   w-full`}>
          <div className="bg-slate-800 bg-opacity-90 rounded-xl">
            <div className="md:p-6 p-3 text-white space-y-3">
              <div className="space-y-5">
                <div className="">
                  <p className="text-2xl font-semibold">Announcements</p>
                </div>

                {Announcementdata.slice(0, 2).map((item, index) => (
                  <div
                    key={index}
                    className="cursor-pointer border-b border-zinc-500 border-opacity-45"
                  >
                    <Link href="/announcement">
                      <div
                        className="flex flex-col md:flex-row justify-between text-base"
                        onClick={() => Opencontent(item._id)}
                      >
                        <div className="font-semibold mb-2 md:mb-0 md:mr-4">
                          <p> {item.title}</p>
                        </div>
                        <div className="font-light">
                          <p>{formatDate(item.createdAt)}</p>
                        </div>
                      </div>
                    </Link>
                    <div className="flex gap-2 items-center text-sm font-light py-2">
                      <span className="bg-[#ff7d00] p-1.5 rounded-full"></span>
                      <p>Announcement</p>
                    </div>
                  </div>
                ))}
              </div>
              {/*{pathname === "/announcement" ? null : (*/}
              <div className="flex justify-end text-[#6ca5f0]">
                <Link href={`/announcement`}>
                  <p className="hover:text-white hover:font-semibold cursor-pointer py-2">
                    View More
                  </p>
                </Link>
              </div>
              {/*//)}*/}
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default Announcements;
