
import React, { useState, useRef } from 'react';
import { Camera, Mail, Briefcase, GraduationCap, FileText, Save, CheckCircle2, ShieldCheck, Settings, Calendar, History, Trash2, Lock, MapPin, Check, ChevronDown, Send, Clock, AlertCircle } from 'lucide-react';
import { useApp } from '../App';
import { UserProfile, Role, SubmissionStatus } from '../types';
import { MOCK_EVENTS } from '../constants';
import { translations } from '../translations';

const ProfileView: React.FC = () => {
  const { user, t, updateProfile, updateRole, registeredEventIds, setSelectedEvent, submissions } = useApp();
  const [activeTab, setActiveTab] = useState<'settings' | 'events' | 'submissions' | 'security'>('settings');
  const [profile, setProfile] = useState<UserProfile>(user?.profile || {
    institution: '',
    researchField: '',
    biography: ''
  });
  const [isSaved, setIsSaved] = useState(false);
  const [isRoleMenuOpen, setIsRoleMenuOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!user) return null;

  const roles: { id: Role, labelKey: keyof typeof translations.en }[] = [
    { id: 'Organizer', labelKey: 'role_Organizer' },
    { id: 'Author', labelKey: 'role_Author' },
    { id: 'Participant', labelKey: 'role_Participant' },
    // Fixed typo: changed 'Workshop Animator' to 'WorkshopAnimator' to match Role type
    { id: 'WorkshopAnimator', labelKey: 'role_WorkshopAnimator' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(profile);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleRoleChange = (newRole: Role) => {
    updateRole(newRole);
    setIsRoleMenuOpen(false);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const getStatusColor = (status: SubmissionStatus) => {
    switch (status) {
      case 'Accepted': return 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20';
      case 'Pending': return 'text-amber-500 bg-amber-500/10 border-amber-500/20';
      case 'Under Review': return 'text-sky-500 bg-sky-500/10 border-sky-500/20';
      case 'Rejected': return 'text-red-500 bg-red-500/10 border-red-500/20';
      default: return 'text-slate-400 bg-slate-400/10 border-slate-400/20';
    }
  };

  const registeredEvents = MOCK_EVENTS.filter(e => registeredEventIds.includes(e.id));

  const handlePhotoClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile(prev => ({ ...prev, photo: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#001428] pt-32 pb-24 px-6 transition-colors duration-500">
      <div className="max-w-5xl mx-auto">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row items-center gap-10 mb-12">
            <div className="relative group">
              <div onClick={handlePhotoClick} className="w-32 h-32 rounded-[2.5rem] overflow-hidden bg-white dark:bg-white/5 border-4 border-white dark:border-white/10 shadow-2xl relative cursor-pointer">
                <img 
                  src={profile.photo || user.profile.photo || "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=200"} 
                  alt={user.name} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Camera className="text-white" size={24} />
                </div>
              </div>
              <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileChange} accept="image/*" />
            </div>
            
            <div className="text-center md:text-left flex-1">
              <h1 className="text-4xl md:text-5xl font-black text-[#001E3C] dark:text-white italic tracking-tighter mb-2">{user.name}</h1>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                <span className="px-4 py-1.5 bg-sky-500 rounded-full text-[10px] font-black text-white uppercase tracking-widest flex items-center gap-2">
                  <ShieldCheck size={12} />
                  {user.role}
                </span>
                <span className="text-slate-400 font-bold text-sm flex items-center gap-2">
                  <Mail size={16} /> {user.email}
                </span>
              </div>
            </div>

            <div className="relative w-full md:w-64">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2 block text-center md:text-left">Switch Role (Debug)</label>
              <button 
                onClick={() => setIsRoleMenuOpen(!isRoleMenuOpen)}
                className="w-full flex items-center justify-between bg-white dark:bg-[#001E3C] border border-slate-200 dark:border-white/10 rounded-2xl py-4 px-6 font-bold text-[#001E3C] dark:text-white hover:bg-slate-50 dark:hover:bg-white/10 transition-all text-sm group shadow-lg"
              >
                <div className="flex items-center gap-3">
                  <ShieldCheck size={18} className="text-sky-500" />
                  {t(roles.find(r => r.id === user.role)?.labelKey || 'role_Participant')}
                </div>
                <ChevronDown size={18} className={`text-slate-400 transition-transform ${isRoleMenuOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isRoleMenuOpen && (
                <div className="absolute top-full left-0 right-0 mt-3 bg-white dark:bg-[#001E3C] border border-slate-100 dark:border-white/10 rounded-3xl shadow-2xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200 ring-4 ring-black/5">
                  {roles.map((r) => (
                    <button 
                      key={r.id} 
                      onClick={() => handleRoleChange(r.id)} 
                      className="w-full flex items-center justify-between px-6 py-4 hover:bg-sky-50 dark:hover:bg-white/5 transition-all text-left"
                    >
                      <span className={`font-bold text-xs ${user.role === r.id ? 'text-sky-500' : 'text-slate-500'}`}>{t(r.labelKey)}</span>
                      {user.role === r.id && <Check size={16} className="text-sky-500" />}
                    </button>
                  ))}
                </div>
              )}
            </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-8 mb-12 border-b border-slate-200 dark:border-white/5 overflow-x-auto pb-px scrollbar-hide">
          <button onClick={() => setActiveTab('settings')} className={`pb-4 px-2 text-sm font-black uppercase tracking-widest transition-all whitespace-nowrap relative ${activeTab === 'settings' ? 'text-sky-500' : 'text-slate-400 hover:text-slate-600'}`}>
            {t('preferences')}
            {activeTab === 'settings' && <div className="absolute bottom-0 left-0 right-0 h-1 bg-sky-500 rounded-full"></div>}
          </button>
          <button onClick={() => setActiveTab('events')} className={`pb-4 px-2 text-sm font-black uppercase tracking-widest transition-all whitespace-nowrap relative ${activeTab === 'events' ? 'text-sky-500' : 'text-slate-400 hover:text-slate-600'}`}>
            {t('myEvents')} ({registeredEvents.length})
            {activeTab === 'events' && <div className="absolute bottom-0 left-0 right-0 h-1 bg-sky-500 rounded-full"></div>}
          </button>
          
          {user.role === 'Author' && (
            <button onClick={() => setActiveTab('submissions')} className={`pb-4 px-2 text-sm font-black uppercase tracking-widest transition-all whitespace-nowrap relative ${activeTab === 'submissions' ? 'text-sky-500' : 'text-slate-400 hover:text-slate-600'}`}>
              {t('mySubmissions')} ({submissions.length})
              {activeTab === 'submissions' && <div className="absolute bottom-0 left-0 right-0 h-1 bg-sky-500 rounded-full"></div>}
            </button>
          )}

          <button onClick={() => setActiveTab('security')} className={`pb-4 px-2 text-sm font-black uppercase tracking-widest transition-all whitespace-nowrap relative ${activeTab === 'security' ? 'text-sky-500' : 'text-slate-400 hover:text-slate-600'}`}>
            {t('security')}
            {activeTab === 'security' && <div className="absolute bottom-0 left-0 right-0 h-1 bg-sky-500 rounded-full"></div>}
          </button>
        </div>

        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          {activeTab === 'settings' && (
            <form onSubmit={handleSubmit} className="glass-card dark:bg-[#001E3C]/50 rounded-[3rem] p-10 md:p-16 border border-slate-200 dark:border-white/5 shadow-2xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-4">{t('institution')}</label>
                  <div className="relative group">
                    <Briefcase className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-sky-500 transition-colors" size={20} />
                    <input 
                      type="text" 
                      value={profile.institution}
                      onChange={(e) => setProfile({ ...profile, institution: e.target.value })}
                      className="w-full bg-slate-50 dark:bg-[#001428] border border-slate-200 dark:border-white/10 rounded-2xl py-5 pl-14 pr-6 font-bold text-[#001E3C] dark:text-white focus:outline-none focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-4">{t('researchField')}</label>
                  <div className="relative group">
                    <GraduationCap className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-sky-500 transition-colors" size={20} />
                    <input 
                      type="text" 
                      value={profile.researchField}
                      onChange={(e) => setProfile({ ...profile, researchField: e.target.value })}
                      className="w-full bg-slate-50 dark:bg-[#001428] border border-slate-200 dark:border-white/10 rounded-2xl py-5 pl-14 pr-6 font-bold text-[#001E3C] dark:text-white focus:outline-none focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 transition-all"
                    />
                  </div>
                </div>

                <div className="md:col-span-2 space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-4">{t('biography')}</label>
                  <div className="relative group">
                    <FileText className="absolute left-5 top-8 text-slate-300 group-focus-within:text-sky-500 transition-colors" size={20} />
                    <textarea 
                      rows={4}
                      value={profile.biography}
                      onChange={(e) => setProfile({ ...profile, biography: e.target.value })}
                      className="w-full bg-slate-50 dark:bg-[#001428] border border-slate-200 dark:border-white/10 rounded-3xl py-7 pl-14 pr-6 font-bold text-[#001E3C] dark:text-white focus:outline-none focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 transition-all resize-none"
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <p className="text-slate-500 font-medium text-xs max-w-sm">{t('profilePermissions')}</p>
                <button 
                  type="submit"
                  className={`flex items-center justify-center gap-3 px-10 py-4 rounded-[2rem] font-black text-sm shadow-xl transition-all uppercase tracking-widest ${isSaved ? 'bg-green-500 text-white' : 'bg-sky-500 text-white'}`}
                >
                  {isSaved ? <><CheckCircle2 size={18} /> {t('saved')}</> : <><Save size={18} /> {t('saveProfile')}</>}
                </button>
              </div>
            </form>
          )}

          {activeTab === 'events' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {registeredEvents.length > 0 ? (
                registeredEvents.map(event => (
                  <div key={event.id} className="bg-white dark:bg-[#001E3C] rounded-3xl p-6 border border-slate-200 dark:border-white/5 flex gap-6 group hover:shadow-xl transition-all">
                    <div className="w-24 h-24 rounded-2xl overflow-hidden shrink-0">
                      <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-black text-[#001E3C] dark:text-white truncate mb-2">{event.title}</h4>
                      <div className="space-y-1 mb-4">
                        <p className="text-xs text-slate-400 flex items-center gap-2"><Calendar size={12} /> {event.startDate}</p>
                        <p className="text-xs text-slate-400 flex items-center gap-2"><MapPin size={12} className="shrink-0" /> <span className="truncate">{event.location}</span></p>
                      </div>
                      <button onClick={() => setSelectedEvent(event)} className="text-[10px] font-black uppercase text-sky-500 hover:underline">{t('viewDetails')}</button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="md:col-span-2 py-20 text-center glass-card dark:bg-white/5 rounded-3xl border border-dashed border-slate-300">
                  <Calendar className="mx-auto mb-4 text-slate-300" size={48} />
                  <p className="text-slate-400 font-bold">{t('noMatches')}</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'submissions' && (
            <div className="space-y-6">
              {submissions.length > 0 ? (
                submissions.map(sub => (
                  <div key={sub.id} className="bg-white dark:bg-[#001E3C] rounded-3xl p-8 border border-slate-100 dark:border-white/5 shadow-lg flex flex-col md:flex-row justify-between items-center gap-6 group hover:border-sky-500/30 transition-all">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3 mb-4">
                        <span className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${getStatusColor(sub.status)}`}>
                          {sub.status}
                        </span>
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1">
                          <Clock size={12} /> Submitted {sub.date}
                        </span>
                      </div>
                      <h4 className="text-xl font-black text-[#001E3C] dark:text-white mb-2 italic tracking-tight">{sub.title}</h4>
                      <p className="text-xs text-slate-500 font-bold uppercase tracking-widest flex items-center gap-2">
                        <MapPin size={12} /> {sub.eventTitle}
                      </p>
                    </div>
                    <div className="flex gap-3">
                      <button className="p-3 bg-slate-50 dark:bg-white/5 text-slate-400 hover:text-sky-500 rounded-xl transition-colors border border-slate-100 dark:border-white/10">
                        <FileText size={20} />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-20 text-center glass-card dark:bg-white/5 rounded-[3rem] border border-dashed border-slate-300">
                  <Send className="mx-auto mb-4 text-slate-300" size={48} />
                  <p className="text-slate-400 font-bold mb-8">You haven't submitted any research yet.</p>
                  <button onClick={() => setSelectedEvent(MOCK_EVENTS[0])} className="px-8 py-4 bg-sky-500 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-sky-500/20">Explore Open Events</button>
                </div>
              )}
            </div>
          )}

          {activeTab === 'security' && (
            <div className="glass-card dark:bg-[#001E3C]/50 rounded-[3rem] p-10 md:p-16 border border-slate-200 dark:border-white/5 space-y-12">
              <div className="space-y-6">
                <h3 className="text-xl font-black text-[#001E3C] dark:text-white italic flex items-center gap-3">
                  <Lock className="text-sky-500" /> {t('changePassword')}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input type="password" placeholder="Current Password" className="bg-slate-50 dark:bg-[#001428] border border-slate-200 dark:border-white/10 rounded-2xl p-5 text-sm font-bold" />
                  <input type="password" placeholder="New Password" className="bg-slate-50 dark:bg-[#001428] border border-slate-200 dark:border-white/10 rounded-2xl p-5 text-sm font-bold" />
                </div>
                <button className="px-8 py-4 bg-sky-500 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg shadow-sky-500/20">{t('changePassword')}</button>
              </div>

              <div className="pt-12 border-t border-slate-200 dark:border-white/5">
                <h3 className="text-xl font-black text-red-500 italic mb-6 flex items-center gap-3">
                  <Trash2 /> {t('deleteAccount')}
                </h3>
                <p className="text-slate-500 text-sm mb-8 font-medium">This action is irreversible. All your clinical data and registrations will be permanently deleted.</p>
                <button className="px-8 py-4 bg-red-500/10 text-red-500 border border-red-500/20 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all">{t('deleteAccount')}</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileView;
