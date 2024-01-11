import React from "react";

const Cards = () => {
  const questionData = [
    {
      question: "What to do if you’re not able to access the community portal?",
      date: "Apr'23",
      color: "green",
    },
    {
      question: "What to do if you’re not able to access the community portal?",
      date: "Apr'23",
      color: "green",
    },

    // Add more question objects as needed
  ];
  return (
    <div className="border-t-4 border-green-500 rounded-xl w-full">
      <div className="bg-slate-800 bg-opacity-90 rounded-xl">
        <div className="p-8 text-white space-y-3 ">
          <div className="space-y-5">
            <div className="">
              <p className="text-2xl font-semibold">Getting Started</p>
            </div>
            {questionData.map((item, index) => (
              <div
                key={index}
                className="cursor-pointer border-b border-zinc-500 border-opacity-45"
              >
                <div className="flex justify-between text-base">
                  <div className="font-semibold">
                    <p>{item.question}</p>
                  </div>
                  <div className="font-light">
                    <p>{item.date}</p>
                  </div>
                </div>
                <div className="flex gap-2 items-center text-sm font-light py-3">
                  <span className="bg-[#1C64F2] p-1.5 rounded-full"></span>
                  <p>BLOK Capital Community</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-end text-[#6ca5f0] cursor-pointer hover:text-white hover:font-semibold">
            View More
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cards;