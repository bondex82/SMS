/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ActiveTab } from '../types';
import { ACADEMY_INFO, schoolCrest } from '../data/schoolData';
import { Landmark, ArrowRight, Phone, Mail, MapPin } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: ActiveTab) => void;
}

export default function Footer({ setActiveTab }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const handleLinkClick = (tabId: ActiveTab) => {
    setActiveTab(tabId);
    // Scroll smoothly to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Safely extract from localStorage if present
  const getSchoolSetting = (key: string, defaultValue: string) => {
    try {
      const saved = localStorage.getItem('gja_school_settings');
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed[key] ?? defaultValue;
      }
    } catch (e) {}
    return defaultValue;
  };

  const schoolName = getSchoolSetting('name', ACADEMY_INFO.name);
  const logoUrl = getSchoolSetting('logo', schoolCrest);
  const schoolPhone = getSchoolSetting('phone', ACADEMY_INFO.phone);
  const schoolEmail = getSchoolSetting('email', ACADEMY_INFO.email);
  const schoolAddress = getSchoolSetting('address', ACADEMY_INFO.address);
  const schoolMotto = getSchoolSetting('motto', ACADEMY_INFO.motto);
  const customFooter = getSchoolSetting('footer', `© ${currentYear} ${schoolName}. All Rights Reserved. Accredited Primary Institution.`);

  return (
    <footer className="bg-slate-905 text-slate-300 border-t border-slate-800" id="school-footer" style={{ backgroundColor: '#0f172a' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start border-b border-slate-800 pb-10">
          
          {/* Column 1: School Identity */}
          <div className="md:col-span-5 space-y-4">
            <div 
              className="flex items-center space-x-3 cursor-pointer group select-none"
              onClick={() => handleLinkClick('home')}
            >
              <div className="relative w-10 h-10 p-0.5 bg-slate-950/20 border border-slate-800 rounded-full flex items-center justify-center overflow-hidden">
                <img 
                  src={logoUrl} 
                  alt="School Crest Logo" 
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <div className="flex items-center space-x-1.5 uppercase leading-none">
                  <span className="font-extrabold text-white text-sm sm:text-base tracking-tight">
                    {schoolName.split(' ')[0] || "GRACE"}
                  </span>
                  <span className="text-amber-500 font-extrabold text-sm sm:text-base tracking-tight">
                    {schoolName.split(' ').slice(1).join(' ') || "JUNIOR ACADEMY"}
                  </span>
                </div>
                <p className="text-[9px] tracking-wider uppercase font-semibold text-slate-400 mt-1">PRIMARY EDUCATION</p>
              </div>
            </div>

            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              Nurturing children&apos;s natural curiosity with verified character development pathways and advanced experiential STEM classrooms.
            </p>

            <blockquote className="border-l-2 border-amber-500 pl-3 italic text-xs text-amber-500/90 font-mono font-medium">
              &quot;{schoolMotto}&quot;
            </blockquote>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-white font-black text-xs uppercase tracking-widest flex items-center space-x-1.5">
              <span>Quick Navigation</span>
            </h4>
            <ul className="grid grid-cols-2 gap-2 text-xs sm:text-sm">
              <li>
                <button 
                  onClick={() => handleLinkClick('home')}
                  className="text-slate-400 hover:text-amber-400 transition"
                >
                  Home
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLinkClick('about')}
                  className="text-slate-400 hover:text-amber-400 transition"
                >
                  About
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLinkClick('academics')}
                  className="text-slate-400 hover:text-amber-400 transition"
                >
                  Curriculum
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLinkClick('admissions')}
                  className="text-slate-400 hover:text-amber-400 transition"
                >
                  Admissions
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLinkClick('news')}
                  className="text-slate-400 hover:text-amber-400 transition"
                >
                  News & Events
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLinkClick('gallery')}
                  className="text-slate-400 hover:text-amber-400 transition"
                >
                  Gallery
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLinkClick('contact')}
                  className="text-slate-400 hover:text-amber-400 transition h-auto"
                >
                  Contact Desk
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Summary */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-white font-black text-xs uppercase tracking-widest">
              SCHOOL ADDRESS
            </h4>
            <ul className="space-y-3.5 text-xs text-slate-400">
              <li className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0 select-none mt-0.5" />
                <span>{schoolAddress}</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <Phone className="w-4 h-4 text-amber-500 shrink-0 select-none font-sans" />
                <span>{schoolPhone}</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <Mail className="w-4 h-4 text-amber-500 shrink-0 select-none" />
                <span>{schoolEmail}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Base Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 text-xs text-slate-500">
          <p>{customFooter}</p>
          <div className="flex space-x-4">
            <a href={ACADEMY_INFO.socials.facebook} target="_blank" rel="noreferrer" className="hover:text-amber-500 transition">Facebook</a>
            <a href={ACADEMY_INFO.socials.twitter} target="_blank" rel="noreferrer" className="hover:text-amber-500 transition">Twitter</a>
            <a href={ACADEMY_INFO.socials.instagram} target="_blank" rel="noreferrer" className="hover:text-amber-500 transition">Instagram</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
