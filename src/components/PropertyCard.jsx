import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Bed, Maximize2, Heart, ArrowRight, MessageCircle } from 'lucide-react';
import EnquiryModal from './EnquiryModal';

export default function PropertyCard({ property }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [enquiryOpen, setEnquiryOpen] = useState(false);

  useEffect(() => {
    try {
      const favs = JSON.parse(localStorage.getItem('sbp_favorites') || '[]');
      setIsFavorite(favs.includes(property.id));
    } catch {
      setIsFavorite(false);
    }
  }, [property.id]);

  const toggleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const favs = JSON.parse(localStorage.getItem('sbp_favorites') || '[]');
      let updated;
      if (favs.includes(property.id)) {
        updated = favs.filter(id => id !== property.id);
        setIsFavorite(false);
      } else {
        updated = [...favs, property.id];
        setIsFavorite(true);
      }
      localStorage.setItem('sbp_favorites', JSON.stringify(updated));
    } catch (err) {
      console.error(err);
    }
  };

  const rawImg = Array.isArray(property.images) && property.images.length > 0
    ? property.images[0]
    : (typeof property.images === 'string' && property.images.trim()
        ? property.images.trim()
        : (property.image || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1000&q=80'));

  const imageSrc = rawImg;

  const isSold = property.status && property.status.toLowerCase() === 'sold';

  return (
    <>
      <div className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl border border-neutral-200/90 hover:border-gold-500/60 transition-all duration-300 flex flex-col h-full transform hover:-translate-y-1.5 animate-fade-in">
        
        {/* Image Container */}
        <div className="relative aspect-[16/10] overflow-hidden bg-neutral-900">
          <img
            src={imageSrc}
            alt={property.title}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            loading="lazy"
          />

          {/* Price Badge */}
          <div className="absolute top-3 left-3 z-10">
            <span className="inline-flex items-center px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-gold-400 via-gold-500 to-gold-600 text-black font-extrabold text-xs sm:text-sm tracking-wide shadow-lg shadow-black/30">
              {property.price}
            </span>
          </div>

          {/* Sold Overlay */}
          {isSold && (
            <div className="absolute inset-0 bg-black/65 backdrop-blur-[2px] flex items-center justify-center z-10">
              <span className="px-4 py-1.5 bg-red-600 text-white font-bold text-xs sm:text-sm uppercase tracking-wider rounded-lg shadow-lg">
                SOLD OUT
              </span>
            </div>
          )}

          {/* Favorite Wishlist Button */}
          <button
            onClick={toggleFavorite}
            className={`absolute top-3 right-3 z-20 w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md transition-all shadow-md ${
              isFavorite
                ? 'bg-red-500 text-white shadow-red-500/40'
                : 'bg-black/40 hover:bg-black/70 text-white border border-white/40'
            }`}
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
          </button>

          {/* Category Tag */}
          <div className="absolute bottom-3 left-3 z-10">
            <span className="text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-md bg-black/75 backdrop-blur-sm text-gold-400 border border-gold-500/30">
              {property.categoryName || 'Property'}
            </span>
          </div>
        </div>

        {/* Card Details */}
        <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
          <div>
            {/* Title */}
            <Link to={`/properties/${property.slug || property.id}`}>
              <h3 className="text-base sm:text-lg font-bold text-neutral-900 line-clamp-1 group-hover:text-gold-600 transition-colors">
                {property.title}
              </h3>
            </Link>

            {/* Location */}
            <div className="flex items-center space-x-1.5 text-neutral-600 text-xs sm:text-sm mt-1">
              <MapPin className="w-4 h-4 text-gold-500 shrink-0" />
              <span className="truncate">{property.location}</span>
            </div>

            {/* BHK & Square Feet info line */}
            <div className="flex items-center space-x-3 text-xs sm:text-sm text-neutral-600 mt-2.5 pt-2.5 border-t border-neutral-100 font-medium">
              {property.bedrooms && property.bedrooms !== '-' && (
                <div className="flex items-center space-x-1">
                  <Bed className="w-4 h-4 text-gold-600" />
                  <span>{property.bedrooms}</span>
                </div>
              )}
              {property.bedrooms && property.bedrooms !== '-' && property.area && (
                <span className="text-neutral-300">|</span>
              )}
              {property.area && (
                <div className="flex items-center space-x-1">
                  <Maximize2 className="w-3.5 h-3.5 text-gold-600" />
                  <span>{property.area}</span>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons: View Details & Quick Enquiry Popup */}
          <div className="pt-2 flex items-center space-x-2">
            <Link
              to={`/properties/${property.slug || property.id}`}
              className="flex-1 flex items-center justify-center space-x-2 py-2.5 px-3 rounded-xl gold-gradient-btn text-black font-extrabold text-xs tracking-wide group-hover:shadow-lg transition-all"
            >
              <span>View Details</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </Link>

            <button
              onClick={() => setEnquiryOpen(true)}
              className="p-2.5 rounded-xl bg-neutral-100 hover:bg-emerald-50 text-neutral-700 hover:text-emerald-600 border border-neutral-200 hover:border-emerald-300 transition-colors"
              title="Quick Enquiry"
            >
              <MessageCircle className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>

      {/* Quick Enquiry Popup */}
      <EnquiryModal
        isOpen={enquiryOpen}
        onClose={() => setEnquiryOpen(false)}
        property={property}
      />
    </>
  );
}
