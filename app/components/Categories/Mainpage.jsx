import React from "react";
import Categorise from "../../(pages)/Categories/page";
import Latest from "../../(pages)/latest/page";
const Mainpage = () => {
  return (
    <div className="flex space-x-10  ">
      <div>
        <Categorise />
      </div>
      <div>
        <Latest />
      </div>
    </div>
  );
};

export default Mainpage;
