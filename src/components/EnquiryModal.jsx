import React, { useState } from 'react';
import { X, CheckCircle2, MessageCircle, Phone, Send, Sparkles } from 'lucide-react';
import { api } from '../services/api';

export default function EnquiryModal({ isOpen, onClose, property = null }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: property ? `Interested in ${property.title} located at ${property.location}. Please schedule a site visit.` : ''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await api.submitEnquiry({
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        propertyType: property ? property.categoryName : 'General Enquiry',
        propertyTitle: property ? property.title : 'General',
        budget: property ? property.price : 'Flexible',
        message: formData.message,
        source: property ? `Property Modal: ${property.title}` : 'Website Popup'
      });
      setSubmitted(true);
    } catch (err) {
      setError(err.message || 'Something went wrong. Please call us directly.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
      <div 
        className="relative w-full max-w-lg bg-neutral-950 border border-gold-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl text-white overflow-hidden max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-gray-400 hover:text-white hover:bg-neutral-800 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div>
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 text-xs font-semibold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Priority Site Visit & Advisory</span>
            </div>

            <h3 className="text-2xl font-serif font-bold text-white">
              {property ? `Enquire About ${property.title}` : 'Schedule a Property Consultation'}
            </h3>
            
            {property && (
              <p className="text-sm text-gold-400 font-semibold mt-1">
                {property.price} • {property.location}
              </p>
            )}

            <p className="text-xs text-gray-400 mt-2">
              Fill in your details below and our senior advisor will contact you within 30 minutes with verified documents and site visit slots.
            </p>

            {error && (
              <div className="mt-3 p-3 rounded-xl bg-red-950/40 border border-red-500/40 text-red-300 text-xs">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-5 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  Full Name <span className="text-gold-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Reddy"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-neutral-900 border border-neutral-700 focus:border-gold-500 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    Phone / Mobile <span className="text-gold-400">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 9848012345"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-neutral-900 border border-neutral-700 focus:border-gold-500 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="e.g. name@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-neutral-900 border border-neutral-700 focus:border-gold-500 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  Message / Site Visit Request
                </label>
                <textarea
                  rows="3"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-neutral-900 border border-neutral-700 focus:border-gold-500 rounded-xl px-4 py-2 text-sm text-white focus:outline-none"
                  placeholder="Tell us your requirements or preferred time for inspection..."
                ></textarea>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 py-3 px-6 rounded-xl gold-gradient-btn text-black font-extrabold text-sm tracking-wide shadow-lg hover:shadow-gold-500/30 transition-all flex items-center justify-center space-x-2"
                >
                  <Send className="w-4 h-4 text-black" />
                  <span>{loading ? 'Submitting...' : 'Submit Enquiry'}</span>
                </button>

                <a
                  href={`https://wa.me/917075539189?text=${encodeURIComponent(`Hello Super Best Properties, I am interested in ${property ? property.title : 'properties'}. Please contact me.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-semibold text-xs sm:text-sm flex items-center justify-center space-x-2 transition-colors"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </form>
          </div>
        ) : (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center text-emerald-400 mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h4 className="text-2xl font-serif font-bold text-white">Enquiry Received!</h4>
            <p className="text-sm text-gray-300 max-w-sm mx-auto">
              Thank you, <strong className="text-gold-400">{formData.name}</strong>. Our senior property advisor will reach out to you at <strong className="text-white">{formData.phone}</strong> shortly.
            </p>
            <div className="pt-4 flex justify-center space-x-3">
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-full bg-neutral-800 hover:bg-neutral-700 text-gray-200 text-xs font-semibold"
              >
                Close Window
              </button>
              <a
                href={`https://wa.me/917075539189?text=${encodeURIComponent(`Hello Super Best Properties, I have just submitted an enquiry for ${property ? property.title : 'property consultation'}.`)}`}
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
  );
}

