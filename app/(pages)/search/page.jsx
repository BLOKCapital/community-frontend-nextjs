import React from "react";

import Searchall from "../../components/Search/Search";
const Search = () => {
  return (
    <div className="bg-gray-500 bg-opacity-20 rounded-t-3xl w-full min-h-screen border-t-4 border-[#84AD69] text-white">
      <div className="p-5 flex justify-center items-center">
        <Searchall />
      </div>
    </div>
  );
};

export default Search;
