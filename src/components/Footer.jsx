import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, MessageCircle, ArrowRight, ShieldCheck, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-black text-gray-300 border-t border-gold-500/20 pt-16 pb-8 relative overflow-hidden">
      {/* Subtle gold ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-gold-500/5 blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-neutral-800">
          
          {/* Col 1: Brand & Logo - Cleanly contained, zero overlap with Quick Links */}
          <div className="space-y-4 max-w-full">
            <Link to="/" className="inline-block group" aria-label="Super Best Properties Home">
              <img 
                src="/assets/logo.png" 
                alt="Super Best Properties Logo" 
                className="h-10 sm:h-12 w-auto max-w-[190px] sm:max-w-[210px] object-contain transition-transform duration-300 group-hover:scale-105 filter drop-shadow-[0_2px_10px_rgba(212,160,23,0.3)]" 
              />
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed">
              Your trusted partner in real estate advisory & property solutions across Hyderabad & Telangana. Delivering value-driven opportunities with integrity and transparency.
            </p>
            <div className="pt-2">
              <div className="inline-flex flex-col items-start px-3.5 py-1.5 rounded-2xl bg-gold-500/10 border border-gold-500/30 text-gold-400 text-xs font-semibold tracking-wide leading-tight space-y-0.5">
                <span>BUILDING OPPORTUNITIES.</span>
                <span className="text-gold-300">CREATING WEALTH.</span>
              </div>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="text-white font-serif text-lg font-semibold mb-4 flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-gold-500"></span>
              <span>Quick Links</span>
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="hover:text-gold-400 transition-colors flex items-center space-x-1.5">
                  <span className="text-gold-500">›</span>
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link to="/buy-a-property" className="hover:text-gold-400 transition-colors flex items-center space-x-1.5">
                  <span className="text-gold-500">›</span>
                  <span className="font-semibold text-gold-300">Buy a Property</span>
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-gold-400 transition-colors flex items-center space-x-1.5">
                  <span className="text-gold-500">›</span>
                  <span>Advisory Services</span>
                </Link>
              </li>
              <li>
                <Link to="/nri-corner" className="hover:text-gold-400 transition-colors flex items-center space-x-1.5">
                  <span className="text-gold-500">›</span>
                  <span className="text-gold-300 font-medium">NRI Corner</span>
                </Link>
              </li>
              <li>
                <Link to="/faqs" className="hover:text-gold-400 transition-colors flex items-center space-x-1.5">
                  <span className="text-gold-500">›</span>
                  <span>FAQs</span>
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-gold-400 transition-colors flex items-center space-x-1.5">
                  <span className="text-gold-500">›</span>
                  <span>About Us & Founder</span>
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-gold-400 transition-colors flex items-center space-x-1.5">
                  <span className="text-gold-500">›</span>
                  <span>Contact Office</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Property Categories */}
          <div>
            <h4 className="text-white font-serif text-lg font-semibold mb-4 flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-gold-500"></span>
              <span>Popular Categories</span>
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/buy-a-property?type=plots" className="hover:text-gold-400 transition-colors flex items-center space-x-1.5">
                  <span className="text-gold-500">›</span>
                  <span>HMDA & DTCP Plots</span>
                </Link>
              </li>
              <li>
                <Link to="/buy-a-property?type=gated-community-villas" className="hover:text-gold-400 transition-colors flex items-center space-x-1.5">
                  <span className="text-gold-500">›</span>
                  <span>Gated Community Villas</span>
                </Link>
              </li>
              <li>
                <Link to="/buy-a-property?type=flats" className="hover:text-gold-400 transition-colors flex items-center space-x-1.5">
                  <span className="text-gold-500">›</span>
                  <span>Flats & Apartments</span>
                </Link>
              </li>
              <li>
                <Link to="/buy-a-property?type=independent-house" className="hover:text-gold-400 transition-colors flex items-center space-x-1.5">
                  <span className="text-gold-500">›</span>
                  <span>Independent Houses</span>
                </Link>
              </li>
              <li>
                <Link to="/buy-a-property?type=offices" className="hover:text-gold-400 transition-colors flex items-center space-x-1.5">
                  <span className="text-gold-500">›</span>
                  <span>Commercial & Offices</span>
                </Link>
              </li>
              <li>
                <Link to="/buy-a-property?type=agriculture-land" className="hover:text-gold-400 transition-colors flex items-center space-x-1.5">
                  <span className="text-gold-500">›</span>
                  <span>Agriculture Land & Farm House</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Get in Touch & Social */}
          <div className="space-y-4">
            <h4 className="text-white font-serif text-lg font-semibold flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-gold-500"></span>
              <span>Get in Touch</span>
            </h4>
            
            <div className="space-y-3 text-sm">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
                <span>Vanasthalipuram Main Road,<br />Hyderabad, Telangana – 500070.</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-gold-400 shrink-0" />
                <a href="tel:7075539189" className="hover:text-gold-400 font-semibold tracking-wide">
                  +91 7075539189
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <MessageCircle className="w-5 h-5 text-green-500 shrink-0" />
                <a 
                  href="https://wa.me/917075539189" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-gold-400 font-medium"
                >
                  WhatsApp Consultation
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-gold-400 shrink-0" />
                <a 
                  href="mailto:info.superbestproperties@gmail.com" 
                  className="hover:text-gold-400 font-medium break-all text-xs sm:text-sm"
                >
                  info.superbestproperties@gmail.com
                </a>
              </div>
            </div>

            <div className="pt-3">
              <h5 className="text-xs uppercase tracking-wider text-gray-400 mb-2.5 font-semibold">Follow Us</h5>
              <div className="flex items-center space-x-3">
                {/* Facebook */}
                <a 
                  href="https://facebook.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#1877F2] hover:bg-[#166fe5] flex items-center justify-center text-white transition-all duration-300 transform hover:scale-110 shadow-md hover:shadow-[0_0_14px_rgba(24,119,242,0.6)]"
                  aria-label="Facebook"
                  title="Follow us on Facebook"
                >
                  <svg className="w-4 h-4 sm:w-4.5 sm:h-4.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>

                {/* Instagram */}
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] flex items-center justify-center text-white transition-all duration-300 transform hover:scale-110 shadow-md hover:shadow-[0_0_14px_rgba(238,42,123,0.6)]"
                  aria-label="Instagram"
                  title="Follow us on Instagram"
                >
                  <svg className="w-4 h-4 sm:w-4.5 sm:h-4.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>

                {/* YouTube */}
                <a 
                  href="https://youtube.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#FF0000] hover:bg-[#d60000] flex items-center justify-center text-white transition-all duration-300 transform hover:scale-110 shadow-md hover:shadow-[0_0_14px_rgba(255,0,0,0.6)]"
                  aria-label="YouTube"
                  title="Subscribe to our YouTube Channel"
                >
                  <svg className="w-4 h-4 sm:w-4.5 sm:h-4.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>

                {/* LinkedIn */}
                <a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#0A66C2] hover:bg-[#004182] flex items-center justify-center text-white transition-all duration-300 transform hover:scale-110 shadow-md hover:shadow-[0_0_14px_rgba(10,102,194,0.6)]"
                  aria-label="LinkedIn"
                  title="Connect on LinkedIn"
                >
                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
              </div>
            </div>

          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-gray-500 space-y-4 md:space-y-0">
          <p>
            © {new Date().getFullYear()} <span className="text-gold-400 font-semibold">SUPER BEST PROPERTIES</span>. All rights reserved. Prepared by CODTECH PRIVATE LIMITED.
          </p>
          <div className="flex items-center space-x-6">
            <span className="italic text-gold-400/90 font-serif text-sm">Building Better Tomorrow...</span>
            <Link to="/admin" className="text-neutral-700 hover:text-neutral-400 transition-colors flex items-center space-x-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin Portal</span>
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}

