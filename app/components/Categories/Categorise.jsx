import React from "react";

const Categorise = () => {
  const questionData = [
    {
      title: "BLOK Capital Community",
      question: "What to do if you’re not able to access the community portal?",
      color: "green",
    },
  ];
  return (
    <div className="border-l-4 border-orange-500 rounded-xl w-2/5">
      <div className="bg-slate-800 bg-opacity-90 rounded-xl">
        <div className="p-5 text-white space-y-3 ">
          <div className="space-y-5">
            {questionData.map((item, index) => (
              <>
                <div className="" key={index}>
                  <p className="text-xl font-semibold">{item.title}</p>
                </div>
                <div className="cursor-pointer  space-y-3">
                  <div className="flex justify-between py-2 text-base border-b border-zinc-500 border-opacity-45">
                    <div className="">
                      <p>{item.question}</p>
                    </div>
                  </div>
                  <div className="flex gap-2 items-center text-sm font-light ">
                    <span className="bg-[#1C64F2] p-1.5 rounded-full"></span>
                    <p>BLOK Capital Community</p>
                  </div>
                </div>
              </>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categorise;
