import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight, ShieldCheck, Sparkles } from 'lucide-react';
import SearchBar from './SearchBar';

export default function HeroSection({ onSearch }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      titlePart1: "Find Your",
      titlePart2: "Perfect Property",
      tagline: "Plots | Flats | Houses | Villas",
      description: "Your dream property is just a search away. Discover verified residential and commercial opportunities across Hyderabad.",
      ctaText: "Explore Properties",
      ctaLink: "/properties"
    },
    {
      titlePart1: "Invest In",
      titlePart2: "Prime HMDA Plots",
      tagline: "Clear Titles | Immediate Registration",
      description: "Secure high-appreciation open plots in emerging growth corridors of Tellapur, Shamshabad & Kompally.",
      ctaText: "View Open Plots",
      ctaLink: "/properties/plots"
    },
    {
      titlePart1: "Experience",
      titlePart2: "Gated Luxury Villas",
      tagline: "Triplex Villas | Modern Amenities",
      description: "Exclusive gated community living with world-class clubhouses, swimming pools, and 24/7 security.",
      ctaText: "Explore Villas",
      ctaLink: "/properties/gated-community-villas"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const current = slides[currentSlide];

  return (
    <section className="relative w-full overflow-hidden">
      
      {/* Hero Background Container: Desktop uses hero-desktop.png (image copy 4.png), Mobile uses hero-mobile.png (image copy 5.png) */}
      <div className="relative min-h-[580px] sm:min-h-[640px] md:min-h-[720px] lg:min-h-[760px] w-full flex items-center">
        
        {/* Desktop Background Image (image copy 4.png) */}
        <div 
          className="hidden md:block absolute inset-0 bg-cover bg-right bg-no-repeat transition-all duration-700"
          style={{ backgroundImage: `url('/assets/hero-desktop.png')` }}
        >
          {/* Subtle overlay to ensure high contrast in the white patch work */}
          <div className="absolute inset-y-0 left-0 w-full lg:w-1/2 bg-gradient-to-r from-white/95 via-white/80 to-transparent"></div>
        </div>

        {/* Mobile Background Image (image copy 5.png) */}
        <div 
          className="md:hidden absolute inset-0 bg-cover bg-top bg-no-repeat transition-all duration-700"
          style={{ backgroundImage: `url('/assets/hero-mobile.png')` }}
        >
          {/* Soft white gradient at top for text readability matching Reference Image 2 */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/95 via-white/80 to-white/20"></div>
        </div>

        {/* Hero Content positioned seamlessly inside the light/white patch work */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16 md:py-24">
          <div className="max-w-xl lg:max-w-2xl space-y-4 sm:space-y-6 animate-fade-in">
            
            {/* Tagline / Subtitle banner */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-gold-500/15 border border-gold-500/40 text-neutral-900 text-xs font-bold uppercase tracking-wider shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-gold-600" />
              <span>Real Estate Advisory & Property Solutions</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-black tracking-tight leading-[1.08] text-neutral-900">
              {current.titlePart1} <br />
              <span className="gold-gradient-text drop-shadow-sm">
                {current.titlePart2}
              </span>
            </h1>

            {/* Plots | Flats | Houses | Villas Divider line */}
            <div className="flex items-center space-x-3 text-neutral-800 font-semibold text-sm sm:text-base md:text-lg">
              <div className="h-[2px] w-10 sm:w-16 bg-gold-500"></div>
              <span>{current.tagline}</span>
              <div className="h-[2px] w-10 sm:w-16 bg-gold-500"></div>
            </div>

            {/* Description */}
            <p className="text-neutral-700 text-sm sm:text-base md:text-lg font-medium leading-relaxed max-w-lg">
              {current.description}
            </p>

            {/* Action CTA & Phone */}
            <div className="pt-2 flex flex-wrap gap-4 items-center">
              <Link
                to={current.ctaLink}
                className="inline-flex items-center space-x-2 py-3 px-7 rounded-full gold-gradient-btn text-black font-extrabold text-sm sm:text-base tracking-wide shadow-xl hover:shadow-gold-500/50 hover:scale-105 transition-all"
              >
                <span>{current.ctaText}</span>
                <ArrowRight className="w-5 h-5 text-black" />
              </Link>

              <a
                href="https://wa.me/917075539189?text=Hello%20Super%20Best%20Properties,%20I%20would%20like%20to%20know%20more%20about%20your%20available%20properties."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 py-3 px-6 rounded-full bg-black/85 hover:bg-black text-white border border-gold-400 text-xs sm:text-sm font-semibold transition-all shadow-md"
              >
                <span>WhatsApp Advisor</span>
              </a>
            </div>

            {/* Slide Navigation Controls */}
            <div className="pt-4 flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <button
                  onClick={prevSlide}
                  className="w-8 h-8 rounded-full bg-white/90 hover:bg-white border border-neutral-300 text-neutral-800 flex items-center justify-center shadow-md transition-all hover:scale-110"
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={nextSlide}
                  className="w-8 h-8 rounded-full bg-white/90 hover:bg-white border border-neutral-300 text-neutral-800 flex items-center justify-center shadow-md transition-all hover:scale-110"
                  aria-label="Next slide"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Dots Indicator */}
              <div className="flex items-center space-x-2">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`h-2.5 rounded-full transition-all duration-300 ${
                      currentSlide === index ? 'w-8 bg-gold-500' : 'w-2.5 bg-neutral-300 hover:bg-neutral-400'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* Floating Advanced Search Bar overlapping directly below Hero */}
      <div className="relative -mt-12 sm:-mt-14 z-30 px-4 sm:px-6 lg:px-8">
        <SearchBar onSearch={onSearch} />
      </div>

    </section>
  );
}
