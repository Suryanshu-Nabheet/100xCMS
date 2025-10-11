"use client";

import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

interface CodeBlockProps {
  language: string;
  filename?: string;
  highlightLines?: number[];
  code: string;
  className?: string;
}

export function CodeBlock({
  language,
  filename,
  highlightLines = [],
  code,
  className = "",
}: CodeBlockProps) {
  return (
    <div className={`relative ${className}`}>
      {filename && (
        <div className="bg-gray-800 text-gray-300 px-4 py-2 text-sm font-mono border-b border-gray-700">
          {filename}
        </div>
      )}
      <SyntaxHighlighter
        language={language}
        style={oneDark}
        showLineNumbers={true}
        wrapLines={true}
        lineProps={(lineNumber) => {
          const style: React.CSSProperties = {};
          if (highlightLines.includes(lineNumber)) {
            style.backgroundColor = "rgba(59, 130, 246, 0.1)";
            style.borderLeft = "3px solid #3b82f6";
            style.paddingLeft = "8px";
          }
          return { style };
        }}
        customStyle={{
          margin: 0,
          borderRadius: filename ? "0 0 8px 8px" : "8px",
          fontSize: "14px",
          lineHeight: "1.5",
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}
