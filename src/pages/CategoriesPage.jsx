import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCategoryIcon } from '../utils/categoryIcons';
import { ArrowRight, Sparkles, Building, Layers, Search } from 'lucide-react';
import { api } from '../services/api';

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const data = await api.getCategories();
        setCategories(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchCategories();
  }, []);

  const filtered = categories.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    (c.description && c.description.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="bg-[#FAFAFA] min-h-screen py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header matching Reference Image 3 */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-600 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Select Your Real Estate Need</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0D0D0D] tracking-tight">
            What are you looking for?
          </h1>
          <p className="mt-3 text-sm sm:text-base text-neutral-600">
            Browse our comprehensive 15 property categories across residential, commercial, industrial, and investment solutions.
          </p>

          {/* Quick Search */}
          <div className="mt-6 max-w-md mx-auto relative">
            <Search className="w-5 h-5 text-neutral-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search property categories (e.g. Plot, Villa, Flat, Office)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white border border-neutral-300 focus:border-gold-500 rounded-full pl-11 pr-4 py-3 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-gold-500/20"
            />
          </div>
        </div>

        {/* 15 Categories Grid */}
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
            {[...Array(15)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl h-48 animate-pulse border border-neutral-200"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
            {filtered.map((cat) => (
              <Link
                key={cat.id || cat.slug}
                to={`/properties/${cat.slug}`}
                className="group relative bg-white border border-neutral-200/90 hover:border-gold-500/80 rounded-2xl p-5 sm:p-6 text-center transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-1.5 flex flex-col items-center justify-between"
              >
                {/* Gold glow top corner */}
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-neutral-50 group-hover:bg-gold-500/15 border border-neutral-200 group-hover:border-gold-400 flex items-center justify-center text-neutral-700 group-hover:text-gold-600 transition-all duration-300 mb-4 shadow-inner">
                  {getCategoryIcon(cat.name, "w-8 h-8 sm:w-10 sm:h-10")}
                </div>

                <div>
                  <h3 className="font-bold text-sm sm:text-base text-neutral-900 group-hover:text-gold-700 transition-colors">
                    {cat.name}
                  </h3>
                  <span className="inline-block mt-1 text-xs text-neutral-500 group-hover:text-neutral-700">
                    {cat.propertyCount !== undefined ? `${cat.propertyCount} Properties Available` : 'Explore Listings'}
                  </span>
                </div>

                <div className="mt-4 pt-3 border-t border-neutral-100 w-full flex items-center justify-center space-x-1.5 text-xs font-semibold text-gold-600 group-hover:text-gold-700">
                  <span>View Listings</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

