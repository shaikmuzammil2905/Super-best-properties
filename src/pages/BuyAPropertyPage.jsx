import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import PropertyCard from '../components/PropertyCard';
import { api } from '../services/api';
import { initialProperties, initialCategories, initialProjects } from '../data/mockData';
import { 
  Search, 
  RotateCcw, 
  Building, 
  Home, 
  MapPin, 
  IndianRupee, 
  SlidersHorizontal,
  ArrowUpDown,
  Sparkles,
  CheckCircle2,
  Filter,
  ArrowRight
} from 'lucide-react';

export default function BuyAPropertyPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const resultsRef = useRef(null);

  const [properties, setProperties] = useState([]);
  const [categories, setCategories] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [priceRange, setPriceRange] = useState(searchParams.get('price') || searchParams.get('budget') || 'all');
  const [propertyType, setPropertyType] = useState(searchParams.get('type') || 'all');
  const [sortBy, setSortBy] = useState('newest');

  // Load Data from api (compatible with Admin Panel changes)
  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const [propsData, catsData, projsData] = await Promise.all([
          api.getProperties(),
          api.getCategories(),
          api.getProjects()
        ]);
        setProperties(Array.isArray(propsData) && propsData.length > 0 ? propsData : initialProperties);
        setCategories(Array.isArray(catsData) && catsData.length > 0 ? catsData : initialCategories);
        setProjects(Array.isArray(projsData) && projsData.length > 0 ? projsData : initialProjects);
      } catch (err) {
        console.error('Error loading data for Buy a Property:', err);
        setProperties(initialProperties);
        setCategories(initialCategories);
        setProjects(initialProjects);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  // Sync state if query parameters change (e.g. from homepage category click)
  useEffect(() => {
    const typeFromUrl = searchParams.get('type');
    const searchFromUrl = searchParams.get('search');
    const priceFromUrl = searchParams.get('price') || searchParams.get('budget');
    if (typeFromUrl) setPropertyType(typeFromUrl);
    if (searchFromUrl) setSearchQuery(searchFromUrl);
    if (priceFromUrl) setPriceRange(priceFromUrl);
  }, [searchParams]);

  // Handle Search Submission
  const handleSearchSubmit = (e) => {
    if (e) e.preventDefault();
    const params = {};
    if (searchQuery.trim()) params.search = searchQuery.trim();
    if (priceRange !== 'all') params.price = priceRange;
    if (propertyType !== 'all') params.type = propertyType;
    setSearchParams(params);

    // Smooth scroll to results
    if (resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Quick Pill Filter selection
  const handlePillSelect = (typeVal) => {
    setPropertyType(typeVal);
    const params = {};
    if (searchQuery.trim()) params.search = searchQuery.trim();
    if (priceRange !== 'all') params.price = priceRange;
    if (typeVal !== 'all') params.type = typeVal;
    setSearchParams(params);

    if (resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Reset Filters
  const handleResetFilters = () => {
    setSearchQuery('');
    setPriceRange('all');
    setPropertyType('all');
    setSortBy('newest');
    setSearchParams({});
  };

  // Filtering Logic
  const filteredProperties = properties.filter((prop) => {
    // 1. Property Type Filter
    if (propertyType !== 'all') {
      const typeLower = propertyType.toLowerCase();
      
      if (typeLower === 'plots' || typeLower === 'open plots') {
        const isPlot = prop.categorySlug === 'plots' || prop.categoryName.toLowerCase().includes('plot');
        if (!isPlot) return false;
      } else if (typeLower === 'houses' || typeLower === 'house') {
        const isHouse = prop.categorySlug === 'independent-house' || prop.categoryName.toLowerCase().includes('house');
        if (!isHouse) return false;
      } else if (typeLower === 'flats' || typeLower === 'flat') {
        const isFlat = prop.categorySlug === 'flats' || prop.categoryName.toLowerCase().includes('flat');
        if (!isFlat) return false;
      } else if (typeLower === 'apartments' || typeLower === 'apartment') {
        const isApt = prop.categorySlug === 'apartments' || prop.categoryName.toLowerCase().includes('apartment');
        if (!isApt) return false;
      } else if (typeLower === 'villas' || typeLower === 'villa') {
        const isVilla = prop.categorySlug === 'gated-community-villas' || prop.categoryName.toLowerCase().includes('villa');
        if (!isVilla) return false;
      } else if (typeLower === 'commercial') {
        const isComm = ['shops', 'offices', 'sharing-offices', 'godowns'].includes(prop.categorySlug) || 
                       prop.categoryName.toLowerCase().includes('commercial') ||
                       prop.categoryName.toLowerCase().includes('shop') ||
                       prop.categoryName.toLowerCase().includes('office');
        if (!isComm) return false;
      } else if (typeLower === 'residential') {
        const isRes = ['independent-house', 'flats', 'apartments', 'gated-community-villas'].includes(prop.categorySlug);
        if (!isRes) return false;
      } else if (typeLower === 'projects') {
        // Handled in combined display below
        return false;
      } else {
        const matchSlug = prop.categorySlug === propertyType || prop.categorySlug.replace(/s$/, '') === typeLower.replace(/s$/, '');
        const matchName = prop.categoryName.toLowerCase().includes(typeLower);
        if (!matchSlug && !matchName) return false;
      }
    }

    // 2. Price Range Filter based on actual priceNumber
    if (priceRange !== 'all') {
      const price = prop.priceNumber || 0;
      if (priceRange === 'below-50l' || priceRange === '0-5000000') {
        if (price > 5000000) return false;
      } else if (priceRange === '50l-1cr' || priceRange === '5000000-10000000') {
        if (price < 5000000 || price > 10000000) return false;
      } else if (priceRange === 'above-1cr' || priceRange === '10000000-plus') {
        if (price < 10000000) return false;
      } else if (priceRange === '1cr-2cr' || priceRange === '10000000-20000000') {
        if (price < 10000000 || price > 20000000) return false;
      } else if (priceRange === 'above-2cr' || priceRange === '20000000-plus') {
        if (price < 20000000) return false;
      }
    }

    // 3. Search query matching: title, location, category, description, and keywords
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const match = prop.title.toLowerCase().includes(q) ||
        prop.location.toLowerCase().includes(q) ||
        prop.categoryName.toLowerCase().includes(q) ||
        (prop.city && prop.city.toLowerCase().includes(q)) ||
        prop.description.toLowerCase().includes(q) ||
        (prop.bedrooms && prop.bedrooms.toLowerCase().includes(q));
      if (!match) return false;
    }

    return true;
  });

  // Filter projects if "projects" or "all" is active
  const filteredProjects = projects.filter((proj) => {
    if (propertyType !== 'all' && propertyType.toLowerCase() !== 'projects') {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const match = proj.name.toLowerCase().includes(q) ||
        proj.location.toLowerCase().includes(q) ||
        proj.type.toLowerCase().includes(q) ||
        proj.description.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });

  // Sorting
  const sortedProperties = [...filteredProperties].sort((a, b) => {
    if (sortBy === 'price-low') return a.priceNumber - b.priceNumber;
    if (sortBy === 'price-high') return b.priceNumber - a.priceNumber;
    if (sortBy === 'area-high') return (b.areaSqFt || 0) - (a.areaSqFt || 0);
    return new Date(b.createdDate || 0) - new Date(a.createdDate || 0);
  });

  const hasActiveFilters = searchQuery.trim() !== '' || priceRange !== 'all' || propertyType !== 'all';
  const showProjectsOnly = propertyType.toLowerCase() === 'projects';

  return (
    <div className="bg-[#FAFAFA] min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ======================================================== */}
        {/* 1. SECTION HEADING */}
        {/* ======================================================== */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-700 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-gold-600" />
            <span>Comprehensive Property & Project Solutions</span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-black text-neutral-950 tracking-tight">
            Buy a <span className="gold-gradient-text">Property</span>
          </h1>
          
          <p className="mt-3 text-neutral-600 text-sm sm:text-base leading-relaxed">
            Search & filter verified HMDA plots, modern flats, independent houses, gated luxury villas, commercial spaces, and landmark projects in prime growth corridors.
          </p>

          <div className="flex items-center justify-center space-x-2 mt-4">
            <span className="w-12 h-1 bg-gold-500 rounded-full"></span>
            <span className="w-2.5 h-2.5 bg-gold-600 rounded-full"></span>
            <span className="w-12 h-1 bg-gold-500 rounded-full"></span>
          </div>
        </div>

        {/* ======================================================== */}
        {/* 2. UNIFIED SEARCH & FILTER BAR (Master Prompt Spec 4, 5, 6) */}
        {/* Desktop: [ Search properties... ] [ Price Range ▼ ] [ Property Type ▼ ] [ Search ] */}
        {/* Mobile: Responsive stacked controls with zero clipping */}
        {/* ======================================================== */}
        <div className="bg-white rounded-3xl p-4 sm:p-5 shadow-[0_20px_50px_rgba(0,0,0,0.08)] border-2 border-gold-400 mb-8 sm:mb-10 transition-all">
          <form onSubmit={handleSearchSubmit} className="space-y-3 sm:space-y-0">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
              
              {/* Search Box (Col 5) */}
              <div className="md:col-span-5 relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gold-600 pointer-events-none">
                  <Search className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  placeholder="Search properties, locations, projects (e.g. Tellapur, 2 BHK, Villa, Plot)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-neutral-50 hover:bg-neutral-100/70 focus:bg-white border border-neutral-200 focus:border-gold-500 rounded-2xl pl-12 pr-4 py-3.5 text-sm sm:text-base font-semibold text-neutral-900 placeholder-neutral-400 focus:outline-none transition-all shadow-inner"
                />
              </div>

              {/* Price Range Dropdown (Col 3) - Master Prompt Spec 4 */}
              <div className="md:col-span-3 relative">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gold-600 pointer-events-none">
                  <IndianRupee className="w-4 h-4" />
                </div>
                <select
                  value={priceRange}
                  onChange={(e) => {
                    setPriceRange(e.target.value);
                  }}
                  className="w-full bg-neutral-50 hover:bg-neutral-100/70 focus:bg-white border border-neutral-200 focus:border-gold-500 rounded-2xl pl-10 pr-8 py-3.5 text-sm sm:text-base font-semibold text-neutral-900 focus:outline-none cursor-pointer transition-all"
                  aria-label="Price Range"
                >
                  <option value="all">Price Range: Any Price</option>
                  <option value="below-50l">Below ₹50 Lakhs</option>
                  <option value="50l-1cr">₹50 Lakhs – ₹1 Crore</option>
                  <option value="above-1cr">Above ₹1 Crore</option>
                  <option value="1cr-2cr">₹1 Crore – ₹2 Crore</option>
                  <option value="above-2cr">Above ₹2 Crore</option>
                </select>
              </div>

              {/* Property Type Dropdown (Col 3) - Master Prompt Spec 5 */}
              <div className="md:col-span-2 relative">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gold-600 pointer-events-none">
                  <Building className="w-4 h-4" />
                </div>
                <select
                  value={propertyType}
                  onChange={(e) => {
                    setPropertyType(e.target.value);
                  }}
                  className="w-full bg-neutral-50 hover:bg-neutral-100/70 focus:bg-white border border-neutral-200 focus:border-gold-500 rounded-2xl pl-10 pr-8 py-3.5 text-sm sm:text-base font-semibold text-neutral-900 focus:outline-none cursor-pointer transition-all"
                  aria-label="Property Type"
                >
                  <option value="all">All Properties</option>
                  <option value="plots">Plots</option>
                  <option value="houses">Houses</option>
                  <option value="flats">Flats</option>
                  <option value="apartments">Apartments</option>
                  <option value="villas">Villas</option>
                  <option value="open plots">Open Plots</option>
                  <option value="commercial">Commercial</option>
                  <option value="residential">Residential</option>
                  <option value="projects">Landmark Projects</option>
                  
                  {/* Dynamically populated from actual Categories */}
                  <optgroup label="All 15 Specific Categories">
                    {categories.map((c) => (
                      <option key={c.slug} value={c.slug}>{c.name}</option>
                    ))}
                  </optgroup>
                </select>
              </div>

              {/* Action Buttons: Search & Reset (Col 2) */}
              <div className="md:col-span-2 flex items-center space-x-2">
                <button
                  type="submit"
                  className="flex-1 flex items-center justify-center space-x-2 py-3.5 px-5 rounded-2xl gold-gradient-btn text-black font-extrabold text-sm sm:text-base tracking-wide shadow-md hover:shadow-xl hover:scale-105 active:scale-95 transition-all"
                >
                  <Search className="w-4 h-4 text-black" />
                  <span>Search</span>
                </button>

                {hasActiveFilters && (
                  <button
                    type="button"
                    onClick={handleResetFilters}
                    title="Reset all filters"
                    className="p-3.5 rounded-2xl bg-neutral-100 hover:bg-neutral-200 text-neutral-700 hover:text-black transition-colors shrink-0"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                )}
              </div>

            </div>
          </form>

          {/* Quick Category & Project Filter Pills (Unifying Categories & Projects) */}
          <div className="mt-4 pt-4 border-t border-neutral-100 flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-none text-xs sm:text-sm">
            <span className="text-neutral-400 font-bold uppercase tracking-wider shrink-0 text-[11px] mr-1 flex items-center">
              <Filter className="w-3.5 h-3.5 mr-1 text-gold-600" />
              Quick:
            </span>

            {[
              { label: 'All', val: 'all' },
              { label: 'Plots', val: 'plots' },
              { label: 'Flats', val: 'flats' },
              { label: 'Apartments', val: 'apartments' },
              { label: 'Villas', val: 'villas' },
              { label: 'Houses', val: 'houses' },
              { label: 'Landmark Projects', val: 'projects' },
              { label: 'Commercial', val: 'commercial' },
              { label: 'Offices', val: 'offices' },
              { label: 'Agriculture Land', val: 'agriculture-land' },
              { label: 'Farm House', val: 'farm-houses' },
            ].map((pill) => (
              <button
                key={pill.val}
                type="button"
                onClick={() => handlePillSelect(pill.val)}
                className={`px-3.5 py-1.5 rounded-full font-bold whitespace-nowrap transition-all duration-200 shrink-0 ${
                  propertyType.toLowerCase() === pill.val.toLowerCase()
                    ? 'bg-gradient-to-r from-gold-600 to-gold-400 text-black shadow-md shadow-gold-500/20'
                    : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-700 hover:text-black'
                }`}
              >
                {pill.label}
              </button>
            ))}
          </div>

        </div>

        {/* ======================================================== */}
        {/* 3. RESULTS BAR & SORTING */}
        {/* ======================================================== */}
        <div ref={resultsRef} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6 pt-2">
          
          {/* Active Results Summary */}
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-neutral-900 flex items-center space-x-2">
              <span>
                {showProjectsOnly 
                  ? `Landmark Projects (${filteredProjects.length})` 
                  : `Available Properties (${sortedProperties.length}${filteredProjects.length > 0 ? ` + ${filteredProjects.length} Projects` : ''})`
                }
              </span>
            </h2>

            {/* Active filter badges */}
            {hasActiveFilters && (
              <div className="flex flex-wrap items-center gap-2 mt-2">
                <span className="text-xs text-neutral-500 font-medium">Filtered by:</span>
                
                {searchQuery && (
                  <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full bg-gold-100 text-gold-800 text-xs font-semibold">
                    <span>"{searchQuery}"</span>
                    <button onClick={() => setSearchQuery('')} className="hover:text-black font-bold">×</button>
                  </span>
                )}

                {propertyType !== 'all' && (
                  <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full bg-gold-100 text-gold-800 text-xs font-semibold capitalize">
                    <span>Type: {propertyType}</span>
                    <button onClick={() => setPropertyType('all')} className="hover:text-black font-bold">×</button>
                  </span>
                )}

                {priceRange !== 'all' && (
                  <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full bg-gold-100 text-gold-800 text-xs font-semibold">
                    <span>Price: {
                      priceRange === 'below-50l' ? 'Below ₹50 Lakhs' :
                      priceRange === '50l-1cr' ? '₹50 Lakhs – ₹1 Cr' :
                      priceRange === 'above-1cr' ? 'Above ₹1 Cr' :
                      priceRange === '1cr-2cr' ? '₹1 Cr – ₹2 Cr' :
                      priceRange === 'above-2cr' ? 'Above ₹2 Cr' : priceRange
                    }</span>
                    <button onClick={() => setPriceRange('all')} className="hover:text-black font-bold">×</button>
                  </span>
                )}

                <button
                  onClick={handleResetFilters}
                  className="text-xs text-gold-700 hover:text-gold-900 underline font-semibold ml-1"
                >
                  Clear all
                </button>
              </div>
            )}
          </div>

          {/* Sort Controls */}
          {!showProjectsOnly && (
            <div className="flex items-center space-x-2 self-end sm:self-auto">
              <ArrowUpDown className="w-4 h-4 text-gold-600 shrink-0" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white border border-neutral-300 rounded-xl px-3 py-2 text-xs sm:text-sm font-semibold text-neutral-800 focus:outline-none focus:border-gold-500 cursor-pointer shadow-sm"
              >
                <option value="newest">Sort: Newest First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="area-high">Area: Largest First</option>
              </select>
            </div>
          )}

        </div>

        {/* ======================================================== */}
        {/* 4. PROPERTY CARDS GRID (Master Prompt Spec 7 & 8) */}
        {/* ======================================================== */}
        {!showProjectsOnly && (
          <>
            {sortedProperties.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {sortedProperties.map((prop) => (
                  <PropertyCard key={prop.id} property={prop} />
                ))}
              </div>
            ) : (
              <div className="bg-white border border-neutral-200 rounded-3xl p-12 text-center my-6">
                <Building className="w-12 h-12 text-gold-500 mx-auto mb-3 opacity-60" />
                <h3 className="text-xl font-bold text-neutral-800">No properties match your filter criteria</h3>
                <p className="text-neutral-500 text-sm mt-1 max-w-md mx-auto">
                  Try adjusting your search keywords, price range, or property type to explore other verified opportunities.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="mt-5 inline-flex items-center space-x-2 px-6 py-2.5 rounded-full gold-gradient-btn text-black font-bold text-sm shadow-md"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Reset All Filters</span>
                </button>
              </div>
            )}
          </>
        )}

        {/* ======================================================== */}
        {/* 5. LANDMARK PROJECTS SECTION (Unified Projects) */}
        {/* ======================================================== */}
        {(showProjectsOnly || (propertyType === 'all' && filteredProjects.length > 0)) && (
          <div className="mt-16 pt-10 border-t border-neutral-200">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-gold-600 font-bold text-xs uppercase tracking-widest">
                  Featured Mega Developments
                </span>
                <h2 className="text-2xl sm:text-3xl font-serif font-black text-neutral-900 mt-1">
                  Landmark Projects & Communities
                </h2>
              </div>
              
              {!showProjectsOnly && (
                <button
                  onClick={() => handlePillSelect('projects')}
                  className="inline-flex items-center space-x-1.5 text-xs sm:text-sm font-bold text-gold-700 hover:text-gold-900 hover:underline"
                >
                  <span>View All Projects</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredProjects.map((project) => (
                <div 
                  key={project.id}
                  className="bg-white rounded-2xl overflow-hidden border border-neutral-200 hover:border-gold-500/80 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col group"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                    <div className="absolute top-3 left-3 bg-black/85 backdrop-blur-md px-3 py-1 rounded-full border border-gold-400 text-gold-300 text-xs font-bold">
                      {project.status || 'Active Project'}
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[11px] font-bold text-gold-700 uppercase tracking-wider block">
                        {project.type}
                      </span>
                      <h3 className="font-bold text-base text-neutral-900 mt-1 group-hover:text-gold-600 transition-colors line-clamp-1">
                        {project.name}
                      </h3>
                      <p className="text-neutral-500 text-xs flex items-center space-x-1 mt-1">
                        <MapPin className="w-3.5 h-3.5 text-gold-600 shrink-0" />
                        <span>{project.location}</span>
                      </p>
                      <p className="text-neutral-600 text-xs mt-2.5 line-clamp-2">
                        {project.description}
                      </p>
                    </div>

                    <div className="pt-4 mt-4 border-t border-neutral-100 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] uppercase text-neutral-400 block font-bold">Starting from</span>
                        <span className="font-extrabold text-neutral-900 text-sm sm:text-base text-gold-700">
                          {project.startingPrice}
                        </span>
                      </div>

                      <a
                        href={`https://wa.me/917075539189?text=Hello%20Super%20Best%20Properties,%20I%20am%20interested%20in%20project:%20${encodeURIComponent(project.name)}.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-1 px-3.5 py-1.5 rounded-full bg-black text-white hover:bg-gold-500 hover:text-black font-bold text-xs transition-colors"
                      >
                        <span>Enquire</span>
                        <ArrowRight className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

