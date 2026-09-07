import { FIRM, ABOUT, COMMITMENTS, KEY_STRENGTHS } from '@/lib/constants';
import SectionHeading from '@/components/ui/SectionHeading';

import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="bg-[#0F1B2D] min-h-screen text-white">
      {/* Hero Header */}
      <section className="relative h-[50vh] sm:h-[60vh] md:h-[70vh] min-h-[380px] sm:min-h-[480px] w-full flex items-center justify-center pt-20">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/images/executive cabin/executive-cabin-03.jpg" 
            alt="About Prime Law Bharat" 
            fill 
            sizes="100vw"
            quality={90}
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-[#0F1B2D]/75 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F1B2D] via-[#0F1B2D]/40 to-transparent" />
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <p className="text-xs sm:text-sm uppercase tracking-[0.3em] text-[#C9A45C] font-semibold mb-4 font-body text-center ml-[0.3em]">
            About The Firm
          </p>
          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl mb-6 tracking-tight">
            Prime Law <span className="tiranga-gradient">Bharat</span>
          </h1>
          <p className="font-body text-lg sm:text-xl md:text-2xl text-white/80 max-w-3xl mx-auto font-light leading-relaxed text-center">
            {FIRM.tagline}
          </p>
        </div>
      </section>

      {/* About Introduction */}
      <section className="py-14 sm:py-20 lg:py-24 px-4 sm:px-6 md:px-12 max-w-4xl mx-auto space-y-6 sm:space-y-8">
        <p className="font-body text-lg md:text-xl leading-relaxed text-white/90 font-light text-justify">
          {ABOUT.intro}
        </p>
        <p className="font-body text-lg md:text-xl leading-relaxed text-white/80 font-light text-justify">
          {ABOUT.foundation}
        </p>
      </section>

      {/* Commitments */}
      <section className="py-14 sm:py-20 lg:py-24 bg-[#14233A] px-4 sm:px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <SectionHeading title="Our Commitments" center />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mt-10 sm:mt-16">
            {COMMITMENTS.map((commitment, index) => (
              <div key={index} className="bg-white/5 border border-white/10 px-5 pt-5 pb-4 sm:px-6 sm:pt-6 sm:pb-5 rounded-sm hover:border-[#0B2A52]/50 transition-all duration-300">
                <div className="w-10 h-[2px] bg-[#C9A45C] mb-5" />
                <h3 className="font-heading text-2xl mb-4 text-white">{commitment.title}</h3>
                <p className="font-body text-white/70 leading-relaxed text-justify">{commitment.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience & Strengths */}
      <section className="py-14 sm:py-20 lg:py-24 px-4 sm:px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            <div className="lg:col-span-7">
              <SectionHeading title="Our Experience" />
              <div className="space-y-6 text-white/80 mt-8 font-body text-base sm:text-lg leading-relaxed text-justify">
                <p>{ABOUT.experience}</p>
                <p>{ABOUT.experienceDetail}</p>
                <p className="text-white font-medium">{ABOUT.experienceClosing}</p>
              </div>
            </div>
            
            <div className="lg:col-span-5 bg-white/5 border border-white/10 p-8 md:p-10 rounded-sm">
              <h3 className="font-heading text-2xl text-white mb-6">Key Strengths</h3>
              <div className="w-12 h-[2px] bg-[#0B2A52] mb-6" />
              <ul className="space-y-5">
                {KEY_STRENGTHS.map((strength, index) => (
                  <li key={index} className="flex items-center space-x-4">
                    <span className="w-2 h-2 rounded-full bg-[#C9A45C]" />
                    <span className="font-body text-lg text-white/90">{strength}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Where We Practice */}
      <section className="py-14 sm:py-20 lg:py-24 bg-[#14233A] px-4 sm:px-6 md:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <SectionHeading title="Where We Practice" center />
          <p className="mt-8 text-white/80 font-body text-base sm:text-lg leading-relaxed mb-10 text-justify">
            {ABOUT.whereWePractice}
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {FIRM.states.map((state, index) => (
              <span key={index} className="px-5 py-2.5 rounded-sm border border-white/20 bg-white/5 text-white/90 font-body text-sm tracking-wide">
                {state}
              </span>
            ))}
          </div>
        </div>
      </section>

     
      {/* Closing Commitment Quote */}
      <section className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 text-center max-w-4xl mx-auto">
        <p className="font-body text-lg sm:text-xl text-white/80 mb-12 leading-relaxed text-justify">
          {ABOUT.commitment}
        </p>
        <div className="w-16 h-[2px] bg-[#C9A45C] mx-auto mb-10" />
        <blockquote className="font-heading text-2xl sm:text-3xl md:text-4xl italic text-white leading-relaxed">
          &ldquo;{FIRM.closingQuote}&rdquo;
        </blockquote>
        <div className="mt-20 relative w-full h-[300px] sm:h-[400px] md:h-[500px] overflow-hidden rounded-sm border border-white/10">
          <Image 
            src="/images/about.jpeg" 
            alt="About Prime Law Bharat" 
            fill 
            className="object-cover"
          />
        </div>
      </section>
    </div>
  );
}
