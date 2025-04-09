import { Message } from "@/components/chat/messages";
import { create } from "zustand";

interface MessageMap {
  [conversationId: string]: Message[];
}

interface MessageStore {
  messagesByConversation: MessageMap;
  setMessages: (conversationId: string, messages: Message[]) => void;
  addMessage: (conversationId: string, message: Message) => void;
  clearMessages: (conversationId: string) => void;
}

export const useMessageStore = create<MessageStore>((set) => ({
  messagesByConversation: {},

  setMessages: (conversationId, messages) =>
    set((state) => ({
      messagesByConversation: {
        ...state.messagesByConversation,
        [conversationId]: messages,
      },
    })),

  addMessage: (conversationId, message) =>
    set((state) => ({
      messagesByConversation: {
        ...state.messagesByConversation,
        [conversationId]: [
          ...(state.messagesByConversation[conversationId] || []),
          message,
        ],
      },
    })),

  clearMessages: (conversationId) =>
    set((state) => {
      const updated = { ...state.messagesByConversation };
      delete updated[conversationId];
      return { messagesByConversation: updated };
    }),
}));
