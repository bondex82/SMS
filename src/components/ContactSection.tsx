/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ActiveTab, ContactInquiry } from '../types';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, HelpCircle, MessagesSquare } from 'lucide-react';
import { ACADEMY_INFO } from '../data/schoolData';

export default function ContactSection() {
  const [success, setSuccess] = useState(false);
  const [inquiries, setInquiries] = useState<ContactInquiry[]>([]);

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('General Inquiry');
  const [message, setMessage] = useState('');

  // Load existing inquiries
  useEffect(() => {
    const saved = localStorage.getItem('grace_inquiries');
    if (saved) {
      try {
        setInquiries(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !message) {
      alert("Please fill out all required fields marked with an asterisk (*).");
      return;
    }

    const newInquiry: ContactInquiry = {
      name,
      email,
      subject,
      message,
      dateSubmitted: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    };

    const updated = [newInquiry, ...inquiries];
    setInquiries(updated);
    localStorage.setItem('grace_inquiries', JSON.stringify(updated));

    // Clear form
    setName('');
    setEmail('');
    setSubject('General Inquiry');
    setMessage('');

    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
    }, 5000);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10" id="contact-section-container">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-16">
        {/* Contact Title Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-1.5 bg-amber-500/10 text-amber-800 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border border-amber-200/50">
            <Mail className="w-4 h-4" />
            <span>Connect With Us</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">We are Here to Help</h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Have questions about our syllabus, sibling discounts, or campus schedules? Leave our registrars a message or visit our front desk directly!
          </p>
        </div>

        {/* Dual Grid Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start" id="contact-interaction-grid">
          {/* Channel parameters Info Panel */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-900 text-slate-100 p-8 rounded-3xl space-y-8 relative overflow-hidden" id="channel-card">
              <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-2xl -mr-20 -mt-20"></div>
              
              <div className="space-y-2 border-b border-slate-800 pb-4">
                <h3 className="font-extrabold text-xl text-white">Academy Contacts</h3>
                <p className="text-slate-400 text-xs sm:text-sm">Direct links to admissions, registration, and administrative personnel.</p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-slate-800 p-3 rounded-xl border border-slate-750 text-amber-500">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">Main Phone</p>
                    <p className="font-bold text-slate-100 text-sm sm:text-base">{ACADEMY_INFO.phone}</p>
                    <p className="text-slate-500 text-[11px] font-medium leading-tight">Administrative Front Desk</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-slate-800 p-3 rounded-xl border border-slate-750 text-amber-500">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">Office Email</p>
                    <p className="font-bold text-slate-100 text-sm sm:text-base hover:text-amber-400 cursor-pointer transition select-none">
                      {ACADEMY_INFO.email}
                    </p>
                    <p className="text-slate-500 text-[11px] font-medium leading-tight">Registrar General Inquiries</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-slate-800 p-3 rounded-xl border border-slate-750 text-amber-500">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">Campus Coordinates</p>
                    <p className="font-bold text-slate-100 text-xs sm:text-sm leading-snug">{ACADEMY_INFO.address}</p>
                    <p className="text-slate-500 text-[11px] font-medium leading-tight">Springfield Campus Gates</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-slate-800 p-3 rounded-xl border border-slate-750 text-amber-500">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">Academic Hours</p>
                    <p className="font-bold text-slate-100 text-xs sm:text-sm leading-snug">{ACADEMY_INFO.officeHours}</p>
                    <p className="text-slate-500 text-[11px] font-medium leading-tight">Excluding national holidays</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Geography Map Vector Block */}
            <div className="bg-white rounded-3xl p-6 border border-slate-150/60 shadow-sm space-y-4" id="campus-location-vector">
              <h4 className="font-extrabold text-sm text-slate-900 flex items-center space-x-1.5 pb-2 border-b border-slate-100">
                <MapPin className="w-4 h-4 text-amber-600 animate-bounce" />
                <span>School Campus Location Map</span>
              </h4>
              
              {/* Styled clean visual geography layout */}
              <div className="bg-indigo-50/50 rounded-2xl p-6 border border-indigo-100 relative h-48 flex flex-col justify-between overflow-hidden" id="maps-widget-mock">
                
                {/* Visual elements representing paths */}
                <div className="absolute inset-0 select-none opacity-30">
                  <div className="absolute top-1/2 left-0 right-0 h-4 bg-indigo-200 -translate-y-1/2"></div>
                  <div className="absolute top-0 bottom-0 left-1/3 w-4 bg-indigo-200"></div>
                  <div className="absolute top-0 bottom-0 left-2/3 w-4 bg-indigo-100 -rotate-12"></div>
                </div>

                <div className="relative z-10 self-start bg-slate-950 text-amber-400 px-3 py-1.5 rounded-lg text-[10px] uppercase font-serif tracking-wider font-extrabold shadow select-none">
                  742 Knowledge Way • Springfield
                </div>

                {/* Target Pin Marker */}
                <div className="absolute left-1/3 top-1/2 -ml-3 -mt-6 z-15 flex flex-col items-center">
                  <div className="bg-amber-500 text-slate-950 p-2 rounded-full shadow-lg border border-white animate-pulse">
                    <MapPin className="w-5 h-5 text-slate-950" />
                  </div>
                </div>

                <div className="relative z-10 self-end bg-white/90 backdrop-blur-sm p-2 rounded-lg border border-slate-100 text-[10px] text-slate-500 text-right uppercase tracking-wider font-bold">
                  Opposite Springfield City Park
                </div>
              </div>
            </div>
          </div>

          {/* Form Action Panel */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-slate-150/60 shadow-sm space-y-6">
            <div className="space-y-1 border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-lg text-slate-950">Inquire Instantly</h3>
              <p className="text-slate-500 text-xs sm:text-sm">Your queries are processed by our parent advocacy desk.</p>
            </div>

            {success && (
              <div className="bg-emerald-50 border border-emerald-250 text-emerald-900 rounded-2xl p-4 flex items-start space-x-3.5 animate-fade-in">
                <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-sm">Message Sent Successfully!</p>
                  <p className="text-xs text-emerald-700">Thank you for linking. Our administrative advocate will review your note and shoot an email response shortly.</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5 text-xs sm:text-sm" id="school-contact-form">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">Your Full Name *</label>
                  <input 
                    type="text" 
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Marie Henderson"
                    className="w-full bg-slate-50 border border-slate-200 focus:border-amber-550 focus:bg-white rounded-xl py-2.5 px-3 focus:outline-none text-slate-800"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">Your Email Address *</label>
                  <input 
                    type="email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. marie@domain.com"
                    className="w-full bg-slate-50 border border-slate-200 focus:border-amber-550 focus:bg-white rounded-xl py-2.5 px-3 focus:outline-none text-slate-800"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">Subject Field</label>
                <select 
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-amber-550 focus:bg-white rounded-xl py-2.5 px-3 focus:outline-none text-slate-850"
                >
                  <option>General Inquiry</option>
                  <option>Tuition & Sibling Fees</option>
                  <option>Campus Visits & Tours</option>
                  <option>Employment Opportunities</option>
                  <option>Feedback & Suggestions</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">Your Inquiry Message *</label>
                <textarea 
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  placeholder="e.g. Hello, I am writing to ask if your curriculum supports children transferring mid-semester in Grade 3..."
                  className="w-full bg-slate-50 border border-slate-200 focus:border-amber-550 focus:bg-white rounded-xl py-2.5 px-4 focus:outline-none text-slate-800"
                ></textarea>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full bg-slate-905 hover:bg-amber-500 text-white hover:text-slate-950 font-extrabold py-3.5 rounded-xl shadow transition duration-300 flex items-center justify-center space-x-2 select-none"
                >
                  <span>Send Message</span>
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Local submitted inquiries list */}
        {inquiries.length > 0 && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6 animate-fade-in" id="personal-inquiries-list">
            <div className="flex items-center space-x-2 border-b border-slate-150 pb-4">
              <MessagesSquare className="w-5 h-5 text-amber-600 animate-pulse" />
              <h3 className="font-extrabold text-lg text-slate-900">Your Communication Log</h3>
            </div>

            <div className="space-y-4 divide-y divide-slate-100">
              {inquiries.map((inq, index) => (
                <div key={index} className="pt-4 first:pt-0 space-y-2 text-xs sm:text-sm">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                    <p className="font-extrabold text-slate-950">Subject: {inq.subject}</p>
                    <p className="text-slate-400 font-mono text-[10px]">{inq.dateSubmitted}</p>
                  </div>
                  <p className="text-slate-600 italic leading-relaxed bg-slate-50/60 p-3.5 border-l-2 border-slate-300 rounded-r-lg">
                    &quot;{inq.message}&quot;
                  </p>
                  <p className="text-[10px] text-emerald-600 font-bold uppercase tracking-wider flex items-center gap-1">
                    <CheckCircle className="w-3 h-3 text-emerald-500" />
                    <span>Logged offline</span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
