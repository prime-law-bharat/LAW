'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, ChevronDown, ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
import { FIRM, ABOUT, PRACTICE_AREAS, TEAM_MEMBERS } from '@/lib/constants';
import AnimatedCounter from '@/components/ui/AnimatedCounter';
import InfiniteMarquee from '@/components/ui/InfiniteMarquee';
import { emitSiteScroll } from '@/lib/scroll';

const SECTIONS = [
  { id: 'hero', label: 'Prime Law Bharat' },
  { id: 'why-choose-us', label: 'Why Choose Us' },
  { id: 'team', label: 'Team Members' },
  { id: 'practice', label: 'Expertise' },
  { id: 'strategy', label: 'Strategic Advocacy' },
  { id: 'presence', label: 'Our Presence' },
  { id: 'contact', label: 'Get In Touch' },
];

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Fix Back Button scroll restoration
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Restore scroll position
    const savedPos = sessionStorage.getItem('plb_home_scroll');
    if (savedPos) {
      setTimeout(() => {
        if (containerRef.current) {
          containerRef.current.scrollTop = parseInt(savedPos, 10);
        }
      }, 100);
    }

    // Save scroll position
    let debounceTimer: ReturnType<typeof setTimeout>;
    const handleScrollSave = () => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        if (containerRef.current) {
          sessionStorage.setItem('plb_home_scroll', containerRef.current.scrollTop.toString());
        }
      }, 150);
    };

    container.addEventListener('scroll', handleScrollSave, { passive: true });
    return () => container.removeEventListener('scroll', handleScrollSave);
  }, []);

  const nextSlide = () => {
    if (carouselRef.current) {
      const itemWidth = carouselRef.current.firstElementChild?.clientWidth || 0;
      carouselRef.current.scrollBy({ left: itemWidth + 24, behavior: 'smooth' });
    }
  };

  const prevSlide = () => {
    if (carouselRef.current) {
      const itemWidth = carouselRef.current.firstElementChild?.clientWidth || 0;
      carouselRef.current.scrollBy({ left: -(itemWidth + 24), behavior: 'smooth' });
    }
  };

  const scrollToSection = (index: number) => {
    const el = document.getElementById(SECTIONS[index].id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(index);
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          emitSiteScroll(container);
          const scrollPosition = container.scrollTop + window.innerHeight / 2;
          for (let i = 0; i < SECTIONS.length; i++) {
            const el = document.getElementById(SECTIONS[i].id);
            if (el && scrollPosition >= el.offsetTop && scrollPosition < el.offsetTop + el.offsetHeight) {
              setActiveSection(i);
              break;
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      ScrollTrigger.defaults({ scroller: container });

      const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      heroTl
        .from('.hero-bg-img', { scale: 1.18, duration: 2.2 }, 0)
        .from('.hero-label', { opacity: 0, y: 20, duration: 0.6 }, 0.2)
        .from('.hero-title', { opacity: 0, y: 40, duration: 0.8 }, 0.4)
        .from('.hero-sub', { opacity: 0, y: 18, duration: 0.6 }, 0.7)
        .from('.hero-cta', { opacity: 0, y: 12, duration: 0.5 }, 0.85)
        .from('.scroll-indicator', { opacity: 0, duration: 0.6 }, 1.0);

      gsap.to('.hero-bg-img', {
        scale: 1.08,
        ease: 'none',
        scrollTrigger: {
          trigger: '#hero',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      gsap.utils.toArray<HTMLElement>('.reveal-up').forEach((el, i) => {
        gsap.from(el, {
          y: 48,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
        });
      });

      gsap.utils.toArray<HTMLElement>('.img-clip').forEach((el) => {
        gsap.from(el, {
          clipPath: 'inset(18% 18% 18% 18%)',
          scale: 1.12,
          duration: 1.0,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        });
      });

      ScrollTrigger.refresh();
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="snap-container relative bg-[#0F1B2D]">
      <div className="fixed right-6 md:right-10 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-4 items-center">
        {SECTIONS.map((sec, idx) => (
          <button
            key={sec.id}
            onClick={() => scrollToSection(idx)}
            className="group relative flex items-center justify-end p-1.5 focus:outline-none"
            aria-label={`Scroll to ${sec.label}`}
            data-cursor="view"
          >
            <span className="absolute right-8 px-2.5 py-1 text-[11px] font-body uppercase tracking-wider text-white bg-[#0F1B2D]/95 border border-white/20 rounded-sm opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap shadow-xl">
              {sec.label}
            </span>
            <span
              className={`block rounded-full transition-all duration-300 ${
                activeSection === idx
                  ? 'w-3 h-3 bg-[#C9A45C] scale-125 ring-4 ring-[#C9A45C]/30'
                  : 'w-2 h-2 bg-white/40 group-hover:bg-white'
              }`}
            />
          </button>
        ))}
      </div>

      <section
        id="hero"
        className="snap-section relative flex items-center justify-start overflow-hidden"
      >
        <div className="absolute inset-0">
          <Image
            src="/images/hero/hero-law-office.jpg"
            alt="Prime Law Bharat Legal Chambers"
            fill
            priority
            quality={90}
            sizes="100vw"
            className="hero-bg-img object-cover scale-105"
          />
        </div>
        <div className="section-overlay bg-[#0F1B2D]/75" />

        {/* Right-Side Transparent Law Emblem (logo-1-removebg.png) */}
        {/* Desktop Law Emblem */}
        <div className="absolute right-8 md:right-16 lg:right-24 top-1/2 -translate-y-1/2 pointer-events-none select-none z-10 hidden md:block">
          <div className="relative transition-all duration-700 hover:scale-105">
            <Image
              src="/images/logo/logo-1-removebg.png"
              alt="Prime Law Bharat Legal Emblem"
              width={330}
              height={330}
              className="w-[235px] h-[235px] lg:w-[285px] lg:h-[285px] xl:w-[325px] xl:h-[325px] object-contain drop-shadow-[0_8px_30px_rgba(0,0,0,0.75)]"
              priority
            />
          </div>
        </div>
        <div className="section-content">
          <div className="flex flex-col items-start pt-6 sm:pt-0">
            <p className="hero-label section-label">
              Advocates & Legal Consultants
            </p>
            <h1 className="hero-title section-title overflow-hidden">
              <span className="text-[#FF9933]">Your</span>{" "}
              <span className="text-white">Case,</span>{" "}
              <span className="text-white">Our</span>{" "}
              <span className="text-[#128807]">Commitment</span>
            </h1>
            <p className="hero-sub section-desc !text-center">{FIRM.tagline}</p>

            {/* Mobile Law Emblem */}
            {/* Mobile Law Emblem */}
            <div className="flex md:hidden justify-center w-full mt-0 mb-4">
              <div className="relative transition-all duration-700">
                <Image
                  src="/images/logo/logo-1-removebg.png"
                  alt="Prime Law Bharat Legal Emblem"
                  width={220}
                  height={220}
                  className="w-[165px] h-[165px] sm:w-[185px] sm:h-[185px] object-contain drop-shadow-[0_8px_30px_rgba(0,0,0,0.75)]"
                  priority
                />
              </div>
            </div>

            <div className="hero-sub w-20 h-[2px] bg-[#C9A45C] mb-10" />

            <div className="hero-cta flex flex-wrap gap-4 items-center">
              <Link
                href="/contact"
                className="btn-khaitan-accent group"
                data-cursor="view"
              >
                <span>Schedule a Consultation</span>
                <ArrowRight className="btn-arrow w-4 h-4" />
              </Link>
              <Link
                href="/practice-areas"
                className="btn-khaitan group"
                data-cursor="view"
              >
                <span>Explore Practice Areas</span>
                <ArrowRight className="btn-arrow w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
        <button
          type="button"
          onClick={() => scrollToSection(1)}
          className="scroll-indicator cursor-pointer bg-transparent border-0"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] text-white/50 font-body">
            Scroll Down
          </span>
          <ChevronDown className="w-5 h-5 text-white/70" />
        </button>
      </section>

      <section
        id="why-choose-us"
        className="snap-section relative flex items-center"
        style={{ backgroundImage: "url('/images/corridor/corridor.jpg')" }}
      >
        <div className="section-overlay bg-[#0F1B2D]/85" />
        <div className="section-content relative">
          <div className="max-w-4xl mx-auto text-center flex flex-col items-center py-20">
            <p className="section-label reveal-up">Why Choose Us</p>
            <h2 className="section-title reveal-up mb-6">Why Clients Choose Prime Law Bharat</h2>
            <div className="w-16 h-[2px] bg-[#C9A45C] reveal-up mb-8" />
            <p className="text-lg md:text-xl text-white/80 font-body leading-relaxed mb-10 reveal-up text-center">
              Strategic legal representation, honest case assessment, meticulous preparation, and consistent representation across courts, tribunals, and jurisdictions.
            </p>
            <div className="reveal-up">
              <Link href="/why-choose-us" className="btn-khaitan group inline-flex" data-cursor="view">
                <span>View Details</span>
                <ArrowRight className="btn-arrow w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="team" className="snap-section bg-[#0A1220] flex items-center">
        <div className="section-content w-full relative py-10">
          <div className="mb-4 sm:mb-8 text-center flex flex-col items-center">
            <p className="section-label reveal-up mb-2 sm:mb-5">Team Members</p>
            <h2 className="section-title mb-2 sm:mb-4 reveal-up text-3xl sm:text-4xl md:text-5xl">Meet our expert attorneys</h2>
            <div className="w-12 sm:w-16 h-[2px] bg-[#C9A45C] reveal-up" />
          </div>

          {/* Vertical stack on mobile, optimized to fit within 100vh */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-6 md:gap-8 max-w-4xl mx-auto">
            {TEAM_MEMBERS.map((member) => (
              <Link 
                href={`/team/${member.id}`}
                key={member.id} 
                className="reveal-up group relative border border-white/10 bg-white/[0.03] hover:border-[#C9A45C]/50 hover:bg-white/[0.06] transition-all duration-500 overflow-hidden flex flex-col rounded-sm shadow-xl cursor-pointer"
              >
                <div className="relative w-full aspect-[16/9] md:aspect-[5/4] overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    style={{ objectPosition: member.id === 'abhishek-motewar' ? 'center 15%' : 'center 35%' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A1220] via-[#0A1220]/20 to-transparent opacity-90" />
                </div>
                <div className="p-4 sm:p-6 flex flex-col flex-grow relative z-10 -mt-8 sm:-mt-12 bg-gradient-to-t from-[#0A1220] via-[#0A1220] to-transparent pt-6 sm:pt-8">
                  <p className="text-[10px] sm:text-xs uppercase tracking-widest text-[#C9A45C] font-semibold mb-1 sm:mb-2">{member.designation}</p>
                  <h3 className="font-heading text-lg sm:text-xl md:text-2xl text-white mb-2 sm:mb-6 flex-grow">{member.name}</h3>
                  <div className="inline-flex items-center gap-2 text-[10px] sm:text-xs uppercase tracking-wider text-[#C9A45C] font-medium transition-colors">
                    <span>View Profile</span>
                    <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section
        id="practice"
        className="snap-section relative flex items-center"
        style={{ backgroundImage: "url('/images/conference-room/conference-room-01.jpg')" }}
      >
        <div className="section-overlay bg-[#0F1B2D]/85" />
        <div className="section-content w-full relative">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <p className="section-label reveal-up">Areas of Practice</p>
              <h2 className="section-title mb-0 reveal-up">Comprehensive Legal Solutions</h2>
            </div>
            <Link href="/practice-areas" className="btn-khaitan group flex-shrink-0 self-start md:self-auto reveal-up" data-cursor="view">
              <span>View All Areas</span>
              <ArrowRight className="btn-arrow w-4 h-4" />
            </Link>
          </div>

          {/* Carousel Wrapper */}
          <div className="relative w-full group/carousel">
            {/* Left navigation arrow */}
            <button
              onClick={prevSlide}
              className="absolute -left-6 top-[40%] -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-[#0F1B2D]/80 border border-white/10 hover:border-[#C9A45C] hover:bg-[#0B2A52] flex items-center justify-center text-white transition-all shadow-2xl backdrop-blur-sm hidden lg:flex"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Right navigation arrow */}
            <button
              onClick={nextSlide}
              className="absolute -right-6 top-[40%] -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-[#0F1B2D]/80 border border-white/10 hover:border-[#C9A45C] hover:bg-[#0B2A52] flex items-center justify-center text-white transition-all shadow-2xl backdrop-blur-sm hidden lg:flex"
              aria-label="Next slide"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Cards viewport */}
            <div 
              ref={carouselRef}
              className="flex w-full py-4 overflow-x-auto snap-x snap-mandatory [&::-webkit-scrollbar]:hidden"
              style={{ gap: '24px', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {PRACTICE_AREAS.map((area) => (
                <Link
                  key={area.id}
                  href={`/practice-areas/${area.id}`}
                  data-cursor="view"
                  className="snap-start relative flex-shrink-0 w-[85%] sm:w-full md:w-[calc(50%-12px)] lg:w-[calc(25%-18px)] aspect-[3/4] sm:aspect-[4/5] lg:aspect-[3/4.2] rounded-sm overflow-hidden border border-white/10 group cursor-pointer shadow-xl transition-all duration-500 hover:border-[#C9A45C]/50 hover:bg-white/[0.04]"
                >
                  {/* Card background image */}
                  <div className="absolute inset-0 z-0">
                    {area.image ? (
                      <Image
                        src={area.image}
                        alt={area.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-[#14233A]" />
                    )}
                    {/* Dark overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F1B2D]/95 via-[#0F1B2D]/40 to-transparent group-hover:from-[#0F1B2D]/98 group-hover:via-[#0F1B2D]/55 transition-all duration-300" />
                  </div>

                  {/* Card Content */}
                  <div className="absolute inset-0 z-10 p-6 flex flex-col justify-end">
                    <div className="flex items-end justify-between w-full">
                      <h3 className="font-heading text-lg sm:text-xl text-white font-bold leading-tight max-w-[80%] drop-shadow-md">
                        {area.title}
                      </h3>
                      <div className="w-9 h-9 rounded-full border border-white/30 flex items-center justify-center bg-white/5 group-hover:bg-[#C9A45C] group-hover:border-[#C9A45C] transition-all duration-300 transform group-hover:translate-x-1 flex-shrink-0">
                        <ArrowRight className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="strategy" className="snap-section bg-[#0A1220] flex items-center">
        <div className="section-content">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-16 items-center">
            <div className="lg:col-span-5 flex justify-center lg:justify-start">
              <div className="img-clip relative w-full max-w-sm sm:max-w-md aspect-[3/4] overflow-hidden rounded-sm border border-white/15 shadow-2xl group">
                <Image
                  src="/images/2.jpg"
                  alt="Prime Law Bharat Leadership"
                  fill
                  className="object-cover filter grayscale contrast-115 brightness-90 transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1220]/80 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>
            <div className="lg:col-span-7 flex flex-col justify-center">
              <p className="section-label reveal-up">Strategic Advocacy</p>
              <h2 className="section-title leading-[1.12] reveal-up">
                You Seek Justice.
                <br className="hidden sm:inline" /> We Deliver It.
              </h2>
              <p className="section-desc mb-8 reveal-up">{ABOUT.commitment}</p>
              <div className="reveal-up">
                <Link href="/about" className="btn-khaitan group" data-cursor="view">
                  <span>About Us</span>
                  <ArrowRight className="btn-arrow w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>




      <section
        id="presence"
        className="snap-section relative flex flex-col justify-center py-24 bg-[#0A1220] overflow-hidden"
      >
        <div className="section-content relative z-10 w-full max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-5 flex flex-col justify-center">
              <p className="section-label reveal-up">Our Presence</p>
              <h2 className="section-title reveal-up mb-4 sm:mb-6 !text-[1.8rem] min-[400px]:!text-[2.25rem] sm:!text-5xl lg:!text-[3rem] xl:!text-[3.5rem] tracking-tight">
                <span className="sm:whitespace-nowrap">Strategic Multistate</span><br />
                Operations
              </h2>
              <p className="font-body text-white/70 text-sm sm:text-base lg:text-lg leading-relaxed reveal-up mb-8 sm:mb-10">
                With a growing presence across India, we are committed to being closer to our clients. Our operations span 9 key markets, enabling us to deliver our expertise and representation seamlessly across diverse regional jurisdictions.
              </p>
              

            </div>

            {/* Right Map Graphic */}
            <div className="lg:col-span-7 relative flex justify-center lg:justify-end reveal-up">
              <div className="relative w-full max-w-[500px] sm:max-w-[550px] aspect-square drop-shadow-[0_0_35px_rgba(201,164,92,0.12)] transform translate-y-0 sm:translate-y-12 lg:translate-y-20 mt-8 sm:mt-0">
                <Image 
                  src="/images/areas/india-map.png"
                  alt="Prime Law Bharat - India Presence Map"
                  fill
                  className="object-contain hover:scale-105 transition-transform duration-700 ease-out"
                  sizes="(max-width: 768px) 90vw, 550px"
                />
              </div>
            </div>

          </div>
        </div>
        
        {/* Subtle background glow behind the map */}
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-1/2 h-[80%] bg-[#C9A45C]/5 blur-[120px] pointer-events-none rounded-full" />
      </section>

      <section
        id="contact"
        className="snap-section"
        style={{ backgroundImage: "url('/images/workstation/workstation.jpg')" }}
      >
        <div className="section-overlay bg-[#0F1B2D]/85" />
        <div className="section-content flex flex-col justify-between min-h-[100dvh] py-16 sm:py-28">
          <div>
            <p className="section-label reveal-up">Get In Touch</p>
            <h2 className="section-title max-w-4xl reveal-up">Schedule a Consultation</h2>
            <p className="section-desc reveal-up">{ABOUT.whereWePractice}<br /><br />{ABOUT.Address}</p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 items-stretch sm:items-center reveal-up">
              <Link href="/contact" className="btn-khaitan-accent group justify-center text-center" data-cursor="view">
                <span>Contact Us</span>
                <ArrowRight className="btn-arrow w-4 h-4" />
              </Link>

              <a href={`https://wa.me/919109101055?text=Hello%2C%20I%20would%20like%20to%20schedule%20a%20consultation%20with%20Prime%20Law%20Bharat.`} target="_blank" rel="noopener noreferrer" className="btn-khaitan group justify-center text-center" data-cursor="view">
                <span>WhatsApp Us</span>
                <ArrowRight className="btn-arrow w-4 h-4" />
              </a>
            </div>
          </div>
          <p className="mt-16 text-xs text-white/40 font-body tracking-wider">
            © {new Date().getFullYear()} {FIRM.name}
          </p>
        </div>
      </section>
    </div>
  );
}
