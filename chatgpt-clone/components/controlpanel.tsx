"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { RefreshCw, Code2, Terminal, X } from "lucide-react"

export default function DebugControlPanel({
  onModeChange,
}: {
  onModeChange: (mode: "full" | "partial") => void
}) {
  const [mode, setMode] = useState<"full" | "partial">("full")
  const [isOpen, setIsOpen] = useState(false)

  const handleModeChange = (newMode: "full" | "partial") => {
    setMode(newMode)
    onModeChange(newMode)
  }

  const togglePanel = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      {/* Chat Bubble Trigger */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={togglePanel}
          className="w-14 h-14 rounded-full bg-black hover:bg-gray-800 border-2 border-white shadow-2xl transition-all duration-300 hover:scale-110"
          size="icon"
        >
          <Terminal className="w-6 h-6 text-white" />
        </Button>
      </div>

      {/* Backdrop */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/20 z-40 transition-opacity duration-300" onClick={togglePanel} />
      )}

      {/* Control Panel */}
      <div
        className={`fixed bottom-24 right-6 w-80 bg-black border-2 border-white shadow-2xl z-50 transition-all duration-300 transform ${
          isOpen ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-95 pointer-events-none"
        }`}
      >
        {/* Terminal Header */}
        <div className="flex items-center justify-between bg-white text-black px-4 py-2 border-b-2 border-white">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <span className="text-sm font-mono font-bold">DEBUG.EXE</span>
          <Button variant="ghost" size="icon" onClick={togglePanel} className="w-6 h-6 p-0 hover:bg-gray-200">
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Terminal Body */}
        <div className="p-4 font-mono text-sm">
          {/* Command Prompt Line */}
          <div className="text-green-400 mb-4">
            <span className="text-white">C:\DEBUG{">"}</span>
            <span className="animate-pulse">_</span>
          </div>

          {/* Current Status */}
          <div className="text-gray-300 mb-4 text-xs">
            <div>STATUS: ACTIVE</div>
            <div>MODE: {mode.toUpperCase()}</div>
            <div>{"─".repeat(32)}</div>
          </div>

          {/* Mode Selection */}
          <div className="space-y-2">
            <div className="text-gray-400 text-xs mb-2">SELECT DEBUG MODE:</div>

            <Button
              variant={mode === "full" ? "default" : "ghost"}
              className={`w-full justify-start text-left font-mono text-xs h-8 ${
                mode === "full"
                  ? "bg-white text-black hover:bg-gray-200"
                  : "bg-transparent text-white hover:bg-gray-800 border border-gray-600"
              }`}
              onClick={() => handleModeChange("full")}
            >
              <RefreshCw className="w-3 h-3 mr-2" />
              [1] FULL_CODE_SCAN
            </Button>

            <Button
              variant={mode === "partial" ? "default" : "ghost"}
              className={`w-full justify-start text-left font-mono text-xs h-8 ${
                mode === "partial"
                  ? "bg-white text-black hover:bg-gray-200"
                  : "bg-transparent text-white hover:bg-gray-800 border border-gray-600"
              }`}
              onClick={() => handleModeChange("partial")}
            >
              <Code2 className="w-3 h-3 mr-2" />
              [2] DEBUG_ONLY_MODE
            </Button>
          </div>

          {/* Terminal Footer */}
          <div className="mt-4 pt-3 border-t border-gray-700">
            <div className="text-green-400 text-xs">
              {">"} MODE_SELECTED: {mode.toUpperCase()}
            </div>
            <div className="text-gray-500 text-[10px] mt-1">HACKER_MODE v2.1.0 - READY</div>
          </div>
        </div>
      </div>
    </>
  )
}
