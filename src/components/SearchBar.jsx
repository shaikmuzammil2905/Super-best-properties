import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, MapPin, IndianRupee, Search, RotateCcw } from 'lucide-react';

export default function SearchBar({ onSearch, initialValues = {}, className = "" }) {
  const navigate = useNavigate();
  const [type, setType] = useState(initialValues.type || '');
  const [location, setLocation] = useState(initialValues.location || '');
  const [budget, setBudget] = useState(initialValues.budget || '');

  const handleSearch = (e) => {
    e.preventDefault();
    const query = new URLSearchParams();
    if (type && type !== 'all') query.append('type', type);
    if (location && location !== 'all') query.append('location', location);
    if (budget && budget !== 'all') query.append('budget', budget);

    if (onSearch) {
      onSearch({ type, location, budget });
    } else {
      navigate(`/properties?${query.toString()}`);
    }
  };

  const handleReset = () => {
    setType('');
    setLocation('');
    setBudget('');
    if (onSearch) {
      onSearch({ type: '', location: '', budget: '' });
    }
  };

  return (
    <div className={`w-full max-w-5xl mx-auto ${className}`}>
      <form 
        onSubmit={handleSearch}
        className="bg-white/98 backdrop-blur-xl rounded-2xl sm:rounded-full p-3 sm:p-3.5 shadow-2xl border-2 border-gold-400/40 hover:border-gold-500 transition-all duration-300 transform hover:-translate-y-0.5"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 items-center">
          
          {/* 1. Property Type */}
          <div className="flex items-center space-x-3 px-3 py-2 border-b sm:border-b-0 sm:border-r border-neutral-200">
            <div className="w-8 h-8 rounded-full bg-gold-500/15 flex items-center justify-center text-gold-600 shrink-0 shadow-sm">
              <Home className="w-4 h-4" />
            </div>
            <div className="flex-1 text-left">
              <label className="block text-[10px] uppercase font-bold tracking-wider text-neutral-400">
                Property Type
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full bg-transparent text-xs sm:text-sm font-semibold text-neutral-800 focus:outline-none cursor-pointer"
              >
                <option value="">Select Type</option>
                <option value="independent-house">Independent House</option>
                <option value="plots">Plot</option>
                <option value="flats">Flat</option>
                <option value="apartments">Apartment</option>
                <option value="shops">Shops</option>
                <option value="gated-community-villas">Gated Community Villas</option>
                <option value="function-halls">Function Halls</option>
                <option value="agriculture-land">Agriculture Land</option>
                <option value="farm-houses">Farm House</option>
                <option value="godowns">Godown / Warehouse</option>
                <option value="offices">Offices</option>
                <option value="sharing-offices">Sharing Office</option>
                <option value="pg-hostels">PG Hostel</option>
                <option value="pg-buildings">PG Building</option>
                <option value="guest-houses">Guest House</option>
              </select>
            </div>
          </div>

          {/* 2. Location */}
          <div className="flex items-center space-x-3 px-3 py-2 border-b sm:border-b-0 sm:border-r border-neutral-200">
            <div className="w-8 h-8 rounded-full bg-gold-500/15 flex items-center justify-center text-gold-600 shrink-0 shadow-sm">
              <MapPin className="w-4 h-4" />
            </div>
            <div className="flex-1 text-left">
              <label className="block text-[10px] uppercase font-bold tracking-wider text-neutral-400">
                Location
              </label>
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full bg-transparent text-xs sm:text-sm font-semibold text-neutral-800 focus:outline-none cursor-pointer"
              >
                <option value="">Select Location</option>
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
          </div>

          {/* 3. Budget Range */}
          <div className="flex items-center space-x-3 px-3 py-2 border-b sm:border-b-0 sm:border-r-0 lg:border-r border-neutral-200">
            <div className="w-8 h-8 rounded-full bg-gold-500/15 flex items-center justify-center text-gold-600 shrink-0 shadow-sm">
              <IndianRupee className="w-4 h-4" />
            </div>
            <div className="flex-1 text-left">
              <label className="block text-[10px] uppercase font-bold tracking-wider text-neutral-400">
                Budget Range
              </label>
              <select
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="w-full bg-transparent text-xs sm:text-sm font-semibold text-neutral-800 focus:outline-none cursor-pointer"
              >
                <option value="">Select Budget</option>
                <option value="0-5000000">Under ₹ 50 Lakhs</option>
                <option value="5000000-10000000">₹ 50 Lakhs – ₹ 1 Cr</option>
                <option value="10000000-20000000">₹ 1 Cr – ₹ 2 Cr</option>
                <option value="20000000-100000000">Above ₹ 2 Cr</option>
              </select>
            </div>
          </div>

          {/* 4. Search & Reset Button */}
          <div className="flex items-center space-x-2 w-full px-1">
            <button
              type="submit"
              className="flex-1 flex items-center justify-center space-x-2 py-3 px-6 rounded-full gold-gradient-btn text-black font-extrabold text-sm sm:text-base tracking-wide hover:shadow-xl transition-all"
            >
              <Search className="w-4 h-4 text-black" />
              <span>Search</span>
            </button>

            {(type || location || budget) && (
              <button
                type="button"
                onClick={handleReset}
                title="Reset filters"
                className="p-3 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-600 hover:text-black transition-colors shrink-0"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            )}
          </div>

        </div>
      </form>
    </div>
  );
}
