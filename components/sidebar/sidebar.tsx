"use client";
import React, { useEffect, useState } from "react";
import Top from "./top";
import SideBarCard from "./sidebar-card";
import { getSidebar } from "@/api-fetch/getSidebar";
import { useUserStore } from "@/hooks/user-store";
import { useSocketStore } from "@/hooks/useSocket-store";
import { RiLoader5Line } from "react-icons/ri";
import { AxiosError } from "axios";

interface items {
  id: string;
  createdAt: string;
  message: {
    text: string;
    time: string;
    sender: string;
    pic: boolean;
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
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const sidebarItems = await getSidebar();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const convoIds: string[] = sidebarItems.map((e: any) => e.id);
        convoIds.forEach((element) => {
          joinRoom(element);
        });
        setItems(sidebarItems);
        setLoading(false);
      } catch (err: unknown) {
        if (err instanceof AxiosError) {
          console.log(err.response?.data?.error || "Something went wrong");
        } else {
          console.log("An unknown error occurred");
        }
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  const formatted = items?.sort(
    (a, b) =>
      new Date(b.message.time).getTime() - new Date(a.message.time).getTime()
  );

  return (
    <div className="w-full h-full overflow-y-scroll  rounded-md shadow-xl p-3 border-[1px] border-border">
      <Top />
      <div className="h-[1px] bg-border w-full my-2" />

      {loading ? (
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
      ) : formatted?.length === 0 ? (
        <div className="w-full text-accent-foreground h-full flex items-center justify-center">
          Please add user by searching
        </div>
      ) : (
        <div className="w-full flex flex-col gap-2">
          {formatted?.map((e, i) => (
            <SideBarCard
              key={i}
              image={
                e.participants
                  ?.filter((item) => item.id !== user.id)
                  .map((e) => e.profilePic) || "https://picsum.photos/200"
              }
              id={e.id}
              message={e.message}
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
      )}
    </div>
  );
};

export default Sidebar;
