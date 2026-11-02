import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';
import EnquiryModal from '../components/EnquiryModal';
import { 
  Building2, 
  MapPin, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  Calendar, 
  MessageCircle, 
  Phone 
} from 'lucide-react';

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    async function loadProjects() {
      try {
        const data = await api.getProjects();
        setProjects(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadProjects();
  }, []);

  const filtered = selectedStatus === 'all'
    ? projects
    : projects.filter(p => p.status.toLowerCase().includes(selectedStatus.toLowerCase()));

  const openEnquiry = (proj) => {
    setSelectedProject({
      title: proj.name,
      location: proj.location,
      price: proj.priceRange || 'On Request',
      categoryName: proj.type || 'Project'
    });
    setEnquiryOpen(true);
  };

  return (
    <div className="bg-[#FAFAFA] min-h-screen py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-600 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Signature Developments</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-black text-neutral-900">
            Our Landmark <span className="gold-gradient-text">Real Estate Projects</span>
          </h1>
          <p className="mt-3 text-sm sm:text-base text-neutral-600">
            Explore meticulously planned residential gated communities, plotted layouts, and commercial tech hubs developed across Hyderabad.
          </p>

          {/* Status Filter */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            {['all', 'Ready', 'Under Construction', 'Launching Soon'].map((st) => (
              <button
                key={st}
                onClick={() => setSelectedStatus(st)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                  selectedStatus === st
                    ? 'bg-neutral-950 text-gold-400 border border-gold-500'
                    : 'bg-white border border-neutral-300 text-neutral-700 hover:bg-neutral-100'
                }`}
              >
                {st === 'all' ? 'All Projects' : st}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Cards List */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1, 2].map((i) => (
              <div key={i} className="bg-white rounded-3xl h-96 animate-pulse border border-neutral-200"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filtered.map((proj) => (
              <div
                key={proj.id}
                className="bg-white rounded-3xl overflow-hidden border border-neutral-200/90 hover:border-gold-500/60 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col group"
              >
                {/* Project Image */}
                <div className="relative aspect-[16/9] overflow-hidden bg-neutral-900">
                  <img
                    src={proj.image}
                    alt={proj.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3.5 py-1.5 rounded-full bg-gold-500 text-black text-xs font-extrabold uppercase tracking-wider shadow">
                      {proj.status}
                    </span>
                  </div>
                  <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur-sm px-3.5 py-1 rounded-xl text-white text-xs font-bold border border-gold-500/40">
                    {proj.priceRange}
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center justify-between text-xs text-gold-600 font-semibold uppercase tracking-wider mb-1">
                      <span>{proj.type}</span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold font-serif text-neutral-900 group-hover:text-gold-700 transition-colors">
                      {proj.name}
                    </h3>

                    <div className="flex items-center space-x-1.5 text-neutral-600 text-xs sm:text-sm mt-1">
                      <MapPin className="w-4 h-4 text-gold-500 shrink-0" />
                      <span>{proj.location}</span>
                    </div>

                    <p className="text-sm text-neutral-600 mt-3 leading-relaxed">
                      {proj.description}
                    </p>

                    {/* Highlights bullet points */}
                    {proj.highlights && proj.highlights.length > 0 && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4 pt-4 border-t border-neutral-100">
                        {proj.highlights.map((h, i) => (
                          <div key={i} className="flex items-center space-x-2 text-xs font-medium text-neutral-700">
                            <CheckCircle2 className="w-3.5 h-3.5 text-gold-600 shrink-0" />
                            <span>{h}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Action buttons */}
                  <div className="pt-4 flex flex-wrap gap-3 items-center">
                    <button
                      onClick={() => openEnquiry(proj)}
                      className="flex-1 py-3 px-4 rounded-xl gold-gradient-btn text-black font-extrabold text-xs sm:text-sm tracking-wide text-center"
                    >
                      Book Site Inspection
                    </button>

                    <a
                      href={`https://wa.me/917075539189?text=${encodeURIComponent(`Hello Super Best Properties, I am interested in ${proj.name} located at ${proj.location}. Please share master plan & pricing.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs sm:text-sm flex items-center justify-center space-x-1.5 transition-colors"
                    >
                      <MessageCircle className="w-4 h-4 fill-current" />
                      <span>WhatsApp Brochure</span>
                    </a>
                  </div>

                </div>

              </div>
            ))}
          </div>
        )}

      </div>

      <EnquiryModal
        isOpen={enquiryOpen}
        onClose={() => setEnquiryOpen(false)}
        property={selectedProject}
      />
    </div>
  );
}

