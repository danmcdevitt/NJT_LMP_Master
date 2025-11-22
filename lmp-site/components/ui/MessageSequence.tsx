"use client";

import { useEffect, useState } from "react";

interface Message {
  id: string;
  text: string;
  sender: "user" | "agent";
  timestamp?: string;
  status?: "delivered" | "read";
}

interface MessageSequenceProps {
  messages?: Message[];
  agentName?: string;
  agentInitial?: string;
  showInput?: boolean;
}

const defaultMessages: Message[] = [
  {
    id: "1",
    text: "Been thinking about the Greek islands for next year",
    sender: "user",
  },
  {
    id: "2",
    text: "How about Corfu?",
    sender: "user",
  },
  {
    id: "3",
    text: "Looking for an adults-only boutique hotel 🥂",
    sender: "user",
    status: "delivered",
  },
  {
    id: "4",
    text: "I know just the place",
    sender: "agent",
  },
];

const MessageSequence = ({
  messages = defaultMessages,
  agentName = "Sarah Jones",
  agentInitial = "A",
  showInput = true,
}: MessageSequenceProps) => {
  const [visibleMessages, setVisibleMessages] = useState<Set<string>>(new Set());

  useEffect(() => {
    // Animate messages in sequence
    const userMessages = messages.filter((m) => m.sender === "user");
    const agentMessage = messages.find((m) => m.sender === "agent");

    // Show user messages with delays
    userMessages.forEach((msg, index) => {
      setTimeout(() => {
        setVisibleMessages((prev) => new Set(prev).add(msg.id));
      }, index * 600);
    });

    // Show agent message after last user message
    if (agentMessage) {
      const agentDelay = userMessages.length * 600 + 300;
      setTimeout(() => {
        setVisibleMessages((prev) => new Set(prev).add(agentMessage.id));
      }, agentDelay);
    }
  }, [messages]);

  return (
    <div className="relative w-full" style={{ transform: 'scale(0.75)', transformOrigin: 'bottom right' }}>
      {/* Chat Area Only */}
      <div className="relative flex flex-col bg-transparent rounded-2xl overflow-hidden">
        <div className="flex flex-col px-3 py-4 gap-2">
          {/* Date */}
          <div className="flex justify-center mb-2">
            <span className="text-[9px] font-semibold text-stone-400/80 uppercase tracking-wider">
              Today 9:41 AM
            </span>
          </div>

          {/* Messages */}
          {messages.map((message, index) => {
            const isVisible = visibleMessages.has(message.id);
            const isUser = message.sender === "user";
            const isLastUserMessage = isUser && index === messages.filter((m) => m.sender === "user").length - 1;

            if (!isVisible && !isUser) return null;

            return (
              <div
                key={message.id}
                className={`flex flex-col ${isUser ? "items-end self-end" : "items-start self-start"} max-w-[85%] ${
                  isVisible ? "animate-enter-message opacity-100" : "opacity-0"
                }`}
                style={{
                  animationDelay: isVisible ? `${index * 600}ms` : "0ms",
                }}
              >
                <div
                  className={`${
                    isUser
                      ? "text-[#004F6E] border-[#004F6E]/30 rounded-xl rounded-tr-sm"
                      : "text-stone-800 border-white/40 rounded-xl rounded-tl-sm"
                  } backdrop-blur-md px-4 py-3 shadow-sm border`}
                  style={{
                    backgroundColor: isUser 
                      ? 'rgba(159, 240, 212, 0.3)' 
                      : 'rgba(255, 255, 255, 0.4)',
                    WebkitBackdropFilter: 'blur(12px)',
                    backdropFilter: 'blur(12px)',
                  }}
                >
                  <p className="text-base font-medium leading-relaxed">{message.text}</p>
                </div>
                {isLastUserMessage && message.status && (
                  <span className="text-[9px] text-stone-400 font-medium pr-1 pt-0.5 mix-blend-multiply capitalize">
                    {message.status}
                  </span>
                )}
              </div>
            );
          })}

        </div>
      </div>

    </div>
  );
};

export { MessageSequence };

