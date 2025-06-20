"use client";
import { useMessageStore } from "@/hooks/message-store";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

import { WiMoonAltNew } from "react-icons/wi";

interface SidebarCardProps {
  id: string;
  image: string | string[];
  status?: "DELIVERED" | "SEEN" | "NOT SEEN";
  time: string;
  message: {
    text: string;
    time: string;
    sender: string;
    pic: boolean;
  };
  name: string;
  href: string;
}
export const formatTime = (timestamp: string): string => {
  const date = new Date(timestamp);
  const now = new Date();

  // Get time difference in milliseconds
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  // Format time in HH:mm (24-hour format)
  const time = date.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });

  // Format weekday and month-date
  const weekday = date.toLocaleDateString("en-US", { weekday: "short" });
  const monthDay = date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  if (diffDays === 0) return time; // Today
  if (diffDays === 1) return "Yesterday"; // Yesterday
  if (diffDays < 7) return weekday; // Within this week
  return monthDay; // Older than a week
};
const SideBarCard = ({
  id,
  image,
  status = "DELIVERED",
  time,
  message,
  name,
  href,
}: SidebarCardProps) => {
  const { messagesByConversation } = useMessageStore();

  const lastMessages = messagesByConversation[id];
  const lastMsgObj = lastMessages?.[lastMessages.length - 1] || message;

  const lastMessage = lastMsgObj?.pic
    ? "Sent a photo"
    : lastMsgObj?.body || lastMsgObj?.body || "";
  const pathname = usePathname();

  return (
    <Link
      href={href}
      className={`h-14 w-full px-3 py-2  flex items-center relative gap-2 ${
        pathname === `/dashboard/${id}` ? "bg-accent" : "bg-transparent"
      }`}
    >
      <div className="relative h-full rounded-full   aspect-square">
        {image.length === 1 ? (
          <Image
            src={image[0]}
            alt="pfp"
            fill
            className="object-center object-cover"
          />
        ) : (
          <div className="h-full relative aspect-square ">
            <div className="relative  h-[75%] w-[75%] -right-1 -top-1 ">
              {" "}
              <Image
                alt="pfp 1"
                src={image[0]}
                fill
                className="object-center object-cover"
              />
            </div>
            <div className="relative -top-4 h-[75%] w-[75%]  left-3 ">
              {" "}
              <Image
                alt="pfp 1"
                src={image[1]}
                fill
                className="object-center object-cover"
              />
            </div>
          </div>
        )}
      </div>
      <div className="flex-1 w-40">
        <p className="font-semibold truncate">{name}</p>
        <p className="text-muted-foreground -mt-0.5 text-sm truncate ">
          {lastMessage}
        </p>
      </div>
      <div className="flex items-center self-center gap-1">
        {status === "DELIVERED" ? (
          <> {/* <RiCheckDoubleFill /> |{" "} */}</>
        ) : status === "NOT SEEN" ? (
          <>
            <WiMoonAltNew className="text-primary" /> |{" "}
          </>
        ) : null}

        <span className="text-accent-foreground text-sm">
          {formatTime(time)}
        </span>
      </div>
    </Link>
  );
};

export default SideBarCard;
