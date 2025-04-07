import React from "react";
import { MdOutlineAddComment } from "react-icons/md";

const page = () => {
  return (
    <div className="h-full w-full bg-accent flex items-center text-accent-foreground gap-2 text-xl justify-center">
      <MdOutlineAddComment size={40} /> Start a new conversation.
    </div>
  );
};

export default page;
