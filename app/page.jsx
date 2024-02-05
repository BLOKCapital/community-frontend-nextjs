import React from "react";
import Mainpage from "./components/Mainpage/Mainpage";
import { Web3AuthSignerProvider } from "./context/web3-auth-signer";
const page = () => {
  return (
    <div>
      <Mainpage />
    </div>
  );
};

export default page;
