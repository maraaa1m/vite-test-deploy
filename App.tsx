
import React, { useState, useMemo, useEffect, createContext, useContext } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import EventSection from './components/EventSection';
import SpecialtySection from './components/SpecialtySection';
import CFPSection from './components/CFPSection';
import AllEventsView from './components/AllEventsView';
import AboutView from './components/AboutView';
import ContactView from './components/ContactView';
import AuthView from './components/AuthView';
import ProfileView from './components/ProfileView';
import DashboardView from './components/DashboardView';
import ImpactSection from './components/ImpactSection';
import EventDetailsModal from './components/EventDetailsModal';
import Footer from './components/Footer';
import OrganizerDashboard from './components/OrganizerDashboard';
import EventCreationView from './components/EventCreationView';
import SubmissionManagementView from './components/SubmissionManagementView';
import ReviewerEvaluationView from './components/ReviewerEvaluationView';
import ProgramEditorView from './components/ProgramEditorView';
import ReportsView from './components/ReportsView';
import MessagingView from './components/MessagingView';
import { MOCK_EVENTS as INITIAL_EVENTS, MedicalEventExtended } from './constants';
import { FilterState, Language, Theme, User, UserProfile, Role, Submission, CommunicationType, AppNotification, PaymentMethod, Workshop, Message, Conversation, Question, Poll } from './types';
import { translations } from './translations';
import { ChevronUp } from 'lucide-react';

export type AppView = 
  | 'home' | 'directory' | 'about' | 'contact' | 'auth' | 'profile' | 'dashboard'
  | 'organizer-dash' | 'create-event' | 'manage-submissions' | 'review-submission' 
  | 'program-editor' | 'reports' | 'messaging';

interface AppContextType {
  lang: Language;
  setLang: (l: Language) => void;
  theme: Theme;
  setTheme: (t: Theme) => void;
  t: (key: keyof typeof translations.en) => string;
  resetFilters: () => void;
  selectedEvent: MedicalEventExtended | null;
  setSelectedEvent: (event: MedicalEventExtended | null) => void;
  currentView: AppView;
  setView: (view: AppView) => void;
  authIntent: string | null;
  setAuthIntent: (intent: string | null) => void;
  user: User | null;
  loginUser: (user: User) => void;
  logoutUser: () => void;
  updateProfile: (profile: UserProfile) => void;
  updateRole: (role: Role) => void;
  events: MedicalEventExtended[];
  addWorkshop: (eventId: string, workshop: Omit<Workshop, 'id' | 'enrolled'>) => void;
  registeredEventIds: string[];
  registerForEvent: (id: string, details?: { name: string, phone: string, payment: PaymentMethod }) => void;
  registeredWorkshopIds: string[];
  enrollInWorkshop: (id: string) => void;
  submissions: Submission[];
  addSubmission: (eventId: string, title: string, type: CommunicationType, keywords: string) => void;
  withdrawSubmission: (id: string) => void;
  updateSubmissionStatus: (subId: string, status: Submission['status'], notes?: string) => void;
  notifications: AppNotification[];
  markNotificationRead: (id: string) => void;
  clearNotifications: () => void;
  messages: Message[];
  conversations: Conversation[];
  sendMessage: (conversationId: string, content: string) => void;
  startNewConversation: (recipient: { id: string, name: string, role: Role, photo?: string }) => string;
  questions: Question[];
  addQuestion: (sessionId: string, content: string) => void;
  voteQuestion: (questionId: string) => void;
  polls: Poll[];
  submitPollVote: (pollId: string, optionId: string) => void;
  filterState: FilterState;
  setFilterState: React.Dispatch<React.SetStateAction<FilterState>>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>(() => (localStorage.getItem('lang') as Language) || 'en');
  const [theme, setTheme] = useState<Theme>(() => (localStorage.getItem('theme') as Theme) || 'light');
  const [user, setUser] = useState<User | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<MedicalEventExtended | null>(null);
  const [currentView, setView] = useState<AppView>('home');
  const [authIntent, setAuthIntent] = useState<string | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [events, setEvents] = useState<MedicalEventExtended[]>(INITIAL_EVENTS);
  const [registeredEventIds, setRegisteredEventIds] = useState<string[]>([]);
  const [registeredWorkshopIds, setRegisteredWorkshopIds] = useState<string[]>([]);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [notifications, setNotifications] = useState<AppNotification[]>([
    { id: '1', title: 'Welcome', message: 'Welcome to MedSymposium. Enjoy global scientific events!', time: 'Just now', read: false, type: 'info' }
  ]);

