import React from 'react';
import { Link } from 'react-router-dom';
import { Gem, Handshake, Home, ShieldCheck, ArrowRight, Award } from 'lucide-react';

export default function ProjectsHighlightsSection() {
  const highlights = [
    {
      icon: Gem,
      title: 'Premium Locations',
      description: 'Strategic growth corridors near IT hubs, airport highways & transit corridors'
    },
    {
      icon: Handshake,
      title: 'Trusted & Transparent Deals',
      description: '100% legal verification, clear titles, DTCP & HMDA approvals with zero hidden costs'
    },
    {
      icon: Home,
      title: 'Modern Amenities',
      description: 'State-of-the-art clubhouses, landscaped gardens, 24/7 security & smart utilities'
    },
    {
      icon: ShieldCheck,
      title: 'Long-Term Value',
      description: 'Proven high capital appreciation and dependable rental yield generation'
    }
  ];

  return (
    <section className="py-20 bg-white border-y border-neutral-200/80 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading matching Reference Image 1 */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center space-x-3">
            <div className="h-[1px] w-12 sm:w-24 bg-gradient-to-r from-transparent to-gold-500"></div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-neutral-900 tracking-tight">
              Our Projects & Highlights
            </h2>
            <div className="h-[1px] w-12 sm:w-24 bg-gradient-to-l from-transparent to-gold-500"></div>
          </div>
        </div>

        {/* 4 Highlights Bar matching Reference Image 1 & 2 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mb-16">
          {highlights.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-neutral-50/80 hover:bg-white border border-neutral-200/80 hover:border-gold-500/60 rounded-2xl p-5 text-center transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-1 group"
              >
                <div className="w-14 h-14 mx-auto rounded-2xl bg-white group-hover:bg-gold-500/15 border border-gold-400/40 flex items-center justify-center text-gold-600 mb-3.5 transition-all shadow-inner">
                  <Icon className="w-7 h-7 text-gold-600 group-hover:scale-110 transition-transform" />
                </div>
                <h3 className="font-bold text-sm sm:text-base text-neutral-900 group-hover:text-gold-700 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-neutral-500 mt-1.5 hidden sm:block line-clamp-2">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Two-Column Showcase: Left Image Showcase, Right About Us Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left: Project Building Image Showcase */}
          <div className="lg:col-span-7 relative group">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-neutral-200">
              <img
                src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80"
                alt="Modern Residential Project Architecture"
                className="w-full h-[320px] sm:h-[420px] object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="inline-block px-3 py-1 rounded-full bg-gold-500 text-black text-xs font-bold tracking-wider uppercase mb-2">
                  FLAGSHIP DEVELOPMENTS
                </span>
                <h4 className="text-xl sm:text-2xl font-serif font-bold text-white">
                  HMDA & DTCP Approved Gated Communities
                </h4>
                <p className="text-xs sm:text-sm text-gray-200 mt-1 line-clamp-2">
                  Strategically crafted in high-growth corridors of Hyderabad with world-class infrastructure and high investment returns.
                </p>
              </div>
            </div>

            {/* Floating Experience Badge */}
            <div className="absolute -bottom-4 -right-4 sm:bottom-6 sm:-right-4 bg-black border-2 border-gold-400 p-4 rounded-2xl shadow-2xl text-center hidden sm:block">
              <span className="block text-2xl font-black text-gold-400">25+</span>
              <span className="block text-[11px] font-semibold text-white uppercase tracking-wider">Years of Trust</span>
            </div>
          </div>

          {/* Right: About Us Quick Card matching Reference Image 1 & 2 */}
          <div className="lg:col-span-5 bg-neutral-50 border border-neutral-200/90 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-sm space-y-5">
            <div>
              <span className="text-gold-600 font-bold text-xs uppercase tracking-widest">
                ABOUT SUPER BEST PROPERTIES
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-neutral-900 mt-1">
                Your Trusted Partner in Real Estate Solutions
              </h3>
            </div>

            <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
              Super Best Properties is committed to helping you find the perfect property that matches your dreams. With a legacy of trust, premium projects and customer-first approach, we bring you the best in real estate across Hyderabad and Telangana.
            </p>

            <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed">
              Our property portfolio encompasses HMDA, DTCP and GHMC-approved open plots, luxury apartments, independent houses, gated community villas, commercial spaces, and high-value investment land parcels.
            </p>

            <div className="pt-2">
              <Link
                to="/about"
                className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl gold-gradient-btn text-black font-bold text-sm tracking-wide shadow-md hover:shadow-lg transition-all"
              >
                <span>Know More</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
