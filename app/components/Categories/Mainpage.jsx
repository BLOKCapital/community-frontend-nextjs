import React from "react";
import Categorise from "../../(pages)/Categories/page";
import Latest from "../../(pages)/latest/page";
const Mainpage = () => {
  return (
    <div className="md:flex md:space-x-10 text-white ">
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
