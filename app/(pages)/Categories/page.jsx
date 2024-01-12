import React from "react";

const Categorise = () => {
  const questionData = [
    {
      maintitle: "BLOK Capital Community",
      question: "What to do if you’re not able to access the community portal?",
      borderColor: "border-orange-500",
      title: "BLOK Capital Community",
    },
    {
      maintitle: "Announcements",
      question: "General & Product Announcement goes here.",
      borderColor: "border-green-500",
    },
    {
      maintitle: "Box 1",
      question: "Your Box 1 question goes here.",
      borderColor: "border-sky-500",
    },
    {
      maintitle: "Box 2",
      question: "Your Box 2 question goes here.",
      borderColor: "border-purple-500",
    },

    // Add more objects as needed
  ];
  return (
    <>
      <div className="text-xl font-semibold py-3">
        <div>Category</div>
      </div>
      {questionData.map((item, index) => (
        <div
          className={`border-l-4 ${item.borderColor}  rounded-xl  mb-5`}
          key={index}
        >
          <div className="bg-slate-800 bg-opacity-90 rounded-xl">
            <div className="p-5 text-white space-y-3 ">
              <div className="space-y-2">
                <div className="">
                  <p className="text-xl font-semibold">{item.maintitle}</p>
                </div>
                <div className="cursor-pointer  space-y-3">
                  <div
                    className={`cursor-pointer  space-y-3 ${
                      item.title
                        ? "border-b border-zinc-500 border-opacity-45 py-2"
                        : ""
                    }`}
                  >
                    <div className="">
                      <p>{item.question}</p>
                    </div>
                  </div>
                  {item.title ? (
                    <div className="flex gap-2 items-center text-sm font-light ">
                      <span className="bg-[#1C64F2] p-1.5 rounded-full"></span>
                      <p>{item.title}</p>
                    </div>
                  ) : null}
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
