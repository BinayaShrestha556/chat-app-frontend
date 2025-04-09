import { useEffect } from "react";
import { useSocketStore } from "./useSocket-store";
import { useMessageStore } from "./message-store"; // <-- new store
import { Message } from "@/components/chat/messages";

const useListenMessage = () => {
  const { socket } = useSocketStore();
  const { addMessage } = useMessageStore();

  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = ({
      conversationId,
      newMessage,
    }: {
      conversationId: string;
      newMessage: Message;
    }) => {
      console.log(conversationId, newMessage);
      addMessage(conversationId, newMessage);
    };

    socket.on("receive-message", handleNewMessage);

    return () => {
      socket.off("receive-message", handleNewMessage);
    };
  }, [socket, addMessage]);
};
export default useListenMessage;
