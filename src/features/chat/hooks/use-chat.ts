"use client";

import { useCallback } from "react";
import { useChatStore } from "@/store/chat";
import { toast } from "@/hooks/use-toast";

/**
 * Core chat hook — handles sending messages and streaming AI responses.
 */
export function useChat() {
  const {
    activeConversationId,
    createConversation,
    addMessage,
    updateMessage,
    setStreaming,
    isStreaming,
    walletAddress,
    network,
    getActiveConversation,
  } = useChatStore();

  const sendMessage = useCallback(
    async (content: string) => {
      if (isStreaming) return;

      // Ensure we have an active conversation
      let convId = activeConversationId;
      if (!convId) {
        convId = createConversation();
      }

      // Add user message
      addMessage(convId, { role: "user", content });

      // Add placeholder assistant message
      addMessage(convId, { role: "assistant", content: "" });

      setStreaming(true);

      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: content,
            conversationId: convId,
            walletAddress: walletAddress || undefined,
            network,
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const reader = response.body?.getReader();
        const decoder = new TextDecoder();
        let accumulated = "";

        if (!reader) throw new Error("No response body");

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const text = decoder.decode(value, { stream: true });
          const lines = text.split("\n");

          for (const line of lines) {
            if (!line.startsWith("data: ")) continue;
            const data = line.slice(6);
            if (data === "[DONE]") break;

            try {
              const parsed = JSON.parse(data) as { content?: string; error?: string };
              if (parsed.error) throw new Error(parsed.error);
              if (parsed.content) {
                accumulated += parsed.content;
                // Find the actual assistant message ID from the store
                const conv = getActiveConversation();
                const lastMsg = conv?.messages[conv.messages.length - 1];
                if (lastMsg) {
                  updateMessage(convId!, lastMsg.id, accumulated);
                }
              }
            } catch {
              // Skip malformed chunks
            }
          }
        }
      } catch (err) {
        const message = err instanceof Error ? err.message : "Failed to get response";
        toast({ title: "Error", description: message, variant: "destructive" });

        // Update the placeholder with an error message
        const conv = getActiveConversation();
        const lastMsg = conv?.messages[conv.messages.length - 1];
        if (lastMsg && lastMsg.role === "assistant" && !lastMsg.content) {
          updateMessage(convId!, lastMsg.id, "Sorry, I encountered an error. Please try again.");
        }
      } finally {
        setStreaming(false);
      }
    },
    [
      isStreaming,
      activeConversationId,
      createConversation,
      addMessage,
      updateMessage,
      setStreaming,
      walletAddress,
      network,
      getActiveConversation,
    ]
  );

  return { sendMessage, isStreaming };
}
