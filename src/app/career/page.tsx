import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ArrowDown } from 'lucide-react';
import { FIRM } from '@/lib/constants';
import CareerForm from '@/components/career/CareerForm';

export const metadata = {
  title: 'Careers | Prime Law Bharat',
  description: 'Join Prime Law Bharat. Opportunities for lawyers, interns, and legal professionals.',
};

export default function CareerPage() {
  const OPPORTUNITIES = [
    { title: "Junior Advocates", desc: "Begin your litigation career with hands-on court exposure.", exposure: "Trial Courts, Drafting, Legal Research" },
    { title: "Associate Lawyers", desc: "Take on independent matters and develop case strategy.", exposure: "High Court, Tribunals, Client Conferences" },
    { title: "Law Students / Legal Interns", desc: "Gain practical insights into real courtroom litigation.", exposure: "Court Visits, Brief Preparation, Research" },
    { title: "Trainees", desc: "Structured learning across different practice areas.", exposure: "Multi-Forum Advocacy, Case Documentation" },
    { title: "Legal Researchers", desc: "Support complex litigation with deep legal analysis.", exposure: "Case-Law Research, Strategy Development" },
    { title: "Litigation Associates", desc: "Manage matters across specialized tribunals and courts.", exposure: "RERA, DRT, NCLT, Commercial Courts" }
  ];

  const WHY_US = [
    { title: "Broad Legal Exposure", desc: "Work across different areas of litigation and legal practice." },
    { title: "Multi-Forum Experience", desc: "Understand how matters progress across courts, tribunals and appellate forums." },
    { title: "Practical Learning", desc: "Develop skills through real legal research, drafting and case preparation." },
    { title: "Mentorship & Collaboration", desc: "Learn alongside experienced advocates and legal professionals." },
    { title: "Strategic Thinking", desc: "Understand not just the law, but how legal strategy is developed and implemented." },
    { title: "Professional Growth", desc: "Build the skills, discipline and courtroom awareness required for a long-term legal career." }
  ];

  return (
    <div className="bg-[#0A1220] min-h-screen text-white">
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 sm:pt-32 sm:pb-24 lg:pt-40 lg:pb-32 flex items-center min-h-[70vh] sm:min-h-[85vh]">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/conference-room/conference-room-01.jpg"
            alt="Prime Law Bharat Chambers"
            fill
            sizes="100vw"
            quality={90}
            className="object-cover filter grayscale contrast-125 brightness-[0.4]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A1220] via-[#0F1B2D]/90 to-[#0A1220]/80" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 lg:px-16 w-full">
          <div className="max-w-3xl">
            <p className="text-sm uppercase tracking-[0.3em] text-[#C9A45C] font-semibold mb-6">Careers</p>
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-7xl text-white tracking-tight leading-tight mb-8">
              Build Your Legal Career With Prime Law Bharat
            </h1>
            <p className="text-lg md:text-xl text-white/80 font-body leading-relaxed mb-10 text-justify">
              Prime Law Bharat welcomes lawyers, law students, interns, and legal professionals who are looking to develop their practice through meaningful exposure to litigation, legal research, drafting, and courtroom work.
            </p>
            <div className="flex flex-col sm:flex-row gap-5">
              <a href="#apply" className="btn-khaitan-accent group inline-flex justify-center">
                <span>Apply to Join Us</span>
                <ArrowDown className="btn-arrow w-4 h-4" />
              </a>
             
            </div>
          </div>
        </div>
      </section>

      


      {/* Dedicated Sections */}
      <section className="py-14 sm:py-20 lg:py-24 bg-[#0A1220]">
        <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
            
            {/* For Students */}
            <div className="border border-white/10 p-8 md:p-10 bg-white/[0.02]">
              <p className="text-xs uppercase tracking-widest text-[#C9A45C] font-semibold mb-4">For Law Students & Interns</p>
              <h3 className="font-heading text-3xl sm:text-4xl text-white mb-6">Learn Through Real Legal Work</h3>
              <p className="text-white/70 font-body mb-8 leading-relaxed text-justify">
                Interns and trainees gain exposure to practical legal work, bridging the gap between academic theory and courtroom reality:
              </p>
              <ul className="space-y-4">
                {['Legal research', 'Case-law research', 'Drafting assistance', 'Brief preparation', 'Court and tribunal proceedings', 'Case documentation', 'Understanding litigation strategy', 'Legal analysis'].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="text-[#C9A45C] mt-1">•</span>
                    <span className="text-white/80 font-body">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* For Associates */}
            <div className="border border-white/10 p-8 md:p-10 bg-[#0F1B2D]">
              <p className="text-xs uppercase tracking-widest text-[#C9A45C] font-semibold mb-4">For Lawyers & Associates</p>
              <h3 className="font-heading text-3xl sm:text-4xl text-white mb-6">Grow Your Practice With Us</h3>
              <p className="text-white/70 font-body mb-8 leading-relaxed text-justify">
                Lawyers and associates work across a broad litigation practice and gain exposure to matters involving:
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {['Civil Litigation', 'Criminal Litigation', 'Corporate & Commercial Disputes', 'Property & Real Estate', 'RERA', 'Consumer Matters', 'Financial & Regulatory Disputes', 'DRT / DRAT', 'High Court & Supreme Court Matters', 'Family & Matrimonial Matters'].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="text-[#C9A45C] mt-1">•</span>
                    <span className="text-white/80 font-body text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
          </div>
        </div>
      </section>

      {/* Why Choose Us & Who Should Apply */}
      <section className="py-14 sm:py-20 lg:py-24 bg-[#0F1B2D]">
        <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16">
          
          <div className="text-center mb-16">
            <h2 className="section-title mb-6">Why Build Your Career Here?</h2>
            <div className="w-16 h-[2px] bg-[#C9A45C] mx-auto" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
            {WHY_US.map((item, idx) => (
              <div key={idx} className="p-6">
                <h4 className="font-heading text-xl text-white mb-3">{item.title}</h4>
                <p className="text-white/60 font-body text-sm leading-relaxed text-left">{item.desc}</p>
              </div>
            ))}
          </div>


        </div>
      </section>

      {/* Application Form */}
      <section id="apply" className="py-14 sm:py-20 lg:py-24 bg-[#0A1220]">
        <div className="max-w-4xl mx-auto px-6 md:px-10 lg:px-16">
          <div className="text-center mb-16">
            <p className="text-xs uppercase tracking-widest text-[#C9A45C] font-semibold mb-4">Application</p>
            <h2 className="section-title mb-6">Interested in Working With Us?</h2>
            <p className="section-desc max-w-2xl mx-auto">
              Tell us about yourself, your experience, your area of interest, and the kind of opportunity you are looking for.
            </p>
          </div>

          <CareerForm />
        </div>
      </section>

    </div>
  );
}
