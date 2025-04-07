import { Socket } from "socket.io-client";
import { create } from "zustand";

type User = {
  id: string | null;
  username: string | null;
  fullname: string | null;
  isLoggedIn: boolean;
  profilePic: string | null;
};

type UserStore = {
  user: User;
  setUser: (user: User) => void;
  logout: () => void;
};

export const useUserStore = create<UserStore>((set) => ({
  user: {
    id: null,
    username: null,
    fullname: null,
    isLoggedIn: false,
    profilePic: null,
  },
  setUser: (user) => set({ user }),
  logout: () =>
    set({
      user: {
        id: null,
        username: null,
        fullname: null,
        isLoggedIn: false,
        profilePic: null,
      },
    }),
}));
