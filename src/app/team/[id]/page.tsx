import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { TEAM_MEMBERS } from '@/lib/constants';

interface TeamProfileProps {
  params: {
    id: string;
  };
}

// Generate static params for all team members
export function generateStaticParams() {
  return TEAM_MEMBERS.map((member) => ({
    id: member.id,
  }));
}

export default function TeamProfilePage({ params }: TeamProfileProps) {
  const member = TEAM_MEMBERS.find((m) => m.id === params.id);

  if (!member) {
    notFound();
  }

  // split paragraphs from biography
  const paragraphs = member.biography.split('\n\n').filter(Boolean);

  // Split expertise into individual bullet points
  const expertiseItems = member.expertise.includes(' • ')
    ? member.expertise.split(' • ').map((item) => item.trim()).filter(Boolean)
    : member.expertise.split(',').map((item) => item.trim().replace(/\.$/, '')).filter(Boolean);

  return (
    <div className="bg-[#0F1B2D] min-h-screen text-white pt-20 sm:pt-24 pb-14 sm:pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-10 lg:px-16">
        
        {/* Back navigation */}
        <div className="mb-8 sm:mb-12">
          <Link 
            href="/#team" 
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-white/60 hover:text-[#C9A45C] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Team</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-20 items-start">
          
          {/* Left Column: Image */}
          <div className="lg:col-span-5 relative">
            <div className="relative w-full aspect-[4/5] rounded-sm overflow-hidden border border-white/10 shadow-2xl">
              <Image 
                src={member.image} 
                alt={member.name} 
                fill 
                className="object-cover object-[center_30%]"
                priority
              />
            </div>
            
            {/* Expertise Sidebar (Desktop) */}
            <div className="mt-10 p-8 border border-white/10 bg-white/[0.02] hidden lg:block rounded-sm">
              <h4 className="text-xs uppercase tracking-[0.2em] text-[#C9A45C] font-semibold mb-6">Areas of Expertise</h4>
              <ul className="space-y-3.5">
                {expertiseItems.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#C9A45C] mt-2 flex-shrink-0" />
                    <span className="text-sm text-white/80 font-body leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column: Details */}
          <div className="lg:col-span-7">
            
            {/* Header */}
            <div className="mb-10 pb-10 border-b border-white/10">
              <p className="text-sm uppercase tracking-[0.3em] text-[#C9A45C] font-semibold mb-3">{member.designation}</p>
              <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white tracking-tight mb-6">
                {member.name}
              </h1>
            </div>

            {/* Biography */}
            <div className="space-y-6">
              <h2 className="text-xl font-heading text-white/90 mb-4">Professional Profile</h2>
              {paragraphs.map((p, idx) => (
                <p key={idx} className="text-base sm:text-lg text-white/70 font-body leading-relaxed font-light text-justify">
                  {p}
                </p>
              ))}
            </div>

            {/* Expertise (Mobile/Tablet) */}
            <div className="mt-12 p-5 sm:p-8 border border-white/10 bg-white/[0.02] lg:hidden rounded-sm">
              <h4 className="text-xs uppercase tracking-[0.2em] text-[#C9A45C] font-semibold mb-6">Areas of Expertise</h4>
              <ul className="space-y-3.5">
                {expertiseItems.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#C9A45C] mt-2 flex-shrink-0" />
                    <span className="text-sm text-white/80 font-body leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
