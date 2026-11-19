import React, { useRef } from 'react';
import { Star, Quote, CheckCircle2, ChevronLeft, ChevronRight, Sparkles, MapPin } from 'lucide-react';

export default function ClientReviewsSection() {
  const scrollRef = useRef(null);

  const reviews = [
    {
      name: 'Vikramaditya Reddy',
      role: 'NRI Investor (Dallas, USA)',
      location: 'Choutuppal RRR & NH-65 Belt',
      property: 'Open Plot in HMDA Gated Layout',
      rating: 5,
      avatar: 'VR',
      avatarBg: 'bg-emerald-600',
      review: 'Being in Dallas, I was initially anxious about buying land in Hyderabad remotely. D. Suresh Baabu sir personally walked me through every micro-market detail on video call. They handled the Indian Embassy SPoA and sub-registrar registration seamlessly. The registered documents were delivered safely to my family. Absolute integrity!'
    },
    {
      name: 'P. Rajesh & Sunitha',
      role: 'Tech Lead & Architect (Financial District)',
      location: 'Yacharam (Near Bharat Future City)',
      property: '200 Sq. Yds DTCP Gated Plot',
      rating: 5,
      avatar: 'RS',
      avatarBg: 'bg-blue-600',
      review: 'We purchased a 200 sq. yard plot in Yacharam. The title verification was 100% spotless with complete 30-year link records. Their banking desk even helped us get SBI plot loan clearance in just 6 days without running around. Highly recommended for genuine land advisory!'
    },
    {
      name: 'Sanjay Mehta',
      role: 'NRI Investor (Dubai, UAE)',
      location: 'Shamshabad Airport Zone',
      property: 'HMDA Commercial & Residential Plots',
      rating: 5,
      avatar: 'SM',
      avatarBg: 'bg-amber-600',
      review: 'Super Best Properties is hands down the benchmark for NRI property investment in Telangana. They sent live drone footage of the exact plot, GPS boundary markings, and RERA certificates. Outstanding execution and zero middleman markups.'
    },
    {
      name: 'Dr. K. Srinivas Rao',
      role: 'Senior Consultant (Hyderabad)',
      location: 'LB Nagar Metro Corridor',
      property: 'Commercial Showroom Space',
      rating: 5,
      avatar: 'SR',
      avatarBg: 'bg-purple-600',
      review: "Suresh Baabu garu's 25+ years of real estate foresight saved us from overpaying on our commercial purchase. His transparent guidance on revenue records, road widening master plans, and municipal permissions gave us total confidence."
    },
    {
      name: 'Harish Chenna',
      role: 'Software Director (London, UK)',
      location: 'Ghatkesar Highway Belt',
      property: 'Premium Plotted Layout',
      rating: 5,
      avatar: 'HC',
      avatarBg: 'bg-rose-600',
      review: 'From London, investing in Hyderabad was completely effortless. Clear TG RERA layout permissions, live video walkthroughs, and prompt WhatsApp updates at every stage. Best real estate consultancy in Telangana!'
    },
    {
      name: 'Anand Varma & Sneha',
      role: 'Business Owner (Hyderabad)',
      location: 'Kompally Corridor',
      property: 'Gated Villa Community',
      rating: 5,
      avatar: 'AV',
      avatarBg: 'bg-indigo-600',
      review: 'What stood out the most was their ethical advisory. Instead of pushing any property, they clearly explained which areas had water-body buffer risks and guided us only towards 100% clear-title gated layouts. A true partner for life.'
    }
  ];

  // Duplicate reviews to create seamless infinite marquee loop
  const marqueeReviews = [...reviews, ...reviews];

  const handleManualScroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -380 : 380;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-12 sm:py-16 bg-[#0a0a0a] text-white relative overflow-hidden border-t border-b border-gold-500/20">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mb-8 sm:mb-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-gold-500/15 border border-gold-400 text-gold-300 text-xs font-bold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5 text-gold-400" />
              <span>Verified Client Testimonials</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-serif font-extrabold text-white tracking-tight">
              What Our Valued Clients <span className="gold-gradient-text">Say About Us</span>
            </h2>
            <p className="text-gray-400 text-xs sm:text-sm md:text-base mt-2 max-w-2xl leading-relaxed">
              Real experiences from families, tech professionals, and Global Indian investors who built generational wealth with Super Best Properties.
            </p>
          </div>

          {/* Manual Slider Navigation Arrows */}
          <div className="flex items-center space-x-3 self-start md:self-end">
            <button
              onClick={() => handleManualScroll('left')}
              className="w-10 h-10 rounded-full bg-neutral-900 border border-gold-500/40 hover:bg-gold-500 hover:text-black text-gold-300 flex items-center justify-center transition-all shadow-md active:scale-95"
              aria-label="Scroll reviews left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => handleManualScroll('right')}
              className="w-10 h-10 rounded-full bg-neutral-900 border border-gold-500/40 hover:bg-gold-500 hover:text-black text-gold-300 flex items-center justify-center transition-all shadow-md active:scale-95"
              aria-label="Scroll reviews right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

      </div>

      {/* Auto-scrolling from Left to Right Continuous Marquee */}
      <div 
        ref={scrollRef}
        className="w-full overflow-x-auto no-scrollbar py-2 cursor-grab active:cursor-grabbing"
      >
        <div className="animate-marquee-ltr flex space-x-5 px-4 sm:px-6">
          {marqueeReviews.map((item, idx) => (
            <div
              key={idx}
              className="w-[310px] sm:w-[380px] shrink-0 bg-neutral-900/90 border border-neutral-800 hover:border-gold-500/70 rounded-3xl p-6 sm:p-7 shadow-xl hover:shadow-2xl hover:shadow-gold-500/10 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Top Row: Stars & Quote Icon */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-1">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-gold-400 text-gold-400" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-gold-500/30 group-hover:text-gold-400 transition-colors" />
                </div>

                {/* Review Text */}
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed italic line-clamp-5">
                  "{item.review}"
                </p>
              </div>

              {/* Bottom: Client Profile & Property Tag */}
              <div className="mt-6 pt-4 border-t border-neutral-800">
                <div className="flex items-center space-x-3 mb-2.5">
                  <div className={`w-10 h-10 rounded-full ${item.avatarBg} text-white font-bold flex items-center justify-center text-sm shadow shrink-0`}>
                    {item.avatar}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white group-hover:text-gold-300 transition-colors flex items-center space-x-1.5">
                      <span>{item.name}</span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-gold-400 inline" />
                    </h4>
                    <span className="text-[11px] text-gray-400 block">{item.role}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-1 text-[11px] text-gold-400/90 font-medium truncate">
                  <MapPin className="w-3 h-3 text-gold-500 shrink-0" />
                  <span className="truncate">{item.property} ({item.location})</span>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
