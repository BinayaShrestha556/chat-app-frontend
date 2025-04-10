"use client";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { BiSend } from "react-icons/bi";
import { HiPhoto } from "react-icons/hi2";
import { useSendMessage } from "@/hooks/send-message";
import ImageUploader from "./ImageUploader";

const Bottom = ({ roomId }: { roomId: string }) => {
  const [url, setUrl] = useState<string | null>(null);
  const { sendMessage } = useSendMessage();
  const onclick = () => {
    sendMessage(roomId, message);
  };
  const [message, setMessage] = useState("");
  const [isPhotoOpen, setIsPhotoOpen] = useState(false);
  return (
    <div className="w-full bg-accent h-14 flex items-center p-3 relative gap-3">
      <Input
        className="rounded-full border-border bg-black/5"
        placeholder="Enter message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <BiSend size={23} className="-rotate-45 -mt-0.5" onClick={onclick} />
      <HiPhoto size={23} onClick={() => setIsPhotoOpen((e) => !e)} />
      {isPhotoOpen && (
        <div className="bottom-[110%] absolute w-full ">
          <ImageUploader url={url} setUrl={setUrl} />
        </div>
      )}
    </div>
  );
};

export default Bottom;
