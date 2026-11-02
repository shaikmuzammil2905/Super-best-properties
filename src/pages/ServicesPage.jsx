import React, { useState } from 'react';
import EnquiryModal from '../components/EnquiryModal';
import { 
  Home, 
  Building2, 
  TrendingUp, 
  Compass, 
  Handshake, 
  FileCheck2, 
  BadgePercent, 
  ArrowRight, 
  Sparkles, 
  MessageCircle, 
  Phone,
  ShieldCheck
} from 'lucide-react';

export default function ServicesPage() {
  const [selectedService, setSelectedService] = useState(null);
  const [enquiryOpen, setEnquiryOpen] = useState(false);

  const services = [
    {
      id: 'srv-1',
      icon: Home,
      title: 'Residential Property Advisory',
      tagline: 'Plots, Apartments, Villas & Independent Houses',
      description: 'Comprehensive guidance on identifying and securing ideal residential plots, luxury apartments, standalone independent villas, and gated community housing opportunities tailored to family lifestyles and future value appreciation.',
      deliverables: ['HMDA & DTCP layout verification', 'Micro-market price benchmarking', 'Architectural & Vastu compliance check', 'Customized site visits with personal advisor']
    },
    {
      id: 'srv-2',
      icon: Building2,
      title: 'Commercial Property Solutions',
      tagline: 'High-Street Retail, Corporate Offices & Godowns',
      description: 'Assistance in identifying and acquiring prime commercial plots, Grade-A IT office spaces, high-footfall retail showrooms, warehousing godowns, and business premises across Hyderabad’s most vibrant economic corridors.',
      deliverables: ['High rental yield forecasting', 'Lease tenure & tenant feasibility', 'Location footfall & highway transit analysis', 'Commercial zoning & fire clearance checks']
    },
    {
      id: 'srv-3',
      icon: TrendingUp,
      title: 'Property Investment Advisory',
      tagline: 'High-ROI Land, Commercial & Residential Wealth Creation',
      description: 'Helping investors, HNIs and NRIs evaluate high-potential land, residential, and commercial property opportunities aligned with their risk profiles, capital preservation goals, and aggressive multi-year appreciation objectives.',
      deliverables: ['Macro & micro-market growth analytics', 'Exit strategy planning & liquidity review', 'Portfolio diversification roadmaps', 'Quarterly capital appreciation reports']
    },
    {
      id: 'srv-4',
      icon: Compass,
      title: 'Land & Development Opportunities',
      tagline: 'Joint Ventures, Plotted Layouts & Farm Parcels',
      description: 'Connecting interested buyers, builders, and institutional investors with strategic land parcels, joint-development opportunities, agricultural holdings, and property owners with clear, unencumbered titles.',
      deliverables: ['Direct landowner negotiations', 'Joint development ratio structuring', 'Title search & boundary survey reports', 'Master plan & master road connectivity']
    },
    {
      id: 'srv-5',
      icon: Handshake,
      title: 'Property Buying & Selling Assistance',
      tagline: 'End-to-End Discovery, Site Visits & Closing Support',
      description: 'Professional assistance in property discovery, shortlisting, private site visits, price negotiations, buyer-seller alignment, and smooth, secure transaction coordination from agreement to registration.',
      deliverables: ['Curated shortlists matching exact budget', 'Scheduled chauffeured site inspections', 'Fair market valuation & negotiation', 'Escrow & documentation assistance']
    },
    {
      id: 'srv-6',
      icon: FileCheck2,
      title: 'Legal & Documentation Assistance',
      tagline: 'Title Scrutiny, Link Documents & RERA Verification',
      description: 'Helping customers navigate property-related legal documentation, 30-year link document verification, encumbrance certificates (EC), municipal sanctions, and revenue records with clarity and confidence.',
      deliverables: ['30-year Encumbrance Certificate scrutiny', 'Revenue land record & Dharani verification', 'HMDA / DTCP / GHMC approval confirmation', 'Safe deed drafting with experienced legal counsel']
    },
    {
      id: 'srv-7',
      icon: BadgePercent,
      title: 'Bank Loan & Financial Assistance',
      tagline: 'Competitive Home Loans & Fast Sanctions',
      description: 'Connecting eligible customers with suitable property financing options through leading nationalized and private banking institutions (SBI, HDFC, ICICI, etc.) with doorstep document pickup and preferential interest rates.',
      deliverables: ['Pre-approved loan eligibility assessment', 'Tie-ups with leading national banks', 'Doorstep document collection & fast clearance', 'Transparent processing with no hidden charges']
    }
  ];

  const handleOpenEnquiry = (srv) => {
    setSelectedService({
      title: srv.title,
      location: 'Hyderabad, Telangana',
      price: 'Professional Advisory',
      categoryName: srv.title
    });
    setEnquiryOpen(true);
  };

  return (
    <div className="bg-[#FAFAFA] min-h-screen py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-600 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Comprehensive Real Estate Solutions</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-black text-neutral-900 tracking-tight">
            Our Professional <span className="gold-gradient-text">Advisory Services</span>
          </h1>
          <p className="mt-3 text-sm sm:text-base text-neutral-600">
            From initial discovery and legal scrutiny to financing and closing, we stand with you at every step of your property journey.
          </p>
        </div>

        {/* 7 Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((srv, idx) => {
            const Icon = srv.icon;
            return (
              <div
                key={srv.id}
                className="bg-white rounded-3xl p-7 border border-neutral-200/90 hover:border-gold-500/60 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-neutral-50 group-hover:bg-gold-500/15 border border-neutral-200 group-hover:border-gold-400 flex items-center justify-center text-neutral-800 group-hover:text-gold-600 transition-all mb-5 shadow-inner">
                    <Icon className="w-7 h-7" />
                  </div>

                  <span className="text-[11px] font-bold text-gold-600 uppercase tracking-wider">
                    Service #{idx + 1}
                  </span>
                  
                  <h3 className="text-xl font-bold font-serif text-neutral-900 mt-1 group-hover:text-gold-700 transition-colors">
                    {srv.title}
                  </h3>

                  <p className="text-xs font-semibold text-neutral-500 mt-1">
                    {srv.tagline}
                  </p>

                  <p className="text-sm text-neutral-600 mt-3.5 leading-relaxed">
                    {srv.description}
                  </p>

                  <div className="mt-5 pt-4 border-t border-neutral-100 space-y-2">
                    <span className="block text-[11px] font-bold text-neutral-400 uppercase tracking-wider">What We Deliver</span>
                    {srv.deliverables.map((d, i) => (
                      <div key={i} className="flex items-start space-x-2 text-xs text-neutral-700">
                        <span className="text-gold-500 font-bold shrink-0">✓</span>
                        <span>{d}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center space-x-3">
                  <button
                    onClick={() => handleOpenEnquiry(srv)}
                    className="flex-1 py-2.5 px-4 rounded-xl gold-gradient-btn text-black font-bold text-xs tracking-wide text-center"
                  >
                    Consult on This Service
                  </button>

                  <a
                    href={`https://wa.me/917075539189?text=${encodeURIComponent(`Hello Super Best Properties, I need assistance with ${srv.title}.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white border border-emerald-200 transition-colors"
                    title="WhatsApp Consultation"
                  >
                    <MessageCircle className="w-4 h-4" />
                  </a>
                </div>

              </div>
            );
          })}
        </div>

        {/* Call to action footer banner */}
        <div className="mt-16 bg-neutral-950 text-white rounded-3xl p-8 sm:p-12 border border-gold-500/30 text-center space-y-4">
          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white">
            Have a custom requirement or need an in-person discussion?
          </h3>
          <p className="text-gray-400 text-sm max-w-xl mx-auto">
            Visit our office at Vanasthalipuram Main Road, Hyderabad or call our principal advisor directly.
          </p>
          <div className="pt-2 flex justify-center gap-4 flex-wrap">
            <a
              href="tel:7075539189"
              className="px-6 py-3 rounded-full gold-gradient-btn text-black font-extrabold text-sm flex items-center space-x-2"
            >
              <Phone className="w-4 h-4" />
              <span>Call: +91 7075539189</span>
            </a>
          </div>
        </div>

      </div>

      <EnquiryModal
        isOpen={enquiryOpen}
        onClose={() => setEnquiryOpen(false)}
        property={selectedService}
      />
    </div>
  );
}
