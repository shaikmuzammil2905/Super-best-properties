import React, { useState } from 'react';
import { 
  Globe, 
  ShieldCheck, 
  TrendingUp, 
  FileText, 
  Video, 
  Plane, 
  CheckCircle2, 
  Sparkles, 
  Phone, 
  MessageCircle, 
  ArrowRight, 
  ChevronDown, 
  ChevronUp, 
  Download, 
  Calendar,
  Building,
  Landmark,
  Scale,
  MapPin
} from 'lucide-react';

export default function NRICornerPage() {
  const [openFaq, setOpenFaq] = useState(0);

  const pillars = [
    {
      title: '100% Clear Title & Approvals',
      tag: 'Legal Security',
      icon: ShieldCheck,
      color: 'from-amber-500/20 to-gold-500/10',
      borderColor: 'border-gold-500/40',
      description: 'Every project is strictly vetted for HMDA, DTCP, and TG RERA compliance, complete with link documents and legal verification reports before you commit a single rupee.'
    },
    {
      title: 'Strategic Growth Corridors',
      tag: 'High Capital Gain',
      icon: TrendingUp,
      color: 'from-emerald-500/20 to-teal-500/10',
      borderColor: 'border-emerald-500/40',
      description: 'Curated open plots and commercial assets positioned along Telangana’s fastest-appreciating zones—including Choutuppal (NH-65 & RRR), Yacharam (Near Bharat Future City), Kothur, LB Nagar, and Ghatkesar.'
    },
    {
      title: 'Zero-Travel Registration',
      tag: 'Global Convenience',
      icon: Plane,
      color: 'from-blue-500/20 to-indigo-500/10',
      borderColor: 'border-blue-500/40',
      description: 'Seamless end-to-end execution via Power of Attorney (PoA) and digital documentation, allowing you to acquire and register prime real estate from anywhere in the world.'
    },
    {
      title: 'Transparent Reporting',
      tag: 'Real-time Proof',
      icon: Video,
      color: 'from-purple-500/20 to-violet-500/10',
      borderColor: 'border-purple-500/40',
      description: 'Live video walkthroughs, drone progress updates, GPS-tagged plot boundaries, and direct communication—no hidden charges or middleman markups.'
    }
  ];

  const steps = [
    {
      step: '01',
      title: 'Virtual Discovery & Portfolio Matching',
      summary: '1-on-1 Personalized Session',
      desc: 'Connect via Zoom, Google Meet, or WhatsApp Video to review micro-market data, masterplan layouts, and budget-aligned options (starting from ₹21 Lakhs onwards).'
    },
    {
      step: '02',
      title: 'Digital Legal & Site Verification',
      summary: '100% Transparent Documentation',
      desc: 'Receive complete digital copies of HMDA/DTCP layout approvals, TG RERA certificates, EC (Encumbrance Certificate), and a live video tour of your exact plot facing and road access.'
    },
    {
      step: '03',
      title: 'FEMA-Compliant Payment & PoA Execution',
      summary: 'Compliant & Secure Transactions',
      desc: 'Remit funds transparently via NRE/NRO accounts. Our legal desk guides you step-by-step on executing a Special Power of Attorney (SPoA) through your local Indian Embassy/Consulate.'
    },
    {
      step: '04',
      title: 'Registration, Handover & Asset Monitoring',
      summary: 'Peace-of-Mind Ownership',
      desc: 'We coordinate sub-registrar slot booking, complete registration, deliver scanned and physical registered documents, and provide ongoing post-purchase boundary and resale support.'
    }
  ];

  const femaCheckpoints = [
    {
      title: 'Permitted Investments',
      icon: Building,
      desc: 'NRIs and OCIs can freely purchase residential plots, commercial spaces, and villas in India without prior RBI permission (agricultural land, plantation property, and farmhouses are restricted under FEMA).'
    },
    {
      title: 'Banking Channels',
      icon: Landmark,
      desc: 'All transactions are processed strictly through authorized banking channels via NRE (Non-Resident External) or NRO (Non-Resident Ordinary) accounts.'
    },
    {
      title: 'Repatriation Benefits',
      icon: TrendingUp,
      desc: 'Sale proceeds and rental income are smoothly repatriable subject to standard RBI and Income Tax guidelines.'
    },
    {
      title: 'Taxation Support',
      icon: Scale,
      desc: 'Dedicated guidance on TDS compliance, capital gains exemptions (Section 54/54F), and double-taxation avoidance treaties (DTAA).'
    }
  ];

  const nriFaqs = [
    {
      q: '1. Can I buy and register an open plot in Hyderabad without traveling to India?',
      a: 'Yes. You can authorize a trusted family member in India using a Special Power of Attorney (SPoA) attested by the Indian Embassy or Consulate in your country of residence. Our legal team provides the exact draft and handles the adjudication process in Telangana.'
    },
    {
      q: '2. How do I verify the plot location and development progress remotely?',
      a: 'We provide live video calls directly from the project site, high-resolution drone footage, Google Earth/GPS coordinates for your specific plot number, and periodic development status reports.'
    },
    {
      q: '3. What documents are required from an NRI buyer?',
      a: 'You only need a valid Indian Passport or OCI Card, PAN Card, overseas address proof, passport-size photographs, and an active NRE/NRO bank account.'
    },
    {
      q: '4. Do you assist with future resale or portfolio exit?',
      a: 'Yes. Beyond acquisition, Super Best Properties actively supports long-term wealth creation by assisting our NRI clients with market valuation updates and seamless resale execution when you are ready to book profits.'
    }
  ];

  return (
    <div className="bg-[#FAFAFA] min-h-screen">
      
      {/* 1. HERO SECTION */}
      <section className="bg-gradient-to-b from-neutral-950 via-neutral-900 to-black text-white py-14 sm:py-20 border-b border-gold-500/20 relative overflow-hidden">
        {/* Ambient Gold Halo */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center max-w-4xl">
          
          {/* Badge: Dedicated Global Investor Desk */}
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-gold-500/15 border border-gold-400 text-gold-300 text-xs sm:text-sm font-bold uppercase tracking-wider mb-5 shadow-lg">
            <Globe className="w-4 h-4 text-gold-400" />
            <span>Dedicated Global Investor Desk</span>
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-black tracking-tight leading-tight text-white mb-6">
            Your Trusted Bridge to <br className="hidden sm:block" />
            <span className="gold-gradient-text">High-Yield Real Estate in Telangana</span>
          </h1>

          {/* Sub-headline */}
          <p className="text-sm sm:text-base md:text-lg text-gray-300 leading-relaxed font-normal max-w-3xl mx-auto mb-8">
            Backed by over 25 years of industry expertise and led by Founder & CEO D. Suresh Baabu, Super Best Properties simplifies land and property investments in Hyderabad for Global Indians—with 100% HMDA, DTCP, and TG RERA-approved assets, zero litigation risk, and end-to-end digital execution.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://wa.me/917075539189?text=Hello%20Mr.%20D.%20Suresh%20Baabu,%20I%20am%20an%20NRI%20investor%20and%20would%20like%20to%20schedule%20a%201-on-1%20NRI%20Video%20Consultation."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-3.5 rounded-full gold-gradient-btn text-black font-extrabold text-sm sm:text-base tracking-wide shadow-2xl hover:shadow-gold-500/50 hover:scale-105 transition-all flex items-center justify-center space-x-2"
            >
              <Calendar className="w-4 h-4 text-black" />
              <span>Schedule a 1-on-1 NRI Video Consultation</span>
              <ArrowRight className="w-4 h-4 text-black" />
            </a>

            <a
              href="https://wa.me/917075539189?text=Hello%20Super%20Best%20Properties,%20please%20send%20me%20the%20NRI%20Real%20Estate%20Investment%20Guide%20for%20Hyderabad%20growth%20corridors."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-neutral-900 hover:bg-neutral-800 border border-gold-400 text-gold-300 font-bold text-sm sm:text-base tracking-wide transition-all shadow-lg hover:scale-105 flex items-center justify-center space-x-2"
            >
              <Download className="w-4 h-4 text-gold-400" />
              <span>Download NRI Investment Guide</span>
            </a>
          </div>

          {/* Trust Highlights */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-10 pt-8 border-t border-neutral-800/80 text-left">
            <div className="p-3 bg-neutral-900/60 rounded-xl border border-neutral-800">
              <span className="block text-gold-400 font-extrabold text-lg sm:text-xl">₹21 Lakhs+</span>
              <span className="text-xs text-gray-400">Curated Plot Starting Budget</span>
            </div>
            <div className="p-3 bg-neutral-900/60 rounded-xl border border-neutral-800">
              <span className="block text-gold-400 font-extrabold text-lg sm:text-xl">100%</span>
              <span className="text-xs text-gray-400">TG RERA & HMDA/DTCP Clear</span>
            </div>
            <div className="p-3 bg-neutral-900/60 rounded-xl border border-neutral-800">
              <span className="block text-gold-400 font-extrabold text-lg sm:text-xl">Zero-Travel</span>
              <span className="text-xs text-gray-400">Embassy PoA & Slot Booking</span>
            </div>
            <div className="p-3 bg-neutral-900/60 rounded-xl border border-neutral-800">
              <span className="block text-gold-400 font-extrabold text-lg sm:text-xl">25+ Years</span>
              <span className="text-xs text-gray-400">Leadership Under D. Suresh Baabu</span>
            </div>
          </div>

        </div>
      </section>

      {/* 2. WHY GLOBAL INDIANS INVEST THROUGH SUPER BEST PROPERTIES */}
      <section className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-gold-600 font-bold text-xs uppercase tracking-widest">Strategic Value Proposition</span>
          <h2 className="text-2xl sm:text-4xl font-serif font-extrabold text-neutral-900 mt-1">
            Why Global Indians Invest Through <span className="text-gold-600">Super Best Properties</span>
          </h2>
          <p className="text-neutral-600 text-sm sm:text-base mt-2">
            Engineered to overcome geographical distance, legal ambiguities, and execution friction for Non-Resident Indians worldwide.
          </p>
        </div>

        {/* 4 Pillars Grid / Table Representation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div 
                key={idx}
                className="bg-white rounded-3xl p-6 sm:p-7 border border-neutral-200/90 hover:border-gold-500 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-neutral-900 text-gold-400 flex items-center justify-center shadow group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-gold-50 text-gold-700 border border-gold-200 uppercase tracking-wider">
                      {pillar.tag}
                    </span>
                  </div>

                  <h3 className="text-xl font-serif font-bold text-neutral-900 group-hover:text-gold-600 transition-colors">
                    {pillar.title}
                  </h3>

                  <p className="text-sm text-neutral-600 mt-3 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-neutral-100 flex items-center justify-between text-xs font-semibold text-neutral-500">
                  <span className="flex items-center space-x-1.5 text-gold-600">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Guaranteed SLA & Deliverable</span>
                  </span>
                  <span className="text-neutral-400">Pillar #0{idx + 1}</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. END-TO-END NRI INVESTMENT PROCESS (4 SIMPLE STEPS) */}
      <section className="py-12 sm:py-16 bg-neutral-950 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-gold-400 font-bold text-xs uppercase tracking-widest">Frictionless Journey</span>
            <h2 className="text-2xl sm:text-4xl font-serif font-extrabold text-white mt-1">
              End-to-End NRI Investment Process <br />
              <span className="gold-gradient-text">(4 Simple Steps)</span>
            </h2>
            <p className="text-gray-400 text-sm sm:text-base mt-2">
              From the comfort of your living room abroad to registered land ownership in Hyderabad.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((st, i) => (
              <div 
                key={i}
                className="bg-neutral-900/90 rounded-2xl p-6 border border-neutral-800 hover:border-gold-500/70 transition-all flex flex-col justify-between relative group hover:shadow-2xl hover:shadow-gold-500/10"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-black font-serif text-gold-400 group-hover:scale-110 transition-transform inline-block">
                      {st.step}
                    </span>
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-gold-500/15 text-gold-300 border border-gold-500/30">
                      Step {i + 1}
                    </span>
                  </div>

                  <h3 className="font-serif font-bold text-lg text-white mb-1 group-hover:text-gold-300 transition-colors">
                    {st.title}
                  </h3>

                  <p className="text-xs text-gold-400/90 font-medium mb-3">
                    {st.summary}
                  </p>

                  <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                    {st.desc}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-neutral-800 flex items-center space-x-1.5 text-xs text-gold-400">
                  <span>✓</span>
                  <span>100% Digitally Assisted</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. NRI REGULATORY & FEMA QUICK-CHECK */}
      <section className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-gold-600 font-bold text-xs uppercase tracking-widest">Compliance & Regulations</span>
          <h2 className="text-2xl sm:text-4xl font-serif font-extrabold text-neutral-900 mt-1">
            NRI Regulatory & <span className="text-gold-600">FEMA Quick-Check</span>
          </h2>
          <p className="text-neutral-600 text-sm sm:text-base mt-2">
            Clear guidelines framed under the Foreign Exchange Management Act (FEMA) and Reserve Bank of India (RBI).
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {femaCheckpoints.map((pt, i) => {
            const Icon = pt.icon;
            return (
              <div 
                key={i}
                className="bg-white rounded-2xl p-6 border border-neutral-200/90 hover:border-gold-500/80 shadow-md hover:shadow-xl transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-gold-500/15 text-gold-600 flex items-center justify-center mb-4 font-bold">
                  <Icon className="w-5 h-5" />
                </div>
                <h4 className="font-serif font-bold text-base text-neutral-900 mb-2">
                  {pt.title}
                </h4>
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                  {pt.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. FREQUENTLY ASKED QUESTIONS (NRI DESK) */}
      <section className="py-12 sm:py-16 bg-neutral-100/70 border-t border-neutral-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-10">
            <span className="text-gold-600 font-bold text-xs uppercase tracking-widest">NRI Investor Queries</span>
            <h2 className="text-2xl sm:text-4xl font-serif font-extrabold text-neutral-900 mt-1">
              Frequently Asked Questions <span className="text-gold-600">(NRI Desk)</span>
            </h2>
            <p className="text-neutral-600 text-sm sm:text-base mt-2">
              Everything you need to know about purchasing, registering, and repatriating property in Hyderabad.
            </p>
          </div>

          <div className="space-y-4">
            {nriFaqs.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <div 
                  key={i}
                  className="bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? -1 : i)}
                    className="w-full p-5 text-left flex items-center justify-between font-serif font-bold text-base sm:text-lg text-neutral-900 hover:text-gold-700 transition-colors"
                  >
                    <span className="pr-4">{faq.q}</span>
                    <span className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-700 shrink-0">
                      {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-sm sm:text-base text-neutral-600 leading-relaxed border-t border-neutral-100 animate-fade-in">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 6. DIRECT NRI ADVISORY DESK (FOOTER CTA BANNER) */}
      <section className="py-14 sm:py-20 bg-gradient-to-r from-neutral-950 via-black to-neutral-950 text-white relative overflow-hidden border-t border-gold-500/30">
        <div className="absolute top-0 right-0 w-80 h-80 bg-gold-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-gold-500/20 border border-gold-400 text-gold-300 text-xs sm:text-sm font-bold uppercase tracking-wider mb-4 shadow-lg">
            <Sparkles className="w-4 h-4 text-gold-400" />
            <span>Priority Global Desk</span>
          </div>

          <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif font-black text-white tracking-tight leading-tight">
            Ready to Secure Your Asset in <br className="hidden sm:block" />
            <span className="gold-gradient-text">Hyderabad’s Next Growth Hub?</span>
          </h2>

          <p className="text-sm sm:text-base md:text-lg text-gray-300 max-w-3xl mx-auto mt-4 leading-relaxed">
            Speak directly with <strong className="text-gold-300">D. Suresh Baabu</strong> (Founder & CEO, Super Best Properties) for an unbiased, data-backed portfolio consultation.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
            <a
              href="https://wa.me/917075539189?text=Hello%20Mr.%20D.%20Suresh%20Baabu,%20I%20would%20like%20to%20book%20my%20free%20NRI%20strategy%20call%20with%20Super%20Best%20Properties."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-3.5 rounded-full gold-gradient-btn text-black font-extrabold text-sm sm:text-base tracking-wide shadow-2xl hover:shadow-gold-500/50 hover:scale-105 transition-all flex items-center justify-center space-x-2"
            >
              <span>Book Your Free NRI Strategy Call</span>
              <ArrowRight className="w-4 h-4 text-black" />
            </a>

            <a
              href="tel:7075539189"
              className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-neutral-900 hover:bg-neutral-800 border border-gold-400 text-gold-300 font-bold text-sm sm:text-base tracking-wide transition-all shadow-lg hover:scale-105 flex items-center justify-center space-x-2"
            >
              <Phone className="w-4 h-4 text-gold-400" />
              <span>Direct WhatsApp / Call: +91 70755 39189</span>
            </a>
          </div>

          <div className="mt-8 pt-6 border-t border-neutral-800 text-xs sm:text-sm text-gray-400 flex items-center justify-center space-x-2">
            <MapPin className="w-4 h-4 text-gold-400 shrink-0" />
            <span>Corporate Office: Vanasthalipuram, Hyderabad, Telangana</span>
          </div>

        </div>
      </section>

    </div>
  );
}
