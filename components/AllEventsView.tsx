
import React, { useState } from 'react';
import { Search, ChevronLeft, CalendarDays, History } from 'lucide-react';
import { useApp } from '../App';
import { MOCK_EVENTS } from '../constants';
import EventCard from './EventCard';

const AllEventsView: React.FC<{ events: any[]; filterState: any; onSearch: (q: string) => void }> = ({ events, filterState, onSearch }) => {
  const { t, setView, setSelectedEvent, setFilterState } = useApp();
  const [localQuery, setLocalQuery] = useState(filterState.searchQuery);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(localQuery);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#001428] pt-32 pb-24 px-6 transition-colors duration-500">
      <div className="max-w-6xl mx-auto">
        {/* Navigation / Back Button */}
        <button 
          onClick={() => setView('home')}
          className="flex items-center gap-2 text-slate-400 hover:text-sky-500 font-bold text-sm uppercase tracking-widest mb-12 transition-colors group"
        >
          <ChevronLeft size={20} className="transition-transform group-hover:-translate-x-1" />
          {t('backToHome')}
        </button>

        {/* Search Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-black text-[#001E3C] dark:text-white italic tracking-tighter mb-6 leading-none">
            {t('allEvents')}
          </h1>
          <p className="text-slate-400 font-medium text-lg max-w-2xl mx-auto">
            {t('allEventsSub')}
          </p>
        </div>

        {/* Unified Search & Status Switcher */}
        <div className="flex flex-col md:flex-row items-center gap-6 mb-16">
          <form onSubmit={handleSearchSubmit} className="relative flex-1 w-full">
            <input 
              type="text" 
              value={localQuery}
              onChange={(e) => setLocalQuery(e.target.value)}
              placeholder={t('searchPlaceholder')}
              className="w-full bg-white dark:bg-[#001E3C] border border-slate-200 dark:border-white/10 rounded-[2rem] py-5 pl-14 pr-6 font-bold text-slate-700 dark:text-white focus:ring-4 focus:ring-sky-500/10 shadow-xl"
            />
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" size={24} />
          </form>
          
          <div className="flex items-center gap-3 bg-white dark:bg-[#001E3C] p-2 rounded-[2rem] border border-slate-200 dark:border-white/10 shadow-lg shrink-0">
            <button 
              onClick={() => setFilterState({ ...filterState, status: 'upcoming' })}
              className={`flex items-center gap-3 px-8 py-4 rounded-[1.5rem] transition-all font-black text-xs uppercase tracking-widest ${filterState.status === 'upcoming' ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/20' : 'text-slate-400 hover:text-slate-600'}`}
            >
              <CalendarDays size={18} />
              {t('upcoming')}
            </button>
            <button 
              onClick={() => setFilterState({ ...filterState, status: 'archived' })}
              className={`flex items-center gap-3 px-8 py-4 rounded-[1.5rem] transition-all font-black text-xs uppercase tracking-widest ${filterState.status === 'archived' ? 'bg-[#001E3C] dark:bg-slate-700 text-white shadow-lg' : 'text-slate-400 hover:text-slate-600'}`}
            >
              <History size={18} />
              {t('archived')}
            </button>
          </div>
        </div>

        {/* Results Grid */}
        <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
          {events.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {events.filter(e => filterState.status === 'upcoming' ? !e.isArchived : e.isArchived).map(event => (
                <EventCard key={event.id} event={event} onViewDetails={setSelectedEvent} />
              ))}
            </div>
          ) : (
            <div className="py-32 text-center bg-white dark:bg-[#001E3C] rounded-[4rem] border border-slate-100 dark:border-white/5 shadow-2xl">
              <div className="w-24 h-24 bg-slate-50 dark:bg-white/5 rounded-full flex items-center justify-center mx-auto mb-8">
                <Search className="text-slate-200 dark:text-white/10" size={48} />
              </div>
              <h3 className="text-3xl font-black text-[#001E3C] dark:text-white italic mb-4">{t('noMatches')}</h3>
              <p className="text-slate-400 font-medium max-w-sm mx-auto mb-10">{t('noMatchesSub')}</p>
              <button 
                onClick={() => { setFilterState({ ...filterState, searchQuery: '', location: '' }); setLocalQuery(''); }}
                className="px-10 py-4 bg-sky-500 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-sky-500/20 hover:bg-sky-400 transition-colors"
              >
                {t('reset')}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllEventsView;
