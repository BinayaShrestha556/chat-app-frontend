import { create } from "zustand";
interface useGroupModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}
export const useGroupModal = create<useGroupModalStore>((set) => ({
  isOpen: false,
  onClose: () => set({ isOpen: false }),
  onOpen: () => set({ isOpen: true }),
}));
