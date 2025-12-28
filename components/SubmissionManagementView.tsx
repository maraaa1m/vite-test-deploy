
import React, { useState } from 'react';
// Added FileText to the import list to fix the error on line 83
import { ChevronLeft, Search, Filter, UserPlus, CheckCircle2, XCircle, Clock, Eye, MoreVertical, ShieldCheck, FileText } from 'lucide-react';
import { useApp } from '../App';

const SubmissionManagementView: React.FC = () => {
  const { setView } = useApp();
  const [filterStatus, setFilterStatus] = useState<'All' | 'Pending' | 'Accepted' | 'Rejected'>('All');
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedSubId, setSelectedSubId] = useState<string | null>(null);

  const mockSubmissions = [
    { id: 'sub1', title: 'Cardiovascular Risk in Algiers', author: 'Dr. Sofia B.', status: 'Pending', theme: 'Cardiology' },
    { id: 'sub2', title: 'AI in Radiology: A Local Study', author: 'Dr. Yacine M.', status: 'Accepted', theme: 'Radiology' },
    { id: 'sub3', title: 'Pediatric Asthma Trends', author: 'Pr. Amina G.', status: 'Rejected', theme: 'Pediatrics' },
    { id: 'sub4', title: 'Post-Surgical Infection Control', author: 'Dr. Salim T.', status: 'Pending', theme: 'Surgery' },
  ];

  const handleAssign = (id: string) => {
    setSelectedSubId(id);
    setShowAssignModal(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#001428] pt-32 pb-24 px-6 animate-in fade-in duration-500">
      <div className="max-w-6xl mx-auto">
        <button 
          onClick={() => setView('organizer-dash')}
          className="flex items-center gap-2 text-slate-400 hover:text-sky-500 font-bold text-sm uppercase tracking-widest mb-12 transition-all group"
        >
          <ChevronLeft size={20} className="transition-transform group-hover:-translate-x-1" />
          Back to Hub
        </button>

        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-12">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-black text-[#001E3C] dark:text-white italic tracking-tighter leading-none">
              Submission <span className="text-sky-500">Logistics</span>
            </h1>
            <p className="text-slate-500 font-medium">Coordinate the peer-review pipeline for CICC 2026.</p>
          </div>
          
          <div className="flex items-center gap-4 bg-white dark:bg-[#001E3C] p-2 rounded-[1.5rem] border border-slate-100 dark:border-white/5 shadow-xl">
             {['All', 'Pending', 'Accepted'].map(status => (
               <button 
                key={status} 
                onClick={() => setFilterStatus(status as any)}
                className={`px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${filterStatus === status ? 'bg-sky-500 text-white shadow-lg' : 'text-slate-400 hover:text-slate-600'}`}
               >
                 {status}
               </button>
             ))}
          </div>
        </div>

        <div className="bg-white dark:bg-[#001E3C] rounded-[3rem] border border-slate-100 dark:border-white/5 shadow-2xl overflow-hidden">
          <div className="p-8 border-b border-slate-100 dark:border-white/5 flex flex-col md:flex-row gap-6 justify-between items-center">
             <div className="relative flex-1 w-full max-w-md">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={18}/>
                <input type="text" placeholder="Search by title or author..." className="w-full bg-slate-50 dark:bg-[#001428] border border-slate-200 dark:border-white/10 rounded-2xl py-3 pl-14 pr-6 font-bold text-sm focus:outline-none focus:ring-4 focus:ring-sky-500/10" />
             </div>
             <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-sky-500 transition-colors">
                <Filter size={14}/> Bulk Actions
             </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 dark:bg-white/5">
                  <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Submission Title</th>
                  <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Author</th>
                  <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Specialty</th>
                  <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Status</th>
                  <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                {mockSubmissions.map((sub) => (
                  <tr key={sub.id} className="hover:bg-slate-50 dark:hover:bg-white/5 transition-colors group">
                    <td className="px-8 py-8">
                      <div className="flex items-center gap-4">
                        <FileText className="text-sky-500" size={20}/>
                        <span className="font-black text-[#001E3C] dark:text-white italic text-sm">{sub.title}</span>
                      </div>
                    </td>
                    <td className="px-8 py-8">
                      <span className="text-slate-500 font-bold text-sm">{sub.author}</span>
                    </td>
                    <td className="px-8 py-8">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{sub.theme}</span>
                    </td>
                    <td className="px-8 py-8">
                      <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                        sub.status === 'Accepted' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' :
                        sub.status === 'Pending' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' :
                        'bg-red-500/10 text-red-500 border-red-500/20'
                      }`}>
                        {sub.status}
                      </span>
                    </td>
                    <td className="px-8 py-8 text-right">
                       <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                         <button className="p-3 bg-white dark:bg-[#001428] rounded-xl text-slate-400 hover:text-sky-500 border border-slate-100 dark:border-white/10 shadow-sm" title="View Review">
                           <Eye size={18}/>
                         </button>
                         <button 
                          onClick={() => handleAssign(sub.id)}
                          className="p-3 bg-white dark:bg-[#001428] rounded-xl text-slate-400 hover:text-sky-500 border border-slate-100 dark:border-white/10 shadow-sm" 
                          title="Assign Reviewer"
                         >
                           <UserPlus size={18}/>
                         </button>
                         <button className="p-3 bg-white dark:bg-[#001428] rounded-xl text-slate-400 hover:text-red-500 border border-slate-100 dark:border-white/10 shadow-sm">
                           <MoreVertical size={18}/>
                         </button>
                       </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Assignment Modal Skeleton */}
        {showAssignModal && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-6 animate-in fade-in duration-300">
             <div className="absolute inset-0 bg-[#001E3C]/80 backdrop-blur-md" onClick={() => setShowAssignModal(false)}></div>
             <div className="relative w-full max-w-md bg-white dark:bg-[#001428] rounded-[3rem] p-10 shadow-2xl border border-white/10 animate-in zoom-in-95">
                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-2xl font-black text-[#001E3C] dark:text-white italic tracking-tighter">Assign <span className="text-sky-500">Reviewer</span></h3>
                  <button onClick={() => setShowAssignModal(false)} className="text-slate-400 hover:text-red-500"><XCircle size={24}/></button>
                </div>
                <div className="space-y-6">
                   <p className="text-slate-500 font-medium text-sm">Select an expert from the scientific committee to evaluate this submission.</p>
                   <div className="space-y-3">
                      {['Pr. Sarah Benali', 'Dr. Karima Messadi', 'Pr. Salim B.'].map(prof => (
                        <button key={prof} className="w-full p-4 bg-slate-50 dark:bg-[#001E3C] rounded-2xl border border-slate-100 dark:border-white/5 flex items-center gap-4 hover:border-sky-500 transition-all text-left group">
                           <div className="w-10 h-10 rounded-xl bg-sky-500/10 flex items-center justify-center text-sky-500 group-hover:bg-sky-500 group-hover:text-white transition-all"><ShieldCheck size={18}/></div>
                           <span className="font-bold text-sm text-[#001E3C] dark:text-white">{prof}</span>
                        </button>
                      ))}
                   </div>
                   <button className="w-full py-4 bg-sky-500 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-sky-500/20 mt-4">Confirm Assignment</button>
                </div>
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubmissionManagementView;
