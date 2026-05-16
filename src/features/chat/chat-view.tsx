"use client";

import { useEffect, useRef } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatMessage } from "./components/chat-message";
import { ChatInput } from "./components/chat-input";
import { ChatSkeleton } from "./components/chat-skeleton";
import { ChatEmpty } from "./components/chat-empty";
import { WalletBar } from "./components/wallet-bar";
import { useChat } from "./hooks/use-chat";
import { useChatStore } from "@/store/chat";

export function ChatView() {
  const { sendMessage, isStreaming } = useChat();
  const { getActiveConversation } = useChatStore();
  const conversation = getActiveConversation();
  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversation?.messages.length, isStreaming]);

  return (
    <div className="flex flex-col h-full">
      {/* Wallet/network bar */}
      <WalletBar />

      {/* Messages */}
      <ScrollArea className="flex-1">
        {!conversation || conversation.messages.length === 0 ? (
          <ChatEmpty onPromptSelect={sendMessage} />
        ) : (
          <div className="py-4">
            {conversation.messages.map((msg) => (
              <ChatMessage key={msg.id} message={msg} />
            ))}
            {isStreaming && <ChatSkeleton />}
            <div ref={bottomRef} />
          </div>
        )}
      </ScrollArea>

      {/* Input */}
      <div className="p-4 border-t border-border/60">
        <ChatInput onSend={sendMessage} isLoading={isStreaming} />
        <p className="text-[11px] text-muted-foreground text-center mt-2">
          ChainOracle can make mistakes. Verify important blockchain data independently.
        </p>
      </div>
    </div>
  );
}
