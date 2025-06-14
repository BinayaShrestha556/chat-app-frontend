"use client";
import useFetch from "@/api-fetch/fetch";
import Bottom from "@/components/chat/bottom";
import LoadingComponent from "@/components/chat/loading";
import MessageList, { Message } from "@/components/chat/messages";
import TopPart from "@/components/chat/top-part";
import { useMessageStore } from "@/hooks/message-store";
import useListenMessage from "@/hooks/useListenMessage";
import { useUserStore } from "@/hooks/user-store";
import { useSocketStore } from "@/hooks/useSocket-store";

import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

interface ChatData {
  id: string;
  // Change from string to boolean (based on your response)
  messages: Message[];
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
  useListenMessage();
  const { messagesByConversation, setMessages } = useMessageStore();
  const { user } = useUserStore();
  const params = useParams();
  const { callServer, error, loading } = useFetch();
  const id = params?.id as string;
  const { joinRoom } = useSocketStore();
  useEffect(() => {
    const getData = async () => {
      const data = await callServer(`/messages/get-messages/${id}`, "GET");
      joinRoom(id);
      setConversation(data);
      setMessages(data.id, data.messages);

      // console.log(data.id, data.messages);
    };
    getData();
  }, [id]);
  const messages = messagesByConversation[id];
  if (loading) return <LoadingComponent />;
  const filteredParticipants = conversation?.participants.filter(
    (e) => e.username !== user.username
  );

  const image = filteredParticipants?.map((e) => ({
    pfp: e.profilePic,
    id: e.id,
  }));
  // If group chat, adjust how you handle images

  const name = filteredParticipants?.map((e) => e.fullname).join(", ");
  if (error) return error;
  return (
    <div className="relative h-full antialiased">
      <TopPart image={image} name={name || ""} loading={loading} />

      <MessageList loading={loading} messages={messages} image={image} />
      <div className="absolute bottom-0 w-full">
        <Bottom roomId={id} />
      </div>
    </div>
  );
};

export default Page;
