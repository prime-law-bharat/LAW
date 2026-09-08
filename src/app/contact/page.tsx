'use client';

import { useState } from 'react';
import { FIRM, ABOUT } from '@/lib/constants';
import SectionHeading from '@/components/ui/SectionHeading';
import Image from 'next/image';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const formData = new FormData(e.currentTarget);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
      } else {
        setError('Something went wrong. Please try again or contact us directly.');
      }
    } catch {
      setError('Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#0F1B2D] min-h-screen text-white">
      {/* Hero Header */}
      <section className="relative h-[45vh] sm:h-[50vh] md:h-[60vh] min-h-[340px] sm:min-h-[420px] w-full flex items-center justify-center pt-20">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/images/executive cabin/executive-cabin-02.jpg" 
            alt="Contact Us" 
            fill 
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-[#0F1B2D]/80 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F1B2D] via-transparent to-transparent" />
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <p className="text-xs sm:text-sm uppercase tracking-[0.3em] text-[#C9A45C] font-semibold mb-4 font-body text-center ml-[0.3em]">
            Direct Communication
          </p>
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-6 tracking-tight">
            Contact Us
          </h1>
          <p className="font-body text-lg sm:text-xl text-white/80 max-w-2xl mx-auto font-light leading-relaxed text-center">
            Schedule a confidential consultation with our advocates and legal strategists.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-14 sm:py-20 lg:py-24 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          
          {/* Contact Information */}
          <div className="lg:col-span-5">
            <SectionHeading 
              title="Get In Touch" 
              subtitle="We provide direct access to senior legal counsel across our jurisdictions."
            />
            
            <div className="mt-12 space-y-10">
              <div>
                <h3 className="font-heading text-xl text-white mb-2">Office Chamber</h3>
                <div className="w-8 h-[2px] bg-[#0B2A52] mb-3" />
                <p className="font-body text-white/80 text-base sm:text-lg leading-relaxed text-left">
                  {FIRM.address}
                </p>
              </div>
              
              <div>
                <h3 className="font-heading text-xl text-white mb-2">Telephone Inquiries</h3>
                <div className="w-8 h-[2px] bg-[#0B2A52] mb-3" />
                <div className="space-y-2 font-body text-white/80 text-base sm:text-lg">
                  <p>
                    Adv. Reetika Kamthan:{' '}
                    <a href={`tel:${FIRM.phone1.replace(/\s+/g, '')}`} className="hover:text-[#C9A45C] transition-colors">
                      {FIRM.phone1}
                    </a>
                  </p>
                  <p>
                    Adv. Abhishek Motewar:{' '}
                    <a href={`tel:${FIRM.phone2.replace(/\s+/g, '')}`} className="hover:text-[#C9A45C] transition-colors">
                      {FIRM.phone2}
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7 bg-white/5 border border-white/10 p-5 sm:p-8 md:p-12 rounded-sm">
            <h3 className="font-heading text-2xl sm:text-3xl text-white mb-2">Schedule A Consultation</h3>
            <p className="font-body text-white/60 text-sm mb-8">
              Please share details regarding your matter for a preliminary assessment.
            </p>

            {submitted ? (
              <div className="p-8 bg-[#0B2A52]/20 border border-[#0B2A52] rounded-sm text-center">
                <h4 className="font-heading text-2xl text-white mb-2">Message Received</h4>
                <p className="font-body text-white/80 text-sm">
                  Thank you for reaching out to Prime Law Bharat. Our office will review your inquiry and follow up promptly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {error && (
                  <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-sm text-center">
                    <p className="font-body text-red-400 text-sm">{error}</p>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="fullName" className="block font-body text-xs uppercase tracking-wider text-white/70 mb-2">
                      Full Name *
                    </label>
                    <input 
                      type="text" 
                      id="fullName" 
                      name="name"
                      required
                      className="w-full bg-white/5 border border-white/15 rounded-sm px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#0B2A52] transition-colors text-sm"
                      placeholder="e.g. Adv. Sharma / Mr. Verma"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block font-body text-xs uppercase tracking-wider text-white/70 mb-2">
                      Phone Number *
                    </label>
                    <input 
                      type="tel" 
                      id="phone" 
                      name="phone"
                      required
                      className="w-full bg-white/5 border border-white/15 rounded-sm px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#0B2A52] transition-colors text-sm"
                      placeholder="+91"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="email" className="block font-body text-xs uppercase tracking-wider text-white/70 mb-2">
                    Email Address *
                  </label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email"
                    required
                    className="w-full bg-white/5 border border-white/15 rounded-sm px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#0B2A52] transition-colors text-sm"
                    placeholder="name@example.com"
                  />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block font-body text-xs uppercase tracking-wider text-white/70 mb-2">
                    Legal Domain / Matter Type
                  </label>
                  <input 
                    type="text" 
                    id="subject" 
                    name="legal_domain"
                    className="w-full bg-white/5 border border-white/15 rounded-sm px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#0B2A52] transition-colors text-sm"
                    placeholder="e.g. High Court Appeal / Corporate / RERA / Property"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block font-body text-xs uppercase tracking-wider text-white/70 mb-2">
                    Brief Matter Summary *
                  </label>
                  <textarea 
                    id="message" 
                    name="message"
                    rows={5}
                    required
                    className="w-full bg-white/5 border border-white/15 rounded-sm px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#0B2A52] transition-colors resize-none text-sm"
                    placeholder="Please provide a brief overview of your legal matter..."
                  ></textarea>
                </div>
                
                <button 
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#0B2A52] hover:bg-[#071D3A] disabled:opacity-60 disabled:cursor-not-allowed text-white font-body font-medium tracking-wide py-4 px-8 rounded-sm transition-all duration-300 text-sm uppercase"
                >
                  {loading ? 'Submitting...' : 'Submit Consultation Request'}
                </button>
              </form>
            )}
          </div>
          
        </div>
      </section>

      {/* Google Map Section */}
      <section className="py-14 sm:py-20 lg:py-24 px-4 sm:px-6 md:px-12 bg-[#0A1220]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs sm:text-sm uppercase tracking-[0.3em] text-[#C9A45C] font-semibold mb-4 font-body">
              Our Location
            </p>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl text-white mb-4 tracking-tight">
              Visit Our Place
            </h2>
            <div className="w-16 h-[2px] bg-[#C9A45C] mx-auto mb-6" />
            <p className="font-body text-white/70 text-base sm:text-lg max-w-2xl mx-auto">
              {FIRM.address}
            </p>
          </div>

          <div className="border border-white/10 rounded-sm overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15131.97!2d73.9!3d18.56!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c1dc48abc8e1%3A0xbc0a41ab3d911e93!2sAnjani%20Buildcon%2C%20Chamber%2063!5e0!3m2!1sen!2sin!4v1"
              width="100%"
              height="350"
              style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) brightness(0.95) contrast(0.9)' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Prime Law Bharat Office Location"
            />
          </div>

          <div className="mt-8 text-center">
            <a
              href="https://maps.google.com?ftid=0x3bc2c1dc48abc8e1:0xbc0a41ab3d911e93"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-body text-sm uppercase tracking-wider text-[#C9A45C] hover:text-white transition-colors duration-300"
            >
              <span>Get Directions on Google Maps</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </a>
          </div>
        </div>
      </section>
      {/* Floating WhatsApp Widget */}
      <a 
        href={`https://wa.me/919109101055?text=Hello%2C%20I%20would%20like%20to%20schedule%20a%20consultation%20with%20Prime%20Law%20Bharat.`} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="fixed bottom-20 right-6 z-[60] bg-[#25D366] text-white p-4 rounded-full shadow-[0_4px_14px_rgba(37,211,102,0.4)] hover:scale-110 hover:shadow-[0_6px_20px_rgba(37,211,102,0.6)] transition-all duration-300 group flex items-center justify-center"
        aria-label="Chat on WhatsApp"
      >
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
        </svg>
      </a>
    </div>
  );
}
