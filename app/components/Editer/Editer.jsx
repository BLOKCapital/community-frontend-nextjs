import React, { useState, useRef } from "react";
import JoditEditor from "jodit-react";
import { SlArrowDown } from "react-icons/sl";
import { useWeb3AuthSigner } from "@/app/context/web3-auth-signer";
import "./editor-styles.css"; // Import your CSS file

const Example = () => {
  const editor = useRef(null);
  const { setopenediter } = useWeb3AuthSigner();
  const [BlogsData, setBlogsData] = useState({
    title: "",
    title_1: "",
    content: "",
  });

  return (
    <div className="space-y-2">
      <div className="cursor-pointer text-lg text-white flex justify-between">
        <p>Create a new Topic</p>
        <SlArrowDown onClick={() => setopenediter(false)} />
      </div>
      <div className="overflow-auto  flex flex-col gap-2 rounded-md  ">
        <JoditEditor
          ref={editor}
          value={BlogsData?.content}
          onChange={(newContent) =>
            setBlogsData({ ...BlogsData, content: newContent })
          }
        />
      </div>
    </div>
  );
};

export default Example;
