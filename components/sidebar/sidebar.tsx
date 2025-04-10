"use client";
import React, { useEffect, useState } from "react";
import Top from "./top";
import SideBarCard from "./sidebar-card";
import { getSidebar } from "@/api-fetch/getSidebar";
import { useUserStore } from "@/hooks/user-store";
import { useSocketStore } from "@/hooks/useSocket-store";
import { useMessageStore } from "@/hooks/message-store";
interface items {
  id: string;
  createdAt: string;
  message: {
    text: string;
    time: string;
    sender: string;
  };
  participants: {
    id: string;
    username: string;
    profilePic: string;
    fullname: string;
  }[];
}
const Sidebar = () => {
  const { user } = useUserStore();
  const [items, setItems] = useState<items[] | null>();
  const { joinRoom } = useSocketStore();
 
  useEffect(() => {
    const fetchData = async () => {
      const sidebarItems = await getSidebar();
      const convoIds: string[] = sidebarItems.map((e: any) => e.id);
      convoIds.forEach((element) => {
        joinRoom(element);
      });
      setItems(sidebarItems);
    };
    fetchData();
  }, []);
  const formatted = items?.sort(
    (a, b) =>
      new Date(b.message.time).getTime() - new Date(a.message.time).getTime()
  );
  return (
    <div className="w-full h-full overflow-y-scroll  rounded-xl shadow-xl p-3 border-[1px] border-border">
      <Top />
      <div className="h-[1px] bg-border w-full my-2" />
      {formatted?.map((e, i) => (
        <SideBarCard
          key={i}
          image={
            e.participants
              ?.filter((item) => item.id !== user.id)
              .map((e) => e.profilePic) || "https://picsum.photos/200"
          }
          id={e.id}
          message={e.message.text}
          time={e.message.time}
          href={`/dashboard/${e.id}`}
          name={
            e.participants
              ?.map((item) => item.username)
              .filter((item) => item !== user.username)
              .join(",") || ""
          }
        />
      ))}
    </div>
  );
};

export default Sidebar;
