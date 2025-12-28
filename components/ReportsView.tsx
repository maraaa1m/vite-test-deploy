
import React from 'react';
import { ChevronLeft, BarChart3, TrendingUp, Users, Award, Download, ArrowRight, CheckCircle2, FlaskConical, Globe, PieChart, School, Map } from 'lucide-react';
import { useApp } from '../App';

const ReportsView: React.FC = () => {
  const { setView } = useApp();

  const reportCards = [
    { title: 'Total Submissions', value: '1,248', sub: 'National call', icon: <FlaskConical className="text-purple-500"/>, color: 'bg-purple-500' },
    { title: 'Acceptance Rate', value: '42.5%', sub: 'High scientific rigor', icon: <CheckCircle2 className="text-emerald-500"/>, color: 'bg-emerald-500' },
    { title: 'Institution Reach', value: '54', sub: 'Active CHU & Units', icon: <School className="text-sky-500"/>, color: 'bg-sky-500' },
    { title: 'Global Attendance', value: '12', sub: 'Partner countries', icon: <Globe className="text-amber-500"/>, color: 'bg-amber-500' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#001428] pt-32 pb-24 px-6 animate-in fade-in duration-500">
      <div className="max-w-7xl mx-auto">
        <button 
          onClick={() => setView('organizer-dash')}
          className="flex items-center gap-2 text-slate-400 hover:text-sky-500 font-bold text-sm uppercase tracking-widest mb-12 transition-all group"
        >
          <ChevronLeft size={20} className="transition-transform group-hover:-translate-x-1" />
          Back to Hub
        </button>

        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-black text-[#001E3C] dark:text-white italic tracking-tighter leading-none">
              Strategic <span className="text-sky-500">Analytics</span>
            </h1>
            <p className="text-slate-500 font-medium text-lg">Real-time performance metrics and institutional distribution.</p>
          </div>
          <div className="flex gap-4">
             <button className="flex items-center gap-3 px-10 py-5 bg-sky-500 text-white rounded-[2rem] font-black text-xs uppercase tracking-widest shadow-xl shadow-sky-500/20 active:scale-95 transition-all">
                <Download size={20}/> Export Full Audit (PDF)
             </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {reportCards.map((stat, i) => (
            <div key={i} className="bg-white dark:bg-[#001E3C] p-10 rounded-[2.5rem] border border-slate-100 dark:border-white/5 shadow-2xl relative overflow-hidden group hover:border-sky-500/30 transition-all">
               <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-8 ${stat.color} bg-opacity-10 transition-transform group-hover:scale-110`}>
                  {stat.icon}
               </div>
               <div className="text-4xl font-black text-[#001E3C] dark:text-white mb-2 tracking-tighter italic leading-none">{stat.value}</div>
               <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">{stat.title}</div>
               {stat.sub && (
                 <div className="flex items-center gap-2 text-emerald-500 font-bold text-[10px] uppercase tracking-widest pt-4 border-t border-slate-50 dark:border-white/5">
                    <TrendingUp size={12}/> {stat.sub}
                 </div>
               )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
           {/* INSTITUTION BREAKDOWN */}
           <div className="bg-white dark:bg-[#001E3C] p-12 rounded-[3.5rem] border border-slate-100 dark:border-white/5 shadow-2xl space-y-10">
              <div className="flex justify-between items-center">
                 <h3 className="text-2xl font-black text-[#001E3C] dark:text-white italic tracking-tight flex items-center gap-3">
                   <School className="text-sky-500" /> Institution Distribution
                 </h3>
                 <span className="text-[9px] font-black uppercase text-slate-400 bg-slate-50 dark:bg-white/5 px-3 py-1 rounded-lg">By Submission Volume</span>
              </div>
              <div className="space-y-8">
                 {[
                   { label: 'CHU Mustapha Bacha (Alger)', val: 320, color: 'bg-sky-500', total: 1248 },
                   { label: 'CHU Benbadis (Constantine)', val: 280, color: 'bg-purple-500', total: 1248 },
                   { label: 'EHU Oran (Oran)', val: 195, color: 'bg-emerald-500', total: 1248 },
                   { label: 'CHU Annaba', val: 110, color: 'bg-amber-500', total: 1248 },
                   { label: 'Other Public Units', val: 343, color: 'bg-slate-400', total: 1248 },
                 ].map(item => (
                   <div key={item.label} className="space-y-3">
                      <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                         <span className="text-slate-500 truncate max-w-[70%]">{item.label}</span>
                         <span className="text-[#001E3C] dark:text-white font-black italic">{item.val} works</span>
                      </div>
                      <div className="w-full h-3 bg-slate-50 dark:bg-white/5 rounded-full overflow-hidden flex">
                         <div className={`h-full ${item.color} transition-all duration-1000`} style={{ width: `${(item.val/item.total)*100}%` }}></div>
                      </div>
                   </div>
                 ))}
              </div>
           </div>

           {/* REGIONAL / COUNTRY BREAKDOWN */}
           <div className="bg-white dark:bg-[#001E3C] p-12 rounded-[3.5rem] border border-slate-100 dark:border-white/5 shadow-2xl space-y-10">
              <div className="flex justify-between items-center">
                 <h3 className="text-2xl font-black text-[#001E3C] dark:text-white italic tracking-tight flex items-center gap-3">
                   <Map className="text-sky-500" /> Geographic Participation
                 </h3>
                 <PieChart className="text-slate-300" size={24}/>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                 <div className="space-y-6">
                    <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-widest border-b border-slate-50 pb-2">National (Algeria)</h4>
                    {[
                      { region: 'Centre', pct: 45, color: 'bg-sky-500' },
                      { region: 'Est', pct: 35, color: 'bg-sky-600' },
                      { region: 'Ouest', pct: 15, color: 'bg-sky-700' },
                      { region: 'Sud', pct: 5, color: 'bg-sky-800' },
                    ].map(r => (
                      <div key={r.region} className="flex items-center gap-4">
                        <div className={`w-3 h-3 rounded-full ${r.color}`}></div>
                        <span className="text-xs font-bold text-slate-600 dark:text-slate-400">{r.region}</span>
                        <span className="ml-auto text-xs font-black text-[#001E3C] dark:text-white">{r.pct}%</span>
                      </div>
                    ))}
                 </div>
                 
                 <div className="space-y-6">
                    <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-widest border-b border-slate-50 pb-2">International</h4>
                    {[
                      { region: 'France', pct: 40, color: 'bg-emerald-500' },
                      { region: 'Tunisia', pct: 25, color: 'bg-emerald-600' },
                      { region: 'Morocco', pct: 20, color: 'bg-emerald-700' },
                      { region: 'Other', pct: 15, color: 'bg-emerald-800' },
                    ].map(r => (
                      <div key={r.region} className="flex items-center gap-4">
                        <div className={`w-3 h-3 rounded-full ${r.color}`}></div>
                        <span className="text-xs font-bold text-slate-600 dark:text-slate-400">{r.region}</span>
                        <span className="ml-auto text-xs font-black text-[#001E3C] dark:text-white">{r.pct}%</span>
                      </div>
                    ))}
                 </div>
              </div>

              <div className="bg-[#003366] p-8 rounded-[2.5rem] text-white shadow-2xl shadow-blue-900/40 space-y-6 relative overflow-hidden mt-6">
                 <div className="absolute top-0 right-0 p-8 opacity-10"><Award size={100}/></div>
                 <h3 className="text-xl font-black italic tracking-tight">Batch Certification Hub</h3>
                 <p className="text-sky-100 text-[10px] font-medium leading-relaxed mb-4">Automatically generate and distribute certificates for all 1,248 participants and board members based on the verified attendance list.</p>
                 <button className="w-full flex items-center justify-between p-5 bg-white hover:bg-sky-50 rounded-2xl transition-all group shadow-xl">
                    <div className="flex items-center gap-4">
                       <Download className="text-[#001E3C]" size={18}/>
                       <span className="text-[#001E3C] text-[10px] font-black uppercase tracking-widest">Generate Master Archive (ZIP)</span>
                    </div>
                    <ArrowRight size={16} className="text-[#001E3C] group-hover:translate-x-2 transition-transform"/>
                 </button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsView;
