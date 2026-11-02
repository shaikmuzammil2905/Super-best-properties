import React from 'react';
import FounderSection from '../components/FounderSection';
import { 
  ShieldCheck, 
  Target, 
  Compass, 
  HeartHandshake, 
  CheckCircle, 
  Sparkles, 
  Award, 
  TrendingUp, 
  Users, 
  BookOpen, 
  Building 
} from 'lucide-react';

export default function AboutPage() {
  const commitments = [
    { num: '01', title: 'Understanding Customer Needs', desc: 'Listening deeply to unique family priorities and long-term financial milestones.' },
    { num: '02', title: 'Providing Professional Advisory', desc: 'Delivering unbiased, data-backed insights with deep legal and technical scrutiny.' },
    { num: '03', title: 'Connecting the Right Opportunities', desc: 'Curating exclusive HMDA & DTCP properties in high-capital appreciation corridors.' },
    { num: '04', title: 'Promoting Transparency', desc: '100% legal clarity on titles, land use regulations, and zero hidden charges.' },
    { num: '05', title: 'Delivering Customer-Centric Solutions', desc: 'Customized guidance across buying, investing, site visits, and bank loans.' },
    { num: '06', title: 'Building Long-Term Relationships', desc: 'Partnering across generations to safeguard, nurture, and grow real estate wealth.' },
  ];

  const coreValues = [
    { title: 'Integrity', subtitle: 'Doing What Is Right', desc: 'Uncompromising honesty and ethical conduct guiding every property transaction.' },
    { title: 'Transparency', subtitle: 'Building Confidence Through Clarity', desc: 'Clear title verification, open communication, and total transactional clarity.' },
    { title: 'Customer Commitment', subtitle: 'Your Interests Matter', desc: 'Putting customer objectives at the absolute heart of every recommendation.' },
    { title: 'Professional Excellence', subtitle: 'Raising the Standards', desc: 'Setting benchmark real estate advisory standards across Telangana.' },
    { title: 'Knowledge & Insight', subtitle: 'Decisions Backed by Understanding', desc: 'Micro-market analytics, masterplan foresight, and strategic investment guidance.' },
    { title: 'Accountability', subtitle: 'Responsibility in Every Commitment', desc: 'Taking full ownership of our representations and legal verifications.' },
    { title: 'Long-Term Relationships', subtitle: 'Beyond Transactions', desc: 'Enduring partnerships built on trust, respect, and mutual prosperity.' },
  ];

  return (
    <div className="bg-[#FAFAFA] min-h-screen">
      
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-neutral-950 via-neutral-900 to-black text-white py-16 sm:py-24 border-b border-gold-500/20 relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center max-w-3xl">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-gold-500/15 border border-gold-500/40 text-gold-400 text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Legacy of Trust & Excellence</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-black text-white tracking-tight">
            About <span className="gold-gradient-text">Super Best Properties</span>
          </h1>
          <p className="mt-4 text-base sm:text-lg text-gray-300 font-medium">
            Building Opportunities. Creating Wealth.
          </p>
          <p className="mt-2 text-sm text-gold-400 font-semibold tracking-wider uppercase">
            PLOTS | FLATS | HOUSES | VILLAS
          </p>
        </div>
      </div>

      {/* Official Story Section */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 space-y-6 text-neutral-700 leading-relaxed">
            <div className="inline-block border-l-4 border-gold-500 pl-4">
              <span className="text-gold-600 font-bold text-xs uppercase tracking-widest block">Our Heritage</span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-neutral-900 mt-1">
                Your Trusted Partner in Real Estate Advisory & Property Solutions
              </h2>
            </div>

            <p className="text-base text-neutral-700">
              <strong className="text-neutral-900">Super Best Properties</strong> is a professional real estate advisory and property solutions firm dedicated to helping individuals, families and investors make informed, confident and value-driven property decisions.
            </p>

            <p className="text-sm sm:text-base">
              With a strong understanding of the real estate landscape across Hyderabad and Telangana, we offer comprehensive guidance and access to opportunities across residential, commercial and investment properties.
            </p>

            <p className="text-sm sm:text-base">
              Our property portfolio encompasses HMDA, DTCP and GHMC-approved properties, open plots, residential apartments, independent houses, commercial spaces, land parcels and development opportunities.
            </p>

            <p className="text-sm sm:text-base">
              At Super Best Properties, we believe that every property decision deserves the right information, professional guidance and a customer-first approach. We go beyond conventional property transactions by understanding individual requirements, identifying suitable opportunities and guiding customers through the property selection and buying journey.
            </p>

            <div className="p-4 rounded-2xl bg-gold-500/10 border border-gold-500/30 text-gold-900 font-semibold text-sm">
              “Whether you are purchasing your dream home, investing in land, acquiring commercial property or exploring real estate opportunities for wealth creation, we strive to make your journey simpler, smarter and more rewarding.”
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="rounded-3xl overflow-hidden shadow-2xl border-2 border-gold-500/30">
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80"
                alt="Luxury Real Estate Advisory"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

        </div>
      </section>

      {/* Vision & Mission Grid */}
      <section className="py-16 bg-white border-y border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Vision */}
            <div className="p-8 sm:p-10 rounded-3xl bg-neutral-50 border border-neutral-200 hover:border-gold-500/60 shadow-sm transition-all space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-gold-500/15 flex items-center justify-center text-gold-600">
                <Compass className="w-8 h-8" />
              </div>
              <span className="text-xs uppercase font-bold tracking-widest text-gold-600">Our Vision</span>
              <h3 className="text-2xl font-serif font-bold text-neutral-900">
                To Be a Trusted Name in Real Estate Advisory & Property Solutions
              </h3>
              <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
                Our vision is to become a respected and preferred real estate advisory brand, recognized for professional excellence, integrity, customer trust and meaningful property solutions. We aspire to create a customer-centric real estate ecosystem that connects people with the right opportunities through reliable information, market intelligence and professional guidance.
              </p>
              <p className="text-neutral-500 text-xs sm:text-sm">
                We envision a future where every property buyer and investor can approach real estate decisions with greater clarity, confidence and informed judgment.
              </p>
            </div>

            {/* Mission */}
            <div className="p-8 sm:p-10 rounded-3xl bg-neutral-50 border border-neutral-200 hover:border-gold-500/60 shadow-sm transition-all space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-gold-500/15 flex items-center justify-center text-gold-600">
                <Target className="w-8 h-8" />
              </div>
              <span className="text-xs uppercase font-bold tracking-widest text-gold-600">Our Mission</span>
              <h3 className="text-2xl font-serif font-bold text-neutral-900">
                Simplifying Real Estate Decisions. Creating Lasting Value
              </h3>
              <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
                Our mission is to empower property buyers and investors with professional guidance, relevant market insights and comprehensive real estate solutions. Our ambition is not just to grow as a real estate business, but to become a trusted partner in every customer's property journey.
              </p>
              <div className="pt-2 flex items-center space-x-2 text-xs font-semibold text-gold-700">
                <ShieldCheck className="w-4 h-4" />
                <span>Committed to Ethical Advisory Across Telangana</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Our Mission: 6 Commitments */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-gold-600 font-bold text-xs uppercase tracking-widest">Action Principles</span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-neutral-900 mt-1">
            Our Six Core Commitments
          </h2>
          <p className="text-neutral-600 text-sm sm:text-base mt-2">
            How we translate our vision into actionable, tangible value for every buyer and investor.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {commitments.map((c) => (
            <div key={c.num} className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm hover:shadow-lg transition-all space-y-2">
              <span className="text-3xl font-serif font-black text-gold-500">{c.num}</span>
              <h4 className="font-bold text-base text-neutral-900">{c.title}</h4>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Core Values (7 Values) */}
      <section className="py-20 bg-neutral-950 text-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-gold-400 font-bold text-xs uppercase tracking-widest">Guiding Tenets</span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white mt-1">
              Our Seven <span className="gold-gradient-text">Core Values</span>
            </h2>
            <p className="text-gray-400 text-sm sm:text-base mt-2">
              The foundational pillars that distinguish Super Best Properties in the real estate landscape.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {coreValues.map((v, i) => (
              <div key={i} className="p-6 rounded-2xl bg-neutral-900/90 border border-gold-500/30 hover:border-gold-500/80 shadow-xl transition-all space-y-2 group">
                <span className="inline-block text-xs font-bold px-2.5 py-1 rounded-md bg-gold-500/15 text-gold-400 border border-gold-500/30">
                  Value #{i + 1}
                </span>
                <h4 className="font-serif font-bold text-lg text-white group-hover:text-gold-400 transition-colors">
                  {v.title}
                </h4>
                <p className="text-xs text-gold-300 font-medium">{v.subtitle}</p>
                <p className="text-xs text-gray-400 pt-2 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Our Promise Section */}
      <section className="py-20 max-w-4xl mx-auto px-4 text-center space-y-6">
        <span className="text-gold-600 font-bold text-xs uppercase tracking-widest">A Sacred Guarantee</span>
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-neutral-900">
          “Your Trust. Our Commitment. Your Property Goals.”
        </h2>
        <div className="space-y-4 text-sm sm:text-base text-neutral-700 leading-relaxed">
          <p>
            At Super Best Properties, we understand that buying, selling or investing in real estate is an important decision that deserves careful consideration.
          </p>
          <p>
            We promise to approach every customer relationship with integrity, professionalism and a genuine commitment to understanding their needs. We strive to provide relevant information, transparent communication, suitable property options and dependable guidance throughout the property journey.
          </p>
          <p className="font-serif italic text-lg sm:text-xl text-neutral-900 font-bold pt-2">
            “We don't just help you find properties. We help you make informed property decisions.”
          </p>
          <p className="text-xs font-bold uppercase tracking-wider text-gold-600">
            Super Best Properties – Building Opportunities. Creating Wealth.
          </p>
        </div>
      </section>

      {/* Founder Section */}
      <FounderSection />

    </div>
  );
}
