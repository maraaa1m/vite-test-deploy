
import React, { useState } from 'react';
import { ChevronLeft, Layers, Clock, Plus, GripVertical, MapPin, Search, Calendar, Save } from 'lucide-react';
import { useApp } from '../App';

const ProgramEditorView: React.FC = () => {
  const { setView } = useApp();
  const [isSaved, setIsSaved] = useState(false);

  const mockSessions = [
    { id: 'sess1', time: '09:00 - 10:30', title: 'Hypertension Masterclass', room: 'Salle Cirta', slots: 3 },
    { id: 'sess2', time: '11:00 - 12:30', title: 'Parallel Session: Imaging', room: 'Salle Rhumel', slots: 4 },
  ];

  const acceptedComms = [
    { id: 'c1', title: 'Clinical Trials in Algiers', author: 'Dr. Sarah' },
    { id: 'c2', title: 'Deep Learning Diagnostics', author: 'Pr. Yacine' },
    { id: 'c3', title: 'Post-Care Monitoring', author: 'Dr. Meriem' },
  ];

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#001428] pt-32 pb-24 px-6 animate-in fade-in duration-500">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 h-full">
        
        {/* Unassigned Communications (Drawer Side) */}
        <div className="w-full lg:w-80 shrink-0 space-y-8">
           <button 
            onClick={() => setView('organizer-dash')}
            className="flex items-center gap-2 text-slate-400 hover:text-sky-500 font-bold text-sm uppercase tracking-widest mb-4 transition-all group"
          >
            <ChevronLeft size={20} className="transition-transform group-hover:-translate-x-1" />
            Back
          </button>
          
          <div className="space-y-6 sticky top-32">
             <h3 className="text-xl font-black text-[#001E3C] dark:text-white italic flex items-center gap-3">
                <Layers className="text-sky-500" /> Pool
             </h3>
             <div className="relative mb-6">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16}/>
                <input type="text" placeholder="Filter pool..." className="w-full bg-white dark:bg-[#001E3C] border border-slate-200 dark:border-white/10 rounded-2xl py-3 pl-12 pr-4 font-bold text-xs" />
             </div>
             <div className="space-y-4">
                {acceptedComms.map(comm => (
                  <div key={comm.id} className="p-5 bg-white dark:bg-[#001E3C] rounded-2xl border border-slate-100 dark:border-white/5 shadow-lg group hover:border-sky-500/40 cursor-grab active:cursor-grabbing transition-all">
                     <div className="flex justify-between items-start mb-3">
                        <span className="text-[9px] font-black uppercase tracking-widest text-sky-500">Communication</span>
                        <GripVertical size={14} className="text-slate-300" />
                     </div>
                     <h5 className="font-black text-[#001E3C] dark:text-white text-xs leading-tight mb-2">{comm.title}</h5>
                     <p className="text-[10px] text-slate-500 font-bold">{comm.author}</p>
                  </div>
                ))}
             </div>
          </div>
        </div>

        {/* Program Timeline Section */}
        <div className="flex-1 space-y-12">
           <div className="flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl font-black text-[#001E3C] dark:text-white italic tracking-tighter leading-none">
                  Program <span className="text-sky-500">Editor</span>
                </h1>
                <p className="text-slate-500 font-medium">Drag communications into designated slots.</p>
              </div>
              <div className="flex gap-4">
                 <button className="p-4 bg-white dark:bg-[#001E3C] rounded-2xl border border-slate-200 dark:border-white/10 text-slate-400 hover:text-sky-500 transition-all"><Calendar size={20}/></button>
                 <button 
                  onClick={handleSave}
                  className={`flex items-center gap-3 px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${isSaved ? 'bg-emerald-500 text-white shadow-emerald-500/20' : 'bg-[#001E3C] dark:bg-sky-500 text-white shadow-xl shadow-sky-500/20'}`}
                 >
                   {isSaved ? 'Saved Successful' : <><Save size={18}/> Save Program</>}
                 </button>
              </div>
           </div>

           <div className="space-y-8 pb-24">
              {mockSessions.map((sess, idx) => (
                <div key={sess.id} className="relative group">
                   <div className="bg-white dark:bg-[#001E3C] rounded-[3rem] border border-slate-100 dark:border-white/5 shadow-2xl overflow-hidden">
                      <div className="p-8 border-b border-slate-100 dark:border-white/5 flex flex-wrap justify-between items-center gap-6 bg-slate-50/50 dark:bg-white/5">
                         <div className="flex items-center gap-6">
                            <div className="w-12 h-12 bg-sky-500/10 rounded-2xl flex items-center justify-center text-sky-500 font-black text-sm italic">{idx + 1}</div>
                            <div>
                               <h4 className="text-xl font-black text-[#001E3C] dark:text-white italic leading-none mb-2">{sess.title}</h4>
                               <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-slate-400">
                                  <span className="flex items-center gap-2"><Clock size={12}/> {sess.time}</span>
                                  <span className="flex items-center gap-2"><MapPin size={12}/> {sess.room}</span>
                               </div>
                            </div>
                         </div>
                         <button className="text-[10px] font-black uppercase text-sky-500 hover:underline">Manage Slots</button>
                      </div>

                      <div className="p-10 grid grid-cols-1 md:grid-cols-3 gap-6">
                         {[...Array(sess.slots)].map((_, i) => (
                           <div key={i} className="aspect-[4/3] rounded-[2rem] border-2 border-dashed border-slate-100 dark:border-white/5 flex flex-col items-center justify-center text-center p-6 group/slot hover:border-sky-500/30 transition-all cursor-pointer">
                              <div className="w-12 h-12 rounded-full bg-slate-50 dark:bg-white/5 flex items-center justify-center text-slate-300 group-hover/slot:text-sky-500 transition-all mb-4">
                                <Plus size={24}/>
                              </div>
                              <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">Slot {i + 1}</p>
                           </div>
                         ))}
                      </div>
                   </div>
                </div>
              ))}
              
              <button className="w-full py-10 rounded-[3rem] border-2 border-dashed border-slate-200 dark:border-white/10 flex flex-col items-center justify-center text-slate-400 hover:text-sky-500 hover:border-sky-500 transition-all group">
                 <Plus size={32} className="mb-4 group-hover:scale-125 transition-transform" />
                 <span className="font-black uppercase tracking-widest text-xs">Add Conference Session</span>
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default ProgramEditorView;
