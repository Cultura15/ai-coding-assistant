"use client"

import { Button } from "@/components/ui/button"
import { ChevronDown, Plus, Wrench, Mic, Settings, Info, Sparkles, Send } from "lucide-react"
import { useState, useEffect, useRef } from "react"

import {renderAssistantMessage} from "@/components/renderer"

export default function HomePage() {
  const [prompt, setPrompt] = useState("")
  const [response, setResponse] = useState("")
  const [loading, setLoading] = useState(false)
  const [messages, setMessages] = useState<Array<{ role: "user" | "assistant"; content: string }>>([])

  const handleSubmit = async (messageToSend?: string) => {
    const currentPrompt = messageToSend || prompt
    if (!currentPrompt.trim()) return

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
      })

      const data = await res.json()

      if (res.ok) {
        const aiResponse = data.reply || "No response."
        setMessages([...newMessages, { role: "assistant", content: aiResponse }])
        setResponse(aiResponse)
      } else {
        throw new Error(data.error || "Something went wrong")
      }
    } catch (err) {
      console.error(err)
      const errorMessage = "Something went wrong. Please try again."
      setMessages([...newMessages, { role: "assistant", content: errorMessage }])
      setResponse(errorMessage)
    }

    setLoading(false)
  }

  const handleExampleClick = (example: string) => {
    setPrompt(example)
  }

  const clearChat = () => {
    setMessages([])
    setResponse("")
    setPrompt("")
  }

  // (Auto resize user input behavior with shift+enter) and (scroll limit)
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [lineCount, setLineCount] = useState(1);
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
      <header className="fixed top-0 left-0 right-0 z-10 flex items-center justify-between px-4 py-3 border-b border-gray-700/50 bg-gray-900">
        {/* Left side - ChatGPT logo */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" className="text-white hover:bg-gray-700/50 p-2" onClick={clearChat}>
            <span className="font-semibold text-lg">ChatGPT</span>
            <ChevronDown className="w-4 h-4 ml-1" />
          </Button>
        </div>

        {/* Center */}
        <div className="flex items-center gap-2 text-gray-300 text-sm">
          <span>This is a clone version by Cultura</span>
          <Info className="w-4 h-4" />
        </div>

        {/* Right side - Actions */}
        <div className="flex items-center gap-3">
          <Button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg">
            <Sparkles className="w-4 h-4 mr-2" />
            Get Plus
          </Button>
          <Button variant="ghost" size="icon" className="text-gray-300 hover:bg-gray-700/50">
            <Settings className="w-5 h-5" />
          </Button>
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
            <span className="text-white text-sm font-medium">U</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-col h-screen pt-[60px] pb-[100px] overflow-hidden">
        {/* Chat Messages Area */}
        {messages.length > 0 ? (
          <div className="flex-1 overflow-y-auto px-4 py-6 max-h-full">
            <div className="max-w-3xl mx-auto space-y-6">
              {messages.map((message, index) => (
                <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl ${
                      message.role === "user"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-800/80 text-gray-100 border border-gray-600/50"
                    }`}
                  >
                    {message.role === "user"
                    ? <div className="whitespace-pre-wrap">{message.content}</div>
                    : renderAssistantMessage(message.content)}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-gray-800/80 text-gray-100 border border-gray-600/50 p-4 rounded-2xl">
                    <div className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Thinking...</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Welcome Screen */
          <div className="flex-1 flex flex-col items-center justify-center px-4">
            <div className="w-full max-w-3xl mx-auto">
              {/* Main heading */}
              <h1 className="text-white text-xl md:text-2xl font-medium text-center mb-12">Where should we begin?</h1> 
            </div>
          </div>  
        )}

        {/* Input area - Fixed at bottom */}
        <div className="fixed bottom-0 left-0 right-0 z-10 p-4 border-t border-gray-700/50 bg-gray-900">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center bg-gray-800/80 border border-gray-600/50 rounded-xl p-2 shadow-md backdrop-blur-sm min-h-[48px]">
              {/* Tools button */}
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-400 hover:text-white hover:bg-gray-700/50 mr-3 flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <Wrench className="w-4 h-4" />
                <span className="text-sm">Tools</span>
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
                className="flex-1 bg-transparent border-none text-white placeholder:text-gray-400 text-sm focus-visible:ring-0 focus-visible:ring-offset-0 px-0"
                disabled={loading}
              />

              {/* Right side buttons */}
              <div className="flex items-center gap-2 ml-3">
                {prompt.trim() && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-gray-400 hover:text-white hover:bg-gray-700/50"
                    onClick={() => handleSubmit()}
                    disabled={loading}
                  >
                    <Send className="w-5 h-5" />
                  </Button>
                )}
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-gray-700/50">
                  <Mic className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-gray-700/50">
                  <div className="w-5 h-5 bg-gray-500 rounded-sm"></div>
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