import React, { useState } from 'react';
import { api } from '../services/api';
import { 
  MapPin, 
  Phone, 
  MessageCircle, 
  Send, 
  CheckCircle2, 
  Sparkles, 
  Clock, 
  Building 
} from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    propertyType: 'Independent House',
    budget: 'Under ₹ 50 Lakhs',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const propertyTypes = [
    'Independent House',
    'Plot',
    'Flat',
    'Apartment',
    'Shops',
    'Gated Community Villas',
    'Function Halls',
    'Agriculture Land',
    'Farm House',
    'Godown / Warehouse',
    'Offices',
    'Sharing Office',
    'PG Hostel',
    'PG Building',
    'Guest House'
  ];

  const budgets = [
    'Under ₹ 50 Lakhs',
    '₹ 50 Lakhs – ₹ 1 Crore',
    '₹ 1 Crore – ₹ 2 Crores',
    'Above ₹ 2 Crores'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await api.submitEnquiry({
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        propertyType: formData.propertyType,
        budget: formData.budget,
        message: formData.message,
        source: 'Contact Us Page'
      });
      setSubmitted(true);
    } catch (err) {
      setError(err.message || 'Failed to submit enquiry. Please call us directly.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#FAFAFA] min-h-screen py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-600 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Connect with Super Best Properties</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-black text-neutral-900 tracking-tight">
            Contact <span className="gold-gradient-text">Our Advisory Office</span>
          </h1>
          <p className="mt-3 text-sm sm:text-base text-neutral-600">
            Reach out for transparent, verified, and wealth-building property advisory across Hyderabad and Telangana.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Office Details, Click-to-Call, WhatsApp (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Main Office Card */}
            <div className="bg-neutral-950 text-white rounded-3xl p-6 sm:p-8 border border-gold-500/30 shadow-xl space-y-6">
              <div>
                <span className="text-gold-400 font-bold text-xs uppercase tracking-widest">
                  Head Office & Advisory Center
                </span>
                <h3 className="text-2xl font-serif font-bold text-white mt-1">
                  SUPER BEST PROPERTIES
                </h3>
                <p className="text-xs text-gray-400">
                  Real Estate Advisory & Property Solutions
                </p>
              </div>

              <div className="space-y-4 text-sm">
                
                {/* Address */}
                <div className="flex items-start space-x-3 text-gray-300">
                  <div className="w-9 h-9 rounded-xl bg-gold-500/15 flex items-center justify-center text-gold-400 shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-gold-400 uppercase">Office Address</span>
                    <p className="mt-0.5 font-medium leading-relaxed">
                      Vanasthalipuram Main Road,<br />
                      Hyderabad, Telangana – 500070.
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start space-x-3 text-gray-300">
                  <div className="w-9 h-9 rounded-xl bg-gold-500/15 flex items-center justify-center text-gold-400 shrink-0 mt-0.5">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-gold-400 uppercase">Contact Number</span>
                    <a
                      href="tel:7075539189"
                      className="mt-0.5 block font-bold text-lg text-white hover:text-gold-400 transition-colors"
                    >
                      +91 7075539189
                    </a>
                    <span className="text-xs text-gray-400">Click to call directly</span>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="flex items-start space-x-3 text-gray-300">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
                    <MessageCircle className="w-5 h-5 fill-current" />
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-emerald-400 uppercase">WhatsApp Instant Support</span>
                    <a
                      href="https://wa.me/917075539189?text=Hello%20Super%20Best%20Properties,%20I%20would%20like%20to%20enquire%20about%20properties."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-0.5 block font-semibold text-white hover:text-emerald-400 transition-colors"
                    >
                      +91 7075539189 (Chat Now)
                    </a>
                  </div>
                </div>

                {/* Working Hours */}
                <div className="flex items-start space-x-3 text-gray-300">
                  <div className="w-9 h-9 rounded-xl bg-gold-500/15 flex items-center justify-center text-gold-400 shrink-0 mt-0.5">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-gold-400 uppercase">Working Hours</span>
                    <p className="mt-0.5 text-xs text-gray-300">
                      Monday – Sunday: 9:00 AM – 8:00 PM<br />
                      Site Visits arranged 7 days a week.
                    </p>
                  </div>
                </div>

              </div>

              {/* Tagline Badge */}
              <div className="pt-2 border-t border-neutral-800 text-center">
                <span className="italic text-xs text-gold-400/90 font-serif">
                  “Building Opportunities. Creating Wealth.”
                </span>
              </div>
            </div>

            {/* Embedded Google Map */}
            <div className="bg-white rounded-3xl p-3 border border-neutral-200 shadow-sm overflow-hidden aspect-[16/10]">
              <iframe
                title="Super Best Properties Vanasthalipuram Map"
                src="https://maps.google.com/maps?q=Vanasthalipuram+Main+Road+Hyderabad+500070&t=&z=14&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full rounded-2xl border-0"
                loading="lazy"
                allowFullScreen
              ></iframe>
            </div>

          </div>

          {/* Right Column: Contact Enquiry Form (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-neutral-200/90 shadow-sm">
            
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <h3 className="text-2xl font-serif font-bold text-neutral-900">
                    Send an Enquiry
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-500 mt-1">
                    Fill in your details and our senior property specialist will get in touch with you shortly.
                  </p>
                </div>

                {error && (
                  <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium">
                    {error}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">
                      Full Name <span className="text-gold-600">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Kumar"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-neutral-50 border border-neutral-200 focus:border-gold-500 rounded-xl px-4 py-2.5 text-sm text-neutral-800 focus:outline-none"
                    />
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">
                      Phone Number <span className="text-gold-600">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 9848012345"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-neutral-50 border border-neutral-200 focus:border-gold-500 rounded-xl px-4 py-2.5 text-sm text-neutral-800 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="e.g. name@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-neutral-50 border border-neutral-200 focus:border-gold-500 rounded-xl px-4 py-2.5 text-sm text-neutral-800 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Interested Property Type */}
                  <div>
                    <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">
                      Interested Property Type
                    </label>
                    <select
                      value={formData.propertyType}
                      onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                      className="w-full bg-neutral-50 border border-neutral-200 focus:border-gold-500 rounded-xl px-3 py-2.5 text-xs sm:text-sm font-medium text-neutral-800 focus:outline-none cursor-pointer"
                    >
                      {propertyTypes.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>

                  {/* Budget */}
                  <div>
                    <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">
                      Estimated Budget
                    </label>
                    <select
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full bg-neutral-50 border border-neutral-200 focus:border-gold-500 rounded-xl px-3 py-2.5 text-xs sm:text-sm font-medium text-neutral-800 focus:outline-none cursor-pointer"
                    >
                      {budgets.map((b) => (
                        <option key={b} value={b}>{b}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">
                    Message / Preferred Locations
                  </label>
                  <textarea
                    rows="4"
                    placeholder="Tell us what you are looking for (preferred locality, possession timeline, site visit preference)..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-neutral-50 border border-neutral-200 focus:border-gold-500 rounded-xl px-4 py-2.5 text-sm text-neutral-800 focus:outline-none"
                  ></textarea>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 px-6 rounded-xl gold-gradient-btn text-black font-extrabold text-sm sm:text-base tracking-wide shadow-lg hover:shadow-xl transition-all flex items-center justify-center space-x-2"
                >
                  <Send className="w-4 h-4 text-black" />
                  <span>{loading ? 'Submitting Enquiry...' : 'Submit Property Enquiry'}</span>
                </button>
              </form>
            ) : (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-neutral-900">
                  Thank You, {formData.name}!
                </h3>
                <p className="text-sm text-neutral-600 max-w-md mx-auto">
                  Your enquiry has been successfully registered in our database. Our senior advisory team will call you at <strong className="text-neutral-900">{formData.phone}</strong>.
                </p>
                <div className="pt-4 flex justify-center gap-3">
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: '',
                        phone: '',
                        email: '',
                        propertyType: 'Independent House',
                        budget: 'Under ₹ 50 Lakhs',
                        message: ''
                      });
                    }}
                    className="px-6 py-2.5 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-semibold"
                  >
                    Send Another Enquiry
                  </button>
                  <a
                    href="https://wa.me/917075539189?text=Hello%20Super%20Best%20Properties,%20I%20have%20submitted%20an%20enquiry%20on%20your%20website."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center space-x-1.5"
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                    <span>Chat on WhatsApp</span>
                  </a>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}
