import { create } from "zustand";
import { persist } from "zustand/middleware";
import { generateId } from "@/lib/utils";
import type { ChatMessage, Conversation, StellarNetwork } from "@/types";

interface ChatState {
  conversations: Conversation[];
  activeConversationId: string | null;
  isStreaming: boolean;
  walletAddress: string;
  network: StellarNetwork;

  // Actions
  createConversation: () => string;
  setActiveConversation: (id: string) => void;
  deleteConversation: (id: string) => void;
  addMessage: (conversationId: string, message: Omit<ChatMessage, "id" | "createdAt">) => string;
  updateMessage: (conversationId: string, messageId: string, content: string) => void;
  setStreaming: (streaming: boolean) => void;
  setWalletAddress: (address: string) => void;
  setNetwork: (network: StellarNetwork) => void;
  getActiveConversation: () => Conversation | null;
  clearAll: () => void;
}

export const useChatStore = create<ChatState>()(
  persist(
    (set, get) => ({
      conversations: [],
      activeConversationId: null,
      isStreaming: false,
      walletAddress: "",
      network: "testnet",

      createConversation: () => {
        const id = generateId();
        const conversation: Conversation = {
          id,
          title: "New Conversation",
          messages: [],
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        set((state) => ({
          conversations: [conversation, ...state.conversations],
          activeConversationId: id,
        }));
        return id;
      },

      setActiveConversation: (id) => set({ activeConversationId: id }),

      deleteConversation: (id) =>
        set((state) => {
          const remaining = state.conversations.filter((c) => c.id !== id);
          return {
            conversations: remaining,
            activeConversationId:
              state.activeConversationId === id
                ? (remaining[0]?.id ?? null)
                : state.activeConversationId,
          };
        }),

      addMessage: (conversationId, message) => {
        const id = generateId();
        const newMessage: ChatMessage = {
          ...message,
          id,
          createdAt: new Date(),
        };
        set((state) => ({
          conversations: state.conversations.map((c) => {
            if (c.id !== conversationId) return c;
            const messages = [...c.messages, newMessage];
            // Auto-title from first user message
            const title =
              c.messages.length === 0 && message.role === "user"
                ? message.content.slice(0, 50)
                : c.title;
            return { ...c, messages, title, updatedAt: new Date() };
          }),
        }));
        return id;
      },

      updateMessage: (conversationId, messageId, content) =>
        set((state) => ({
          conversations: state.conversations.map((c) => {
            if (c.id !== conversationId) return c;
            return {
              ...c,
              messages: c.messages.map((m) =>
                m.id === messageId ? { ...m, content } : m
              ),
            };
          }),
        })),

      setStreaming: (isStreaming) => set({ isStreaming }),
      setWalletAddress: (walletAddress) => set({ walletAddress }),
      setNetwork: (network) => set({ network }),

      getActiveConversation: () => {
        const { conversations, activeConversationId } = get();
        return conversations.find((c) => c.id === activeConversationId) ?? null;
      },

      clearAll: () =>
        set({ conversations: [], activeConversationId: null }),
    }),
    {
      name: "chainoracle-chat",
      // Only persist conversations and settings, not streaming state
      partialize: (state) => ({
        conversations: state.conversations,
        walletAddress: state.walletAddress,
        network: state.network,
      }),
    }
  )
);
