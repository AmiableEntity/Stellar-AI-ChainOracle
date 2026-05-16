"use client";

import { useState, useRef, type KeyboardEvent } from "react";
import { Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ChatInputProps {
  onSend: (message: string) => void;
  isLoading?: boolean;
  placeholder?: string;
  disabled?: boolean;
}

export function ChatInput({ onSend, isLoading, placeholder, disabled }: ChatInputProps) {
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = () => {
    const trimmed = value.trim();
    if (!trimmed || isLoading || disabled) return;
    onSend(trimmed);
    setValue("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInput = () => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 200)}px`;
  };

  return (
    <div className="relative flex items-end gap-2 rounded-xl border border-border/60 bg-card/80 backdrop-blur-sm p-3 shadow-lg focus-within:border-stellar-500/50 transition-colors">
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        onInput={handleInput}
        placeholder={
          placeholder ?? 'Ask about a Stellar wallet... e.g. "Analyze GABCD...WXYZ"'
        }
        disabled={disabled || isLoading}
        rows={1}
        className={cn(
          "flex-1 resize-none bg-transparent text-sm text-foreground placeholder:text-muted-foreground",
          "focus:outline-none disabled:opacity-50",
          "min-h-[24px] max-h-[200px] leading-6"
        )}
        aria-label="Chat message input"
      />
      <Button
        size="icon"
        variant="stellar"
        onClick={handleSend}
        disabled={!value.trim() || isLoading || disabled}
        className="h-8 w-8 flex-shrink-0"
        aria-label="Send message"
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Send className="h-4 w-4" />
        )}
      </Button>
    </div>
  );
}
