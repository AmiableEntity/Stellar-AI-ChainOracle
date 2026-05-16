"use client";

import { Plus, Trash2, MessageSquare } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Logo } from "@/components/brand/logo";
import { useChatStore } from "@/store/chat";
import { cn, formatRelativeTime } from "@/lib/utils";

export function ChatSidebar() {
  const { conversations, activeConversationId, createConversation, setActiveConversation, deleteConversation } =
    useChatStore();

  return (
    <aside className="flex h-full w-64 flex-col border-r border-border/60 bg-card/30 backdrop-blur-sm">
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <Logo size="sm" />
        <Button
          size="icon"
          variant="ghost"
          onClick={createConversation}
          className="h-8 w-8"
          aria-label="New conversation"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      <Separator />

      {/* Conversation list */}
      <ScrollArea className="flex-1 px-2 py-2">
        <AnimatePresence>
          {conversations.length === 0 ? (
            <div className="flex flex-col items-center gap-2 py-8 text-center">
              <MessageSquare className="h-8 w-8 text-muted-foreground/40" />
              <p className="text-xs text-muted-foreground">No conversations yet</p>
            </div>
          ) : (
            conversations.map((conv) => (
              <motion.div
                key={conv.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="group relative"
              >
                <button
                  onClick={() => setActiveConversation(conv.id)}
                  className={cn(
                    "w-full text-left rounded-lg px-3 py-2.5 text-sm transition-colors mb-0.5",
                    activeConversationId === conv.id
                      ? "bg-stellar-500/15 text-foreground border border-stellar-500/20"
                      : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                  )}
                >
                  <p className="truncate font-medium leading-tight">{conv.title}</p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">
                    {formatRelativeTime(conv.updatedAt)}
                  </p>
                </button>

                {/* Delete button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteConversation(conv.id);
                  }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-destructive/20 hover:text-destructive transition-all"
                  aria-label="Delete conversation"
                >
                  <Trash2 className="h-3 w-3" />
                </button>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </ScrollArea>

      {/* Footer */}
      <Separator />
      <div className="p-3">
        <p className="text-[11px] text-muted-foreground text-center">
          Stellar AI ChainOracle v0.1.0
        </p>
      </div>
    </aside>
  );
}
