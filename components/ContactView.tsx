
import React, { useState } from 'react';
import { Mail, MapPin, Phone, Send, CheckCircle, HelpCircle, ChevronDown, Clock, Globe } from 'lucide-react';
import { useApp } from '../App';

const ContactView: React.FC = () => {
  const { t } = useApp();
  const [isSent, setIsSent] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSent(true);
    setTimeout(() => setIsSent(false), 5000);
  };

  const faqs = [
    { q: t('faq1Q'), a: t('faq1A') },
    { q: t('faq2Q'), a: t('faq2A') },
    { q: t('faq3Q'), a: t('faq3A') },
  ];

  return (
    <div className="bg-slate-50 dark:bg-[#001428] transition-colors duration-500 overflow-x-hidden pt-20">
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 z-0"
          style={{ 
            backgroundImage: 'url("https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&q=80&w=2400")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.3)'
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#001428]/20 via-[#001428]/60 to-[#001428] z-10"></div>
        
        <div className="relative z-20 text-center px-6 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sky-400 font-black text-[10px] uppercase tracking-[0.4em] mb-8 animate-in fade-in slide-in-from-top-12 duration-1000">
            <Mail size={14} />
            {t('contactUs')}
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter italic mb-8 leading-[0.9] animate-in fade-in slide-in-from-bottom-12 duration-1000">
            {t('getInTouch')}
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-xl font-medium leading-relaxed animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-200">
            {t('contactSub')}
          </p>
        </div>
      </section>

      <section className="py-24 px-6 relative z-30 -mt-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Contact Info Sidebar */}
            <div className="space-y-8">
              <div className="bg-white dark:bg-[#001E3C] rounded-[3rem] p-10 border border-slate-200 dark:border-white/5 shadow-2xl space-y-10">
                <div className="flex items-start gap-6 group">
                  <div className="p-4 bg-sky-500/10 rounded-2xl text-sky-500 group-hover:bg-sky-500 group-hover:text-white transition-all">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1">{t('email')}</h4>
                    <p className="text-[#001E3C] dark:text-white font-black text-sm">support@medsymposium.dz</p>
                    <p className="text-slate-500 text-xs font-medium">response@medsymposium.dz</p>
                  </div>
                </div>

                <div className="flex items-start gap-6 group">
                  <div className="p-4 bg-sky-500/10 rounded-2xl text-sky-500 group-hover:bg-sky-500 group-hover:text-white transition-all">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1">{t('phone')}</h4>
                    <p className="text-[#001E3C] dark:text-white font-black text-sm">+213 (0) 23 45 67 89</p>
                    <p className="text-slate-500 text-xs font-medium">+213 (0) 23 45 67 90</p>
                  </div>
                </div>

                <div className="flex items-start gap-6 group">
                  <div className="p-4 bg-sky-500/10 rounded-2xl text-sky-500 group-hover:bg-sky-500 group-hover:text-white transition-all">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1">{t('location')}</h4>
                    <p className="text-[#001E3C] dark:text-white font-black text-sm">Sidi Abdellah IT Park</p>
                    <p className="text-slate-500 text-xs font-medium">Algiers, Algeria 16000</p>
                  </div>
                </div>

                <div className="flex items-start gap-6 group">
                  <div className="p-4 bg-sky-500/10 rounded-2xl text-sky-500 group-hover:bg-sky-500 group-hover:text-white transition-all">
                    <Clock size={24} />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1">{t('officeHours')}</h4>
                    <p className="text-[#001E3C] dark:text-white font-black text-sm">{t('officeHoursDesc')}</p>
                    <p className="text-slate-500 text-xs font-medium">GMT +1:00</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white dark:bg-[#001E3C] rounded-[3rem] p-10 md:p-16 border border-slate-200 dark:border-white/5 shadow-2xl relative overflow-hidden">
                {isSent ? (
                  <div className="py-20 text-center animate-in zoom-in-95 duration-500">
                    <div className="w-20 h-20 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto mb-8">
                      <CheckCircle size={40} />
                    </div>
                    <h3 className="text-3xl font-black text-[#001E3C] dark:text-white italic mb-4">{t('saved')}</h3>
                    <p className="text-slate-500 font-medium">{t('messageSent')}</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-4">{t('fullName')}</label>
                        <input 
                          type="text" 
                          required
                          className="w-full bg-slate-50 dark:bg-[#001428] border border-slate-200 dark:border-white/10 rounded-2xl py-5 px-6 font-bold text-[#001E3C] dark:text-white focus:outline-none focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 transition-all"
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-4">{t('email')}</label>
                        <input 
                          type="email" 
                          required
                          className="w-full bg-slate-50 dark:bg-[#001428] border border-slate-200 dark:border-white/10 rounded-2xl py-5 px-6 font-bold text-[#001E3C] dark:text-white focus:outline-none focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 transition-all"
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-4">{t('subject')}</label>
                      <input 
                        type="text" 
                        required
                        className="w-full bg-slate-50 dark:bg-[#001428] border border-slate-200 dark:border-white/10 rounded-2xl py-5 px-6 font-bold text-[#001E3C] dark:text-white focus:outline-none focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 transition-all"
                      />
                    </div>

                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-4">{t('message')}</label>
                      <textarea 
                        rows={6}
                        required
                        className="w-full bg-slate-50 dark:bg-[#001428] border border-slate-200 dark:border-white/10 rounded-3xl py-7 px-6 font-bold text-[#001E3C] dark:text-white focus:outline-none focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 transition-all resize-none"
                      />
                    </div>

                    <button 
                      type="submit"
                      className="group flex items-center justify-center gap-4 w-full md:w-auto px-12 py-6 bg-sky-500 hover:bg-sky-400 text-white rounded-[2rem] font-black text-lg uppercase tracking-widest shadow-2xl shadow-sky-500/20 transition-all active:scale-95"
                    >
                      <Send size={24} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      {t('sendMessage')}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-32 px-6 bg-white dark:bg-[#001428]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-20 space-y-4">
            <div className="inline-flex items-center gap-2 text-sky-500 font-black text-[10px] uppercase tracking-[0.4em]">
              <HelpCircle size={14} />
              FAQ
            </div>
            <h2 className="text-4xl font-black text-[#001E3C] dark:text-white italic tracking-tighter">{t('faqTitle')}</h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div 
                key={i} 
                className="bg-slate-50 dark:bg-[#001E3C] rounded-3xl border border-slate-200 dark:border-white/5 overflow-hidden transition-all duration-300"
              >
                <button 
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-8 text-left transition-colors hover:bg-slate-100 dark:hover:bg-white/5"
                >
                  <span className="font-black text-[#001E3C] dark:text-white text-lg italic">{faq.q}</span>
                  <ChevronDown className={`text-slate-400 transition-transform duration-500 ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                <div 
                  className={`px-8 transition-all duration-500 ease-in-out ${openFaq === i ? 'max-h-96 pb-8 opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactView;
