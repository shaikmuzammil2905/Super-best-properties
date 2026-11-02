import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import HeroSection from '../components/HeroSection';
import PropertyCard from '../components/PropertyCard';
import CategoryGrid from '../components/CategoryGrid';
import ProjectsHighlightsSection from '../components/ProjectsHighlightsSection';
import FounderSection from '../components/FounderSection';
import EnquiryModal from '../components/EnquiryModal';
import { api } from '../services/api';
import { initialProperties } from '../data/mockData';
import { 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Users, 
  Award,
  TrendingUp, 
  Compass,
  Phone,
  MessageCircle,
  Building
} from 'lucide-react';

export default function HomePage() {
  const [featuredProperties, setFeaturedProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quickEnquiryOpen, setQuickEnquiryOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);

  useEffect(() => {
    async function loadData() {
      try {
        const props = await api.getProperties({ featured: 'true' });
        if (Array.isArray(props) && props.length > 0) {
          setFeaturedProperties(props);
        } else {
          // Never leave section empty (fixes image copy 7.png issue)
          setFeaturedProperties(initialProperties.filter(p => p.featured));
        }
      } catch (err) {
        console.error('Failed to load featured properties:', err);
        setFeaturedProperties(initialProperties.filter(p => p.featured));
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const openEnquiry = (property) => {
    setSelectedProperty(property);
    setQuickEnquiryOpen(true);
  };

  return (
    <div className="space-y-0 overflow-hidden">
      
      {/* 1. Hero Section with Desktop (hero-desktop.png) and Bright Mobile (hero-mobile.png) */}
      <HeroSection />

      {/* 2. Featured Properties Section matching Reference Image 1 & 2 */}
      <section className="py-20 bg-[#FAFAFA] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Heading with decorative gold lines */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center space-x-3">
              <div className="h-[1px] w-12 sm:w-24 bg-gradient-to-r from-transparent to-gold-500"></div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-neutral-900 tracking-tight">
                Featured Properties
              </h2>
              <div className="h-[1px] w-12 sm:w-24 bg-gradient-to-l from-transparent to-gold-500"></div>
            </div>
            <p className="mt-2 text-xs sm:text-sm text-neutral-600 font-medium">
              Handpicked luxury villas, HMDA approved plots, and modern apartments
            </p>
          </div>

          {/* Properties Grid (Guaranteed rich content with photos, prices & locations) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {(featuredProperties.length > 0 ? featuredProperties : initialProperties.slice(0, 4)).map((prop) => (
              <PropertyCard key={prop.id} property={prop} />
            ))}
          </div>

          {/* Explore all CTA */}
          <div className="mt-12 text-center">
            <Link
              to="/properties"
              className="inline-flex items-center space-x-2 px-8 py-3.5 rounded-full gold-gradient-btn text-black font-extrabold text-sm sm:text-base tracking-wide shadow-lg hover:shadow-xl transition-all"
            >
              <span>View All Properties ({featuredProperties.length ? '16+' : 'All'})</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </section>

      {/* 3. Property Category Selection Page / Section based on Reference Image 3 ("What are you looking for?") */}
      <CategoryGrid />

      {/* 4. Our Projects & Highlights Section matching Reference Image 1 & 2 */}
      <ProjectsHighlightsSection />

      {/* 5. Our Team / Founder Section (D. Suresh Baabu) matching Reference Image 4 */}
      <FounderSection />

      {/* 6. Why Choose Super Best Properties (6 Feature Cards from Prompt) */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-600 text-xs font-bold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>The Super Best Advantage</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-neutral-900">
              Real Estate Guidance <span className="gold-gradient-text">You Can Trust</span>
            </h2>
            <p className="mt-3 text-neutral-600 text-sm sm:text-base">
              Why thousands of homebuyers, NRI investors, and entrepreneurs choose us for their property journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            
            <div className="p-6 rounded-2xl bg-neutral-50 border border-neutral-200/90 hover:border-gold-500/60 hover:shadow-xl transition-all group">
              <div className="w-12 h-12 rounded-xl bg-gold-500/15 flex items-center justify-center text-gold-600 mb-4 group-hover:scale-110 transition-transform">
                <Building className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-neutral-900 group-hover:text-gold-700 transition-colors">
                Diverse Property Portfolio
              </h3>
              <p className="mt-2 text-sm text-neutral-600 leading-relaxed">
                From HMDA open plots and high-rise apartments to standalone villas, commercial office spaces, and agricultural lands across Hyderabad.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-neutral-50 border border-neutral-200/90 hover:border-gold-500/60 hover:shadow-xl transition-all group">
              <div className="w-12 h-12 rounded-xl bg-gold-500/15 flex items-center justify-center text-gold-600 mb-4 group-hover:scale-110 transition-transform">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-neutral-900 group-hover:text-gold-700 transition-colors">
                Customer-Centric Advisory
              </h3>
              <p className="mt-2 text-sm text-neutral-600 leading-relaxed">
                We take time to understand your lifestyle aspirations and financial objectives, tailoring recommendations with honest, unbiased guidance.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-neutral-50 border border-neutral-200/90 hover:border-gold-500/60 hover:shadow-xl transition-all group">
              <div className="w-12 h-12 rounded-xl bg-gold-500/15 flex items-center justify-center text-gold-600 mb-4 group-hover:scale-110 transition-transform">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-neutral-900 group-hover:text-gold-700 transition-colors">
                In-Depth Market Understanding
              </h3>
              <p className="mt-2 text-sm text-neutral-600 leading-relaxed">
                Extensive boots-on-the-ground knowledge of Hyderabad micro-markets, upcoming infrastructure masterplans, and appreciation trends.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-neutral-50 border border-neutral-200/90 hover:border-gold-500/60 hover:shadow-xl transition-all group">
              <div className="w-12 h-12 rounded-xl bg-gold-500/15 flex items-center justify-center text-gold-600 mb-4 group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-neutral-900 group-hover:text-gold-700 transition-colors">
                Transparent Communication
              </h3>
              <p className="mt-2 text-sm text-neutral-600 leading-relaxed">
                Zero hidden surprises. 100% legal clarity on titles, approvals, encumbrances, and verified documentation from day one.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-neutral-50 border border-neutral-200/90 hover:border-gold-500/60 hover:shadow-xl transition-all group">
              <div className="w-12 h-12 rounded-xl bg-gold-500/15 flex items-center justify-center text-gold-600 mb-4 group-hover:scale-110 transition-transform">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-neutral-900 group-hover:text-gold-700 transition-colors">
                Professional Approach
              </h3>
              <p className="mt-2 text-sm text-neutral-600 leading-relaxed">
                End-to-end assistance from initial property discovery and organized site visits to negotiation, loan coordination, and registration.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-neutral-50 border border-neutral-200/90 hover:border-gold-500/60 hover:shadow-xl transition-all group">
              <div className="w-12 h-12 rounded-xl bg-gold-500/15 flex items-center justify-center text-gold-600 mb-4 group-hover:scale-110 transition-transform">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-neutral-900 group-hover:text-gold-700 transition-colors">
                Long-Term Association
              </h3>
              <p className="mt-2 text-sm text-neutral-600 leading-relaxed">
                Our relationship continues well beyond a single deal, helping you build, protect, and grow multi-generational family wealth.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 7. Quick Consultation Callout Banner */}
      <section className="bg-black py-16 border-t border-gold-500/20 text-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-white">
            Looking for something specific in Hyderabad?
          </h2>
          <p className="text-gray-400 text-sm sm:text-base max-w-2xl mx-auto">
            Our advisory team is available to assist you with customized property options matching your exact budget and location requirements.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <a
              href="https://wa.me/917075539189?text=Hello%20Super%20Best%20Properties,%20I%20would%20like%20to%20discuss%20property%20options."
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3.5 rounded-full gold-gradient-btn text-black font-extrabold text-sm sm:text-base shadow-lg hover:shadow-gold-500/40 transition-all flex items-center space-x-2"
            >
              <MessageCircle className="w-5 h-5 fill-current" />
              <span>Talk to Advisor on WhatsApp</span>
            </a>
            <a
              href="tel:7075539189"
              className="px-8 py-3.5 rounded-full bg-neutral-900 hover:bg-neutral-800 border border-gold-400/50 text-gold-400 font-bold text-sm sm:text-base transition-all flex items-center space-x-2"
            >
              <Phone className="w-4 h-4" />
              <span>Call: +91 7075539189</span>
            </a>
          </div>
        </div>
      </section>

      {/* Interactive Quick Site Visit Enquiry Popup */}
      <EnquiryModal
        isOpen={quickEnquiryOpen}
        onClose={() => setQuickEnquiryOpen(false)}
        property={selectedProperty}
      />

    </div>
  );
}
