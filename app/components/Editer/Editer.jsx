import React, { useState, useRef, useMemo } from "react";
import JoditEditor from "jodit-react";
import "./editor-styles.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { SlArrowDown } from "react-icons/sl";
const Example = ({ setopenediter }) => {
  //const editor = useRef(null);
  //const [content, setContent] = useState("");

  // Wrap the config object inside a function
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const [value, setValue] = useState("");

  const quillStyles = {
    height: "200px", // Set the desired height
    backgroundColor: "#f5f5f5", // Set the desired background color
  };
  return (
    //<div>
    //  <div className=" rounded-md lg:w-[1080px] sm:w-[380px] disabled text-black bg-black">
    //    <JoditEditor ref={editor} value={content} />
    //  </div>
    //  {/* {content} */}
    //</div>
    <div className="w-full flex flex-col gap-2">
      <div onClick={() => setopenediter(false)} className="cursor-pointer">
        <SlArrowDown />
      </div>

      <ReactQuill
        theme="snow"
        value={value}
        onChange={setValue}
        style={quillStyles}
      />
    </div>
  );
};

export default Example;
