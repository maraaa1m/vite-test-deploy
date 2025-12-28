
import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Sun, Moon, Globe, Settings, LogOut, UserCircle2, LayoutDashboard, Bell, CheckCircle2, AlertCircle, Info, MessageSquare } from 'lucide-react';
import Logo from './Logo';
import { useApp } from '../App';

const Header: React.FC = () => {
  const { lang, setLang, theme, setTheme, t, resetFilters, setView, user, logoutUser, setAuthIntent, notifications, markNotificationRead, clearNotifications, messages } = useApp();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  
  const settingsRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  const unreadNotifCount = notifications.filter(n => !n.read).length;
  const unreadMsgCount = messages.filter(m => !m.isRead && m.senderId !== user?.id).length;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (settingsRef.current && !settingsRef.current.contains(target)) setIsSettingsOpen(false);
      if (userRef.current && !userRef.current.contains(target)) setIsUserMenuOpen(false);
      if (notifRef.current && !notifRef.current.contains(target)) setIsNotificationsOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleGoHome = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    resetFilters();
    setView('home');
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { name: t('home'), href: '#', onClick: handleGoHome },
    { name: t('events'), href: '#', onClick: (e: any) => { e.preventDefault(); setView('directory'); setIsMobileMenuOpen(false); } },
    { name: t('about'), href: '#', onClick: (e: any) => { e.preventDefault(); setView('about'); setIsMobileMenuOpen(false); } },
    { name: t('contact'), href: '#', onClick: (e: any) => { e.preventDefault(); setView('contact'); setIsMobileMenuOpen(false); } },
  ];

  const navItemClass = isScrolled 
    ? 'text-slate-600 dark:text-slate-300 hover:text-[#0EA5E9]' 
    : 'text-white/90 hover:text-white';

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 transition-all duration-300 pointer-events-none">
      <header 
        className={`pointer-events-auto transition-all duration-500 ease-in-out mt-4 w-full max-w-7xl flex items-center justify-between rounded-full px-8 shadow-xl ${
          isScrolled 
            ? 'bg-white/95 dark:bg-[#001E3C]/95 backdrop-blur-md py-3 border border-slate-200 dark:border-white/10' 
            : 'bg-white/10 backdrop-blur-sm py-4 border border-white/10'
        }`}
      >
        <a href="#" onClick={handleGoHome}>
          <Logo isScrolled={isScrolled} />
        </a>

        <nav className="hidden md:flex items-center space-x-10">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              onClick={link.onClick}
              className={`font-semibold text-sm transition-all duration-300 ${navItemClass}`}
            >
              {link.name}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          {/* Messaging Button */}
          {user && (
            <button 
              onClick={() => setView('messaging')}
              className={`p-2 rounded-full transition-all relative ${
                isScrolled ? 'text-slate-400 hover:text-sky-500 bg-slate-50 dark:bg-white/5' : 'text-white/50 hover:text-white bg-white/10'
              }`}
            >
              <MessageSquare size={20} />
              {unreadMsgCount > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 bg-sky-500 text-white text-[8px] font-black rounded-full flex items-center justify-center border-2 border-white dark:border-[#001E3C]">
                  {unreadMsgCount}
                </span>
              )}
            </button>
          )}

          {/* Notifications */}
          {user && (
            <div className="relative" ref={notifRef}>
              <button 
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className={`p-2 rounded-full transition-all relative ${
                  isScrolled ? 'text-slate-400 hover:text-sky-500 bg-slate-50 dark:bg-white/5' : 'text-white/50 hover:text-white bg-white/10'
                }`}
              >
                <Bell size={20} />
                {unreadNotifCount > 0 && (
                  <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 text-white text-[8px] font-black rounded-full flex items-center justify-center animate-pulse border-2 border-white dark:border-[#001E3C]">
                    {unreadNotifCount}
                  </span>
                )}
              </button>

              {isNotificationsOpen && (
                <div className="absolute right-0 mt-4 w-80 bg-white dark:bg-[#001E3C] rounded-[2rem] shadow-2xl border border-slate-100 dark:border-white/10 p-6 animate-in fade-in zoom-in-95 duration-300 z-50">
                  <div className="flex justify-between items-center mb-6">
                    <h4 className="text-xs font-black uppercase tracking-widest text-[#001E3C] dark:text-white italic">Notifications</h4>
                    <button onClick={clearNotifications} className="text-[9px] font-black uppercase text-slate-400 hover:text-red-500 transition-colors">Clear All</button>
                  </div>
                  <div className="space-y-4 max-h-[350px] overflow-y-auto custom-scrollbar">
                    {notifications.length > 0 ? (
                      notifications.map(n => (
                        <div 
                          key={n.id} 
                          onClick={() => markNotificationRead(n.id)}
                          className={`p-4 rounded-2xl border transition-all cursor-pointer ${n.read ? 'bg-slate-50/50 dark:bg-white/5 border-transparent opacity-60' : 'bg-sky-500/5 border-sky-500/20'}`}
                        >
                          <div className="flex gap-3">
                            <div className={`shrink-0 mt-1 ${n.type === 'alert' ? 'text-red-500' : n.type === 'success' ? 'text-emerald-500' : 'text-sky-500'}`}>
                              {n.type === 'alert' ? <AlertCircle size={16}/> : n.type === 'success' ? <CheckCircle2 size={16}/> : <Info size={16}/>}
                            </div>
                            <div>
                              <p className="text-xs font-black text-[#001E3C] dark:text-white mb-1">{n.title}</p>
                              <p className="text-[10px] text-slate-500 font-medium leading-relaxed">{n.message}</p>
                              <p className="text-[9px] text-slate-400 mt-2 font-bold">{n.time}</p>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-10 opacity-40">
                        <Bell className="mx-auto mb-4" size={32}/>
                        <p className="text-xs font-bold">No notifications</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="relative" ref={settingsRef}>
            <button 
              onClick={() => setIsSettingsOpen(!isSettingsOpen)}
              className={`p-2 rounded-full transition-all ${
                isScrolled ? 'text-slate-400 hover:text-sky-500 bg-slate-50 dark:bg-white/5' : 'text-white/50 hover:text-white bg-white/10'
              }`}
            >
              <Settings size={20} className={isSettingsOpen ? 'rotate-90 text-sky-500' : ''} />
            </button>
            {isSettingsOpen && (
              <div className="absolute right-0 mt-4 w-64 bg-white dark:bg-[#001E3C] rounded-[2rem] shadow-2xl border border-slate-100 dark:border-white/10 p-4 animate-in fade-in zoom-in-95">
                <div className="px-4 py-2 text-[10px] font-black uppercase text-slate-400">Settings</div>
                <button onClick={() => setLang(lang === 'en' ? 'fr' : 'en')} className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-slate-50 dark:hover:bg-white/5 text-sm font-bold text-slate-700 dark:text-slate-200">
                  <span className="flex items-center gap-3"><Globe size={18} className="text-sky-500" /> Language</span>
                  <span className="text-[9px] bg-sky-100 dark:bg-sky-900/40 text-sky-600 px-2 py-1 rounded uppercase font-black">{lang}</span>
                </button>
                <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-slate-50 dark:hover:bg-white/5 text-sm font-bold text-slate-700 dark:text-slate-200">
                  <span className="flex items-center gap-3">{theme === 'light' ? <Moon size={18} className="text-sky-500" /> : <Sun size={18} className="text-sky-500" />} Theme</span>
                  <span className="text-[9px] bg-slate-100 dark:bg-white/10 text-slate-500 px-2 py-1 rounded uppercase font-black">{theme}</span>
                </button>
              </div>
            )}
          </div>

          {!user ? (
            <div className="flex items-center space-x-4">
              <button onClick={() => setView('auth')} className={`font-bold text-sm ${isScrolled ? 'text-slate-600 dark:text-slate-300' : 'text-white'}`}>Log In</button>
              <button onClick={() => { setAuthIntent('register'); setView('auth'); }} className="bg-sky-500 hover:bg-sky-400 text-white px-8 py-2.5 rounded-full font-bold text-sm shadow-lg active:scale-95">Register</button>
            </div>
          ) : (
            <div className="relative" ref={userRef}>
              <button onClick={() => setIsUserMenuOpen(!isUserMenuOpen)} className={`flex items-center gap-3 p-1 pl-4 rounded-full ${isScrolled ? 'bg-slate-100 dark:bg-white/5' : 'bg-white/10'}`}>
                <span className={`text-xs font-black uppercase ${isScrolled ? 'text-slate-700 dark:text-white' : 'text-white'}`}>{user.name.split(' ')[0]}</span>
                <img src={user.profile.photo} className="w-8 h-8 rounded-full object-cover border border-white/20" alt="" />
              </button>
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-4 w-64 bg-white dark:bg-[#001E3C] rounded-[2rem] shadow-2xl border border-slate-100 dark:border-white/10 p-4 animate-in fade-in zoom-in-95">
                  <button onClick={() => { setView(user.role === 'Organizer' ? 'organizer-dash' : 'dashboard'); setIsUserMenuOpen(false); }} className="w-full flex items-center gap-3 p-4 rounded-xl hover:bg-slate-50 dark:hover:bg-white/5 text-sm font-bold text-slate-700 dark:text-slate-200">
                    <LayoutDashboard size={18} className="text-sky-500" /> Dashboard
                  </button>
                  <button onClick={() => { setView('profile'); setIsUserMenuOpen(false); }} className="w-full flex items-center gap-3 p-4 rounded-xl hover:bg-slate-50 dark:hover:bg-white/5 text-sm font-bold text-slate-700 dark:text-slate-200">
                    <UserCircle2 size={18} className="text-sky-500" /> Profile
                  </button>
                  <button onClick={() => { logoutUser(); setIsUserMenuOpen(false); }} className="w-full flex items-center gap-3 p-4 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/10 text-sm font-bold text-red-600">
                    <LogOut size={18} /> Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        <button className="md:hidden p-2 text-white" onClick={() => setIsMobileMenuOpen(true)}>
          <Menu size={24} />
        </button>

        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-md md:hidden pointer-events-auto">
            <div className="absolute right-4 top-4 h-[calc(100vh-32px)] w-[calc(100vw-32px)] bg-white dark:bg-[#001E3C] rounded-3xl p-8 flex flex-col">
              <div className="flex justify-between items-center mb-12">
                <Logo isScrolled={true} />
                <button onClick={() => setIsMobileMenuOpen(false)}><X size={28} /></button>
              </div>
              <nav className="flex flex-col space-y-8 flex-1">
                {navLinks.map((link) => (
                  <a key={link.name} href={link.href} onClick={link.onClick} className="text-2xl font-black text-[#001E3C] dark:text-white italic">{link.name}</a>
                ))}
              </nav>
              <div className="pt-8 border-t border-slate-100 dark:border-white/10">
                {!user ? (
                  <div className="grid grid-cols-2 gap-4">
                    <button onClick={() => { setView('auth'); setIsMobileMenuOpen(false); }} className="py-4 rounded-2xl border border-slate-200 dark:border-white/10 font-bold">Login</button>
                    <button onClick={() => { setAuthIntent('register'); setView('auth'); setIsMobileMenuOpen(false); }} className="py-4 bg-sky-500 text-white rounded-2xl font-bold">Register</button>
                  </div>
                ) : (
                  <button onClick={() => { logoutUser(); setIsMobileMenuOpen(false); }} className="w-full py-4 bg-red-50 text-red-600 rounded-2xl font-bold">Logout</button>
                )}
              </div>
            </div>
          </div>
        )}
      </header>
    </div>
  );
};

export default Header;
