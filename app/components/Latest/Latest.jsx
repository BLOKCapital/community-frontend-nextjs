import React from "react";
import { useWeb3AuthSigner } from "@/app/context/web3-auth-signer";

const Latest = () => {
  const { viewPosts } = useWeb3AuthSigner();
  //const questionData = [
  //  {
  //    question: "What to do if you’re not able to access the community portal?",
  //    date: "Apr'24",
  //    vote: "25",
  //    replies: "8",
  //    views: "2",
  //    days: "2h",
  //  },
  //  {
  //    question: "General & Product Announcement goes here.",
  //    date: "Apr'24",
  //    vote: "25",
  //    replies: "8",
  //    views: "4",
  //    days: "4d",
  //  },
  //  {
  //    question: "Your Box 1 question goes here.",
  //    date: "Apr'24",
  //    vote: "25",
  //    replies: "8",
  //    views: "8",
  //    days: "6s",
  //  },
  //  {
  //    question: "Your Box 1 question goes here.",
  //    date: "Apr'24",
  //    vote: "25",
  //    replies: "8",
  //    views: "23",
  //    days: "6d",
  //  },
  //  {
  //    question: "Your Box 1 question goes here.",
  //    date: "Apr'24",
  //    vote: "25",
  //    replies: "8",
  //    views: "2",
  //    days: "6d",
  //  },
  //  // Add more objects as needed
  //];

  const formatDate = (dateString) => {
    const options = { day: "numeric", month: "short" };
    const formattedDate = new Date(dateString).toLocaleDateString(
      "en-US",
      options
    );
    return formattedDate;
  };

  return (
    <div className="border-t-4 border-blue-500  rounded-xl w-full text-white">
      <div className="bg-slate-800 bg-opacity-90 rounded-xl overflow-x-auto">
        <div className="md:p-8 p-3 text-white space-y-3 ">
          <div className=" space-y-5">
            <div className="flex justify-between text-base cursor-pointer text-gray-400 py-3 border-b-2 border-zinc-500 border-opacity-45 ">
              <div>
                <p className="">Topic</p>
              </div>
              <div className="flex  ">
                <div className="hover:bg-slate-400 hover:bg-opacity-45 hover:text-white px-3 py-1 rounded-md">
                  Replies
                </div>
                <div className="hover:bg-slate-400 hover:bg-opacity-45 hover:text-white px-3 py-1 rounded-md">
                  Views
                </div>
                <div className="hover:bg-slate-400 hover:bg-opacity-45 hover:text-white px-3 py-1 rounded-md">
                  Vote
                </div>
                <div className="hover:bg-slate-400 hover:bg-opacity-45 hover:text-white px-3 py-1 rounded-md">
                  Active
                </div>
              </div>
            </div>

            {viewPosts ? (
              <>
                {viewPosts.map((item, index) => (
                  <div key={index} className="cursor-pointer ">
                    <div className="flex justify-between text-base">
                      <div className="font-semibold break-words">
                        <p>{item.title}</p>
                      </div>
                      <div className="flex justify-center  font-light">
                        <div className="px-3 py-1 md:w-16"> 5</div>
                        <div className="px-3 py-1 md:w-16"> 10</div>

                        <div className="px-3 py-1 md:w-16"> 30</div>
                        <div className="px-3 py-1 md:w-18">
                          {formatDate(item.createdAt)}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 items-center text-sm font-light py-3">
                      <span className="bg-[#1C64F2] p-1.5 rounded-full"></span>
                      {item.userData && item.userData.length > 0 && (
                        <p>{item.userData[0].username}</p>
                      )}
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <p>Loding...</p>
            )}
          </div>
          <div className="flex justify-end text-[#6ca5f0]  ">
            <p className="hover:text-white hover:font-semibold cursor-pointer">
              View More
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Latest;
