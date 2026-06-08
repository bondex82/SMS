/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ACADEMY_EVENTS, ACADEMIC_CALENDAR } from '../data/schoolData';
import { AcademyEvent } from '../types';
import { Calendar, MapPin, Clock, Search, Filter, Ticket, Check, Sparkles, Megaphone, ArrowRight } from 'lucide-react';

interface EventRegistration {
  id: string;
  eventName: string;
  parentName: string;
  studentName: string;
  email: string;
  phone: string;
  attendeesCount: number;
  ticketCode: string;
  registeredAt: string;
}

export default function EventsSection() {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedEvent, setSelectedEvent] = useState<AcademyEvent | null>(null);
  
  // Registration and tickets
  const [parentName, setParentName] = useState('');
  const [studentName, setStudentName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [attendeesCount, setAttendeesCount] = useState(1);
  const [successRegistration, setSuccessRegistration] = useState<EventRegistration | null>(null);
  const [myTickets, setMyTickets] = useState<EventRegistration[]>([]);

  useEffect(() => {
    const savedTickets = localStorage.getItem('gja_event_registrations');
    if (savedTickets) {
      try {
        setMyTickets(JSON.parse(savedTickets));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEvent) return;

    const ticketCode = `TKT-${Math.floor(100000 + Math.random() * 900000)}`;
    const newReg: EventRegistration = {
      id: Math.random().toString(36).substring(2, 9),
      eventName: selectedEvent.title,
      parentName,
      studentName,
      email,
      phone,
      attendeesCount,
      ticketCode,
      registeredAt: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      })
    };

    const updated = [newReg, ...myTickets];
    setMyTickets(updated);
    localStorage.setItem('gja_event_registrations', JSON.stringify(updated));

    setSuccessRegistration(newReg);
    
    // Clear inputs
    setParentName('');
    setStudentName('');
    setEmail('');
    setPhone('');
    setAttendeesCount(1);
  };

  const categories = ['All', 'Academic', 'Science', 'Sports', 'Arts', 'Admissions'];

  const filteredEvents = ACADEMY_EVENTS.filter((evt) => {
    const matchesCategory = activeCategory === 'All' || evt.category === activeCategory;
    const matchesSearch = evt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          evt.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          evt.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-slate-50 min-h-screen py-10" id="events-section-container">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
        
        {/* Header Hero Title */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-1.5 bg-amber-500/10 text-amber-800 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border border-amber-200/50">
            <Calendar className="w-4 h-4" />
            <span>Campus Activities</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">Events & Term Calendar</h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Participate in our vibrant campus life. RSVP for parent forums, athletic competitions, S.T.E.A.M. showcases, and keep track of academic term dates.
          </p>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left / Main Column: Events Feed */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Filter and Search Bar */}
            <div className="bg-white p-4 rounded-2xl border border-slate-150/60 shadow-sm flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="flex flex-wrap gap-1.5 justify-center sm:justify-start w-full sm:w-auto">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition select-none ${
                      activeCategory === cat
                        ? 'bg-slate-900 text-white shadow-sm'
                        : 'bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
              
              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search events..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 pl-9 pr-3 text-xs focus:outline-none focus:bg-white text-slate-800 focus:ring-1 focus:ring-amber-500"
                />
              </div>
            </div>

            {/* Events Grid / List */}
            {filteredEvents.length === 0 ? (
              <div className="bg-white p-12 text-center rounded-2xl border border-slate-150 border-dashed space-y-3">
                <Calendar className="w-8 h-8 text-slate-300 mx-auto" />
                <h3 className="font-bold text-slate-800 text-sm">No Events Located</h3>
                <p className="text-slate-500 text-xs max-w-sm mx-auto">There are currently no events matching your filter selections. Try searching with different terms.</p>
              </div>
            ) : (
              <div className="space-y-6">
                {filteredEvents.map((evt) => (
                  <div 
                    key={evt.id}
                    className="bg-white rounded-2xl border border-slate-150/60 shadow-sm overflow-hidden flex flex-col md:flex-row hover:shadow-md transition duration-300"
                  >
                    {/* Event Banner */}
                    <div className="md:w-1/3 aspect-video md:aspect-auto relative bg-slate-100 overflow-hidden shrink-0">
                      <img 
                        src={evt.imageUrl} 
                        alt={evt.title} 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <span className="absolute top-3 left-3 bg-slate-900/95 backdrop-blur-sm px-2.5 py-1 rounded text-[10px] font-black uppercase text-amber-400 tracking-wider">
                        {evt.category}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="p-6 flex flex-col justify-between flex-1 space-y-4">
                      <div className="space-y-2">
                        <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-slate-500 font-mono text-[11px] font-semibold">
                          <span className="flex items-center space-x-1.5 text-amber-700">
                            <Calendar className="w-3.5 h-3.5" />
                            <span>{evt.date}</span>
                          </span>
                          <span className="flex items-center space-x-1.5">
                            <Clock className="w-3.5 h-3.5 text-slate-400" />
                            <span>{evt.time}</span>
                          </span>
                        </div>

                        <h3 className="text-lg font-extrabold text-slate-900 tracking-tight leading-tight">
                          {evt.title}
                        </h3>

                        <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                          {evt.description}
                        </p>
                      </div>

                      <div className="flex items-center justify-between gap-4 pt-3 border-t border-slate-100">
                        <span className="flex items-center text-xs text-slate-500 space-x-1">
                          <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span className="truncate max-w-[150px] sm:max-w-[200px] font-medium">{evt.location}</span>
                        </span>

                        <button
                          onClick={() => {
                            setSelectedEvent(evt);
                            setSuccessRegistration(null);
                          }}
                          className="bg-amber-500 hover:bg-amber-600 font-extrabold text-slate-950 text-xs py-2 px-4 rounded-xl flex items-center space-x-1.5 select-none transition"
                        >
                          <Ticket className="w-3.5 h-3.5" />
                          <span>Get Free Ticket</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Mini Widgets */}
          <div className="lg:col-span-4 space-y-8">
            
            {/* Term Academic Planner Desk */}
            <div className="bg-white rounded-2xl p-6 border border-slate-150/60 shadow-sm space-y-4">
              <div className="flex items-center space-x-2 pb-3 border-b border-slate-100">
                <Megaphone className="w-4 h-4 text-amber-600" />
                <h3 className="font-extrabold text-sm text-slate-900">Term Key Calendars</h3>
              </div>
              
              <div className="space-y-4">
                {ACADEMIC_CALENDAR.map((cal, index) => (
                  <div key={index} className="flex gap-3 text-xs sm:text-sm items-start">
                    <span className="bg-amber-500/10 text-amber-900 px-2 py-1 rounded text-[10px] font-bold tracking-tight shrink-0 font-mono mt-0.5">
                      {cal.date.split(',')[0]}
                    </span>
                    <div>
                      <p className="text-slate-700 font-bold leading-tight">{cal.event}</p>
                      <p className="text-slate-400 text-[10px]">{cal.date.split(',')[1]}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Offline registration notification */}
            <div className="bg-slate-900 text-slate-100 rounded-2xl p-6 relative overflow-hidden shadow-sm space-y-4">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-xl -mr-10 -mt-10"></div>
              <h4 className="text-white text-sm font-extrabold flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Notice to Communities</span>
              </h4>
              <p className="text-slate-300 text-xs leading-relaxed">
                Most school activities do not require explicit fees. However, seat registration helps us arrange appropriate meals, folders, and tutor spacing lists.
              </p>
              <div className="border-l-2 border-amber-500 pl-3 italic text-[11px] text-amber-500">
                "Nurturing character starting at the earliest paces of academy life."
              </div>
            </div>
          </div>
        </div>

        {/* List of my existing ticket logs */}
        {myTickets.length > 0 && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6" id="personal-admission-tickets">
            <div className="flex items-center space-x-2 border-b border-slate-150 pb-4">
              <Ticket className="w-5 h-5 text-amber-600" />
              <h3 className="font-extrabold text-lg text-slate-900">Your Generated Offline Passes</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {myTickets.map((tc) => (
                <div key={tc.id} className="border border-slate-150/80 bg-slate-50/60 rounded-xl p-5 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-start gap-2">
                      <span className="bg-amber-100 text-amber-900 border border-amber-200/50 px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider font-mono">
                        {tc.ticketCode}
                      </span>
                      <span className="text-[10px] text-slate-400 font-semibold">{tc.registeredAt}</span>
                    </div>
                    <h4 className="font-extrabold text-slate-900 text-sm leading-tight">{tc.eventName}</h4>
                    <p className="text-xs text-slate-500">
                      Primary Contact: <strong className="text-slate-800">{tc.parentName}</strong>
                    </p>
                    <p className="text-xs text-slate-505">
                      Student Name: <strong className="text-slate-800">{tc.studentName}</strong> • Attendees: <strong className="text-slate-800">{tc.attendeesCount}</strong>
                    </p>
                  </div>
                  <div className="pt-3 border-t border-slate-150 flex items-center justify-between">
                    <span className="text-[10px] text-emerald-600 font-extrabold uppercase tracking-widest flex items-center gap-1">
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                      <span>Pass Logged</span>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Ticket Booking overlay Modal popup */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl overflow-hidden shadow-2xl max-w-lg w-full relative z-20 flex flex-col max-h-[90vh]">
            
            {/* Modal Ribbon header */}
            <div className="bg-slate-900 text-white p-6 relative">
              <button
                onClick={() => { setSelectedEvent(null); setSuccessRegistration(null); }}
                className="absolute top-4 right-4 text-slate-400 hover:text-white"
              >
                ✕
              </button>
              <span className="bg-amber-500 text-slate-950 text-[10px] font-black px-2.5 py-0.5 rounded uppercase tracking-wider select-none">
                {selectedEvent.category} Register
              </span>
              <h3 className="font-extrabold text-lg text-white tracking-tight mt-2 leading-tight">
                {selectedEvent.title}
              </h3>
              <p className="text-xs text-slate-400 mt-1 flex items-center gap-2">
                <span>{selectedEvent.date}</span> • <span>{selectedEvent.time}</span>
              </p>
            </div>

            <div className="p-6 overflow-y-auto space-y-6">
              
              {successRegistration ? (
                <div className="space-y-4 text-center py-6 animate-fade-in">
                  <div className="bg-emerald-500 text-white p-3 rounded-full w-14 h-14 flex items-center justify-center text-2xl mx-auto shadow-md">
                    ✓
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-extrabold text-slate-900 text-base">Pass Reservation Completed!</h4>
                    <p className="text-slate-550 text-xs">Your offline pass has been generated. Please save or copy this ticket number:</p>
                  </div>

                  <div className="bg-amber-500/10 border-2 border-dashed border-amber-300 rounded-xl p-4 max-w-xs mx-auto text-center font-mono space-y-1">
                    <p className="text-amber-900 text-xs uppercase font-extrabold tracking-widest">Entry Pass Code</p>
                    <p className="text-slate-950 text-xl font-black">{successRegistration.ticketCode}</p>
                    <p className="text-[10px] text-slate-500 font-semibold">{successRegistration.attendeesCount} Parent-Child Seats reserved</p>
                  </div>

                  <p className="text-[11px] text-slate-400 max-w-sm mx-auto leading-relaxed">
                    A record is stored in your computer's browser storage. Review this anytime at the "Offline Passes" section below the events list.
                  </p>

                  <button
                    onClick={() => { setSelectedEvent(null); setSuccessRegistration(null); }}
                    className="bg-slate-900 text-white hover:bg-slate-800 font-extrabold py-2 px-6 rounded-lg text-xs tracking-wide select-none transition"
                  >
                    Close & Back to Events
                  </button>
                </div>
              ) : (
                <form onSubmit={handleRegisterSubmit} className="space-y-4 text-xs sm:text-sm">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700">Parent / Guardian Name *</label>
                    <input
                      type="text"
                      required
                      value={parentName}
                      onChange={(e) => setParentName(e.target.value)}
                      placeholder="e.g. Johnathan Henderson"
                      className="w-full bg-slate-50 border border-slate-200 focus:border-amber-500 focus:bg-white rounded-xl py-2.5 px-3 focus:outline-none text-slate-800"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700">Student Full Name *</label>
                    <input
                      type="text"
                      required
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      placeholder="e.g. Lucy Henderson"
                      className="w-full bg-slate-50 border border-slate-200 focus:border-amber-500 focus:bg-white rounded-xl py-2.5 px-3 focus:outline-none text-slate-800"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-700">Parent Email *</label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. john@domain.com"
                        className="w-full bg-slate-50 border border-slate-200 focus:border-amber-500 focus:bg-white rounded-xl py-2.5 px-3 focus:outline-none text-slate-800"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-700">Parent Phone *</label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="e.g. (555) 123-4567"
                        className="w-full bg-slate-50 border border-slate-200 focus:border-amber-500 focus:bg-white rounded-xl py-2.5 px-3 focus:outline-none text-slate-800"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700">Expected Attendance Count *</label>
                    <select
                      value={attendeesCount}
                      onChange={(e) => setAttendeesCount(parseInt(e.target.value))}
                      className="w-full bg-slate-50 border border-slate-200 focus:border-amber-500 focus:bg-white rounded-xl py-2.5 px-3 focus:outline-none text-slate-800"
                    >
                      <option value={1}>1 Person (Student or Parent only)</option>
                      <option value={2}>2 People (Parent + Student)</option>
                      <option value={3}>3 People (Parent 1 + Parent 2 + Student)</option>
                      <option value={4}>4 People (Family group of 4)</option>
                    </select>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full bg-slate-900 hover:bg-amber-500 hover:text-slate-950 text-white font-extrabold py-3 rounded-xl transition shadow flex items-center justify-center space-x-2 select-none"
                    >
                      <span>Complete Free Registration</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
