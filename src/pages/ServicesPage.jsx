import React, { useState, useEffect } from 'react';
import { api, initialServices } from '../services/api';
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
  Phone
} from 'lucide-react';

const iconMap = {
  'srv-1': Home,
  'srv-2': Building2,
  'srv-3': TrendingUp,
  'srv-4': Compass,
  'srv-5': Handshake,
  'srv-6': FileCheck2,
  'srv-7': BadgePercent
};

export default function ServicesPage() {
  const [services, setServices] = useState(() => initialServices.slice(0, 6));

  useEffect(() => {
    let isMounted = true;
    async function loadServices() {
      try {
        const srvs = await api.getServices();
        if (isMounted && Array.isArray(srvs) && srvs.length > 0) {
          setServices(srvs.slice(0, 6));
        }
      } catch (err) {
        console.error('Failed to load services:', err);
      }
    }
    loadServices();
    return () => { isMounted = false; };
  }, []);

  const getWhatsAppUrl = (srvTitle) => {
    return `https://wa.me/917075539189?text=${encodeURIComponent(`Hello Super Best Properties, I need assistance with ${srvTitle}. Please provide full details.`)}`;
  };

  const handleWhatsAppRedirect = (srvTitle) => {
    window.open(getWhatsAppUrl(srvTitle), '_blank', 'noopener,noreferrer');
  };

  const displayServices = (Array.isArray(services) && services.length > 0) 
    ? services.slice(0, 6) 
    : initialServices.slice(0, 6);

  return (
    <div className="bg-[#FAFAFA] min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header - Compact & Grand */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-600 text-xs font-bold uppercase tracking-wider mb-2.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Comprehensive Real Estate Solutions</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif font-black text-neutral-900 tracking-tight">
            Our Professional <span className="gold-gradient-text">Advisory Services</span>
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-neutral-600">
            Click any service to connect directly with our senior property advisors on WhatsApp for verified documentation, market analytics, and personalized site inspections.
          </p>
        </div>

        {/* Dynamic Services Grid - 6 Grand Level Services Synced with Admin Panel */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {displayServices.map((srv, idx) => {
            const waUrl = getWhatsAppUrl(srv.title);
            const deliverables = Array.isArray(srv.deliverables) ? srv.deliverables : [];
            const serviceImg = srv.image || `/images/services/service-${Math.min(idx + 1, 6)}-${['residential','commercial','investment','land','buying-selling','legal'][Math.min(idx, 5)]}.png`;

            return (
              <div
                key={srv.id}
                onClick={() => handleWhatsAppRedirect(srv.title)}
                className="bg-white rounded-3xl p-5 sm:p-6 border border-neutral-200/90 hover:border-gold-500/80 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group cursor-pointer transform hover:-translate-y-1.5 animate-fade-in"
              >
                <div>
                  {/* Grand Level Picture Banner - Clean and Unobstructed */}
                  <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden mb-4 bg-neutral-950 border border-neutral-200/80 group-hover:border-gold-500/50 shadow-sm transition-all duration-500">
                    <img 
                      src={serviceImg} 
                      alt={srv.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      onError={(e) => {
                        e.target.src = '/images/services/service-1-residential.png';
                      }}
                    />
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold font-serif text-neutral-900 group-hover:text-gold-700 transition-colors">
                    {srv.title}
                  </h3>

                  {srv.tagline && (
                    <p className="text-xs font-semibold text-neutral-500 mt-0.5">
                      {srv.tagline}
                    </p>
                  )}

                  <p className="text-xs sm:text-sm text-neutral-600 mt-2.5 leading-relaxed line-clamp-3">
                    {srv.description}
                  </p>

                  {/* What We Deliver List */}
                  {deliverables.length > 0 && (
                    <div className="mt-4 pt-3.5 border-t border-neutral-100 space-y-1.5">
                      <span className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider">What We Deliver</span>
                      {deliverables.map((d, i) => (
                        <div key={i} className="flex items-start space-x-2 text-xs text-neutral-700">
                          <span className="text-gold-500 font-bold shrink-0">✓</span>
                          <span>{d}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Direct Enquire Now Action Button as requested */}
                <div className="mt-5 pt-3.5 border-t border-neutral-100">
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="w-full py-2.5 px-4 rounded-xl gold-gradient-btn text-black font-extrabold text-xs sm:text-sm tracking-wide text-center flex items-center justify-center space-x-2 shadow-md hover:shadow-xl hover:scale-[1.02] active:scale-95 transition-all"
                  >
                    <span>Enquire Now</span>
                    <ArrowRight className="w-3.5 h-3.5 text-black shrink-0" />
                  </a>
                </div>

              </div>
            );
          })}
        </div>

        {/* Call to action footer banner */}
        <div className="mt-10 sm:mt-12 bg-neutral-950 text-white rounded-3xl p-6 sm:p-10 border border-gold-500/30 text-center space-y-3">
          <h3 className="text-xl sm:text-2xl font-serif font-bold text-white">
            Have a custom requirement or need an in-person discussion?
          </h3>
          <p className="text-gray-400 text-xs sm:text-sm max-w-xl mx-auto">
            Visit our office at Vanasthalipuram Main Road, Hyderabad or call our principal advisor directly.
          </p>
          <div className="pt-2 flex justify-center gap-4 flex-wrap">
            <a
              href="tel:7075539189"
              className="px-6 py-2.5 rounded-full gold-gradient-btn text-black font-extrabold text-xs sm:text-sm flex items-center space-x-2 shadow-lg"
            >
              <Phone className="w-4 h-4" />
              <span>Call: +91 7075539189</span>
            </a>
          </div>
        </div>

      </div>

    </div>
  );
}
