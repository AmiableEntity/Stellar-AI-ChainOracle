import { Skeleton } from "@/components/ui/skeleton";
import { Bot } from "lucide-react";

/** Animated skeleton shown while the AI is generating a response */
export function ChatSkeleton() {
  return (
    <div className="flex gap-3 px-4 py-3">
      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-violet-500/20 text-violet-400 border border-violet-500/30">
        <Bot className="h-4 w-4" />
      </div>
      <div className="flex flex-col gap-2 pt-1 flex-1 max-w-[60%]">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-4/5" />
        <Skeleton className="h-4 w-3/5" />
      </div>
    </div>
  );
}
