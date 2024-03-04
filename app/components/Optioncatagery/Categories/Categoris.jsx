import React from "react";

const Categorise = () => {
  const questionData = [
    {
      maintitle: "BLOK Capital Community",
      borderColor: "border-teal-700",
      question: "All topics BLOK Capital Community.",
    },
    {
      maintitle: "Announcements",
      question: "General & Product Announcement goes here.",
      borderColor: "border-[#ff7d00]",
    },
    {
      maintitle: "Wallet Features",
      question: "Your Wallet Features question goes here.",
      borderColor: "border-[#0c63e7]",
    },
    {
      maintitle: "Metaverse",
      question: "Your Metaverse question goes here.",
      borderColor: "border-[#d704b2]",
    },
    {
      maintitle: "Gardens",
      question: "Your Gardens question goes here.",
      borderColor: "border-[#7bd909]",
    },
    {
      maintitle: "Gardeners",
      question: "Your Gardeners question goes here.",
      borderColor: "border-[#228B22]",
    },
    {
      maintitle: "Proposals",
      question: "Your Proposals question goes here.",
      borderColor: "border-[#ffbc0a]",
    },
    {
      maintitle: "Governance",
      question: "Your Governance question goes here.",
      borderColor: "border-[#0affc2]",
    },
  ];
  return (
    <>
      <div className="text-xl font-semibold py-3">
        <div>Category</div>
      </div>
      {questionData.map((item, index) => (
        <div
          className={`border-l-4 ${item.borderColor}   rounded-xl  mb-5 md:flex`}
          key={index}
        >
          <div className="bg-slate-800 bg-opacity-90 rounded-xl cursor-pointer flex-grow">
            <div className="p-5 text-white space-y-3">
              <div className="space-y-2">
                <div className="">
                  <p className="text-xl font-semibold ">{item.maintitle}</p>
                </div>
                <div className="space-y-3">
                  <div className="">
                    <p>{item.question}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Categorise;
