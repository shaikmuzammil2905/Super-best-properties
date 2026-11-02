import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import PropertyCard from '../components/PropertyCard';
import EnquiryModal from '../components/EnquiryModal';
import { getCategoryIcon } from '../utils/categoryIcons';
import { api } from '../services/api';
import { initialCategories } from '../data/mockData';
import { 
  Building, 
  MapPin, 
  MessageCircle, 
  Phone, 
  Sparkles, 
  CheckCircle2, 
  ShieldCheck,
  ChevronRight,
  Filter
} from 'lucide-react';

export default function CategoryListingPage({ categorySlugOverride }) {
  const { slug } = useParams();
  const rawSlug = categorySlugOverride || slug || 'plots';
  const categorySlug = rawSlug.toLowerCase();

  const [category, setCategory] = useState(null);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [locationFilter, setLocationFilter] = useState('all');

  useEffect(() => {
    async function loadCategoryData() {
      setLoading(true);
      try {
        const data = await api.getCategory(categorySlug);
        if (data && data.category) {
          setCategory(data.category);
          setProperties(data.properties || []);
        } else {
          // Fallback to match from initialCategories
          const matched = initialCategories.find(c => 
            c.slug === categorySlug || 
            c.slug.replace(/s$/, '') === categorySlug.replace(/s$/, '')
          ) || initialCategories[0];
          setCategory(matched);
          const allProps = await api.getProperties({ type: matched.slug });
          setProperties(allProps);
        }
      } catch (err) {
        console.error('Failed to load category:', err);
        const matched = initialCategories.find(c => 
          c.slug === categorySlug || 
          c.slug.replace(/s$/, '') === categorySlug.replace(/s$/, '')
        ) || initialCategories[0];
        setCategory(matched);
      } finally {
        setLoading(false);
      }
    }
    loadCategoryData();
  }, [categorySlug]);

  const filteredProperties = locationFilter === 'all'
    ? properties
    : properties.filter(p => p.location.toLowerCase().includes(locationFilter.toLowerCase()));

  // Fallback safe category object
  const currentCategory = category || {
    name: categorySlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
    slug: categorySlug,
    description: 'Verified real estate opportunities with DTCP and HMDA approvals across Hyderabad and Telangana.'
  };

  return (
    <div className="bg-[#FAFAFA] min-h-screen pb-20">
      
      {/* Category Hero Banner */}
      <div className="bg-gradient-to-r from-neutral-950 via-neutral-900 to-black text-white py-12 sm:py-16 border-b border-gold-500/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Breadcrumb */}
          <div className="flex items-center space-x-2 text-xs text-gold-400 mb-4">
            <Link to="/" className="hover:underline">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-neutral-500" />
            <Link to="/categories" className="hover:underline">Categories</Link>
            <ChevronRight className="w-3.5 h-3.5 text-neutral-500" />
            <span className="text-gray-300 font-semibold">{currentCategory.name}</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="max-w-2xl space-y-3">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-gold-500/15 border border-gold-500/40 text-gold-400 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Verified Property Category</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-black text-white">
                {currentCategory.name} <span className="gold-gradient-text">in Hyderabad</span>
              </h1>
              <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                {currentCategory.description}
              </p>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap sm:flex-col gap-3 shrink-0">
              <button
                onClick={() => setEnquiryOpen(true)}
                className="px-6 py-3 rounded-full gold-gradient-btn text-black font-extrabold text-xs sm:text-sm tracking-wide shadow-lg hover:shadow-gold-500/30 transition-all"
              >
                Request Site Visit
              </button>
              <a
                href={`https://wa.me/917075539189?text=${encodeURIComponent(`Hello Super Best Properties, I am interested in exploring ${currentCategory.name} options in Hyderabad.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs sm:text-sm flex items-center justify-center space-x-2 transition-colors shadow-md"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>WhatsApp Enquiry</span>
              </a>
            </div>
          </div>

        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        
        {/* Category Features / Value Promise Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-white p-5 rounded-2xl border border-neutral-200/90 shadow-sm mb-10 text-xs sm:text-sm">
          <div className="flex items-center space-x-2.5 text-neutral-700 font-medium">
            <CheckCircle2 className="w-5 h-5 text-gold-600 shrink-0" />
            <span>100% Legal Title Verified</span>
          </div>
          <div className="flex items-center space-x-2.5 text-neutral-700 font-medium">
            <ShieldCheck className="w-5 h-5 text-gold-600 shrink-0" />
            <span>Bank Loan Assistance</span>
          </div>
          <div className="flex items-center space-x-2.5 text-neutral-700 font-medium">
            <Building className="w-5 h-5 text-gold-600 shrink-0" />
            <span>Immediate Registration</span>
          </div>
          <div className="flex items-center space-x-2.5 text-neutral-700 font-medium">
            <MapPin className="w-5 h-5 text-gold-600 shrink-0" />
            <span>Prime Growth Locations</span>
          </div>
        </div>

        {/* Location Filter & Count Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-neutral-900">
              Available {currentCategory.name} Listings ({filteredProperties.length})
            </h2>
            <p className="text-xs text-neutral-500">Updated daily with verified property pricing & clear link documents</p>
          </div>

          <div className="flex items-center space-x-3">
            <span className="text-xs font-semibold text-neutral-500">Filter Location:</span>
            <select
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="bg-white border border-neutral-300 rounded-xl px-3 py-1.5 text-xs font-semibold text-neutral-800 focus:outline-none focus:border-gold-500"
            >
              <option value="all">All Locations</option>
              <option value="Vanasthalipuram">Vanasthalipuram</option>
              <option value="Tellapur">Tellapur</option>
              <option value="Shamshabad">Shamshabad</option>
              <option value="Gachibowli">Gachibowli</option>
              <option value="Madhapur">Madhapur</option>
              <option value="Kompally">Kompally</option>
            </select>
          </div>
        </div>

        {/* Properties Grid - Guaranteed to show properties with photos & details! */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProperties.map((prop) => (
            <PropertyCard key={prop.id} property={prop} />
          ))}
        </div>

      </div>

      {/* Enquiry Modal */}
      <EnquiryModal
        isOpen={enquiryOpen}
        onClose={() => setEnquiryOpen(false)}
        property={{ title: `${currentCategory.name} in Hyderabad`, location: 'Hyderabad, Telangana', price: 'Best Market Rates', categoryName: currentCategory.name }}
      />

    </div>
  );
}
