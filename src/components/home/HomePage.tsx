'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { FIRM, ABOUT, PRACTICE_AREAS, COMMITMENTS, TEAM_MEMBERS } from '@/lib/constants';
import AnimatedCounter from '@/components/ui/AnimatedCounter';
import InfiniteMarquee from '@/components/ui/InfiniteMarquee';
import { emitSiteScroll } from '@/lib/scroll';
import { motion } from 'framer-motion';


const SECTIONS = [
  { id: 'hero', label: 'Prime Law Bharat' },
  { id: 'why-choose-us', label: 'Why Choose Us' },
  { id: 'team', label: 'Team Members' },
  { id: 'practice', label: 'Expertise' },
  { id: 'strategy', label: 'Strategic Advocacy' },
  { id: 'commitments', label: 'Commitments' },
  { id: 'contact', label: 'Get In Touch' },
];

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState(0);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const maxCarouselIndex = Math.max(0, PRACTICE_AREAS.length - itemsPerPage);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setItemsPerPage(4);
      } else if (window.innerWidth >= 768) {
        setItemsPerPage(2);
      } else {
        setItemsPerPage(1);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const nextSlide = () => {
    setCarouselIndex((prev) => Math.min(prev + 1, maxCarouselIndex));
  };

  const prevSlide = () => {
    setCarouselIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleDragEnd = (event: any, info: any) => {
    const threshold = 50;
    if (info.offset.x < -threshold) {
      nextSlide();
    } else if (info.offset.x > threshold) {
      prevSlide();
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
        className="
    snap-section
    relative
    flex
    items-center
    justify-start
    overflow-hidden
  "
      >
        {/* Background */}
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

        {/* Overlay */}
        <div className="section-overlay bg-[#0F1B2D]/75" />

        {/* Logo - Desktop */}
        <div
          className="
      absolute
      right-8
      md:right-16
      lg:right-24
      top-1/2
      -translate-y-1/2
      pointer-events-none
      select-none
      z-10
      hidden
      md:block
    "
        >
          <div className="relative transition-all duration-700 hover:scale-105">
            <Image
              src="/images/logo/logo-1-removebg.png"
              alt="Prime Law Bharat Legal Emblem"
              width={330}
              height={330}
              className="
          w-[235px]
          h-[235px]
          lg:w-[285px]
          lg:h-[285px]
          xl:w-[325px]
          xl:h-[325px]
          object-contain
          drop-shadow-[0_8px_30px_rgba(0,0,0,0.75)]
        "
              priority
            />
          </div>
        </div>

        <div
          className="
      section-content
      w-full
      relative
      z-20
    "
        >
          <div
            className="
        flex
        flex-col
        items-center
        md:items-start
        pt-6
        sm:pt-8
        md:pt-0
        px-4
        sm:px-6
        md:px-0
      "
          >
            {/* Label */}
            <p
              className="
    hero-label
    section-label
    text-center
    md:text-left
    w-full
    md:w-auto
    
    text-xs
    sm:text-sm
    md:text-base
    
    leading-snug
    
    px-3
    sm:px-0
  "
            >
              <span className="block md:inline">Advocates &</span>
              <span className="block md:inline">Legal Consultants</span>
            </p>

            {/* Main Heading */}
            <h1
              className="
          hero-title
          section-title
          overflow-hidden
          text-center
          md:text-left
          w-full
          md:w-auto
          
          text-3xl
          sm:text-4xl
          md:text-5xl
          lg:text-6xl
        "
            >
              <span className="text-[#FF9933]">Your</span>{" "}
              <span className="text-white">Case,</span>{" "}
              <span className="text-white">Our</span>{" "}
              <span className="text-[#128807]">Commitment</span>
            </h1>

            {/* Tagline */}
            <p
              className="
          hero-sub
          section-desc
          !text-center
          md:!text-left
          w-full
          max-w-[90%]
          sm:max-w-[500px]
          md:max-w-none
          mx-auto
          md:mx-0
          
          text-xs
          sm:text-sm
          md:text-base
        "
            >
              {FIRM.tagline}
            </p>

            {/* Logo - Mobile */}
            <div
              className="
          flex
          md:hidden
          justify-center
          items-center
          w-full
          mt-4
          mb-4
        "
            >
              <div className="relative transition-all duration-700">
                <Image
                  src="/images/logo/logo-1-removebg.png"
                  alt="Prime Law Bharat Legal Emblem"
                  width={240}
                  height={240}
                  className="
              w-[160px]
              h-[160px]
              sm:w-[200px]
              sm:h-[200px]
              object-contain
              drop-shadow-[0_8px_30px_rgba(0,0,0,0.75)]
            "
                  priority
                />
              </div>
            </div>

            {/* Gold Divider */}
            <div
              className="
          hero-sub
          w-16
          sm:w-20
          h-[2px]
          bg-[#C9A45C]
          mb-6
          md:mb-10
        "
            />

            {/* CTA Buttons */}
            <div
              className="
          hero-cta
          flex
          flex-col
          sm:flex-row
          gap-3
          sm:gap-4
          items-stretch
          sm:items-center
          w-full
          sm:w-auto
        "
            >
              <Link
                href="/contact"
                className="
            btn-khaitan-accent
            group
            w-full
            sm:w-auto
            justify-center
            
            text-xs
            sm:text-sm
            md:text-base
          "
                data-cursor="view"
              >
                <span>Schedule a Consultation</span>
                <ArrowRight className="btn-arrow w-4 h-4" />
              </Link>

              <Link
                href="/practice-areas"
                className="
            btn-khaitan
            group
            w-full
            sm:w-auto
            justify-center
            
            text-xs
            sm:text-sm
            md:text-base
          "
                data-cursor="view"
              >
                <span>Explore Practice Areas</span>
                <ArrowRight className="btn-arrow w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <button
          type="button"
          onClick={() => scrollToSection(1)}
          className="
      scroll-indicator
      cursor-pointer
      bg-transparent
      border-0
      z-30
      !bottom-2
      sm:!bottom-4
    "
        >
          <span
            className="
        text-[10px]
        sm:text-xs
        uppercase
        tracking-[0.3em]
        text-white/50
        font-body
      "
          >
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
            <p className="text-lg md:text-xl text-white/80 font-body leading-relaxed mb-10 reveal-up">
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
          <div className="mb-8 text-center flex flex-col items-center">
            <p className="section-label reveal-up">Team Members</p>
            <h2 className="section-title mb-4 reveal-up">Meet our expert attorneys</h2>
            <div className="w-16 h-[2px] bg-[#C9A45C] reveal-up" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {TEAM_MEMBERS.map((member) => (
              <div key={member.id} className="reveal-up group relative border border-white/10 bg-white/[0.03] hover:border-[#C9A45C]/50 hover:bg-white/[0.06] transition-all duration-500 overflow-hidden flex flex-col h-full rounded-sm shadow-xl">
                <div className="relative w-full aspect-[5/4] overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover object-[center_20%] transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A1220] via-[#0A1220]/20 to-transparent opacity-90" />
                </div>
                <div className="p-6 flex flex-col flex-grow relative z-10 -mt-12 bg-gradient-to-t from-[#0A1220] via-[#0A1220] to-transparent pt-8">
                  <p className="text-xs uppercase tracking-widest text-[#C9A45C] font-semibold mb-2">{member.designation}</p>
                  <h3 className="font-heading text-xl sm:text-2xl text-white mb-6 flex-grow">{member.name}</h3>
                  <Link href={`/team/${member.id}`} className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-white hover:text-[#C9A45C] font-medium transition-colors group/btn">
                    <span>View Profile</span>
                    <ArrowRight className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
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
            {carouselIndex > 0 && (
              <button
                onClick={prevSlide}
                className="absolute -left-6 top-[40%] -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-[#0F1B2D]/80 border border-white/10 hover:border-[#C9A45C] hover:bg-[#0B2A52] flex items-center justify-center text-white transition-all shadow-2xl backdrop-blur-sm hidden lg:flex"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            )}

            {/* Right navigation arrow */}
            {carouselIndex < maxCarouselIndex && (
              <button
                onClick={nextSlide}
                className="absolute -right-6 top-[40%] -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-[#0F1B2D]/80 border border-white/10 hover:border-[#C9A45C] hover:bg-[#0B2A52] flex items-center justify-center text-white transition-all shadow-2xl backdrop-blur-sm hidden lg:flex"
                aria-label="Next slide"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            )}

            {/* Cards viewport */}
            <div className="overflow-hidden w-full py-4">
              <motion.div
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={handleDragEnd}
                className="flex cursor-grab active:cursor-grabbing"
                style={{ gap: '24px' }}
                animate={{
                  x: `calc(-${carouselIndex} * (100% / ${itemsPerPage}) - ${carouselIndex * (24 / itemsPerPage)}px)`
                }}
                transition={{ type: 'spring', stiffness: 220, damping: 26 }}
              >
                {PRACTICE_AREAS.map((area) => (
                  <Link
                    key={area.id}
                    href={`/practice-areas?id=${area.id}`}
                    data-cursor="view"
                    className="relative flex-shrink-0 w-full md:w-[calc(50%-12px)] lg:w-[calc(25%-18px)] aspect-[3/4] sm:aspect-[4/5] lg:aspect-[3/4.2] rounded-sm overflow-hidden border border-white/10 group cursor-pointer shadow-xl transition-all duration-500 hover:border-[#C9A45C]/50 hover:bg-white/[0.04]"
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
              </motion.div>
            </div>
          </div>

          {/* Pagination dots */}
          <div className="flex justify-center gap-2 mt-4">
            {Array.from({ length: Math.ceil(PRACTICE_AREAS.length / itemsPerPage) }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCarouselIndex(Math.min(idx * itemsPerPage, maxCarouselIndex))}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  Math.floor(carouselIndex / itemsPerPage) === idx
                    ? 'bg-[#C9A45C] scale-125'
                    : 'bg-white/30 hover:bg-white/60'
                }`}
                aria-label={`Go to page ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      <section id="strategy" className="snap-section bg-[#0A1220] flex items-center">
        <div className="section-content">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
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
              <p className="section-desc mb-8 reveal-up text-justify">{ABOUT.commitment}</p>
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

      <section id="commitments" className="snap-section bg-[#0F1B2D] flex flex-col justify-center">
        
        <div className="section-content">
          <p className="section-label reveal-up">How We Work</p>
          <h2 className="section-title reveal-up">Three Core Commitments</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
            {COMMITMENTS.map((item) => (
              <div
                key={item.title}
                className="reveal-up group p-8 border border-white/10 bg-white/[0.03] hover:border-[#0B2A52]/50 hover:bg-white/[0.06] transition-all duration-500"
              >
                <div className="w-10 h-[2px] bg-[#C9A45C] mb-6 transition-all duration-500 group-hover:w-16" />
                <h3 className="font-heading text-2xl mb-4">{item.title}</h3>
                <p className="font-body text-white/70 leading-relaxed text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>



      <section
        id="contact"
        className="snap-section"
        style={{ backgroundImage: "url('/images/workstation/workstation.jpg')" }}
      >
        <div className="section-overlay bg-[#0F1B2D]/85" />
        <div className="section-content flex flex-col justify-between min-h-[calc(100vh-0px)] py-28">
          <div>
            <p className="section-label reveal-up">Get In Touch</p>
            <h2 className="section-title max-w-4xl reveal-up">Schedule a Consultation</h2>
            <p className="section-desc reveal-up text-justify">{ABOUT.whereWePractice}<tr></tr>{ABOUT.Address}</p>
            <div className="flex flex-col sm:flex-row gap-5 items-stretch sm:items-center reveal-up">
              <Link href="/contact" className="btn-khaitan-accent group justify-center" data-cursor="view">
                <span>Contact Us</span>
                <ArrowRight className="btn-arrow w-4 h-4" />
              </Link>
              <a href={`tel:${FIRM.phone1.replace(/\s+/g, '')}`} className="btn-khaitan group justify-center" data-cursor="view">
                <span>Call {FIRM.phone1}</span>
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
