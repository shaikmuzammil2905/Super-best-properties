import React, { useState } from 'react';
import { 
  HelpCircle, 
  Search, 
  ChevronDown, 
  ChevronUp, 
  Phone, 
  MessageCircle, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  MapPin, 
  Wallet, 
  Users 
} from 'lucide-react';

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedFaqs, setExpandedFaqs] = useState({});

  const toggleFaq = (catIndex, qIndex) => {
    const key = `${catIndex}-${qIndex}`;
    setExpandedFaqs(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const categories = [
    {
      id: 'legal',
      name: 'Approvals & Legal',
      icon: ShieldCheck,
      title: 'Category 1: Approvals, Legal & Due Diligence',
      faqs: [
        {
          q: '1. What is the difference between HMDA, DTCP, and TG RERA approvals?',
          a: `• HMDA (Hyderabad Metropolitan Development Authority): Governs urban planning and layout sanctions within the Hyderabad metropolitan region.\n• DTCP (Directorate of Town and Country Planning): Regulates layouts in municipalities and fast-growing corridors outside the core HMDA jurisdiction.\n• TG RERA (Telangana Real Estate Regulatory Authority): Mandatory project registration under the RERA Act for layouts exceeding 500 sq. meters or 8 plots, ensuring legal accountability, adherence to promised timelines, and standardized disclosures. At Super Best Properties, we prioritize projects backed by both layout sanctions and active TG RERA registration.`
        },
        {
          q: '2. How can I verify if a project’s legal documents are genuine?',
          a: `Every property we recommend undergoes strict title verification before it is presented to you. We provide copies of the Layout Permit (LP) number, TG RERA registration certificate, 30-year Encumbrance Certificate (EC), and parent link documents so you or your legal counsel can independently verify them on the official TG RERA and Telangana Registration (IGRS) portals.`
        },
        {
          q: '3. Are your projects free from prohibited land lists (such as Section 22-A or FTL/Buffer zones)?',
          a: `Yes. We strictly exclude disputed lands, water-body buffer zones (FTL), and restricted properties. Every recommended layout is vetted for clear, marketable title and immediate Sub-Registrar Office (SRO) registration eligibility.`
        }
      ]
    },
    {
      id: 'locations',
      name: 'Locations & Pricing',
      icon: MapPin,
      title: 'Category 2: Locations, Pricing & Appreciation',
      faqs: [
        {
          q: '4. Which Hyderabad growth corridors does Super Best Properties specialize in?',
          a: `We focus on high-infrastructure-growth corridors across East, West, North, and South Hyderabad, strategically positioned along the 158-km Outer Ring Road (ORR) and the upcoming 340-km Regional Ring Road (RRR) wealth belt:\n\n• East Hyderabad (NH-65 & Warangal Highway Belt): Choutuppal (RRR & NH-65 Junction), Pedda Amberpet, LB Nagar, Hasthinapuram, Ghatkesar, Bhongir, and Yadagirigutta.\n• South Hyderabad (Airport, Srisailam & Bangalore Highway Belt): Yacharam (Near Bharat Future City), Ibrahimpatnam, Tukkuguda, Shamshabad, Kothur, and Shadnagar.\n• West Hyderabad (IT & Mumbai Highway Belt): Kokapet, Tellapur, Kollur, Patancheru, Shankarpally, Chevella, and Sadashivpet.\n• North Hyderabad (Nagpur Highway & Medak Belt): Kompally, Medchal, Shamirpet, Toopran, and Gajwel.\n\nBy concentrating on radial roads, highway junctions, and proposed RRR interchange zones, we help investors enter high-potential micro-markets early while ensuring 100% HMDA, DTCP, and TG RERA compliance.`
        },
        {
          q: '5. What is the starting budget for open plots in your portfolio?',
          a: `Our curated open plot investments typically start from ₹21 Lakhs onwards (for 150 to 180 sq. yard plots in HMDA/DTCP gated communities), scaling up to premium highway-facing and commercial investment plots depending on location and plot size.`
        },
        {
          q: '6. Are there any hidden charges over and above the quoted per-square-yard price?',
          a: `No. Transparency is one of our core values. Before you book, you receive a complete, itemized quotation cost sheet detailing the base plot cost, facing/corner charges (if applicable), development/clubhouse charges, and estimated government stamp duty and registration fees.`
        }
      ]
    },
    {
      id: 'booking',
      name: 'Booking & Registration',
      icon: Wallet,
      title: 'Category 3: Booking, Loans & Registration',
      faqs: [
        {
          q: '7. Are bank loans available for purchasing open plots?',
          a: `Yes. Leading nationalized and private banks—including SBI, HDFC, ICICI, and Union Bank—offer plot loans (typically up to 70%–75% of the property value, subject to individual credit eligibility) for our HMDA and DTCP-approved gated layouts.`
        },
        {
          q: '8. What are the standard stamp duty and registration charges in Telangana?',
          a: `In Telangana, property registration charges typically total 7.5% of the sale deed value or government market value (whichever is higher), comprising 5.5% stamp duty, 1.5% transfer duty, and 0.5% registration fee.`
        },
        {
          q: '9. What is the step-by-step process from site visit to plot registration?',
          a: `1. Free Site Visit: Pick-up and drop-off arranged from Hyderabad for a guided physical inspection of the project and surrounding infrastructure.\n2. Plot Selection & Blocking: Select your preferred plot facing and dimensions, review the legal docket, and block the plot with an initial token amount.\n3. Agreement & Payment: Complete the Agreement of Sale and remit funds via transparent banking channels (or bank loan disbursement).\n4. Registration & Handover: Our documentation team books your SRO slot, coordinates biometric registration, and hands over your registered Sale Deed and plot possession certificate.`
        }
      ]
    },
    {
      id: 'about-us',
      name: 'Working with Us',
      icon: Users,
      title: 'Category 4: Working with Super Best Properties',
      faqs: [
        {
          q: '10. Do you charge any brokerage or consultation fees from buyers?',
          a: `For primary developer-allotted open plots and projects represented by Super Best Properties, we offer zero-brokerage advisory and site visit assistance. For specialized secondary/resale transactions, any applicable facilitation fee is disclosed upfront in writing before site inspection.`
        },
        {
          q: '11. Will you help me resell my plot in the future?',
          a: `Yes. We believe in long-term relationships beyond the initial transaction. Our team assists existing clients with periodic market valuation updates and connects you with verified buyers when you decide to exit or upgrade your portfolio.`
        }
      ]
    }
  ];

  const filteredCategories = categories.map(cat => {
    if (activeCategory !== 'all' && cat.id !== activeCategory) {
      return null;
    }
    const matchingFaqs = cat.faqs.filter(f => 
      !searchTerm || 
      f.q.toLowerCase().includes(searchTerm.toLowerCase()) || 
      f.a.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (matchingFaqs.length === 0) return null;
    return { ...cat, faqs: matchingFaqs };
  }).filter(Boolean);

  return (
    <div className="bg-[#FAFAFA] min-h-screen">
      
      {/* HERO SECTION */}
      <section className="bg-gradient-to-b from-neutral-950 via-neutral-900 to-black text-white py-14 sm:py-20 border-b border-gold-500/20 relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center max-w-4xl">
          
          {/* Badge: Investor Knowledge Hub */}
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-gold-500/15 border border-gold-400 text-gold-300 text-xs sm:text-sm font-bold uppercase tracking-wider mb-5 shadow-lg">
            <Sparkles className="w-4 h-4 text-gold-400" />
            <span>Investor Knowledge Hub</span>
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-black tracking-tight leading-tight text-white mb-6">
            Everything You Need to Know Before <br className="hidden sm:block" />
            <span className="gold-gradient-text">Investing in Telangana Real Estate</span>
          </h1>

          {/* Sub-headline */}
          <p className="text-sm sm:text-base md:text-lg text-gray-300 leading-relaxed font-normal max-w-3xl mx-auto mb-8">
            Clear, straightforward answers on legal approvals, site visits, payment milestones, and registration—curated by Super Best Properties to help you invest with complete confidence.
          </p>

          {/* Search Bar inside Hero */}
          <div className="max-w-xl mx-auto relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input 
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search legal approvals, RERA, registration, loans..."
              className="w-full pl-12 pr-4 py-3.5 rounded-full bg-neutral-900/90 border border-gold-500/40 text-white placeholder-gray-400 focus:outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-500/20 text-sm shadow-xl"
            />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>

        </div>
      </section>

      {/* CATEGORY FILTER TABS */}
      <section className="bg-white border-b border-neutral-200 sticky top-[72px] z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 overflow-x-auto no-scrollbar">
          <div className="flex items-center space-x-2 min-w-max">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all ${
                activeCategory === 'all'
                  ? 'bg-neutral-900 text-gold-400 shadow'
                  : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
              }`}
            >
              All Questions (11)
            </button>

            {categories.map((c) => {
              const Icon = c.icon;
              return (
                <button
                  key={c.id}
                  onClick={() => setActiveCategory(c.id)}
                  className={`flex items-center space-x-1.5 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                    activeCategory === c.id
                      ? 'bg-neutral-900 text-gold-400 shadow'
                      : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{c.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQS CONTENT ACCORDIONS */}
      <section className="py-12 sm:py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredCategories.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-neutral-200 p-8">
            <HelpCircle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <h3 className="text-xl font-serif font-bold text-neutral-900">No matching answers found</h3>
            <p className="text-sm text-neutral-500 mt-1">Try searching with a different term or reach out directly.</p>
            <button
              onClick={() => { setSearchTerm(''); setActiveCategory('all'); }}
              className="mt-4 px-5 py-2 rounded-full gold-gradient-btn text-black font-bold text-xs"
            >
              Reset Search Filter
            </button>
          </div>
        ) : (
          <div className="space-y-12">
            {filteredCategories.map((cat, catIdx) => (
              <div key={cat.id} className="space-y-4">
                
                {/* Category Header */}
                <div className="flex items-center space-x-3 pb-2 border-b-2 border-gold-500/30">
                  <cat.icon className="w-6 h-6 text-gold-600 shrink-0" />
                  <h2 className="text-xl sm:text-2xl font-serif font-bold text-neutral-900">
                    {cat.title}
                  </h2>
                </div>

                {/* Questions */}
                <div className="space-y-3 pt-2">
                  {cat.faqs.map((faq, qIdx) => {
                    const key = `${catIdx}-${qIdx}`;
                    const isExpanded = expandedFaqs[key] ?? (catIdx === 0 && qIdx === 0);
                    return (
                      <div 
                        key={qIdx}
                        className="bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden hover:border-gold-500/60 transition-all"
                      >
                        <button
                          onClick={() => toggleFaq(catIdx, qIdx)}
                          className="w-full p-5 text-left flex items-start justify-between font-serif font-bold text-base sm:text-lg text-neutral-900 hover:text-gold-700 transition-colors"
                        >
                          <span className="pr-4 leading-snug">{faq.q}</span>
                          <span className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-700 shrink-0 mt-0.5">
                            {isExpanded ? <ChevronUp className="w-4 h-4 text-gold-600" /> : <ChevronDown className="w-4 h-4" />}
                          </span>
                        </button>

                        {isExpanded && (
                          <div className="px-5 pb-5 pt-2 text-sm sm:text-base text-neutral-700 leading-relaxed border-t border-neutral-100 bg-neutral-50/50 whitespace-pre-line animate-fade-in">
                            {faq.a}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

              </div>
            ))}
          </div>
        )}
      </section>

      {/* STILL HAVE QUESTIONS? (BOTTOM CTA BANNER) */}
      <section className="py-14 sm:py-20 bg-gradient-to-r from-neutral-950 via-black to-neutral-950 text-white relative overflow-hidden border-t border-gold-500/30">
        <div className="absolute top-0 right-0 w-80 h-80 bg-gold-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-gold-500/20 border border-gold-400 text-gold-300 text-xs sm:text-sm font-bold uppercase tracking-wider mb-4 shadow-lg">
            <Sparkles className="w-4 h-4 text-gold-400" />
            <span>Still Have Questions?</span>
          </div>

          <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif font-black text-white tracking-tight leading-tight">
            Get Direct Answers from a Real Estate Advisor with <br className="hidden sm:block" />
            <span className="gold-gradient-text">25+ Years of Experience</span>
          </h2>

          <p className="text-sm sm:text-base md:text-lg text-gray-300 max-w-2xl mx-auto mt-4 leading-relaxed">
            Speak directly with <strong className="text-gold-300">D. Suresh Baabu</strong> (Founder & CEO, Super Best Properties) for personalized guidance tailored to your budget and investment horizon.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
            <a
              href="https://wa.me/917075539189?text=Hello%20Mr.%20D.%20Suresh%20Baabu,%20I%20have%20questions%20regarding%20investing%20with%20Super%20Best%20Properties%20and%20would%20like%20to%20book%20a%20free%20consultation."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-3.5 rounded-full gold-gradient-btn text-black font-extrabold text-sm sm:text-base tracking-wide shadow-2xl hover:shadow-gold-500/50 hover:scale-105 transition-all flex items-center justify-center space-x-2"
            >
              <span>Book a Free Consultation</span>
              <ArrowRight className="w-4 h-4 text-black" />
            </a>

            <a
              href="tel:7075539189"
              className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-neutral-900 hover:bg-neutral-800 border border-gold-400 text-gold-300 font-bold text-sm sm:text-base tracking-wide transition-all shadow-lg hover:scale-105 flex items-center justify-center space-x-2"
            >
              <Phone className="w-4 h-4 text-gold-400" />
              <span>Direct Call / WhatsApp: +91 70755 39189</span>
            </a>
          </div>

          <div className="mt-8 pt-6 border-t border-neutral-800 text-xs sm:text-sm text-gray-400 flex items-center justify-center space-x-2">
            <MapPin className="w-4 h-4 text-gold-400 shrink-0" />
            <span>Office Location: Vanasthalipuram, Hyderabad, Telangana</span>
          </div>

        </div>
      </section>

    </div>
  );
}
