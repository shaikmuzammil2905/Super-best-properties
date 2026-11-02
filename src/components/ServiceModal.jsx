import React, { useState } from 'react';
import { X, CheckCircle2, MessageCircle, Phone, Send, Sparkles, ShieldCheck, ArrowRight } from 'lucide-react';
import { api } from '../services/api';

export default function ServiceModal({ isOpen, onClose, service }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen || !service) return null;

  const Icon = service.icon;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.submitEnquiry({
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        propertyType: service.title,
        propertyTitle: `Service Consultation: ${service.title}`,
        budget: 'Flexible',
        message: formData.message || `Customer requested expert advisory for ${service.title}`,
        source: `Service Modal: ${service.title}`
      });
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Super Best Properties!\n` +
    `I would like to schedule an advisory consultation for:\n` +
    `*Service:* ${service.title}\n` +
    `*Tagline:* ${service.tagline}\n\n` +
    `Please connect me with a senior advisor.`
  );

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-2xl bg-neutral-950 border-2 border-gold-500/50 rounded-3xl p-5 sm:p-8 text-white shadow-2xl max-h-[92vh] overflow-y-auto animate-pop-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-neutral-900 hover:bg-neutral-800 text-gray-400 hover:text-white border border-neutral-700 transition-colors z-20"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Grand Header */}
        <div className="flex items-start space-x-4 pb-5 border-b border-neutral-800">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gold-500/15 border-2 border-gold-400 flex items-center justify-center text-gold-400 shrink-0 shadow-lg shadow-gold-500/10">
            {Icon && <Icon className="w-7 h-7 sm:w-8 sm:h-8" />}
          </div>
          <div className="pr-8">
            <span className="inline-block text-[11px] font-extrabold text-gold-400 tracking-wider uppercase mb-1">
              Super Best Properties • Executive Advisory
            </span>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-serif font-black text-white leading-tight">
              {service.title}
            </h3>
            <p className="text-xs sm:text-sm text-gold-300/90 font-medium mt-1">
              {service.tagline}
            </p>
          </div>
        </div>

        {/* Service Detailed Body */}
        <div className="py-5 space-y-5 text-xs sm:text-sm text-gray-300 leading-relaxed">
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wide flex items-center space-x-2 mb-2">
              <Sparkles className="w-4 h-4 text-gold-400" />
              <span>Overview & Strategic Scope</span>
            </h4>
            <p className="bg-neutral-900/80 p-4 rounded-2xl border border-neutral-800 text-gray-200">
              {service.description}
            </p>
          </div>

          {/* What We Deliver Section */}
          {service.deliverables && service.deliverables.length > 0 && (
            <div>
              <h4 className="text-white font-bold text-sm uppercase tracking-wide flex items-center space-x-2 mb-2.5">
                <ShieldCheck className="w-4 h-4 text-gold-400" />
                <span>What We Deliver & Guarantee</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {service.deliverables.map((item, i) => (
                  <div key={i} className="flex items-start space-x-2.5 p-3 rounded-xl bg-neutral-900/60 border border-neutral-800/90">
                    <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                    <span className="text-gray-200 text-xs font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Quick Consultation Form or Direct WhatsApp */}
          {!submitted ? (
            <div className="pt-2 bg-gradient-to-b from-neutral-900 to-black p-5 rounded-2xl border border-gold-500/30 space-y-3">
              <h4 className="text-white font-bold text-sm flex items-center space-x-2">
                <span>Book Free Consultation for this Service</span>
              </h4>
              <p className="text-xs text-gray-400">
                Leave your details below or connect immediately with our senior advisory team on WhatsApp.
              </p>

              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    required
                    placeholder="Your Name *"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-neutral-950 border border-neutral-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-gold-500"
                  />
                  <input
                    type="tel"
                    required
                    placeholder="Mobile / WhatsApp Number *"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-neutral-950 border border-neutral-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-gold-500"
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-2.5 pt-1">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 py-3 px-5 rounded-xl gold-gradient-btn text-black font-extrabold text-xs tracking-wide flex items-center justify-center space-x-2 shadow-lg"
                  >
                    <Send className="w-4 h-4 text-black" />
                    <span>{loading ? 'Submitting...' : 'Request Advisor Callback'}</span>
                  </button>

                  <a
                    href={`https://wa.me/917075539189?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center justify-center space-x-2 transition-colors shadow-lg"
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                    <span>WhatsApp Now</span>
                  </a>
                </div>
              </form>
            </div>
          ) : (
            <div className="bg-emerald-950/40 border border-emerald-500/40 rounded-2xl p-5 text-center space-y-2">
              <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
              <h5 className="font-bold text-white text-base">Consultation Request Logged!</h5>
              <p className="text-xs text-gray-300">
                Our principal advisor will connect with you at <strong className="text-white">{formData.phone}</strong> regarding {service.title}.
              </p>
              <div className="pt-2 flex justify-center gap-3">
                <button
                  onClick={onClose}
                  className="px-5 py-2 rounded-full bg-neutral-800 text-xs font-semibold text-white"
                >
                  Close
                </button>
                <a
                  href={`https://wa.me/917075539189?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2 rounded-full bg-emerald-600 text-xs font-semibold text-white flex items-center space-x-1"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-current" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>
          )}

          {/* Quick Call */}
          <div className="pt-2 text-center text-xs text-gray-400 flex items-center justify-between border-t border-neutral-900">
            <span>Direct Advisory Hotline:</span>
            <a href="tel:7075539189" className="text-gold-400 font-bold hover:underline">
              +91 7075539189
            </a>
          </div>

        </div>

      </div>
    </div>
  );
}
