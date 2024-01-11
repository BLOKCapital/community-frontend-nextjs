import React from "react";

const Cards2 = () => {
  const questionData = [
    {
      question: "BLOK DAO",
      date: "Apr'23",
      color: "green",
    },
    {
      question: "What's new?",
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
              <p className="text-2xl font-semibold">Announcements</p>
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
                  <span className="bg-[#2aa754] p-1.5 rounded-full"></span>
                  <p>Announcements</p>
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

export default Cards2;
