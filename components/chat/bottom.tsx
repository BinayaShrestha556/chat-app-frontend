import React from "react";
import { Input } from "../ui/input";
import { BiSend } from "react-icons/bi";
import { HiPhoto } from "react-icons/hi2";

const Bottom = () => {
  return (
    <div className="w-full bg-accent h-14 flex items-center p-3 gap-3">
      <Input
        className="rounded-full border-border bg-black/5"
        placeholder="Enter message"
      />
      <BiSend size={23} className="-rotate-45 -mt-0.5" />
      <HiPhoto size={23} />
    </div>
  );
};

export default Bottom;
