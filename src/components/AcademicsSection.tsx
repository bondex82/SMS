/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { CURRICULUM_GRADES } from '../data/schoolData';
import { GraduationCap, Award, Palette, Music, Apple, Code, BookText, Compass } from 'lucide-react';

export default function AcademicsSection() {
  const [selectedGradeIdx, setSelectedGradeIdx] = useState(0);

  const activeGrade = CURRICULUM_GRADES[selectedGradeIdx];

  const coCurricularClubs = [
    { title: "Robotics & Visual Coding", desc: "Building physical block-controllers with visual scratch commands.", icon: Code, color: "text-blue-600 bg-blue-50 border-blue-100" },
    { title: "Junior Writers & Debate Council", desc: "Cultivating presentation, storytelling confidence, and clear speech structures.", icon: BookText, color: "text-purple-600 bg-purple-50 border-purple-100" },
    { title: "Orchestra & Percussion Band", desc: "Understanding musical theory, flute, woodwinds, and collaborative chime play.", icon: Music, color: "text-rose-600 bg-rose-50 border-rose-100" },
    { title: "Fluid & Fine Arts Studio", desc: "Saturated canvas coloring, watercolor techniques, pottery molding, and seasonal carving.", icon: Palette, color: "text-amber-600 bg-amber-55/10 border-amber-200" },
    { title: "Organic Permaculture & Gardening", desc: "Soil science, planting organic greens, composting cycle audits, and butterfly sanctuaries.", icon: Apple, color: "text-emerald-600 bg-emerald-50 border-emerald-100" },
    { title: "Outdoor Eco-Scouts", desc: "First-aid essentials, campsite coordination, direction maps, and local botany study.", icon: Compass, color: "text-cyan-600 bg-cyan-50 border-cyan-100" }
  ];

  return (
    <div className="bg-slate-50 min-h-screen py-10" id="academics-section-container">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-16">
        {/* Academics Title */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-1 bg-blue-100 text-blue-900 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border border-blue-200">
            <GraduationCap className="w-3.5 h-3.5 text-blue-700" />
            <span>Academic Excellence</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">Our Curriculum Levels</h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            We operate a highly tailored, developmentally appropriate syllabus that balances critical math-logic modules with extensive fine arts, creative writing, and physical education.
          </p>
        </div>

        {/* Dynamic Class Levels Nav Selector */}
        <div className="flex flex-col md:flex-row bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-sm" id="grade-curriculum-tabs">
          <div className="md:w-1/3 bg-slate-900 md:border-r border-slate-800 p-4 divide-y divide-slate-800" id="tab-controls">
            <p className="text-[10px] text-amber-500 font-bold uppercase tracking-widest px-4 py-3 select-none">
              Explore Active Syllabi
            </p>
            {CURRICULUM_GRADES.map((grade, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedGradeIdx(idx)}
                className={`w-full text-left font-bold text-xs sm:text-sm p-4 block tracking-wide select-none transition ${
                  selectedGradeIdx === idx
                    ? 'text-white bg-slate-800 border-l-4 border-amber-500'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-850'
                }`}
              >
                <div className="font-extrabold">{grade.gradeLevel}</div>
                <div className="text-[11px] text-slate-500 font-medium font-mono">{grade.ageGroup}</div>
              </button>
            ))}
          </div>

          <div className="md:w-2/3 p-6 sm:p-10 space-y-8" id="tab-content-portal">
            <div className="space-y-2 border-b border-slate-100 pb-5">
              <span className="text-[10px] font-bold text-amber-600 uppercase tracking-widest bg-amber-50 px-2.5 py-1 rounded inline-block">
                Level Focus
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-950 tracking-tight">
                {activeGrade.gradeLevel}
              </h3>
              <p className="text-slate-500 font-serif italic text-xs sm:text-sm">
                Target Age Group: {activeGrade.ageGroup}
              </p>
              <p className="text-slate-600 text-sm leading-relaxed pt-2">
                <strong>Core Pediatric Objective:</strong> {activeGrade.curriculumFocus}
              </p>
            </div>

            <div className="space-y-6">
              <h4 className="font-black text-slate-900 text-xs sm:text-sm uppercase tracking-wider">
                Key Classroom Modules
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {activeGrade.subjects.map((sub, sIdx) => (
                  <div 
                    key={sIdx} 
                    className="p-5 rounded-xl border border-slate-100 bg-slate-50 hover:bg-white hover:border-slate-250 transition duration-200 flex flex-col justify-between"
                  >
                    <div>
                      <h5 className="font-bold text-slate-900 text-sm mb-1.5">{sub.name}</h5>
                      <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">{sub.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Co-Curricular & Extracurriculars */}
        <div className="space-y-10" id="cocurriculars">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h3 className="text-xs font-bold text-amber-600 uppercase tracking-widest flex justify-center items-center gap-1">
              <Award className="w-3.5 h-3.5" />
              <span>Beyond the Classroom</span>
            </h3>
            <h4 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Co-Curricular Clubs</h4>
            <p className="text-slate-500 text-sm leading-relaxed">
              We highly encourage student involvement in diverse physical, technological, and creative fields to cultivate well-rounded mental frameworks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coCurricularClubs.map((club, idx) => {
              const IconComp = club.icon;
              return (
                <div 
                  key={idx} 
                  className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-start space-x-4 hover:shadow hover:border-slate-300 transition duration-300"
                >
                  <div className={`p-3 rounded-xl border ${club.color} shrink-0`}>
                    <IconComp className="w-5 h-5" />
                  </div>
                  <div className="space-y-1.5">
                    <h5 className="font-extrabold text-slate-900 text-sm sm:text-base">{club.title}</h5>
                    <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">{club.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
