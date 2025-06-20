"use client";
import React, { useEffect, useState } from "react";
import Top from "./top";
import SideBarCard from "./sidebar-card";

import { useUserStore } from "@/hooks/user-store";
import { useSocketStore } from "@/hooks/useSocket-store";
import useFetch from "@/api-fetch/fetch";
import { AxiosError } from "axios";
import { useGroupModal } from "@/hooks/use-create-group-modal";
import Loading from "./loading";
interface Data {
  id: string;
  messages: {
    body: string;
    createdAt: string;
    senderId: string;
    pic: boolean;
  }[];
  participants: {
    id: string;
    username: string;
    profilePic: string;
    fullname: string;
  }[];
  createdAt: string;
}
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
  const { callServer, loading } = useFetch();
  const fetchData = async () => {
    try {
      const data = await callServer("/messages/get-conversations", "GET");
      console.log(data);

      const formattedItems = data.map((e: Data) => {
        const lastMessage = e.messages?.[0];

        return {
          id: e.id,
          createdAt: e.createdAt,
          message: lastMessage
            ? {
                text: lastMessage.body,
                time: lastMessage.createdAt,
                sender: lastMessage.senderId,
                pic: lastMessage.pic,
              }
            : {
                text: "No messages yet",
                time: e.createdAt,
                sender: null,
                pic: false,
              },
          participants: e.participants,
        };
      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const convoIds: string[] = formattedItems.map((e: any) => e.id);
      convoIds.forEach((element) => {
        joinRoom(element);
      });
      setItems(formattedItems);
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        console.log(err.response?.data?.error || "Something went wrong");
      } else {
        console.log(err);
      }
    }
  };
  const { created, setCreated } = useGroupModal();
  useEffect(() => {
    console.log("hello from the conversations. ", created);
    setCreated(false);
    fetchData();
  }, [created]);
  const formatted = items?.sort(
    (a, b) =>
      new Date(b.message.time).getTime() - new Date(a.message.time).getTime()
  );

  return (
    <div className="w-full h-full overflow-y-scroll    border-[1px] border-x-0 border-border">
      <Top fn={fetchData} />
      <div className="h-[1px] bg-border w-full " />

      {loading ? (
        <Loading />
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
