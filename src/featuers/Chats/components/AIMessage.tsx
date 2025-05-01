"use client";

import React, { useState } from "react";
import { Typography, Avatar, Button, Tooltip } from "antd";
import { RobotOutlined, CopyOutlined, CheckOutlined } from "@ant-design/icons";
import type { ChatMessage } from "@/utils/backend/modules/auth/types/chat.types";
import { getFormattedTime } from "@/utils/frontend/helpers/globals";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/cjs/styles/prism";
// Import the types from react-markdown
import type { Components } from "react-markdown";

const { Text } = Typography;

interface AIMessageProps {
  message: ChatMessage;
}

interface CodeBlockProps {
  language?: string;
  value: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({
  language = "javascript",
  value,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative">
      <div className="absolute right-2 top-2 z-10">
        <Tooltip title={copied ? "Copied!" : "Copy"}>
          <Button
            type="text"
            size="small"
            className="text-white hover:text-gray-300 flex items-center justify-center"
            onClick={handleCopy}
            icon={copied ? <CheckOutlined /> : <CopyOutlined />}
          />
        </Tooltip>
      </div>
      <SyntaxHighlighter
        language={language}
        style={tomorrow}
        className="rounded border border-gray-300 !my-2 !bg-gray-800"
        customStyle={{
          fontSize: "0.8rem",
          marginTop: "0.5rem",
          marginBottom: "0.5rem",
          padding: "2rem 1rem 1rem 1rem",
        }}
      >
        {value}
      </SyntaxHighlighter>
    </div>
  );
};

export const AIMessage: React.FC<AIMessageProps> = ({ message }) => {
  // Define properly typed components for ReactMarkdown
  const components: Components = {
    pre: ({ children }) => <div>{children}</div>,
    code: ({ className, children, inline }: any) => {
      if (inline) {
        return (
          <code className="bg-gray-100 px-1 py-0.5 rounded text-xs">
            {children}
          </code>
        );
      }

      const match = /language-(\w+)/.exec(className || "");
      const language = match ? match[1] : "javascript";

      return (
        <CodeBlock
          language={language}
          value={String(children).replace(/\n$/, "")}
        />
      );
    },
    p: ({ children }) => (
      <p className="break-words whitespace-normal mb-2 text-sm">{children}</p>
    ),
    a: ({ href, children }) => (
      <a
        href={href}
        className="text-[#1a936f] underline break-all"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    ),
    ul: ({ children }) => <ul className="list-disc pl-5 mb-2">{children}</ul>,
    ol: ({ children }) => (
      <ol className="list-decimal pl-5 mb-2">{children}</ol>
    ),
    li: ({ children }) => <li className="mb-1">{children}</li>,
    h1: ({ children }) => (
      <h1 className="text-xl font-bold mb-2">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-lg font-bold mb-2">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-md font-bold mb-2">{children}</h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-gray-300 pl-4 italic my-2">
        {children}
      </blockquote>
    ),
    table: ({ children }) => (
      <div className="overflow-x-auto my-2">
        <table className="min-w-full border-collapse border border-gray-300">
          {children}
        </table>
      </div>
    ),
    th: ({ children }) => (
      <th className="border border-gray-300 px-2 py-1 bg-gray-100">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="border border-gray-300 px-2 py-1">{children}</td>
    ),
  };

  return (
    <div className="flex justify-start mb-3 w-full">
      <div className="flex items-start gap-2 max-w-[70%]">
        <Avatar
          size={36}
          src={
            message?.sender?.profileImage || process.env.NEXT_PUBLIC_AI_AVATAR
          }
          icon={!message?.sender?.profileImage && <RobotOutlined />}
          className="bg-[#1a936f] mt-1 flex-shrink-0"
        />

        <div className="relative px-4 py-3 rounded-lg bg-[#f0f9f4] border border-[#d1e7dd] rounded-tl-none w-full">
          <div className="w-full break-words">
            <ReactMarkdown components={components}>
              {message?.message || ""}
            </ReactMarkdown>
          </div>

          <div className="flex items-center justify-end mt-2">
            <Text type="secondary" className="text-xs">
              {getFormattedTime(message?.createdAt)}
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
};
