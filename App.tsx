import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Message, Sender, ChatSession } from './types';
import { streamResponse, resetSession } from './services/openaiService';
import LogoBackground from './components/LogoBackground';
import ChatMessage from './components/ChatMessage';

// --- Icons ---
const MenuIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white hover:text-brand-red transition-colors">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
  </svg>
);

const PlusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
  </svg>
);

const TrashIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
  </svg>
);

const SendIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
  </svg>
);

// Suggestion Icons (Accepting className for flexibility)
const PlanIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
  </svg>
);

const DiningIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819" />
  </svg>
);

const StatsIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
  </svg>
);

const FlashIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
  </svg>
);

const App: React.FC = () => {
  // State
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const SUGGESTIONS = [
    { text: "Draft a 2200 kcal high-protein meal plan with steak.", icon: PlanIcon },
    { text: "What should I eat at a steakhouse while on a cut?", icon: DiningIcon },
    { text: "Calculate macros for a 200lb male, 12% bodyfat.", icon: StatsIcon },
    { text: "Give me a quick high-protein breakfast idea.", icon: FlashIcon }
  ];

  // --- Persistence Logic ---

  // Load from LocalStorage on mount
  useEffect(() => {
    const savedSessions = localStorage.getItem('6pack_chat_history');
    if (savedSessions) {
      try {
        const parsed = JSON.parse(savedSessions);
        setSessions(parsed);
      } catch (e) {
        console.error("Failed to parse history", e);
      }
    }
    // Start a fresh session if none selected
    startNewChat(false);
  }, []);

  // Save to LocalStorage whenever sessions update
  useEffect(() => {
    if (sessions.length > 0) {
      localStorage.setItem('6pack_chat_history', JSON.stringify(sessions));
    }
  }, [sessions]);

  // Update current session in the list whenever messages change
  useEffect(() => {
    if (!currentSessionId || messages.length === 0) return;

    setSessions(prev => prev.map(session => {
      if (session.id === currentSessionId) {
        // Generate a title if it's "New Chat" and we have a user message
        let newTitle = session.title;
        if (session.title === 'New Chat' && messages.length > 0) {
          const firstUserMsg = messages.find(m => m.sender === Sender.User);
          if (firstUserMsg) {
            newTitle = firstUserMsg.text.slice(0, 30) + (firstUserMsg.text.length > 30 ? '...' : '');
          }
        }
        return {
          ...session,
          messages: messages,
          title: newTitle,
          lastModified: Date.now()
        };
      }
      return session;
    }));
  }, [messages, currentSessionId]);

  // --- Actions ---

  const startNewChat = (shouldCloseSidebar = true) => {
    const newId = Date.now().toString();
    const newSession: ChatSession = {
      id: newId,
      title: 'New Chat',
      messages: [],
      lastModified: Date.now()
    };
    
    setSessions(prev => [newSession, ...prev]);
    setCurrentSessionId(newId);
    setMessages([]);
    resetSession([]); // Reset Gemini Context
    if (shouldCloseSidebar) setIsSidebarOpen(false);
  };

  const loadSession = (sessionId: string) => {
    const session = sessions.find(s => s.id === sessionId);
    if (session) {
      setCurrentSessionId(sessionId);
      setMessages(session.messages);
      resetSession(session.messages); // Restore Gemini Context
      setIsSidebarOpen(false);
    }
  };

  const deleteSession = (e: React.MouseEvent, sessionId: string) => {
    e.stopPropagation();
    setSessions(prev => prev.filter(s => s.id !== sessionId));
    if (currentSessionId === sessionId) {
      startNewChat(false);
    }
  };

  // --- Chat Logic ---

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = `${Math.min(inputRef.current.scrollHeight, 120)}px`;
    }
  }, [inputValue]);

  const handleSendMessage = useCallback(async () => {
    if (!inputValue.trim() || isTyping) return;

    const userText = inputValue.trim();
    setInputValue('');
    if (inputRef.current) inputRef.current.style.height = 'auto';

    const userMsg: Message = {
      id: Date.now().toString(),
      text: userText,
      sender: Sender.User,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    const botMsgId = (Date.now() + 1).toString();
    const botMsg: Message = {
      id: botMsgId,
      text: '',
      sender: Sender.Bot,
      timestamp: new Date(),
      isStreaming: true,
    };

    setMessages((prev) => [...prev, botMsg]);

    try {
      await streamResponse(userText, (streamedText) => {
        setMessages((prev) => 
          prev.map((msg) => 
            msg.id === botMsgId ? { ...msg, text: streamedText } : msg
          )
        );
      });
    } catch (error) {
      console.error(error);
    } finally {
      setMessages((prev) => 
        prev.map((msg) => 
          msg.id === botMsgId ? { ...msg, isStreaming: false } : msg
        )
      );
      setIsTyping(false);
    }
  }, [inputValue, isTyping]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const hasMessages = messages.length > 0;

  return (
    <div className="flex h-full bg-brand-dark overflow-hidden">
      
      {/* --- Sidebar (History) --- */}
      <div 
        className={`fixed inset-y-0 left-0 z-40 w-72 bg-brand-surface transform transition-transform duration-300 ease-in-out border-r border-brand-border
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 md:w-64 lg:w-72
        `}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="p-4 border-b border-brand-border flex items-center justify-between">
             <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-brand-red rounded-lg flex items-center justify-center text-white font-bold tracking-tighter shadow-lg shadow-brand-red/20">
                  6P
                </div>
                <h2 className="text-white font-bold tracking-tight">HISTORY</h2>
             </div>
             <button onClick={() => setIsSidebarOpen(false)} className="md:hidden text-gray-400">
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
               </svg>
             </button>
          </div>

          {/* New Chat Button */}
          <div className="p-4">
             <button 
                onClick={() => startNewChat()}
                className="w-full flex items-center justify-center gap-2 bg-brand-card hover:bg-brand-border border border-brand-border text-white py-3 rounded-lg transition-all duration-200 group"
             >
                <PlusIcon />
                <span className="font-medium text-sm group-hover:text-brand-red transition-colors">New Session</span>
             </button>
          </div>

          {/* Session List */}
          <div className="flex-1 overflow-y-auto px-2 space-y-1">
             {sessions.map(session => (
               <div 
                 key={session.id}
                 onClick={() => loadSession(session.id)}
                 className={`group flex items-center justify-between p-3 rounded-md cursor-pointer transition-all border border-transparent
                    ${currentSessionId === session.id ? 'bg-brand-card border-brand-border/50' : 'hover:bg-white/5'}
                 `}
               >
                  <div className="flex flex-col overflow-hidden">
                    <span className={`text-sm truncate ${currentSessionId === session.id ? 'text-white' : 'text-gray-400 group-hover:text-gray-200'}`}>
                      {session.title}
                    </span>
                    <span className="text-[10px] text-gray-600">
                      {new Date(session.lastModified).toLocaleDateString()}
                    </span>
                  </div>
                  
                  {/* Delete Button (Visible on Hover/Active) */}
                  <button 
                    onClick={(e) => deleteSession(e, session.id)}
                    className={`p-1 rounded text-gray-600 hover:text-brand-red hover:bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity`}
                  >
                    <TrashIcon />
                  </button>
               </div>
             ))}
          </div>
        </div>
      </div>

      {/* --- Main Chat Area --- */}
      <div className="flex-1 flex flex-col relative w-full h-full">
        {/* Mobile Overlay for Sidebar */}
        {isSidebarOpen && (
           <div 
             className="fixed inset-0 bg-black/80 z-30 md:hidden backdrop-blur-sm"
             onClick={() => setIsSidebarOpen(false)}
           />
        )}

        {/* Background Logo */}
        <LogoBackground isVisible={!hasMessages} />

        {/* Header */}
        <header className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-brand-dark/80 backdrop-blur-md border-b border-white/5">
          <div className="flex items-center gap-3">
            <button onClick={() => setIsSidebarOpen(true)} className="md:hidden p-1 -ml-2 text-gray-400">
               <MenuIcon />
            </button>
            <div className="flex flex-col">
              <h1 className="font-extrabold text-xl tracking-tight text-white flex items-center gap-2">
                6PACK<span className="text-brand-red">CEO</span>
              </h1>
              <p className="text-[10px] text-gray-500 font-semibold tracking-[0.2em] uppercase">Private Client Access</p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-brand-card border border-white/5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-red opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-red"></span>
              </span>
              <span className="text-xs text-gray-300 font-medium">LIVE</span>
          </div>
        </header>

        {/* Chat Feed */}
        <main className="flex-1 overflow-y-auto px-4 md:px-8 py-6 relative z-10 scroll-smooth flex flex-col">
          {messages.length === 0 ? (
             <div className="flex-1 flex flex-col justify-center items-center pb-12">
               <div className="text-center space-y-4 opacity-0 animate-fade-in" style={{ animationDelay: '0.1s' }}>
                  <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
                    Get 6Pack <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-red to-red-500">Lean</span>
                  </h2>
               </div>
               
               <div className="mt-12 w-full max-w-2xl grid grid-cols-1 md:grid-cols-2 gap-3 opacity-0 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                 {SUGGESTIONS.map((item, i) => (
                   <button 
                    key={i}
                    onClick={() => setInputValue(item.text)} 
                    className="
                      group relative text-left
                      p-4 flex items-center gap-4
                      h-20 rounded-2xl
                      bg-zinc-900/40 border border-white/5
                      hover:bg-zinc-800/60 hover:border-white/20 hover:shadow-lg
                      active:scale-[0.99]
                      transition-all duration-200
                    "
                   >
                     {/* Icon Container */}
                     <div className="
                       flex-shrink-0
                       flex items-center justify-center
                       w-10 h-10 rounded-xl
                       bg-white/5 border border-white/5
                       group-hover:bg-brand-red/10 group-hover:border-brand-red/20
                       group-hover:text-brand-red
                       text-gray-400
                       transition-all duration-200
                     ">
                        <item.icon className="w-5 h-5" />
                     </div>

                     {/* Text */}
                     <span className="
                       font-medium text-[13px] leading-snug
                       text-gray-300 group-hover:text-white
                       transition-colors duration-200
                     ">
                       {item.text}
                     </span>
                   </button>
                 ))}
               </div>
             </div>
          ) : (
            <div className="space-y-2 pb-4 max-w-4xl mx-auto w-full flex-1">
              {messages.map((msg) => (
                <ChatMessage key={msg.id} message={msg} />
              ))}
              <div ref={messagesEndRef} />
            </div>
          )}
        </main>

        {/* Input Area */}
        <footer className="sticky bottom-0 z-20 p-4 md:p-6 bg-gradient-to-t from-brand-dark via-brand-dark/95 to-transparent">
          <div className="max-w-4xl mx-auto">
            <div className="relative flex items-end gap-2 bg-brand-surface border border-white/10 rounded-2xl px-4 py-3 focus-within:ring-2 focus-within:ring-brand-red/50 focus-within:border-brand-red transition-all shadow-2xl shadow-black">
              {/* Glow effect */}
              <div className="absolute -inset-0.5 bg-brand-red/10 rounded-2xl blur opacity-0 transition-opacity duration-500 focus-within:opacity-100 -z-10"></div>
              
              <textarea
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask 6packCEO..."
                rows={1}
                className="w-full bg-transparent text-white placeholder-gray-500 text-base md:text-lg resize-none focus:outline-none max-h-32 py-1 scrollbar-hide font-medium"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isTyping}
                className={`p-2.5 rounded-xl transition-all duration-200 mb-0.5 flex-shrink-0
                  ${inputValue.trim() && !isTyping
                    ? 'bg-brand-red text-white hover:bg-red-700 shadow-lg shadow-red-900/40 hover:scale-105' 
                    : 'bg-white/5 text-gray-600 cursor-not-allowed'
                  }`}
              >
                <SendIcon />
              </button>
            </div>
            <div className="text-center mt-3 flex justify-center gap-4">
                <p className="text-[10px] text-gray-600 font-medium tracking-wide">6PACKCEO INTELLIGENCE SYSTEM v2.0</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default App;