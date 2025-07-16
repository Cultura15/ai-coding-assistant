import { useRef } from "react";

export function useAutoScrollToBottom(){
    const bottomRef = useRef<HTMLDivElement | null>(null)

     const scrollToBottom = () => {
        setTimeout(() => {
          bottomRef.current?.scrollIntoView({ behavior: "auto" });
        }, 0);
      }

      return {bottomRef, scrollToBottom}
}