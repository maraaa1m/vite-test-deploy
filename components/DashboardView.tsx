
import React, { useState } from 'react';
import { 
  LayoutDashboard, Calendar, FileText, Users, Award, Plus, Mic2, Settings, Bell, 
  Search, ChevronRight, TrendingUp, Clock, CheckCircle2, AlertCircle, FileCheck, 
  QrCode, Download, Ticket, Shield, Printer, ExternalLink, MapPin, Mail, 
  Star, Briefcase, ChevronDown, ListChecks, Send, UserCheck, Upload, FileBadge
} from 'lucide-react';
import { useApp } from '../App';
import { MOCK_EVENTS } from '../constants';
import OrganizerDashboard from './OrganizerDashboard';

const DashboardView: React.FC = () => {
  const { user, setSelectedEvent, setView, registeredEventIds, submissions, t } = useApp();
  const [activeSubTab, setActiveSubTab] = useState<'overview' | 'actions' | 'certificates'>('overview');

  if (!user) return (
    <div className="min-h-screen flex items-center justify-center pt-24">
      <div className="text-center">
        <AlertCircle size={48} className="mx-auto mb-4 text-slate-300" />
        <p className="text-slate-500 font-bold">Please log in to access your dashboard.</p>
        <button onClick={() => setView('auth')} className="mt-4 px-8 py-3 bg-sky-500 text-white rounded-xl font-black uppercase text-xs">Login</button>
      </div>
    </div>
  );

  const registeredEvents = MOCK_EVENTS.filter(e => registeredEventIds.includes(e.id));
  const acceptedSubmissions = submissions.filter(s => s.status === 'Accepted');

  // Logic to determine which certificates are available
  const getCertificates = () => {
    const certs: { id: string, title: string, event: string, type: string, icon: any }[] = [];
    
    registeredEvents.forEach(e => {
      // 1. All registered get Participation Cert
      certs.push({ 
        id: `part-${e.id}`, 
        title: 'Certificate of Attendance', 
        event: e.title, 
        type: 'Participation', 
        icon: <UserCheck className="text-sky-500" /> 
      });

      // 2. Authors get Presentation Cert for accepted works
      if (user.role === 'Author') {
        acceptedSubmissions.filter(s => s.eventId === e.id).forEach(s => {
          certs.push({ 
            id: `pres-${s.id}`, 
            title: 'Presentation Certificate', 
            event: e.title, 
            type: `Scientific: ${s.title}`, 
            icon: <FileBadge className="text-purple-500" /> 
          });
        });
      }

      // 3. Committee members get Membership Cert
      if (user.role === 'ScientificCommittee') {
        certs.push({ 
          id: `comm-${e.id}`, 
          title: 'Board Membership Attestation', 
          event: e.title, 
          type: 'Scientific Committee', 
          icon: <Shield className="text-amber-500" /> 
        });
      }

      // 4. Organizers get Organizing Cert
      if (user.role === 'Organizer') {
        certs.push({ 
          id: `org-${e.id}`, 
          title: 'Organizing Committee Attestation', 
          event: e.title, 
          type: 'Executive Board', 
          icon: <Award className="text-emerald-500" /> 
        });
      }
    });

    return certs;
  };

  const certificatesList = getCertificates();

  const renderDashboardByRole = () => {
    if (user.role === 'Organizer') return <OrganizerDashboard />;

    return (
      <div className="animate-in fade-in slide-in-from-right-8 duration-500 space-y-12">
         <div className="flex flex-col lg:flex-row justify-between items-start gap-12 mb-12">
          <div className="space-y-2">
            <h1 className="text-4xl font-black text-[#001E3C] dark:text-white italic tracking-tighter">
              {user.role === 'Author' ? 'Researcher' : user.role === 'ScientificCommittee' ? 'Committee' : 'My'} <span className="text-sky-500">Journey</span>
            </h1>
            <p className="text-slate-500 font-medium">Manage your professional development and scientific credentials.</p>
          </div>
          <div className="flex items-center gap-3 bg-white dark:bg-[#001E3C] p-2 rounded-2xl border border-slate-100 dark:border-white/5 shadow-sm">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'certificates', label: 'My Certificates' }
            ].map(tab => (
              <button 
                key={tab.id} 
                onClick={() => setActiveSubTab(tab.id as any)}
                className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeSubTab === tab.id ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/20' : 'text-slate-400 hover:text-slate-600'}`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {activeSubTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h3 className="text-xl font-black text-[#001E3C] dark:text-white italic flex items-center gap-3"><Calendar className="text-sky-500" /> Registered Events</h3>
              {registeredEvents.length > 0 ? registeredEvents.map(event => (
                <div key={event.id} className="bg-white dark:bg-[#001E3C] p-6 rounded-[2.5rem] border border-slate-100 dark:border-white/5 flex items-center gap-6 group hover:border-sky-500/30 transition-all shadow-lg">
                  <img src={event.image} alt="" className="w-20 h-20 rounded-2xl object-cover" />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-black text-[#001E3C] dark:text-white truncate italic tracking-tight">{event.title}</h4>
                    <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-1 flex items-center gap-2">
                      <MapPin size={12}/> {event.location.split(',')[1] || event.location}
                    </p>
                  </div>
                  <button onClick={() => setSelectedEvent(event)} className="p-3 bg-sky-500/10 text-sky-500 rounded-xl hover:bg-sky-500 hover:text-white transition-all"><ChevronRight size={20}/></button>
                </div>
              )) : (
                <div className="p-10 text-center bg-white dark:bg-white/5 rounded-3xl border border-dashed border-slate-200">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">No active registrations.</p>
                </div>
              )}
            </div>
            
            <div className="space-y-6">
              <h3 className="text-xl font-black text-[#001E3C] dark:text-white italic flex items-center gap-3"><TrendingUp className="text-sky-500" /> Activity Stats</h3>
              <div className="bg-white dark:bg-[#001E3C] p-8 rounded-[2.5rem] border border-slate-100 dark:border-white/5 shadow-xl grid grid-cols-2 gap-8">
                  <div className="text-center">
                    <p className="text-[9px] font-black uppercase text-slate-400 mb-2">Events Attended</p>
                    <p className="text-3xl font-black text-[#001E3C] dark:text-white">{registeredEvents.length}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-[9px] font-black uppercase text-slate-400 mb-2">Certs Available</p>
                    <p className="text-3xl font-black text-sky-500">{certificatesList.length}</p>
                  </div>
              </div>
              <div className="bg-sky-500/5 p-8 rounded-[2.5rem] border border-sky-500/10 flex gap-4">
                  <Clock className="text-sky-500 shrink-0" />
                  <p className="text-xs text-slate-500 leading-relaxed font-medium">Digital certificates for current events are automatically generated upon verification of attendance.</p>
              </div>
            </div>
          </div>
        )}

        {activeSubTab === 'certificates' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {certificatesList.length > 0 ? certificatesList.map(cert => (
              <div key={cert.id} className="bg-white dark:bg-[#001E3C] rounded-[3rem] p-10 border border-slate-100 dark:border-white/5 shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 text-sky-500 opacity-5 group-hover:scale-110 transition-transform"><QrCode size={120}/></div>
                <div className="flex justify-between items-start mb-8">
                    <div className="px-4 py-1.5 bg-sky-500/10 text-sky-500 rounded-full text-[10px] font-black uppercase tracking-widest">{cert.type}</div>
                    {cert.icon}
                </div>
                <div className="space-y-4 mb-8">
                    <h4 className="font-black text-2xl text-[#001E3C] dark:text-white italic leading-tight tracking-tight">{cert.title}</h4>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-relaxed">{cert.event}</p>
                    <div className="h-px bg-slate-50 dark:bg-white/5 w-full"></div>
                    <p className="text-xs font-bold text-slate-500">Issued to: <span className="text-[#001E3C] dark:text-white">{user.name}</span></p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                   <button className="py-4 bg-slate-50 dark:bg-white/5 text-slate-500 dark:text-slate-300 rounded-2xl font-black text-[10px] uppercase tracking-widest border border-transparent hover:border-slate-200 transition-all flex items-center justify-center gap-2">
                    <Printer size={14}/> Print
                   </button>
                   <button className="py-4 bg-sky-500 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-sky-500/20 active:scale-95 transition-all flex items-center justify-center gap-2">
                    <Download size={14}/> Download PDF
                   </button>
                </div>
              </div>
            )) : (
              <div className="col-span-full py-20 text-center bg-white dark:bg-white/5 rounded-[3rem] border border-dashed border-slate-200">
                <Award size={48} className="mx-auto mb-4 text-slate-200"/>
                <p className="font-black text-slate-400 uppercase tracking-widest text-xs">No certificates issued yet.</p>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };
  
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#001428] pt-32 pb-24 px-6 transition-colors duration-500">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12">
        <aside className="w-full lg:w-72 shrink-0">
          <div className="bg-white dark:bg-[#001E3C] rounded-[3rem] p-4 border border-slate-100 dark:border-white/5 shadow-2xl space-y-2 sticky top-32">
            {[
              { id: 'dash', label: 'Main Portal', icon: <LayoutDashboard size={20} />, active: true },
              { id: 'msgs', label: 'Inbox', icon: <Mail size={20} />, onClick: () => setView('messaging') },
              { id: 'settings', label: 'My Account', icon: <Settings size={20} />, onClick: () => setView('profile') },
            ].map((item) => (
              <button 
                key={item.id} 
                onClick={item.onClick}
                className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${item.active ? 'bg-sky-500 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5'}`}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </div>
        </aside>
        <main className="flex-1 min-w-0">{renderDashboardByRole()}</main>
      </div>
    </div>
  );
};

export default DashboardView;
