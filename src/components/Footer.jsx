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
          
          {/* Col 1: Brand & Logo */}
          <div className="space-y-4">
            <Link to="/" className="inline-block">
              <img 
                src="/assets/logo.png" 
                alt="Super Best Properties Logo" 
                className="h-16 w-auto object-contain" 
              />
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed">
              Your trusted partner in real estate advisory & property solutions across Hyderabad & Telangana. Delivering value-driven opportunities with integrity and transparency.
            </p>
            <div className="pt-2">
              <span className="inline-block px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 text-xs font-semibold tracking-wide">
                BUILDING OPPORTUNITIES. CREATING WEALTH.
              </span>
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
            </div>

            <div className="pt-3">
              <h5 className="text-xs uppercase tracking-wider text-gray-400 mb-2.5 font-semibold">Follow Us</h5>
              <div className="flex items-center space-x-3">
                <a 
                  href="https://facebook.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-9 h-9 rounded-full bg-neutral-900 border border-gold-500/30 flex items-center justify-center text-gold-400 hover:bg-gold-500 hover:text-black transition-all"
                  aria-label="Facebook"
                >
                  <span className="font-bold text-sm">f</span>
                </a>
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-9 h-9 rounded-full bg-neutral-900 border border-gold-500/30 flex items-center justify-center text-gold-400 hover:bg-gold-500 hover:text-black transition-all"
                  aria-label="Instagram"
                >
                  <span className="font-bold text-sm">ig</span>
                </a>
                <a 
                  href="https://youtube.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-9 h-9 rounded-full bg-neutral-900 border border-gold-500/30 flex items-center justify-center text-gold-400 hover:bg-gold-500 hover:text-black transition-all"
                  aria-label="YouTube"
                >
                  <span className="font-bold text-xs">yt</span>
                </a>
                <a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-9 h-9 rounded-full bg-neutral-900 border border-gold-500/30 flex items-center justify-center text-gold-400 hover:bg-gold-500 hover:text-black transition-all"
                  aria-label="LinkedIn"
                >
                  <span className="font-bold text-xs">in</span>
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

