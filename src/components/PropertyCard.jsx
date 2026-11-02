import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Bed, Maximize2, Heart, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function PropertyCard({ property }) {
  const [isFavorite, setIsFavorite] = useState(false);

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

  const imageSrc = (property.images && property.images.length > 0)
    ? property.images[0]
    : 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1000&q=80';

  const isSold = property.status && property.status.toLowerCase() === 'sold';

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl border border-neutral-200/80 hover:border-gold-500/40 transition-all duration-300 flex flex-col h-full transform hover:-translate-y-1">
      
      {/* Image Container */}
      <div className="relative aspect-[16/10] overflow-hidden bg-neutral-100">
        <img
          src={imageSrc}
          alt={property.title}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />

        {/* Price Badge (Gold badge matching reference image) */}
        <div className="absolute top-3 left-3 z-10">
          <span className="inline-flex items-center px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-gold-400 via-gold-500 to-gold-600 text-black font-extrabold text-xs sm:text-sm tracking-wide shadow-lg shadow-black/20">
            {property.price}
          </span>
        </div>

        {/* Status / Sold overlay if sold */}
        {isSold && (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] flex items-center justify-center z-10">
            <span className="px-4 py-1.5 bg-red-600 text-white font-bold text-sm uppercase tracking-wider rounded-lg shadow-lg">
              SOLD OUT
            </span>
          </div>
        )}

        {/* Favorite Icon */}
        <button
          onClick={toggleFavorite}
          className={`absolute top-3 right-3 z-20 w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md transition-all shadow-md ${
            isFavorite
              ? 'bg-red-500 text-white shadow-red-500/30'
              : 'bg-black/35 hover:bg-black/60 text-white border border-white/30'
          }`}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
        </button>

        {/* Category tag */}
        <div className="absolute bottom-3 left-3 z-10">
          <span className="text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-sm text-gold-400 border border-gold-500/30">
            {property.categoryName || 'Property'}
          </span>
        </div>
      </div>

      {/* Card Details */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Title */}
          <Link to={`/properties/${property.slug || property.id}`}>
            <h3 className="text-base sm:text-lg font-bold text-neutral-900 line-clamp-1 group-hover:text-gold-600 transition-colors">
              {property.title}
            </h3>
          </Link>

          {/* Location */}
          <div className="flex items-center space-x-1.5 text-neutral-600 text-xs sm:text-sm mt-1.5">
            <MapPin className="w-4 h-4 text-gold-500 shrink-0" />
            <span className="truncate">{property.location}</span>
          </div>

          {/* BHK & Square Feet info line */}
          <div className="flex items-center space-x-3 text-xs sm:text-sm text-neutral-600 mt-3 pt-3 border-t border-neutral-100 font-medium">
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

        {/* View Details Button */}
        <div className="mt-4 pt-2">
          <Link
            to={`/properties/${property.slug || property.id}`}
            className="w-full flex items-center justify-center space-x-2 py-2.5 px-4 rounded-xl gold-gradient-btn text-black font-bold text-xs sm:text-sm tracking-wide group-hover:shadow-lg transition-all"
          >
            <span>View Details</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

      </div>

    </div>
  );
}
