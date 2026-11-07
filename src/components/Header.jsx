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
  const isAbout = location.pathname.startsWith('/about');
  const isContact = location.pathname.startsWith('/contact');

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-black/95 backdrop-blur-md shadow-2xl border-b border-gold-500/20 py-2 sm:py-2.5' : 'bg-black border-b border-gold-500/15 py-2.5 sm:py-3.5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo Section - Crisp Transparent PNG Logo */}
          <Link to="/" className="flex items-center space-x-3 group py-0.5">
            <img 
              src="/assets/logo.png" 
              alt="Super Best Properties Logo" 
              className="h-14 sm:h-16 md:h-20 lg:h-20 w-auto object-contain transition-transform duration-300 group-hover:scale-105 filter drop-shadow-[0_2px_10px_rgba(212,160,23,0.3)]" 
            />
          </Link>

          {/* Desktop Navigation - Clean Unified Navigation matching Image copy 23 */}
          <nav className="hidden lg:flex items-center space-x-2 xl:space-x-3">
            
            {/* Home Link */}
            <Link 
              to="/" 
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                isHome 
                  ? 'bg-gradient-to-r from-gold-600 via-gold-500 to-gold-400 text-black shadow-md shadow-gold-500/20 font-bold' 
                  : 'text-gray-300 hover:text-gold-400 hover:bg-neutral-900/60'
              }`}
            >
              Home
            </Link>

            {/* UNIFIED: Buy a Property (Replaces Properties, Projects & Categories) */}
            <Link 
              to="/buy-a-property" 
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
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
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                isServices 
                  ? 'bg-gradient-to-r from-gold-600 via-gold-500 to-gold-400 text-black shadow-md shadow-gold-500/20 font-bold' 
                  : 'text-gray-300 hover:text-gold-400 hover:bg-neutral-900/60'
              }`}
            >
              Services
            </Link>

            {/* About Us Link */}
            <Link 
              to="/about" 
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
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
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                isContact 
                  ? 'bg-gradient-to-r from-gold-600 via-gold-500 to-gold-400 text-black shadow-md shadow-gold-500/20 font-bold' 
                  : 'text-gray-300 hover:text-gold-400 hover:bg-neutral-900/60'
              }`}
            >
              Contact Us
            </Link>
          </nav>

          {/* Desktop Right Side - WhatsApp / Enquire Button */}
          <div className="hidden lg:flex items-center space-x-4">
            <a 
              href="https://wa.me/917075539189?text=Hello%20Super%20Best%20Properties,%20I%20am%20interested%20in%20exploring%20properties." 
              target="_blank" 
              rel="noopener noreferrer"
              className="group flex items-center space-x-2 bg-black border border-gold-400/80 hover:border-gold-400 px-5 py-2.5 rounded-full text-sm font-semibold text-white hover:text-gold-300 transition-all shadow-md shadow-gold-500/10 hover:shadow-gold-500/30 hover:scale-[1.02]"
            >
              <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white">
                <MessageCircle className="w-3.5 h-3.5 fill-current" />
              </div>
              <span>WhatsApp / Enquire</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 text-gold-400" />
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
