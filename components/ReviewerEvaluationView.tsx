
import React, { useState } from 'react';
import { ChevronLeft, FileText, Star, AlertCircle, CheckCircle, XCircle, RefreshCcw, User, Globe, Save, Info } from 'lucide-react';
import { useApp } from '../App';

const ReviewerEvaluationView: React.FC = () => {
  const { setView, updateSubmissionStatus } = useApp();
  const [scores, setScores] = useState({ scientific: 4, innovation: 3, clarity: 5 });
  const [feedback, setFeedback] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const mockSub = {
    id: 'sub-4059',
    title: 'Impact of AI on Cardiology Diagnosis in Algeria',
    author: 'Dr. Sofia Benali',
    institution: 'CHU Constantine',
    abstract: 'This research explores the integration of deep learning models in interpreting clinical echocardiograms within the specific context of Algerian public hospitals. The study demonstrates a significant reduction in false positives when using localized datasets.',
  };

  const handleRecommendation = (recommendation: string) => {
    setIsSubmitting(true);
    // In the workflow, committee members "recommend", they don't finalize.
    // status will stay 'Under Review' until the Organizer decides.
    setTimeout(() => {
      updateSubmissionStatus(mockSub.id, 'Under Review', `[Recommendation: ${recommendation}] ${feedback}`);
      setIsSubmitting(false);
      setView('dashboard'); 
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#001428] pt-32 pb-24 px-6 animate-in fade-in duration-500 transition-colors">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12">
        
        {/* Submission Details Panel */}
        <div className="flex-1 space-y-10">
          <button 
            onClick={() => setView('dashboard')}
            className="flex items-center gap-2 text-slate-400 hover:text-sky-500 font-bold text-sm uppercase tracking-widest mb-4 transition-all group"
          >
            <ChevronLeft size={20} className="transition-transform group-hover:-translate-x-1" />
            Back to Portal
          </button>

          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-black text-[#001E3C] dark:text-white italic tracking-tighter leading-tight">
              Evaluation <span className="text-sky-500">Center</span>
            </h1>
            <div className="bg-white dark:bg-[#001E3C] p-10 rounded-[3.5rem] border border-slate-100 dark:border-white/5 shadow-2xl relative overflow-hidden">
               <div className="absolute top-0 right-0 p-8 opacity-5"><FileText size={120} className="text-[#001E3C] dark:text-white"/></div>
               <div className="flex flex-wrap items-center gap-4 mb-8">
                  <span className="px-4 py-1 bg-sky-500 rounded-full text-[10px] font-black text-white uppercase tracking-widest">ID: {mockSub.id}-DZ</span>
                  <span className="text-slate-400 font-bold text-xs flex items-center gap-2"><Globe size={14}/> Peer-Review Request</span>
               </div>
               <h2 className="text-2xl font-black text-[#001E3C] dark:text-white mb-8 italic tracking-tight leading-snug">{mockSub.title}</h2>
               
               <div className="flex items-center gap-4 mb-10 pb-8 border-b border-slate-100 dark:border-white/5">
                  <div className="w-12 h-12 rounded-2xl bg-slate-50 dark:bg-white/5 flex items-center justify-center text-slate-400"><User size={24}/></div>
                  <div>
                    <h4 className="font-black text-[#001E3C] dark:text-white text-sm">{mockSub.author}</h4>
                    <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">{mockSub.institution}</p>
                  </div>
               </div>

               <div className="space-y-4">
                  <h5 className="text-[10px] font-black uppercase tracking-widest text-sky-500">Submission Abstract</h5>
                  <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed italic text-lg">"{mockSub.abstract}"</p>
               </div>
            </div>
          </div>
        </div>

        {/* Scoring & Recommendation Panel */}
        <div className="w-full lg:w-[450px] space-y-8">
           <h3 className="text-2xl font-black text-[#001E3C] dark:text-white italic flex items-center gap-3">
              <Star className="text-amber-500" /> Scientific Audit
           </h3>
           <div className="bg-white dark:bg-[#001E3C] p-10 rounded-[3rem] border border-slate-100 dark:border-white/5 shadow-2xl space-y-10 relative">
              <div className="p-4 bg-sky-500/5 rounded-2xl border border-sky-500/10 flex items-start gap-3 mb-4">
                 <Info size={16} className="text-sky-500 mt-0.5" />
                 <p className="text-[10px] font-bold text-slate-500 leading-tight">As a committee member, you provide recommendations. The Organizer will issue the final verdict.</p>
              </div>

              {Object.keys(scores).map(key => (
                <div key={key} className="space-y-4">
                   <div className="flex justify-between items-center">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 capitalize">{key} Quality</label>
                      <span className="text-sky-500 font-black">{(scores as any)[key]}/5</span>
                   </div>
                   <input 
                    type="range" 
                    min="1" 
                    max="5" 
                    value={(scores as any)[key]} 
                    onChange={(e) => setScores({...scores, [key]: parseInt(e.target.value)})}
                    className="w-full h-2 bg-slate-100 dark:bg-[#001428] rounded-full appearance-none cursor-pointer accent-sky-500" 
                   />
                </div>
              ))}

              <div className="space-y-4 pt-6">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Expert Feedback</label>
                <textarea 
                  rows={4} 
                  placeholder="Review notes for the organizer..."
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-[#001428] border border-slate-200 dark:border-white/10 rounded-3xl p-6 font-bold text-sm text-[#001E3C] dark:text-white focus:outline-none focus:ring-4 focus:ring-sky-500/10 resize-none transition-all" 
                />
              </div>

              <div className="grid grid-cols-1 gap-4 pt-6">
                 <button 
                  onClick={() => handleRecommendation('Accept')}
                  className="flex items-center justify-center gap-3 py-5 bg-emerald-500 hover:bg-emerald-400 text-white rounded-[1.5rem] font-black text-xs uppercase tracking-widest transition-all active:scale-95 shadow-xl shadow-emerald-500/20"
                 >
                   <CheckCircle size={18}/> Recommend Accept
                 </button>
                 <button 
                  onClick={() => handleRecommendation('Revision')}
                  className="flex items-center justify-center gap-3 py-5 bg-sky-500 hover:bg-sky-400 text-white rounded-[1.5rem] font-black text-xs uppercase tracking-widest transition-all active:scale-95 shadow-xl shadow-sky-500/20"
                 >
                   <RefreshCcw size={18}/> Request Revision
                 </button>
                 <button 
                  onClick={() => handleRecommendation('Reject')}
                  className="flex items-center justify-center gap-3 py-5 bg-red-500/10 text-red-500 border border-red-500/20 rounded-[1.5rem] font-black text-xs uppercase tracking-widest transition-all hover:bg-red-500 hover:text-white"
                 >
                   <XCircle size={18}/> Recommend Reject
                 </button>
              </div>

              {isSubmitting && (
                <div className="absolute inset-0 bg-white/90 dark:bg-[#001428]/95 backdrop-blur-sm flex flex-col items-center justify-center z-50 rounded-[3rem]">
                   <div className="w-12 h-12 border-4 border-sky-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                   <p className="font-black uppercase tracking-widest text-[10px] text-sky-500">Transmitting Audit...</p>
                </div>
              )}
           </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewerEvaluationView;
