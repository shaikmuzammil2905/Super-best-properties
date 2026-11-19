import React, { useState } from 'react';
import { api } from '../services/api';
import { 
  MapPin, 
  Phone, 
  Mail, 
  MessageCircle, 
  Send, 
  CheckCircle2, 
  Sparkles, 
  Clock, 
  Building, 
  Handshake, 
  Users, 
  Briefcase, 
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  Award
} from 'lucide-react';

export default function ContactPage() {
  const [activeTab, setActiveTab] = useState('buyer'); // 'buyer' | 'associate'

  // Property Buyer Enquiry State
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

  // Associate / Partner Application State
  const [associateData, setAssociateData] = useState({
    name: '',
    phone: '',
    email: '',
    currentLocation: '',
    profession: 'Real Estate Agent / Consultant',
    experience: '1 – 3 Years',
    message: ''
  });
  const [associateLoading, setAssociateLoading] = useState(false);
  const [associateSubmitted, setAssociateSubmitted] = useState(false);
  const [associateError, setAssociateError] = useState('');

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

  const professions = [
    'Real Estate Agent / Consultant',
    'Independent Property Broker',
    'Financial Advisor / Chartered Accountant',
    'IT / Corporate Working Professional',
    'Freelancer / Entrepreneur',
    'Builder / Land Developer Partner',
    'NRI Networker / Overseas Facilitator',
    'Individual Investor'
  ];

  const experienceLevels = [
    'Beginner / Starting Fresh',
    '1 – 3 Years',
    '3 – 5 Years',
    '5+ Years (Experienced Associate)'
  ];

  // Submit Buyer Enquiry
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
        source: 'Contact Page - Property Enquiry'
      });
      setSubmitted(true);
    } catch (err) {
      setError(err.message || 'Failed to submit enquiry. Please call us directly.');
    } finally {
      setLoading(false);
    }
  };

  // Submit Associate Application
  const handleAssociateSubmit = async (e) => {
    e.preventDefault();
    setAssociateLoading(true);
    setAssociateError('');
    try {
      await api.submitEnquiry({
        name: associateData.name,
        phone: associateData.phone,
        email: associateData.email,
        propertyType: 'Associate / Channel Partner Application',
        budget: `Location: ${associateData.currentLocation || 'Not specified'} | Exp: ${associateData.experience}`,
        message: `Profession: ${associateData.profession}. Notes: ${associateData.message || 'Interested in becoming an active channel partner/associate.'}`,
        source: 'How to Become an Associate Form'
      });
      setAssociateSubmitted(true);
    } catch (err) {
      setAssociateError(err.message || 'Failed to submit associate application. Please call us directly.');
    } finally {
      setAssociateLoading(false);
    }
  };

  return (
    <div className="bg-[#FAFAFA] min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-600 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Connect with Super Best Properties</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-black text-neutral-900 tracking-tight">
            Contact <span className="gold-gradient-text">Our Advisory Office</span>
          </h1>
          <p className="mt-3 text-sm sm:text-base text-neutral-600 leading-relaxed">
            Reach out for transparent property investments, or partner with us as an authorized associate to grow together in Hyderabad and Telangana.
          </p>
        </div>

        {/* Two-Column Grid: Left Office Info (5 cols), Right Forms (7 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Office Details & Google Map (5 cols) */}
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
                    <p className="mt-0.5 font-medium leading-relaxed text-xs sm:text-sm">
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
                      className="mt-0.5 block font-bold text-base sm:text-lg text-white hover:text-gold-400 transition-colors"
                    >
                      +91 7075539189
                    </a>
                    <span className="text-[11px] text-gray-400">Click to call directly</span>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="flex items-start space-x-3 text-gray-300">
                  <div className="w-9 h-9 rounded-xl bg-[#25D366]/20 flex items-center justify-center text-[#25D366] shrink-0 mt-0.5">
                    <MessageCircle className="w-5 h-5 fill-current" />
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-[#25D366] uppercase">WhatsApp Instant Advisory</span>
                    <a
                      href="https://wa.me/917075539189?text=Hello%20Super%20Best%20Properties,%20I%20would%20like%20to%20connect%20with%20your%20advisory%20office."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-0.5 block font-semibold text-xs sm:text-sm text-white hover:text-[#25D366] transition-colors"
                    >
                      +91 7075539189 (Chat Now)
                    </a>
                  </div>
                </div>

                {/* Official Email - Matching Image copy 53 */}
                <div className="flex items-start space-x-3 text-gray-300">
                  <div className="w-9 h-9 rounded-xl bg-gold-500/15 flex items-center justify-center text-gold-400 shrink-0 mt-0.5">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-gold-400 uppercase">Official Email</span>
                    <a
                      href="mailto:info.superbestproperties@gmail.com"
                      className="mt-0.5 block font-semibold text-xs sm:text-sm text-white hover:text-gold-400 transition-colors break-all"
                    >
                      info.superbestproperties@gmail.com
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
                      Site visits arranged 7 days a week.
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

          {/* Right Column: Interactive Dual-Form Hub (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-neutral-200/90 shadow-sm">
            
            {/* Interactive Tab Switcher */}
            <div className="flex items-center p-1.5 bg-neutral-100 rounded-2xl mb-6">
              <button
                type="button"
                onClick={() => setActiveTab('buyer')}
                className={`flex-1 py-2.5 px-3 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center space-x-2 ${
                  activeTab === 'buyer'
                    ? 'bg-neutral-900 text-gold-400 shadow-md'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                <Building className="w-4 h-4" />
                <span>Property Enquiry</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('associate')}
                className={`flex-1 py-2.5 px-3 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center space-x-2 ${
                  activeTab === 'associate'
                    ? 'bg-neutral-900 text-gold-400 shadow-md'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                <Handshake className="w-4 h-4" />
                <span>Join as Associate</span>
              </button>
            </div>

            {/* TAB 1: PROPERTY BUYER ENQUIRY */}
            {activeTab === 'buyer' && (
              <div>
                {!submitted ? (
                  <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5 animate-fade-in">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-serif font-bold text-neutral-900">
                        Submit Property Enquiry
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
                        rows="3"
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
                  <div className="text-center py-10 space-y-4 animate-fade-in">
                    <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 mx-auto">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <h3 className="text-2xl font-serif font-bold text-neutral-900">
                      Thank You, {formData.name}!
                    </h3>
                    <p className="text-sm text-neutral-600 max-w-md mx-auto leading-relaxed">
                      Your enquiry has been successfully registered. Our advisory team will call you back at <strong className="text-neutral-900">{formData.phone}</strong>.
                    </p>
                    <div className="pt-3 flex flex-wrap justify-center gap-3">
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
                        Submit Another Enquiry
                      </button>
                      <a
                        href={`https://wa.me/917075539189?text=${encodeURIComponent(`Hello Super Best Properties, I just submitted an enquiry for ${formData.propertyType} (${formData.budget}). My name is ${formData.name}.`)}`}
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
            )}

            {/* TAB 2: BECOME AN ASSOCIATE / PARTNER APPLICATION (Matching Image copy 54) */}
            {activeTab === 'associate' && (
              <div>
                {!associateSubmitted ? (
                  <form onSubmit={handleAssociateSubmit} className="space-y-4 sm:space-y-5 animate-fade-in">
                    <div>
                      <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-gold-500/10 text-gold-700 border border-gold-300 text-[11px] font-bold uppercase tracking-wider mb-2">
                        <Handshake className="w-3.5 h-3.5" />
                        <span>Channel Partner Network</span>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-serif font-bold text-neutral-900">
                        Join Us as an Associate
                      </h3>
                      <p className="text-xs sm:text-sm text-neutral-500 mt-1">
                        Partner with Super Best Properties to market 100% verified HMDA & DTCP projects with high revenue share and timely payouts. Fill below to get a callback.
                      </p>
                    </div>

                    {associateError && (
                      <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium">
                        {associateError}
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Name */}
                      <div>
                        <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">
                          Your Full Name <span className="text-gold-600">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. D. Suresh / S. Rao"
                          value={associateData.name}
                          onChange={(e) => setAssociateData({ ...associateData, name: e.target.value })}
                          className="w-full bg-neutral-50 border border-neutral-200 focus:border-gold-500 rounded-xl px-4 py-2.5 text-sm text-neutral-800 focus:outline-none"
                        />
                      </div>

                      {/* Mobile */}
                      <div>
                        <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">
                          Mobile Number <span className="text-gold-600">*</span>
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="e.g. 9848012345"
                          value={associateData.phone}
                          onChange={(e) => setAssociateData({ ...associateData, phone: e.target.value })}
                          className="w-full bg-neutral-50 border border-neutral-200 focus:border-gold-500 rounded-xl px-4 py-2.5 text-sm text-neutral-800 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Current Location */}
                      <div>
                        <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">
                          Your Current Location <span className="text-gold-600">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Hyderabad, LB Nagar, Vijayawada, USA"
                          value={associateData.currentLocation}
                          onChange={(e) => setAssociateData({ ...associateData, currentLocation: e.target.value })}
                          className="w-full bg-neutral-50 border border-neutral-200 focus:border-gold-500 rounded-xl px-4 py-2.5 text-sm text-neutral-800 focus:outline-none"
                        />
                      </div>

                      {/* Email */}
                      <div>
                        <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">
                          Email Address
                        </label>
                        <input
                          type="email"
                          placeholder="e.g. associate@example.com"
                          value={associateData.email}
                          onChange={(e) => setAssociateData({ ...associateData, email: e.target.value })}
                          className="w-full bg-neutral-50 border border-neutral-200 focus:border-gold-500 rounded-xl px-4 py-2.5 text-sm text-neutral-800 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Current Profession */}
                      <div>
                        <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">
                          Current Profession
                        </label>
                        <select
                          value={associateData.profession}
                          onChange={(e) => setAssociateData({ ...associateData, profession: e.target.value })}
                          className="w-full bg-neutral-50 border border-neutral-200 focus:border-gold-500 rounded-xl px-3 py-2.5 text-xs sm:text-sm font-medium text-neutral-800 focus:outline-none cursor-pointer"
                        >
                          {professions.map((p) => (
                            <option key={p} value={p}>{p}</option>
                          ))}
                        </select>
                      </div>

                      {/* Real Estate Experience */}
                      <div>
                        <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">
                          Real Estate Experience
                        </label>
                        <select
                          value={associateData.experience}
                          onChange={(e) => setAssociateData({ ...associateData, experience: e.target.value })}
                          className="w-full bg-neutral-50 border border-neutral-200 focus:border-gold-500 rounded-xl px-3 py-2.5 text-xs sm:text-sm font-medium text-neutral-800 focus:outline-none cursor-pointer"
                        >
                          {experienceLevels.map((lvl) => (
                            <option key={lvl} value={lvl}>{lvl}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Message / Remarks */}
                    <div>
                      <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">
                        How would you like to associate / Message
                      </label>
                      <textarea
                        rows="3"
                        placeholder="Tell us about your background, client network, or specific corridor preference..."
                        value={associateData.message}
                        onChange={(e) => setAssociateData({ ...associateData, message: e.target.value })}
                        className="w-full bg-neutral-50 border border-neutral-200 focus:border-gold-500 rounded-xl px-4 py-2.5 text-sm text-neutral-800 focus:outline-none"
                      ></textarea>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={associateLoading}
                      className="w-full py-3.5 px-6 rounded-xl gold-gradient-btn text-black font-extrabold text-sm sm:text-base tracking-wide shadow-lg hover:shadow-xl transition-all flex items-center justify-center space-x-2"
                    >
                      <Handshake className="w-5 h-5 text-black" />
                      <span>{associateLoading ? 'Submitting Application...' : 'Apply to Become an Associate (Request Callback)'}</span>
                    </button>
                  </form>
                ) : (
                  <div className="text-center py-10 space-y-4 animate-fade-in">
                    <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 mx-auto">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <h3 className="text-2xl font-serif font-bold text-neutral-900">
                      Application Received, {associateData.name}!
                    </h3>
                    <p className="text-sm text-neutral-600 max-w-md mx-auto leading-relaxed">
                      Thank you for your interest in joining <strong className="text-neutral-900">Super Best Properties</strong>. Our Founder & Associate Relations team will call you back at <strong className="text-neutral-900">{associateData.phone}</strong> to discuss partnership details.
                    </p>
                    <div className="pt-3 flex flex-wrap justify-center gap-3">
                      <button
                        onClick={() => {
                          setAssociateSubmitted(false);
                          setAssociateData({
                            name: '',
                            phone: '',
                            email: '',
                            currentLocation: '',
                            profession: 'Real Estate Agent / Consultant',
                            experience: '1 – 3 Years',
                            message: ''
                          });
                        }}
                        className="px-6 py-2.5 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-semibold"
                      >
                        Submit Another Application
                      </button>
                      <a
                        href={`https://wa.me/917075539189?text=${encodeURIComponent(`Hello Mr. D. Suresh Baabu, I have applied to join Super Best Properties as an Associate Partner from ${associateData.currentLocation || 'Hyderabad'}. My name is ${associateData.name} (${associateData.phone}).`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center space-x-1.5"
                      >
                        <MessageCircle className="w-4 h-4 fill-current" />
                        <span>Connect on WhatsApp</span>
                      </a>
                    </div>
                  </div>
                )}
              </div>
            )}

          </div>

        </div>

        {/* Dedicated "How to Become an Associate" Section (Filling space circled in Image copy 54) */}
        <div className="mt-14 pt-12 border-t border-neutral-200">
          
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="text-gold-600 font-bold text-xs uppercase tracking-widest">
              Partnership & Growth Network
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-extrabold text-neutral-900 mt-1">
              How to Become an Associate with <span className="text-gold-600">Super Best Properties</span>
            </h2>
            <div className="mt-4 inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-gradient-to-r from-amber-500/10 via-amber-500/20 to-amber-500/10 border border-gold-500/40 text-amber-950 shadow-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-gold-500 shadow-[0_0_8px_rgba(212,160,23,0.8)]"></span>
              <span className="text-xs sm:text-sm font-extrabold tracking-wide uppercase">
                Under the Visionary Leadership of <span className="text-gold-700 font-black">Founder & CEO D. Suresh Baabu</span> (25+ Years Real Estate Authority)
              </span>
            </div>
            <p className="text-neutral-600 text-sm sm:text-base mt-3.5 max-w-2xl mx-auto leading-relaxed">
              Join Telangana's most ethical real estate advisory and marketing network led by <strong className="text-neutral-900 font-extrabold">Founder & CEO D. Suresh Baabu</strong> with 25+ years of trusted industry leadership.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-neutral-200/90 shadow-md hover:shadow-xl hover:border-gold-500 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-gold-500/15 text-gold-600 flex items-center justify-center font-bold mb-4">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-serif font-bold text-neutral-900 mb-2">
                1. High Revenue Share & Spot Payouts
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                Enjoy transparent commercial structuring, industry-leading payout slabs, and timely settlement upon project booking without unnecessary payment delays.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-neutral-200/90 shadow-md hover:shadow-xl hover:border-gold-500 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-gold-500/15 text-gold-600 flex items-center justify-center font-bold mb-4">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-serif font-bold text-neutral-900 mb-2">
                2. 100% TG RERA & HMDA Inventory
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                Never worry about litigation. Every property you market comes pre-vetted with 30-year link documents, layout sanctions, and bank loan approvals.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-neutral-200/90 shadow-md hover:shadow-xl hover:border-gold-500 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-gold-500/15 text-gold-600 flex items-center justify-center font-bold mb-4">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-serif font-bold text-neutral-900 mb-2">
                3. Dedicated Closing & Site Visit Support
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                Our in-house advisory desk arranges chauffeured customer site visits, provides branded brochures, and assists you in closing clients with high conversion.
              </p>
            </div>

          </div>

          {/* Quick CTA to Switch to Associate Form */}
          <div className="mt-8 text-center bg-neutral-950 text-white rounded-3xl p-6 sm:p-8 border border-gold-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-left">
              <h4 className="text-lg sm:text-xl font-serif font-bold text-white">
                Ready to Start Your Associate Partnership?
              </h4>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Fill the application form above or call our founder desk directly to schedule an introduction.
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={() => {
                  setActiveTab('associate');
                  window.scrollTo({ top: 300, behavior: 'smooth' });
                }}
                className="px-6 py-3 rounded-full gold-gradient-btn text-black font-extrabold text-xs sm:text-sm flex items-center space-x-1.5"
              >
                <span>Fill Associate Form</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href="tel:7075539189"
                className="px-5 py-3 rounded-full bg-neutral-900 hover:bg-neutral-800 border border-gold-400 text-gold-300 font-bold text-xs sm:text-sm"
              >
                Call: 7075539189
              </a>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
