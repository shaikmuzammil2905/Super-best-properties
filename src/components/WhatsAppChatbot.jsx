import React, { useState } from 'react';
import { MessageCircle, X, Send, ChevronRight, CheckCircle2, RotateCcw, User, Phone } from 'lucide-react';
import { api } from '../services/api';

export default function WhatsAppChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    propertyType: '',
    location: '',
    budget: '',
    timeframe: '',
    specificProperty: '',
    name: '',
    phone: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const propertyTypes = [
    'Independent House',
    'Plot',
    'Flat / Apartment',
    'Gated Community Villas',
    'Commercial Office / Shop',
    'Farm House / Agri Land',
    'PG Building / Hostel'
  ];

  const locations = [
    'Vanasthalipuram / LB Nagar',
    'Tellapur / Gachibowli',
    'Shamshabad / Airport Zone',
    'Kompally / Medchal',
    'Hitec City / Madhapur',
    'Open to Recommendations'
  ];

  const budgets = [
    'Under ₹ 50 Lakhs',
    '₹ 50 Lakhs – ₹ 1 Crore',
    '₹ 1 Crore – ₹ 2 Crores',
    'Above ₹ 2 Crores'
  ];

  const handleSelect = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setStep(prev => prev + 1);
  };

  const handleFinalSubmit = async (e) => {
    e?.preventDefault();
    // Save enquiry into database
    try {
      await api.submitEnquiry({
        name: formData.name || 'WhatsApp Visitor',
        phone: formData.phone || 'Pending',
        propertyType: formData.propertyType || 'General',
        budget: formData.budget || 'Not specified',
        message: `WhatsApp Bot Enquiry: Location: ${formData.location}, Property Type: ${formData.propertyType}, Budget: ${formData.budget}, Note: ${formData.specificProperty || 'None'}`,
        source: 'WhatsApp Chatbot'
      });
    } catch (err) {
      console.error('Enquiry save failed:', err);
    }

    // Construct WhatsApp message
    const message = encodeURIComponent(
      `Hello Super Best Properties!\n` +
      `I am looking for property advisory:\n\n` +
      `• *Property Type:* ${formData.propertyType || 'Open'}\n` +
      `• *Preferred Location:* ${formData.location || 'Hyderabad'}\n` +
      `• *Budget Range:* ${formData.budget || 'Flexible'}\n` +
      (formData.specificProperty ? `• *Note / Query:* ${formData.specificProperty}\n` : '') +
      (formData.name ? `• *Name:* ${formData.name}\n` : '') +
      (formData.phone ? `• *Phone:* ${formData.phone}\n` : '') +
      `\nPlease share suitable options and arrange a discussion.`
    );

    window.open(`https://wa.me/917075539189?text=${message}`, '_blank');
    setSubmitted(true);
  };

  const handleReset = () => {
    setFormData({
      propertyType: '',
      location: '',
      budget: '',
      timeframe: '',
      specificProperty: '',
      name: '',
      phone: ''
    });
    setStep(1);
    setSubmitted(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      
      {/* Floating Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center space-x-3 bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-500 text-white px-5 py-3.5 rounded-full shadow-2xl shadow-green-900/40 hover:scale-105 transition-all duration-300 border-2 border-white/20"
          aria-label="Chat with real estate advisor on WhatsApp"
        >
          <div className="relative">
            <MessageCircle className="w-6 h-6 fill-current animate-pulse-slow" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-gold-400 rounded-full border-2 border-white"></span>
          </div>
          <span className="font-semibold text-sm tracking-wide hidden sm:inline-block">Chat with us</span>
        </button>
      )}

      {/* Interactive Chat Window */}
      {isOpen && (
        <div className="w-[90vw] sm:w-96 bg-neutral-950 border border-gold-500/40 rounded-3xl shadow-2xl overflow-hidden animate-fade-in flex flex-col max-h-[85vh]">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-black via-neutral-900 to-black p-4 border-b border-gold-500/30 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white shadow-md">
                <MessageCircle className="w-6 h-6 fill-current" />
              </div>
              <div>
                <h4 className="text-white font-semibold text-sm">Super Best Properties</h4>
                <p className="text-emerald-400 text-xs flex items-center space-x-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                  <span>Online | Fast Advisory</span>
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-full text-gray-400 hover:text-white hover:bg-neutral-800 transition-colors"
              aria-label="Close chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Conversation Area */}
          <div className="p-4 overflow-y-auto space-y-4 flex-1 text-sm bg-neutral-900/60">
            
            {/* Bot Welcome Bubble */}
            <div className="flex items-start space-x-2">
              <div className="w-7 h-7 rounded-full bg-gold-500/20 border border-gold-500/40 text-gold-400 flex items-center justify-center text-xs font-bold shrink-0 mt-1">
                SBP
              </div>
              <div className="bg-neutral-800 text-gray-200 p-3 rounded-2xl rounded-tl-none border border-neutral-700 max-w-[85%] leading-relaxed shadow-sm">
                <p className="font-semibold text-gold-400 mb-1">Namaste! Welcome to Super Best Properties.</p>
                <p className="text-xs text-gray-300">Let us guide you to the perfect property in Hyderabad. Please answer a few quick questions to connect with our senior advisor on WhatsApp.</p>
              </div>
            </div>

            {/* Step 1: Property Type */}
            {step >= 1 && (
              <div className="space-y-2">
                <div className="text-xs text-gold-400 font-semibold uppercase tracking-wider flex items-center justify-between">
                  <span>1. What property type are you looking for?</span>
                  {formData.propertyType && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                </div>

                {!formData.propertyType ? (
                  <div className="grid grid-cols-1 gap-1.5">
                    {propertyTypes.map((t) => (
                      <button
                        key={t}
                        onClick={() => handleSelect('propertyType', t)}
                        className="text-left px-3.5 py-2 rounded-xl bg-neutral-800/90 hover:bg-gold-500/20 hover:border-gold-500/50 border border-neutral-700 text-gray-200 text-xs font-medium transition-all flex items-center justify-between"
                      >
                        <span>{t}</span>
                        <ChevronRight className="w-3.5 h-3.5 text-gray-500" />
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="flex justify-end">
                    <span className="bg-gold-500 text-black font-semibold text-xs px-3 py-1.5 rounded-xl rounded-tr-none">
                      {formData.propertyType}
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* Step 2: Preferred Location */}
            {step >= 2 && (
              <div className="space-y-2">
                <div className="text-xs text-gold-400 font-semibold uppercase tracking-wider flex items-center justify-between">
                  <span>2. Which location do you prefer?</span>
                  {formData.location && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                </div>

                {!formData.location ? (
                  <div className="grid grid-cols-1 gap-1.5">
                    {locations.map((loc) => (
                      <button
                        key={loc}
                        onClick={() => handleSelect('location', loc)}
                        className="text-left px-3.5 py-2 rounded-xl bg-neutral-800/90 hover:bg-gold-500/20 hover:border-gold-500/50 border border-neutral-700 text-gray-200 text-xs font-medium transition-all flex items-center justify-between"
                      >
                        <span>{loc}</span>
                        <ChevronRight className="w-3.5 h-3.5 text-gray-500" />
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="flex justify-end">
                    <span className="bg-gold-500 text-black font-semibold text-xs px-3 py-1.5 rounded-xl rounded-tr-none">
                      {formData.location}
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* Step 3: Budget Range */}
            {step >= 3 && (
              <div className="space-y-2">
                <div className="text-xs text-gold-400 font-semibold uppercase tracking-wider flex items-center justify-between">
                  <span>3. What is your estimated budget?</span>
                  {formData.budget && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                </div>

                {!formData.budget ? (
                  <div className="grid grid-cols-1 gap-1.5">
                    {budgets.map((b) => (
                      <button
                        key={b}
                        onClick={() => handleSelect('budget', b)}
                        className="text-left px-3.5 py-2 rounded-xl bg-neutral-800/90 hover:bg-gold-500/20 hover:border-gold-500/50 border border-neutral-700 text-gray-200 text-xs font-medium transition-all flex items-center justify-between"
                      >
                        <span>{b}</span>
                        <ChevronRight className="w-3.5 h-3.5 text-gray-500" />
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="flex justify-end">
                    <span className="bg-gold-500 text-black font-semibold text-xs px-3 py-1.5 rounded-xl rounded-tr-none">
                      {formData.budget}
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* Step 4: Contact & Direct WhatsApp Trigger */}
            {step >= 4 && !submitted && (
              <form onSubmit={handleFinalSubmit} className="space-y-3 pt-2 bg-neutral-800/70 p-3 rounded-2xl border border-gold-500/20">
                <p className="text-xs text-gray-300 font-medium">
                  Almost ready! Enter your contact name to receive verified listings on WhatsApp:
                </p>
                <div>
                  <input
                    type="text"
                    required
                    placeholder="Your Name *"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-neutral-900 border border-neutral-700 focus:border-gold-500 rounded-xl px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none"
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    required
                    placeholder="Mobile / WhatsApp Number *"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-neutral-900 border border-neutral-700 focus:border-gold-500 rounded-xl px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Any specific requirement? (optional)"
                    value={formData.specificProperty}
                    onChange={(e) => setFormData({ ...formData, specificProperty: e.target.value })}
                    className="w-full bg-neutral-900 border border-neutral-700 focus:border-gold-500 rounded-xl px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-green-500 text-white font-semibold text-xs flex items-center justify-center space-x-2 shadow-lg shadow-green-900/40 hover:brightness-110 transition-all"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Connect on WhatsApp Now</span>
                </button>
              </form>
            )}

            {/* Completed state */}
            {submitted && (
              <div className="bg-emerald-950/40 border border-emerald-500/40 rounded-2xl p-4 text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                <h5 className="font-semibold text-white text-sm">Thank You!</h5>
                <p className="text-xs text-gray-300">
                  Redirecting you to WhatsApp (+91 7075539189). Our senior advisor has also logged your requirement.
                </p>
                <button
                  onClick={handleReset}
                  className="inline-flex items-center space-x-1 text-xs text-gold-400 hover:text-gold-300 pt-2"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Start new search</span>
                </button>
              </div>
            )}

          </div>

          {/* Footer note */}
          <div className="p-2.5 bg-black text-center border-t border-neutral-800 text-[10px] text-gray-400 flex items-center justify-between px-4">
            <span>Direct WhatsApp: 7075539189</span>
            {step > 1 && !submitted && (
              <button onClick={handleReset} className="text-gold-400 hover:underline">
                Reset
              </button>
            )}
          </div>

        </div>
      )}

    </div>
  );
}
