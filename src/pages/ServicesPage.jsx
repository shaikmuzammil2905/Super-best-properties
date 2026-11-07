import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
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
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadServices() {
      try {
        const srvs = await api.getServices();
        setServices(srvs);
      } catch (err) {
        console.error('Failed to load services:', err);
      } finally {
        setLoading(false);
      }
    }
    loadServices();
  }, []);

  const getWhatsAppUrl = (srvTitle) => {
    return `https://wa.me/917075539189?text=${encodeURIComponent(`Hello Super Best Properties, I need assistance with ${srvTitle}. Please provide full details.`)}`;
  };

  const handleWhatsAppRedirect = (srvTitle) => {
    window.open(getWhatsAppUrl(srvTitle), '_blank', 'noopener,noreferrer');
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
            Click any service to connect directly with our senior property advisors on WhatsApp for verified documentation, market analytics, and personalized site inspections.
          </p>
        </div>

        {/* Dynamic Services Grid - Synced directly with Admin Panel & Supabase */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((srv, idx) => {
            const Icon = iconMap[srv.id] || Building2;
            const waUrl = getWhatsAppUrl(srv.title);
            const deliverables = Array.isArray(srv.deliverables) ? srv.deliverables : [];

            return (
              <div
                key={srv.id}
                onClick={() => handleWhatsAppRedirect(srv.title)}
                className="bg-white rounded-3xl p-6 sm:p-7 border border-neutral-200/90 hover:border-gold-500/80 shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group cursor-pointer transform hover:-translate-y-1.5 animate-fade-in"
              >
                <div>
                  {/* Top Icon */}
                  <div className="w-14 h-14 rounded-2xl bg-neutral-50 group-hover:bg-gold-500/15 border border-neutral-200 group-hover:border-gold-400 flex items-center justify-center text-neutral-800 group-hover:text-gold-600 transition-all mb-4 shadow-inner">
                    <Icon className="w-7 h-7" />
                  </div>

                  <span className="text-[11px] font-bold text-gold-600 uppercase tracking-wider">
                    Service #{idx + 1}
                  </span>
                  
                  <h3 className="text-xl font-bold font-serif text-neutral-900 mt-1 group-hover:text-gold-700 transition-colors">
                    {srv.title}
                  </h3>

                  {srv.tagline && (
                    <p className="text-xs font-semibold text-neutral-500 mt-1">
                      {srv.tagline}
                    </p>
                  )}

                  <p className="text-sm text-neutral-600 mt-3.5 leading-relaxed line-clamp-3">
                    {srv.description}
                  </p>

                  {/* What We Deliver List */}
                  {deliverables.length > 0 && (
                    <div className="mt-5 pt-4 border-t border-neutral-100 space-y-2">
                      <span className="block text-[11px] font-bold text-neutral-400 uppercase tracking-wider">What We Deliver</span>
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
                <div className="mt-6 pt-4 border-t border-neutral-100">
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="w-full py-3 px-4 rounded-xl gold-gradient-btn text-black font-extrabold text-xs sm:text-sm tracking-wide text-center flex items-center justify-center space-x-2 shadow-md hover:shadow-xl hover:scale-[1.02] active:scale-95 transition-all"
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
              className="px-6 py-3 rounded-full gold-gradient-btn text-black font-extrabold text-sm flex items-center space-x-2 shadow-lg"
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
