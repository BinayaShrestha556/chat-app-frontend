"use client";
import { useUserStore } from "@/hooks/user-store";
import React, { useEffect, useRef } from "react";
import { formatTime } from "../sidebar/sidebar-card";
import useListenMessage from "@/hooks/useListenMessage";
import { useMessageStore } from "@/hooks/message-store";

export interface Message {
  createdAt: string;
  body: string;
  senderId: string;
  id: string;
}

interface MessageListProps {
  messages?: Message[];
}

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  const { user } = useUserStore(); // Get the logged-in user

  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to the bottom of the chat container when messages change
    const chatContainer = chatContainerRef.current;
    if (chatContainer) chatContainer.scrollTop = chatContainer.scrollHeight;
  }, [messages]);
  return (
    <div
      className="p-4 space-y-3 overflow-y-scroll h-[calc(100%-120px)]"
      ref={chatContainerRef}
    >
      {messages &&
        messages.map((msg, index) => {
          const isOwnMessage = msg.senderId === user.id; // Check if the sender is the logged-in user

          return (
            <div
              key={index}
              className={`flex ${
                isOwnMessage ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-xs md:max-w-md p-2 rounded-lg  ${
                  isOwnMessage
                    ? "bg-primary text-white"
                    : "bg-accent text-black"
                }`}
              >
                <p className="max-w-[75%] text-wrap ">{msg.body}</p>
                <p className="text-xs text-end -mt-0.5 text-accent-foreground">
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
