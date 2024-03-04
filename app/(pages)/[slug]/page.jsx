"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Datashow from "../../components/datashow/Datashow";
import Allcategories from "../../components/Optioncatagery/Allcategories/Allcategories";
const Datashowusermy = () => {
  const pathname = usePathname();
  const paths = [
    "/wallet-features",
    "/metaverse",
    "/gardens",
    "/gardeners",
    "/proposals",
    "/governance",
    "/announcement",
  ];

  const showOtherComponent = paths.includes(pathname);

  return <div>{showOtherComponent ? <Allcategories /> : <Datashow />}</div>;
};

export default Datashowusermy;
