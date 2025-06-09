"use client";
import React, { useState } from "react";

import { BiSend } from "react-icons/bi";
import { HiPhoto } from "react-icons/hi2";
import { useSendMessage } from "@/hooks/send-message";
import ImageUploader from "./ImageUploader";

const Bottom = ({ roomId }: { roomId: string }) => {
  const [url, setUrl] = useState<string | null>(null);
  const { sendMessage } = useSendMessage();

  const handleKeyDown = (
    e?: React.KeyboardEvent<HTMLInputElement>,
    send?: boolean
  ) => {
    if (e?.key === "Enter" || send) {
      e?.preventDefault();
      sendMessage(roomId, url ? url : message, url ? true : false);
      setUrl(null);
      setMessage("");
      setIsPhotoOpen(false);
    }
  };
  const [message, setMessage] = useState("");
  const [isPhotoOpen, setIsPhotoOpen] = useState(false);
  return (
    <div className="w-full px-5 border-t h-14 flex items-center p-3 relative gap-3">
      {" "}
      <HiPhoto
        size={26}
        className="cursor-pointer text-black/80"
        onClick={() => setIsPhotoOpen((e) => !e)}
      />
      <input
        className=" w-full px-3 focus:border-0 focus:outline-0  py-1"
        placeholder="Enter message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <BiSend
        size={26}
        className="-rotate-45 text-black/80 -mt-0.5 cursor-pointer"
        onClick={() => handleKeyDown(undefined, true)}
      />
      {isPhotoOpen && (
        <div className="bottom-[110%] absolute left-0 ">
          <ImageUploader url={url} setUrl={setUrl} />
        </div>
      )}
    </div>
  );
};

export default Bottom;
