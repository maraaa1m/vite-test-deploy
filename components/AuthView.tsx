
import React, { useState, useRef } from 'react';
import { Mail, Lock, User, ChevronRight, ArrowLeft, ShieldCheck, Camera, ChevronDown, Check, FileText, AlertCircle, Briefcase, GraduationCap } from 'lucide-react';
import { useApp } from '../App';
import Logo from './Logo';
import { Role } from '../types';

type AuthMode = 'login' | 'register' | 'forgot';

const AuthView: React.FC = () => {
  const { t, setView, loginUser, authIntent, setAuthIntent } = useApp();
  const [mode, setMode] = useState<AuthMode>(authIntent === 'register' ? 'register' : 'login');
  const [role, setRole] = useState<Role>('Participant');
  const [isRoleMenuOpen, setIsRoleMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isResetSent, setIsResetSent] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const roles: { id: Role, labelKey: any }[] = [
    { id: 'Organizer', labelKey: 'role_Organizer' },
    { id: 'Author', labelKey: 'role_Author' },
    { id: 'ScientificCommittee', labelKey: 'role_CommitteeMember' },
    { id: 'Speaker', labelKey: 'role_Speaker' },
    { id: 'WorkshopAnimator', labelKey: 'role_WorkshopAnimator' },
    { id: 'Participant', labelKey: 'role_Participant' },
  ];

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.size < 2 * 1024 * 1024) { // 2MB limit
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      alert("Please upload a file smaller than 2MB.");
    }
  };

  const handleBack = () => {
    if (mode === 'login' || (mode === 'register' && authIntent === 'register')) {
      setView('home');
      setAuthIntent(null);
    } else {
      setMode('login');
      setIsResetSent(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    if (mode === 'forgot') {
      setTimeout(() => {
        setIsResetSent(true);
        setIsLoading(false);
      }, 1000);
      return;
    }

    setTimeout(() => {
      loginUser({
        id: 'u1',
        email: 'user@medsymposium.dz',
        name: role === 'ScientificCommittee' ? 'Pr. Sarah Benali' : 'Scientific Professional',
        role: role,
        profile: {
          institution: 'Healthcare Institution',
          researchField: 'Clinical Research',
          biography: 'Academic profile on MedSymposium.',
          photo: profilePhoto || 'https://images.unsplash.com/photo-1559839734-2b71f1536783?auto=format&fit=crop&q=80&w=200'
        }
      });
      setIsLoading(false);
      setView('home');
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#001428] relative overflow-hidden px-6 py-12">
      <div 
        className="absolute inset-0 z-0 opacity-15 pointer-events-none grayscale contrast-125"
        style={{ 
          backgroundImage: 'url("https://images.unsplash.com/photo-1576091160550-2173dad99978?auto=format&fit=crop&q=80&w=2000")',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      ></div>
      
      <div className="absolute inset-0 bg-gradient-to-b from-[#001428] via-[#001E3C]/95 to-[#001428] z-1"></div>

      <div className="w-full max-w-xl relative z-10 flex flex-col items-center">
        <div className="w-full mb-12 flex flex-col items-center">
          <button 
            onClick={handleBack}
            className="flex items-center gap-2 text-slate-500 hover:text-sky-400 font-black text-[10px] uppercase tracking-[0.4em] mb-12 transition-all group self-start"
          >
            <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" />
            {mode === 'login' ? t('backToHome') : t('backToLogin')}
          </button>
          <Logo isScrolled={false} forceWhite={true} className="scale-125 md:scale-150 mb-12" />
        </div>

        <div className="w-full glass-card dark:bg-[#001E3C]/70 border border-white/10 rounded-[4rem] p-10 md:p-14 shadow-2xl backdrop-blur-3xl relative overflow-hidden">
          <div className="mb-12 text-center relative z-10">
            {authIntent === 'author_required' && mode === 'login' && (
              <div className="mb-8 p-5 bg-amber-500/10 border border-amber-500/20 rounded-3xl flex items-center gap-4 text-amber-500 text-sm font-black text-left leading-snug animate-in fade-in slide-in-from-top-4">
                <div className="p-2 bg-amber-500/20 rounded-xl shrink-0"><AlertCircle size={20} /></div>
                {t('authorRequired')}
              </div>
            )}

            <h1 className="text-4xl md:text-5xl font-black text-white italic tracking-tighter mb-4 leading-none">
              {mode === 'login' ? t('login') : mode === 'register' ? t('register') : t('resetPassword')}
            </h1>
            <p className="text-slate-400 font-medium text-base">
              {isResetSent ? "Check your email for instructions." : (mode === 'login' ? t('loginSubtitle') : t('registerSubtitle'))}
            </p>
          </div>

          {!isResetSent ? (
            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              {mode === 'register' && (
                <div className="space-y-6 animate-in fade-in slide-in-from-top-6 duration-700">
                  <div className="flex flex-col items-center gap-4 mb-8">
                    <div onClick={() => fileInputRef.current?.click()} className="relative w-28 h-28 rounded-[2.5rem] bg-white/5 border-2 border-dashed border-sky-500/40 hover:border-sky-400 flex items-center justify-center overflow-hidden cursor-pointer group shadow-2xl">
                      {profilePhoto ? <img src={profilePhoto} alt="Preview" className="w-full h-full object-cover" /> : <Camera className="text-slate-500 group-hover:text-sky-400 transition-colors" size={32} />}
                    </div>
                    <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handlePhotoUpload} />
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">{t('uploadPhoto')}</span>
                  </div>

                  <div className="relative group">
                    <User className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-sky-400" size={20} />
                    <input type="text" required placeholder={t('fullName')} className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-16 pr-6 font-bold text-white focus:outline-none focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 text-sm" />
                  </div>
                </div>
              )}

              {/* Role Selection (Common for Login and Register) */}
              {mode !== 'forgot' && (
                <div className="relative">
                  <button type="button" onClick={() => setIsRoleMenuOpen(!isRoleMenuOpen)} className="w-full flex items-center justify-between bg-white/5 border border-white/10 rounded-2xl py-5 px-6 font-bold text-white hover:bg-white/10 text-sm group">
                    <div className="flex items-center gap-4">
                      <ShieldCheck size={20} className="text-sky-400" />
                      <span>{t(roles.find(r => r.id === role)?.labelKey || 'role_Participant')}</span>
                    </div>
                    <ChevronDown size={20} className={`text-slate-500 transition-transform ${isRoleMenuOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isRoleMenuOpen && (
                    <div className="absolute top-full left-0 right-0 mt-3 bg-[#001E3C] border border-white/10 rounded-3xl shadow-2xl z-[100] overflow-hidden backdrop-blur-2xl animate-in fade-in zoom-in-95 duration-200">
                      {roles.map((r) => (
                        <button key={r.id} type="button" onClick={() => { setRole(r.id); setIsRoleMenuOpen(false); }} className="w-full flex items-center justify-between px-6 py-5 hover:bg-sky-500/20 transition-all text-left">
                          <span className={`font-bold text-sm ${role === r.id ? 'text-sky-400' : 'text-slate-400'}`}>{t(r.labelKey)}</span>
                          {role === r.id && <Check size={18} className="text-sky-400" />}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              <div className="relative group">
                <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-sky-400" size={20} />
                <input type="email" required placeholder={t('email')} className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-16 pr-6 font-bold text-white focus:outline-none focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 text-sm" />
              </div>

              {mode !== 'forgot' && (
                <div className="relative group">
                  <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-sky-400" size={20} />
                  <input type="password" required placeholder={t('password')} className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-16 pr-6 font-bold text-white focus:outline-none focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 text-sm" />
                </div>
              )}

              <button type="submit" disabled={isLoading} className="w-full py-6 bg-sky-500 hover:bg-sky-400 text-white font-black rounded-3xl text-lg shadow-2xl transition-all active:scale-[0.98] uppercase tracking-[0.25em]">
                {isLoading ? <div className="w-6 h-6 border-4 border-white/20 border-t-white rounded-full animate-spin mx-auto"></div> : (mode === 'login' ? t('login') : mode === 'register' ? t('register') : t('sendReset'))}
              </button>
            </form>
          ) : (
            <div className="text-center py-10">
               <div className="w-20 h-20 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                 <Check size={40} />
               </div>
               <button onClick={() => setMode('login')} className="px-12 py-4 bg-white/5 text-white border border-white/10 rounded-2xl font-black text-sm uppercase tracking-widest">{t('backToLogin')}</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthView;
