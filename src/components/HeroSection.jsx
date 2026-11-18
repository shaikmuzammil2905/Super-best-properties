import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles, MessageCircle } from 'lucide-react';
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
      ctaLink: '/buy-a-property?type=plots',
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
      ctaLink: '/buy-a-property?type=flats',
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
      ctaLink: '/buy-a-property?type=independent-house',
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
      ctaLink: '/buy-a-property?type=gated-community-villas',
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
      className="relative w-full overflow-hidden bg-[#FAFAFA]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      
      {/* Hero Banner Container */}
      <div className="relative min-h-[540px] sm:min-h-[600px] md:min-h-[660px] lg:min-h-[720px] w-full flex items-center bg-neutral-900">
        
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
              {/* High Contrast Gradient Overlay on left - guarantees 100% clear text visibility across all slides */}
              <div className="absolute inset-y-0 left-0 w-full lg:w-3/5 bg-gradient-to-r from-black/85 via-black/55 to-transparent"></div>
            </div>
          ))}
        </div>

        {/* Mobile Background Images with Enhanced Text Readability Scrim */}
        <div className="md:hidden absolute inset-0 overflow-hidden">
          {slides.map((slide, index) => (
            <div
              key={`mob-${slide.id}`}
              className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
                currentSlide === index ? 'opacity-100' : 'opacity-0'
              }`}
              style={{ backgroundImage: `url('${slide.mobileImage}')` }}
            >
              {/* Mobile Deep Gradient Overlay - Clear and Legible */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/55 to-black/85"></div>
            </div>
          ))}
        </div>

        {/* Hero Content Overlay - Clean Typography with 100% High Readability */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-10 sm:py-16 md:py-20">
          <div className="max-w-xl lg:max-w-2xl space-y-4 sm:space-y-6">
            
            {/* Tagline / Subtitle Pill */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-gold-400 text-gold-300 text-[11px] sm:text-xs font-bold uppercase tracking-wider shadow-lg">
              <Sparkles className="w-3.5 h-3.5 text-gold-400" />
              <span className="text-gold-300 font-semibold">{current.taglinePill}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-black tracking-tight leading-[1.1] text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]">
              {current.titlePart1} <br />
              <span className="gold-gradient-text drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]">
                {current.titlePart2}
              </span>
            </h1>

            {/* Subtitle / Divider Line */}
            <div className="flex items-center space-x-3 text-gold-300 font-extrabold text-xs sm:text-base md:text-lg drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
              <div className="h-[2px] w-8 sm:w-16 bg-gold-400 shadow"></div>
              <span className="tracking-wide text-gold-200">{current.subtitle}</span>
              <div className="h-[2px] w-8 sm:w-16 bg-gold-400 shadow"></div>
            </div>

            {/* Description */}
            <p className="text-white text-xs sm:text-base md:text-lg font-medium leading-relaxed max-w-lg drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]">
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

              {/* WhatsApp Advisor - Vibrant Brand Green Color */}
              <a
                href="https://wa.me/917075539189?text=Hello%20Super%20Best%20Properties,%20I%20am%20interested%20in%20learning%20more%20about%20your%20available%20properties."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 py-3 px-5 sm:px-6 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white text-xs sm:text-sm font-bold transition-all shadow-xl hover:shadow-[0_0_20px_rgba(37,211,102,0.5)] hover:scale-105"
              >
                <MessageCircle className="w-4 h-4 fill-white/20 text-white" />
                <span>WhatsApp Advisor</span>
              </a>
            </div>

            {/* Slide Navigation Controls & Indicators with Gold Styling */}
            <div className="pt-2 sm:pt-4 flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <button
                  onClick={prevSlide}
                  className="w-9 h-9 rounded-full bg-gold-500/25 hover:bg-gold-500/45 border border-gold-400 text-gold-200 flex items-center justify-center shadow-lg transition-all hover:scale-110 active:scale-95"
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={nextSlide}
                  className="w-9 h-9 rounded-full bg-gold-500/25 hover:bg-gold-500/45 border border-gold-400 text-gold-200 flex items-center justify-center shadow-lg transition-all hover:scale-110 active:scale-95"
                  aria-label="Next slide"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Dots Indicator with Slide Counter */}
              <div className="flex items-center space-x-2 bg-gold-950/60 px-3.5 py-1.5 rounded-full border border-gold-500/40">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`h-2.5 rounded-full transition-all duration-500 ${
                      currentSlide === index ? 'w-8 bg-gold-400 shadow-md shadow-gold-500/60' : 'w-2.5 bg-neutral-600 hover:bg-gold-300'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>

              <span className="text-gold-300 text-xs font-bold hidden sm:inline-block">
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
