/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { NEWS_ARTICLES } from '../data/schoolData';
import { NewsArticle } from '../types';
import { Megaphone, Search, Calendar, User, ArrowRight, BookOpen, X } from 'lucide-react';

export default function NewsSection() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeArticle, setActiveArticle] = useState<NewsArticle | null>(null);

  const categories = ['All', 'Announcement', 'Event', 'Achievement', 'Newsletter'];

  const filteredArticles = NEWS_ARTICLES.filter((art) => {
    const matchesSearch = 
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.content.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCat = selectedCategory === 'All' || art.category === selectedCategory;
    
    return matchesSearch && matchesCat;
  });

  return (
    <div className="bg-slate-50 min-h-screen py-10" id="news-section-container">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
        {/* News Title & Search Desk */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-200">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center space-x-1 bg-amber-500/10 text-amber-800 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest border border-amber-200/50">
              <Megaphone className="w-3.5 h-3.5" />
              <span>Campus Notice Board</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">News & Happenings</h1>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Stay fully informed on regional student competitions, parent-teacher dates, and circular advisories direct from our administrative departments.
            </p>
          </div>

          {/* Search bar widget */}
          <div className="relative max-w-md w-full" id="news-search-box">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <Search className="w-4 h-4 text-slate-400" />
            </div>
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search announcements, tags, blogs..."
              className="w-full bg-white border border-slate-200 rounded-xl py-3 pl-11 pr-4 focus:outline-none focus:ring-2 focus:ring-amber-500 text-slate-800 text-sm shadow-sm"
            />
          </div>
        </div>

        {/* Category filtering pills */}
        <div className="flex flex-wrap items-center gap-2" id="news-category-filters">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition select-none ${
                selectedCategory === cat
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Notice articles grid layout */}
        {filteredArticles.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-150/60 shadow-sm max-w-md mx-auto space-y-3">
            <div className="text-4xl">🗒️</div>
            <h3 className="font-extrabold text-slate-900 text-base">No Matching Notices</h3>
            <p className="text-slate-500 text-xs sm:text-sm">We couldn't locate any school circulars corresponding to your keywords. Try widening your search boundaries!</p>
            <button 
              onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
              className="bg-slate-900 text-white text-xs font-bold py-2 px-5 rounded-lg hover:bg-slate-800 transition"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8" id="news-feed-grid">
            {filteredArticles.map((art) => (
              <div 
                key={art.id} 
                className="bg-white rounded-2xl border border-slate-150/60 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-md transition duration-300 group"
              >
                <div>
                  <div className="aspect-video relative overflow-hidden bg-slate-50 border-b border-slate-100">
                    <img 
                      src={art.imageUrl} 
                      alt={art.title} 
                      className="w-full h-full object-cover group-hover:scale-[1.01] transition duration-550"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-4 left-4 bg-slate-900/90 backdrop-blur-sm px-3 py-1.5 rounded-lg text-white font-bold text-xs shadow select-none uppercase tracking-wider">
                      {art.category}
                    </div>
                  </div>

                  <div className="p-6 space-y-4">
                    <div className="flex items-center space-x-4 text-[11px] text-slate-400 font-medium">
                      <span className="flex items-center space-x-1">
                        <Calendar className="w-3.5 h-3.5 text-amber-500" />
                        <span>{art.date}</span>
                      </span>
                      <span className="flex items-center space-x-1 text-slate-500 font-bold">
                        <User className="w-3.5 h-3.5" />
                        <span>By {art.author}</span>
                      </span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-extrabold text-slate-950 tracking-tight leading-tight group-hover:text-blue-900 transition">
                      {art.title}
                    </h3>
                    <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                      {art.summary}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-slate-50 mt-4">
                  <button 
                    onClick={() => setActiveArticle(art)}
                    className="w-full text-center bg-slate-50 hover:bg-amber-55/20 border border-slate-200 text-xs font-bold text-slate-700 hover:text-amber-900 py-3 rounded-xl transition flex items-center justify-center space-x-1 select-none"
                  >
                    <span>Read Full Article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Notice Detail full view Modal Pop-up */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl overflow-hidden shadow-2xl max-w-2xl w-full max-h-[85vh] flex flex-col relative">
            
            {/* Top Close Button */}
            <button
              onClick={() => setActiveArticle(null)}
              className="absolute top-4 right-4 z-20 bg-white/95 backdrop-blur-sm hover:bg-slate-100 text-slate-705 p-2 rounded-full shadow hover:scale-105 transition"
              aria-label="Close article modal"
            >
              <X className="w-5 h-5 focus:outline-none" />
            </button>

            <div className="overflow-y-auto divide-y divide-slate-100 flex-1">
              {/* Cover Banner */}
              <div className="aspect-video relative overflow-hidden bg-slate-50">
                <img 
                  src={activeArticle.imageUrl} 
                  alt={activeArticle.title} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-5 left-6 text-white space-y-1">
                  <span className="bg-amber-500 text-slate-950 px-2.5 py-1 rounded text-[10px] font-black uppercase tracking-wider select-none shadow">
                    {activeArticle.category}
                  </span>
                  <p className="text-[11px] text-slate-200 font-bold font-mono pt-1.5 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-amber-400" />
                    <span>{activeArticle.date} • Published by {activeArticle.author}</span>
                  </p>
                </div>
              </div>

              {/* Text Area */}
              <div className="p-6 sm:p-8 space-y-4">
                <h2 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight leading-snug">
                  {activeArticle.title}
                </h2>
                
                <p className="text-slate-600 text-xs sm:text-sm font-semibold bg-slate-50 border-l-4 border-amber-500 p-4 rounded-r-xl">
                  {activeArticle.summary}
                </p>

                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed whitespace-pre-line pt-2">
                  {activeArticle.content}
                </p>
              </div>
            </div>

            <div className="p-5 bg-slate-50 border-t border-slate-100 text-right">
              <button 
                onClick={() => setActiveArticle(null)}
                className="bg-slate-900 text-white font-extrabold py-2.5 px-6 rounded-xl hover:bg-slate-800 shadow transition text-xs select-none"
              >
                Done Reading
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
