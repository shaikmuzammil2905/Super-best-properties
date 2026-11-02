import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import PropertyCard from '../components/PropertyCard';
import EnquiryModal from '../components/EnquiryModal';
import { api } from '../services/api';
import { 
  MapPin, 
  Bed, 
  Bath, 
  Maximize2, 
  CheckCircle2, 
  Phone, 
  MessageCircle, 
  Share2, 
  Heart, 
  Calendar, 
  ShieldCheck, 
  ChevronRight, 
  ArrowLeft,
  Sparkles,
  Compass,
  Building
} from 'lucide-react';

export default function PropertyDetailsPage() {
  const { slug } = useParams();
  const [property, setProperty] = useState(null);
  const [similarProperties, setSimilarProperties] = useState([]);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function fetchProperty() {
      setLoading(true);
      try {
        const data = await api.getProperty(slug);
        setProperty(data.property);
        setSimilarProperties(data.similar || []);
        setActiveImageIndex(0);

        // Check favorite state
        const favs = JSON.parse(localStorage.getItem('sbp_favorites') || '[]');
        setIsFavorite(favs.includes(data.property.id));
      } catch (err) {
        console.error('Error fetching property details:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchProperty();
    window.scrollTo(0, 0);
  }, [slug]);

  const toggleFavorite = () => {
    if (!property) return;
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

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: property?.title,
        text: `Check out ${property?.title} for ${property?.price} on Super Best Properties!`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] py-20 flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="w-12 h-12 border-4 border-gold-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-sm font-semibold text-neutral-600">Loading property details...</p>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] py-20 text-center px-4">
        <h2 className="text-2xl font-bold text-neutral-800">Property Not Found</h2>
        <p className="text-neutral-600 mt-2">The property you are looking for is no longer available or was moved.</p>
        <Link to="/properties" className="inline-block mt-4 px-6 py-2.5 rounded-full gold-gradient-btn text-black font-bold text-xs">
          Browse All Properties
        </Link>
      </div>
    );
  }

  const images = property.images && property.images.length > 0
    ? property.images
    : ['https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80'];

  const whatsappMessage = encodeURIComponent(
    `Hello Super Best Properties!\n` +
    `I am interested in:\n` +
    `*Property:* ${property.title}\n` +
    `*Price:* ${property.price}\n` +
    `*Location:* ${property.location}\n` +
    `*Link:* ${window.location.href}\n\n` +
    `Please share more details and arrange a site inspection.`
  );

  return (
    <div className="bg-[#FAFAFA] min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <div className="flex items-center space-x-2 text-xs sm:text-sm text-neutral-500 mb-6 flex-wrap">
          <Link to="/" className="hover:text-gold-600 transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link to="/properties" className="hover:text-gold-600 transition-colors">Properties</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link to={`/properties/${property.categorySlug}`} className="hover:text-gold-600 transition-colors">
            {property.categoryName}
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-neutral-900 font-semibold truncate max-w-xs">{property.title}</span>
        </div>

        {/* Title, Location & Action Buttons */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
          <div className="space-y-1">
            <div className="flex items-center space-x-3">
              <span className="px-3 py-1 rounded-full bg-gold-500/15 border border-gold-500/40 text-gold-700 text-xs font-bold uppercase tracking-wider">
                {property.categoryName}
              </span>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                property.status === 'Available' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
              }`}>
                {property.status}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif font-black text-neutral-900">
              {property.title}
            </h1>
            <div className="flex items-center space-x-2 text-neutral-600 text-sm">
              <MapPin className="w-4 h-4 text-gold-600 shrink-0" />
              <span>{property.location}</span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="text-right">
              <span className="block text-xs uppercase font-bold text-neutral-400">Guaranteed Price</span>
              <span className="text-3xl sm:text-4xl font-extrabold text-neutral-950 font-serif">
                {property.price}
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={toggleFavorite}
                className={`p-3 rounded-2xl border transition-all ${
                  isFavorite ? 'bg-red-500 text-white border-red-500' : 'bg-white hover:bg-neutral-100 text-neutral-700 border-neutral-300'
                }`}
                title="Add to Wishlist"
              >
                <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
              </button>

              <button
                onClick={handleShare}
                className="p-3 rounded-2xl bg-white hover:bg-neutral-100 text-neutral-700 border border-neutral-300 transition-all relative"
                title="Share property"
              >
                <Share2 className="w-5 h-5" />
                {copied && (
                  <span className="absolute -top-8 right-0 bg-black text-white text-[10px] font-bold px-2 py-1 rounded shadow">
                    Link Copied!
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Gallery & Quick Inquiry Sidebar Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          
          {/* Left Column: Image Gallery (8 cols) */}
          <div className="lg:col-span-8 space-y-4">
            
            {/* Main Featured Image */}
            <div className="relative aspect-[16/10] sm:aspect-[16/9] rounded-3xl overflow-hidden bg-neutral-900 shadow-xl border border-neutral-200">
              <img
                src={images[activeImageIndex]}
                alt={`${property.title} view ${activeImageIndex + 1}`}
                className="w-full h-full object-cover transition-all duration-500"
              />
              <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-md px-3.5 py-1.5 rounded-full text-gold-400 text-xs font-semibold border border-gold-500/30">
                Photo {activeImageIndex + 1} of {images.length}
              </div>
            </div>

            {/* Thumbnail Row */}
            {images.length > 1 && (
              <div className="flex items-center space-x-3 overflow-x-auto pb-2">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-24 h-16 sm:w-28 sm:h-20 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                      activeImageIndex === idx ? 'border-gold-500 shadow-md scale-105' : 'border-neutral-300 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Specifications Cards Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-white p-6 rounded-3xl border border-neutral-200/90 shadow-sm mt-6">
              {property.bedrooms && (
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-gold-500/15 flex items-center justify-center text-gold-600">
                    <Bed className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-[11px] text-neutral-400 font-semibold uppercase">Bedrooms</span>
                    <span className="font-bold text-sm sm:text-base text-neutral-900">{property.bedrooms}</span>
                  </div>
                </div>
              )}

              {property.bathrooms && (
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-gold-500/15 flex items-center justify-center text-gold-600">
                    <Bath className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-[11px] text-neutral-400 font-semibold uppercase">Bathrooms</span>
                    <span className="font-bold text-sm sm:text-base text-neutral-900">{property.bathrooms}</span>
                  </div>
                </div>
              )}

              {property.area && (
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-gold-500/15 flex items-center justify-center text-gold-600">
                    <Maximize2 className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-[11px] text-neutral-400 font-semibold uppercase">Super Area</span>
                    <span className="font-bold text-sm sm:text-base text-neutral-900">{property.area}</span>
                  </div>
                </div>
              )}

              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-gold-500/15 flex items-center justify-center text-gold-600">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-[11px] text-neutral-400 font-semibold uppercase">Approvals</span>
                  <span className="font-bold text-sm sm:text-base text-neutral-900">HMDA / DTCP</span>
                </div>
              </div>
            </div>

            {/* Description Section */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-neutral-200/90 shadow-sm space-y-4">
              <h3 className="text-xl font-bold text-neutral-900 font-serif">Property Description</h3>
              <p className="text-neutral-700 text-sm sm:text-base leading-relaxed whitespace-pre-line">
                {property.description}
              </p>
            </div>

            {/* Amenities Section */}
            {property.amenities && property.amenities.length > 0 && (
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-neutral-200/90 shadow-sm space-y-4">
                <h3 className="text-xl font-bold text-neutral-900 font-serif">Key Amenities & Features</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {property.amenities.map((amenity, idx) => (
                    <div key={idx} className="flex items-center space-x-2.5 p-3 rounded-xl bg-neutral-50 border border-neutral-200 text-sm font-medium text-neutral-800">
                      <CheckCircle2 className="w-4 h-4 text-gold-600 shrink-0" />
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Google Maps / Location Section */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-neutral-200/90 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-neutral-900 font-serif">Location & Connectivity</h3>
                <span className="text-xs font-semibold text-neutral-500 flex items-center space-x-1">
                  <MapPin className="w-3.5 h-3.5 text-gold-600" />
                  <span>{property.location}</span>
                </span>
              </div>
              
              <div className="relative rounded-2xl overflow-hidden aspect-[16/7] border border-neutral-200 bg-neutral-100">
                <iframe
                  title="Property Location Map"
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(property.location + ', Hyderabad')}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
                  className="w-full h-full border-0"
                  loading="lazy"
                  allowFullScreen
                ></iframe>
              </div>
            </div>

          </div>

          {/* Right Column: Advisory & Inquiry Box (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Consultation Card */}
            <div className="bg-neutral-950 border-2 border-gold-500/40 rounded-3xl p-6 sm:p-8 text-white shadow-2xl space-y-5 sticky top-28">
              <div className="border-b border-neutral-800 pb-4">
                <span className="text-gold-400 font-semibold text-xs uppercase tracking-widest">
                  Verified by Super Best Properties
                </span>
                <h4 className="text-xl font-serif font-bold text-white mt-1">
                  Ready to Inspect This Property?
                </h4>
                <p className="text-xs text-gray-400 mt-1">
                  Connect with our senior property advisors for instant floor plans, price breakdowns, and site visit scheduling.
                </p>
              </div>

              {/* Direct WhatsApp CTA Button */}
              <a
                href={`https://wa.me/917075539189?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-500 hover:brightness-110 text-white font-bold text-sm tracking-wide shadow-lg shadow-green-950/40 flex items-center justify-center space-x-2 transition-all"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                <span>Enquire on WhatsApp</span>
              </a>

              {/* Request Site Visit Button */}
              <button
                onClick={() => setEnquiryOpen(true)}
                className="w-full py-3.5 px-4 rounded-xl gold-gradient-btn text-black font-extrabold text-sm tracking-wide shadow-lg hover:shadow-gold-500/30 transition-all"
              >
                Book a Free Site Visit
              </button>

              {/* Direct Call Button */}
              <a
                href="tel:7075539189"
                className="w-full py-3 px-4 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-gold-500/40 text-gold-400 font-semibold text-xs sm:text-sm flex items-center justify-center space-x-2 transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>Direct Call: +91 7075539189</span>
              </a>

              {/* Assurance Features */}
              <div className="pt-4 border-t border-neutral-800 space-y-2.5 text-xs text-gray-300">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0" />
                  <span>Free pick & drop for site inspections</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0" />
                  <span>Zero brokerage fee on direct developer deals</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0" />
                  <span>Assistance with SBI, HDFC & ICICI bank loans</span>
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* Similar Properties Section */}
        {similarProperties.length > 0 && (
          <div className="mt-16 pt-12 border-t border-neutral-200">
            <div className="text-center mb-8">
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-neutral-900">
                Similar Properties <span className="gold-gradient-text">You May Like</span>
              </h3>
              <p className="text-xs sm:text-sm text-neutral-500 mt-1">Handpicked matching options in similar localities</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {similarProperties.map((p) => (
                <PropertyCard key={p.id} property={p} />
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Enquiry Modal */}
      <EnquiryModal
        isOpen={enquiryOpen}
        onClose={() => setEnquiryOpen(false)}
        property={property}
      />

    </div>
  );
}

