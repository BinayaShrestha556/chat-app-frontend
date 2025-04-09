import { useSocketStore } from "./useSocket-store";

import { useUserStore } from "./user-store";
import { useMessageStore } from "./message-store";

export const useSendMessage = () => {
  const { socket } = useSocketStore();
  const { addMessage } = useMessageStore();
  const { user } = useUserStore();
  const now = new Date();

  const formatted = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(
    2,
    "0"
  )}-${String(now.getDate()).padStart(2, "0")} ${String(
    now.getHours()
  ).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}:${String(
    now.getSeconds()
  ).padStart(2, "0")}.${String(now.getMilliseconds()).padStart(3, "0")}`;
  const sendMessage = (roomId: string, message: string) => {
    if (socket && user.id) {
      addMessage(roomId, {
        body: message,
        id: "1",
        createdAt: formatted,
        senderId: user.id,
      });
      socket.emit("send-message", { roomId, message });
    }
  };

  return { sendMessage };
};
