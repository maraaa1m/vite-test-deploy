
import React from 'react';
import { Calendar, MapPin, Users, ArrowUpRight, Info, CheckCircle, Settings, Send, Mic2, Lock } from 'lucide-react';
import { MedicalEventExtended } from '../constants';
import { useApp } from '../App';

interface EventCardProps {
  event: MedicalEventExtended;
  onViewDetails: (event: MedicalEventExtended) => void;
}

const EventCard: React.FC<EventCardProps> = ({ event, onViewDetails }) => {
  const { t, registeredEventIds, registerForEvent, user, setAuthIntent, setView } = useApp();
  const isRegistered = registeredEventIds.includes(event.id);

  const getRoleBasedAction = () => {
    // Shared logical check: Archived events are non-interactive for primary actions
    if (event.isArchived) {
      return {
        label: t('archived'),
        icon: <Lock size={18} />,
        onClick: () => onViewDetails(event),
        disabled: true
      };
    }

    if (!user) return {
      label: t('secureSpot'),
      icon: <ArrowUpRight size={18} />,
      onClick: () => registerForEvent(event.id)
    };

    switch (user.role) {
      case 'Organizer':
        return {
          label: 'Manage Event',
          icon: <Settings size={18} />,
          onClick: () => onViewDetails(event) // Placeholder for manage view
        };
      case 'Author':
        return {
          label: 'Submit Abstract',
          icon: <Send size={18} />,
          onClick: () => {
            onViewDetails(event);
          }
        };
      // Fixed typo: changed 'Workshop Animator' to 'WorkshopAnimator' to match Role type
      case 'WorkshopAnimator':
        return {
          label: 'Lead Session',
          icon: <Mic2 size={18} />,
          onClick: () => onViewDetails(event)
        };
      case 'Participant':
      default:
        return {
          label: isRegistered ? t('registered') : t('secureSpot'),
          icon: isRegistered ? <CheckCircle size={18} /> : <ArrowUpRight size={18} />,
          onClick: () => !isRegistered && registerForEvent(event.id),
          disabled: isRegistered
        };
    }
  };

  const action = getRoleBasedAction();
  
  return (
    <div className={`group relative bg-white dark:bg-[#001E3C] rounded-[2.5rem] border border-slate-100 dark:border-white/5 overflow-hidden transition-all duration-500 hover:shadow-[0_40px_80px_-20px_rgba(14,165,233,0.15)] flex flex-col h-full ${event.isArchived ? 'opacity-80 grayscale-[0.3]' : ''}`}>
      {/* Image Area with Zoom */}
      <div className="relative h-64 overflow-hidden">
        <img 
          src={event.image} 
          alt={event.title}
          className={`w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 ${event.isArchived ? 'grayscale' : ''}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#001E3C]/80 via-transparent to-transparent opacity-60"></div>
        
        {/* Floating Badges */}
        <div className="absolute top-6 left-6 right-6 flex justify-between items-center pointer-events-none">
          {event.isArchived ? (
            <span className="px-4 py-2 bg-slate-800/80 backdrop-blur-md rounded-2xl text-[10px] font-black text-slate-400 tracking-[0.1em] uppercase border border-white/10">
              {t('archived')}
            </span>
          ) : <div />}
          
          <div className="flex-1"></div>
          
          {isRegistered && user?.role === 'Participant' && !event.isArchived ? (
            <span className="px-4 py-2 bg-green-500 rounded-2xl text-[10px] font-black text-white tracking-[0.1em] uppercase shadow-lg shadow-green-500/30 flex items-center gap-2">
              <CheckCircle size={12} />
              {t('registered')}
            </span>
          ) : (
            <span className="px-4 py-2 bg-sky-500 rounded-2xl text-[10px] font-black text-white tracking-[0.1em] uppercase shadow-lg shadow-sky-500/30">
              {event.price}
            </span>
          )}
        </div>
      </div>

      {/* Body Content */}
      <div className="p-10 flex-1 flex flex-col">
        <div className="flex items-center gap-2 mb-4">
          <span className={`w-2 h-2 rounded-full ${event.isArchived ? 'bg-slate-500' : 'bg-sky-500'}`}></span>
          <span className={`${event.isArchived ? 'text-slate-500' : 'text-sky-500'} font-black text-[10px] uppercase tracking-[0.3em]`}>
            {event.theme}
          </span>
        </div>
        
        <h3 className={`text-2xl font-extrabold leading-tight mb-4 transition-colors line-clamp-2 italic tracking-tight ${event.isArchived ? 'text-slate-400' : 'text-[#001E3C] dark:text-white group-hover:text-sky-600'}`}>
          {event.title}
        </h3>
        
        <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-8 font-medium">
          {event.description}
        </p>

        {/* Metadata Grid */}
        <div className="grid grid-cols-1 gap-4 mt-auto">
          <div className="flex items-center group/meta">
            <div className="w-10 h-10 rounded-2xl bg-slate-50 dark:bg-white/5 flex items-center justify-center mr-4 transition-colors group-hover/meta:bg-sky-50 dark:group-hover/meta:bg-sky-900/20">
              <Calendar size={18} className="text-slate-400 transition-colors group-hover/meta:text-sky-500" />
            </div>
            <span className="text-slate-600 dark:text-slate-300 text-sm font-semibold">
              {event.startDate}
            </span>
          </div>
          
          <div className="flex items-center group/meta">
            <div className="w-10 h-10 rounded-2xl bg-slate-50 dark:bg-white/5 flex items-center justify-center mr-4 transition-colors group-hover/meta:bg-sky-50 dark:group-hover/meta:bg-sky-900/20">
              <MapPin size={18} className="text-slate-400 transition-colors group-hover/meta:text-sky-500" />
            </div>
            <span className="text-slate-600 dark:text-slate-300 text-sm font-semibold truncate capitalize">{event.location}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-10 flex gap-3 opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
           <button 
             onClick={() => onViewDetails(event)}
             className="flex-1 flex items-center justify-center gap-2 py-4 bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 rounded-[1.5rem] font-bold text-sm hover:bg-slate-200 dark:hover:bg-white/10 transition-colors"
           >
             <Info size={18} />
             {t('viewDetails')}
           </button>
           <button 
             onClick={action.onClick}
             disabled={action.disabled}
             className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-[1.5rem] font-black text-xs uppercase tracking-widest shadow-xl transition-all active:scale-95 ${
               action.disabled 
                ? 'bg-slate-200 dark:bg-white/5 text-slate-400 cursor-not-allowed shadow-none' 
                : 'bg-[#001E3C] dark:bg-sky-600 text-white shadow-blue-900/20'
             }`}
           >
             {action.icon}
             {action.label}
           </button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
