import React from "react";
import Image from "next/image";
import A from "../../../assets/icons/A.png";
import G from "../../../assets/icons/G.png";
import E from "../../../assets/icons/E.png";
import B from "../../../assets/icons/B.png";
import O from "../../../assets/icons/O.png";

const Latest = () => {
  const questionData = [
    {
      question: "What to do if you’re not able to access the community portal?",
      maintitle: "Box 1",
      image: A,
      date: "Apr'24",
      days: "2h",
      color: "purple",
    },
    {
      question: "General & Product Announcement goes here.",
      maintitle: "Box 2",
      image: G,
      date: "Apr'24",
      days: "4d",
      color: "yellow",
    },
    {
      question: "Your Box 1 question goes here.",
      maintitle: "Box 3",
      image: E,
      date: "Apr'24",
      days: "6s",
      color: "green",
    },
    {
      question: "Your Box 1 question goes here.",
      maintitle: "Box 4",
      image: O,
      date: "Apr'24",
      days: "6d",
      color: "blue",
    },
    {
      question: "Your Box 1 question goes here.",
      maintitle: "Box 5",
      image: B,
      date: "Apr'24",
      days: "6d",
      color: "red",
    },
    // Add more objects as needed
  ];
  return (
    <>
      <div className="text-xl font-semibold py-3">
        <div>Latest</div>
      </div>
      {questionData.map((item, index) => (
        <div
          className={` rounded-xl cursor-pointer  mb-2 hover:bg-slate-300  hover:rounded-xl`}
          key={index}
        >
          <div className="bg-slate-800 bg-opacity-90 rounded-xl flex justify-between items-center gap-2 p-2">
            <div className="flex items-center space-x-2 space-y-2">
              <div className="">
                {item.image && (
                  <Image
                    src={item.image}
                    alt="Question Image"
                    height={50}
                    className=" rounded-full bg-white"
                  />
                )}
              </div>
              <div className="">
                <div className={`cursor-pointer space-y-3 `}>
                  <p>{item.question}</p>
                </div>
                <div className="flex items-center">
                  <p
                    style={{
                      backgroundColor: item.color,
                      padding: "6px",
                      margin: "10px",
                      color: "white",
                    }}
                  ></p>
                  {item.maintitle}
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center text-slate-300 text-sm space-y-2">
              <p>{item.date}</p>
              <p>{item.days}</p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Latest;
