import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Message, Sender } from '../types';

interface ChatMessageProps {
  message: Message;
}

const CopyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
  </svg>
);

const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
  </svg>
);

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.sender === Sender.User;
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(message.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'} animate-fade-in group`}>
      <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} max-w-[90%] md:max-w-[75%] w-full`}>

        {/* User Message: Matte Pill */}
        {isUser ? (
          <div className="bg-brand-surface text-white px-5 py-3 rounded-2xl rounded-tr-sm text-[15px] leading-relaxed shadow-sm border border-white/5">
            {message.text}
          </div>
        ) : (
          /* Bot Message: Pure Text (No Bubble) */
          <div className="relative w-full">
             {/* Label */}
             <div className="flex items-center gap-2 mb-3">
                <span className="text-[10px] text-brand-red font-bold tracking-[0.2em] uppercase">
                  6Pack Coach
                </span>
             </div>

             {/* Text Content */}
             <div className="text-gray-300 text-[15px] leading-7 markdown-content">
                <ReactMarkdown
                  components={{
                    strong: ({node, ...props}) => <strong className="font-bold text-white" {...props} />,
                    em: ({node, ...props}) => <em className="italic text-gray-200" {...props} />,
                    p: ({node, ...props}) => <p className="mb-3 last:mb-0" {...props} />,
                    ol: ({node, ...props}) => <ol className="list-decimal list-outside ml-5 mb-3 space-y-1.5" {...props} />,
                    ul: ({node, ...props}) => <ul className="list-disc list-outside ml-5 mb-3 space-y-1.5" {...props} />,
                    li: ({node, ...props}) => <li className="leading-7 pl-1" {...props} />,
                  }}
                >
                  {message.text}
                </ReactMarkdown>
                {message.isStreaming && (
                  <span className="inline-block ml-2 align-middle">
                     <span className="text-[10px] text-brand-red font-bold tracking-widest uppercase animate-pulse">Thinking...</span>
                  </span>
                )}
             </div>

             {/* Copy Button - Shows on hover */}
             {!message.isStreaming && (
               <button
                 onClick={handleCopy}
                 className="mt-3 flex items-center gap-2 text-gray-500 hover:text-gray-300 transition-colors text-xs opacity-0 group-hover:opacity-100"
                 title="Copy to clipboard"
               >
                 {copied ? (
                   <>
                     <CheckIcon />
                     <span>Copied</span>
                   </>
                 ) : (
                   <>
                     <CopyIcon />
                     <span>Copy</span>
                   </>
                 )}
               </button>
             )}

             {/* Separator */}
             <div className="mt-6 mb-2 border-t border-white/5"></div>
          </div>
        )}

      </div>
    </div>
  );
};

export default ChatMessage;