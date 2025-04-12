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
    <div className="w-full px-5  h-14 flex items-center p-3 relative gap-3">
      <input
        className="shadow-sm border-accent-foreground w-full px-3 rounded-full bg-accent py-1"
        placeholder="Enter message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <BiSend
        size={26}
        className="-rotate-45 text-primary -mt-0.5 cursor-pointer"
        onClick={() => handleKeyDown(undefined, true)}
      />
      <HiPhoto
        size={26}
        className="cursor-pointer text-primary"
        onClick={() => setIsPhotoOpen((e) => !e)}
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
