import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import SearchBar from './SearchBar';

export default function HeroSection({ onSearch }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const slides = [
    {
      id: 'plots',
      taglinePill: 'HMDA & DTCP Approved Plots',
      titlePart1: 'Invest In',
      titlePart2: 'Prime Open Plots',
      subtitle: 'Clear Titles | Immediate Registration | High ROI',
      description: 'Strategic open plots in Tellapur, Shamshabad, and Kompally growth corridors with 40-60ft BT roads and 100% clear legal documentation.',
      ctaText: 'Explore Open Plots',
      ctaLink: '/properties/plots',
      desktopImage: '/assets/hero-slide-1-plots.png',
      mobileImage: '/assets/hero-slide-1-plots-mobile.png'
    },
    {
      id: 'flats',
      taglinePill: 'Modern High-Rise Living',
      titlePart1: 'Discover',
      titlePart2: 'Luxury Flats & Apartments',
      subtitle: '2, 3 & 4 BHK | Gachibowli & Madhapur | Gated Amenities',
      description: 'Contemporary apartments equipped with world-class clubhouses, swimming pools, fitness centers, and seamless IT corridor connectivity.',
      ctaText: 'Explore Flats',
      ctaLink: '/properties/flats',
      desktopImage: '/assets/hero-slide-2-flats.png',
      mobileImage: '/assets/hero-slide-2-flats-mobile.png'
    },
    {
      id: 'houses',
      taglinePill: 'Exclusive Independent Living',
      titlePart1: 'Own Your Dream',
      titlePart2: 'Independent House',
      subtitle: 'Spacious Compounds | 100% Vastu | Private Terraces',
      description: 'Standalone luxury residences and duplex houses with dedicated car porch, private gardens, and peaceful residential layouts across Hyderabad.',
      ctaText: 'Explore Houses',
      ctaLink: '/properties/independent-house',
      desktopImage: '/assets/hero-slide-3-houses.png',
      mobileImage: '/assets/hero-slide-3-houses-mobile.png'
    },
    {
      id: 'villas',
      taglinePill: 'Elite Gated Resort Living',
      titlePart1: 'Experience',
      titlePart2: 'Gated Community Villas',
      subtitle: 'Triplex Villas | Private Swimming Pools | 24/7 Security',
      description: 'Ultra-luxurious gated villa communities designed for supreme privacy, opulent architecture, and serene resort-style living.',
      ctaText: 'Explore Luxury Villas',
      ctaLink: '/properties/gated-community-villas',
      desktopImage: '/assets/hero-slide-4-villas.png',
      mobileImage: '/assets/hero-slide-4-villas-mobile.png'
    }
  ];

  // Automatic slide changer: switches every 4.5 seconds
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4500);

    return () => clearInterval(timer);
  }, [isPaused, slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const current = slides[currentSlide];

  return (
    <section 
      className="relative w-full overflow-hidden bg-neutral-900"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      
      {/* Hero Banner Container */}
      <div className="relative min-h-[540px] sm:min-h-[600px] md:min-h-[660px] lg:min-h-[720px] w-full flex items-center">
        
        {/* Desktop Background Images with Butter-Smooth Cross-Fade */}
        <div className="hidden md:block absolute inset-0 overflow-hidden">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
                currentSlide === index ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
              } transition-transform duration-[6000ms]`}
              style={{ backgroundImage: `url('${slide.desktopImage}')` }}
            >
              {/* Elegant soft gradient on left for desktop typography legibility */}
              <div className="absolute inset-y-0 left-0 w-full lg:w-3/5 bg-gradient-to-r from-black/85 via-black/60 to-transparent"></div>
            </div>
          ))}
        </div>

        {/* Mobile Background Images with Automatic Smooth Transitions & Super HD Clarity */}
        <div className="md:hidden absolute inset-0 overflow-hidden">
          {slides.map((slide, index) => (
            <div
              key={`mob-${slide.id}`}
              className={`absolute inset-0 bg-cover bg-center filter brightness-105 contrast-105 transition-opacity duration-1000 ease-in-out ${
                currentSlide === index ? 'opacity-100' : 'opacity-0'
              }`}
              style={{ backgroundImage: `url('${slide.mobileImage}')` }}
            >
              {/* Bright, crystal-clear mobile view with light gradient for crisp legibility */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/15 to-black/65"></div>
            </div>
          ))}
        </div>

        {/* Hero Content Overlay */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-10 sm:py-16 md:py-20">
          <div className="max-w-xl lg:max-w-2xl space-y-4 sm:space-y-6">
            
            {/* Tagline / Subtitle Pill */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-black/85 backdrop-blur-md border border-gold-400/80 text-white text-[11px] sm:text-xs font-bold uppercase tracking-wider shadow-xl">
              <Sparkles className="w-3.5 h-3.5 text-gold-400" />
              <span className="text-gold-300">{current.taglinePill}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-black tracking-tight leading-[1.1] text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
              {current.titlePart1} <br />
              <span className="gold-gradient-text drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
                {current.titlePart2}
              </span>
            </h1>

            {/* Subtitle / Divider Line */}
            <div className="flex items-center space-x-3 text-gold-300 font-extrabold text-xs sm:text-base md:text-lg drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
              <div className="h-[2px] w-8 sm:w-16 bg-gold-500 shadow"></div>
              <span>{current.subtitle}</span>
              <div className="h-[2px] w-8 sm:w-16 bg-gold-500 shadow"></div>
            </div>

            {/* Description */}
            <p className="text-neutral-100 text-xs sm:text-base md:text-lg font-medium leading-relaxed max-w-lg drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
              {current.description}
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap gap-3 items-center">
              <Link
                to={current.ctaLink}
                className="inline-flex items-center space-x-2 py-3 px-6 sm:px-8 rounded-full gold-gradient-btn text-black font-extrabold text-xs sm:text-sm tracking-wide shadow-2xl hover:shadow-gold-500/50 hover:scale-105 transition-all"
              >
                <span>{current.ctaText}</span>
                <ArrowRight className="w-4 h-4 text-black" />
              </Link>

              <a
                href="https://wa.me/917075539189?text=Hello%20Super%20Best%20Properties,%20I%20am%20interested%20in%20learning%20more%20about%20your%20available%20properties."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 py-3 px-5 sm:px-6 rounded-full bg-black/90 hover:bg-black text-white border border-gold-400 text-xs sm:text-sm font-semibold transition-all shadow-xl hover:scale-105"
              >
                <span>WhatsApp Advisor</span>
              </a>
            </div>

            {/* Slide Navigation Controls & Indicators */}
            <div className="pt-2 sm:pt-4 flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <button
                  onClick={prevSlide}
                  className="w-9 h-9 rounded-full bg-black/80 hover:bg-black border border-gold-500/50 text-gold-300 flex items-center justify-center shadow-lg transition-all hover:scale-110 active:scale-95"
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={nextSlide}
                  className="w-9 h-9 rounded-full bg-black/80 hover:bg-black border border-gold-500/50 text-gold-300 flex items-center justify-center shadow-lg transition-all hover:scale-110 active:scale-95"
                  aria-label="Next slide"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Dots Indicator with Slide Counter */}
              <div className="flex items-center space-x-2 bg-black/60 px-3 py-1.5 rounded-full border border-neutral-700">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`h-2.5 rounded-full transition-all duration-500 ${
                      currentSlide === index ? 'w-8 bg-gold-400 shadow-md shadow-gold-500/50' : 'w-2.5 bg-neutral-500 hover:bg-neutral-300'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>

              <span className="text-neutral-300 text-xs font-bold hidden sm:inline-block">
                0{currentSlide + 1} / 0{slides.length}
              </span>
            </div>

          </div>
        </div>

      </div>

      {/* Advanced Search Bar Positioned with Solid White High-Contrast Visibility */}
      <div className="relative mt-4 sm:-mt-14 z-30 px-4 sm:px-6 lg:px-8 mb-8 sm:mb-10">
        <SearchBar onSearch={onSearch} />
      </div>

    </section>
  );
}
