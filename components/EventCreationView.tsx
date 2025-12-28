
import React, { useState } from 'react';
import { ChevronLeft, Info, Users, FlaskConical, Calendar, Plus, Trash2, CheckCircle2, Save, Send } from 'lucide-react';
import { useApp } from '../App';

const EventCreationView: React.FC = () => {
  const { setView, t } = useApp();
  const [activeTab, setActiveTab] = useState<'basic' | 'committee' | 'scientific'>('basic');
  const [committee, setCommittee] = useState(['Pr. Mohamed S.', 'Dr. Amira L.']);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleAddMember = () => setCommittee([...committee, '']);
  const handleRemoveMember = (idx: number) => setCommittee(committee.filter((_, i) => i !== idx));
  const handleMemberChange = (idx: number, val: string) => {
    const newComm = [...committee];
    newComm[idx] = val;
    setCommittee(newComm);
  };

  const handleFinish = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
    setTimeout(() => {
      setView('organizer-dash');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#001428] pt-32 pb-24 px-6 animate-in fade-in duration-500">
      <div className="max-w-4xl mx-auto">
        <button 
          onClick={() => setView('organizer-dash')}
          className="flex items-center gap-2 text-slate-400 hover:text-sky-500 font-bold text-sm uppercase tracking-widest mb-12 transition-all group"
        >
          <ChevronLeft size={20} className="transition-transform group-hover:-translate-x-1" />
          Back to Hub
        </button>

        <div className="mb-16">
          <h1 className="text-4xl md:text-6xl font-black text-[#001E3C] dark:text-white italic tracking-tighter mb-4">
            Initialize <span className="text-sky-500">Symposium</span>
          </h1>
          <p className="text-slate-500 font-medium">Define the core scientific parameters and logistic details of your medical event.</p>
        </div>

        <div className="bg-white dark:bg-[#001E3C] rounded-[3.5rem] shadow-2xl border border-slate-100 dark:border-white/5 overflow-hidden">
          {/* Tabs */}
          <div className="flex flex-wrap border-b border-slate-100 dark:border-white/5 px-8 md:px-16 pt-8 gap-8">
            {[
              { id: 'basic', label: 'Basic Info', icon: <Info size={18}/> },
              { id: 'committee', label: 'Committee', icon: <Users size={18}/> },
              { id: 'scientific', label: 'Scientific / CFP', icon: <FlaskConical size={18}/> },
            ].map(tab => (
              <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`pb-6 flex items-center gap-3 text-xs font-black uppercase tracking-widest relative transition-all ${activeTab === tab.id ? 'text-sky-500' : 'text-slate-400 hover:text-slate-600'}`}
              >
                {tab.icon}
                {tab.label}
                {activeTab === tab.id && <div className="absolute bottom-0 left-0 right-0 h-1 bg-sky-500 rounded-full animate-in fade-in slide-in-from-bottom-2"></div>}
              </button>
            ))}
          </div>

          <div className="p-8 md:p-16">
            {isSuccess ? (
              <div className="py-20 text-center animate-in zoom-in-95 duration-500">
                <div className="w-24 h-24 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8">
                  <CheckCircle2 size={48} />
                </div>
                <h3 className="text-3xl font-black text-[#001E3C] dark:text-white italic mb-4">Event Initialized</h3>
                <p className="text-slate-500 font-medium">Redirecting you to the management hub...</p>
              </div>
            ) : (
              <form onSubmit={handleFinish} className="space-y-10">
                {activeTab === 'basic' && (
                  <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Event Title</label>
                        <input type="text" required placeholder="e.g. National Oncology Days" className="w-full bg-slate-50 dark:bg-[#001428] border border-slate-200 dark:border-white/10 rounded-2xl py-4 px-6 font-bold text-[#001E3C] dark:text-white focus:outline-none focus:ring-4 focus:ring-sky-500/10" />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Theme / Specialty</label>
                        <input type="text" required placeholder="Cardiology, Oncology, etc." className="w-full bg-slate-50 dark:bg-[#001428] border border-slate-200 dark:border-white/10 rounded-2xl py-4 px-6 font-bold text-[#001E3C] dark:text-white focus:outline-none focus:ring-4 focus:ring-sky-500/10" />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Location / Venue</label>
                        <input type="text" required placeholder="Hotel, University, CIC, etc." className="w-full bg-slate-50 dark:bg-[#001428] border border-slate-200 dark:border-white/10 rounded-2xl py-4 px-6 font-bold text-[#001E3C] dark:text-white focus:outline-none focus:ring-4 focus:ring-sky-500/10" />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Registration Fee (DA)</label>
                        <input type="number" required placeholder="e.g. 5000" className="w-full bg-slate-50 dark:bg-[#001428] border border-slate-200 dark:border-white/10 rounded-2xl py-4 px-6 font-bold text-[#001E3C] dark:text-white focus:outline-none focus:ring-4 focus:ring-sky-500/10" />
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'committee' && (
                  <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <h4 className="text-xl font-black text-[#001E3C] dark:text-white italic mb-4">Assemble Scientific Board</h4>
                    <div className="space-y-4">
                      {committee.map((member, i) => (
                        <div key={i} className="flex gap-4">
                          <div className="flex-1 relative group">
                            <Users className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                            <input 
                              type="text" 
                              value={member} 
                              onChange={(e) => handleMemberChange(i, e.target.value)}
                              placeholder="Full Name and Institution" 
                              className="w-full bg-slate-50 dark:bg-[#001428] border border-slate-200 dark:border-white/10 rounded-2xl py-4 pl-14 pr-6 font-bold text-[#001E3C] dark:text-white focus:outline-none focus:ring-4 focus:ring-sky-500/10" 
                            />
                          </div>
                          <button 
                            type="button"
                            onClick={() => handleRemoveMember(i)}
                            className="p-4 text-red-400 hover:text-red-500 transition-colors"
                          >
                            <Trash2 size={20} />
                          </button>
                        </div>
                      ))}
                      <button 
                        type="button"
                        onClick={handleAddMember}
                        className="flex items-center gap-2 text-sky-500 font-black text-[10px] uppercase tracking-widest mt-4 hover:underline"
                      >
                        <Plus size={14} /> Add Member
                      </button>
                    </div>
                  </div>
                )}

                {activeTab === 'scientific' && (
                  <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                       <div className="space-y-3">
                          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">CFP Deadline</label>
                          <div className="relative">
                            <Calendar className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={18}/>
                            <input type="date" required className="w-full bg-slate-50 dark:bg-[#001428] border border-slate-200 dark:border-white/10 rounded-2xl py-4 pl-14 pr-6 font-bold text-[#001E3C] dark:text-white focus:outline-none focus:ring-4 focus:ring-sky-500/10" />
                          </div>
                       </div>
                       <div className="space-y-3">
                          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Abstract Max Words</label>
                          <input type="number" defaultValue={500} className="w-full bg-slate-50 dark:bg-[#001428] border border-slate-200 dark:border-white/10 rounded-2xl py-4 px-6 font-bold text-[#001E3C] dark:text-white focus:outline-none focus:ring-4 focus:ring-sky-500/10" />
                       </div>
                    </div>
                    <div className="p-8 bg-sky-500/5 rounded-3xl border border-sky-500/10 flex items-start gap-4">
                       <FlaskConical className="text-sky-500 shrink-0 mt-1" size={24}/>
                       <div>
                          <h5 className="font-black text-sm text-[#001E3C] dark:text-white uppercase tracking-tight mb-2">Scientific Track Verification</h5>
                          <p className="text-xs text-slate-500 leading-relaxed font-medium">All submissions will be routed through the modular peer-review engine. Reviewers will be invited automatically upon committee selection.</p>
                       </div>
                    </div>
                  </div>
                )}

                <div className="pt-12 border-t border-slate-100 dark:border-white/5 flex flex-col sm:flex-row justify-between items-center gap-6">
                  <p className="text-slate-400 text-xs font-medium max-w-sm">Changes can be refined later from the Hub management portal.</p>
                  <div className="flex gap-4 w-full sm:w-auto">
                    <button 
                      type="button"
                      onClick={() => setView('organizer-dash')}
                      className="flex-1 sm:flex-none px-10 py-4 bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-400 rounded-2xl font-black text-xs uppercase tracking-widest transition-all"
                    >
                      Cancel
                    </button>
                    {activeTab === 'scientific' ? (
                      <button 
                        type="submit"
                        className="flex-1 sm:flex-none flex items-center justify-center gap-3 px-12 py-4 bg-sky-500 hover:bg-sky-400 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-sky-500/20 active:scale-95 transition-all"
                      >
                        <Send size={18} />
                        Publish Event
                      </button>
                    ) : (
                      <button 
                        type="button"
                        onClick={() => setActiveTab(activeTab === 'basic' ? 'committee' : 'scientific')}
                        className="flex-1 sm:flex-none px-12 py-4 bg-[#001E3C] dark:bg-sky-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl active:scale-95 transition-all"
                      >
                        Continue
                      </button>
                    )}
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCreationView;
