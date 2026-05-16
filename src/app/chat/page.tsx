import type { Metadata } from "next";
import { ChatSidebar } from "@/features/chat/components/chat-sidebar";
import { ChatView } from "@/features/chat/chat-view";

export const metadata: Metadata = {
  title: "Chat",
  description: "Query the Stellar blockchain using natural language.",
};

export default function ChatPage() {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar */}
      <ChatSidebar />

      {/* Main chat area */}
      <main className="flex-1 flex flex-col overflow-hidden" aria-label="Chat interface">
        <ChatView />
      </main>
    </div>
  );
}
