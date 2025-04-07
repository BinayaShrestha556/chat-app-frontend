import React from "react";
import { Input } from "../ui/input";
import { BiSearch } from "react-icons/bi";

const Top = () => {
  return (
    <div className="w-full rounded-lg bg-accent h-10 items-center p-2 flex gap-2">
      <BiSearch size={23} />
      <input
        className="focus:outline-0 flex-1 placeholder:text-accent-foreground"
        placeholder="Search"
      />
    </div>
  );
};

export default Top;
