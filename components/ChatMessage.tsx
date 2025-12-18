import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Message, Sender } from '../types';

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.sender === Sender.User;

  return (
    <div className={`flex w-full mb-8 ${isUser ? 'justify-end' : 'justify-start'} animate-fade-in group`}>
      <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} max-w-[90%] md:max-w-[75%]`}>
        
        {/* User Message: Matte Pill */}
        {isUser ? (
          <div className="bg-brand-surface text-white px-5 py-3 rounded-2xl rounded-tr-sm text-[15px] leading-relaxed shadow-sm border border-white/5">
            {message.text}
          </div>
        ) : (
          /* Bot Message: Pure Text (No Bubble) */
          <div className="relative pl-1">
             {/* Label */}
             <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] text-brand-red font-bold tracking-[0.2em] uppercase">
                  6Pack Coach
                </span>
             </div>

             {/* Text Content */}
             <div className="text-gray-300 text-[15px] md:text-base leading-7 font-light markdown-content">
                <ReactMarkdown>
                  {message.text}
                </ReactMarkdown>
                {message.isStreaming && (
                  <span className="inline-block ml-2 align-middle">
                     <span className="text-[10px] text-brand-red font-bold tracking-widest uppercase animate-pulse">Thinking...</span>
                  </span>
                )}
             </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default ChatMessage;