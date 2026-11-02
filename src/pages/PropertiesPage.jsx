import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import PropertyCard from '../components/PropertyCard';
import { api } from '../services/api';
import { initialProperties, initialCategories } from '../data/mockData';
import { 
  Search, 
  RotateCcw, 
  Building, 
  SlidersHorizontal,
  ArrowUpDown
} from 'lucide-react';

export default function PropertiesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [properties, setProperties] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters State
  const [selectedType, setSelectedType] = useState(searchParams.get('type') || 'all');
  const [selectedLocation, setSelectedLocation] = useState(searchParams.get('location') || 'all');
  const [selectedBudget, setSelectedBudget] = useState(searchParams.get('budget') || 'all');
  const [selectedStatus, setSelectedStatus] = useState(searchParams.get('status') || 'all');
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [sortBy, setSortBy] = useState('newest');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const [allProps, allCats] = await Promise.all([
          api.getProperties(),
          api.getCategories()
        ]);
        setProperties(Array.isArray(allProps) && allProps.length > 0 ? allProps : initialProperties);
        setCategories(Array.isArray(allCats) && allCats.length > 0 ? allCats : initialCategories);
      } catch (err) {
        console.error('Error fetching properties:', err);
        setProperties(initialProperties);
        setCategories(initialCategories);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  // Filter properties
  const filteredProperties = properties.filter((prop) => {
    if (selectedType !== 'all' && prop.categorySlug !== selectedType && prop.categoryName.toLowerCase() !== selectedType.toLowerCase()) {
      return false;
    }
    if (selectedLocation !== 'all' && !prop.location.toLowerCase().includes(selectedLocation.toLowerCase())) {
      return false;
    }
    if (selectedStatus !== 'all' && prop.status.toLowerCase() !== selectedStatus.toLowerCase()) {
      return false;
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const match = prop.title.toLowerCase().includes(q) ||
        prop.location.toLowerCase().includes(q) ||
        prop.categoryName.toLowerCase().includes(q) ||
        prop.description.toLowerCase().includes(q);
      if (!match) return false;
    }
    if (selectedBudget !== 'all') {
      const [min, max] = selectedBudget.split('-').map(Number);
      if (max && (prop.priceNumber < min || prop.priceNumber > max)) {
        return false;
      }
    }
    return true;
  });

  // Sort properties
  const sortedProperties = [...filteredProperties].sort((a, b) => {
    if (sortBy === 'price-low') return a.priceNumber - b.priceNumber;
    if (sortBy === 'price-high') return b.priceNumber - a.priceNumber;
    if (sortBy === 'area-high') return (b.areaSqFt || 0) - (a.areaSqFt || 0);
    return new Date(b.createdDate || 0) - new Date(a.createdDate || 0);
  });

  const handleResetFilters = () => {
    setSelectedType('all');
    setSelectedLocation('all');
    setSelectedBudget('all');
    setSelectedStatus('all');
    setSearchQuery('');
    setSortBy('newest');
    setSearchParams({});
  };

  return (
    <div className="bg-[#FAFAFA] min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-serif font-extrabold text-neutral-900">
            Property Listings in <span className="gold-gradient-text">Hyderabad</span>
          </h1>
          <p className="text-neutral-600 text-sm sm:text-base mt-1">
            Discover verified open plots, luxury apartments, independent villas, commercial shops, and investment lands.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-neutral-200/90 mb-8 space-y-4">
          
          {/* Top row: Search input & Mobile filter toggle */}
          <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
            <div className="relative w-full sm:w-96">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by locality, title, or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-neutral-50 border border-neutral-200 focus:border-gold-500 rounded-xl pl-10 pr-4 py-2.5 text-sm text-neutral-800 focus:outline-none"
              />
            </div>

            <div className="flex items-center space-x-3 w-full sm:w-auto justify-between sm:justify-end">
              {/* Sort Dropdown */}
              <div className="flex items-center space-x-2">
                <ArrowUpDown className="w-4 h-4 text-gold-600 shrink-0" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-neutral-50 border border-neutral-200 text-xs sm:text-sm font-semibold rounded-xl px-3 py-2 text-neutral-700 focus:outline-none cursor-pointer"
                >
                  <option value="newest">Sort: Newest First</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="area-high">Area: Largest First</option>
                </select>
              </div>

              {/* Mobile filter button */}
              <button
                onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
                className="lg:hidden flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-gold-500 text-black font-bold text-xs"
              >
                <SlidersHorizontal className="w-4 h-4" />
                <span>Filters</span>
              </button>

              {/* Reset button */}
              <button
                onClick={handleResetFilters}
                className="flex items-center space-x-1 px-3 py-2 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-600 text-xs font-semibold transition-colors"
                title="Reset all filters"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Reset</span>
              </button>
            </div>
          </div>

          {/* Filters Row */}
          <div className={`${mobileFilterOpen ? 'block' : 'hidden'} lg:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 pt-3 border-t border-neutral-100`}>
            
            {/* Property Type Filter */}
            <div>
              <label className="block text-[11px] font-bold text-neutral-500 uppercase tracking-wider mb-1">
                Property Type
              </label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-2 text-xs font-medium text-neutral-800 focus:outline-none focus:border-gold-500"
              >
                <option value="all">All Types (15 Categories)</option>
                {categories.map((c) => (
                  <option key={c.slug} value={c.slug}>{c.name}</option>
                ))}
              </select>
            </div>

            {/* Location Filter */}
            <div>
              <label className="block text-[11px] font-bold text-neutral-500 uppercase tracking-wider mb-1">
                Location
              </label>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-2 text-xs font-medium text-neutral-800 focus:outline-none focus:border-gold-500"
              >
                <option value="all">All Locations</option>
                <option value="Vanasthalipuram">Vanasthalipuram</option>
                <option value="Tellapur">Tellapur</option>
                <option value="Gachibowli">Gachibowli</option>
                <option value="Shamshabad">Shamshabad</option>
                <option value="Kompally">Kompally</option>
                <option value="LB Nagar">LB Nagar</option>
                <option value="Madhapur">Madhapur / Hitec City</option>
                <option value="Banjara Hills">Banjara Hills</option>
                <option value="Moinabad">Moinabad</option>
              </select>
            </div>

            {/* Budget Filter */}
            <div>
              <label className="block text-[11px] font-bold text-neutral-500 uppercase tracking-wider mb-1">
                Budget
              </label>
              <select
                value={selectedBudget}
                onChange={(e) => setSelectedBudget(e.target.value)}
                className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-2 text-xs font-medium text-neutral-800 focus:outline-none focus:border-gold-500"
              >
                <option value="all">Any Budget</option>
                <option value="0-5000000">Under ₹ 50 Lakhs</option>
                <option value="5000000-10000000">₹ 50 Lakhs – ₹ 1 Cr</option>
                <option value="10000000-20000000">₹ 1 Cr – ₹ 2 Cr</option>
                <option value="20000000-100000000">Above ₹ 2 Cr</option>
              </select>
            </div>

            {/* Status Filter */}
            <div>
              <label className="block text-[11px] font-bold text-neutral-500 uppercase tracking-wider mb-1">
                Availability
              </label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-2 text-xs font-medium text-neutral-800 focus:outline-none focus:border-gold-500"
              >
                <option value="all">All Properties</option>
                <option value="available">Available Only</option>
                <option value="sold">Sold Out</option>
              </select>
            </div>

          </div>

        </div>

        {/* Results Count & Active Category Indicator */}
        <div className="flex items-center justify-between mb-6 text-sm text-neutral-600">
          <div>
            Showing <strong className="text-neutral-900">{sortedProperties.length}</strong> verified properties
            {selectedType !== 'all' && (
              <span> in <span className="text-gold-700 font-semibold">{selectedType}</span></span>
            )}
          </div>
          {(selectedType !== 'all' || selectedLocation !== 'all' || selectedBudget !== 'all' || searchQuery) && (
            <button
              onClick={handleResetFilters}
              className="text-xs text-gold-600 hover:text-gold-700 font-semibold underline"
            >
              Clear all active filters
            </button>
          )}
        </div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedProperties.map((prop) => (
            <PropertyCard key={prop.id} property={prop} />
          ))}
        </div>

      </div>
    </div>
  );
}
