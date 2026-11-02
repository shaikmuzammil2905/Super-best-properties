import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
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
    <section className="relative w-full overflow-hidden bg-white">
      
      {/* Hero Banner Container */}
      <div className="relative min-h-[520px] sm:min-h-[580px] md:min-h-[640px] lg:min-h-[720px] w-full flex items-center">
        
        {/* Desktop Background Image (image copy 4.png) */}
        <div 
          className="hidden md:block absolute inset-0 bg-cover bg-right bg-no-repeat transition-all duration-700"
          style={{ backgroundImage: `url('/assets/hero-desktop.png')` }}
        >
          {/* Subtle soft gradient on left for desktop text patch */}
          <div className="absolute inset-y-0 left-0 w-full lg:w-1/2 bg-gradient-to-r from-white/95 via-white/80 to-transparent"></div>
        </div>

        {/* Mobile Background Image (image copy 5.png) - 100% Crisp, Bright, Completely Free of White Patch Work */}
        <div 
          className="md:hidden absolute inset-0 bg-cover bg-top bg-no-repeat transition-all duration-700 filter brightness-110 contrast-105"
          style={{ backgroundImage: `url('/assets/hero-mobile.png')` }}
        >
          {/* NO white patch or gradient overlay - completely clear picture! */}
        </div>

        {/* Hero Content - Clean typography directly rendered, NO white box/patch */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-8 sm:py-16 md:py-20">
          <div className="max-w-xl lg:max-w-2xl space-y-3.5 sm:space-y-6 animate-fade-in">
            
            {/* Tagline / Subtitle pill */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-black/75 backdrop-blur-md border border-gold-500/60 text-white text-[11px] sm:text-xs font-bold uppercase tracking-wider shadow-lg">
              <Sparkles className="w-3.5 h-3.5 text-gold-400" />
              <span className="text-gold-300">Real Estate Advisory & Property Solutions</span>
            </div>

            {/* Main Headline with drop shadow for crystal-clear readability without white patches */}
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-black tracking-tight leading-[1.1] text-neutral-950 drop-shadow-[0_2px_10px_rgba(255,255,255,0.9)]">
              {current.titlePart1} <br />
              <span className="gold-gradient-text drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]">
                {current.titlePart2}
              </span>
            </h1>

            {/* Plots | Flats | Houses | Villas Divider line */}
            <div className="flex items-center space-x-3 text-neutral-900 font-extrabold text-xs sm:text-base md:text-lg drop-shadow-[0_1px_4px_rgba(255,255,255,0.8)]">
              <div className="h-[2px] w-8 sm:w-16 bg-gold-600 shadow"></div>
              <span>{current.tagline}</span>
              <div className="h-[2px] w-8 sm:w-16 bg-gold-600 shadow"></div>
            </div>

            {/* Description */}
            <p className="text-neutral-900 text-xs sm:text-base md:text-lg font-semibold leading-relaxed max-w-lg drop-shadow-[0_1px_6px_rgba(255,255,255,0.9)]">
              {current.description}
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap gap-3 items-center">
              <Link
                to={current.ctaLink}
                className="inline-flex items-center space-x-2 py-3 px-6 sm:px-8 rounded-full gold-gradient-btn text-black font-extrabold text-xs sm:text-sm tracking-wide shadow-xl hover:shadow-gold-500/50 hover:scale-105 transition-all"
              >
                <span>{current.ctaText}</span>
                <ArrowRight className="w-4 h-4 text-black" />
              </Link>

              <a
                href="https://wa.me/917075539189?text=Hello%20Super%20Best%20Properties,%20I%20would%20like%20to%20know%20more%20about%20your%20available%20properties."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 py-3 px-5 sm:px-6 rounded-full bg-black/90 hover:bg-black text-white border border-gold-400 text-xs sm:text-sm font-semibold transition-all shadow-md hover:scale-105"
              >
                <span>WhatsApp Advisor</span>
              </a>
            </div>

            {/* Slide Navigation Controls */}
            <div className="pt-2 sm:pt-4 flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <button
                  onClick={prevSlide}
                  className="w-8 h-8 rounded-full bg-white/95 hover:bg-white border border-neutral-300 text-neutral-800 flex items-center justify-center shadow-md transition-all hover:scale-110"
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={nextSlide}
                  className="w-8 h-8 rounded-full bg-white/95 hover:bg-white border border-neutral-300 text-neutral-800 flex items-center justify-center shadow-md transition-all hover:scale-110"
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
                      currentSlide === index ? 'w-7 bg-gold-500' : 'w-2.5 bg-neutral-400 hover:bg-neutral-600'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* Advanced Search Bar positioned cleanly */}
      <div className="relative mt-2 sm:-mt-12 z-30 px-4 sm:px-6 lg:px-8 mb-6 sm:mb-0">
        <SearchBar onSearch={onSearch} />
      </div>

    </section>
  );
}
