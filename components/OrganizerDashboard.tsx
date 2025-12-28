
import React, { useState } from 'react';
import { 
  Calendar, FileText, CheckCircle2, Clock, Plus, Settings, ChevronRight, 
  Users, TrendingUp, AlertCircle, BarChart3, Edit3, UserCheck, XCircle, 
  Search, Info, Mic2, MapPin, MessageSquare, Download, ShieldCheck, 
  FileSpreadsheet, ClipboardList, Layout, Award
} from 'lucide-react';
import { useApp } from '../App';
import { MOCK_EVENTS } from '../constants';

const OrganizerDashboard: React.FC = () => {
  const { user, setView, setSelectedEvent, submissions, updateSubmissionStatus, events, addWorkshop, startNewConversation } = useApp();
  const [activeTab, setActiveTab] = useState<'admin' | 'workflow' | 'program' | 'reporting'>('admin');
  
  if (!user || user.role !== 'Organizer') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-12 bg-white dark:bg-[#001E3C] rounded-[3rem] shadow-2xl border border-slate-200 dark:border-white/5">
          <AlertCircle size={48} className="text-red-500 mx-auto mb-6" />
          <h2 className="text-2xl font-black italic tracking-tighter text-[#001E3C] dark:text-white mb-2">Access Restricted</h2>
          <p className="text-slate-500 font-medium">This administrative portal is exclusively for event organizers.</p>
        </div>
      </div>
    );
  }

  const activeEvents = events.filter(e => !e.isArchived);
  const pendingSubmissions = submissions.filter(s => s.status === 'Pending' || s.status === 'Under Review');

  const handleContactExpert = (org: any) => {
    startNewConversation({ id: org.id, name: org.name, role: org.role as any, photo: org.photo });
    setView('messaging');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#001428] pt-32 pb-24 px-6 transition-colors">
      <div className="max-w-7xl mx-auto">
        {/* Header - Overview */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-12 mb-16">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-black text-[#001E3C] dark:text-white italic tracking-tighter leading-none">
              Administrator <span className="text-sky-500">Hub</span>
            </h1>
            <p className="text-slate-500 dark:text-slate-400 font-medium text-lg">
              Full control over events, scientific decisions, and program logistics.
            </p>
          </div>
          <div className="flex gap-4">
             <button onClick={() => setView('create-event')} className="flex items-center gap-4 px-10 py-5 bg-sky-500 hover:bg-sky-400 text-white rounded-[2rem] font-black text-lg uppercase tracking-widest shadow-xl active:scale-95 transition-all">
              <Plus size={24} /> New Event
            </button>
          </div>
        </div>

        {/* The Four Pillars Navigation */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {[
            { id: 'admin', label: '1. Administration', icon: <Layout size={20}/>, desc: 'Manage Events & Committee' },
            { id: 'workflow', label: '2. Scientific Workflow', icon: <FileSpreadsheet size={20}/>, desc: 'Assignments & Final Decisions', badge: pendingSubmissions.length },
            { id: 'program', label: '3. Program Logistics', icon: <Clock size={20}/>, desc: 'Agenda & Session Planning' },
            { id: 'reporting', label: '4. Reporting & Docs', icon: <Award size={20}/>, desc: 'Analytics & Batch Certificates' }
          ].map(tab => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`p-6 rounded-[2.5rem] border text-left transition-all relative overflow-hidden group ${
                activeTab === tab.id 
                ? 'bg-white dark:bg-[#001E3C] border-sky-500 shadow-xl' 
                : 'bg-white/50 dark:bg-white/5 border-transparent hover:border-slate-200 dark:hover:border-white/10'
              }`}
            >
              {tab.badge ? <span className="absolute top-4 right-4 px-2 py-0.5 bg-red-500 text-white text-[10px] font-black rounded-full animate-pulse">{tab.badge}</span> : null}
              <div className={`mb-4 p-3 rounded-2xl inline-block ${activeTab === tab.id ? 'bg-sky-500 text-white' : 'bg-slate-100 dark:bg-white/5 text-slate-400'}`}>
                {tab.icon}
              </div>
              <h3 className={`text-sm font-black uppercase tracking-widest mb-1 ${activeTab === tab.id ? 'text-sky-500' : 'text-[#001E3C] dark:text-white'}`}>{tab.label}</h3>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">{tab.desc}</p>
            </button>
          ))}
        </div>

        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          {/* PILLAR 1: ADMINISTRATION */}
          {activeTab === 'admin' && (
            <div className="space-y-12">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {activeEvents.map(event => (
                  <div key={event.id} className="bg-white dark:bg-[#001E3C] rounded-[3rem] p-8 border border-slate-100 dark:border-white/5 shadow-xl group hover:border-sky-500/30 transition-all flex flex-col">
                    <div className="h-40 rounded-2xl overflow-hidden mb-6 relative">
                      <img src={event.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#001E3C]/60 to-transparent"></div>
                      <span className="absolute bottom-4 left-4 text-[10px] font-black text-white uppercase tracking-widest bg-sky-500/80 px-3 py-1 rounded-lg backdrop-blur-md">{event.theme}</span>
                    </div>
                    <h4 className="text-xl font-black text-[#001E3C] dark:text-white italic mb-6 leading-tight flex-1">{event.title}</h4>
                    <div className="flex justify-between items-center pt-6 border-t border-slate-50 dark:border-white/5">
                      <button onClick={() => setSelectedEvent(event)} className="text-[10px] font-black uppercase text-sky-500 hover:underline">Edit Details</button>
                      <button className="p-3 bg-slate-50 dark:bg-white/5 text-slate-400 rounded-xl hover:text-sky-500 transition-all"><Settings size={18}/></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* PILLAR 2: SCIENTIFIC WORKFLOW */}
          {activeTab === 'workflow' && (
            <div className="space-y-8">
              <div className="flex justify-between items-center">
                 <h3 className="text-2xl font-black text-[#001E3C] dark:text-white italic">Submission Pipeline</h3>
                 <button onClick={() => setView('manage-submissions')} className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:text-sky-500 transition-all shadow-lg">
                    <UserCheck size={16}/> Go to Assignment Board
                 </button>
              </div>
              
              <div className="bg-white dark:bg-[#001E3C] rounded-[3rem] border border-slate-100 dark:border-white/5 shadow-2xl overflow-hidden">
                 <table className="w-full text-left">
                    <thead className="bg-slate-50 dark:bg-white/5">
                      <tr>
                        <th className="px-8 py-6 text-[10px] font-black uppercase text-slate-400 tracking-widest">Scientific Work</th>
                        <th className="px-8 py-6 text-[10px] font-black uppercase text-slate-400 tracking-widest">Review Summary</th>
                        <th className="px-8 py-6 text-[10px] font-black uppercase text-slate-400 tracking-widest">Decision</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                      {submissions.length > 0 ? submissions.map(sub => (
                        <tr key={sub.id} className="hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                          <td className="px-8 py-8">
                             <p className="font-black text-sm text-[#001E3C] dark:text-white mb-1 italic leading-tight">{sub.title}</p>
                             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Author: {sub.authorName}</p>
                          </td>
                          <td className="px-8 py-8">
                             <div className="flex items-center gap-3">
                                <div className="flex -space-x-2">
                                   {[1,2].map(i => <div key={i} className="w-8 h-8 rounded-full border-2 border-white dark:border-[#001E3C] bg-sky-500/10 flex items-center justify-center text-[8px] font-black text-sky-600">DR</div>)}
                                </div>
                                <span className="text-[10px] font-black text-emerald-500 uppercase">2 Recommended Accept</span>
                             </div>
                          </td>
                          <td className="px-8 py-8">
                             <div className="flex items-center gap-3">
                                <button onClick={() => updateSubmissionStatus(sub.id, 'Accepted')} className="p-2.5 bg-emerald-500/10 text-emerald-500 rounded-xl hover:bg-emerald-500 hover:text-white transition-all shadow-sm"><CheckCircle2 size={18}/></button>
                                <button onClick={() => updateSubmissionStatus(sub.id, 'Rejected')} className="p-2.5 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-sm"><XCircle size={18}/></button>
                                <button className="p-2.5 bg-slate-50 dark:bg-white/5 text-slate-400 rounded-xl hover:text-sky-500 transition-all"><ChevronRight size={18}/></button>
                             </div>
                          </td>
                        </tr>
                      )) : (
                        <tr><td colSpan={3} className="px-8 py-20 text-center opacity-30 italic">No scientific works currently in pipeline.</td></tr>
                      )}
                    </tbody>
                 </table>
              </div>
            </div>
          )}

          {/* PILLAR 3: PROGRAM LOGISTICS */}
          {activeTab === 'program' && ( activeEvents.length > 0 ? (
            <div className="space-y-12">
               <div className="flex justify-between items-center">
                 <h3 className="text-2xl font-black text-[#001E3C] dark:text-white italic tracking-tight">Active Event Planning</h3>
                 <button onClick={() => setView('program-editor')} className="px-10 py-4 bg-[#001E3C] dark:bg-sky-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl active:scale-95 transition-all">Open Session Editor</button>
               </div>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {activeEvents.map(e => (
                    <div key={e.id} className="bg-white dark:bg-[#001E3C] p-10 rounded-[3.5rem] border border-slate-100 dark:border-white/5 shadow-xl relative overflow-hidden group">
                       <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:rotate-12 transition-transform"><Clock size={120}/></div>
                       <h4 className="text-xl font-black text-[#001E3C] dark:text-white italic mb-4 leading-tight">{e.title}</h4>
                       <div className="space-y-4 mb-10">
                          <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-white/5 rounded-2xl">
                             <span className="text-[10px] font-black uppercase text-slate-400">Total Sessions</span>
                             <span className="text-lg font-black text-[#001E3C] dark:text-white italic">{e.sessions.length} Slots</span>
                          </div>
                          <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-white/5 rounded-2xl">
                             <span className="text-[10px] font-black uppercase text-slate-400">Managed Workshops</span>
                             <span className="text-lg font-black text-[#001E3C] dark:text-white italic">{e.workshops.length} Tracks</span>
                          </div>
                       </div>
                       <button onClick={() => setView('program-editor')} className="w-full flex items-center justify-center gap-2 py-4 border-2 border-slate-100 dark:border-white/5 text-slate-400 hover:border-sky-500 hover:text-sky-500 rounded-2xl font-black text-xs uppercase tracking-widest transition-all">Edit Timeline</button>
                    </div>
                  ))}
               </div>
            </div>
          ) : <p className="p-20 text-center text-slate-400 italic">Initialize an event to manage its program.</p>)}

          {/* PILLAR 4: REPORTING & DOCUMENTATION */}
          {activeTab === 'reporting' && (
            <div className="space-y-12">
               <div className="flex justify-between items-center">
                 <h3 className="text-2xl font-black text-[#001E3C] dark:text-white italic tracking-tight">Board Statistics</h3>
                 <button onClick={() => setView('reports')} className="px-8 py-3 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-sky-500 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-xl transition-all">View All KPI</button>
               </div>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  {/* Stats Card */}
                  <div className="bg-white dark:bg-[#001E3C] p-10 rounded-[3.5rem] border border-slate-100 dark:border-white/5 shadow-2xl">
                     <div className="flex justify-between items-start mb-8">
                        <BarChart3 className="text-sky-500" size={32}/>
                        <TrendingUp className="text-emerald-500" size={24}/>
                     </div>
                     <div className="space-y-6">
                        <div className="flex justify-between items-center">
                           <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">National Reach</span>
                           <span className="text-xl font-black text-[#001E3C] dark:text-white">18 Wilayas</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-50 dark:bg-white/5 rounded-full overflow-hidden">
                           <div className="h-full bg-sky-500" style={{ width: '65%' }}></div>
                        </div>
                        <p className="text-xs text-slate-500 font-medium">Acceptance Rate: <span className="text-emerald-500 font-black">42.5%</span> across 12,000 submissions.</p>
                     </div>
                  </div>

                  {/* Batch Generation Card */}
                  <div className="bg-[#003366] p-10 rounded-[3.5rem] text-white shadow-2xl shadow-blue-900/40 relative overflow-hidden group">
                     <div className="absolute -bottom-10 -right-10 p-10 opacity-10 group-hover:scale-125 transition-transform"><Award size={180}/></div>
                     <h3 className="text-2xl font-black italic tracking-tighter mb-4">Master Certification</h3>
                     <p className="text-sky-100/70 text-sm font-medium leading-relaxed mb-10 max-w-xs">Generate the complete batch of participation and presentation certificates for all attendees.</p>
                     <div className="space-y-4 relative z-10">
                        <button className="w-full flex items-center justify-between p-6 bg-white/10 hover:bg-white/20 border border-white/10 rounded-[2rem] transition-all group/btn">
                           <div className="flex items-center gap-4">
                              <ShieldCheck className="text-sky-300" size={24}/>
                              <span className="text-xs font-black uppercase tracking-widest">Verify Attendance list</span>
                           </div>
                           <ChevronRight size={18} className="group-hover/btn:translate-x-1 transition-transform"/>
                        </button>
                        <button className="w-full flex items-center justify-between p-6 bg-sky-500 hover:bg-sky-400 rounded-[2rem] shadow-xl transition-all group/btn">
                           <div className="flex items-center gap-4">
                              <Download size={24}/>
                              <span className="text-xs font-black uppercase tracking-widest">Generate Master Batch (ZIP)</span>
                           </div>
                           <ChevronRight size={18} className="group-hover/btn:translate-x-1 transition-transform"/>
                        </button>
                     </div>
                  </div>
               </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrganizerDashboard;
