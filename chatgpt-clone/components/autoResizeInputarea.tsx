"use client"

import { useEffect, useRef, useState } from "react"

interface AutoResizeTextareaProps {
  value: string
  onChange: (value: string) => void
  onKeyDown?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void
  placeholder?: string
  disabled?: boolean
  className?: string
  maxLines?: number
}

export default function AutoResizeTextarea({
  value,
  onChange,
  onKeyDown,
  placeholder = "",
  disabled = false,
  className = "",
  maxLines = 7,
}: AutoResizeTextareaProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [, setLineCount] = useState(1)

  useEffect(() => {
    const lines = value.split("\n").length
    setLineCount(lines)

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"

      if (lines <= maxLines) {
        textareaRef.current.style.overflowY = "hidden"
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
      } else {
        textareaRef.current.style.overflowY = "auto"
        textareaRef.current.style.height = "150px"
      }
    }
  }, [value, maxLines])

  return (
    <textarea
      ref={textareaRef}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={onKeyDown}
      placeholder={placeholder}
      className={className}
      disabled={disabled}
      rows={1}
    />
  )
}
