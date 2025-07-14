"use client"

import { Button } from "@/components/ui/button"
import { ChevronDown, Plus, Wrench, Mic, Settings, Info, Sparkles, Send } from "lucide-react"
import { useState, useEffect, useRef } from "react"

import {renderAssistantMessage} from "@/components/renderer"
import { isCodingPrompt } from "@/lib/ai/token-saver"

export default function HomePage() {
  const [prompt, setPrompt] = useState("")
  const [, setResponse] = useState("")
  const [loading, setLoading] = useState(false)
  const [messages, setMessages] = useState<Array<{ role: "user" | "assistant"; content: string }>>([])

   // Smooth scroll to bottom on new message
 const bottomRef = useRef<HTMLDivElement | null>(null)

  const handleSubmit = async (messageToSend?: string) => {
    const currentPrompt = messageToSend || prompt
    if (!currentPrompt.trim()) return

    if (!isCodingPrompt(prompt)){
      alert("Only coding-related questions are allowed.")
      return;
    }

    setLoading(true)

    // Add user message to chat
    const newMessages = [...messages, { role: "user" as const, content: currentPrompt }]
    setMessages(newMessages)
    setPrompt("")

    try {
    const res = await fetch("/api/ai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: currentPrompt }),
    });

    if (!res.body) throw new Error("No response body");

    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let fullText = "";

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value);
      fullText += chunk;

      // Stream response into assistant message
      setMessages((prevMessages) => {
        const updated = [...prevMessages];
        const last = updated[updated.length - 1];

        if (last?.role === "assistant") {
          updated[updated.length - 1] = { ...last, content: fullText };
        } else {
          updated.push({ role: "assistant", content: fullText });
        }

        return updated;
      });

      // Scroll smoothly during streaming
        if (autoScroll){
        setTimeout(() => {
          bottomRef.current?.scrollIntoView({ behavior: "auto" });
        }, 0);
      }
    }

    setResponse(fullText); // Optional
  } catch (err) {
    console.error(err);
    setMessages((prev) => [...prev, { role: "assistant", content: "Something went wrong. Please try again." }]);
  }

  setLoading(false);
};

  // Smooth scrolling breaker
  const [autoScroll, setAutoScroll] = useState(true);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = chatContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      const isAtBottom = scrollHeight - scrollTop <= clientHeight + 50; // buffer

      setAutoScroll(isAtBottom);
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);


  // Clears chat
  const clearChat = () => {
    setMessages([])
    setResponse("")
    setPrompt("")
  }


  // (Auto resize user input behavior with shift+enter) and (scroll limit)
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [, setLineCount] = useState(1);
  const maxLinesBeforeScroll = 7;

  useEffect(() => {
    const lines = prompt.split("\n").length
    setLineCount(lines);

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"

      if (lines <= maxLinesBeforeScroll){
        textareaRef.current.style.overflowY = "hidden"
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
      } else{
        textareaRef.current.style.overflowY = "auto"
        textareaRef.current.style.height = "150px";
      }
    }
  }, [prompt]);


 return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      {/* Top Navigation */}
      <header className="fixed top-0 left-0 right-0 z-10 flex items-center justify-between px-2 sm:px-4 py-3 border-b border-gray-700/50 bg-gray-900">
        {/* Left side - ChatGPT logo */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" className="text-white hover:bg-gray-700/50 p-1 sm:p-2" onClick={clearChat}>
            <span className="font-semibold text-base sm:text-lg">j15 AI</span>
            <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 ml-1" />
          </Button>
        </div>

        {/* Center - Hidden on mobile */}
        <div className="hidden md:flex items-center gap-2 text-gray-300 text-sm">
          <span>Created by Cultura</span>
          <Info className="w-4 h-4" />
        </div>

        {/* Right side - Actions */}
        <div className="flex items-center gap-1 sm:gap-3">
          <Button className="bg-purple-600 hover:bg-purple-700 text-white px-2 sm:px-4 py-1 sm:py-2 rounded-lg text-xs sm:text-sm">
            <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
            <span className="hidden sm:inline">Get Plus</span>
            <span className="sm:hidden">Plus</span>
          </Button>
          <Button variant="ghost" size="icon" className="text-gray-300 hover:bg-gray-700/50 w-8 h-8 sm:w-10 sm:h-10">
            <Settings className="w-4 h-4 sm:w-5 sm:h-5" />
          </Button>
          <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
            <span className="text-white text-xs sm:text-sm font-medium">U</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-col h-screen pt-[60px] pb-[80px] sm:pb-[100px] overflow-hidden">
        {/* Chat Messages Area */}
        {messages.length > 0 ? (
          <div className="flex-1 overflow-y-auto px-2 sm:px-4 py-4 sm:py-6 max-h-full">
            <div className="max-w-full sm:max-w-3xl lg:max-w-5xl mx-auto space-y-4 sm:space-y-6">
              {messages.map((message, index) => (
                <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[85%] sm:max-w-[80%] p-2 sm:p-3 rounded-2xl ${
                      message.role === "user"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-800/80 text-gray-100 border border-gray-600/50 text-xs sm:text-sm"
                    }`}
                  >
                    {message.role === "user" ? (
                      <div className="whitespace-pre-wrap text-sm sm:text-base">{message.content}</div>
                    ) : (
                      renderAssistantMessage(message.content)
                    )}
                  </div>
                </div>
              ))}
              <div ref={chatContainerRef}></div>
              <div ref={bottomRef}></div>
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-gray-800/80 text-gray-100 border border-gray-600/50 p-3 sm:p-4 rounded-2xl">
                    <div className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-3 w-3 sm:h-4 sm:w-4 border-b-2 border-white"></div>
                      <span className="text-sm sm:text-base">Thinking...</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Welcome Screen */
          <div className="flex-1 flex flex-col items-center justify-center px-4">
            <div className="w-full max-w-full sm:max-w-2xl lg:max-w-3xl mx-auto">
              {/* Main heading */}
              <h1 className="text-white text-lg sm:text-xl md:text-2xl font-medium text-center mb-8 sm:mb-12">
                Where should we begin?
              </h1>
            </div>
          </div>
        )}

        {/* Input area - Fixed at bottom */}
        <div className="fixed bottom-0 left-0 right-0 z-10 p-2 sm:p-4 border-t border-gray-700/50 bg-gray-900">
          <div className="max-w-full sm:max-w-2xl lg:max-w-3xl mx-auto">
            <div className="flex items-center bg-gray-800/80 border border-gray-600/50 rounded-xl p-1 sm:p-2 shadow-md backdrop-blur-sm min-h-[44px] sm:min-h-[48px]">
              {/* Tools button */}
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-400 hover:text-white hover:bg-gray-700/50 mr-1 sm:mr-3 flex items-center gap-1 sm:gap-2 px-2 sm:px-3"
              >
                <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
                <Wrench className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="text-xs sm:text-sm hidden sm:inline">Tools</span>
              </Button>

              {/* Input field */}
              <textarea
                ref={textareaRef}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault()
                    handleSubmit()
                  }
                }}
                rows={1}
                placeholder="Ask anything"
                className="flex-1 bg-transparent border-none text-white placeholder:text-gray-400 text-sm sm:text-base focus-visible:ring-0 focus-visible:ring-offset-0 px-1 sm:px-0 resize-none"
                disabled={loading}
              />

              {/* Right side buttons */}
              <div className="flex items-center gap-1 sm:gap-2 ml-1 sm:ml-3">
                {prompt.trim() && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-gray-400 hover:text-white hover:bg-gray-700/50 w-8 h-8 sm:w-10 sm:h-10"
                    onClick={() => handleSubmit()}
                    disabled={loading}
                  >
                    <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-400 hover:text-white hover:bg-gray-700/50 w-8 h-8 sm:w-10 sm:h-10"
                >
                  <Mic className="w-4 h-4 sm:w-5 sm:h-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-400 hover:text-white hover:bg-gray-700/50 w-8 h-8 sm:w-10 sm:h-10"
                >
                  <div className="w-4 h-4 sm:w-5 sm:h-5 bg-gray-500 rounded-sm"></div>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}




  {/* Previous versions (not in used) */}

//  <main>Hello World! <br></br>

//       <Link href = "/ssr-csr-hybrid-sample">Login</Link> <br></br>
//       <Link href = "/userSample">Users</Link>
//     </main>