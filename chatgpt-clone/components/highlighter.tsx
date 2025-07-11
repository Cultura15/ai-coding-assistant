"use client"

import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter"
import { materialDark } from "react-syntax-highlighter/dist/esm/styles/prism"

import java from "react-syntax-highlighter/dist/esm/languages/prism/java"
import php from "react-syntax-highlighter/dist/esm/languages/prism/php"
import typescript from "react-syntax-highlighter/dist/esm/languages/prism/typescript"
import tsx from "react-syntax-highlighter/dist/esm/languages/prism/tsx"
import javascript from "react-syntax-highlighter/dist/esm/languages/prism/javascript"
import jsx from "react-syntax-highlighter/dist/esm/languages/prism/jsx"
import html from "react-syntax-highlighter/dist/esm/languages/prism/markup"
import css from "react-syntax-highlighter/dist/esm/languages/prism/css"
import json from "react-syntax-highlighter/dist/esm/languages/prism/json"
import bash from "react-syntax-highlighter/dist/esm/languages/prism/bash"

SyntaxHighlighter.registerLanguage("java", java)
SyntaxHighlighter.registerLanguage("php", php)
SyntaxHighlighter.registerLanguage("ts", typescript)
SyntaxHighlighter.registerLanguage("typescript", typescript)
SyntaxHighlighter.registerLanguage("tsx", tsx)
SyntaxHighlighter.registerLanguage("js", javascript)
SyntaxHighlighter.registerLanguage("javascript", javascript)
SyntaxHighlighter.registerLanguage("jsx", jsx)
SyntaxHighlighter.registerLanguage("html", html)
SyntaxHighlighter.registerLanguage("markup", html)
SyntaxHighlighter.registerLanguage("css", css)
SyntaxHighlighter.registerLanguage("json", json)
SyntaxHighlighter.registerLanguage("sh", bash)
SyntaxHighlighter.registerLanguage("bash", bash)

interface HighlightedCodeBlockProps {
  fileName?: string
  code: string
}

export default function HighlightedCodeBlock({ fileName, code }: HighlightedCodeBlockProps) {
  const extensionToLanguageMap: Record<string, string> = {
    java: "java",
    php: "php",
    ts: "typescript",
    tsx: "tsx",
    js: "javascript",
    jsx: "jsx",
    html: "markup",
    css: "css",
    json: "json",
    sh: "bash",
    bash: "bash"
  }

  const fileExtension = fileName?.split(".").pop()?.toLowerCase() || ""
  const language = extensionToLanguageMap[fileExtension] || "text"

  return (
    <div className="mb-6 border border-gray-700 bg-gray-900 rounded-lg overflow-hidden shadow">
      {fileName && (
        <div className="bg-gray-800 px-4 py-2 border-b border-gray-700 text-sm font-medium text-purple-400">
          {fileName}
        </div>
      )}
      <SyntaxHighlighter
        language={language}
        style={materialDark}
        customStyle={{ margin: 0, padding: 16 }}
        wrapLongLines
        showLineNumbers
      >
        {code}
      </SyntaxHighlighter>
    </div>
  )
}
