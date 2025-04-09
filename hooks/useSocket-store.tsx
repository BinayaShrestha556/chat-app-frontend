import { create } from "zustand";
import { io, Socket } from "socket.io-client";
import { useUserStore } from "./user-store";
import { useEffect } from "react";

interface ISocketStore {
  socket: Socket | null;
  onlineUsers: string[];
  setSocket: (socket: Socket | null) => void;
  setOnlineUsers: (users: string[]) => void;
  joinRoom: (roomId: string) => void;
  leaveRoom: (roomId: string) => void;
  disconnectSocket: () => void;
}

const socketURL = "http://localhost:3000";

export const useSocketStore = create<ISocketStore>((set, get) => ({
  socket: null,
  onlineUsers: [],
  setSocket: (socket) => set({ socket }),
  setOnlineUsers: (users) => set({ onlineUsers: users }),
  joinRoom: (roomId) => {
    const socket = get().socket;
    if (socket) {
      socket.emit("join-room", roomId);
      console.log("room joined");
    }
  },

  leaveRoom: (roomId) => {
    const socket = get().socket;
    if (socket) {
      socket.emit("leave-room", roomId);
    }
  },
  disconnectSocket: () => set({ socket: null, onlineUsers: [] }),
}));

// Custom hook to handle socket connection based on authentication
export const useSocketConnection = () => {
  const { user } = useUserStore();
  const { setSocket, disconnectSocket, setOnlineUsers } = useSocketStore();

  useEffect(() => {
    if (user && user.isLoggedIn) {
      const socket = io(socketURL, {
        withCredentials: true,
        transports: ["websocket"],
        query: {
          userId: user.id,
        },
      });

      setSocket(socket);

      socket.on("getOnlineUsers", (users: string[]) => {
        setOnlineUsers(users);
      });

      return () => {
        socket.close();
        disconnectSocket();
      };
    } else if (!user.isLoggedIn) {
      disconnectSocket();
    }
  }, [user, user.isLoggedIn, setSocket, disconnectSocket, setOnlineUsers]);
};
