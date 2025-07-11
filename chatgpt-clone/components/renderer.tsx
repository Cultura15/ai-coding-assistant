"use client"

import HighlightedCodeBlock from "./highlighter"
import React from "react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

export function renderAssistantMessage(content: string) {
  const lines = content.split("\n")
  const output: React.JSX.Element[] = []
  let currentFile: string | null = null
  let codeBuffer: string[] = []

  const pushBufferedCode = () => {
    if (codeBuffer.length > 0) {
      const rawCode = codeBuffer.join("\n")
      output.push(
        <HighlightedCodeBlock
          key={output.length}
          fileName={currentFile || undefined}
          code={rawCode}
        />
      )
      codeBuffer = []
      currentFile = null
    }
  }

  for (const line of lines) {
    const match = line.match(/^\[File:\s*(.+)\]/)
    if (match) {
      pushBufferedCode()
      currentFile = match[1]
    } else {
      codeBuffer.push(line)
    }
  }

  pushBufferedCode()

  return output.length > 0 ? (
    <div className="prose prose-invert max-w-none">{output}</div>
  ) : (
    <div className="prose prose-invert max-w-none">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </div>
  )
}

  