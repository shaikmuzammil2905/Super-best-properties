import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, MessageCircle, Phone, ArrowRight } from 'lucide-react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const isHome = location.pathname === '/';
  const isBuyProperty = location.pathname.startsWith('/buy-a-property') || location.pathname.startsWith('/properties');
  const isServices = location.pathname.startsWith('/services');
  const isNri = location.pathname.startsWith('/nri-corner');
  const isFaq = location.pathname.startsWith('/faqs');
  const isAbout = location.pathname.startsWith('/about');
  const isContact = location.pathname.startsWith('/contact');

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-black/95 backdrop-blur-md shadow-2xl border-b border-gold-500/20 py-2 sm:py-2.5' : 'bg-black border-b border-gold-500/15 py-2 sm:py-3'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo Section - Grand Premium Logo with Maximum Clarity */}
          <Link to="/" className="flex items-center group py-0.5" aria-label="Super Best Properties Home">
            <img 
              src="/assets/logo.png" 
              alt="Super Best Properties Logo" 
              className="h-14 sm:h-16 md:h-20 lg:h-22 w-auto max-w-[250px] sm:max-w-[320px] md:max-w-[380px] object-contain transition-transform duration-300 group-hover:scale-105 filter drop-shadow-[0_2px_14px_rgba(212,160,23,0.4)]" 
            />
          </Link>

          {/* Desktop Navigation - All items strictly in ONE single line */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2 shrink-0">
            
            {/* Home Link */}
            <Link 
              to="/" 
              className={`whitespace-nowrap px-2.5 xl:px-3.5 py-2 rounded-full text-xs xl:text-sm font-semibold transition-all duration-200 ${
                isHome 
                  ? 'bg-gradient-to-r from-gold-600 via-gold-500 to-gold-400 text-black shadow-md shadow-gold-500/20 font-bold' 
                  : 'text-gray-300 hover:text-gold-400 hover:bg-neutral-900/60'
              }`}
            >
              Home
            </Link>

            {/* UNIFIED: Buy a Property */}
            <Link 
              to="/buy-a-property" 
              className={`whitespace-nowrap px-2.5 xl:px-3.5 py-2 rounded-full text-xs xl:text-sm font-semibold transition-all duration-200 ${
                isBuyProperty 
                  ? 'bg-gradient-to-r from-gold-600 via-gold-500 to-gold-400 text-black shadow-md shadow-gold-500/20 font-bold' 
                  : 'text-gray-300 hover:text-gold-400 hover:bg-neutral-900/60'
              }`}
            >
              Buy a Property
            </Link>

            {/* Services Link */}
            <Link 
              to="/services" 
              className={`whitespace-nowrap px-2.5 xl:px-3.5 py-2 rounded-full text-xs xl:text-sm font-semibold transition-all duration-200 ${
                isServices 
                  ? 'bg-gradient-to-r from-gold-600 via-gold-500 to-gold-400 text-black shadow-md shadow-gold-500/20 font-bold' 
                  : 'text-gray-300 hover:text-gold-400 hover:bg-neutral-900/60'
              }`}
            >
              Services
            </Link>

            {/* NRI Corner Link */}
            <Link 
              to="/nri-corner" 
              className={`whitespace-nowrap px-2.5 xl:px-3.5 py-2 rounded-full text-xs xl:text-sm font-semibold transition-all duration-200 ${
                isNri 
                  ? 'bg-gradient-to-r from-gold-600 via-gold-500 to-gold-400 text-black shadow-md shadow-gold-500/20 font-bold' 
                  : 'text-gray-300 hover:text-gold-400 hover:bg-neutral-900/60'
              }`}
            >
              NRI Corner
            </Link>

            {/* FAQs Link */}
            <Link 
              to="/faqs" 
              className={`whitespace-nowrap px-2.5 xl:px-3.5 py-2 rounded-full text-xs xl:text-sm font-semibold transition-all duration-200 ${
                isFaq 
                  ? 'bg-gradient-to-r from-gold-600 via-gold-500 to-gold-400 text-black shadow-md shadow-gold-500/20 font-bold' 
                  : 'text-gray-300 hover:text-gold-400 hover:bg-neutral-900/60'
              }`}
            >
              FAQs
            </Link>

            {/* About Us Link */}
            <Link 
              to="/about" 
              className={`whitespace-nowrap px-2.5 xl:px-3.5 py-2 rounded-full text-xs xl:text-sm font-semibold transition-all duration-200 ${
                isAbout 
                  ? 'bg-gradient-to-r from-gold-600 via-gold-500 to-gold-400 text-black shadow-md shadow-gold-500/20 font-bold' 
                  : 'text-gray-300 hover:text-gold-400 hover:bg-neutral-900/60'
              }`}
            >
              About Us
            </Link>

            {/* Contact Us Link */}
            <Link 
              to="/contact" 
              className={`whitespace-nowrap px-2.5 xl:px-3.5 py-2 rounded-full text-xs xl:text-sm font-semibold transition-all duration-200 ${
                isContact 
                  ? 'bg-gradient-to-r from-gold-600 via-gold-500 to-gold-400 text-black shadow-md shadow-gold-500/20 font-bold' 
                  : 'text-gray-300 hover:text-gold-400 hover:bg-neutral-900/60'
              }`}
            >
              Contact Us
            </Link>
          </nav>

          {/* Desktop Right Side - WhatsApp Icon Button Only (Matching Image copy 49) */}
          <div className="hidden lg:flex items-center pl-2">
            <a 
              href="https://wa.me/917075539189?text=Hello%20Super%20Best%20Properties,%20I%20am%20interested%20in%20exploring%20properties." 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-[#25D366] hover:bg-[#20ba59] flex items-center justify-center text-white transition-all duration-300 shadow-md hover:shadow-[0_0_16px_rgba(37,211,102,0.6)] hover:scale-110"
              aria-label="Chat on WhatsApp"
              title="Chat on WhatsApp"
            >
              <MessageCircle className="w-5 h-5 fill-white/20 text-white" />
            </a>
          </div>

          {/* Mobile Navigation Buttons */}
          <div className="lg:hidden flex items-center space-x-3">
            <a
              href="tel:7075539189"
              className="p-2.5 rounded-full bg-gold-500/10 text-gold-400 border border-gold-500/30"
              aria-label="Call Super Best Properties"
            >
              <Phone className="w-4 h-4" />
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-gold-400 hover:text-white hover:bg-neutral-900 border border-gold-500/30 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu - Clean & Unified */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-neutral-950/98 border-t border-gold-500/20 px-4 pt-4 pb-8 space-y-2.5 animate-fade-in backdrop-blur-2xl">
          <Link
            to="/"
            className={`block px-4 py-3 rounded-xl font-semibold text-base ${
              isHome ? 'bg-gradient-to-r from-gold-600 to-gold-400 text-black' : 'text-gray-200 hover:bg-neutral-900'
            }`}
          >
            Home
          </Link>

          {/* UNIFIED: Buy a Property */}
          <Link
            to="/buy-a-property"
            className={`block px-4 py-3 rounded-xl font-semibold text-base ${
              isBuyProperty ? 'bg-gradient-to-r from-gold-600 to-gold-400 text-black' : 'text-gray-200 hover:text-gold-400 hover:bg-neutral-900'
            }`}
          >
            Buy a Property
          </Link>

          <Link
            to="/services"
            className={`block px-4 py-3 rounded-xl font-medium text-base ${
              isServices ? 'text-gold-400 bg-neutral-900' : 'text-gray-200 hover:text-gold-400 hover:bg-neutral-900'
            }`}
          >
            Our Services
          </Link>

          <Link
            to="/nri-corner"
            className={`block px-4 py-3 rounded-xl font-medium text-base ${
              isNri ? 'text-gold-400 bg-neutral-900' : 'text-gray-200 hover:text-gold-400 hover:bg-neutral-900'
            }`}
          >
            NRI Corner
          </Link>

          <Link
            to="/faqs"
            className={`block px-4 py-3 rounded-xl font-medium text-base ${
              isFaq ? 'text-gold-400 bg-neutral-900' : 'text-gray-200 hover:text-gold-400 hover:bg-neutral-900'
            }`}
          >
            FAQs
          </Link>

          <Link
            to="/about"
            className={`block px-4 py-3 rounded-xl font-medium text-base ${
              isAbout ? 'text-gold-400 bg-neutral-900' : 'text-gray-200 hover:text-gold-400 hover:bg-neutral-900'
            }`}
          >
            About Us & Founder
          </Link>

          <Link
            to="/contact"
            className={`block px-4 py-3 rounded-xl font-medium text-base ${
              isContact ? 'text-gold-400 bg-neutral-900' : 'text-gray-200 hover:text-gold-400 hover:bg-neutral-900'
            }`}
          >
            Contact Us
          </Link>

          <div className="pt-4 border-t border-neutral-800 space-y-2">
            <a
              href="https://wa.me/917075539189?text=Hello%20Super%20Best%20Properties,%20I%20would%20like%20to%20enquire%20about%20properties."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center space-x-2 w-full py-3 rounded-full bg-gradient-to-r from-green-600 to-emerald-500 text-white font-semibold text-sm shadow-lg shadow-green-900/30"
            >
              <MessageCircle className="w-5 h-5 fill-current" />
              <span>WhatsApp / Enquire Now</span>
            </a>

            <a
              href="tel:7075539189"
              className="flex items-center justify-center space-x-2 w-full py-3 rounded-full bg-neutral-900 border border-gold-500/40 text-gold-400 font-semibold text-sm"
            >
              <Phone className="w-4 h-4" />
              <span>Call: 7075539189</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
