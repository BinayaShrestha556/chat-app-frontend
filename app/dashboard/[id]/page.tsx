"use client";
import useFetch from "@/api-fetch/fetch";
import Bottom from "@/components/chat/bottom";
import MessageList from "@/components/chat/messages";
import TopPart from "@/components/chat/top-part";
import { useUserStore } from "@/hooks/user-store";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

interface ChatData {
  id: string;
  // Change from string to boolean (based on your response)
  messages: {
    createdAt: string;
    body: string;
    senderId: string;
    id: string;
  }[];
  participants: {
    id: string;
    fullname: string;
    profilePic: string;
    username: string;
  }[];
  // Allow null, since "name" can be missing
}

const Page = () => {
  const [conversation, setConversation] = useState<ChatData | null>(null);

  const { user } = useUserStore();
  const params = useParams();
  const { callServer, error, loading } = useFetch();
  const id = params?.id as string;
  useEffect(() => {
    const getData = async () => {
      const data = await callServer(`/messages/get-messages/${id}`, "GET");

      setConversation(data);
    };

    getData();
  }, [id]);

  if (loading) return null;
  const filteredParticipants = conversation?.participants.filter(
    (e) => e.username !== user.username
  );

  const image =
    filteredParticipants?.length === 1
      ? filteredParticipants[0].profilePic
      : ""; // If group chat, adjust how you handle images

  const name = filteredParticipants?.map((e) => e.fullname).join(", ");
  return (
    <div className="relative h-full">
      <TopPart image={image} name={name || ""} />
      <MessageList messages={conversation?.messages} />
      <div className="absolute bottom-0 w-full">
        <Bottom />
      </div>
    </div>
  );
};

export default Page;
