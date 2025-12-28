
import React, { useEffect, useState } from 'react';
import { X, Calendar, MapPin, Users, Clock, FileText, Share2, Mail, Phone, UserCheck, Mic2, Plus, CheckCircle, FlaskConical, Layers, ListChecks, ArrowRight, UserPlus, Send, Check, CreditCard, Ticket, ThumbsUp, Upload, BarChart2, Video, ExternalLink, Download, Shield, Lock } from 'lucide-react';
import { MedicalEventExtended } from '../constants.tsx';
import { useApp } from '../App.tsx';
import { SessionType, CommunicationType, PaymentMethod } from '../types';

interface EventDetailsModalProps {
  event: MedicalEventExtended;
  onClose: () => void;
}

type ModalTab = 'overview' | 'program' | 'workshops' | 'abstracts' | 'live';

const EventDetailsModal: React.FC<EventDetailsModalProps> = ({ event, onClose }) => {
  const { t, registeredEventIds, registerForEvent, registeredWorkshopIds, enrollInWorkshop, setView, setAuthIntent, user, addSubmission, submissions, questions, addQuestion, voteQuestion, polls, submitPollVote, withdrawSubmission } = useApp();
  const [activeTab, setActiveTab] = useState<ModalTab>('overview');
  const [showRegForm, setShowRegForm] = useState(false);
  const [regStep, setRegStep] = useState(1);
  const [regData, setRegData] = useState({ name: user?.name || '', phone: user?.profile.phoneNumber || '', payment: 'Online' as PaymentMethod });
  
  const [showSubmissionForm, setShowSubmissionForm] = useState(false);
  const [submissionTitle, setSubmissionTitle] = useState('');
  const [submissionKeywords, setSubmissionKeywords] = useState('');
  const [submissionType, setSubmissionType] = useState<CommunicationType>(CommunicationType.ORAL);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  const [liveQuestion, setLiveQuestion] = useState('');

  const handleOpenSubmission = () => {
    if (!user) {
      setAuthIntent('author_required');
      setView('auth');
      onClose();
    } else if (user.role !== 'Author') {
      // Logic safety: Should be unreachable if button is hidden, but good for robust code
      return;
    } else {
      setShowSubmissionForm(true);
    }
  };

  const isRegistered = registeredEventIds.includes(event.id);
  const userSubmissions = submissions.filter(s => s.eventId === event.id);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleOpenReg = () => {
    if (!user) {
      setAuthIntent('register_event');
      setView('auth');
      onClose();
    } else {
      setShowRegForm(true);
    }
  };

  const handleFinalizeReg = (e: React.FormEvent) => {
    e.preventDefault();
    if (regStep === 1) {
      setRegStep(2);
      return;
    }
    registerForEvent(event.id, regData);
    setShowRegForm(false);
  };

  const handleSubmitAbstract = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      addSubmission(event.id, submissionTitle, submissionType, submissionKeywords);
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setTimeout(() => {
        setSubmitSuccess(false);
        setShowSubmissionForm(false);
        setSubmissionTitle('');
        setSubmissionKeywords('');
      }, 2000);
    }, 1500);
  };

  const getSessionBadgeColor = (type: SessionType) => {
    switch (type) {
      case SessionType.PLENARY: return 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20';
      case SessionType.PARALLEL: return 'bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20';
      case SessionType.POSTER: return 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20';
      default: return 'bg-slate-500/10 text-slate-600 border-slate-500/20';
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-6 md:p-8 animate-in fade-in duration-300">
      <div className="absolute inset-0 bg-[#001E3C]/80 backdrop-blur-md" onClick={onClose}></div>
      
      <div className="relative w-full max-w-7xl max-h-full bg-slate-50 dark:bg-[#001428] rounded-[3.5rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col md:row animate-in zoom-in-95 duration-500 border border-white/10 md:flex-row transition-colors">
        
        {showRegForm && (
          <div className="absolute inset-0 z-[120] flex items-center justify-center bg-[#001E3C]/95 backdrop-blur-xl animate-in zoom-in-95 duration-300 p-8">
             <div className="max-w-md w-full bg-white dark:bg-[#001428] rounded-[3rem] p-10 shadow-2xl border border-white/10">
                <div className="flex justify-between items-center mb-8">
                   <h3 className="text-3xl font-black text-[#001E3C] dark:text-white italic tracking-tighter">Event <span className="text-sky-500">Access</span></h3>
                   <button onClick={() => setShowRegForm(false)} className="text-slate-400 hover:text-red-500 transition-colors"><X size={24}/></button>
                </div>
                
                <form onSubmit={handleFinalizeReg} className="space-y-6">
                   {regStep === 1 ? (
                     <div className="space-y-6 animate-in slide-in-from-right-4">
                        <div className="space-y-3">
                           <label className="text-[10px] font-black uppercase text-slate-400 ml-4">Full Participant Name</label>
                           <input 
                            type="text" 
                            required 
                            value={regData.name} 
                            onChange={(e) => setRegData({...regData, name: e.target.value})}
                            className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl py-4 px-6 font-bold text-[#001E3C] dark:text-white focus:outline-none focus:ring-4 focus:ring-sky-500/10"
                           />
                        </div>
                        <div className="space-y-3">
                           <label className="text-[10px] font-black uppercase text-slate-400 ml-4">Phone Number</label>
                           <input 
                            type="tel" 
                            required 
                            placeholder="+213..."
                            value={regData.phone} 
                            onChange={(e) => setRegData({...regData, phone: e.target.value})}
                            className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl py-4 px-6 font-bold text-[#001E3C] dark:text-white focus:outline-none focus:ring-4 focus:ring-sky-500/10"
                           />
                        </div>
                        <button type="submit" className="w-full py-5 bg-sky-500 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-sky-500/20 active:scale-95 transition-all">Next: Payment Options</button>
                     </div>
                   ) : (
                     <div className="space-y-6 animate-in slide-in-from-right-4">
                        <p className="text-xs font-bold text-slate-500 dark:text-slate-400 text-center mb-8 italic">Choose how you would like to secure your ticket.</p>
                        <div className="grid grid-cols-1 gap-4">
                           <button 
                            type="button" 
                            onClick={() => setRegData({...regData, payment: 'Online'})}
                            className={`p-6 rounded-2xl border flex items-center gap-4 transition-all ${regData.payment === 'Online' ? 'bg-sky-500/10 border-sky-500 text-sky-500' : 'bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-400'}`}
                           >
                              <CreditCard size={24}/>
                              <div className="text-left">
                                 <p className="font-black text-xs uppercase tracking-widest">Pay Online</p>
                                 <p className="text-[9px] font-bold opacity-60">Credit Card / Electronic Transfer</p>
                              </div>
                           </button>
                           <button 
                            type="button" 
                            onClick={() => setRegData({...regData, payment: 'On-Site'})}
                            className={`p-6 rounded-2xl border flex items-center gap-4 transition-all ${regData.payment === 'On-Site' ? 'bg-sky-500/10 border-sky-500 text-sky-500' : 'bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-400'}`}
                           >
                              <Ticket size={24}/>
                              <div className="text-left">
                                 <p className="font-black text-xs uppercase tracking-widest">Pay at Event</p>
                                 <p className="text-[9px] font-bold opacity-60">Settlement during check-in</p>
                              </div>
                           </button>
                        </div>
                        <div className="flex gap-4 pt-4">
                           <button type="button" onClick={() => setRegStep(1)} className="px-6 py-5 bg-slate-50 dark:bg-white/5 text-slate-400 rounded-2xl font-black text-xs uppercase tracking-widest">Back</button>
                           <button type="submit" className="flex-1 py-5 bg-sky-500 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-sky-500/20 active:scale-95 transition-all">Confirm Registration</button>
                        </div>
                     </div>
                   )}
                </form>
             </div>
          </div>
        )}

        <button onClick={onClose} className="absolute top-8 right-8 z-[110] p-3 bg-white/10 hover:bg-white/20 dark:bg-black/20 dark:hover:bg-black/40 rounded-full text-white backdrop-blur-md transition-all active:scale-90 border border-white/10">
          <X size={24} />
        </button>

        <div className="w-full md:w-1/3 h-64 md:h-auto relative overflow-hidden bg-[#001E3C]">
          <img src={event.image} alt={event.title} className="w-full h-full object-cover opacity-60 grayscale-[30%] hover:grayscale-0 transition-all duration-1000" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#001E3C] via-[#001E3C]/40 to-transparent"></div>
          
          <div className="absolute bottom-12 left-10 right-10 text-white space-y-8">
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-sky-500 rounded-lg text-[10px] font-black uppercase tracking-widest backdrop-blur-sm">Scientific Congress</span>
              <span className="px-3 py-1 bg-white/10 border border-white/20 rounded-lg text-[10px] font-black uppercase tracking-widest backdrop-blur-sm">{event.theme}</span>
            </div>
            <h2 className="text-3xl lg:text-5xl font-black tracking-tighter leading-[0.9] italic">{event.title}</h2>
            
            <div className="space-y-4 pt-4 border-t border-white/10">
              <div className="flex items-center gap-4 text-sky-200">
                <Calendar size={20} className="shrink-0" />
                <span className="font-bold text-sm">{event.startDate} — {event.endDate}</span>
              </div>
              <div className="flex items-center gap-4 text-sky-200">
                <MapPin size={20} className="shrink-0" />
                <span className="font-bold text-sm truncate">{event.location}</span>
              </div>
            </div>

            <div className="pt-8">
               <button onClick={handleOpenReg} disabled={isRegistered} className={`w-full py-5 font-black rounded-[2rem] text-lg shadow-2xl transition-all flex items-center justify-center gap-3 ${isRegistered ? 'bg-green-500 text-white' : 'bg-[#0EA5E9] hover:bg-sky-400 text-white shadow-sky-500/20 active:scale-95'}`}>
                  {isRegistered ? <><CheckCircle size={24} /> Registered</> : <>Register Now — {event.price}</>}
                </button>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-hidden flex flex-col bg-white dark:bg-[#001428]">
          <div className="px-8 md:px-16 pt-12 flex flex-wrap gap-6 border-b border-slate-100 dark:border-white/5">
            {[
              { id: 'overview', label: 'Overview', icon: <Layers size={18} /> },
              { id: 'program', label: 'Program', icon: <Clock size={18} /> },
              { id: 'workshops', label: 'Workshops', icon: <ListChecks size={18} /> },
              { id: 'abstracts', label: 'Submissions', icon: <FlaskConical size={18} /> },
              { id: 'live', label: 'Live Q&A', icon: <Mic2 size={18} /> }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => { setActiveTab(tab.id as ModalTab); setShowSubmissionForm(false); }}
                className={`pb-4 flex items-center gap-2 text-xs font-black uppercase tracking-widest transition-all relative ${activeTab === tab.id ? 'text-sky-500' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'}`}
              >
                {tab.icon}
                {tab.label}
                {activeTab === tab.id && <div className="absolute bottom-0 left-0 right-0 h-1 bg-sky-500 rounded-full animate-in fade-in slide-in-from-bottom-2"></div>}
              </button>
            ))}
          </div>

          <div className="flex-1 overflow-y-auto p-8 md:p-16 custom-scrollbar">
            {activeTab === 'overview' && (
              <div className="space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <section>
                  <h3 className="text-2xl font-black text-[#001E3C] dark:text-white mb-6 tracking-tight flex items-center gap-3 italic underline decoration-sky-500/30 underline-offset-8">Description</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed font-medium">{event.description}</p>
                </section>
                <section>
                  <h3 className="text-xl font-black text-[#001E3C] dark:text-white mb-10 tracking-tight flex items-center gap-3"><Mic2 className="text-sky-500" />Keynote Speakers</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    {event.speakers.map((speaker, i) => (
                      <div key={i} className="flex items-center gap-6 p-6 bg-slate-50 dark:bg-[#001E3C]/40 rounded-3xl border border-slate-100 dark:border-white/5 group hover:border-sky-500/30 transition-all shadow-sm">
                        <div className="w-20 h-20 rounded-2xl overflow-hidden shrink-0 shadow-lg border-2 border-white dark:border-white/10 group-hover:scale-105 transition-transform">
                          <img src={speaker.image} alt={speaker.name} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <h4 className="font-black text-[#001E3C] dark:text-white text-base leading-tight">{speaker.name}</h4>
                          <p className="text-xs text-sky-500 font-bold mt-1 uppercase tracking-wider">{speaker.role}</p>
                          <p className="text-[10px] text-slate-500 font-bold mt-2 uppercase tracking-widest">{speaker.institution}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            )}

            {activeTab === 'program' && (
              <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-2xl font-black text-[#001E3C] dark:text-white italic tracking-tight">Scientific Schedule</h3>
                  <button className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:text-sky-500 transition-colors">
                    <Download size={14}/> Download PDF
                  </button>
                </div>
                
                {event.sessions.length > 0 ? (
                  <div className="space-y-6">
                    {event.sessions.map((session, i) => (
                      <div key={session.id} className="relative pl-12 group">
                        <div className="absolute left-0 top-0 bottom-0 w-px bg-slate-200 dark:bg-white/10 group-last:bottom-auto group-last:h-10"></div>
                        <div className="absolute left-[-6px] top-2 w-3 h-3 rounded-full bg-sky-500 shadow-[0_0_15px_rgba(14,165,233,0.5)]"></div>
                        
                        <div className="bg-white dark:bg-white/5 p-8 rounded-[2.5rem] border border-slate-100 dark:border-white/5 shadow-sm group-hover:shadow-xl group-hover:border-sky-500/20 transition-all">
                          <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
                             <div className="space-y-1">
                                <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border ${getSessionBadgeColor(session.type)}`}>
                                   {session.type} Session
                                </span>
                                <div className="flex items-center gap-4 mt-3">
                                   <div className="flex items-center gap-2 text-slate-400 font-black text-xs uppercase tracking-widest">
                                      <Clock size={14} className="text-sky-500"/> {session.time}
                                   </div>
                                   <div className="flex items-center gap-2 text-slate-400 font-black text-xs uppercase tracking-widest">
                                      <MapPin size={14} className="text-sky-500"/> {session.room}
                                   </div>
                                </div>
                             </div>
                             <div className="text-right">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Chairperson</p>
                                <p className="text-sm font-black text-[#001E3C] dark:text-white italic leading-none">Pr. Bouraoui Kamel</p>
                             </div>
                          </div>
                          
                          <h4 className="text-xl font-black text-[#001E3C] dark:text-white italic tracking-tight mb-4">{session.title}</h4>
                          <p className="text-slate-500 dark:text-slate-400 text-sm font-medium leading-relaxed">{session.description}</p>
                          
                          {/* Slot for assigned communications */}
                          <div className="mt-8 pt-6 border-t border-slate-50 dark:border-white/5 flex items-center justify-between">
                             <div className="flex -space-x-3">
                                {[1,2,3].map(n => (
                                  <div key={n} className="w-8 h-8 rounded-full border-2 border-white dark:border-[#001428] bg-slate-100 dark:bg-white/10 flex items-center justify-center text-[10px] font-black">DR</div>
                                ))}
                                <div className="w-8 h-8 rounded-full border-2 border-white dark:border-[#001428] bg-sky-500 text-white flex items-center justify-center text-[10px] font-black">+5</div>
                             </div>
                             <button className="text-[10px] font-black uppercase text-sky-500 hover:underline">View Communications</button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-20 text-center opacity-30">
                    <Clock size={64} className="mx-auto mb-4" />
                    <p className="font-black uppercase tracking-widest text-xs">Detailed program is being finalized</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'workshops' && (
              <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {event.workshops.map(ws => {
                    const isEnrolled = registeredWorkshopIds.includes(ws.id);
                    return (
                      <div key={ws.id} className="bg-white dark:bg-white/5 rounded-[3rem] p-10 border border-slate-100 dark:border-white/5 shadow-xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform"><Mic2 size={120}/></div>
                        
                        <div className="flex justify-between items-start mb-8">
                           <span className="px-4 py-1.5 bg-sky-500 text-white text-[10px] font-black uppercase tracking-widest rounded-full">Intensive Training</span>
                           <div className="text-right">
                              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Seats Available</p>
                              <p className="text-lg font-black text-[#001E3C] dark:text-white italic">{ws.capacity - ws.enrolled} / {ws.capacity}</p>
                           </div>
                        </div>

                        <h4 className="text-2xl font-black text-[#001E3C] dark:text-white italic tracking-tight mb-4 leading-tight">{ws.title}</h4>
                        <div className="space-y-4 mb-10">
                           <div className="flex items-center gap-3 text-slate-500 font-bold text-sm"><UserCheck size={18} className="text-sky-500"/> {ws.animator}</div>
                           <div className="flex items-center gap-3 text-slate-500 font-bold text-sm"><Clock size={18} className="text-sky-500"/> {ws.time}</div>
                           <div className="flex items-center gap-3 text-slate-500 font-bold text-sm"><MapPin size={18} className="text-sky-500"/> {ws.location}</div>
                        </div>

                        <div className="space-y-4">
                           <button 
                            onClick={() => !isEnrolled && enrollInWorkshop(ws.id)}
                            disabled={isEnrolled}
                            className={`w-full py-5 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl transition-all flex items-center justify-center gap-3 ${isEnrolled ? 'bg-green-500 text-white' : 'bg-[#001E3C] dark:bg-sky-600 text-white active:scale-95'}`}
                           >
                             {isEnrolled ? <><CheckCircle size={18}/> Enrolled</> : <><Plus size={18}/> Secure My Place</>}
                           </button>
                           
                           {isEnrolled && (
                             <div className="pt-6 mt-6 border-t border-slate-50 dark:border-white/5 space-y-4 animate-in slide-in-from-top-2">
                                <h5 className="text-[10px] font-black uppercase text-sky-500 tracking-widest flex items-center gap-2"><Layers size={14}/> Support Materials</h5>
                                <div className="grid grid-cols-2 gap-3">
                                   <button className="flex items-center gap-2 p-3 bg-slate-50 dark:bg-[#001428] rounded-xl text-[10px] font-black text-slate-400 hover:text-sky-500 transition-all border border-transparent hover:border-sky-500/20">
                                      <FileText size={14}/> Abstract PDF
                                   </button>
                                   <button className="flex items-center gap-2 p-3 bg-slate-50 dark:bg-[#001428] rounded-xl text-[10px] font-black text-slate-400 hover:text-sky-500 transition-all border border-transparent hover:border-sky-500/20">
                                      <Video size={14}/> Introduction
                                   </button>
                                </div>
                             </div>
                           )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {activeTab === 'live' && (
              <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                   <div className="lg:col-span-2 space-y-8">
                      <div className="bg-sky-500/5 p-8 rounded-[2.5rem] border border-sky-500/10">
                         <h4 className="text-xl font-black text-[#001E3C] dark:text-white italic mb-6">Ask the Speakers</h4>
                         <form onSubmit={(e) => { e.preventDefault(); addQuestion('sess-live', liveQuestion); setLiveQuestion(''); }} className="relative">
                            <input 
                              type="text" 
                              value={liveQuestion}
                              onChange={e => setLiveQuestion(e.target.value)}
                              placeholder="Type your scientific question here..." 
                              className="w-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl py-4 pl-6 pr-14 font-bold text-sm"
                            />
                            <button className="absolute right-4 top-1/2 -translate-y-1/2 text-sky-500 hover:scale-110 transition-transform"><Send size={20}/></button>
                         </form>
                      </div>

                      <div className="space-y-4">
                         {questions.length > 0 ? questions.map(q => (
                           <div key={q.id} className="p-6 bg-white dark:bg-white/5 rounded-3xl border border-slate-100 dark:border-white/5 flex items-start justify-between group">
                              <div className="space-y-2">
                                 <div className="flex items-center gap-3">
                                    <span className="text-[9px] font-black uppercase text-sky-500 tracking-widest">{q.authorName}</span>
                                    <span className="text-[9px] font-bold text-slate-400">{q.timestamp}</span>
                                 </div>
                                 <p className="text-sm font-bold text-slate-700 dark:text-slate-300 italic">"{q.content}"</p>
                              </div>
                              <button onClick={() => voteQuestion(q.id)} className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border transition-all ${q.isLiked ? 'bg-sky-500 text-white border-sky-500' : 'bg-slate-50 dark:bg-white/10 text-slate-400 border-transparent hover:border-sky-500/30'}`}>
                                 <ThumbsUp size={14}/>
                                 <span className="text-[10px] font-black">{q.votes}</span>
                              </button>
                           </div>
                         )) : (
                           <div className="text-center py-20 opacity-30">
                              <Mic2 className="mx-auto mb-4" size={48}/>
                              <p className="text-xs font-black uppercase tracking-widest">Questions will appear here in real-time</p>
                           </div>
                         )}
                      </div>
                   </div>

                   <div className="space-y-8">
                      <div className="bg-[#001E3C] p-8 rounded-[2.5rem] border border-white/5 shadow-2xl">
                         <h4 className="text-white font-black italic mb-6 flex items-center gap-3"><BarChart2 size={20} className="text-sky-500"/> Current Poll</h4>
                         {polls.map(p => (
                           <div key={p.id} className="space-y-6">
                              <p className="text-sm text-sky-100 font-bold leading-relaxed">{p.question}</p>
                              <div className="space-y-3">
                                 {p.options.map(o => (
                                   <button key={o.id} onClick={() => submitPollVote(p.id, o.id)} className="w-full text-left p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-sky-500/50 transition-all group">
                                      <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-sky-400 mb-2">
                                         <span>{o.text}</span>
                                         <span>{o.votes}</span>
                                      </div>
                                      <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                                         <div className="h-full bg-sky-500 transition-all duration-1000" style={{ width: `${Math.min(o.votes * 2, 100)}%` }}></div>
                                      </div>
                                   </button>
                                 ))}
                              </div>
                           </div>
                         ))}
                      </div>
                   </div>
                </div>
              </div>
            )}

            {activeTab === 'abstracts' && (
              <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {!showSubmissionForm ? (
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10 p-10 bg-sky-500/5 rounded-[3rem] border border-sky-500/10">
                    <div className="flex-1">
                      <h3 className="text-3xl font-black text-[#001E3C] dark:text-white italic mb-4">Call for Papers</h3>
                      <p className="text-slate-500 font-medium leading-relaxed">Selected abstracts (Oral, Poster) will be published in the final conference journal.</p>
                    </div>
                    {(!user || user.role === 'Author') ? (
                      <button onClick={handleOpenSubmission} className="flex items-center justify-center gap-4 px-10 py-5 bg-sky-500 hover:bg-sky-400 text-white rounded-[2rem] font-black text-lg uppercase tracking-widest shadow-2xl transition-all active:scale-95">
                        <Send size={24} /> Submit Research
                      </button>
                    ) : (
                      <div className="flex flex-col items-center gap-3 p-6 bg-amber-500/5 border border-amber-500/10 rounded-3xl max-w-xs text-center">
                         <Lock size={20} className="text-amber-500" />
                         <p className="text-[11px] font-black uppercase text-amber-600 tracking-wider">Submission Restricted</p>
                         <p className="text-[10px] text-slate-500 font-bold">Only users with the 'Author' role are permitted to submit scientific communications.</p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="bg-slate-100 dark:bg-white/5 p-10 rounded-[3rem] border border-slate-200 dark:border-white/10 animate-in zoom-in-95">
                    {submitSuccess ? (
                      <div className="text-center py-10">
                        <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center text-white mx-auto mb-6"><Check size={32} /></div>
                        <h4 className="text-2xl font-black text-[#001E3C] dark:text-white italic mb-2">Transmitted to Committee</h4>
                        <p className="text-slate-500 font-medium">Under scientific review.</p>
                      </div>
                    ) : (
                      <form onSubmit={handleSubmitAbstract} className="space-y-8">
                        <div className="flex items-center justify-between">
                           <h3 className="text-2xl font-black text-[#001E3C] dark:text-white italic tracking-tight">Scientific Submission</h3>
                           <button type="button" onClick={() => setShowSubmissionForm(false)} className="text-slate-400 hover:text-red-500"><X size={20}/></button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                           <div className="space-y-3">
                              <label className="text-[10px] font-black uppercase text-slate-400 ml-4">Research Title</label>
                              <input type="text" required placeholder="Full Title..." value={submissionTitle} onChange={e => setSubmissionTitle(e.target.value)} className="w-full bg-white dark:bg-[#001428] border border-slate-200 dark:border-white/10 rounded-2xl py-4 px-6 font-bold text-[#001E3C] dark:text-white focus:outline-none" />
                           </div>
                           <div className="space-y-3">
                              <label className="text-[10px] font-black uppercase text-slate-400 ml-4">Keywords (Comma separated)</label>
                              <input type="text" required placeholder="e.g. Cardiology, AI, MRI" value={submissionKeywords} onChange={e => setSubmissionKeywords(e.target.value)} className="w-full bg-white dark:bg-[#001428] border border-slate-200 dark:border-white/10 rounded-2xl py-4 px-6 font-bold text-[#001E3C] dark:text-white focus:outline-none" />
                           </div>
                        </div>
                        <div className="space-y-3">
                           <label className="text-[10px] font-black uppercase text-slate-400 ml-4">Full Manuscript Upload (PDF)</label>
                           <div className="border-2 border-dashed border-slate-200 dark:border-white/10 rounded-3xl p-10 flex flex-col items-center justify-center gap-4 bg-white/5 hover:bg-sky-500/5 hover:border-sky-500/30 transition-all cursor-pointer">
                              <Upload size={32} className="text-sky-500"/>
                              <p className="text-xs font-black uppercase tracking-widest text-slate-500">Drag & Drop or Click to Select File</p>
                              <p className="text-[9px] font-bold text-slate-400 uppercase">Max Size: 10MB • Format: PDF</p>
                           </div>
                        </div>
                        <button type="submit" disabled={isSubmitting} className="w-full py-5 bg-[#001E3C] dark:bg-sky-500 text-white font-black rounded-2xl shadow-xl uppercase tracking-widest">
                          {isSubmitting ? 'Transmitting Data...' : 'Confirm Submission'}
                        </button>
                      </form>
                    )}
                  </div>
                )}
                <div className="grid grid-cols-1 gap-6 pt-8">
                   {userSubmissions.map(sub => (
                     <div key={sub.id} className="bg-sky-500/5 p-8 rounded-[2.5rem] border border-sky-500/20 relative group">
                        <div className="absolute top-0 right-0 p-6 flex gap-2">
                           <span className="px-3 py-1 bg-sky-500 text-white text-[8px] font-black uppercase rounded-full">Your Submission</span>
                           <button onClick={() => withdrawSubmission(sub.id)} className="text-red-500 p-1 hover:scale-110 transition-transform"><X size={14}/></button>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border mb-4 inline-block ${sub.status === 'Accepted' ? 'text-emerald-500 border-emerald-500/20 bg-emerald-500/5' : sub.status === 'Rejected' ? 'text-red-500 border-red-500/20 bg-red-500/5' : 'text-amber-500 border-amber-500/20 bg-amber-500/5'}`}>
                          {sub.status}
                        </span>
                        <h4 className="text-xl font-black text-[#001E3C] dark:text-white italic leading-tight mb-4">{sub.title}</h4>
                        {sub.keywords && <div className="flex flex-wrap gap-2 mb-4">{sub.keywords.split(',').map(kw => <span key={kw} className="text-[9px] font-bold text-slate-400 italic">#{kw.trim()}</span>)}</div>}
                     </div>
                   ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailsModal;
