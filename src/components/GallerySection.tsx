/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { GALLERY_ITEMS } from '../data/schoolData';
import { GalleryItem } from '../types';
import { Images, Eye, X, ZoomIn, ArrowRightLeft } from 'lucide-react';

export default function GallerySection() {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);

  const categories = ['All', 'Classroom', 'Science', 'Sports', 'Arts', 'Events'];

  const filteredItems = GALLERY_ITEMS.filter((item) => {
    return activeCategory === 'All' || item.category === activeCategory;
  });

  return (
    <div className="bg-slate-50 min-h-screen py-10" id="gallery-section-container">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
        {/* Gallery Title Block */}
        <div className="text-center max-w-3xl mx-auto space-y-4 pb-4 border-b border-slate-200">
          <div className="inline-flex items-center space-x-1.5 bg-amber-500/10 text-amber-800 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border border-amber-200/50">
            <Images className="w-4 h-4" />
            <span>Campus Lens</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">Our School Life in Action</h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Browse through active moments from our interactive smart classrooms, athletic meets, physics challenges, and custom artistic craft presentations.
          </p>
        </div>

        {/* Dynamic categories switcher */}
        <div className="flex flex-wrap items-center justify-center gap-2" id="gallery-category-chips">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition select-none ${
                activeCategory === cat
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-white text-slate-600 border border-slate-250/60 hover:bg-slate-100 hover:text-slate-950'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Dynamic Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" id="gallery-images-parent">
          {filteredItems.map((item) => (
            <div 
              key={item.id} 
              id={`gallery-item-${item.id}`}
              onClick={() => setLightboxItem(item)}
              className="bg-white rounded-2xl border border-slate-150/60 shadow-sm overflow-hidden group cursor-pointer hover:shadow-md transition duration-300 transform hover:-translate-y-0.5"
            >
              <div className="aspect-square relative overflow-hidden bg-slate-100">
                <img 
                  src={item.imageUrl} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition duration-500 transform group-hover:scale-[1.03]"
                  referrerPolicy="no-referrer"
                />
                
                {/* Overlay hover effect */}
                <div className="absolute inset-0 bg-slate-950/45 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center p-4">
                  <div className="text-center text-white space-y-2 transform translate-y-3 group-hover:translate-y-0 transition duration-300">
                    <div className="bg-white/20 p-2.5 rounded-full inline-block backdrop-blur-md">
                      <ZoomIn className="w-5 h-5 text-white" />
                    </div>
                    <p className="font-extrabold text-sm sm:text-base leading-tight">{item.title}</p>
                    <span className="bg-amber-500 text-slate-950 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-widest select-none shadow">
                      {item.category}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox full-size Viewer Overlay */}
      {lightboxItem && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-sm flex items-center justify-center p-4">
          
          {/* Close trigger overlay area */}
          <div className="absolute inset-0 z-10" onClick={() => setLightboxItem(null)}></div>
          
          {/* Main content modal */}
          <div className="bg-white rounded-3xl overflow-hidden shadow-2xl max-w-xl w-full relative z-20 flex flex-col max-h-[85vh]">
            
            {/* Instant Close floating pill */}
            <button
              onClick={() => setLightboxItem(null)}
              className="absolute top-4 right-4 z-30 bg-white/95 text-slate-800 hover:bg-slate-100 p-2 rounded-full shadow hover:scale-105 transition"
              aria-label="Close image lightbox"
            >
              <X className="w-5 h-5 focus:outline-none" />
            </button>

            {/* Photo frame */}
            <div className="aspect-4/3 relative bg-slate-950 overflow-hidden shrink-0 flex items-center justify-center">
              <img 
                src={lightboxItem.imageUrl} 
                alt={lightboxItem.title} 
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Metadata explanation Panel */}
            <div className="p-6 space-y-3 bg-white">
              <div className="flex items-center justify-between gap-4">
                <h4 className="font-extrabold text-slate-950 text-lg leading-tight">
                  {lightboxItem.title}
                </h4>
                <span className="bg-amber-100 text-amber-900 border border-amber-200/50 text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider select-none shrink-0 text-center">
                  {lightboxItem.category}
                </span>
              </div>
              <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                {lightboxItem.description}
              </p>
            </div>
            
            <div className="p-4 bg-slate-50 border-t border-slate-100 text-right">
              <button 
                onClick={() => setLightboxItem(null)}
                className="bg-slate-900 text-white font-extrabold py-2 px-5 rounded-lg hover:bg-slate-800 transition text-xs select-none"
              >
                Close Viewer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
