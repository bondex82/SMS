/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { STAFF_MEMBERS, ACADEMY_INFO } from '../data/schoolData';
import { Target, Eye, BookOpen, Shield, ShieldAlert, Award, CalendarClock, School } from 'lucide-react';
import { StaffMember } from '../types';

export default function AboutSection() {
  const [selectedStaff, setSelectedStaff] = useState<StaffMember | null>(null);

  const historyMilestones = [
    { year: "2012", title: "Founding Year", desc: "Grace Junior Academy opened with just 2 classrooms and 14 eager students, set on a foundational pedagogy of individual attention and moral value integration." },
    { year: "2016", title: "STEM Launch", desc: "Built the first experiential junior Science & Technology play center, introducing scratch visual programming as a selective subject." },
    { year: "2020", title: "National Recognition", desc: "Awarded 'Most Holistic Junior School development framework' in the regional academic congress." },
    { year: "2024", title: "Smart-Green Initiative", desc: "Inaugurated solar arrays and garden permaculture layouts, allowing students to learn physics and ecosystems practically." }
  ];

  return (
    <div className="bg-slate-50 min-h-screen py-10" id="about-section-container">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-16">
        {/* Academic Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-1 bg-amber-500/10 text-amber-800 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
            <School className="w-3.5 h-3.5" />
            <span>Discover Grace Junior Academy</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">Our Roots & True Mission</h1>
          <p className="text-slate-600 text-sm leading-relaxed sm:text-base">
            Grace Junior Academy isn't merely a place of lectures — we are a dynamic crucible dedicated to forming analytical, compassionate, and robust future-minded citizens.
          </p>
        </div>

        {/* Mission, Vision, Philosophy Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8" id="about-mission-grid">
          <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm relative overflow-hidden group hover:border-amber-500/40 transition duration-300">
            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-full blur-xl -mr-6 -mt-6"></div>
            <div className="bg-blue-100/60 text-blue-900 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-950 mb-3">Our Core Mission</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              {ACADEMY_INFO.mission}
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm relative overflow-hidden group hover:border-blue-500/40 transition duration-300">
            <div className="absolute top-0 right-0 w-24 h-24 bg-amber-50 rounded-full blur-xl -mr-6 -mt-6"></div>
            <div className="bg-amber-100/60 text-amber-900 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
              <Eye className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-950 mb-3">Our Vision</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              {ACADEMY_INFO.vision}
            </p>
          </div>
        </div>

        {/* School Philosophy Statement with a beautiful quote format */}
        <div className="bg-slate-900 text-slate-100 rounded-3xl p-8 sm:p-12 shadow-sm relative overflow-hidden">
          <div className="absolute inset-0 bg-radial-gradient(ellipse at center, rgba(14,165,233,0.15) 0%, rgba(15,23,42,0) 70%)"></div>
          <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6">
            <h3 className="text-amber-400 font-extrabold text-xs uppercase tracking-widest">Our Guiding Principle</h3>
            <blockquote className="text-xl sm:text-2xl font-serif text-slate-100 italic leading-snug">
              &quot;{ACADEMY_INFO.motto}&quot;
            </blockquote>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              We focus on building cognitive security & confidence. Rather than teaching students simply what to expect on a test, we supply the critical thinking tools necessary to tackle environments with resilience, empathy, and academic resourcefulness.
            </p>
          </div>
        </div>

        {/* Timeline Historical Landmarks */}
        <div className="space-y-10" id="school-history">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h3 className="text-xs font-bold text-amber-600 uppercase tracking-widest flex justify-center items-center gap-1">
              <CalendarClock className="w-3.5 h-3.5" />
              <span>Milestones Timeline</span>
            </h3>
            <h4 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Our Evolutionary Path</h4>
          </div>

          <div className="relative border-l border-slate-200 ml-4 md:ml-12 md:max-w-4xl md:mx-auto space-y-8">
            {historyMilestones.map((stone, idx) => (
              <div key={idx} className="relative pl-8 group">
                {/* Timeline Dot Indicator */}
                <div className="absolute -left-1.5 top-1.5 bg-amber-500 w-3 h-3 rounded-full border-2 border-white ring-4 ring-amber-100/40 group-hover:bg-blue-900 transition duration-300"></div>
                <div className="bg-white p-6 rounded-2xl border border-slate-150/60 shadow-sm transition group-hover:shadow hover:border-slate-300 duration-300">
                  <span className="font-black text-amber-600 text-sm uppercase tracking-wide block mb-1">
                    {stone.year}
                  </span>
                  <h4 className="font-extrabold text-slate-950 text-base mb-2">{stone.title}</h4>
                  <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">{stone.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Administration and Faculty Directory */}
        <div className="space-y-10" id="faculty-section">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h3 className="text-xs font-bold text-blue-600 uppercase tracking-widest flex justify-center items-center gap-1">
              <Award className="w-3.5 h-3.5" />
              <span>Our Academic Leadership</span>
            </h3>
            <h4 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Meet Our Key Educators</h4>
            <p className="text-slate-500 text-sm">
              Certified subject experts specializing in holistic development paradigms and progressive primary teaching.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {STAFF_MEMBERS.map((staff) => (
              <div 
                key={staff.id}
                className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-md transition duration-300"
              >
                <div>
                  <div className="aspect-square relative overflow-hidden bg-slate-100">
                    <img 
                      src={staff.photoUrl} 
                      alt={staff.name} 
                      className="w-full h-full object-cover transition transform hover:scale-[1.04] duration-300"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="p-5 space-y-1.5">
                    <h5 className="font-extrabold text-slate-950 text-sm sm:text-base tracking-tight leading-tight">
                      {staff.name}
                    </h5>
                    <p className="text-xs font-bold text-amber-700 tracking-wider uppercase bg-amber-50 px-2 py-0.5 rounded inline-block">
                      {staff.role}
                    </p>
                    <p className="text-slate-500 text-xs leading-relaxed pt-2 line-clamp-3">
                      {staff.bio}
                    </p>
                  </div>
                </div>
                
                <div className="p-5 pt-0">
                  <button 
                    onClick={() => setSelectedStaff(staff)}
                    className="w-full text-center border border-slate-200 text-xs font-bold text-slate-700 py-2 rounded-lg hover:bg-slate-50 hover:border-slate-350 transition select-none"
                  >
                    Read full credentials
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Staff detailed credential Biography Modal overlay */}
      {selectedStaff && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl overflow-hidden shadow-xl max-w-lg w-full relative">
            <div className="p-6 space-y-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-4">
                  <img 
                    src={selectedStaff.photoUrl} 
                    alt={selectedStaff.name} 
                    className="w-16 h-16 rounded-xl object-cover border border-slate-200"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h4 className="font-extrabold text-slate-950 text-lg leading-tight">{selectedStaff.name}</h4>
                    <p className="text-xs font-bold text-amber-700 tracking-wider uppercase">{selectedStaff.role}</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <h5 className="font-bold text-slate-900 text-xs uppercase tracking-widest">Academic Biography</h5>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {selectedStaff.bio}
                </p>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-[11px] text-slate-500 space-y-1">
                  <p><strong>Affiliations:</strong> Springfield Primary Education Council, Junior STEM Society</p>
                  <p><strong>Focus:</strong> Non-cognitive skills, collaborative child frameworks, character design</p>
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button 
                  onClick={() => setSelectedStaff(null)}
                  className="bg-slate-900 text-white font-bold py-2.5 px-6 rounded-xl shadow hover:bg-slate-800 transition text-xs select-none"
                >
                  Close Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
