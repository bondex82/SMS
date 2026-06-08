/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ActiveTab } from '../types';
import { Menu, X, Phone, Calendar, ShieldCheck, Mail } from 'lucide-react';
import { schoolCrest, ACADEMY_INFO } from '../data/schoolData';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
}

export default function Navbar({ activeTab, setActiveTab }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

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

  const navItems: { id: ActiveTab; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'academics', label: 'Academics' },
    { id: 'admissions', label: 'Admissions' },
    { id: 'news', label: 'News' },
    { id: 'events', label: 'Events' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'contact', label: 'Contact' }
  ];

  const handleTabClick = (tabId: ActiveTab) => {
    setActiveTab(tabId);
    setIsOpen(false);
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 w-full" id="school-header">
      {/* Upper Info Row */}
      <div className="bg-slate-900 text-slate-300 text-xs py-2 px-4 sm:px-6 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <span className="flex items-center space-x-1.5 hover:text-amber-400 cursor-pointer transition">
              <Phone className="w-3.5 h-3.5" />
              <span>{schoolPhone}</span>
            </span>
            <span className="flex items-center space-x-1.5 hover:text-amber-400 cursor-pointer transition">
              <Mail className="w-3.5 h-3.5" />
              <span>{schoolEmail}</span>
            </span>
          </div>
          <div className="flex items-center space-x-6">
            <span className="flex items-center space-x-1.5">
              <Calendar className="w-3.5 h-3.5 text-amber-500" />
              <span>Office: {ACADEMY_INFO.officeHours}</span>
            </span>
            <span className="bg-amber-600 hover:bg-amber-500 text-slate-950 font-semibold px-2.5 py-0.5 rounded transition text-[11px] flex items-center space-x-1">
              <ShieldCheck className="w-3 h-3" />
              <span>A Leading Standard</span>
            </span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm py-3 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Logo Brand Title */}
          <div 
            className="flex items-center space-x-3 cursor-pointer group select-none"
            onClick={() => handleTabClick('home')}
            id="brand-logo"
          >
            <div className="relative w-11 h-11 p-0.5 bg-slate-50 border border-slate-200/80 rounded-full flex items-center justify-center shadow-sm overflow-hidden group-hover:scale-105 group-hover:border-amber-500/50 transition duration-300">
              <img 
                src={logoUrl} 
                alt="School Crest Logo" 
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <div className="flex items-center space-x-1.5 leading-none">
                <span className="font-extrabold text-base sm:text-lg tracking-tight text-slate-900 group-hover:text-blue-900 transition uppercase">
                  {schoolName.split(' ')[0] || "GRACE"}
                </span>
                <span className="text-amber-600 font-extrabold text-base sm:text-lg tracking-tight uppercase">
                  {schoolName.split(' ').slice(1).join(' ') || "JUNIOR ACADEMY"}
                </span>
              </div>
              <p className="text-[9px] tracking-wider uppercase font-extrabold text-slate-400 mt-0.5">
                EDUCATION PORTAL
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-1" id="desktop-links">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => handleTabClick(item.id)}
                  className={`text-sm font-semibold px-4 py-2 rounded-md transition duration-200 select-none ${
                    isActive
                      ? 'bg-amber-500/10 text-amber-900 border-b-2 border-amber-500'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          <div className="hidden lg:flex items-center ml-2">
            <button
              onClick={() => handleTabClick('admissions')}
              className="bg-slate-900 hover:bg-amber-600 text-white hover:text-slate-950 text-sm font-bold px-5 py-2.5 rounded-lg shadow-sm hover:shadow transition duration-300 select-none transform hover:-translate-y-0.5"
              id="cta-admission-btn"
            >
              Apply Online
            </button>
          </div>

          {/* Mobile Hamburger Menu Toggle */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-600 hover:text-slate-900 hover:bg-slate-100 p-2 rounded-full transition focus:outline-none"
              aria-label="Toggle navigation menu"
              id="mobile-menu-hamburger"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {isOpen && (
          <div className="lg:hidden mt-3 pt-2 pb-4 border-t border-slate-100 space-y-1" id="mobile-dropdown">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`mobile-nav-link-${item.id}`}
                  onClick={() => handleTabClick(item.id)}
                  className={`w-full text-left text-sm font-bold px-4 py-3 rounded-lg transition select-none ${
                    isActive
                      ? 'bg-amber-50 text-amber-900 font-extrabold border-l-4 border-amber-500'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
            <div className="px-4 pt-3 border-t border-slate-100">
              <button
                onClick={() => handleTabClick('admissions')}
                className="w-full text-center bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold py-3 rounded-lg shadow-sm transition"
              >
                Apply Online
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
