import React from "react";
import Top from "./top";

const Sidebar = () => {
  return (
    <div className="w-full h-full rounded-xl shadow-xl p-5 border-[1px] border-border">
      <Top />
      <div className="h-[1px] bg-border w-full my-2" />
    </div>
  );
};

export default Sidebar;
