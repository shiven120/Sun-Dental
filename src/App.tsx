/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Heart, 
  ShieldCheck, 
  UserRound, 
  Stethoscope, 
  Calendar, 
  Phone, 
  MapPin, 
  Star, 
  Plus, 
  Minus, 
  CheckCircle2, 
  ExternalLink,
  Menu,
  X,
  Smile,
  Shield,
  Clock,
  Sparkles,
  Search,
  ChevronRight,
  Trash2,
  CalendarDays
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

import { useTina } from 'tinacms/dist/react';
import { client } from '../tina/__generated__/client';
import homepageStaticData from '../content/homepage.json';

const doctorScrubsImg = 'https://images.unsplash.com/photo-1579684389782-64d84b5e901d?auto=format&fit=crop&q=80&w=800';
const doctorAwardImg = 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=800';

const iconMap: Record<string, React.ReactNode> = {
  Heart: <Heart className="w-6 h-6" />,
  ShieldCheck: <ShieldCheck className="w-6 h-6" />,
  UserRound: <UserRound className="w-6 h-6" />,
  Stethoscope: <Stethoscope className="w-6 h-6" />,
  Plus: <Plus className="w-6 h-6" />,
  Minus: <Minus className="w-6 h-6" />,
  Smile: <Smile className="w-6 h-6" />,
  Shield: <Shield className="w-6 h-6" />,
  Clock: <Clock className="w-6 h-6" />,
  Sparkles: <Sparkles className="w-6 h-6" />,
};

const getIcon = (iconName: string) => {
  return iconMap[iconName] || <Smile className="w-6 h-6" />;
};

function useHomepageContent() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const isDev = import.meta.env.DEV || window.location.search.includes('preview=true');
    if (isDev) {
      client.queries.homepage({ relativePath: 'homepage.json' })
        .then((res) => {
          setData(res);
        })
        .catch((err) => {
          console.warn("Failed to fetch live content, using static fallback", err);
          setData({ data: { homepage: homepageStaticData } });
        });
    } else {
      setData({ data: { homepage: homepageStaticData } });
    }
  }, []);

  const tinaResult = useTina({
    query: data?.query || `query { homepage(relativePath: "homepage.json") { id } }`,
    variables: data?.variables || {},
    data: data?.data || { homepage: homepageStaticData },
  });

  return tinaResult.data?.homepage || homepageStaticData;
}

const INITIAL_REVIEWS = [
  {
    name: "Rahul Gupta",
    rating: 5,
    text: "Truly a painless procedure! I was terrified of root canals, but the knowledgeable approach of Dr. Ranjan made it feel like a breeze.",
    date: "2 weeks ago"
  },
  {
    name: "Saloni Mittal",
    rating: 5,
    text: "The most hygienic clinic I have ever visited. Dr. Ranjan and the staff are professional and the results of my clear aligners are amazing.",
    date: "1 month ago"
  },
  {
    name: "Ananya Iyer",
    rating: 5,
    text: "A great family dentist. Dr. Ranjan is wonderful with my kids and always takes the time to explain everything clearly.",
    date: "3 weeks ago"
  }
];

const FAQS = [
  {
    q: "What are the signs that I might need a root canal?",
    a: "Signs include persistent pain, sensitivity to hot and cold, tooth discoloration, swollen gums, or pain when chewing. Dr. Ranjan uses advanced diagnostics to confirm if a root canal is the best path to save your natural tooth."
  },
  {
    q: "What safety measures are in place at Sun Dental Clinic?",
    a: "We prioritize a sterile environment with medical-grade autoclaving, disposable instruments whenever possible, and advanced air filtration systems to ensure a 99.9% sterile clinical space."
  },
  {
    q: "What is the process for getting dental implants at Sun Dental Clinic?",
    a: "Our process is digitally guided: starting with 3D scanning and planning, followed by precise, painless implant placement, and concluding with a custom-crafted porcelain crown that matches your natural teeth perfectly."
  },
  {
    q: "How do you ensure a painless experience?",
    a: "We use ultra-fine needles, the latest local anesthesia, and gentle manual techniques. We prioritize painless treatment using clinical skill gained through education and professional practice."
  },
  {
    q: "Can I get invisible aligners or braces?",
    a: "Absolutely. We specialize in orthodontic transformations using clear aligners (including Invisalign) and custom braces, ensuring optimal alignment and dental health."
  },
  {
    q: "How often should I visit the dentist for a check-up?",
    a: "We recommend a comprehensive check-up and professional prophylaxis every six months. Regular visits are key to preventing complex issues and maintaining long-term oral hygiene."
  },
  {
    q: "What should I expect during my first visit?",
    a: "Expect a thorough consultation: digital exams, a comprehensive oral health audit, and a detailed discussion with Dr. Ashish Ranjan regarding your goals and a personalized treatment roadmap."
  },
  {
    q: "How do I cancel or reschedule my appointment?",
    a: "We value your time. You can reschedule by calling our clinic number (+91 98118 28767) at least 24 hours in advance. This allows us to offer the slot to patients requiring urgent dental care."
  }
];

const TIME_SLOTS = [
  '10:00 AM',
  '11:00 AM',
  '11:30 AM',
  '12:30 PM',
  '02:00 PM',
  '03:30 PM',
  '04:30 PM',
  '05:30 PM',
  '06:30 PM'
];

const getNext7Days = () => {
  const days = [];
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  for (let i = 1; i <= 7; i++) {
    const d = new Date();
    d.setDate(d.getDate() + i);
    days.push({
      dateStr: d.toISOString().split('T')[0],
      dayName: dayNames[d.getDay()],
      dayNum: d.getDate(),
      month: monthNames[d.getMonth()],
      fullDateStr: `${dayNames[d.getDay()]}, ${d.getDate()} ${monthNames[d.getMonth()]}`
    });
  }
  return days;
};

// --- Components ---

interface NavbarProps {
  onBookClick: () => void;
  onMyAppointmentsClick: () => void;
  bookingCount: number;
}

