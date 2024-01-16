import React, { useState, useRef, useMemo } from "react";
import JoditEditor from "jodit-react";
import "./editor-styles.css";

const Example = ({ placeholder }) => {
  const editor = useRef(null);
  const [content, setContent] = useState("");

  // Wrap the config object inside a function
  // eslint-disable-next-line react-hooks/exhaustive-deps

  return (
    <div className="  rounded-md lg:w-[1080px] sm:w-[380px] disabled text-black bg-black">
      <JoditEditor ref={editor} value={content} />

      {/* {content} */}
    </div>
  );
};

export default Example;