  // Real-time Simulation State
  const [questions, setQuestions] = useState<Question[]>([]);
  const [polls, setPolls] = useState<Poll[]>([
    { 
      id: 'p1', 
      question: 'How would you rate the relevance of the clinical data presented today?', 
      isActive: true, 
      options: [
        { id: 'o1', text: 'Highly Relevant', votes: 45 },
        { id: 'o2', text: 'Moderately Relevant', votes: 12 },
        { id: 'o3', text: 'Needs more context', votes: 5 }
      ]
    }
  ]);

  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  
  const [filterState, setFilterState] = useState<FilterState>({
    searchQuery: '',
    specialty: null,
    status: 'upcoming',
    priceRange: [0, 20000],
    location: ''
  });

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.pageYOffset;
      setScrollProgress((currentScroll / totalScroll) * 100);
      setShowBackToTop(currentScroll > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    localStorage.setItem('lang', lang);
  }, [lang]);

  useEffect(() => {
    localStorage.setItem('theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const t = (key: keyof typeof translations.en) => (translations[lang] as any)[key] || key;

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const searchLower = filterState.searchQuery.toLowerCase();
      const matchesSearch = !filterState.searchQuery || 
        event.title.toLowerCase().includes(searchLower) ||
        event.theme.toLowerCase().includes(searchLower) ||
        event.location.toLowerCase().includes(searchLower) ||
        event.description.toLowerCase().includes(searchLower);

      const matchesSpecialty = !filterState.specialty || event.theme === filterState.specialty;
      const matchesLocation = !filterState.location || event.location.toLowerCase().includes(filterState.location.toLowerCase());
      
      const priceNum = parseInt(event.price.replace(/[^0-9]/g, ''));
      const matchesPrice = priceNum >= filterState.priceRange[0] && priceNum <= filterState.priceRange[1];

      return matchesSearch && matchesSpecialty && matchesLocation && matchesPrice;
    });
  }, [filterState, events]);

  const handleSearch = (query: string) => {
    setFilterState(prev => ({ 
      ...prev, 
      searchQuery: query, 
      specialty: null
    }));
  };

  const handleSpecialtySelect = (specialty: string) => {
    setFilterState(prev => ({
      ...prev,
      searchQuery: '',
      specialty,
      status: 'upcoming'
    }));
  };

  const handleClearFilters = () => {
    setFilterState({
      searchQuery: '',
      specialty: null,
      status: 'upcoming',
      priceRange: [0, 20000],
      location: ''
    });
    setSelectedEvent(null);
    setView('home');
  };

  const addWorkshop = (eventId: string, workshop: Omit<Workshop, 'id' | 'enrolled'>) => {
    setEvents(prev => prev.map(ev => {
      if (ev.id === eventId) {
        return {
          ...ev,
          workshops: [
            ...ev.workshops,
            { ...workshop, id: Math.random().toString(36).substr(2, 9), enrolled: 0, resources: [] }
          ]
        };
      }
      return ev;
    }));
    setNotifications(prev => [{
      id: Math.random().toString(),
      title: 'Workshop Added',
      message: `A new workshop "${workshop.title}" has been added to the event.`,
      time: 'Just now',
      read: false,
      type: 'success'
    }, ...prev]);
  };

  const registerForEvent = (id: string, details?: { name: string, phone: string, payment: PaymentMethod }) => {
    if (!user) {
      setAuthIntent('register_event');
      setView('auth');
      return;
    }
    
    if (!details) {
      const event = events.find(e => e.id === id);
      if (event) setSelectedEvent(event);
      return;
    }

    if (!registeredEventIds.includes(id)) {
      setRegisteredEventIds(prev => [...prev, id]);
      setNotifications(prev => [{
        id: Math.random().toString(),
        title: 'Registration Successful',
        message: `Successfully registered for event using ${details.payment} payment.`,
        time: 'Just now',
        read: false,
        type: 'success'
      }, ...prev]);
    }
  };

  const enrollInWorkshop = (id: string) => {
    if (!user) {
      setAuthIntent('register_event');
      setView('auth');
      return;
    }
    if (!registeredWorkshopIds.includes(id)) {
      setRegisteredWorkshopIds(prev => [...prev, id]);
      setNotifications(prev => [{
        id: Math.random().toString(),
        title: 'Workshop Enrollment',
        message: 'Successfully enrolled in workshop.',
        time: 'Just now',
        read: false,
        type: 'success'
      }, ...prev]);
    }
  };

  const addSubmission = (eventId: string, title: string, type: CommunicationType, keywords: string) => {
    const event = events.find(e => e.id === eventId);
    const newSubmission: Submission = {
      id: Math.random().toString(36).substr(2, 9),
      eventId,
      eventTitle: event?.title || 'Unknown Event',
      authorName: user?.name || 'Anonymous',
      title,
      type,
      keywords,
      status: 'Pending',
      date: new Date().toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'en-US', { day: 'numeric', month: 'short', year: 'numeric' })
    };
    setSubmissions(prev => [newSubmission, ...prev]);
    setNotifications(prev => [{
      id: Math.random().toString(),
      title: 'Submission Received',
      message: `Your abstract "${title}" has been received for review.`,
      time: 'Just now',
      read: false,
      type: 'info'
    }, ...prev]);
  };

  const withdrawSubmission = (id: string) => {
    setSubmissions(prev => prev.filter(s => s.id !== id));
    setNotifications(prev => [{
      id: Math.random().toString(),
      title: 'Submission Withdrawn',
      message: 'Submission removed successfully.',
      time: 'Just now',
      read: false,
      type: 'alert'
    }, ...prev]);
  };

  const updateSubmissionStatus = (subId: string, status: Submission['status'], notes?: string) => {
    setSubmissions(prev => prev.map(s => s.id === subId ? { ...s, status, reviewNotes: notes } : s));
    setNotifications(prev => [{
      id: Math.random().toString(),
      title: 'Submission Updated',
      message: `A submission status was updated to ${status}.`,
      time: 'Just now',
      read: false,
      type: 'success'
    }, ...prev]);
  };

  const addQuestion = (sessionId: string, content: string) => {
    if (!user) return;
    const newQuestion: Question = {
      id: Math.random().toString(36).substr(2, 9),
      sessionId,
      content,
      authorName: user.name,
      votes: 0,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setQuestions(prev => [newQuestion, ...prev]);
  };

  const voteQuestion = (id: string) => {
    setQuestions(prev => prev.map(q => q.id === id ? { ...q, votes: q.isLiked ? q.votes - 1 : q.votes + 1, isLiked: !q.isLiked } : q));
  };

  const submitPollVote = (pollId: string, optionId: string) => {
    setPolls(prev => prev.map(p => {
      if (p.id === pollId) {
        return {
          ...p,
          options: p.options.map(o => o.id === optionId ? { ...o, votes: o.votes + 1 } : o)
        };
      }
      return p;
    }));
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  const sendMessage = (conversationId: string, content: string) => {
    if (!user) return;
    const newMessage: Message = {
      id: Math.random().toString(36).substr(2, 9),
      conversationId,
      senderId: user.id,
      senderName: user.name,
      senderRole: user.role,
      content,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isRead: false,
    };
    setMessages(prev => [...prev, newMessage]);
    setConversations(prev => prev.map(conv => 
      conv.id === conversationId ? { ...conv, lastMessage: content, updatedAt: new Date().toISOString() } : conv
    ));
  };

  const startNewConversation = (recipient: { id: string, name: string, role: Role, photo?: string }) => {
    if (!user) return '';
    const existing = conversations.find(c => c.participants.some(p => p.id === recipient.id));
    if (existing) return existing.id;

    const newId = Math.random().toString(36).substr(2, 9);
    const newConv: Conversation = {
      id: newId,
      participants: [
        { id: user.id, name: user.name, role: user.role, photo: user.profile.photo },
        { id: recipient.id, name: recipient.name, role: recipient.role, photo: recipient.photo }
      ],
      updatedAt: new Date().toISOString(),
    };
    setConversations(prev => [newConv, ...prev]);
    return newId;
  };

  const loginUser = (userData: User) => {
    setUser(userData);
    setAuthIntent(null);
    setConversations([
      {
        id: 'c-demo-1',
        participants: [
          { id: userData.id, name: userData.name, role: userData.role, photo: userData.profile.photo },
          { id: 'o-1', name: 'MedSymposium Support', role: 'Organizer', photo: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=200' }
        ],
        lastMessage: 'Welcome to the platform! Let us know if you need help.',
        updatedAt: new Date().toISOString()
      }
    ]);
    setMessages([
      {
        id: 'm-demo-1',
        conversationId: 'c-demo-1',
        senderId: 'o-1',
        senderName: 'MedSymposium Support',
        senderRole: 'Organizer',
        content: 'Welcome to the platform! Let us know if you need help.',
        timestamp: '10:00 AM',
        isRead: false
      }
    ]);

    if (userData.role === 'Organizer') {
      setView('organizer-dash');
    } else {
      setView('dashboard');
    }
  };

  const logoutUser = () => {
    setUser(null);
    setConversations([]);
    setMessages([]);
    setView('home');
  };

  const updateProfile = (newProfile: UserProfile) => {
    if (user) {
      setUser({ ...user, profile: newProfile });
    }
  };

  const updateRole = (newRole: Role) => {
    if (user) {
      setUser({ ...user, role: newRole });
    }
  };

  const renderContent = () => {
    switch (currentView) {
      case 'auth': return <AuthView />;
      case 'profile': return <ProfileView />;
      case 'dashboard': return <DashboardView />;
      case 'organizer-dash': return <OrganizerDashboard />;
      case 'create-event': return <EventCreationView />;
      case 'manage-submissions': return <SubmissionManagementView />;
      case 'review-submission': return <ReviewerEvaluationView />;
      case 'program-editor': return <ProgramEditorView />;
      case 'reports': return <ReportsView />;
      case 'messaging': return <MessagingView />;
      case 'directory': return (
        <AllEventsView 
          events={filteredEvents}
          filterState={filterState}
          onSearch={(q) => setFilterState(prev => ({ ...prev, searchQuery: q }))}
        />
      );
      case 'about': return <AboutView />;
      case 'contact': return <ContactView />;
      case 'home':
      default: return (
        <div className="animate-in fade-in duration-700">
          <Hero onSearch={handleSearch} />
          {!user && <SpecialtySection onSpecialtySelect={handleSpecialtySelect} />}
          <EventSection 
            events={filteredEvents.filter(e => !e.isArchived)} 
            filterState={filterState}
            onClearSearch={handleClearFilters}
            showSeeMore={filteredEvents.filter(e => !e.isArchived).length > 3}
          />
          {!user && (
            <>
              <CFPSection />
              <ImpactSection />
            </>
          )}
        </div>
      );
    }
  };

  return (
    <AppContext.Provider value={{ 
      lang, setLang, theme, setTheme, t, resetFilters: handleClearFilters,
      selectedEvent, setSelectedEvent, currentView, setView, authIntent, setAuthIntent,
      user, loginUser, logoutUser, updateProfile, updateRole,
      events, addWorkshop,
      registeredEventIds, registerForEvent, registeredWorkshopIds, enrollInWorkshop,
      submissions, addSubmission, withdrawSubmission, updateSubmissionStatus, 
      notifications, markNotificationRead, clearNotifications,
      messages, conversations, sendMessage, startNewConversation,
      questions, addQuestion, voteQuestion, polls, submitPollVote,
      filterState, setFilterState
    }}>
      <div className={`min-h-screen transition-colors duration-500 bg-slate-50 dark:bg-[#001428]`}>
        <div className="fixed top-0 left-0 h-[3px] bg-sky-500 z-[100] transition-all duration-150" style={{ width: `${scrollProgress}%` }} />
        {currentView !== 'auth' && <Header />}
        <main className="pt-0">{renderContent()}</main>
        {currentView !== 'auth' && <Footer />}
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className={`fixed bottom-10 right-10 z-50 p-4 rounded-full bg-white dark:bg-[#001E3C] shadow-2xl border border-slate-200 dark:border-white/10 text-sky-500 transition-all duration-500 ${showBackToTop && currentView !== 'auth' ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'} hover:bg-sky-500 hover:text-white group`}
        >
          <ChevronUp size={24} className="group-hover:-translate-y-1 transition-transform" />
        </button>
        {selectedEvent && <EventDetailsModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />}
      </div>
    </AppContext.Provider>
  );
};

export default App;
