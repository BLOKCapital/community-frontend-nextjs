import React from "react";
import Categorise from "../../(pages)/Categories/page";
import Latest from "../../(pages)/latest/page";

const Mainpage = () => {
  return (
    <div className="md:flex md:space-x-10 text-white">
      <div className="md:w-1/2">
        {/* Adjust width for medium screens and larger */}
        <Categorise />
      </div>
      <div className="md:w-1/2">
        {/* Adjust width for medium screens and larger */}
        <Latest />
      </div>
    </div>
  );
};

export default Mainpage;
