'use client';

import { useState } from 'react';
import SectionHeading from '@/components/ui/SectionHeading';
import GalleryGrid from '@/components/gallery/GalleryGrid';
import Image from 'next/image';

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState<'all' | 'cabin' | 'conference' | 'workstation' | 'outside'>('all');

  const categories = [
    { id: 'all', label: 'Our office' },
    { id: 'cabin', label: 'Executive Cabins' },
    { id: 'conference', label: 'Conference Suites' },
    { id: 'workstation', label: 'Workspaces & Corridors' },
    { id: 'outside', label: 'Exterior & Building' },
  ] as const;

  return (
    <div className="bg-[#0F1B2D] min-h-screen text-white">
      {/* Hero Header */}
      <section className="relative h-[45vh] sm:h-[50vh] md:h-[60vh] min-h-[340px] sm:min-h-[440px] w-full flex items-center justify-center pt-20">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/images/executive cabin/executive-cabin-05.jpg" 
            alt="Our Chambers" 
            fill 
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-[#0F1B2D]/80 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F1B2D] via-[#0F1B2D]/40 to-transparent" />
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <p className="text-xs sm:text-sm uppercase tracking-[0.35em] text-[#C9A45C] font-semibold mb-4 font-body text-center ml-[0.35em]">
               Our office
          </p>
          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl mb-6 tracking-tight">
            Our Workspace
          </h1>
          <p className="font-body text-lg sm:text-xl text-white/80 max-w-2xl mx-auto font-light leading-relaxed text-center">
            A glimpse into our professional workspace and client consultation facilities.
          </p>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-12 sm:py-16 lg:py-24 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-4 sm:gap-6">
          <SectionHeading 
            title="Firm Environment" 
            subtitle="Professional conference rooms, private executive chambers, and research facilities."
          />
        </div>

        {/* Category Filters */}
        <div className="flex gap-2 sm:gap-2.5 mb-8 sm:mb-12 pb-4 border-b border-white/10 overflow-x-auto scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-sm font-body text-[11px] sm:text-sm tracking-wider uppercase transition-all duration-300 whitespace-nowrap flex-shrink-0 ${
                activeCategory === cat.id
                  ? 'bg-[#0B2A52] text-white shadow-lg'
                  : 'bg-white/5 hover:bg-white/10 text-white/70 border border-white/10'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
        
        <GalleryGrid filter={activeCategory} />
      </section>
    </div>
  );
}