const Navbar: React.FC<NavbarProps> = ({ onBookClick, onMyAppointmentsClick, bookingCount }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      id="navbar"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-8'
      }`}
    >
      <div className="max-w-7xl mx-auto px-8 md:px-16 flex items-center justify-between">
        <div className="flex flex-col cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <span className="text-[10px] tracking-[0.3em] font-bold text-brand-primary uppercase leading-tight">Dental Excellence</span>
          <span className="text-2xl font-serif tracking-tight font-light leading-none mt-1 text-brand-dark">Sun Dental.</span>
        </div>

        <div className="hidden md:flex items-center gap-12 text-[10px] uppercase tracking-[0.2em] font-semibold text-brand-dark/50">
          <a href="#doctor" className="hover:text-brand-dark transition-colors">The Doctor</a>
          <a href="#services" className="hover:text-brand-dark transition-colors">Signature Services</a>
          <a href="#reviews" className="hover:text-brand-dark transition-colors">Patient Stories</a>
          <a href="#faq" className="hover:text-brand-dark transition-colors">Inquiries</a>
        </div>

        <div className="hidden md:flex items-center gap-6">
          {bookingCount > 0 && (
            <button 
              onClick={onMyAppointmentsClick}
              className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-bold text-brand-primary hover:text-brand-dark transition-colors border border-brand-primary/20 px-4 py-2 bg-brand-beige/30"
            >
              <Calendar size={14} />
              My Bookings ({bookingCount})
            </button>
          )}
          <button 
            onClick={onBookClick}
            className="px-8 py-3 bg-brand-dark text-white text-[10px] tracking-[0.2em] uppercase hover:bg-brand-primary transition-colors"
          >
            Book Consult
          </button>
        </div>

        <div className="flex items-center gap-4 md:hidden">
          {bookingCount > 0 && (
            <button 
              onClick={onMyAppointmentsClick}
              className="relative p-2 text-brand-dark hover:text-brand-primary"
            >
              <Calendar size={20} />
              <span className="absolute -top-1 -right-1 bg-brand-primary text-white text-[8px] rounded-full w-4 h-4 flex items-center justify-center font-bold">
                {bookingCount}
              </span>
            </button>
          )}
          <button className="text-brand-dark" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-brand-bg border-t border-brand-border overflow-hidden shadow-xl"
          >
            <div className="flex flex-col p-8 gap-6 text-[10px] uppercase tracking-widest font-semibold">
              <a href="#doctor" className="hover:text-brand-primary" onClick={() => setMobileMenuOpen(false)}>The Doctor</a>
              <a href="#services" className="hover:text-brand-primary" onClick={() => setMobileMenuOpen(false)}>Signature Services</a>
              <a href="#reviews" className="hover:text-brand-primary" onClick={() => setMobileMenuOpen(false)}>Patient Stories</a>
              <a href="#faq" className="hover:text-brand-primary" onClick={() => setMobileMenuOpen(false)}>Inquiries</a>
              {bookingCount > 0 && (
                <button 
                  onClick={() => { setMobileMenuOpen(false); onMyAppointmentsClick(); }}
                  className="border border-brand-primary text-brand-dark p-4 uppercase tracking-[0.2em] font-bold text-center"
                >
                  My Bookings ({bookingCount})
                </button>
              )}
              <button 
                onClick={() => { setMobileMenuOpen(false); onBookClick(); }}
                className="bg-brand-dark text-white p-4 uppercase tracking-[0.2em] font-bold"
              >
                Book Consult
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

interface HeroProps {
  onBookClick: () => void;
  onGalleryClick: (imgSrc: string, caption: string) => void;
  content: any;
}

const Hero: React.FC<HeroProps> = ({ onBookClick, onGalleryClick, content }) => {
  const headlineWords = (content.hero?.headline || '').split(' ');
  const firstPart = headlineWords.slice(0, -1).join(' ');
  const lastPart = headlineWords[headlineWords.length - 1] || '';
  const experienceMatch = content.about?.profileDescription?.match(/(\d+)\s+years/i);
  const yearsOfExperience = experienceMatch ? `${experienceMatch[1]} Years` : "9 Years";

  return (
    <section id="doctor" className="relative pt-32 pb-16 md:pt-48 md:pb-24 overflow-hidden">
      {/* Artistic Background Decor */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-brand-beige -z-10 hidden md:block"></div>
      <div className="absolute top-1/2 left-[40%] w-[1px] h-32 bg-brand-primary/50 hidden md:block"></div>

      <div className="max-w-7xl mx-auto px-8 md:px-16">
        <div className="grid md:grid-cols-12 gap-12 items-center">
          <motion.div 
            className="md:col-span-7"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-[10px] tracking-[0.3em] font-bold text-brand-primary uppercase mb-6 block">
              {content.hero?.subheadline}
            </span>
            <h1 className="text-6xl md:text-8xl font-serif leading-[0.9] text-brand-dark mb-8">
              {firstPart} <br/>
              <span className="italic text-brand-primary">{lastPart}</span>
            </h1>
            <div className="space-y-6 max-w-xl">
              <p className="text-sm text-gray-500 leading-relaxed font-light font-sans">
                {content.about?.profileDescription}
              </p>

              <div className="my-6 p-4 border-l-2 border-brand-primary bg-brand-beige/50 italic text-xs text-brand-dark/80 font-sans leading-relaxed">
                "{content.about?.mottoQuote}"
              </div>
              
              <div className="artistic-border border-l-2 border-brand-primary/20 pl-6 space-y-4">
                <div className="flex items-start gap-4">
                  <span className="text-[10px] font-mono text-brand-primary mt-1">EDU</span>
                  <p className="text-xs text-gray-500 leading-relaxed font-sans">
                    {content.about?.education?.map((edu: any, idx: number) => (
                      <React.Fragment key={idx}>
                        <span className="text-brand-dark font-bold">{edu.degree}</span> — {edu.institution}<br/>
                      </React.Fragment>
                    ))}
                  </p>
                </div>
                <div className="flex items-start gap-4">
                  <span className="text-[10px] font-mono text-brand-primary mt-1">MBR</span>
                  <p className="text-[9px] text-gray-400 leading-relaxed uppercase tracking-widest font-mono">
                    {content.about?.memberships}
                  </p>
                </div>
                <div className="flex items-center gap-4 pt-4 border-t border-brand-border/40">
                  <span className="text-[10px] font-mono text-brand-primary">VIEW</span>
                  <div className="flex gap-2">
                    <div 
                      onClick={() => onGalleryClick(doctorScrubsImg, `${content.hero?.headline} - Clinical Portrait`)}
                      className="w-16 h-12 border border-brand-border hover:border-brand-primary cursor-pointer overflow-hidden transition-all relative group shrink-0"
                      title="Clinical Scrubs Portrait"
                    >
                      <img src={doctorScrubsImg} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" alt="Clinical Scrub Portrait" />
                      <div className="absolute inset-0 bg-brand-dark/20 group-hover:bg-transparent transition-all" />
                    </div>
                    <div 
                      onClick={() => onGalleryClick(doctorAwardImg, "Sun Dental Clinic - Modern Treatment Room & Operatory")}
                      className="w-16 h-12 border border-brand-border hover:border-brand-primary cursor-pointer overflow-hidden transition-all relative group shrink-0"
                      title="Sun Dental Clinic Room"
                    >
                      <img src={doctorAwardImg} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" alt="Clinic Room" />
                      <div className="absolute inset-0 bg-brand-dark/20 group-hover:bg-transparent transition-all" />
                    </div>
                  </div>
                  <span className="text-[9px] text-gray-400 font-sans tracking-wide leading-tight font-light shrink-0">Click to view credentials & clinic</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-8 border-t border-brand-border pt-10 mt-10">
              <div className="flex items-center gap-4">
                 <div className="w-10 h-10 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary">
                    <Sparkles size={20} />
                 </div>
                 <div>
                    <p className="text-[10px] uppercase font-bold tracking-widest text-brand-dark leading-none text-nowrap">Orthodontics & Aligners</p>
                    <p className="text-[9px] uppercase tracking-widest text-gray-400 mt-1">Invisalign & Clear Aligners</p>
                 </div>
              </div>
              <div className="flex items-center gap-4">
                 <div className="w-10 h-10 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary">
                    <Shield size={20} />
                 </div>
                 <div>
                    <p className="text-[10px] uppercase font-bold tracking-widest text-brand-dark leading-none text-nowrap">MBA Dentist</p>
                    <p className="text-[9px] uppercase tracking-widest text-gray-400 mt-1 font-sans">Healthcare Management</p>
                 </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="md:col-span-5 flex justify-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <div className="relative group w-full max-w-md">
              <div className="aspect-[3/4] bg-brand-hover overflow-hidden artistic-border border">
                 <img 
                   src={content.hero?.image} 
                   className="w-full h-full object-cover brightness-105 transition-all duration-700 hover:scale-105 cursor-zoom-in" 
                   alt={content.hero?.headline}
                   onClick={() => onGalleryClick(content.hero?.image, `${content.hero?.headline} - Experienced Dentist in Sun Dental Clinic Rohini`)}
                   referrerPolicy="no-referrer"
                 />
              </div>
              <div className="absolute -bottom-10 -right-10 bg-brand-dark p-8 text-white hidden md:block border-l-4 border-brand-primary shadow-2xl">
                 <span className="text-[10px] uppercase tracking-[0.3em] font-bold block mb-2">Practice</span>
                 <span className="text-4xl font-serif">{yearsOfExperience}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const MarqueeStats = () => (
  <div className="bg-brand-dark py-12 overflow-hidden border-y border-brand-primary/20">
    <div className="scroller">
      <div className="scroller-inner flex items-center gap-24 md:gap-40">
        {[1, 2].map(id => (
          <React.Fragment key={id}>
            <div className="flex flex-col text-white">
              <span className="text-[10px] uppercase tracking-[0.4em] text-brand-primary font-bold mb-1">Impact</span>
              <span className="text-4xl font-serif tracking-tighter">9 Years Experience</span>
            </div>
            <div className="flex flex-col text-white">
              <span className="text-[10px] uppercase tracking-[0.4em] text-brand-primary font-bold mb-1">Clinic</span>
              <span className="text-4xl font-serif tracking-tighter">Sun Dental Clinic</span>
            </div>
            <div className="flex flex-col text-white">
              <span className="text-[10px] uppercase tracking-[0.4em] text-brand-primary font-bold mb-1">Quality</span>
              <span className="text-4xl font-serif tracking-tighter">99.9% Sterile</span>
            </div>
            <div className="flex flex-col text-white">
              <span className="text-[10px] uppercase tracking-[0.4em] text-brand-primary font-bold mb-1">Comfort</span>
              <span className="text-4xl font-serif tracking-tighter">100% Painless</span>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  </div>
);

interface ServiceProps {
  service: {
    id: string;
    title: string;
    description: string;
    icon: React.ReactNode;
  };
  onExplore: (service: any) => void;
}

const ServiceCard: React.FC<ServiceProps> = ({ service, onExplore }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    onClick={() => onExplore(service)}
    className="bg-white p-10 artistic-border border hover:border-brand-primary transition-all group cursor-pointer flex flex-col justify-between"
    id={`service-${service.id}`}
  >
    <div>
      <div className="text-brand-primary mb-6 transition-transform group-hover:scale-110 duration-500">
        {service.icon}
      </div>
      <h3 className="text-2xl font-serif mb-4 text-brand-dark">{service.title}</h3>
      <p className="text-xs text-gray-500 leading-relaxed mb-8 uppercase tracking-wide font-sans">
        {service.description}
      </p>
    </div>
    <button 
      onClick={(e) => { e.stopPropagation(); onExplore(service); }}
      className="inline-flex items-center gap-3 text-brand-primary font-bold text-[10px] uppercase tracking-[0.2em] group/link border-none bg-transparent cursor-pointer self-start"
    >
      Explore Details <ChevronRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
    </button>
  </motion.div>
);

interface FAQProps {
  faq: {
    q: string;
    a: string;
  };
}

const FAQItem: React.FC<FAQProps> = ({ faq }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-brand-border py-4">
      <button 
        className="w-full flex items-center justify-between text-left py-6 focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-lg font-serif italic text-brand-dark tracking-tight">{faq.q}</span>
        <div className={`transition-transform duration-500 ${isOpen ? 'rotate-180' : ''}`}>
          {isOpen ? <Minus size={16} className="text-brand-primary" /> : <Plus size={16} className="text-brand-primary" />}
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="text-sm text-gray-500 pb-8 pr-12 leading-relaxed font-light font-sans">
              {faq.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- Custom New Modals/Drawers ---

interface ServiceDrawerProps {
  service: any | null;
  onClose: () => void;
  onBookNow: (serviceId: string) => void;
}

const ServiceDrawer: React.FC<ServiceDrawerProps> = ({ service, onClose, onBookNow }) => (
  <AnimatePresence>
    {service && (
      <>
        {/* Backdrop overlay */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-brand-dark/60 backdrop-blur-sm z-50"
        />
        {/* Drawer container */}
        <motion.div 
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed top-0 right-0 h-full w-full max-w-lg bg-brand-bg shadow-2xl z-50 overflow-y-auto border-l border-brand-border"
        >
          <div className="p-8 md:p-12 h-full flex flex-col justify-between">
            <div>
              {/* Header */}
              <div className="flex justify-between items-start mb-8">
                <div className="flex items-center gap-4 text-brand-primary">
                  <div className="w-12 h-12 rounded-full bg-brand-primary/10 flex items-center justify-center">
                    {service.icon}
                  </div>
                  <span className="text-[10px] uppercase font-mono tracking-widest font-bold">Premium Specialty</span>
                </div>
                <button onClick={onClose} className="p-2 hover:bg-brand-hover text-brand-dark transition-colors rounded-full">
                  <X size={20} />
                </button>
              </div>

              {/* Title & Description */}
              <h2 className="text-4xl font-serif text-brand-dark mb-4 leading-tight">{service.title}</h2>
              <p className="text-sm text-gray-500 font-light leading-relaxed mb-8 font-sans">
                {service.description}
              </p>

              {/* Treatment Quick Stats Grid */}
              <div className="grid grid-cols-3 gap-4 mb-8 border-y border-brand-border py-6">
                <div className="text-center">
                  <p className="text-[8px] uppercase tracking-widest text-gray-400 font-bold font-sans">Avg Duration</p>
                  <p className="text-sm font-serif italic text-brand-dark mt-1 font-semibold">{service.duration || 'N/A'}</p>
                </div>
                <div className="text-center border-x border-brand-border">
                  <p className="text-[8px] uppercase tracking-widest text-gray-400 font-bold font-sans">Recovery Time</p>
                  <p className="text-sm font-serif italic text-brand-dark mt-1 font-semibold">{service.recovery || 'N/A'}</p>
                </div>
                <div className="text-center">
                  <p className="text-[8px] uppercase tracking-widest text-gray-400 font-bold font-sans">Est. Cost Range</p>
                  <p className="text-sm font-serif italic text-brand-dark mt-1 font-semibold">{service.cost || 'N/A'}</p>
                </div>
              </div>

              {/* Benefits Section */}
              <h4 className="text-xs uppercase tracking-[0.2em] font-bold text-brand-dark mb-4 font-mono">Key Patient Benefits</h4>
              <ul className="space-y-4">
                {service.benefits?.map((benefit: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-4">
                    <CheckCircle2 size={16} className="text-brand-primary mt-0.5 shrink-0" />
                    <p className="text-xs text-gray-600 leading-relaxed font-sans">{benefit}</p>
                  </li>
                ))}
              </ul>
            </div>

            {/* Sticky Actions */}
            <div className="pt-8 border-t border-brand-border mt-8">
              <button 
                onClick={() => onBookNow(service.id)}
                className="w-full bg-brand-dark text-white py-4 text-[10px] tracking-[0.3em] uppercase hover:bg-brand-primary transition-colors font-bold flex items-center justify-center gap-2"
              >
                Schedule Appointment <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </motion.div>
      </>
    )}
  </AnimatePresence>
);

interface BookingModalProps {
  isOpen: boolean;
  preselectedServiceId: string | null;
  onClose: () => void;
  onBookingSuccess: (newBooking: any) => void;
  services: any[];
  doctorName?: string;
}

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, preselectedServiceId, onClose, onBookingSuccess, services, doctorName }) => {
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState(preselectedServiceId || '');
  const [selectedDate, setSelectedDate] = useState<any>(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [patientName, setPatientName] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [patientEmail, setPatientEmail] = useState('');
  const [patientNotes, setPatientNotes] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const next7Days = getNext7Days();

  // Keep state updated if preselectedServiceId changes
  useEffect(() => {
    if (preselectedServiceId) {
      setSelectedService(preselectedServiceId);
    }
  }, [preselectedServiceId]);

  // Reset form states on close
  useEffect(() => {
    if (!isOpen) {
      setStep(1);
      if (!preselectedServiceId) setSelectedService('');
      setSelectedDate(null);
      setSelectedTime('');
      setPatientName('');
      setPatientPhone('');
      setPatientEmail('');
      setPatientNotes('');
      setErrors({});
    }
  }, [isOpen, preselectedServiceId]);

  const handleServiceSelect = (serviceId: string) => {
    setSelectedService(serviceId);
    setErrors({ ...errors, service: '' });
  };

  const handleDateSelect = (date: any) => {
    setSelectedDate(date);
    setErrors({ ...errors, date: '' });
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    setErrors({ ...errors, time: '' });
  };

  const validateStep1 = () => {
    if (!selectedService) {
      setErrors({ service: 'Please select a treatment service.' });
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    const errs: Record<string, string> = {};
    if (!selectedDate) errs.date = 'Please pick an appointment date.';
    if (!selectedTime) errs.time = 'Please select an hours slot.';
    
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateStep3 = () => {
    const errs: Record<string, string> = {};
    if (!patientName.trim()) errs.name = 'Full name is required.';
    if (!patientPhone.trim()) {
      errs.phone = 'Mobile number is required.';
    } else if (!/^[0-9+() -]{10,15}$/.test(patientPhone.trim())) {
      errs.phone = 'Please enter a valid phone number.';
    }
    if (patientEmail.trim() && !/\S+@\S+\.\S+/.test(patientEmail.trim())) {
      errs.email = 'Please enter a valid email address.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) setStep(2);
    if (step === 2 && validateStep2()) setStep(3);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep3()) {
      const selectedServiceObj = services.find(s => s.id === selectedService);
      const newBooking = {
        id: Math.random().toString(36).substr(2, 9),
        serviceId: selectedService,
        serviceTitle: selectedServiceObj?.title || 'Dental Consult',
        dateStr: selectedDate.dateStr,
        fullDateStr: selectedDate.fullDateStr,
        timeSlot: selectedTime,
        patientName,
        patientPhone,
        patientEmail,
        patientNotes,
        bookedAt: new Date().toISOString()
      };
      onBookingSuccess(newBooking);
      setStep(4);
    }
  };

  const activeServiceObj = services.find(s => s.id === selectedService);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop overlay */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-brand-dark/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            {/* Modal Body Container */}
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-brand-bg w-full max-w-2xl border border-brand-border shadow-2xl relative overflow-hidden flex flex-col max-h-[90vh]"
            >
              {/* Top Progress bar */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-brand-hover">
                <motion.div 
                  className="h-full bg-brand-primary" 
                  animate={{ width: `${(step / 4) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>

              {/* Header */}
              <div className="p-8 border-b border-brand-border flex justify-between items-center bg-white">
                <div>
                  <span className="text-[8px] uppercase tracking-[0.3em] font-bold text-brand-primary block mb-1">Step {step} of 4</span>
                  <h3 className="text-xl font-serif text-brand-dark">
                    {step === 1 && 'Select Signature Treatment'}
                    {step === 2 && 'Schedule Date & Time'}
                    {step === 3 && 'Patient Details'}
                    {step === 4 && 'Appointment Confirmed'}
                  </h3>
                </div>
                {step < 4 && (
                  <button onClick={onClose} className="p-2 hover:bg-brand-hover text-brand-dark rounded-full transition-colors">
                    <X size={20} />
                  </button>
                )}
              </div>

              {/* Scrollable Content */}
              <div className="p-8 overflow-y-auto flex-1 font-sans">
                {step === 1 && (
                  <div className="space-y-6">
                    <p className="text-xs text-gray-500 leading-relaxed font-light mb-6">Choose a service from our signature treatments below to start booking.</p>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {services.map(s => (
                        <div 
                          key={s.id}
                          onClick={() => handleServiceSelect(s.id)}
                          className={`p-6 border cursor-pointer transition-all flex items-start gap-4 hover:border-brand-primary ${
                            selectedService === s.id ? 'border-brand-primary bg-brand-primary/5 shadow-sm' : 'border-brand-border bg-white'
                          }`}
                        >
                          <div className={`p-2 rounded-full shrink-0 ${selectedService === s.id ? 'bg-brand-primary text-white' : 'bg-brand-beige text-brand-primary'}`}>
                            {getIcon(s.icon)}
                          </div>
                          <div>
                            <p className="text-sm font-serif font-bold text-brand-dark">{s.title}</p>
                            <p className="text-[10px] text-gray-400 leading-normal mt-1 line-clamp-2 font-sans">{s.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    {errors.service && (
                      <p className="text-xs text-red-500 mt-2 font-mono">{errors.service}</p>
                    )}
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-8">
                    {/* Date select carousel */}
                    <div>
                      <h4 className="text-[10px] font-mono uppercase tracking-widest font-bold text-brand-dark mb-4">Choose Appointment Date</h4>
                      <div className="flex gap-2 overflow-x-auto pb-2 font-sans">
                        {next7Days.map((day) => {
                          const isSelected = selectedDate?.dateStr === day.dateStr;
                          return (
                            <button
                              key={day.dateStr}
                              onClick={() => handleDateSelect(day)}
                              className={`flex flex-col items-center p-4 border min-w-[76px] transition-all cursor-pointer ${
                                isSelected ? 'border-brand-primary bg-brand-primary/5 text-brand-primary font-bold' : 'border-brand-border bg-white text-gray-500'
                              }`}
                            >
                              <span className="text-[9px] uppercase tracking-wider block font-light">{day.dayName}</span>
                              <span className="text-lg font-serif font-bold block my-1">{day.dayNum}</span>
                              <span className="text-[8px] uppercase tracking-wider block font-light">{day.month}</span>
                            </button>
                          );
                        })}
                      </div>
                      {errors.date && (
                        <p className="text-xs text-red-500 mt-2 font-mono">{errors.date}</p>
                      )}
                    </div>

                    {/* Time slot pills */}
                    <div>
                      <h4 className="text-[10px] font-mono uppercase tracking-widest font-bold text-brand-dark mb-4">Available Time Slots</h4>
                      <div className="grid grid-cols-3 gap-2">
                        {TIME_SLOTS.map((time) => {
                          const isSelected = selectedTime === time;
                          return (
                            <button
                              key={time}
                              onClick={() => handleTimeSelect(time)}
                              className={`p-3 border text-xs tracking-wider transition-all cursor-pointer text-center ${
                                isSelected ? 'border-brand-primary bg-brand-primary/5 text-brand-primary font-bold' : 'border-brand-border bg-white text-gray-500'
                              }`}
                            >
                              {time}
                            </button>
                          );
                        })}
                      </div>
                      {errors.time && (
                        <p className="text-xs text-red-500 mt-2 font-mono">{errors.time}</p>
                      )}
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <p className="text-xs text-gray-500 font-light mb-6">Please fill in your primary contact details below so we can lock in your schedule slot.</p>
                    
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div className="flex flex-col">
                        <label className="text-[9px] uppercase font-mono tracking-widest font-bold text-gray-400 mb-2">Patient Full Name *</label>
                        <input
                          type="text"
                          required
                          value={patientName}
                          onChange={(e) => { setPatientName(e.target.value); setErrors({ ...errors, name: '' }); }}
                          className={`p-4 border bg-white text-sm focus:outline-none focus:border-brand-primary ${errors.name ? 'border-red-500' : 'border-brand-border'}`}
                          placeholder="e.g. Rahul Gupta"
                        />
                        {errors.name && <p className="text-[10px] text-red-500 mt-1 font-mono">{errors.name}</p>}
                      </div>

                      <div className="flex flex-col">
                        <label className="text-[9px] uppercase font-mono tracking-widest font-bold text-gray-400 mb-2">Contact Mobile Number *</label>
                        <input
                          type="tel"
                          required
                          value={patientPhone}
                          onChange={(e) => { setPatientPhone(e.target.value); setErrors({ ...errors, phone: '' }); }}
                          className={`p-4 border bg-white text-sm focus:outline-none focus:border-brand-primary ${errors.phone ? 'border-red-500' : 'border-brand-border'}`}
                          placeholder="e.g. +91 98765 43210"
                        />
                        {errors.phone && <p className="text-[10px] text-red-500 mt-1 font-mono">{errors.phone}</p>}
                      </div>
                    </div>

                    <div className="flex flex-col">
                      <label className="text-[9px] uppercase font-mono tracking-widest font-bold text-gray-400 mb-2">Email Address (Optional)</label>
                      <input
                        type="email"
                        value={patientEmail}
                        onChange={(e) => { setPatientEmail(e.target.value); setErrors({ ...errors, email: '' }); }}
                        className={`p-4 border bg-white text-sm focus:outline-none focus:border-brand-primary ${errors.email ? 'border-red-500' : 'border-brand-border'}`}
                        placeholder="e.g. rahul@example.com"
                      />
                      {errors.email && <p className="text-[10px] text-red-500 mt-1 font-mono">{errors.email}</p>}
                    </div>

                    <div className="flex flex-col">
                      <label className="text-[9px] uppercase font-mono tracking-widest font-bold text-gray-400 mb-2">Special Notes or Dental Concerns (Optional)</label>
                      <textarea
                        rows={3}
                        value={patientNotes}
                        onChange={(e) => setPatientNotes(e.target.value)}
                        className="p-4 border border-brand-border bg-white text-sm focus:outline-none focus:border-brand-primary"
                        placeholder="e.g. Extremely nervous about needles, past wisdom tooth pain, etc."
                      />
                    </div>
                  </form>
                )}

                {step === 4 && (
                  <div className="text-center py-10 space-y-6">
                    <motion.div 
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: 'spring', delay: 0.1 }}
                      className="w-20 h-20 bg-brand-primary/10 text-brand-primary rounded-full flex items-center justify-center mx-auto"
                    >
                      <CheckCircle2 size={44} />
                    </motion.div>
                    
                    <div className="space-y-2">
                      <h4 className="text-2xl font-serif text-brand-dark italic">Signature Consult Confirmed!</h4>
                      <p className="text-xs text-gray-500 font-light leading-relaxed">Thank you, {patientName}. Your priority clinical slot has been securely booked and recorded.</p>
                    </div>

                    {/* Booking Details Card */}
                    <div className="bg-brand-beige border border-brand-border p-6 max-w-sm mx-auto text-left space-y-4">
                      <div className="flex justify-between items-start">
                        <span className="text-[9px] uppercase font-mono tracking-widest font-bold text-gray-400">Treatment</span>
                        <span className="text-xs font-serif text-brand-dark font-bold text-right">{activeServiceObj?.title}</span>
                      </div>
                      <div className="flex justify-between items-start border-t border-brand-border/40 pt-2">
                        <span className="text-[9px] uppercase font-mono tracking-widest font-bold text-gray-400">Consultant</span>
                        <span className="text-xs font-sans text-brand-dark font-medium text-right">{doctorName || 'Dr. Ashish Ranjan'}</span>
                      </div>
                      <div className="flex justify-between items-start border-t border-brand-border/40 pt-2">
                        <span className="text-[9px] uppercase font-mono tracking-widest font-bold text-gray-400">Scheduled Date</span>
                        <span className="text-xs font-sans text-brand-dark font-medium text-right">{selectedDate?.fullDateStr}</span>
                      </div>
                      <div className="flex justify-between items-start border-t border-brand-border/40 pt-2">
                        <span className="text-[9px] uppercase font-mono tracking-widest font-bold text-gray-400">Scheduled Time</span>
                        <span className="text-xs font-sans text-brand-dark font-medium text-right">{selectedTime}</span>
                      </div>
                    </div>

                    <p className="text-[9px] font-mono text-gray-400 uppercase tracking-wider">A confirmation text message has been simulated and saved locally.</p>
                  </div>
                )}
              </div>

              {/* Footer Buttons */}
              <div className="p-8 border-t border-brand-border bg-white flex justify-between gap-4 font-sans">
                {step === 1 && (
                  <>
                    <div />
                    <button 
                      onClick={handleNext}
                      className="px-8 py-4 bg-brand-dark text-white text-[10px] tracking-[0.25em] uppercase hover:bg-brand-primary transition-colors font-bold flex items-center gap-2"
                    >
                      Next Step <ChevronRight size={12} />
                    </button>
                  </>
                )}

                {step === 2 && (
                  <>
                    <button 
                      onClick={handleBack}
                      className="px-6 py-4 border border-brand-border text-brand-dark text-[10px] tracking-[0.25em] uppercase hover:bg-brand-hover transition-colors font-bold"
                    >
                      Back
                    </button>
                    <button 
                      onClick={handleNext}
                      className="px-8 py-4 bg-brand-dark text-white text-[10px] tracking-[0.25em] uppercase hover:bg-brand-primary transition-colors font-bold flex items-center gap-2"
                    >
                      Next Step <ChevronRight size={12} />
                    </button>
                  </>
                )}

                {step === 3 && (
                  <>
                    <button 
                      onClick={handleBack}
                      type="button"
                      className="px-6 py-4 border border-brand-border text-brand-dark text-[10px] tracking-[0.25em] uppercase hover:bg-brand-hover transition-colors font-bold"
                    >
                      Back
                    </button>
                    <button 
                      onClick={handleSubmit}
                      type="submit"
                      className="px-8 py-4 bg-brand-primary text-white text-[10px] tracking-[0.25em] uppercase hover:bg-brand-dark transition-colors font-bold flex items-center gap-2"
                    >
                      Confirm Booking &rarr;
                    </button>
                  </>
                )}

                {step === 4 && (
                  <button 
                    onClick={onClose}
                    className="w-full bg-brand-dark text-white py-4 text-[10px] tracking-[0.25em] uppercase hover:bg-brand-primary transition-colors font-bold text-center"
                  >
                    Return to Main Page
                  </button>
                )}
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

interface AppointmentsDrawerProps {
  isOpen: boolean;
  bookings: any[];
  onClose: () => void;
  onCancelBooking: (bookingId: string) => void;
}

const AppointmentsDrawer: React.FC<AppointmentsDrawerProps> = ({ isOpen, bookings, onClose, onCancelBooking }) => (
  <AnimatePresence>
    {isOpen && (
      <>
        {/* Backdrop overlay */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-brand-dark/60 backdrop-blur-sm z-50"
        />
        {/* Drawer container */}
        <motion.div 
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed top-0 right-0 h-full w-full max-w-lg bg-brand-bg shadow-2xl z-50 overflow-y-auto border-l border-brand-border"
        >
          <div className="p-8 md:p-12 h-full flex flex-col justify-between">
            <div>
              {/* Header */}
              <div className="flex justify-between items-start mb-8 font-sans">
                <div className="flex items-center gap-4 text-brand-primary">
                  <div className="w-12 h-12 rounded-full bg-brand-primary/10 flex items-center justify-center">
                    <CalendarDays size={24} />
                  </div>
                  <div>
                    <h4 className="text-xs uppercase font-mono tracking-widest font-bold text-brand-primary">My Schedule</h4>
                    <span className="text-[9px] text-gray-400 font-sans">View active consultation slots</span>
                  </div>
                </div>
                <button onClick={onClose} className="p-2 hover:bg-brand-hover text-brand-dark transition-colors rounded-full">
                  <X size={20} />
                </button>
              </div>

              {/* Booking count status */}
              <h2 className="text-3xl font-serif text-brand-dark mb-6">
                Active Consultations ({bookings.length})
              </h2>

              {/* Bookings List */}
              {bookings.length === 0 ? (
                <div className="text-center py-20 border border-dashed border-brand-border p-8 bg-white/50">
                  <p className="text-sm text-gray-500 font-light font-sans mb-4">You have no active appointment schedules currently recorded.</p>
                  <button 
                    onClick={onClose}
                    className="text-[9px] uppercase tracking-widest font-bold text-brand-primary hover:text-brand-dark border-b border-brand-primary pb-0.5"
                  >
                    Return to Main Directory
                  </button>
                </div>
              ) : (
                <div className="space-y-6 font-sans">
                  <AnimatePresence>
                    {bookings.map((booking) => (
                      <motion.div 
                        key={booking.id}
                        initial={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="bg-white border border-brand-border p-6 shadow-sm hover:border-brand-primary transition-all relative group flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex justify-between items-start mb-3">
                            <span className="text-xs uppercase font-mono tracking-widest bg-brand-beige text-brand-primary px-3 py-1 font-bold">
                              Confirmed Slot
                            </span>
                            <button 
                              onClick={() => onCancelBooking(booking.id)}
                              className="text-gray-400 hover:text-red-500 transition-colors p-1"
                              title="Cancel appointment"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>

                          <h4 className="text-lg font-serif text-brand-dark mb-4">{booking.serviceTitle}</h4>
                          
                          <div className="space-y-2 text-xs text-gray-600">
                            <div className="flex items-center gap-2">
                              <Calendar size={14} className="text-brand-primary shrink-0" />
                              <span className="font-sans font-medium">{booking.fullDateStr}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock size={14} className="text-brand-primary shrink-0" />
                              <span className="font-sans font-medium">{booking.timeSlot}</span>
                            </div>
                            <div className="flex items-center gap-2 pt-2 border-t border-brand-border/40 mt-2">
                              <UserRound size={14} className="text-brand-primary shrink-0" />
                              <span className="font-sans font-light">Patient: <strong>{booking.patientName}</strong> ({booking.patientPhone})</span>
                            </div>
                          </div>
                        </div>

                        <div className="mt-4 pt-4 border-t border-brand-border/40 flex justify-between items-center text-[10px] text-gray-400 uppercase font-mono">
                          <span>Clinic: Rohini</span>
                          <button 
                            onClick={() => onCancelBooking(booking.id)}
                            className="text-red-500 font-bold hover:underline transition-all flex items-center gap-1"
                          >
                            Cancel Appointment
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* Sticky Actions */}
            <div className="pt-8 border-t border-brand-border mt-8 font-sans">
              <button 
                onClick={onClose}
                className="w-full bg-brand-dark text-white py-4 text-[10px] tracking-[0.25em] uppercase hover:bg-brand-primary transition-colors font-bold"
              >
                Close Schedule Viewer
              </button>
            </div>
          </div>
        </motion.div>
      </>
    )}
  </AnimatePresence>
);

// --- Main App ---

export default function App() {
  const content = useHomepageContent();
  const doctorName = content.hero?.headline || "Dr. Ashish Ranjan";
  const doctorLastName = doctorName.split(" ").pop() || "Ranjan";

  // Service detail drawer state
  const [selectedServiceForDrawer, setSelectedServiceForDrawer] = useState<any>(null);

  // Lightbox state
  const [activeLightboxImg, setActiveLightboxImg] = useState<{ src: string, caption: string } | null>(null);
  
  // Booking modal state
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingPrefillId, setBookingPrefillId] = useState<string | null>(null);

  // Active appointments list state
  const [bookings, setBookings] = useState<any[]>([]);
  const [isAppointmentsDrawerOpen, setIsAppointmentsDrawerOpen] = useState(false);

  // Reviews dynamic state
  const [reviews, setReviews] = useState<any[]>([]);
  const [isReviewFormOpen, setIsReviewFormOpen] = useState(false);
  const [newReviewName, setNewReviewName] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewText, setNewReviewText] = useState('');
  const [reviewHoverRating, setReviewHoverRating] = useState<number | null>(null);
  const [reviewSuccessMsg, setReviewSuccessMsg] = useState(false);

  // Load reviews and appointments from localStorage on mount
  useEffect(() => {
    // Bookings
    const savedBookings = localStorage.getItem('sun_dental_bookings');
    if (savedBookings) {
      try {
        setBookings(JSON.parse(savedBookings));
      } catch (e) {
        console.error("Error loading local bookings", e);
      }
    }

    // Reviews
    const savedReviews = localStorage.getItem('sun_dental_reviews');
    const localInitialReviews = INITIAL_REVIEWS.map(r => {
      const text = r.text
        .replace(/Dr\. Ranjan/g, `Dr. ${doctorLastName}`)
        .replace(/Dr\. Ashish Ranjan/g, doctorName);
      return { ...r, text };
    });
    if (savedReviews) {
      try {
        const parsed = JSON.parse(savedReviews);
        setReviews([...localInitialReviews, ...parsed]);
      } catch (e) {
        console.error("Error loading local reviews", e);
      }
    } else {
      setReviews(localInitialReviews);
    }
  }, [doctorName, doctorLastName]);

  // Set explore service detail click handler
  const handleExploreService = (service: any) => {
    setSelectedServiceForDrawer(service);
  };

  // Launch booking modal from hero or navbar
  const handleOpenBookingModal = () => {
    setBookingPrefillId(null);
    setIsBookingOpen(true);
  };

  // Launch booking modal with preselected service from drawer
  const handleBookFromDrawer = (serviceId: string) => {
    setBookingPrefillId(serviceId);
    setSelectedServiceForDrawer(null); // close drawer
    setIsBookingOpen(true); // open booking
  };

  // On booking confirmation success
  const handleBookingSuccess = (newBooking: any) => {
    const updated = [newBooking, ...bookings];
    setBookings(updated);
    localStorage.setItem('sun_dental_bookings', JSON.stringify(updated));
  };

  // Cancel booking
  const handleCancelBooking = (bookingId: string) => {
    const updated = bookings.filter(b => b.id !== bookingId);
    setBookings(updated);
    localStorage.setItem('sun_dental_bookings', JSON.stringify(updated));
  };

  // Review submission
  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewName.trim() || !newReviewText.trim()) return;

    const newRev = {
      name: newReviewName,
      rating: newReviewRating,
      text: newReviewText,
      date: "Just now"
    };

    // Save in local storage
    const customReviews = localStorage.getItem('sun_dental_reviews');
    let updatedCustom = [];
    if (customReviews) {
      try {
        updatedCustom = JSON.parse(customReviews);
      } catch (e) {}
    }
    updatedCustom.push(newRev);
    localStorage.setItem('sun_dental_reviews', JSON.stringify(updatedCustom));

    // Update state
    setReviews([...INITIAL_REVIEWS, ...updatedCustom]);
    
    // Clear inputs and show success message
    setNewReviewName('');
    setNewReviewRating(5);
    setNewReviewText('');
    setReviewSuccessMsg(true);
    setTimeout(() => {
      setReviewSuccessMsg(false);
      setIsReviewFormOpen(false);
    }, 2500);
  };

  // Average review calculation
  const totalRatingPoints = reviews.reduce((sum, r) => sum + r.rating, 0);
  const avgRating = (totalRatingPoints / reviews.length).toFixed(1);

  return (
    <div className="min-h-screen bg-brand-bg text-brand-dark selection:bg-brand-primary selection:text-white antialiased">
      <Navbar 
        onBookClick={handleOpenBookingModal} 
        onMyAppointmentsClick={() => setIsAppointmentsDrawerOpen(true)}
        bookingCount={bookings.length}
      />
      
      <main>
        <Hero 
          onBookClick={handleOpenBookingModal} 
          onGalleryClick={(src, caption) => setActiveLightboxImg({ src, caption })}
          content={content}
        />
        
        <MarqueeStats />

        {/* Services Section */}
        <section id="services" className="py-24 md:py-32">
          <div className="max-w-7xl mx-auto px-8 md:px-16">
            <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
              <div className="max-w-xl">
                <span className="text-[10px] uppercase tracking-[0.4em] text-brand-primary font-bold mb-4 block">Our Expertise</span>
                <h2 className="text-5xl md:text-7xl font-serif text-brand-dark leading-tight italic">Signature Solutions for Your Smile.</h2>
              </div>
              <p className="text-gray-500 text-sm max-w-xs leading-relaxed font-light font-sans">
                Experience the pinnacle of dentistry at Sun Dental Clinic. We combine expert precision with a caring approach in our state-of-the-art clinic.
              </p>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-0 artistic-border border-l border-t bg-white">
              {(content.services || []).map((service: any) => (
                <ServiceCard key={service.id} service={{ ...service, icon: getIcon(service.icon) }} onExplore={handleExploreService} />
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section id="reviews" className="py-24 md:py-32 bg-brand-dark text-white relative">
          <div className="max-w-7xl mx-auto px-8 md:px-16 relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-24">
              <div className="max-w-xl">
                <span className="text-[10px] uppercase tracking-[0.4em] text-brand-primary font-bold mb-4 block">Testimonials</span>
                <h2 className="text-5xl md:text-7xl font-serif mb-6 leading-[0.9] italic text-brand-primary">What Our Patients Say.</h2>
              </div>
              <div className="flex items-center gap-6 artistic-border border p-6 bg-white/5">
                <div className="flex items-center gap-2 text-brand-primary">
                  <Star fill="currentColor" size={20} />
                  <span className="text-3xl font-serif">{avgRating}/5</span>
                </div>
                <div className="w-[1px] h-10 bg-brand-primary/30" />
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-widest font-bold opacity-60 font-mono">Verified Reviews</span>
                  <span className="text-[9px] tracking-wider text-gray-400 mt-0.5 font-sans">{reviews.length} patient stories shared</span>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 artistic-border border-l border-t">
              {reviews.map((review, idx) => (
                <div key={idx} className="p-12 border-r border-b artistic-border hover:bg-white/5 transition-colors group">
                  <div className="flex items-center gap-1 text-brand-primary mb-8 opacity-60">
                    {[...Array(review.rating)].map((_, i) => <Star key={i} fill="currentColor" size={14} />)}
                  </div>
                  <p className="text-lg font-serif italic text-white/80 leading-relaxed mb-10 group-hover:text-white transition-colors">
                    "{review.text}"
                  </p>
                  <div className="flex flex-col">
                    <span className="text-xs uppercase tracking-widest font-bold text-brand-primary mb-1">{review.name}</span>
                    <span className="text-[10px] uppercase tracking-wider opacity-40 italic font-mono">{review.date}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Dynamic review writing form */}
            <div className="mt-16 text-center">
              {!isReviewFormOpen ? (
                <button
                  onClick={() => setIsReviewFormOpen(true)}
                  className="px-8 py-4 border border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white transition-all text-[10px] uppercase tracking-[0.25em] font-bold cursor-pointer font-sans"
                >
                  Share Your Personal Story &rarr;
                </button>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="max-w-xl mx-auto bg-white/5 border border-brand-primary/20 p-8 text-left mt-8 font-sans"
                >
                  <div className="flex justify-between items-center mb-6">
                    <h4 className="text-lg font-serif italic text-brand-primary">Write Your Review</h4>
                    <button 
                      onClick={() => setIsReviewFormOpen(false)}
                      className="p-1 text-gray-400 hover:text-white transition-colors"
                    >
                      <X size={18} />
                    </button>
                  </div>

                  {reviewSuccessMsg ? (
                    <div className="text-center py-6 space-y-3">
                      <div className="w-12 h-12 rounded-full bg-brand-primary/20 text-brand-primary flex items-center justify-center mx-auto">
                        <CheckCircle2 size={24} />
                      </div>
                      <p className="text-sm font-serif italic text-brand-primary">Thank you for sharing your Sun Dental story!</p>
                    </div>
                  ) : (
                    <form onSubmit={handleReviewSubmit} className="space-y-6">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="flex flex-col">
                          <label className="text-[8px] uppercase tracking-widest font-mono text-gray-400 mb-2">Your Full Name</label>
                          <input
                            type="text"
                            required
                            value={newReviewName}
                            onChange={(e) => setNewReviewName(e.target.value)}
                            placeholder="e.g. Saloni Mittal"
                            className="bg-white/5 border border-brand-primary/20 p-3 text-sm focus:outline-none focus:border-brand-primary text-white"
                          />
                        </div>
                        <div className="flex flex-col">
                          <label className="text-[8px] uppercase tracking-widest font-mono text-gray-400 mb-2">Overall Rating</label>
                          <div className="flex items-center gap-1.5 h-[46px]">
                            {[1, 2, 3, 4, 5].map((star) => {
                              const isHighlighted = (reviewHoverRating !== null ? reviewHoverRating : newReviewRating) >= star;
                              return (
                                <button
                                  key={star}
                                  type="button"
                                  onClick={() => setNewReviewRating(star)}
                                  onMouseEnter={() => setReviewHoverRating(star)}
                                  onMouseLeave={() => setReviewHoverRating(null)}
                                  className="text-brand-primary hover:scale-110 transition-transform"
                                >
                                  <Star size={20} fill={isHighlighted ? "currentColor" : "none"} />
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col">
                        <label className="text-[8px] uppercase tracking-widest font-mono text-gray-400 mb-2">Review Details</label>
                        <textarea
                          rows={4}
                          required
                          value={newReviewText}
                          onChange={(e) => setNewReviewText(e.target.value)}
                          placeholder="Tell future patients about your comfort, healing, and results during your visit..."
                          className="bg-white/5 border border-brand-primary/20 p-3 text-sm focus:outline-none focus:border-brand-primary text-white resize-none"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-brand-primary text-white py-3 text-[10px] uppercase tracking-[0.25em] font-bold hover:bg-white hover:text-brand-dark transition-colors cursor-pointer"
                      >
                        Submit Signature Review
                      </button>
                    </form>
                  )}
                </motion.div>
              )}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-24 md:py-32">
          <div className="max-w-3xl mx-auto px-8 md:px-16">
            <div className="text-center mb-20">
              <span className="text-[10px] uppercase tracking-[0.4em] text-brand-primary font-bold mb-4 block font-mono">Inquiries</span>
              <h2 className="text-5xl font-serif text-brand-dark italic">Common Questions.</h2>
            </div>
            <div className="border-t border-brand-border">
              {FAQS.map((faq, idx) => {
                const answer = faq.a
                  .replace(/\+91 98118 28767/g, content.footer?.phoneNumber || '+91 98118 28767')
                  .replace(/Dr\. Ranjan/g, `Dr. ${doctorLastName}`)
                  .replace(/Dr\. Ashish Ranjan/g, doctorName);
                return <FAQItem key={idx} faq={{ ...faq, a: answer }} />;
              })}
            </div>
          </div>
        </section>

        {/* Book Appointment CTA */}
        <section className="pb-24 pt-12 md:pb-32">
          <div className="max-w-7xl mx-auto px-8 md:px-16">
            <div className="bg-brand-beige p-16 md:p-32 text-center border artistic-border">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="max-w-2xl mx-auto"
              >
                <h2 className="text-5xl md:text-7xl font-serif mb-10 leading-[0.9] text-brand-dark italic">Your Redefined Smile Starts Here.</h2>
                <p className="text-gray-500 text-sm max-w-sm mx-auto mb-12 leading-relaxed font-light font-sans">
                  Claim your priority consultation for signature restorative treatment today. Limited availability this week.
                </p>
                <button 
                  onClick={handleOpenBookingModal}
                  className="bg-brand-dark text-white px-12 py-5 text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-brand-primary transition-all cursor-pointer font-sans"
                >
                  Inquire Now &rarr;
                </button>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer / Artistic Flair Bottom Bar */}
      <footer className="px-8 md:px-16 py-12 border-t border-brand-border bg-white font-sans">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex items-center gap-4">
              <div className="w-2 h-2 rounded-full bg-brand-primary"></div>
              <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-brand-dark font-mono">{doctorName}</span>
            </div>
            <span className="text-[10px] text-gray-400 uppercase tracking-widest hidden md:block">•</span>
            {content.about?.profileDescription?.match(/(\d+)\s+years/i) ? (
              <span className="text-[10px] text-gray-400 uppercase tracking-[0.15em] font-mono">Lead Dentist • {content.about.profileDescription.match(/(\d+)\s+years/i)[1]} Years Clinical Experience</span>
            ) : (
              <span className="text-[10px] text-gray-400 uppercase tracking-[0.15em] font-mono">Lead Dentist • 9 Years Clinical Experience</span>
            )}
          </div>
          <div className="flex flex-col md:flex-row gap-8 text-[10px] text-gray-500 uppercase tracking-[0.2em] text-center md:text-left font-mono">
            <span className="flex items-center gap-1"><MapPin size={12} className="text-brand-primary" /> {content.footer?.address || 'Sector 11, Rohini, North West Delhi, 110085'}</span>
            <span className="flex items-center gap-1"><Phone size={12} className="text-brand-primary" /> T: {content.footer?.phoneNumber || '+91 98118 28767'}</span>
            {content.footer?.hours && (
              <span className="flex items-center gap-1"><Clock size={12} className="text-brand-primary" /> {content.footer.hours}</span>
            )}
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-12 border-t border-brand-border flex justify-between items-center opacity-40">
           <p className="text-[9px] uppercase tracking-widest font-mono">&copy; {new Date().getFullYear()} Sun Dental Clinic</p>
           <div className="flex gap-6 text-[9px] uppercase tracking-widest font-mono">
              <a href="#" className="hover:underline">Privacy Policy</a>
              <a href="#" className="hover:underline">Terms of Service</a>
           </div>
        </div>
      </footer>

      {/* Mobile Sticky Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-brand-dark p-4 flex gap-4 border-t border-brand-primary/20 font-sans">
        <a href={`tel:${(content.footer?.phoneNumber || '+919811828767').replace(/\s+/g, '')}`} className="flex-1 bg-white/5 text-white py-4 text-[10px] uppercase tracking-widest font-bold text-center">
          Call Now
        </a>
        <button 
          onClick={handleOpenBookingModal}
          className="flex-1 bg-brand-primary text-white py-4 text-[10px] uppercase tracking-widest font-bold"
        >
          Consult Now
        </button>
      </div>

      {/* Custom Drawers/Modals */}
      <ServiceDrawer 
        service={selectedServiceForDrawer} 
        onClose={() => setSelectedServiceForDrawer(null)}
        onBookNow={handleBookFromDrawer}
      />

      <BookingModal 
        isOpen={isBookingOpen}
        preselectedServiceId={bookingPrefillId}
        onClose={() => setIsBookingOpen(false)}
        onBookingSuccess={handleBookingSuccess}
        services={content.services || []}
        doctorName={doctorName}
      />

      <AppointmentsDrawer 
        isOpen={isAppointmentsDrawerOpen}
        bookings={bookings}
        onClose={() => setIsAppointmentsDrawerOpen(false)}
        onCancelBooking={handleCancelBooking}
      />

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeLightboxImg && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveLightboxImg(null)}
            className="fixed inset-0 bg-brand-dark/90 backdrop-blur-md z-50 flex flex-col items-center justify-center p-8 cursor-zoom-out"
          >
            <button 
              onClick={() => setActiveLightboxImg(null)}
              className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors cursor-pointer"
            >
              <X size={24} />
            </button>
            <motion.div 
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="relative max-w-4xl max-h-[80vh] overflow-hidden border border-white/10 bg-brand-dark shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={activeLightboxImg.src} 
                alt={activeLightboxImg.caption} 
                className="max-w-full max-h-[75vh] object-contain"
              />
              <div className="bg-brand-dark/95 border-t border-white/5 p-4 text-center">
                <p className="text-xs uppercase tracking-widest font-mono text-brand-primary font-bold">Credentials & Portfolio</p>
                <p className="text-sm text-white/90 font-serif italic mt-1">{activeLightboxImg.caption}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
