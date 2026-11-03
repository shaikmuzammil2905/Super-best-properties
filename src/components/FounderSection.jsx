import React from 'react';
import { Award, Briefcase, GraduationCap, CheckCircle2, Sparkles, TrendingUp } from 'lucide-react';

export default function FounderSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-[#050505] via-[#0D0D0D] to-[#050505] text-white relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gold-600/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 text-xs font-bold tracking-widest uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Visionary Leadership & Advisory</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white tracking-tight">
            Meet Our <span className="gold-gradient-text">Founder & Visionary</span>
          </h2>
          <div className="flex items-center justify-center space-x-3 mt-4">
            <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-gold-500"></div>
            <div className="w-2.5 h-2.5 rotate-45 border border-gold-400 bg-gold-500/30"></div>
            <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-gold-500"></div>
          </div>
        </div>

        {/* Grand Executive Profile Presentation */}
        <div className="bg-[#0f0f0f] border-2 border-gold-500/30 rounded-3xl overflow-hidden shadow-2xl shadow-black/80">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            
            {/* Left: Founder Executive Portrait (Matching Reference Image 4 & Image copy 11) */}
            <div className="lg:col-span-5 p-6 sm:p-8 flex justify-center items-center bg-gradient-to-b from-neutral-900/50 to-black/80">
              <div className="relative group max-w-sm w-full">
                
                {/* Gold outer frame glow */}
                <div className="absolute -inset-1.5 bg-gradient-to-r from-gold-600 via-gold-400 to-gold-700 rounded-3xl blur-sm opacity-50 group-hover:opacity-80 transition duration-500"></div>
                
                {/* Photo container with upward shifted badge as requested in image copy 11.png */}
                <div className="relative rounded-2xl overflow-hidden border-2 border-gold-400/80 shadow-2xl bg-neutral-950 aspect-[9/14] sm:aspect-[9/13]">
                  
                  {/* Upward shifted grand badge in the top space */}
                  <div className="absolute top-4 inset-x-3 text-center z-20">
                    <span className="inline-flex items-center space-x-2 bg-black/90 backdrop-blur-md px-4 py-2 rounded-full border border-gold-400 text-gold-300 text-xs sm:text-sm font-bold tracking-widest uppercase shadow-2xl shadow-black/90">
                      <Sparkles className="w-3.5 h-3.5 text-gold-400" />
                      <span>SUPER BEST PROPERTIES FOUNDER</span>
                      <Sparkles className="w-3.5 h-3.5 text-gold-400" />
                    </span>
                  </div>

                  <img
                    src="/assets/founder.png"
                    alt="D. Suresh Baabu - Founder Super Best Properties"
                    className="w-full h-full object-cover object-top filter brightness-[1.02] contrast-[1.03]"
                  />

                  {/* Clean bottom vignette to ensure pristine frame with zero text artifacts */}
                  <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-black/80 to-transparent pointer-events-none"></div>
                </div>

              </div>
            </div>

            {/* Right: Founder Executive Biography & Credentials */}
            <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 space-y-6">
              
              <div>
                <span className="text-gold-400 font-semibold text-xs sm:text-sm uppercase tracking-widest">
                  Leadership Profile
                </span>
                <h3 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-extrabold text-white mt-1">
                  D. Suresh Baabu
                </h3>
                
                {/* Elegant gold filigree divider */}
                <div className="flex items-center space-x-3 my-3">
                  <div className="h-[1px] w-20 bg-gradient-to-r from-gold-500 to-transparent"></div>
                  <span className="text-gold-400 text-sm">✦</span>
                  <div className="h-[1px] w-20 bg-gradient-to-l from-gold-500 to-transparent"></div>
                </div>

                <p className="text-base sm:text-lg text-gold-300 font-serif italic">
                  (A Multi-Solopreneur – Living Many Dreams at once)
                </p>
              </div>

              {/* 25+ Years Experience Banner */}
              <div className="bg-gradient-to-r from-gold-500/15 via-gold-500/5 to-transparent border-l-4 border-gold-400 p-4 rounded-r-2xl">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-full bg-gold-500/20 border border-gold-500/50 flex items-center justify-center text-gold-400 shrink-0">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-gold-400 font-bold text-base sm:text-lg">
                      Over 25+ Years of Versatile Experience
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-300">
                      Spanning real estate advisory, business development, and various industrial sectors.
                    </p>
                  </div>
                </div>
              </div>

              {/* Educational Qualifications */}
              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-gold-400 text-sm font-semibold uppercase tracking-wider">
                  <GraduationCap className="w-4 h-4" />
                  <span>Academic & Professional Credentials</span>
                </div>
                
                <div className="bg-neutral-900/90 border border-neutral-800 rounded-2xl p-4 sm:p-5">
                  <p className="text-sm sm:text-base text-gray-200 leading-relaxed font-medium">
                    B.Com, MHRM, PGDCA, PGDBM, Diploma in Film Making, Diploma in Labour & Administrative Law.
                  </p>
                </div>
              </div>

              {/* Founder Statement */}
              <div className="space-y-3 text-sm text-gray-300 leading-relaxed">
                <p>
                  With an unwavering dedication to ethics, market foresight, and customer-first advisory, D. Suresh Baabu established <strong className="text-gold-400">Super Best Properties</strong> to empower clients with safe, verified, and wealth-generating real estate decisions across Telangana.
                </p>
                <p className="italic text-gray-400 border-l-2 border-neutral-700 pl-4 py-1">
                  “We don't just help you find properties. We help you make informed property decisions that build lasting security and prosperity for generations.”
                </p>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap gap-4 items-center">
                <a
                  href="https://wa.me/917075539189?text=Hello%20Mr.%20D.%20Suresh%20Baabu,%20I%20would%20like%20to%20schedule%20a%20property%20consultation%20with%20Super%20Best%20Properties."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-full gold-gradient-btn text-black font-bold text-sm tracking-wide shadow-lg hover:shadow-gold-500/40 transition-all flex items-center space-x-2"
                >
                  <span>Consult with Founder on WhatsApp</span>
                  <span>→</span>
                </a>
                <a
                  href="tel:7075539189"
                  className="px-6 py-3 rounded-full bg-neutral-900 hover:bg-neutral-800 border border-gold-500/40 text-gold-400 font-semibold text-sm transition-all"
                >
                  Direct Call: 7075539189
                </a>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
