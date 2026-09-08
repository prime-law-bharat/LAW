'use client';

import { useState, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function CareerForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [fileName, setFileName] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    const file = formData.get('attachment') as File | null;
    
    // Check file size (Gmail limit is usually 25MB, we set to 15MB to be safe)
    if (file && file.size > 15 * 1024 * 1024) {
      setError('File size exceeds 15MB. Please upload a smaller file.');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/career', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
      } else {
        setError('Something went wrong. Please try again or email us directly.');
      }
    } catch {
      setError('Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-[#0F1B2D] p-8 md:p-12 border border-white/10 rounded-sm">
        <div className="p-8 bg-[#C9A45C]/10 border border-[#C9A45C]/30 rounded-sm text-center">
          <h4 className="font-heading text-2xl text-white mb-3">Application Received</h4>
          <p className="font-body text-white/80 text-sm leading-relaxed">
            Thank you for your interest in Prime Law Bharat. We have received your application and will review it carefully. If your profile aligns with our current needs, our team will reach out to you shortly.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#0F1B2D] p-8 md:p-12 border border-white/10 rounded-sm">
      <form onSubmit={handleSubmit} className="space-y-6">
        <input type="checkbox" name="botcheck" className="hidden" />

        {error && (
          <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-sm text-center">
            <p className="font-body text-red-400 text-sm">{error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-wider text-white/60 font-medium">Full Name *</label>
            <input type="text" name="name" className="w-full bg-[#0A1220] border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-[#C9A45C] transition-colors" required />
          </div>
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-wider text-white/60 font-medium">Email Address *</label>
            <input type="email" name="email" className="w-full bg-[#0A1220] border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-[#C9A45C] transition-colors" required />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-wider text-white/60 font-medium">Phone Number *</label>
            <input type="tel" name="phone" className="w-full bg-[#0A1220] border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-[#C9A45C] transition-colors" required />
          </div>
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-wider text-white/60 font-medium">Current Role / Qualification *</label>
            <input type="text" name="qualification" className="w-full bg-[#0A1220] border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-[#C9A45C] transition-colors" required />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-wider text-white/60 font-medium">Area of Interest *</label>
            <select name="area_of_interest" className="w-full bg-[#0A1220] border border-white/10 px-4 py-3 text-white/80 focus:outline-none focus:border-[#C9A45C] transition-colors appearance-none" required defaultValue="">
              <option value="" disabled>Select an option</option>
              <option value="Internship">Internship</option>
              <option value="Junior Advocate">Junior Advocate</option>
              <option value="Associate Lawyer">Associate Lawyer</option>
              <option value="Legal Research">Legal Research</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-wider text-white/60 font-medium">Experience *</label>
            <input type="text" name="experience" placeholder="e.g. 2 years, Student, etc." className="w-full bg-[#0A1220] border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-[#C9A45C] transition-colors" required />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs uppercase tracking-wider text-white/60 font-medium">Message / Cover Note *</label>
          <textarea rows={5} name="message" className="w-full bg-[#0A1220] border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-[#C9A45C] transition-colors resize-none" required></textarea>
        </div>

        <div className="space-y-2">
          <label className="text-xs uppercase tracking-wider text-white/60 font-medium">Upload CV / Resume</label>
          <label className="block w-full border border-dashed border-white/20 bg-[#0A1220] px-4 py-8 text-center hover:border-[#C9A45C] hover:bg-white/[0.02] transition-colors cursor-pointer rounded-sm">
            {fileName ? (
              <span className="text-[#C9A45C] text-sm font-body">{fileName}</span>
            ) : (
              <span className="text-white/60 text-sm font-body">Click to upload file (PDF, DOCX — max 15MB)</span>
            )}
            <input 
              type="file" 
              name="attachment" 
              className="hidden" 
              accept=".pdf,.doc,.docx" 
              onChange={(e) => setFileName(e.target.files?.[0]?.name || '')}
            />
          </label>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row gap-5 items-center">
          <button type="submit" disabled={loading} className="w-full sm:w-auto btn-khaitan-accent group justify-center disabled:opacity-60 disabled:cursor-not-allowed">
            <span>{loading ? 'Submitting...' : 'Submit Application'}</span>
            {!loading && <ArrowRight className="btn-arrow w-4 h-4" />}
          </button>
          <Link href="/contact" className="w-full sm:w-auto btn-khaitan group justify-center text-center">
            <span>Contact the Firm</span>
            <ArrowRight className="btn-arrow w-4 h-4" />
          </Link>
        </div>
      </form>
    </div>
  );
}
