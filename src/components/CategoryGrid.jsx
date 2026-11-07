import React from 'react';
import { Link } from 'react-router-dom';
import { getCategoryIcon } from '../utils/categoryIcons';
import { ArrowRight, Sparkles } from 'lucide-react';

export const categoriesData = [
  { id: '1', name: 'Independent House', slug: 'independent-house', icon: 'Home', count: '4+ Listings' },
  { id: '2', name: 'Plot', slug: 'plots', icon: 'Square', count: '5+ Listings' },
  { id: '3', name: 'Flat', slug: 'flats', icon: 'Building', count: '6+ Listings' },
  { id: '4', name: 'Apartment', slug: 'apartments', icon: 'Building2', count: '5+ Listings' },
  { id: '5', name: 'Shops', slug: 'shops', icon: 'Store', count: '3+ Listings' },
  { id: '6', name: 'Gated Community Villas', slug: 'gated-community-villas', icon: 'Castle', count: '4+ Listings' },
  { id: '7', name: 'Function Halls', slug: 'function-halls', icon: 'Columns', count: '2+ Listings' },
  { id: '8', name: 'Agriculture Land', slug: 'agriculture-land', icon: 'Trees', count: '3+ Listings' },
  { id: '9', name: 'Farm House', slug: 'farm-houses', icon: 'Warehouse', count: '3+ Listings' },
  { id: '10', name: 'Godown / Warehouse', slug: 'godowns', icon: 'Archive', count: '2+ Listings' },
  { id: '11', name: 'Offices', slug: 'offices', icon: 'Briefcase', count: '4+ Listings' },
  { id: '12', name: 'Sharing Office', slug: 'sharing-offices', icon: 'Users', count: '3+ Listings' },
  { id: '13', name: 'PG Hostel', slug: 'pg-hostels', icon: 'Bed', count: '3+ Listings' },
  { id: '14', name: 'PG Building', slug: 'pg-buildings', icon: 'Hotel', count: '2+ Listings' },
  { id: '15', name: 'Guest House', slug: 'guest-houses', icon: 'Compass', count: '2+ Listings' },
];

export default function CategoryGrid({ title = "What are you looking for?", subtitle = "Explore diverse residential, commercial & investment opportunities curated for you" }) {
  return (
    <section className="py-16 bg-[#FAFAFA] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Heading matching Reference Image 3 */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0D0D0D] tracking-tight">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-3 text-neutral-600 text-sm sm:text-base max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
          <div className="flex items-center justify-center space-x-2 mt-4">
            <span className="w-12 h-1 bg-gold-500 rounded-full"></span>
            <span className="w-2 h-2 bg-gold-600 rounded-full"></span>
            <span className="w-12 h-1 bg-gold-500 rounded-full"></span>
          </div>
        </div>

        {/* 15 Category Grid (Responsive: 2 on mobile, 3 on tablet, 5 on desktop) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
          {categoriesData.map((cat) => (
            <Link
              key={cat.slug}
              to={`/buy-a-property?type=${cat.slug}`}
              className="group relative bg-white border border-neutral-200/90 hover:border-gold-500/80 rounded-2xl p-5 sm:p-6 text-center transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-1 flex flex-col items-center justify-center aspect-[1/1.05]"
            >
              {/* Subtle gold gradient accent on hover */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-gold-500/0 via-gold-500/0 to-gold-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>

              {/* Icon Container */}
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-neutral-50 group-hover:bg-gold-500/15 border border-neutral-200 group-hover:border-gold-400 flex items-center justify-center text-neutral-700 group-hover:text-gold-600 transition-all duration-300 mb-4 shadow-inner">
                {getCategoryIcon(cat.name, "w-7 h-7 sm:w-8 sm:h-8")}
              </div>

              {/* Category Name */}
              <h3 className="font-bold text-xs sm:text-sm text-neutral-900 group-hover:text-gold-700 transition-colors line-clamp-2 px-1">
                {cat.name}
              </h3>

              {/* Count badge */}
              <span className="mt-1 text-[11px] text-neutral-500 group-hover:text-neutral-700 transition-colors">
                {cat.count}
              </span>

              {/* Bottom arrow on hover */}
              <div className="mt-2 text-gold-500 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-1 group-hover:translate-y-0">
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}

