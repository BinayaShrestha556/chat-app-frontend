"use client";
import { useUserStore } from "@/hooks/user-store";
import React, { useEffect, useRef } from "react";
import { formatTime } from "../conversations/sidebar-card";

import Image from "next/image";
import { RiLoader5Line } from "react-icons/ri";

export interface Message {
  createdAt: string;
  body: string;
  senderId: string;
  id: string;
  pic: boolean;
}

interface MessageListProps {
  messages?: Message[];
  image?: { pfp: string; id: string }[];
  loading: boolean;
}

const MessageList: React.FC<MessageListProps> = ({
  messages,
  image,
  loading,
}) => {
  const { user } = useUserStore(); // Get the logged-in user

  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to the bottom of the chat container when messages change
    const chatContainer = chatContainerRef.current;
    if (chatContainer) chatContainer.scrollTop = chatContainer.scrollHeight;
  }, [messages]);
  const {
    user: { profilePic },
  } = useUserStore();

  if (loading)
    return (
      <div className="w-full text-accent-foreground text-xl  h-full flex justify-center items-center">
        Loading
        <div className="relative">
          <RiLoader5Line size={25} className="animate-spin   duration-75" />
          <RiLoader5Line
            size={25}
            className="animate-spin absolute top-0 duration-75"
            style={{ animationDuration: "1.4s" }}
          />
        </div>
      </div>
    );
  return (
    <div
      className="p-4 space-y-3 overflow-y-scroll bg-gradient-to-bl from-primary/60 via-white  to-white h-[calc(100%-120px)]"
      ref={chatContainerRef}
    >
      {messages &&
        messages.map((msg, index) => {
          const isOwnMessage = msg.senderId === user.id; // Check if the sender is the logged-in user
          const pfp = isOwnMessage
            ? profilePic
            : image?.find((e) => e.id === msg.senderId)?.pfp;
          return (
            <div
              key={index}
              className={`flex gap-2 w-full  ${
                isOwnMessage
                  ? "justify-start flex-row-reverse"
                  : "justify-start"
              }`}
            >
              <div className="h-8 w-8 rounded-full overflow-hidden relative">
                {profilePic && (
                  <Image
                    src={pfp!}
                    alt="profile"
                    fill
                    className="object-cover object-center"
                  />
                )}
              </div>
              <div
                className={`flex flex-col   w-2/3 ${
                  isOwnMessage ? "items-end" : "items-start"
                }`}
              >
                <div
                  className={`p-2 relative rounded  ${
                    isOwnMessage
                      ? "bg-secondary text-black rounded-lg shadow shadow-black/10 rounded-tr-[0px]"
                      : "bg-white shadow-lg shadow-black/10 rounded-lg rounded-tl-[0px] text-black"
                  }`}
                >
                  {/* <div
                    className={`top-3 h-2 w-2  rotate-45 absolute  ${
                      isOwnMessage
                        ? "-right-1 rounded-[0_2px_0_0] bg-primary"
                        : "rounded-[0_0_0_2px] bg-accent -left-1"
                    }`}
                  /> */}
                  {msg.pic ? (
                    <div className="relative w-60 h-60 rounded overflow-hidden -m-1 mb-2">
                      {msg.body && (
                        <Image
                          src={msg.body}
                          alt="pic"
                          fill
                          className="object-contain object-center "
                        />
                      )}
                    </div>
                  ) : (
                    <p className="text-wrap">{msg.body}</p>
                  )}
                </div>
                <p
                  className={`text-xs text-end mt-0.5 text-accent-foreground ${
                    isOwnMessage ? "text-right" : "text-left"
                  }`}
                >
                  {formatTime(msg.createdAt)}
                </p>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default MessageList;
