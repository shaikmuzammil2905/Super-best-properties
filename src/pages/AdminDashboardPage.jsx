import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { api } from '../services/api';
import { uploadImage } from '../services/cloudinaryService';
import { checkSupabaseStatus } from '../services/supabaseClient';
import { 
  Building2, 
  Home, 
  Layers, 
  PhoneCall, 
  Users, 
  FileText, 
  Image, 
  Settings, 
  ShieldCheck, 
  LogOut, 
  Plus, 
  Trash2, 
  Edit3, 
  Search, 
  ExternalLink, 
  Upload, 
  MessageCircle, 
  Check, 
  X, 
  Eye, 
  RefreshCw, 
  TrendingUp, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  Filter, 
  Download, 
  Copy, 
  Database, 
  Menu, 
  ChevronRight,
  Globe,
  Share2,
  HelpCircle,
  Award,
  Sliders,
  DollarSign,
  MapPin,
  Calendar
} from 'lucide-react';

export default function AdminDashboardPage() {
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem('sbp_admin_token') || '');
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toast, setToast] = useState(null);

  // Data states
  const [stats, setStats] = useState(null);
  const [properties, setProperties] = useState([]);
  const [categories, setCategories] = useState([]);
  const [projects, setProjects] = useState([]);
  const [enquiries, setEnquiries] = useState([]);
  const [settings, setSettings] = useState(null);
  const [content, setContent] = useState(null);
  const [mediaList, setMediaList] = useState([]);
  const [cloudStatus, setCloudStatus] = useState({ connected: true, tablesReady: false });

  // Filter & Search states
  const [propSearch, setPropSearch] = useState('');
  const [propCategoryFilter, setPropCategoryFilter] = useState('all');
  const [leadSearch, setLeadSearch] = useState('');
  const [leadStatusFilter, setLeadStatusFilter] = useState('all');

  // Property Modal Form
  const [propertyModalOpen, setPropertyModalOpen] = useState(false);
  const [editingPropertyId, setEditingPropertyId] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [propForm, setPropForm] = useState({
    title: '',
    categorySlug: 'apartments',
    categoryName: 'Apartment',
    price: '₹ 75 Lakhs',
    priceNumber: 7500000,
    location: 'Tellapur, Hyderabad',
    city: 'Hyderabad',
    area: '1,350 Sq.Ft',
    areaSqFt: 1350,
    bedrooms: '3 BHK',
    bathrooms: '3 Baths',
    status: 'Available',
    featured: false,
    images: ['https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1000&q=80'],
    description: '',
    amenities: '100% Vastu, Car Parking, Power Backup, 24/7 Security',
    mapCoordinates: '17.3850, 78.4867'
  });

  // Lead Detail Modal
  const [activeLead, setActiveLead] = useState(null);
  const [leadNotes, setLeadNotes] = useState('');

  // Protect Admin route
  useEffect(() => {
    if (!token) {
      navigate('/admin/login', { replace: true });
      return;
    }
    loadAllData();
  }, [token, navigate]);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  const loadAllData = async () => {
    setLoading(true);
    try {
      const [s, props, cats, projs, enqs, sett, cont, media, cloud] = await Promise.all([
        api.getAdminStats(token),
        api.getProperties(),
        api.getCategories(),
        api.getProjects(),
        api.getEnquiries(token),
        api.getSettings(),
        api.getContent(),
        api.getMediaLibrary(),
        checkSupabaseStatus()
      ]);

      setStats(s);
      setProperties(props);
      setCategories(cats);
      setProjects(projs);
      setEnquiries(enqs);
      setSettings(sett);
      setContent(cont);
      setMediaList(media);
      setCloudStatus(cloud);
    } catch (err) {
      console.error('Failed to load dashboard data:', err);
      showToast('Error syncing dashboard data', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await api.logout();
    navigate('/admin/login', { replace: true });
  };

  // -------------------------------------------------------------
  // Property Actions
  // -------------------------------------------------------------
  const handleOpenAddProperty = (prefillCategory = null) => {
    setEditingPropertyId(null);
    setPropForm({
      title: '',
      categorySlug: prefillCategory || (categories[0]?.slug || 'plots'),
      categoryName: categories.find(c => c.slug === prefillCategory)?.name || categories[0]?.name || 'Plot',
      price: '₹ 65 Lakhs',
      priceNumber: 6500000,
      location: 'Tellapur, Hyderabad',
      city: 'Hyderabad',
      area: '1,500 Sq.Ft',
      areaSqFt: 1500,
      bedrooms: '3 BHK',
      bathrooms: '3 Baths',
      status: 'Available',
      featured: false,
      images: ['https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1000&q=80'],
      description: 'Prime HMDA & DTCP approved property with clear title and high appreciation value.',
      amenities: '100% Vastu, Clear Title Deeds, Immediate Registration, 40ft BT Roads',
      mapCoordinates: '17.3850, 78.4867'
    });
    setPropertyModalOpen(true);
  };

  const handleEditProperty = (prop) => {
    setEditingPropertyId(prop.id);
    setPropForm({
      title: prop.title || '',
      categorySlug: prop.categorySlug || 'plots',
      categoryName: prop.categoryName || 'Plots',
      price: prop.price || '₹ 50 Lakhs',
      priceNumber: prop.priceNumber || 5000000,
      location: prop.location || 'Hyderabad',
      city: prop.city || 'Hyderabad',
      area: prop.area || '1,200 Sq.Ft',
      areaSqFt: prop.areaSqFt || 1200,
      bedrooms: prop.bedrooms || '3 BHK',
      bathrooms: prop.bathrooms || '2 Baths',
      status: prop.status || 'Available',
      featured: Boolean(prop.featured),
      images: Array.isArray(prop.images) ? prop.images : [prop.images].filter(Boolean),
      description: prop.description || '',
      amenities: Array.isArray(prop.amenities) ? prop.amenities.join(', ') : (prop.amenities || ''),
      mapCoordinates: prop.mapCoordinates || '17.3850, 78.4867'
    });
    setPropertyModalOpen(true);
  };

  const handleSaveProperty = async (e) => {
    e.preventDefault();
    try {
      const selectedCat = categories.find(c => c.slug === propForm.categorySlug);
      const payload = {
        ...propForm,
        categoryName: selectedCat ? selectedCat.name : propForm.categoryName
      };

      if (editingPropertyId) {
        await api.updateProperty(editingPropertyId, payload, token);
        showToast('Property updated successfully!');
      } else {
        await api.createProperty(payload, token);
        showToast('New property listing published!');
      }

      setPropertyModalOpen(false);
      loadAllData();
    } catch (err) {
      showToast(err.message || 'Error saving property', 'error');
    }
  };

  const handleDeleteProperty = async (id, title) => {
    if (!window.confirm(`Are you sure you want to permanently delete "${title}"?`)) return;
    try {
      await api.deleteProperty(id, token);
      showToast('Property removed from catalog');
      loadAllData();
    } catch (err) {
      showToast('Failed to delete property', 'error');
    }
  };

  const handleTogglePropertyStatus = async (prop) => {
    const nextStatus = prop.status.toLowerCase() === 'available' ? 'Sold' : 'Available';
    try {
      await api.updateProperty(prop.id, { ...prop, status: nextStatus }, token);
      showToast(`Property marked as ${nextStatus}`);
      loadAllData();
    } catch {
      showToast('Error updating status', 'error');
    }
  };

  const handleToggleFeatured = async (prop) => {
    try {
      await api.updateProperty(prop.id, { ...prop, featured: !prop.featured }, token);
      showToast(prop.featured ? 'Removed from Featured' : 'Added to Featured Listings');
      loadAllData();
    } catch {
      showToast('Error updating featured state', 'error');
    }
  };

  // Image upload handling for properties and media library
  const handleFileUpload = async (file, target = 'property') => {
    if (!file) return;
    setUploadingImage(true);
    try {
      const result = await uploadImage(file);
      if (result.url) {
        // Also save to media library
        await api.saveMediaAsset({
          fileName: file.name || 'Uploaded Photo',
          url: result.url,
          publicId: result.publicId,
          format: result.format,
          bytes: result.bytes,
          associatedSection: target === 'property' ? 'Property Gallery' : 'Media Library'
        });

        if (target === 'property') {
          setPropForm(prev => ({
            ...prev,
            images: [result.url, ...prev.images]
          }));
        }

        showToast('Image uploaded and synced successfully!');
        loadAllData();
      }
    } catch (err) {
      showToast('Image upload failed', 'error');
    } finally {
      setUploadingImage(false);
    }
  };

  // -------------------------------------------------------------
  // Leads Actions
  // -------------------------------------------------------------
  const handleUpdateLeadStatus = async (id, newStatus) => {
    try {
      await api.updateEnquiry(id, { status: newStatus }, token);
      showToast(`Lead status updated to ${newStatus}`);
      loadAllData();
      if (activeLead && activeLead.id === id) {
        setActiveLead(prev => ({ ...prev, status: newStatus }));
      }
    } catch {
      showToast('Failed to update lead status', 'error');
    }
  };

  const handleDeleteLead = async (id) => {
    if (!window.confirm('Delete this inquiry record?')) return;
    try {
      await api.deleteEnquiry(id, token);
      showToast('Lead record deleted');
      setActiveLead(null);
      loadAllData();
    } catch {
      showToast('Failed to delete lead', 'error');
    }
  };

  const exportLeadsToCSV = () => {
    if (enquiries.length === 0) {
      showToast('No inquiries available to export', 'error');
      return;
    }
    const headers = ['ID', 'Date', 'Name', 'Phone', 'Email', 'Property Type', 'Property Title', 'Budget', 'Status', 'Message'];
    const rows = enquiries.map(e => [
      e.id,
      e.createdAt ? new Date(e.createdAt).toLocaleDateString() : '',
      `"${(e.name || '').replace(/"/g, '""')}"`,
      `"${e.phone || ''}"`,
      `"${e.email || ''}"`,
      `"${e.propertyType || ''}"`,
      `"${e.propertyTitle || ''}"`,
      `"${e.budget || ''}"`,
      `"${e.status || 'New'}"`,
      `"${(e.message || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `super-best-properties-leads-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Leads exported to CSV successfully!');
  };

  // -------------------------------------------------------------
  // Settings Actions
  // -------------------------------------------------------------
  const handleSaveSettings = async (e) => {
    e.preventDefault();
    try {
      await api.updateSettings(settings, token);
      showToast('Website settings saved and synced!');
      loadAllData();
    } catch {
      showToast('Failed to save settings', 'error');
    }
  };

  // Copy Supabase SQL Schema
  const handleCopySQL = () => {
    const sqlUrl = '/supabase_schema.sql';
    fetch(sqlUrl)
      .then(res => res.text())
      .then(text => {
        navigator.clipboard.writeText(text);
        showToast('Complete Database SQL Schema copied to clipboard!');
      })
      .catch(() => {
        showToast('Please open supabase_schema.sql from project root', 'error');
      });
  };

  // Filtered properties
  const filteredProperties = properties.filter(p => {
    const matchesSearch = !propSearch || 
      (p.title && p.title.toLowerCase().includes(propSearch.toLowerCase())) ||
      (p.location && p.location.toLowerCase().includes(propSearch.toLowerCase()));
    
    const matchesCat = propCategoryFilter === 'all' || p.categorySlug === propCategoryFilter;
    return matchesSearch && matchesCat;
  });

  // Filtered inquiries
  const filteredEnquiries = enquiries.filter(e => {
    const matchesSearch = !leadSearch ||
      (e.name && e.name.toLowerCase().includes(leadSearch.toLowerCase())) ||
      (e.phone && e.phone.includes(leadSearch)) ||
      (e.propertyTitle && e.propertyTitle.toLowerCase().includes(leadSearch.toLowerCase()));

    const matchesStatus = leadStatusFilter === 'all' || (e.status || 'new').toLowerCase() === leadStatusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans">
      
      {/* Toast Notification */}
      {toast && (
        <div className={`fixed top-5 right-5 z-50 px-5 py-3 rounded-2xl shadow-2xl flex items-center space-x-3 text-sm font-bold border transition-all animate-fade-in ${
          toast.type === 'error'
            ? 'bg-red-950/95 border-red-500/80 text-red-200'
            : 'bg-neutral-900/95 border-gold-400 text-gold-300'
        }`}>
          {toast.type === 'error' ? <AlertCircle className="w-5 h-5 text-red-400" /> : <CheckCircle2 className="w-5 h-5 text-gold-400" />}
          <span>{toast.message}</span>
        </div>
      )}

      {/* TOP EXECUTIVE NAVBAR */}
      <header className="h-16 bg-neutral-900/90 border-b border-neutral-800 sticky top-0 z-40 backdrop-blur-md flex items-center justify-between px-4 sm:px-6">
        
        {/* Left: Mobile Toggle & Brand */}
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>

          <Link to="/admin/dashboard" className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center text-black font-extrabold shadow-md">
              <Building2 className="w-5 h-5 text-black" />
            </div>
            <div className="hidden sm:block">
              <span className="font-serif font-black tracking-wide text-white text-base">
                SUPER BEST <span className="gold-gradient-text">PROPERTIES</span>
              </span>
              <span className="text-[10px] block uppercase font-bold text-neutral-400 -mt-1 tracking-wider">
                Executive CMS Console
              </span>
            </div>
          </Link>
        </div>

        {/* Right Action Icons & Status */}
        <div className="flex items-center space-x-3">
          
          {/* Cloud Database Sync Status */}
          <div className="hidden md:flex items-center space-x-2 px-3 py-1.5 rounded-full bg-neutral-950 border border-neutral-800 text-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-neutral-300 font-semibold">Cloud Sync Active</span>
          </div>

          {/* View Live Public Website */}
          <Link
            to="/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-bold border border-neutral-700 transition-all shadow-sm"
          >
            <ExternalLink className="w-3.5 h-3.5 text-gold-400" />
            <span className="hidden sm:inline">View Website</span>
          </Link>

          {/* Refresh Data */}
          <button
            onClick={loadAllData}
            title="Refresh database records"
            className="p-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-gold-400' : ''}`} />
          </button>

          {/* Logout */}
          <button
            onClick={handleLogout}
            title="Secure Sign Out"
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-red-950/60 hover:bg-red-900/80 text-red-300 text-xs font-bold border border-red-800/40 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Logout</span>
          </button>

        </div>
      </header>

      {/* MAIN LAYOUT: SIDEBAR + CONTENT AREA */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* SIDEBAR NAVIGATION */}
        <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-neutral-900 border-r border-neutral-800 flex flex-col justify-between transition-transform duration-300 lg:static lg:translate-x-0 ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
          
          {/* Sidebar Top Header on Mobile */}
          <div className="p-4 border-b border-neutral-800 flex items-center justify-between lg:hidden">
            <span className="font-bold text-sm text-gold-400">Navigation Menu</span>
            <button onClick={() => setMobileMenuOpen(false)} className="text-neutral-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links Scrollable */}
          <nav className="flex-1 overflow-y-auto p-3 space-y-6 scrollbar-thin">
            
            {/* 1. Core Analytics */}
            <div>
              <span className="px-3 text-[10px] font-extrabold uppercase tracking-wider text-neutral-500">
                Core & Analytics
              </span>
              <div className="mt-1 space-y-1">
                <button
                  onClick={() => { setActiveTab('overview'); setMobileMenuOpen(false); }}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-xl text-xs font-bold transition-colors ${
                    activeTab === 'overview' ? 'bg-gold-500 text-black shadow-md' : 'text-neutral-300 hover:bg-neutral-800 hover:text-white'
                  }`}
                >
                  <TrendingUp className="w-4 h-4 shrink-0" />
                  <span>Dashboard Overview</span>
                </button>
              </div>
            </div>

            {/* 2. Property Management */}
            <div>
              <span className="px-3 text-[10px] font-extrabold uppercase tracking-wider text-neutral-500">
                Property Portfolio
              </span>
              <div className="mt-1 space-y-1">
                <button
                  onClick={() => { setActiveTab('properties'); setMobileMenuOpen(false); }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-colors ${
                    activeTab === 'properties' ? 'bg-gold-500 text-black shadow-md' : 'text-neutral-300 hover:bg-neutral-800 hover:text-white'
                  }`}
                >
                  <span className="flex items-center space-x-3">
                    <Building2 className="w-4 h-4 shrink-0" />
                    <span>All Properties</span>
                  </span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${activeTab === 'properties' ? 'bg-black text-gold-400' : 'bg-neutral-800 text-neutral-400'}`}>
                    {properties.length}
                  </span>
                </button>

                <button
                  onClick={() => { setActiveTab('categories'); setMobileMenuOpen(false); }}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-xl text-xs font-bold transition-colors ${
                    activeTab === 'categories' ? 'bg-gold-500 text-black' : 'text-neutral-300 hover:bg-neutral-800'
                  }`}
                >
                  <Layers className="w-4 h-4 shrink-0" />
                  <span>15 Categories</span>
                </button>

                <button
                  onClick={() => { setActiveTab('projects'); setMobileMenuOpen(false); }}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-xl text-xs font-bold transition-colors ${
                    activeTab === 'projects' ? 'bg-gold-500 text-black' : 'text-neutral-300 hover:bg-neutral-800'
                  }`}
                >
                  <Sparkles className="w-4 h-4 shrink-0" />
                  <span>Landmark Projects</span>
                </button>
              </div>
            </div>

            {/* 3. Customer Inquiries & Leads */}
            <div>
              <span className="px-3 text-[10px] font-extrabold uppercase tracking-wider text-neutral-500">
                Client Relations
              </span>
              <div className="mt-1 space-y-1">
                <button
                  onClick={() => { setActiveTab('inquiries'); setMobileMenuOpen(false); }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-colors ${
                    activeTab === 'inquiries' ? 'bg-gold-500 text-black shadow-md' : 'text-neutral-300 hover:bg-neutral-800 hover:text-white'
                  }`}
                >
                  <span className="flex items-center space-x-3">
                    <Users className="w-4 h-4 shrink-0" />
                    <span>Leads & Inquiries</span>
                  </span>
                  {stats?.newLeads > 0 && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-emerald-500 text-black animate-pulse">
                      {stats.newLeads} NEW
                    </span>
                  )}
                </button>
              </div>
            </div>

            {/* 4. Website Content & Sections */}
            <div>
              <span className="px-3 text-[10px] font-extrabold uppercase tracking-wider text-neutral-500">
                Website Content
              </span>
              <div className="mt-1 space-y-1">
                <button
                  onClick={() => { setActiveTab('hero'); setMobileMenuOpen(false); }}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-xl text-xs font-bold transition-colors ${
                    activeTab === 'hero' ? 'bg-gold-500 text-black' : 'text-neutral-300 hover:bg-neutral-800'
                  }`}
                >
                  <Sliders className="w-4 h-4 shrink-0" />
                  <span>Hero Slideshow</span>
                </button>

                <button
                  onClick={() => { setActiveTab('services'); setMobileMenuOpen(false); }}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-xl text-xs font-bold transition-colors ${
                    activeTab === 'services' ? 'bg-gold-500 text-black' : 'text-neutral-300 hover:bg-neutral-800'
                  }`}
                >
                  <Award className="w-4 h-4 shrink-0" />
                  <span>7 Advisory Services</span>
                </button>

                <button
                  onClick={() => { setActiveTab('about'); setMobileMenuOpen(false); }}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-xl text-xs font-bold transition-colors ${
                    activeTab === 'about' ? 'bg-gold-500 text-black' : 'text-neutral-300 hover:bg-neutral-800'
                  }`}
                >
                  <FileText className="w-4 h-4 shrink-0" />
                  <span>About & Founder Story</span>
                </button>
              </div>
            </div>

            {/* 5. Media & Cloud Engine */}
            <div>
              <span className="px-3 text-[10px] font-extrabold uppercase tracking-wider text-neutral-500">
                Media & System
              </span>
              <div className="mt-1 space-y-1">
                <button
                  onClick={() => { setActiveTab('media'); setMobileMenuOpen(false); }}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-xl text-xs font-bold transition-colors ${
                    activeTab === 'media' ? 'bg-gold-500 text-black' : 'text-neutral-300 hover:bg-neutral-800'
                  }`}
                >
                  <Image className="w-4 h-4 shrink-0" />
                  <span>Media Library</span>
                </button>

                <button
                  onClick={() => { setActiveTab('database_sync'); setMobileMenuOpen(false); }}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-xl text-xs font-bold transition-colors ${
                    activeTab === 'database_sync' ? 'bg-gold-500 text-black' : 'text-neutral-300 hover:bg-neutral-800'
                  }`}
                >
                  <Database className="w-4 h-4 shrink-0 text-emerald-400" />
                  <span>Cloud Database Sync</span>
                </button>

                <button
                  onClick={() => { setActiveTab('settings'); setMobileMenuOpen(false); }}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-xl text-xs font-bold transition-colors ${
                    activeTab === 'settings' ? 'bg-gold-500 text-black' : 'text-neutral-300 hover:bg-neutral-800'
                  }`}
                >
                  <Settings className="w-4 h-4 shrink-0" />
                  <span>Website Settings</span>
                </button>
              </div>
            </div>

          </nav>

          {/* Sidebar Footer User Info */}
          <div className="p-3 border-t border-neutral-800">
            <div className="flex items-center space-x-3 px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800">
              <div className="w-8 h-8 rounded-full bg-gold-500 text-black font-extrabold flex items-center justify-center text-xs">
                AD
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-white truncate">Administrator</p>
                <p className="text-[10px] text-emerald-400 font-medium">Session Verified</p>
              </div>
            </div>
          </div>

        </aside>

        {/* Backdrop for mobile */}
        {mobileMenuOpen && (
          <div 
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-sm"
          ></div>
        )}

        {/* WORKSPACE AREA */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-neutral-950">
          
          {/* ======================================================== */}
          {/* TAB 1: DASHBOARD OVERVIEW */}
          {/* ======================================================== */}
          {activeTab === 'overview' && (
            <div className="space-y-8 animate-fade-in">
              
              {/* Header Title */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-serif font-black text-white">
                    Executive Dashboard
                  </h1>
                  <p className="text-xs sm:text-sm text-neutral-400 mt-1">
                    Real-time property metrics, customer inquiry pipeline, and website control.
                  </p>
                </div>
                
                <div className="flex gap-2">
                  <button
                    onClick={() => handleOpenAddProperty()}
                    className="py-2.5 px-4 rounded-xl gold-gradient-btn text-black font-extrabold text-xs flex items-center space-x-1.5 shadow-lg"
                  >
                    <Plus className="w-4 h-4 text-black" />
                    <span>Add New Property</span>
                  </button>
                </div>
              </div>

              {/* Statistics 4-Card Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                
                <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5 hover:border-gold-500/50 transition-colors">
                  <div className="flex items-center justify-between text-neutral-400 text-xs font-bold uppercase">
                    <span>Total Properties</span>
                    <Building2 className="w-5 h-5 text-gold-400" />
                  </div>
                  <div className="mt-3 text-3xl font-black text-white">
                    {stats?.totalProperties || properties.length}
                  </div>
                  <div className="mt-1 text-xs text-emerald-400 font-semibold flex items-center space-x-1">
                    <span>{stats?.availableProperties || 0} Available for sale</span>
                  </div>
                </div>

                <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5 hover:border-gold-500/50 transition-colors">
                  <div className="flex items-center justify-between text-neutral-400 text-xs font-bold uppercase">
                    <span>Customer Leads</span>
                    <Users className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div className="mt-3 text-3xl font-black text-white">
                    {stats?.totalEnquiries || enquiries.length}
                  </div>
                  <div className="mt-1 text-xs text-gold-400 font-semibold flex items-center space-x-1">
                    <span>{stats?.newLeads || 0} Pending follow-up</span>
                  </div>
                </div>

                <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5 hover:border-gold-500/50 transition-colors">
                  <div className="flex items-center justify-between text-neutral-400 text-xs font-bold uppercase">
                    <span>Categories Active</span>
                    <Layers className="w-5 h-5 text-purple-400" />
                  </div>
                  <div className="mt-3 text-3xl font-black text-white">
                    {categories.length}
                  </div>
                  <div className="mt-1 text-xs text-neutral-400 font-semibold">
                    Plots, Villas, Houses & Flats
                  </div>
                </div>

                <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5 hover:border-gold-500/50 transition-colors">
                  <div className="flex items-center justify-between text-neutral-400 text-xs font-bold uppercase">
                    <span>Cloud Sync</span>
                    <Database className="w-5 h-5 text-blue-400" />
                  </div>
                  <div className="mt-3 text-xl font-black text-white truncate">
                    100% Synced
                  </div>
                  <div className="mt-1 text-xs text-emerald-400 font-semibold">
                    Realtime Updates Enabled
                  </div>
                </div>

              </div>

              {/* Two-Column Quick Views: Recent Inquiries & Featured Properties */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* Recent Inquiries List */}
                <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6">
                  <div className="flex items-center justify-between mb-5">
                    <h3 className="font-serif font-bold text-lg text-white flex items-center space-x-2">
                      <Users className="w-5 h-5 text-gold-400" />
                      <span>Recent Customer Enquiries</span>
                    </h3>
                    <button
                      onClick={() => setActiveTab('inquiries')}
                      className="text-xs font-bold text-gold-400 hover:text-gold-300"
                    >
                      View All ({enquiries.length}) →
                    </button>
                  </div>

                  {enquiries.length === 0 ? (
                    <p className="text-xs text-neutral-500 py-6 text-center">No customer inquiries yet.</p>
                  ) : (
                    <div className="space-y-3">
                      {enquiries.slice(0, 4).map(enq => (
                        <div key={enq.id} className="p-3.5 rounded-2xl bg-neutral-950 border border-neutral-800 flex items-center justify-between hover:border-neutral-700 transition-colors">
                          <div>
                            <div className="flex items-center space-x-2">
                              <span className="font-bold text-sm text-white">{enq.name}</span>
                              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                (enq.status || 'new').toLowerCase() === 'new'
                                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                                  : 'bg-neutral-800 text-neutral-300'
                              }`}>
                                {enq.status || 'New'}
                              </span>
                            </div>
                            <p className="text-xs text-neutral-400 mt-0.5">
                              {enq.propertyType} • {enq.phone}
                            </p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <a
                              href={`https://wa.me/91${(enq.phone || '').replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hello ${enq.name}, thank you for contacting Super Best Properties regarding ${enq.propertyType || 'properties'}.`)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 rounded-xl bg-emerald-950/60 text-emerald-400 hover:bg-emerald-900 border border-emerald-800/40"
                              title="Chat on WhatsApp"
                            >
                              <MessageCircle className="w-4 h-4" />
                            </a>
                            <a
                              href={`tel:${enq.phone}`}
                              className="p-2 rounded-xl bg-neutral-800 text-neutral-300 hover:bg-neutral-700"
                              title="Call Customer"
                            >
                              <PhoneCall className="w-4 h-4" />
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Quick Property Management List */}
                <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6">
                  <div className="flex items-center justify-between mb-5">
                    <h3 className="font-serif font-bold text-lg text-white flex items-center space-x-2">
                      <Building2 className="w-5 h-5 text-gold-400" />
                      <span>Featured Listings</span>
                    </h3>
                    <button
                      onClick={() => setActiveTab('properties')}
                      className="text-xs font-bold text-gold-400 hover:text-gold-300"
                    >
                      Manage Properties →
                    </button>
                  </div>

                  <div className="space-y-3">
                    {properties.filter(p => p.featured).slice(0, 4).map(prop => (
                      <div key={prop.id} className="p-3 rounded-2xl bg-neutral-950 border border-neutral-800 flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <img
                            src={Array.isArray(prop.images) ? prop.images[0] : prop.images}
                            alt=""
                            className="w-12 h-12 rounded-xl object-cover border border-neutral-800 shrink-0"
                          />
                          <div>
                            <h4 className="font-bold text-sm text-white line-clamp-1">{prop.title}</h4>
                            <p className="text-xs text-gold-400 font-semibold">{prop.price} • {prop.location}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => handleEditProperty(prop)}
                          className="p-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 2: PROPERTIES MANAGEMENT (CRUD) */}
          {/* ======================================================== */}
          {activeTab === 'properties' && (
            <div className="space-y-6 animate-fade-in">
              
              {/* Header & Add Button */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-serif font-black text-white">
                    Property Portfolio Management
                  </h1>
                  <p className="text-xs sm:text-sm text-neutral-400 mt-1">
                    Manage all public property listings, price ranges, images, and live visibility.
                  </p>
                </div>

                <button
                  onClick={() => handleOpenAddProperty()}
                  className="py-3 px-5 rounded-xl gold-gradient-btn text-black font-extrabold text-sm flex items-center space-x-2 shadow-lg"
                >
                  <Plus className="w-4 h-4 text-black" />
                  <span>Add Property Listing</span>
                </button>
              </div>

              {/* Filters Bar */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-neutral-900 border border-neutral-800">
                
                {/* Search query */}
                <div className="relative">
                  <Search className="w-4 h-4 text-neutral-500 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    value={propSearch}
                    onChange={(e) => setPropSearch(e.target.value)}
                    placeholder="Search title, location..."
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-gold-500"
                  />
                </div>

                {/* Category Filter */}
                <div>
                  <select
                    value={propCategoryFilter}
                    onChange={(e) => setPropCategoryFilter(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-xs text-neutral-300 focus:outline-none focus:border-gold-500"
                  >
                    <option value="all">All Categories ({properties.length})</option>
                    {categories.map(c => (
                      <option key={c.slug} value={c.slug}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center justify-between text-xs text-neutral-400 px-2 font-semibold">
                  <span>Showing {filteredProperties.length} of {properties.length} listings</span>
                  {(propSearch || propCategoryFilter !== 'all') && (
                    <button
                      onClick={() => { setPropSearch(''); setPropCategoryFilter('all'); }}
                      className="text-gold-400 hover:underline"
                    >
                      Reset filters
                    </button>
                  )}
                </div>

              </div>

              {/* Properties Grid Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProperties.map(prop => {
                  const img = Array.isArray(prop.images) ? prop.images[0] : prop.images;
                  const isAvailable = (prop.status || 'available').toLowerCase() === 'available';

                  return (
                    <div 
                      key={prop.id}
                      className="bg-neutral-900 border border-neutral-800 hover:border-gold-500/40 rounded-3xl overflow-hidden flex flex-col justify-between transition-all group shadow-md"
                    >
                      {/* Image Thumbnail with Badges */}
                      <div className="relative h-48 w-full overflow-hidden bg-neutral-950">
                        <img
                          src={img}
                          alt={prop.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                          <span className="px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md text-[10px] font-bold text-gold-300 uppercase tracking-wider border border-gold-400/40">
                            {prop.categoryName || prop.categorySlug}
                          </span>
                          {prop.featured && (
                            <span className="px-2.5 py-1 rounded-full bg-gold-500 text-black text-[10px] font-extrabold uppercase tracking-wider shadow">
                              Featured
                            </span>
                          )}
                        </div>

                        <div className="absolute top-3 right-3">
                          <button
                            onClick={() => handleTogglePropertyStatus(prop)}
                            className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all shadow ${
                              isAvailable
                                ? 'bg-emerald-500 text-black'
                                : 'bg-red-500 text-white'
                            }`}
                            title="Click to toggle Available / Sold"
                          >
                            {prop.status}
                          </button>
                        </div>

                        <div className="absolute bottom-3 left-3 bg-black/85 backdrop-blur-md px-3 py-1 rounded-xl text-xs font-black text-white border border-neutral-700">
                          {prop.price}
                        </div>
                      </div>

                      {/* Content details */}
                      <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                        <div>
                          <h3 className="font-serif font-bold text-base text-white line-clamp-1">
                            {prop.title}
                          </h3>
                          <p className="text-xs text-neutral-400 mt-1 flex items-center space-x-1">
                            <MapPin className="w-3.5 h-3.5 text-gold-400 shrink-0" />
                            <span className="truncate">{prop.location}</span>
                          </p>
                        </div>

                        <div className="grid grid-cols-3 gap-2 pt-3 border-t border-neutral-800 text-center text-[11px] text-neutral-300 font-semibold">
                          <div className="p-1.5 rounded-lg bg-neutral-950">
                            {prop.bedrooms || 'Unit'}
                          </div>
                          <div className="p-1.5 rounded-lg bg-neutral-950">
                            {prop.area || 'Spacious'}
                          </div>
                          <div className="p-1.5 rounded-lg bg-neutral-950">
                            {prop.city || 'Hyderabad'}
                          </div>
                        </div>

                        {/* Card actions */}
                        <div className="pt-3 border-t border-neutral-800 flex items-center justify-between">
                          <button
                            onClick={() => handleToggleFeatured(prop)}
                            className={`text-xs font-bold ${prop.featured ? 'text-gold-400 hover:text-gold-300' : 'text-neutral-500 hover:text-neutral-300'}`}
                          >
                            ★ {prop.featured ? 'Featured' : 'Make Featured'}
                          </button>

                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => handleEditProperty(prop)}
                              className="p-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200"
                              title="Edit Property"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteProperty(prop.id, prop.title)}
                              className="p-2 rounded-xl bg-red-950/60 hover:bg-red-900 text-red-300"
                              title="Delete Property"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                      </div>

                    </div>
                  );
                })}
              </div>

            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 3: CUSTOMER LEADS & INQUIRIES */}
          {/* ======================================================== */}
          {activeTab === 'inquiries' && (
            <div className="space-y-6 animate-fade-in">
              
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-serif font-black text-white">
                    Customer Leads & Inquiries
                  </h1>
                  <p className="text-xs sm:text-sm text-neutral-400 mt-1">
                    Direct inquiries submitted through website forms and WhatsApp lead funnels.
                  </p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={exportLeadsToCSV}
                    className="py-2.5 px-4 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-bold flex items-center space-x-2 border border-neutral-700 shadow"
                  >
                    <Download className="w-4 h-4 text-gold-400" />
                    <span>Export CSV</span>
                  </button>
                </div>
              </div>

              {/* Filter Row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-neutral-900 border border-neutral-800">
                <div className="relative">
                  <Search className="w-4 h-4 text-neutral-500 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    value={leadSearch}
                    onChange={(e) => setLeadSearch(e.target.value)}
                    placeholder="Search by customer name, phone, property..."
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-gold-500"
                  />
                </div>

                <div>
                  <select
                    value={leadStatusFilter}
                    onChange={(e) => setLeadStatusFilter(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-xs text-neutral-300 focus:outline-none focus:border-gold-500"
                  >
                    <option value="all">All Lead Statuses ({enquiries.length})</option>
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="interested">Interested</option>
                    <option value="follow-up required">Follow-up Required</option>
                    <option value="converted">Converted</option>
                    <option value="closed">Closed</option>
                  </select>
                </div>

                <div className="flex items-center justify-between text-xs text-neutral-400 px-2 font-semibold">
                  <span>{filteredEnquiries.length} Inquiries Found</span>
                  {(leadSearch || leadStatusFilter !== 'all') && (
                    <button onClick={() => { setLeadSearch(''); setLeadStatusFilter('all'); }} className="text-gold-400 hover:underline">
                      Reset
                    </button>
                  )}
                </div>
              </div>

              {/* Inquiries Table */}
              <div className="bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden shadow-xl">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-neutral-950 border-b border-neutral-800 text-[11px] font-extrabold uppercase text-neutral-400 tracking-wider">
                      <tr>
                        <th className="py-4 px-5">Date</th>
                        <th className="py-4 px-5">Customer Name</th>
                        <th className="py-4 px-5">Contact Details</th>
                        <th className="py-4 px-5">Requirement / Property</th>
                        <th className="py-4 px-5">Status</th>
                        <th className="py-4 px-5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-800/60 font-medium">
                      {filteredEnquiries.length === 0 ? (
                        <tr>
                          <td colSpan="6" className="py-12 text-center text-neutral-500">
                            No inquiries found matching your filters.
                          </td>
                        </tr>
                      ) : (
                        filteredEnquiries.map(enq => (
                          <tr key={enq.id} className="hover:bg-neutral-800/40 transition-colors">
                            
                            <td className="py-4 px-5 text-neutral-400 whitespace-nowrap">
                              {enq.createdAt ? new Date(enq.createdAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : 'Recent'}
                            </td>

                            <td className="py-4 px-5 font-bold text-white whitespace-nowrap">
                              {enq.name}
                            </td>

                            <td className="py-4 px-5 text-neutral-300 whitespace-nowrap">
                              <div>{enq.phone}</div>
                              {enq.email && <div className="text-[11px] text-neutral-500">{enq.email}</div>}
                            </td>

                            <td className="py-4 px-5">
                              <span className="font-bold text-gold-400">{enq.propertyType || 'General Enquiry'}</span>
                              {enq.propertyTitle && <p className="text-[11px] text-neutral-400 line-clamp-1">{enq.propertyTitle}</p>}
                              {enq.message && <p className="text-[11px] text-neutral-500 italic line-clamp-1 mt-0.5">"{enq.message}"</p>}
                            </td>

                            <td className="py-4 px-5 whitespace-nowrap">
                              <select
                                value={enq.status || 'New'}
                                onChange={(e) => handleUpdateLeadStatus(enq.id, e.target.value)}
                                className={`px-2.5 py-1 rounded-xl text-xs font-bold border focus:outline-none ${
                                  (enq.status || 'new').toLowerCase() === 'new'
                                    ? 'bg-emerald-950/80 text-emerald-400 border-emerald-500/50'
                                    : (enq.status || '').toLowerCase() === 'converted'
                                    ? 'bg-gold-950/80 text-gold-300 border-gold-500/50'
                                    : 'bg-neutral-950 text-neutral-300 border-neutral-700'
                                }`}
                              >
                                <option value="New">New</option>
                                <option value="Contacted">Contacted</option>
                                <option value="Interested">Interested</option>
                                <option value="Follow-up Required">Follow-up Required</option>
                                <option value="Converted">Converted</option>
                                <option value="Closed">Closed</option>
                              </select>
                            </td>

                            <td className="py-4 px-5 text-right whitespace-nowrap space-x-1.5">
                              <a
                                href={`https://wa.me/91${(enq.phone || '').replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hello ${enq.name}, this is Super Best Properties regarding your property enquiry.`)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex p-2 rounded-xl bg-emerald-950 text-emerald-400 hover:bg-emerald-900 border border-emerald-800"
                                title="Open WhatsApp Chat"
                              >
                                <MessageCircle className="w-3.5 h-3.5" />
                              </a>
                              <a
                                href={`tel:${enq.phone}`}
                                className="inline-flex p-2 rounded-xl bg-neutral-800 text-neutral-300 hover:bg-neutral-700"
                                title="Call Customer"
                              >
                                <PhoneCall className="w-3.5 h-3.5" />
                              </a>
                              <button
                                onClick={() => handleDeleteLead(enq.id)}
                                className="inline-flex p-2 rounded-xl bg-red-950 text-red-300 hover:bg-red-900"
                                title="Delete Lead"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </td>

                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 4: MEDIA LIBRARY (CLOUDINARY POWERED) */}
          {/* ======================================================== */}
          {activeTab === 'media' && (
            <div className="space-y-6 animate-fade-in">
              
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-serif font-black text-white">
                    Cloud Media Library
                  </h1>
                  <p className="text-xs sm:text-sm text-neutral-400 mt-1">
                    Upload, store, and manage ultra-HD property images and banners with high-speed CDN delivery.
                  </p>
                </div>

                <label className="py-3 px-5 rounded-xl gold-gradient-btn text-black font-extrabold text-sm flex items-center space-x-2 shadow-lg cursor-pointer hover:scale-105 active:scale-95 transition-all">
                  <Upload className="w-4 h-4 text-black" />
                  <span>{uploadingImage ? 'Uploading...' : 'Upload Image'}</span>
                  <input
                    type="file"
                    accept="image/*"
                    disabled={uploadingImage}
                    onChange={(e) => {
                      if (e.target.files?.[0]) handleFileUpload(e.target.files[0], 'media');
                    }}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Media Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {mediaList.map((media) => (
                  <div key={media.id} className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden group shadow-md flex flex-col justify-between">
                    <div className="h-36 w-full overflow-hidden bg-neutral-950 relative">
                      <img
                        src={media.url}
                        alt={media.fileName}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-3">
                      <p className="text-xs font-bold text-white truncate">{media.fileName}</p>
                      <div className="mt-2 flex items-center justify-between pt-2 border-t border-neutral-800">
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(media.url);
                            showToast('Direct image URL copied!');
                          }}
                          className="p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-[10px] font-bold flex items-center space-x-1"
                          title="Copy Link"
                        >
                          <Copy className="w-3 h-3" />
                          <span>Copy</span>
                        </button>
                        <button
                          onClick={async () => {
                            if (window.confirm('Delete this image from Media Library?')) {
                              await api.deleteMediaAsset(media.id);
                              showToast('Image removed from library');
                              loadAllData();
                            }
                          }}
                          className="p-1.5 rounded-lg bg-red-950 text-red-300 hover:bg-red-900"
                          title="Delete image"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 5: CLOUD DATABASE SYNC & SCHEMA SETUP */}
          {/* ======================================================== */}
          {activeTab === 'database_sync' && (
            <div className="space-y-6 animate-fade-in max-w-4xl">
              
              <div>
                <h1 className="text-2xl sm:text-3xl font-serif font-black text-white">
                  Cloud Database Architecture
                </h1>
                <p className="text-xs sm:text-sm text-neutral-400 mt-1">
                  Manage real-time database schema, synchronize live records, and view connectivity.
                </p>
              </div>

              {/* Status Card */}
              <div className="p-6 rounded-3xl bg-neutral-900 border border-neutral-800 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                      <Database className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-base text-white">Production Database Engine</h3>
                      <p className="text-xs text-neutral-400">Status: Connected & Resilient Local Fallback Active</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                    Live Active
                  </span>
                </div>

                <p className="text-xs text-neutral-300 leading-relaxed">
                  Your project is configured with a resilient dual-layer architecture: all data is stored with instant real-time synchronization, and local persistence ensures the public website never experiences downtime or broken cards.
                </p>

                {/* 1-Click Copy Schema Button */}
                <div className="pt-3 border-t border-neutral-800 flex flex-wrap gap-3">
                  <button
                    onClick={handleCopySQL}
                    className="py-2.5 px-5 rounded-xl gold-gradient-btn text-black font-extrabold text-xs flex items-center space-x-2 shadow-lg"
                  >
                    <Copy className="w-4 h-4 text-black" />
                    <span>Copy Complete SQL Setup Script</span>
                  </button>

                  <a
                    href="https://supabase.com/dashboard/project/gidrbkijntosrjaapiua/sql"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2.5 px-4 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-bold flex items-center space-x-1.5 border border-neutral-700"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-gold-400" />
                    <span>Open Cloud SQL Console</span>
                  </a>
                </div>

              </div>

              {/* Schema Instructions */}
              <div className="p-6 rounded-3xl bg-neutral-900 border border-neutral-800 space-y-3">
                <h4 className="font-bold text-sm text-gold-400 uppercase tracking-wider">
                  How to verify your tables in 10 seconds:
                </h4>
                <ol className="list-decimal list-inside text-xs text-neutral-300 space-y-2">
                  <li>Click <strong>"Copy Complete SQL Setup Script"</strong> above.</li>
                  <li>Click <strong>"Open Cloud SQL Console"</strong> to open your project's SQL editor.</li>
                  <li>Paste the script into the editor and click <strong>Run</strong>.</li>
                  <li>All tables (properties, categories, inquiries, services, testimonials) and RLS security policies will be automatically deployed!</li>
                </ol>
              </div>

            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 6: WEBSITE SETTINGS */}
          {/* ======================================================== */}
          {activeTab === 'settings' && settings && (
            <div className="space-y-6 animate-fade-in max-w-4xl">
              
              <div>
                <h1 className="text-2xl sm:text-3xl font-serif font-black text-white">
                  General Website Settings
                </h1>
                <p className="text-xs sm:text-sm text-neutral-400 mt-1">
                  Manage business contact numbers, official address, WhatsApp configurations, and SEO tags.
                </p>
              </div>

              <form onSubmit={handleSaveSettings} className="p-7 rounded-3xl bg-neutral-900 border border-neutral-800 space-y-6">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-neutral-400 mb-1">Website Name</label>
                    <input
                      type="text"
                      value={settings.siteName || ''}
                      onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-gold-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-neutral-400 mb-1">Tagline</label>
                    <input
                      type="text"
                      value={settings.tagline || ''}
                      onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-gold-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-neutral-400 mb-1">Business Phone Number</label>
                    <input
                      type="text"
                      value={settings.phone || ''}
                      onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-gold-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-neutral-400 mb-1">WhatsApp Target Number</label>
                    <input
                      type="text"
                      value={settings.whatsappNumber || ''}
                      onChange={(e) => setSettings({ ...settings, whatsappNumber: e.target.value })}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-gold-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-neutral-400 mb-1">Official Office Address</label>
                  <textarea
                    rows="2"
                    value={settings.address || ''}
                    onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-gold-500"
                  />
                </div>

                <div className="pt-4 border-t border-neutral-800 flex justify-end">
                  <button
                    type="submit"
                    className="py-3 px-6 rounded-xl gold-gradient-btn text-black font-extrabold text-xs shadow-lg hover:scale-105 active:scale-95 transition-all"
                  >
                    Save & Publish Settings
                  </button>
                </div>

              </form>

            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 7: CATEGORIES (15 CATEGORIES MANAGER) */}
          {/* ======================================================== */}
          {activeTab === 'categories' && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h1 className="text-2xl sm:text-3xl font-serif font-black text-white">
                  15 Real Estate Categories
                </h1>
                <p className="text-xs sm:text-sm text-neutral-400 mt-1">
                  Organize listings by category: Plots, Flats, Villas, Commercial, Agriculture Land, etc.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {categories.map((c, idx) => (
                  <div key={c.slug} className="p-5 rounded-2xl bg-neutral-900 border border-neutral-800 flex flex-col justify-between space-y-3">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-gold-400 uppercase tracking-wider">#{idx + 1}</span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-neutral-950 text-neutral-400">
                          {c.propertyCount || 0} listings
                        </span>
                      </div>
                      <h3 className="font-bold text-base text-white mt-1">{c.name}</h3>
                      <p className="text-xs text-neutral-400 mt-1 line-clamp-2">{c.description}</p>
                    </div>

                    <div className="pt-3 border-t border-neutral-800 flex items-center justify-between text-xs">
                      <code className="text-[10px] text-neutral-500">/{c.slug}</code>
                      <button
                        onClick={() => {
                          const newName = window.prompt(`Rename "${c.name}" category:`, c.name);
                          if (newName && newName !== c.name) {
                            api.updateCategory(c.slug, { ...c, name: newName }, token)
                              .then(() => {
                                showToast('Category updated!');
                                loadAllData();
                              });
                          }
                        }}
                        className="text-gold-400 hover:text-gold-300 font-bold"
                      >
                        Edit Name
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 8: HERO SLIDESHOW MANAGEMENT */}
          {/* ======================================================== */}
          {activeTab === 'hero' && (
            <div className="space-y-6 animate-fade-in max-w-4xl">
              <div>
                <h1 className="text-2xl sm:text-3xl font-serif font-black text-white">
                  Hero Slideshow Manager
                </h1>
                <p className="text-xs sm:text-sm text-neutral-400 mt-1">
                  Inspect the 4 high-resolution rotating hero banners, captions, and slide transitions.
                </p>
              </div>

              <div className="space-y-4">
                {[
                  { id: 1, title: 'Find Your Perfect Property', sub: 'Plots | Flats | Houses | Villas', loc: 'Tellapur, Shamshabad & Kompally' },
                  { id: 2, title: 'Invest In Luxury Gated Villas', sub: 'Clubhouse | 24/7 Security | High Appreciation', loc: 'Financial District & Tellapur' },
                  { id: 3, title: 'Commercial & Corporate Hubs', sub: 'Grade-A Offices | Retail Hubs | Warehousing', loc: 'Madhapur & Gachibowli Corridor' },
                  { id: 4, title: 'Invest In Prime Open Plots', sub: 'Clear Titles | Immediate Registration | High ROI', loc: 'Airport Growth Corridor' }
                ].map(s => (
                  <div key={s.id} className="p-5 rounded-2xl bg-neutral-900 border border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <span className="text-[10px] font-bold text-gold-400 uppercase tracking-wider">Slide #{s.id}</span>
                      <h4 className="font-bold text-base text-white mt-0.5">{s.title}</h4>
                      <p className="text-xs text-neutral-400">{s.sub} • {s.loc}</p>
                    </div>
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                      Auto-Slide Active (6s)
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 9: ADVISORY SERVICES */}
          {/* ======================================================== */}
          {activeTab === 'services' && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h1 className="text-2xl sm:text-3xl font-serif font-black text-white">
                  7 Professional Advisory Services
                </h1>
                <p className="text-xs sm:text-sm text-neutral-400 mt-1">
                  Each service includes verified deliverables and direct "Enquire Now" WhatsApp routing.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  'Residential Property Advisory',
                  'Commercial Property Solutions',
                  'Property Investment Advisory',
                  'Land & Development Opportunities',
                  'Property Buying & Selling Assistance',
                  'Legal & Documentation Assistance',
                  'Bank Loan & Financial Assistance'
                ].map((title, i) => (
                  <div key={i} className="p-6 rounded-3xl bg-neutral-900 border border-neutral-800 flex flex-col justify-between space-y-4">
                    <div>
                      <span className="text-[10px] font-bold text-gold-400 uppercase tracking-wider">Service #{i + 1}</span>
                      <h3 className="font-bold text-base text-white mt-1">{title}</h3>
                      <p className="text-xs text-neutral-400 mt-2">
                        Includes HMDA/DTCP checks, market benchmarking, and direct WhatsApp advisor contact.
                      </p>
                    </div>
                    <div className="pt-3 border-t border-neutral-800 flex items-center justify-between text-xs">
                      <span className="text-emerald-400 font-bold">Enquire Now Active</span>
                      <span className="text-neutral-500">Auto-routed</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </main>

      </div>

      {/* ============================================================ */}
      {/* ADD / EDIT PROPERTY MODAL */}
      {/* ============================================================ */}
      {propertyModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-neutral-900 border border-neutral-800 rounded-3xl max-w-2xl w-full p-6 sm:p-8 my-8 shadow-2xl animate-fade-in max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
              <h2 className="text-xl font-serif font-bold text-white">
                {editingPropertyId ? 'Edit Property Listing' : 'Add New Property Listing'}
              </h2>
              <button
                onClick={() => setPropertyModalOpen(false)}
                className="p-1 rounded-xl text-neutral-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProperty} className="mt-6 space-y-4">
              
              <div>
                <label className="block text-xs font-bold uppercase text-neutral-300 mb-1">Property Title *</label>
                <input
                  type="text"
                  required
                  value={propForm.title}
                  onChange={(e) => setPropForm({ ...propForm, title: e.target.value })}
                  placeholder="e.g. Ultra Luxury Villa in Tellapur"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-gold-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-neutral-300 mb-1">Category *</label>
                  <select
                    value={propForm.categorySlug}
                    onChange={(e) => setPropForm({ ...propForm, categorySlug: e.target.value })}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-gold-500"
                  >
                    {categories.map(c => (
                      <option key={c.slug} value={c.slug}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-neutral-300 mb-1">Price Label *</label>
                  <input
                    type="text"
                    required
                    value={propForm.price}
                    onChange={(e) => setPropForm({ ...propForm, price: e.target.value })}
                    placeholder="e.g. ₹ 85 Lakhs or ₹ 1.5 Cr"
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-gold-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-neutral-300 mb-1">Location *</label>
                  <input
                    type="text"
                    required
                    value={propForm.location}
                    onChange={(e) => setPropForm({ ...propForm, location: e.target.value })}
                    placeholder="e.g. Tellapur, Hyderabad"
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-gold-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-neutral-300 mb-1">Area / Size</label>
                  <input
                    type="text"
                    value={propForm.area}
                    onChange={(e) => setPropForm({ ...propForm, area: e.target.value })}
                    placeholder="e.g. 1,800 Sq.Ft or 200 Sq.Yds"
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-gold-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-neutral-300 mb-1">Bedrooms / Type</label>
                  <input
                    type="text"
                    value={propForm.bedrooms}
                    onChange={(e) => setPropForm({ ...propForm, bedrooms: e.target.value })}
                    placeholder="e.g. 3 BHK or Plot"
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-gold-500"
                  />
                </div>
              </div>

              {/* Image Upload Input */}
              <div>
                <label className="block text-xs font-bold uppercase text-neutral-300 mb-1">Property Images</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={propForm.images[0] || ''}
                    onChange={(e) => setPropForm({ ...propForm, images: [e.target.value] })}
                    placeholder="Paste image URL or upload below"
                    className="flex-1 bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-gold-500"
                  />
                  <label className="px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-xs font-bold text-white cursor-pointer flex items-center space-x-1.5 border border-neutral-700">
                    <Upload className="w-3.5 h-3.5 text-gold-400" />
                    <span>{uploadingImage ? 'Uploading...' : 'Upload'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      disabled={uploadingImage}
                      onChange={(e) => {
                        if (e.target.files?.[0]) handleFileUpload(e.target.files[0], 'property');
                      }}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-neutral-300 mb-1">Description</label>
                <textarea
                  rows="3"
                  value={propForm.description}
                  onChange={(e) => setPropForm({ ...propForm, description: e.target.value })}
                  placeholder="Comprehensive description of property features, road access, and legal approvals..."
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-gold-500"
                />
              </div>

              {/* Status and Featured Checks */}
              <div className="flex items-center space-x-6 pt-2">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={propForm.featured}
                    onChange={(e) => setPropForm({ ...propForm, featured: e.target.checked })}
                    className="w-4 h-4 rounded bg-neutral-950 border-neutral-800 text-gold-500"
                  />
                  <span className="text-xs text-neutral-300 font-bold">Mark as Featured Listing</span>
                </label>

                <div className="flex items-center space-x-2">
                  <span className="text-xs text-neutral-400 font-bold">Status:</span>
                  <select
                    value={propForm.status}
                    onChange={(e) => setPropForm({ ...propForm, status: e.target.value })}
                    className="bg-neutral-950 border border-neutral-800 rounded-lg px-2.5 py-1 text-xs text-white"
                  >
                    <option value="Available">Available</option>
                    <option value="Sold">Sold</option>
                    <option value="Under Discussion">Under Discussion</option>
                  </select>
                </div>
              </div>

              {/* Form buttons */}
              <div className="pt-4 border-t border-neutral-800 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setPropertyModalOpen(false)}
                  className="py-2.5 px-4 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-xs font-bold text-neutral-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="py-2.5 px-6 rounded-xl gold-gradient-btn text-black font-extrabold text-xs shadow-lg"
                >
                  {editingPropertyId ? 'Save Changes' : 'Publish Property'}
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}
