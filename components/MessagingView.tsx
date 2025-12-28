
import React, { useState, useRef, useEffect } from 'react';
// Fix: Added missing import for MessageSquare
import { Search, Send, User, ChevronLeft, MoreVertical, Paperclip, Smile, ShieldCheck, Clock, MessageSquare } from 'lucide-react';
import { useApp } from '../App';
import { Conversation, Message } from '../types';

const MessagingView: React.FC = () => {
  const { user, conversations, messages, sendMessage, setView, t } = useApp();
  const [activeConvId, setActiveConvId] = useState<string | null>(conversations[0]?.id || null);
  const [input, setInput] = useState('');
  const [search, setSearch] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  const activeConv = conversations.find(c => c.id === activeConvId);
  const activeMessages = messages.filter(m => m.conversationId === activeConvId);
  const otherParticipant = activeConv?.participants.find(p => p.id !== user?.id);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [activeMessages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !activeConvId) return;
    sendMessage(activeConvId, input.trim());
    setInput('');
  };

  const filteredConversations = conversations.filter(conv => {
    const other = conv.participants.find(p => p.id !== user?.id);
    return other?.name.toLowerCase().includes(search.toLowerCase()) || 
           other?.role.toLowerCase().includes(search.toLowerCase());
  });

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="font-bold text-slate-500">Please log in to use messaging.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#001428] pt-32 pb-12 px-6 animate-in fade-in duration-500 transition-colors">
      <div className="max-w-7xl mx-auto h-[75vh] flex bg-white dark:bg-[#001E3C] rounded-[3rem] shadow-2xl border border-slate-100 dark:border-white/5 overflow-hidden">
        
        {/* Sidebar: Conversation List */}
        <div className="w-full md:w-96 border-r border-slate-100 dark:border-white/5 flex flex-col">
          <div className="p-8">
            <button 
              onClick={() => setView('home')}
              className="flex items-center gap-2 text-slate-400 hover:text-sky-500 font-black text-[10px] uppercase tracking-widest mb-6 transition-all group"
            >
              <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              Back
            </button>
            <h2 className="text-3xl font-black text-[#001E3C] dark:text-white italic tracking-tighter mb-8">Messages</h2>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Search conversations..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full bg-slate-50 dark:bg-[#001428] border border-slate-100 dark:border-white/10 rounded-2xl py-4 pl-12 pr-4 font-bold text-sm focus:outline-none focus:ring-4 focus:ring-sky-500/10"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar">
            {filteredConversations.length > 0 ? (
              filteredConversations.map(conv => {
                const other = conv.participants.find(p => p.id !== user.id);
                const isActive = activeConvId === conv.id;
                return (
                  <button
                    key={conv.id}
                    onClick={() => setActiveConvId(conv.id)}
                    className={`w-full p-6 flex items-center gap-4 transition-all hover:bg-slate-50 dark:hover:bg-white/5 relative ${isActive ? 'bg-sky-500/5 dark:bg-sky-500/10' : ''}`}
                  >
                    {isActive && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-12 bg-sky-500 rounded-r-full"></div>}
                    <div className="relative shrink-0">
                      <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-white dark:border-white/10 shadow-lg">
                        <img src={other?.photo || 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=200'} className="w-full h-full object-cover" alt="" />
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white dark:border-[#001E3C] rounded-full"></div>
                    </div>
                    <div className="flex-1 min-w-0 text-left">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className={`font-black text-sm truncate tracking-tight ${isActive ? 'text-sky-500' : 'text-[#001E3C] dark:text-white'}`}>{other?.name}</h4>
                        <span className="text-[9px] font-black uppercase text-slate-400">10:30 AM</span>
                      </div>
                      <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">{other?.role}</p>
                      <p className="text-xs text-slate-500 truncate">{conv.lastMessage || 'Start a conversation...'}</p>
                    </div>
                  </button>
                );
              })
            ) : (
              <div className="p-10 text-center opacity-30">
                <User className="mx-auto mb-4" size={48} />
                <p className="text-xs font-black uppercase tracking-widest">No conversations found</p>
              </div>
            )}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col relative">
          {activeConv ? (
            <>
              {/* Chat Header */}
              <div className="p-8 border-b border-slate-100 dark:border-white/5 flex justify-between items-center bg-white/50 dark:bg-[#001E3C]/50 backdrop-blur-md">
                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 rounded-2xl overflow-hidden shadow-lg border border-slate-100 dark:border-white/10">
                    <img src={otherParticipant?.photo} className="w-full h-full object-cover" alt="" />
                  </div>
                  <div>
                    <h3 className="font-black text-[#001E3C] dark:text-white italic tracking-tight">{otherParticipant?.name}</h3>
                    <div className="flex items-center gap-2">
                       <span className="text-[9px] font-black uppercase tracking-widest text-sky-500">{otherParticipant?.role}</span>
                       <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                       <span className="text-[9px] font-black uppercase tracking-widest text-emerald-500">Online</span>
                    </div>
                  </div>
                </div>
                <button className="p-3 text-slate-400 hover:text-sky-500 hover:bg-sky-500/5 rounded-2xl transition-all">
                  <MoreVertical size={20} />
                </button>
              </div>

              {/* Message History */}
              <div ref={scrollRef} className="flex-1 overflow-y-auto p-10 space-y-8 custom-scrollbar bg-slate-50/30 dark:bg-transparent">
                {activeMessages.map(msg => {
                  const isMe = msg.senderId === user.id;
                  return (
                    <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2`}>
                      <div className={`max-w-[70%] group`}>
                        <div className={`p-6 rounded-[2.5rem] shadow-lg relative ${
                          isMe 
                          ? 'bg-sky-500 text-white rounded-tr-none' 
                          : 'bg-white dark:bg-[#001428] text-[#001E3C] dark:text-white rounded-tl-none border border-slate-100 dark:border-white/5'
                        }`}>
                          <p className="text-sm font-medium leading-relaxed">{msg.content}</p>
                        </div>
                        <div className={`flex items-center gap-3 mt-3 px-2 ${isMe ? 'justify-end' : 'justify-start'}`}>
                          <span className="text-[9px] font-black uppercase text-slate-400">{msg.timestamp}</span>
                          {isMe && <ShieldCheck size={12} className="text-sky-500" />}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Chat Input */}
              <div className="p-8 bg-white dark:bg-[#001E3C] border-t border-slate-100 dark:border-white/5">
                <form onSubmit={handleSend} className="flex items-center gap-4">
                  <button type="button" className="p-4 text-slate-400 hover:text-sky-500 hover:bg-sky-500/5 rounded-2xl transition-all shrink-0">
                    <Paperclip size={20} />
                  </button>
                  <div className="flex-1 relative">
                    <input 
                      type="text" 
                      placeholder="Type your message..."
                      value={input}
                      onChange={e => setInput(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-[#001428] border border-slate-100 dark:border-white/10 rounded-[2rem] py-5 px-8 font-bold text-sm focus:outline-none focus:ring-4 focus:ring-sky-500/10 pr-16"
                    />
                    <button type="button" className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 hover:text-sky-500">
                      <Smile size={20} />
                    </button>
                  </div>
                  <button 
                    type="submit"
                    disabled={!input.trim()}
                    className="p-5 bg-sky-500 text-white rounded-full shadow-xl shadow-sky-500/30 hover:bg-sky-400 active:scale-90 transition-all disabled:opacity-50 disabled:grayscale"
                  >
                    <Send size={24} />
                  </button>
                </form>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-12 space-y-6">
              <div className="w-32 h-32 rounded-[3rem] bg-sky-500/5 flex items-center justify-center text-sky-500 animate-float">
                <MessageSquare size={64} />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-black text-[#001E3C] dark:text-white italic tracking-tighter">Your Workspace Inbox</h3>
                <p className="text-slate-500 font-medium max-w-sm">Connect directly with organizers, speakers, and the scientific board.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessagingView;
