import React from 'react';
import { MessageCircle } from 'lucide-react';

export default function WhatsAppChatbot() {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Trigger Button - Directly opens WhatsApp to +91 7075539189 with zero popup */}
      <a
        href="https://wa.me/917075539189?text=Hello%20Super%20Best%20Properties,%20I%20am%20interested%20in%20property%20advisory%20in%20Hyderabad."
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center justify-center bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-500 text-white w-14 h-14 rounded-full shadow-2xl shadow-green-900/40 hover:scale-110 active:scale-95 transition-all duration-300 border-2 border-white/20"
        aria-label="Chat on WhatsApp"
        title="Chat on WhatsApp"
      >
        <div className="relative flex items-center justify-center">
          <MessageCircle className="w-7 h-7 fill-current animate-pulse-slow" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-gold-400 rounded-full border-2 border-white"></span>
        </div>
      </a>
    </div>
  );
}
