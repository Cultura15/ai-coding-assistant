"use client"

import { useState, useEffect } from "react"
import { X, AlertCircle } from "lucide-react"

interface ValidationNotificationProps {
  isVisible: boolean
  onClose: () => void
  message?: string // Optional: still included for flexibility
}

export default function ValidationNotification({
  isVisible,
  onClose,
}: ValidationNotificationProps) {
  const [shouldRender, setShouldRender] = useState(false)

  useEffect(() => {
    if (isVisible) {
      setShouldRender(true)
    }
  }, [isVisible])

  const handleTransitionEnd = () => {
    if (!isVisible) {
      setShouldRender(false)
    }
  }

  if (!shouldRender) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${
          isVisible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
        onTransitionEnd={handleTransitionEnd}
      />

      {/* Notification Card */}
      <div
        className={`relative bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 p-6 max-w-md w-full mx-4 transform transition-all duration-300 ${
          isVisible
            ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
            : "opacity-0 scale-95 translate-y-4 pointer-events-none"
        }`}
        onTransitionEnd={handleTransitionEnd}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <AlertCircle className="h-6 w-6 text-amber-500" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Invalid Input</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <X className="h-5 w-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" />
          </button>
        </div>

        {/* Message with colored languages */}
        <div className="mb-6 text-gray-600 dark:text-gray-300 leading-relaxed">
        <p>Please enter your code with an explanation to be debugged.</p>
        <br></br>
        <p className="mt-2">Supported languages:</p>
            <ul className="list-disc list-inside mt-1 grid grid-cols-2 gap-x-6 gap-y-1">
                <li><span className="text-red-500 font-semibold">Java</span></li>
                <li><span className="text-blue-500 font-semibold">PHP</span></li>
                <li><span className="text-yellow-500 font-semibold">JavaScript</span></li>
                <li><span className="text-cyan-500 font-semibold">TypeScript</span></li>
                <li><span className="text-pink-500 font-semibold">HTML</span></li>
                <li><span className="text-purple-500 font-semibold">Tailwind CSS</span></li>
            </ul>
        </div>

        {/* Action Button */}
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  )
}
