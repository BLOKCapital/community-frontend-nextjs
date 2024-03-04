import React from "react";
import CustomSelect from "../SelecteC/SelecteC";
import { useWeb3AuthSigner } from "../../../context/web3-auth-signer";
import { FaCirclePlus } from "react-icons/fa6";
const Allcategories = () => {
  const { accountAddress, setopenediter } = useWeb3AuthSigner();
  const questionData = [
    {
      question: "Your Box 1 question goes here.",
      date: "Apr'24",
      vote: "25",
      replies: "8",
      views: "8",
      days: "6s",
    },
    {
      question: "General & Product Announcement goes here.",
      date: "Apr'24",
      vote: "25",
      replies: "8",
      views: "4",
      days: "4d",
    },
    {
      question: "Your Box 1 question goes here.",
      date: "Apr'24",
      vote: "25",
      replies: "8",
      views: "2",
      days: "6d",
    },
    {
      question: "What to do if you’re not able to access the community portal?",
      date: "Apr'24",
      vote: "25",
      replies: "8",
      views: "2",
      days: "2h",
    },
    {
      question: "Your Box 1 question goes here.",
      date: "Apr'24",
      vote: "25",
      replies: "8",
      views: "23",
      days: "6d",
    },

    // Add more objects as needed
  ];
  return (
    <div className={`border-t-4 border-green-500 rounded-xl   w-full`}>
      <div className="bg-slate-800 bg-opacity-90 rounded-xl">
        <div className="md:p-6 p-3 text-white space-y-3">
          <div className="space-y-5">
            <div className="md:p-5 p-3 text-white space-y-3 ">
              <div className="flex justify-between items-center">
                <div>Top</div>
                <div className="flex gap-2 justify-center items-center">
                  <div>
                    <CustomSelect />
                  </div>
                  <div>
                    {accountAddress ? (
                      <>
                        <div className="flex justify-center items-center gap-2">
                          <button
                            className="flex items-center md:gap-2 gap-1 bg-gray-200 bg-opacity-20 rounded-lg md:px-3 px-1 md:py-1 py-1 md:text-base text-sm"
                            onClick={() => setopenediter(true)}
                          >
                            <FaCirclePlus />
                            <p className="uppercase">New Premises</p>
                          </button>
                        </div>
                      </>
                    ) : null}
                  </div>
                </div>
              </div>
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
                {questionData.map((item, index) => (
                  <div key={index} className="cursor-pointer ">
                    <div className="flex justify-between text-base">
                      <div className="font-semibold">
                        <p>{item.question}</p>
                      </div>
                      <div className="flex justify-center  font-light">
                        <div className="px-3 py-1 md:w-16"> {item.replies}</div>
                        <div className="px-3 py-1 md:w-16"> {item.views}</div>

                        <div className="px-3 py-1 md:w-16"> {item.vote}</div>
                        <div className="px-3 py-1 md:w-16"> {item.date}</div>
                      </div>
                    </div>
                    <div className="flex gap-2 items-center text-sm font-light py-3">
                      <span className="bg-[#1C64F2] p-1.5 rounded-full"></span>
                      <p>BLOK Capital Community</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Allcategories;
