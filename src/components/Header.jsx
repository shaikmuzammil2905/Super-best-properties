import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, MessageCircle, Phone, ArrowRight, Heart } from 'lucide-react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [propertiesDropdown, setPropertiesDropdown] = useState(false);
  const [projectsDropdown, setProjectsDropdown] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setPropertiesDropdown(false);
    setProjectsDropdown(false);
  }, [location.pathname]);

  const categories = [
    { name: 'Independent House', slug: 'independent-house' },
    { name: 'Plot', slug: 'plots' },
    { name: 'Flat', slug: 'flats' },
    { name: 'Apartment', slug: 'apartments' },
    { name: 'Shops', slug: 'shops' },
    { name: 'Gated Community Villas', slug: 'gated-community-villas' },
    { name: 'Function Halls', slug: 'function-halls' },
    { name: 'Agriculture Land', slug: 'agriculture-land' },
    { name: 'Farm House', slug: 'farm-houses' },
    { name: 'Godown / Warehouse', slug: 'godowns' },
    { name: 'Offices', slug: 'offices' },
    { name: 'Sharing Office', slug: 'sharing-offices' },
    { name: 'PG Hostel', slug: 'pg-hostels' },
    { name: 'PG Building', slug: 'pg-buildings' },
    { name: 'Guest House', slug: 'guest-houses' },
  ];

  const projects = [
    { name: 'Super Best Royal Enclave (Tellapur)', slug: 'super-best-royal-enclave' },
    { name: 'Super Best Green Meadows (Shamshabad)', slug: 'super-best-green-meadows' },
    { name: 'Super Best Golden Heights (Gachibowli)', slug: 'super-best-golden-heights' },
    { name: 'Super Best Silicon Tech Park (Hitec City)', slug: 'super-best-silicon-tech-park' },
  ];

  const isHome = location.pathname === '/';

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-black/95 backdrop-blur-md shadow-2xl border-b border-gold-500/20 py-2 sm:py-2.5' : 'bg-black border-b border-gold-500/15 py-2.5 sm:py-3.5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo Section - Increased size, clearly visible, zero black patch work */}
          <Link to="/" className="flex items-center space-x-3 group py-0.5">
            <img 
              src="/assets/logo.png" 
              alt="Super Best Properties Logo" 
              className="h-14 sm:h-16 md:h-20 lg:h-20 w-auto object-contain transition-transform duration-300 group-hover:scale-105 filter drop-shadow-[0_2px_10px_rgba(212,160,23,0.3)]" 
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            
            {/* Home Link */}
            <Link 
              to="/" 
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                isHome 
                  ? 'bg-gradient-to-r from-gold-600 via-gold-500 to-gold-400 text-black shadow-md shadow-gold-500/20' 
                  : 'text-gray-300 hover:text-gold-400 hover:bg-neutral-900/60'
              }`}
            >
              Home
            </Link>

            {/* Properties Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setPropertiesDropdown(true)}
              onMouseLeave={() => setPropertiesDropdown(false)}
            >
              <button 
                className={`flex items-center space-x-1 px-3.5 py-2 rounded-full text-sm font-medium transition-colors ${
                  location.pathname.startsWith('/properties') 
                    ? 'text-gold-400 font-semibold' 
                    : 'text-gray-300 hover:text-gold-400'
                }`}
              >
                <span>Properties</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${propertiesDropdown ? 'rotate-180 text-gold-400' : ''}`} />
              </button>

              {propertiesDropdown && (
                <div className="absolute top-full left-0 w-80 pt-2 z-50 animate-fade-in">
                  <div className="bg-[#0f0f0f] border border-gold-500/30 rounded-2xl shadow-2xl p-3 grid grid-cols-1 gap-1 text-sm backdrop-blur-xl">
                    <Link 
                      to="/properties" 
                      className="flex items-center justify-between px-3 py-2 rounded-xl text-gold-400 bg-gold-500/10 hover:bg-gold-500/20 font-semibold transition-colors"
                    >
                      <span>Explore All Properties</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                    <div className="border-t border-neutral-800 my-1"></div>
                    <div className="max-h-80 overflow-y-auto pr-1">
                      {categories.map((cat) => (
                        <Link
                          key={cat.slug}
                          to={`/properties/${cat.slug}`}
                          className="block px-3 py-1.5 rounded-lg text-gray-300 hover:text-white hover:bg-gold-500/15 hover:border-l-2 hover:border-gold-500 text-xs sm:text-sm transition-all"
                        >
                          {cat.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Projects Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setProjectsDropdown(true)}
              onMouseLeave={() => setProjectsDropdown(false)}
            >
              <button 
                className={`flex items-center space-x-1 px-3.5 py-2 rounded-full text-sm font-medium transition-colors ${
                  location.pathname.startsWith('/projects') 
                    ? 'text-gold-400 font-semibold' 
                    : 'text-gray-300 hover:text-gold-400'
                }`}
              >
                <span>Projects</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${projectsDropdown ? 'rotate-180 text-gold-400' : ''}`} />
              </button>

              {projectsDropdown && (
                <div className="absolute top-full left-0 w-72 pt-2 z-50 animate-fade-in">
                  <div className="bg-[#0f0f0f] border border-gold-500/30 rounded-2xl shadow-2xl p-3 text-sm backdrop-blur-xl">
                    <Link 
                      to="/projects" 
                      className="flex items-center justify-between px-3 py-2 rounded-xl text-gold-400 bg-gold-500/10 hover:bg-gold-500/20 font-semibold transition-colors mb-1"
                    >
                      <span>All Landmark Projects</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                    <div className="border-t border-neutral-800 my-1"></div>
                    {projects.map((proj) => (
                      <Link
                        key={proj.slug}
                        to={`/projects/${proj.slug}`}
                        className="block px-3 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-gold-500/15 text-xs sm:text-sm transition-all"
                      >
                        {proj.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Categories Link */}
            <Link 
              to="/categories" 
              className={`px-3.5 py-2 rounded-full text-sm font-medium transition-colors ${
                location.pathname === '/categories' ? 'text-gold-400 font-semibold' : 'text-gray-300 hover:text-gold-400'
              }`}
            >
              Categories
            </Link>

            {/* Services Link */}
            <Link 
              to="/services" 
              className={`px-3.5 py-2 rounded-full text-sm font-medium transition-colors ${
                location.pathname === '/services' ? 'text-gold-400 font-semibold' : 'text-gray-300 hover:text-gold-400'
              }`}
            >
              Services
            </Link>

            {/* About Us Link */}
            <Link 
              to="/about" 
              className={`px-3.5 py-2 rounded-full text-sm font-medium transition-colors ${
                location.pathname === '/about' ? 'text-gold-400 font-semibold' : 'text-gray-300 hover:text-gold-400'
              }`}
            >
              About Us
            </Link>

            {/* Contact Us Link */}
            <Link 
              to="/contact" 
              className={`px-3.5 py-2 rounded-full text-sm font-medium transition-colors ${
                location.pathname === '/contact' ? 'text-gold-400 font-semibold' : 'text-gray-300 hover:text-gold-400'
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

          {/* Mobile Hamburger Button */}
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

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-neutral-950/98 border-t border-gold-500/20 px-4 pt-4 pb-8 space-y-3 animate-fade-in backdrop-blur-2xl">
          <Link
            to="/"
            className={`block px-4 py-2.5 rounded-xl font-semibold text-base ${
              isHome ? 'bg-gradient-to-r from-gold-600 to-gold-400 text-black' : 'text-gray-200 hover:bg-neutral-900'
            }`}
          >
            Home
          </Link>

          <Link
            to="/categories"
            className="block px-4 py-2.5 rounded-xl text-gray-200 hover:text-gold-400 hover:bg-neutral-900 font-medium"
          >
            What are you looking for? (15 Categories)
          </Link>

          <Link
            to="/properties"
            className="block px-4 py-2.5 rounded-xl text-gray-200 hover:text-gold-400 hover:bg-neutral-900 font-medium"
          >
            All Properties
          </Link>

          <Link
            to="/projects"
            className="block px-4 py-2.5 rounded-xl text-gray-200 hover:text-gold-400 hover:bg-neutral-900 font-medium"
          >
            Landmark Projects
          </Link>

          <Link
            to="/services"
            className="block px-4 py-2.5 rounded-xl text-gray-200 hover:text-gold-400 hover:bg-neutral-900 font-medium"
          >
            Our Services
          </Link>

          <Link
            to="/about"
            className="block px-4 py-2.5 rounded-xl text-gray-200 hover:text-gold-400 hover:bg-neutral-900 font-medium"
          >
            About Us & Founder
          </Link>

          {/* Contact Us - Exactly as requested in image copy 12.png */}
          <Link
            to="/contact"
            className="block px-4 py-2.5 rounded-xl text-gray-200 hover:text-gold-400 hover:bg-neutral-900 font-medium"
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
