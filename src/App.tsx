/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ActiveTab } from './types';
import Navbar from './components/Navbar';
import HomeSection from './components/HomeSection';
import AboutSection from './components/AboutSection';
import AcademicsSection from './components/AcademicsSection';
import AdmissionsSection from './components/AdmissionsSection';
import NewsSection from './components/NewsSection';
import EventsSection from './components/EventsSection';
import GallerySection from './components/GallerySection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');

  const renderSection = () => {
    switch (activeTab) {
      case 'home':
        return <HomeSection setActiveTab={setActiveTab} />;
      case 'about':
        return <AboutSection />;
      case 'academics':
        return <AcademicsSection />;
      case 'admissions':
        return <AdmissionsSection />;
      case 'news':
        return <NewsSection />;
      case 'events':
        return <EventsSection />;
      case 'gallery':
        return <GallerySection />;
      case 'contact':
        return <ContactSection />;
      default:
        return <HomeSection setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 font-sans text-slate-800" id="main-school-app">
      {/* Structural Header Navigation */}
      <div className="print:hidden">
        <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
      
      {/* Content Canvas */}
      <main className="flex-grow" id="view-portal">
        {renderSection()}
      </main>
      
      {/* Academic Footer */}
      <div className="print:hidden">
        <Footer setActiveTab={setActiveTab} />
      </div>
    </div>
  );
}

