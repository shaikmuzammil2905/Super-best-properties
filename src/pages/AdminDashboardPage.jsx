import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { api } from '../services/api';
import { uploadImage } from '../services/cloudinaryService';
import { 
  Building2, 
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
  RefreshCw, 
  TrendingUp, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  Download, 
  Copy, 
  Database, 
  MapPin,
  Award,
  Sliders,
  DollarSign,
  Briefcase
} from 'lucide-react';

export default function AdminDashboardPage() {
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem('sbp_admin_token') || '');
  const [loading, setLoading] = useState(true);
  
  // Navigation tabs matching user requirement
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'buy-a-property' | 'services' | 'enquiries' | 'content'
  const [buySubTab, setBuySubTab] = useState('all'); // 'all' | 'properties' | 'projects' | 'categories'
  const [toast, setToast] = useState(null);

  // Core Data States
  const [stats, setStats] = useState(null);
  const [properties, setProperties] = useState([]);
  const [categories, setCategories] = useState([]);
  const [projects, setProjects] = useState([]);
  const [services, setServices] = useState([]);
  const [enquiries, setEnquiries] = useState([]);
  const [settings, setSettings] = useState(null);
  const [content, setContent] = useState(null);
  const [mediaList, setMediaList] = useState([]);

  // Search & Filter States
  const [propSearch, setPropSearch] = useState('');
  const [propCategoryFilter, setPropCategoryFilter] = useState('all');
  const [leadSearch, setLeadSearch] = useState('');
  const [leadStatusFilter, setLeadStatusFilter] = useState('all');

  // =========================================================
  // MODALS STATE
  // =========================================================
  const [uploadingImage, setUploadingImage] = useState(false);

  // 1. Property Modal
  const [propertyModalOpen, setPropertyModalOpen] = useState(false);
  const [editingPropertyId, setEditingPropertyId] = useState(null);
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

  // 2. Project Modal
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState(null);
  const [projForm, setProjForm] = useState({
    name: '',
    tagline: '',
    location: 'Tellapur, Hyderabad',
    type: 'Villas & Premium Apartments',
    status: 'Ongoing Project',
    startingPrice: '₹ 80 Lakhs - 2 Cr',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1000&q=80',
    description: '',
    highlights: 'HMDA Approved, Clubhouse, Swimming Pool, 40-60ft BT Roads'
  });

  // 3. Category Modal
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [editingCategorySlug, setEditingCategorySlug] = useState(null);
  const [catForm, setCatForm] = useState({
    name: '',
    slug: '',
    description: '',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1000&q=80'
  });

  // 4. Service Modal
  const [serviceModalOpen, setServiceModalOpen] = useState(false);
  const [editingServiceId, setEditingServiceId] = useState(null);
  const [servForm, setServForm] = useState({
    title: '',
    tagline: '',
    description: '',
    deliverables: ''
  });

  // Protect Admin Route
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
      const [s, props, cats, projs, srvs, enqs, sett, cont, media] = await Promise.all([
        api.getAdminStats(token),
        api.getProperties(),
        api.getCategories(),
        api.getProjects(),
        api.getServices(),
        api.getEnquiries(token),
        api.getSettings(),
        api.getContent(),
        api.getMediaLibrary()
      ]);

      setStats(s);
      setProperties(props);
      setCategories(cats);
      setProjects(projs);
      setServices(srvs);
      setEnquiries(enqs);
      setSettings(sett);
      setContent(cont);
      setMediaList(media);
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

  // Image upload handling
  const handleFileUpload = async (file, onUploaded) => {
    if (!file) return;
    setUploadingImage(true);
    try {
      const result = await uploadImage(file);
      if (result.url) {
        await api.saveMediaAsset({
          fileName: file.name || 'Uploaded Photo',
          url: result.url,
          publicId: result.publicId,
          format: result.format,
          bytes: result.bytes,
          associatedSection: 'Admin Upload'
        });
        onUploaded(result.url);
        showToast('Image uploaded and synced successfully!');
      }
    } catch {
      showToast('Image upload failed', 'error');
    } finally {
      setUploadingImage(false);
    }
  };

  // =========================================================
  // 1. PROPERTY ACTIONS
  // =========================================================
  const handleOpenAddProperty = () => {
    setEditingPropertyId(null);
    setPropForm({
      title: '',
      categorySlug: categories[0]?.slug || 'plots',
      categoryName: categories[0]?.name || 'Plot',
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
      description: 'Prime HMDA & DTCP approved property with clear title, immediate registration, and high appreciation value.',
      amenities: '100% Vastu, Clear Title Deeds, Immediate Registration, 40ft BT Roads',
      mapCoordinates: '17.3850, 78.4867'
    });
    setPropertyModalOpen(true);
  };

  const handleEditProperty = (prop) => {
    setEditingPropertyId(prop.id);
    const resolvedImages = Array.isArray(prop.images) && prop.images.length > 0
      ? prop.images.filter(Boolean)
      : (typeof prop.images === 'string' && prop.images.trim()
          ? [prop.images.trim()]
          : (prop.image ? [prop.image] : ['https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1000&q=80']));

    setPropForm({
      title: prop.title || '',
      categorySlug: prop.categorySlug || 'apartments',
      categoryName: prop.categoryName || 'Apartment',
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
      images: resolvedImages,
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
        showToast('Property updated successfully on main website!');
      } else {
        await api.createProperty(payload, token);
        showToast('New property published live on website!');
      }

      setPropertyModalOpen(false);
      loadAllData();
    } catch (err) {
      showToast(err.message || 'Error saving property', 'error');
    }
  };

  const handleDeleteProperty = async (id, title) => {
    if (!window.confirm(`Permanently delete "${title}" from the website?`)) return;
    try {
      await api.deleteProperty(id, token);
      showToast('Property removed from public listings');
      loadAllData();
    } catch {
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
      showToast(prop.featured ? 'Removed from Featured' : 'Marked as Featured Listing');
      loadAllData();
    } catch {
      showToast('Error updating featured state', 'error');
    }
  };

  // =========================================================
  // 2. PROJECT ACTIONS (EDIT, DELETE, UPLOAD NEW)
  // =========================================================
  const handleOpenAddProject = () => {
    setEditingProjectId(null);
    setProjForm({
      name: '',
      tagline: '',
      location: 'Tellapur, Hyderabad',
      type: 'Villas & Premium Apartments',
      status: 'Ongoing Project',
      startingPrice: '₹ 75 Lakhs',
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1000&q=80',
      description: 'Exclusive master-planned community with ultra-modern clubhouse, sports courts, and green corridors.',
      highlights: 'HMDA Approved, 25,000 Sq.Ft Clubhouse, 40-60ft BT Roads, 100% Vastu'
    });
    setProjectModalOpen(true);
  };

  const handleEditProject = (proj) => {
    setEditingProjectId(proj.id);
    setProjForm({
      name: proj.name || '',
      tagline: proj.tagline || '',
      location: proj.location || '',
      type: proj.type || '',
      status: proj.status || 'Ongoing Project',
      startingPrice: proj.startingPrice || proj.priceRange || '₹ 80 Lakhs',
      image: proj.image || '',
      description: proj.description || '',
      highlights: proj.highlights || ''
    });
    setProjectModalOpen(true);
  };

  const handleSaveProject = async (e) => {
    e.preventDefault();
    try {
      if (editingProjectId) {
        await api.updateProject(editingProjectId, projForm, token);
        showToast('Project updated successfully on main website!');
      } else {
        await api.createProject(projForm, token);
        showToast('New Landmark Project published on main website!');
      }
      setProjectModalOpen(false);
      loadAllData();
    } catch (err) {
      showToast(err.message || 'Error saving project', 'error');
    }
  };

  const handleDeleteProject = async (id, name) => {
    if (!window.confirm(`Permanently delete project "${name}" from the website?`)) return;
    try {
      await api.deleteProject(id, token);
      showToast('Project removed from public website');
      loadAllData();
    } catch {
      showToast('Failed to delete project', 'error');
    }
  };

  // =========================================================
  // 3. CATEGORY ACTIONS (EDIT, DELETE, UPLOAD NEW)
  // =========================================================
  const handleOpenAddCategory = () => {
    setEditingCategorySlug(null);
    setCatForm({
      name: '',
      slug: '',
      description: 'Verified real estate category in Hyderabad with HMDA/DTCP approvals.',
      image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1000&q=80'
    });
    setCategoryModalOpen(true);
  };

  const handleEditCategory = (cat) => {
    setEditingCategorySlug(cat.slug);
    setCatForm({
      name: cat.name || '',
      slug: cat.slug || '',
      description: cat.description || '',
      image: cat.image || 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1000&q=80'
    });
    setCategoryModalOpen(true);
  };

  const handleSaveCategory = async (e) => {
    e.preventDefault();
    try {
      if (editingCategorySlug) {
        await api.updateCategory(editingCategorySlug, catForm, token);
        showToast('Category updated successfully on main website!');
      } else {
        await api.createCategory(catForm, token);
        showToast('New Category added to public website!');
      }
      setCategoryModalOpen(false);
      loadAllData();
    } catch (err) {
      showToast(err.message || 'Error saving category', 'error');
    }
  };

  const handleDeleteCategory = async (slug, name) => {
    if (!window.confirm(`Permanently delete category "${name}"?`)) return;
    try {
      await api.deleteCategory(slug, token);
      showToast('Category removed from website');
      loadAllData();
    } catch {
      showToast('Failed to delete category', 'error');
    }
  };

  // =========================================================
  // 4. SERVICES ACTIONS (EDIT, DELETE, ADD NEW - DIRECT SYNC)
  // =========================================================
  const handleOpenAddService = () => {
    setEditingServiceId(null);
    setServForm({
      title: '',
      tagline: '',
      description: '',
      deliverables: 'HMDA & DTCP layout verification\nMicro-market price benchmarking\nTitle search & link document audit\nDirect personalized advisory session'
    });
    setServiceModalOpen(true);
  };

  const handleEditService = (srv) => {
    setEditingServiceId(srv.id);
    const delivs = Array.isArray(srv.deliverables) ? srv.deliverables.join('\n') : (srv.deliverables || '');
    setServForm({
      title: srv.title || '',
      tagline: srv.tagline || '',
      description: srv.description || '',
      deliverables: delivs
    });
    setServiceModalOpen(true);
  };

  const handleSaveService = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        title: servForm.title,
        tagline: servForm.tagline,
        description: servForm.description,
        deliverables: servForm.deliverables.split('\n').map(s => s.trim()).filter(Boolean)
      };

      if (editingServiceId) {
        await api.updateService(editingServiceId, payload, token);
        showToast('Service updated! Changes are now live on public /services page.');
      } else {
        await api.createService(payload, token);
        showToast('New Service published live on public /services page!');
      }
      setServiceModalOpen(false);
      loadAllData();
    } catch (err) {
      showToast(err.message || 'Error saving service', 'error');
    }
  };

  const handleDeleteService = async (id, title) => {
    if (!window.confirm(`Permanently delete service "${title}" from the main website?`)) return;
    try {
      await api.deleteService(id, token);
      showToast('Service removed! Change is live on main website.');
      loadAllData();
    } catch {
      showToast('Failed to delete service', 'error');
    }
  };

  // =========================================================
  // 5. LEADS ACTIONS
  // =========================================================
  const handleUpdateLeadStatus = async (id, newStatus) => {
    try {
      await api.updateEnquiry(id, { status: newStatus }, token);
      showToast(`Lead status updated to ${newStatus}`);
      loadAllData();
    } catch {
      showToast('Failed to update lead status', 'error');
    }
  };

  const handleDeleteLead = async (id) => {
    if (!window.confirm('Delete this inquiry record?')) return;
    try {
      await api.deleteEnquiry(id, token);
      showToast('Lead record deleted');
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

      {/* TOP HEADER BAR */}
      <header className="h-16 bg-neutral-900/90 border-b border-neutral-800 sticky top-0 z-40 backdrop-blur-md flex items-center justify-between px-4 sm:px-6">
        
        <div className="flex items-center space-x-3">
          <Link to="/" className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center text-black font-extrabold shadow-md">
              <Building2 className="w-5 h-5 text-black" />
            </div>
            <div>
              <span className="font-serif font-black tracking-wide text-white text-base">
                SUPER BEST <span className="gold-gradient-text">PROPERTIES</span>
              </span>
              <span className="text-[10px] block uppercase font-bold text-neutral-400 -mt-1 tracking-wider">
                Executive Control Center
              </span>
            </div>
          </Link>
        </div>

        <div className="flex items-center space-x-3">
          <Link
            to="/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-bold border border-neutral-700 transition-all shadow-sm"
          >
            <ExternalLink className="w-3.5 h-3.5 text-gold-400" />
            <span className="hidden sm:inline">View Live Website</span>
          </Link>

          <button
            onClick={loadAllData}
            title="Refresh database records"
            className="p-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-gold-400' : ''}`} />
          </button>

          <button
            onClick={handleLogout}
            title="Secure Sign Out"
            className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl bg-red-950/60 hover:bg-red-900/80 text-red-300 text-xs font-bold border border-red-800/40 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>

      </header>

      {/* TOP PILL NAVIGATION BAR - CENTERED IN THE MIDDLE WITH UNIFIED BUY A PROPERTY */}
      <div className="bg-neutral-900/70 border-b border-neutral-800 px-4 sm:px-6 py-3.5 overflow-x-auto scrollbar-none sticky top-16 z-30 backdrop-blur-md">
        <div className="flex items-center justify-center mx-auto space-x-2.5 min-w-max max-w-7xl">
          
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-full text-xs font-bold flex items-center space-x-2 transition-all ${
              activeTab === 'overview'
                ? 'bg-gold-500 text-black shadow-lg shadow-gold-500/20'
                : 'bg-neutral-900 hover:bg-neutral-800 text-neutral-300 border border-neutral-800'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Dashboard Overview</span>
          </button>

          {/* UNIFIED BUY A PROPERTY SECTION (MERGING PROPERTIES + PROJECTS + CATEGORIES) */}
          <button
            onClick={() => { setActiveTab('buy-a-property'); setBuySubTab('all'); }}
            className={`px-4 py-2 rounded-full text-xs font-bold flex items-center space-x-2 transition-all ${
              activeTab === 'buy-a-property' || activeTab === 'properties' || activeTab === 'projects' || activeTab === 'categories'
                ? 'bg-gold-500 text-black shadow-lg shadow-gold-500/20'
                : 'bg-neutral-900 hover:bg-neutral-800 text-neutral-300 border border-neutral-800'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>Buy a Property</span>
          </button>

          <button
            onClick={() => setActiveTab('services')}
            className={`px-4 py-2 rounded-full text-xs font-bold flex items-center space-x-2 transition-all ${
              activeTab === 'services'
                ? 'bg-gold-500 text-black shadow-lg shadow-gold-500/20'
                : 'bg-neutral-900 hover:bg-neutral-800 text-neutral-300 border border-neutral-800'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>Services ({services.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('enquiries')}
            className={`px-4 py-2 rounded-full text-xs font-bold flex items-center space-x-2 transition-all ${
              activeTab === 'enquiries'
                ? 'bg-gold-500 text-black shadow-lg shadow-gold-500/20'
                : 'bg-neutral-900 hover:bg-neutral-800 text-neutral-300 border border-neutral-800'
            }`}
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Enquiries ({enquiries.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('content')}
            className={`px-4 py-2 rounded-full text-xs font-bold flex items-center space-x-2 transition-all ${
              activeTab === 'content'
                ? 'bg-gold-500 text-black shadow-lg shadow-gold-500/20'
                : 'bg-neutral-900 hover:bg-neutral-800 text-neutral-300 border border-neutral-800'
            }`}
          >
            <Settings className="w-3.5 h-3.5" />
            <span>Website Content</span>
          </button>

        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
        
        {/* ========================================================= */}
        {/* TAB 1: OVERVIEW */}
        {/* ========================================================= */}
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-fade-in">
            
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-serif font-black text-white">
                  Dashboard Overview
                </h1>
                <p className="text-xs sm:text-sm text-neutral-400 mt-1">
                  Manage the unified Buy a Property portfolio, landmark projects, 15 categories, and live customer inquiries.
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={handleOpenAddProperty}
                  className="py-2.5 px-4 rounded-xl gold-gradient-btn text-black font-extrabold text-xs flex items-center space-x-1.5 shadow-lg"
                >
                  <Plus className="w-4 h-4 text-black" />
                  <span>Add Property</span>
                </button>
                <button
                  onClick={handleOpenAddProject}
                  className="py-2.5 px-4 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white font-extrabold text-xs flex items-center space-x-1.5 border border-neutral-700 shadow-lg"
                >
                  <Plus className="w-4 h-4 text-gold-400" />
                  <span>Add Project</span>
                </button>
              </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              
              <div 
                onClick={() => { setActiveTab('buy-a-property'); setBuySubTab('properties'); }}
                className="bg-neutral-900 border border-neutral-800 hover:border-gold-500/50 rounded-2xl p-5 transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between text-neutral-400 text-xs font-bold uppercase">
                  <span>Properties</span>
                  <Building2 className="w-5 h-5 text-gold-400 group-hover:scale-110 transition-transform" />
                </div>
                <div className="mt-3 text-3xl font-black text-white">{properties.length}</div>
                <p className="mt-1 text-xs text-neutral-400">Buy a Property Catalog</p>
              </div>

              <div 
                onClick={() => { setActiveTab('buy-a-property'); setBuySubTab('projects'); }}
                className="bg-neutral-900 border border-neutral-800 hover:border-gold-500/50 rounded-2xl p-5 transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between text-neutral-400 text-xs font-bold uppercase">
                  <span>Projects</span>
                  <Briefcase className="w-5 h-5 text-blue-400 group-hover:scale-110 transition-transform" />
                </div>
                <div className="mt-3 text-3xl font-black text-white">{projects.length}</div>
                <p className="mt-1 text-xs text-neutral-400">Mega Developments</p>
              </div>

              <div 
                onClick={() => { setActiveTab('buy-a-property'); setBuySubTab('categories'); }}
                className="bg-neutral-900 border border-neutral-800 hover:border-gold-500/50 rounded-2xl p-5 transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between text-neutral-400 text-xs font-bold uppercase">
                  <span>Categories</span>
                  <Layers className="w-5 h-5 text-purple-400 group-hover:scale-110 transition-transform" />
                </div>
                <div className="mt-3 text-3xl font-black text-white">{categories.length}</div>
                <p className="mt-1 text-xs text-neutral-400">Verified Types</p>
              </div>

              <div 
                onClick={() => setActiveTab('services')}
                className="bg-neutral-900 border border-neutral-800 hover:border-gold-500/50 rounded-2xl p-5 transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between text-neutral-400 text-xs font-bold uppercase">
                  <span>Services</span>
                  <Award className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition-transform" />
                </div>
                <div className="mt-3 text-3xl font-black text-white">{services.length}</div>
                <p className="mt-1 text-xs text-neutral-400">Advisory Solutions</p>
              </div>

              <div 
                onClick={() => setActiveTab('enquiries')}
                className="bg-neutral-900 border border-neutral-800 hover:border-gold-500/50 rounded-2xl p-5 transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between text-neutral-400 text-xs font-bold uppercase">
                  <span>Enquiries</span>
                  <MessageCircle className="w-5 h-5 text-gold-400 group-hover:scale-110 transition-transform" />
                </div>
                <div className="mt-3 text-3xl font-black text-white">{enquiries.length}</div>
                <p className="mt-1 text-xs text-emerald-400 font-semibold">Live Real-Time Leads</p>
              </div>

            </div>

            {/* Quick Actions & Overview Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Recent Landmark Projects Preview */}
              <div className="p-6 rounded-3xl bg-neutral-900 border border-neutral-800 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif font-bold text-lg text-white flex items-center space-x-2">
                    <Briefcase className="w-5 h-5 text-gold-400" />
                    <span>Featured Landmark Projects ({projects.length})</span>
                  </h3>
                  <button onClick={() => setActiveTab('projects')} className="text-xs font-bold text-gold-400 hover:underline">
                    Manage All →
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {projects.slice(0, 2).map(proj => (
                    <div key={proj.id} className="rounded-2xl overflow-hidden bg-neutral-950 border border-neutral-800">
                      <img src={proj.image} alt="" className="w-full h-32 object-cover" />
                      <div className="p-3">
                        <h4 className="font-bold text-xs text-white truncate">{proj.name}</h4>
                        <p className="text-[11px] text-gold-400">{proj.startingPrice || proj.priceRange}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Live Services Preview */}
              <div className="p-6 rounded-3xl bg-neutral-900 border border-neutral-800 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif font-bold text-lg text-white flex items-center space-x-2">
                    <Award className="w-5 h-5 text-emerald-400" />
                    <span>Advisory Services ({services.length})</span>
                  </h3>
                  <button onClick={() => setActiveTab('services')} className="text-xs font-bold text-gold-400 hover:underline">
                    Manage All →
                  </button>
                </div>

                <div className="space-y-2">
                  {services.slice(0, 3).map(s => (
                    <div key={s.id} className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 flex items-center justify-between text-xs">
                      <span className="font-bold text-white truncate pr-2">{s.title}</span>
                      <span className="text-[10px] text-emerald-400 font-bold px-2 py-0.5 rounded-full bg-emerald-500/10">Active</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        )}

        {/* ========================================================= */}
        {/* UNIFIED TAB: BUY A PROPERTY (PROPERTIES + PROJECTS + CATEGORIES) */}
        {/* ========================================================= */}
        {(activeTab === 'buy-a-property' || activeTab === 'properties' || activeTab === 'projects' || activeTab === 'categories') && (
          <div className="space-y-8 animate-fade-in">
            
            {/* MASTER HEADER */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-3 border-b border-neutral-800">
              <div>
                <h1 className="text-2xl sm:text-3xl font-serif font-black text-white flex items-center space-x-2.5">
                  <span className="p-2 rounded-2xl bg-gold-500/10 border border-gold-500/30 text-gold-400">
                    <Building2 className="w-6 h-6" />
                  </span>
                  <span>Buy a Property Master Management</span>
                </h1>
                <p className="text-xs sm:text-sm text-neutral-400 mt-1.5">
                  Unified control center for all live website Listings ({properties.length}), Landmark Projects ({projects.length}), and Property Categories ({categories.length}).
                </p>
              </div>

              {/* Master Upload / Add Actions */}
              <div className="flex flex-wrap gap-2.5">
                <button
                  onClick={handleOpenAddProperty}
                  className="py-2.5 px-4 rounded-xl gold-gradient-btn text-black font-extrabold text-xs flex items-center space-x-1.5 shadow-lg hover:brightness-110 transition-all"
                >
                  <Plus className="w-4 h-4 text-black" />
                  <span>Upload Property</span>
                </button>
                <button
                  onClick={handleOpenAddProject}
                  className="py-2.5 px-4 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-100 font-extrabold text-xs flex items-center space-x-1.5 border border-neutral-700 shadow-md transition-all"
                >
                  <Plus className="w-4 h-4 text-gold-400" />
                  <span>Add Project</span>
                </button>
                <button
                  onClick={handleOpenAddCategory}
                  className="py-2.5 px-4 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-100 font-extrabold text-xs flex items-center space-x-1.5 border border-neutral-700 shadow-md transition-all"
                >
                  <Plus className="w-4 h-4 text-gold-400" />
                  <span>Add Category</span>
                </button>
              </div>
            </div>

            {/* SUB-SECTION SWITCHER / FILTER PILLS */}
            <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-none">
              <button
                onClick={() => setBuySubTab('all')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  buySubTab === 'all'
                    ? 'bg-neutral-100 text-black shadow-md'
                    : 'bg-neutral-900 hover:bg-neutral-800 text-neutral-400 border border-neutral-800'
                }`}
              >
                ✦ All 3 Sections ({properties.length + projects.length + categories.length})
              </button>
              <button
                onClick={() => setBuySubTab('properties')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  buySubTab === 'properties'
                    ? 'bg-gold-500 text-black shadow-md'
                    : 'bg-neutral-900 hover:bg-neutral-800 text-neutral-400 border border-neutral-800'
                }`}
              >
                🏠 Properties ({properties.length})
              </button>
              <button
                onClick={() => setBuySubTab('projects')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  buySubTab === 'projects'
                    ? 'bg-gold-500 text-black shadow-md'
                    : 'bg-neutral-900 hover:bg-neutral-800 text-neutral-400 border border-neutral-800'
                }`}
              >
                🏗 Landmark Projects ({projects.length})
              </button>
              <button
                onClick={() => setBuySubTab('categories')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  buySubTab === 'categories'
                    ? 'bg-gold-500 text-black shadow-md'
                    : 'bg-neutral-900 hover:bg-neutral-800 text-neutral-400 border border-neutral-800'
                }`}
              >
                🗂 15 Categories ({categories.length})
              </button>
            </div>

            {/* SUB-SECTION 1: PROPERTY LISTINGS CATALOG */}
            {(buySubTab === 'all' || buySubTab === 'properties') && (
              <div className="space-y-5 pt-2">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-3 border-t border-neutral-800/80">
                  <div>
                    <h2 className="text-xl font-serif font-black text-white flex items-center space-x-2">
                      <span>🏠 Property Listings Catalog ({properties.length})</span>
                    </h2>
                    <p className="text-xs text-neutral-400 mt-0.5">
                      Edit prices, upload new properties, manage images, and toggle availability status.
                    </p>
                  </div>
                  <button
                    onClick={handleOpenAddProperty}
                    className="self-start sm:self-auto px-3.5 py-1.5 rounded-xl gold-gradient-btn text-black font-extrabold text-xs flex items-center space-x-1.5 shadow"
                  >
                    <Plus className="w-3.5 h-3.5 text-black" />
                    <span>Upload Property</span>
                  </button>
                </div>

            {/* Filter & Search Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-neutral-900 border border-neutral-800">
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
                <span>Showing {filteredProperties.length} listings</span>
                {(propSearch || propCategoryFilter !== 'all') && (
                  <button onClick={() => { setPropSearch(''); setPropCategoryFilter('all'); }} className="text-gold-400 hover:underline">
                    Reset
                  </button>
                )}
              </div>
            </div>

            {/* Properties Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProperties.map(prop => {
                const img = Array.isArray(prop.images) ? prop.images[0] : prop.images;
                const isAvailable = (prop.status || 'available').toLowerCase() === 'available';

                return (
                  <div key={prop.id} className="bg-neutral-900 border border-neutral-800 hover:border-gold-500/40 rounded-3xl overflow-hidden flex flex-col justify-between transition-all group shadow-md">
                    
                    <div className="relative h-48 w-full overflow-hidden bg-neutral-950">
                      <img src={img} alt={prop.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
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
                            isAvailable ? 'bg-emerald-500 text-black' : 'bg-red-500 text-white'
                          }`}
                        >
                          {prop.status}
                        </button>
                      </div>

                      <div className="absolute bottom-3 left-3 bg-black/85 backdrop-blur-md px-3 py-1 rounded-xl text-xs font-black text-white border border-neutral-700">
                        {prop.price}
                      </div>
                    </div>

                    <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                      <div>
                        <h3 className="font-serif font-bold text-base text-white line-clamp-1">{prop.title}</h3>
                        <p className="text-xs text-neutral-400 mt-1 flex items-center space-x-1">
                          <MapPin className="w-3.5 h-3.5 text-gold-400 shrink-0" />
                          <span className="truncate">{prop.location}</span>
                        </p>
                      </div>

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

            {/* SUB-SECTION 2: LANDMARK MEGA PROJECTS */}
            {(buySubTab === 'all' || buySubTab === 'projects') && (
              <div className="space-y-5 pt-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-6 border-t border-neutral-800">
                  <div>
                    <h2 className="text-xl font-serif font-black text-white flex items-center space-x-2">
                      <span>🏗 Landmark Mega Projects ({projects.length})</span>
                    </h2>
                    <p className="text-xs text-neutral-400 mt-0.5">
                      Manage mega residential & commercial development projects. Edit details, upload new projects, or delete.
                    </p>
                  </div>
                  <button
                    onClick={handleOpenAddProject}
                    className="self-start sm:self-auto px-3.5 py-1.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-100 font-extrabold text-xs flex items-center space-x-1.5 border border-neutral-700 shadow"
                  >
                    <Plus className="w-3.5 h-3.5 text-gold-400" />
                    <span>Upload Project</span>
                  </button>
                </div>

            {/* Projects Grid Matching Image Copy 29 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((proj) => (
                <div 
                  key={proj.id}
                  className="bg-neutral-900 border border-neutral-800 hover:border-gold-500/50 rounded-3xl overflow-hidden shadow-xl flex flex-col justify-between group transition-all"
                >
                  {/* Project Image */}
                  <div className="relative h-64 w-full overflow-hidden bg-neutral-950">
                    <img 
                      src={proj.image} 
                      alt={proj.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                    <div className="absolute top-4 left-4 bg-black/85 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-gold-400 text-gold-300 text-xs font-bold">
                      {proj.status || 'Active Project'}
                    </div>
                    <div className="absolute bottom-4 left-4 bg-black/85 backdrop-blur-md px-3.5 py-1.5 rounded-xl text-xs font-black text-white border border-neutral-700">
                      Starting from {proj.startingPrice || proj.priceRange}
                    </div>
                  </div>

                  {/* Project Details */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <span className="text-[11px] font-bold text-gold-400 uppercase tracking-wider block">
                        {proj.type}
                      </span>
                      <h3 className="text-xl font-bold font-serif text-white mt-1">
                        {proj.name}
                      </h3>
                      <p className="text-neutral-400 text-xs flex items-center space-x-1 mt-1">
                        <MapPin className="w-3.5 h-3.5 text-gold-400 shrink-0" />
                        <span>{proj.location}</span>
                      </p>
                      <p className="text-neutral-300 text-xs mt-3 leading-relaxed">
                        {proj.description}
                      </p>
                      {proj.highlights && (
                        <p className="text-[11px] text-neutral-400 mt-2 font-medium">
                          <strong className="text-gold-300">Highlights:</strong> {proj.highlights}
                        </p>
                      )}
                    </div>

                    {/* Action Buttons: Edit, Delete, Upload */}
                    <div className="pt-4 border-t border-neutral-800 flex items-center justify-between">
                      <span className="text-xs text-emerald-400 font-semibold flex items-center space-x-1">
                        <Check className="w-3.5 h-3.5" />
                        <span>Live on Website</span>
                      </span>

                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleEditProject(proj)}
                          className="px-3.5 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-bold flex items-center space-x-1.5 transition-colors"
                        >
                          <Edit3 className="w-3.5 h-3.5 text-gold-400" />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => handleDeleteProject(proj.id, proj.name)}
                          className="px-3.5 py-2 rounded-xl bg-red-950/60 hover:bg-red-900 text-red-300 text-xs font-bold flex items-center space-x-1.5 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>

                  </div>

                </div>
              ))}
                </div>
              </div>
            )}

            {/* SUB-SECTION 3: PROPERTY CATEGORIES */}
            {(buySubTab === 'all' || buySubTab === 'categories') && (
              <div className="space-y-5 pt-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-6 border-t border-neutral-800">
                  <div>
                    <h2 className="text-xl font-serif font-black text-white flex items-center space-x-2">
                      <span>🗂 Property Categories ({categories.length})</span>
                    </h2>
                    <p className="text-xs text-neutral-400 mt-0.5">
                      Manage the 15 categories displayed across search dropdowns, filter pills, and navigation.
                    </p>
                  </div>
                  <button
                    onClick={handleOpenAddCategory}
                    className="self-start sm:self-auto px-3.5 py-1.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-100 font-extrabold text-xs flex items-center space-x-1.5 border border-neutral-700 shadow"
                  >
                    <Plus className="w-3.5 h-3.5 text-gold-400" />
                    <span>Add Category</span>
                  </button>
                </div>

            {/* Categories Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {categories.map((c, idx) => (
                <div key={c.slug} className="p-5 rounded-3xl bg-neutral-900 border border-neutral-800 hover:border-gold-500/40 flex flex-col justify-between space-y-4 transition-all shadow-md">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-gold-400 uppercase tracking-wider">
                        Category #{idx + 1}
                      </span>
                      <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-neutral-950 text-neutral-300 border border-neutral-800">
                        {c.propertyCount || 0} Listings
                      </span>
                    </div>
                    <h3 className="font-bold text-base text-white mt-1.5">{c.name}</h3>
                    <code className="text-[11px] text-neutral-500 block mt-0.5">/{c.slug}</code>
                    <p className="text-xs text-neutral-400 mt-2 line-clamp-2">{c.description}</p>
                  </div>

                  <div className="pt-3 border-t border-neutral-800 flex items-center justify-between">
                    <span className="text-[11px] text-neutral-500">Live Website Sync</span>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleEditCategory(c)}
                        className="p-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300"
                        title="Edit Category"
                      >
                        <Edit3 className="w-3.5 h-3.5 text-gold-400" />
                      </button>
                      <button
                        onClick={() => handleDeleteCategory(c.slug, c.name)}
                        className="p-2 rounded-xl bg-red-950/60 hover:bg-red-900 text-red-300"
                        title="Delete Category"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
                </div>
              </div>
            )}

          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 5: SERVICES (7) - EDIT, DELETE, ADD NEW */}
        {/* ========================================================= */}
        {activeTab === 'services' && (
          <div className="space-y-6 animate-fade-in">
            
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-serif font-black text-white">
                  7 Advisory Services Management
                </h1>
                <p className="text-xs sm:text-sm text-neutral-400 mt-1">
                  Changes made here immediately update the public <strong>/services</strong> page on the live website!
                </p>
              </div>

              <button
                onClick={handleOpenAddService}
                className="py-3 px-5 rounded-xl gold-gradient-btn text-black font-extrabold text-sm flex items-center space-x-2 shadow-lg"
              >
                <Plus className="w-4 h-4 text-black" />
                <span>Add New Service</span>
              </button>
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((srv, idx) => (
                <div 
                  key={srv.id} 
                  className="p-6 rounded-3xl bg-neutral-900 border border-neutral-800 hover:border-gold-500/40 flex flex-col justify-between space-y-4 shadow-xl transition-all"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-gold-400 uppercase tracking-wider">
                        Service #{idx + 1}
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                        Live on Site
                      </span>
                    </div>

                    <h3 className="font-bold text-lg text-white mt-1.5">{srv.title}</h3>
                    {srv.tagline && <p className="text-xs font-semibold text-neutral-400 mt-1">{srv.tagline}</p>}
                    <p className="text-xs text-neutral-300 mt-3 leading-relaxed">{srv.description}</p>

                    {/* Deliverables Checklist */}
                    {Array.isArray(srv.deliverables) && srv.deliverables.length > 0 && (
                      <div className="mt-4 pt-3 border-t border-neutral-800 space-y-1.5">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block">Deliverables</span>
                        {srv.deliverables.slice(0, 3).map((d, i) => (
                          <div key={i} className="text-xs text-neutral-400 flex items-start space-x-1.5">
                            <span className="text-gold-400 font-bold">✓</span>
                            <span className="line-clamp-1">{d}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Card Actions: Edit, Delete */}
                  <div className="pt-4 border-t border-neutral-800 flex items-center justify-between">
                    <span className="text-xs text-neutral-500">Auto-routes to WhatsApp</span>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleEditService(srv)}
                        className="px-3 py-1.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-bold flex items-center space-x-1"
                      >
                        <Edit3 className="w-3.5 h-3.5 text-gold-400" />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => handleDeleteService(srv.id, srv.title)}
                        className="px-3 py-1.5 rounded-xl bg-red-950/60 hover:bg-red-900 text-red-300 text-xs font-bold flex items-center space-x-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>

                </div>
              ))}
            </div>

          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 6: ENQUIRIES (STARTS AT ZERO 0) */}
        {/* ========================================================= */}
        {activeTab === 'enquiries' && (
          <div className="space-y-6 animate-fade-in">
            
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-serif font-black text-white">
                  Customer Enquiries & Leads ({enquiries.length})
                </h1>
                <p className="text-xs sm:text-sm text-neutral-400 mt-1">
                  Direct customer submissions from website forms, property details pages, and WhatsApp chatbot funnels.
                </p>
              </div>

              {enquiries.length > 0 && (
                <button
                  onClick={exportLeadsToCSV}
                  className="py-2.5 px-4 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-bold flex items-center space-x-2 border border-neutral-700 shadow"
                >
                  <Download className="w-4 h-4 text-gold-400" />
                  <span>Export CSV</span>
                </button>
              )}
            </div>

            {/* Filter Row */}
            {enquiries.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-neutral-900 border border-neutral-800">
                <div className="relative">
                  <Search className="w-4 h-4 text-neutral-500 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    value={leadSearch}
                    onChange={(e) => setLeadSearch(e.target.value)}
                    placeholder="Search name, phone, property..."
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
                    <option value="converted">Converted</option>
                  </select>
                </div>

                <div className="flex items-center justify-between text-xs text-neutral-400 px-2 font-semibold">
                  <span>{filteredEnquiries.length} Inquiries Found</span>
                </div>
              </div>
            )}

            {/* Table or Zero State */}
            {enquiries.length === 0 ? (
              <div className="p-12 rounded-3xl bg-neutral-900 border border-neutral-800 text-center space-y-3">
                <div className="w-14 h-14 rounded-full bg-neutral-800 flex items-center justify-center text-neutral-500 mx-auto">
                  <MessageCircle className="w-7 h-7" />
                </div>
                <h3 className="font-serif font-bold text-lg text-white">0 Active Customer Enquiries</h3>
                <p className="text-xs text-neutral-400 max-w-md mx-auto">
                  Your enquiry inbox is currently clear (0). When any customer submits a contact request or property enquiry on the live website, it will immediately appear here in real time.
                </p>
              </div>
            ) : (
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
                      {filteredEnquiries.map(enq => (
                        <tr key={enq.id} className="hover:bg-neutral-800/40 transition-colors">
                          <td className="py-4 px-5 text-neutral-400 whitespace-nowrap">
                            {enq.createdAt ? new Date(enq.createdAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : 'Recent'}
                          </td>
                          <td className="py-4 px-5 font-bold text-white whitespace-nowrap">{enq.name}</td>
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
                              className="px-2.5 py-1 rounded-xl text-xs font-bold bg-neutral-950 text-white border border-neutral-700 focus:outline-none"
                            >
                              <option value="New">New</option>
                              <option value="Contacted">Contacted</option>
                              <option value="Interested">Interested</option>
                              <option value="Converted">Converted</option>
                              <option value="Closed">Closed</option>
                            </select>
                          </td>
                          <td className="py-4 px-5 text-right whitespace-nowrap space-x-1.5">
                            <a
                              href={`https://wa.me/91${(enq.phone || '').replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hello ${enq.name}, thank you for contacting Super Best Properties.`)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex p-2 rounded-xl bg-emerald-950 text-emerald-400 hover:bg-emerald-900 border border-emerald-800"
                              title="WhatsApp"
                            >
                              <MessageCircle className="w-3.5 h-3.5" />
                            </a>
                            <a
                              href={`tel:${enq.phone}`}
                              className="inline-flex p-2 rounded-xl bg-neutral-800 text-neutral-300 hover:bg-neutral-700"
                              title="Call"
                            >
                              <PhoneCall className="w-3.5 h-3.5" />
                            </a>
                            <button
                              onClick={() => handleDeleteLead(enq.id)}
                              className="inline-flex p-2 rounded-xl bg-red-950 text-red-300 hover:bg-red-900"
                              title="Delete"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 7: WEBSITE CONTENT & SETTINGS */}
        {/* ========================================================= */}
        {activeTab === 'content' && settings && (
          <div className="space-y-6 animate-fade-in max-w-4xl">
            <div>
              <h1 className="text-2xl sm:text-3xl font-serif font-black text-white">
                Website Content & Settings
              </h1>
              <p className="text-xs sm:text-sm text-neutral-400 mt-1">
                Edit website title, business phone numbers, WhatsApp routing, and official office address.
              </p>
            </div>

            <form 
              onSubmit={async (e) => {
                e.preventDefault();
                await api.updateSettings(settings, token);
                showToast('Website settings updated live!');
                loadAllData();
              }}
              className="p-7 rounded-3xl bg-neutral-900 border border-neutral-800 space-y-6"
            >
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
                  className="py-3 px-6 rounded-xl gold-gradient-btn text-black font-extrabold text-xs shadow-lg"
                >
                  Save & Publish Live
                </button>
              </div>
            </form>
          </div>
        )}

      </main>

      {/* ========================================================= */}
      {/* 1. PROPERTY MODAL (ADD / EDIT) */}
      {/* ========================================================= */}
      {propertyModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-neutral-900 border border-neutral-800 rounded-3xl max-w-2xl w-full p-6 sm:p-8 my-8 shadow-2xl animate-fade-in max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
              <h2 className="text-xl font-serif font-bold text-white">
                {editingPropertyId ? 'Edit Property Listing' : 'Upload New Property Listing'}
              </h2>
              <button onClick={() => setPropertyModalOpen(false)} className="text-neutral-400 hover:text-white">
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
                    placeholder="e.g. ₹ 85 Lakhs"
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
                    placeholder="e.g. 1,800 Sq.Ft"
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-gold-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-neutral-300 mb-1">Bedrooms / Type</label>
                  <input
                    type="text"
                    value={propForm.bedrooms}
                    onChange={(e) => setPropForm({ ...propForm, bedrooms: e.target.value })}
                    placeholder="e.g. 3 BHK"
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-gold-500"
                  />
                </div>
              </div>

              {/* IMAGE SECTION WITH LIVE VISIBLE PREVIEW */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold uppercase text-neutral-300">
                    Property Picture (Live Website Display)
                  </label>
                  {uploadingImage && (
                    <span className="text-xs text-gold-400 font-bold flex items-center space-x-1 animate-pulse">
                      <RefreshCw className="w-3 h-3 animate-spin" />
                      <span>Uploading new picture...</span>
                    </span>
                  )}
                </div>

                {/* CURRENT / UPLOADED PICTURE PREVIEW BOX */}
                <div className="relative rounded-2xl overflow-hidden border-2 border-gold-500/50 bg-neutral-950 aspect-[16/9] w-full max-h-56 flex items-center justify-center group shadow-xl">
                  {propForm.images && propForm.images[0] ? (
                    <img
                      src={propForm.images[0]}
                      alt="Property Preview"
                      className="w-full h-full object-cover transition-transform group-hover:scale-105"
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1000&q=80';
                      }}
                    />
                  ) : (
                    <div className="text-center p-6 text-neutral-500 space-y-1">
                      <Image className="w-8 h-8 mx-auto text-neutral-600" />
                      <p className="text-xs font-bold">No picture selected</p>
                    </div>
                  )}

                  {/* Badge */}
                  <div className="absolute top-2.5 left-2.5 bg-black/85 backdrop-blur-md px-3 py-1 rounded-lg border border-gold-400 text-gold-300 text-[11px] font-bold flex items-center space-x-1.5 shadow">
                    <Sparkles className="w-3.5 h-3.5 text-gold-400" />
                    <span>Current Picture (Visible on Website)</span>
                  </div>

                  {/* Direct One-Click Upload / Replace Picture Button */}
                  <div className="absolute bottom-2.5 right-2.5">
                    <label className="px-4 py-2 rounded-xl bg-gold-500 hover:bg-gold-400 text-black text-xs font-black cursor-pointer shadow-xl flex items-center space-x-1.5 transition-all hover:scale-105 active:scale-95">
                      <Upload className="w-3.5 h-3.5" />
                      <span>{uploadingImage ? 'Uploading...' : 'Upload New Picture'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        disabled={uploadingImage}
                        onChange={(e) => {
                          if (e.target.files?.[0]) {
                            handleFileUpload(e.target.files[0], (url) => {
                              setPropForm(prev => ({
                                ...prev,
                                images: [url, ...(prev.images || []).filter(i => i !== url)]
                              }));
                              showToast('New picture uploaded and preview updated! Click Save Changes to publish.');
                            });
                          }
                        }}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>

                {/* Direct Image URL input or Cloudinary Link */}
                <div className="flex gap-2 pt-1">
                  <input
                    type="text"
                    value={propForm.images[0] || ''}
                    onChange={(e) => setPropForm({ ...propForm, images: [e.target.value] })}
                    placeholder="Or paste direct image URL (https://... or data:image/...)"
                    className="flex-1 bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-gold-500"
                  />
                  <label className="px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-xs font-bold text-white cursor-pointer flex items-center space-x-1 border border-neutral-700">
                    <Upload className="w-3.5 h-3.5 text-gold-400" />
                    <span>Browse</span>
                    <input
                      type="file"
                      accept="image/*"
                      disabled={uploadingImage}
                      onChange={(e) => {
                        if (e.target.files?.[0]) {
                          handleFileUpload(e.target.files[0], (url) => {
                            setPropForm(prev => ({
                              ...prev,
                              images: [url, ...(prev.images || []).filter(i => i !== url)]
                            }));
                            showToast('New picture uploaded and preview updated! Click Save Changes to publish.');
                          });
                        }
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
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-gold-500"
                />
              </div>

              <div className="flex items-center space-x-6 pt-2">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={propForm.featured}
                    onChange={(e) => setPropForm({ ...propForm, featured: e.target.checked })}
                    className="w-4 h-4 rounded bg-neutral-950 border-neutral-800 text-gold-500"
                  />
                  <span className="text-xs text-neutral-300 font-bold">Featured Listing</span>
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
                  </select>
                </div>
              </div>

              <div className="pt-4 border-t border-neutral-800 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setPropertyModalOpen(false)}
                  className="py-2.5 px-4 rounded-xl bg-neutral-800 text-xs font-bold text-neutral-300"
                >
                  Cancel
                </button>
                <button type="submit" className="py-2.5 px-6 rounded-xl gold-gradient-btn text-black font-extrabold text-xs shadow-lg">
                  {editingPropertyId ? 'Save Changes' : 'Publish Property'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 2. PROJECT MODAL (ADD / EDIT) */}
      {/* ========================================================= */}
      {projectModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-neutral-900 border border-neutral-800 rounded-3xl max-w-xl w-full p-6 sm:p-8 my-8 shadow-2xl animate-fade-in max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
              <h2 className="text-xl font-serif font-bold text-white">
                {editingProjectId ? 'Edit Landmark Project' : 'Upload New Landmark Project'}
              </h2>
              <button onClick={() => setProjectModalOpen(false)} className="text-neutral-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProject} className="mt-6 space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-neutral-300 mb-1">Project Name *</label>
                <input
                  type="text"
                  required
                  value={projForm.name}
                  onChange={(e) => setProjForm({ ...projForm, name: e.target.value })}
                  placeholder="e.g. Super Best Royal Enclave"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-gold-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-neutral-300 mb-1">Location *</label>
                  <input
                    type="text"
                    required
                    value={projForm.location}
                    onChange={(e) => setProjForm({ ...projForm, location: e.target.value })}
                    placeholder="e.g. Tellapur, Hyderabad"
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-gold-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-neutral-300 mb-1">Starting Price *</label>
                  <input
                    type="text"
                    required
                    value={projForm.startingPrice}
                    onChange={(e) => setProjForm({ ...projForm, startingPrice: e.target.value })}
                    placeholder="e.g. ₹ 85 Lakhs"
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-gold-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-neutral-300 mb-1">Project Type</label>
                  <input
                    type="text"
                    value={projForm.type}
                    onChange={(e) => setProjForm({ ...projForm, type: e.target.value })}
                    placeholder="e.g. Villas & Luxury Apartments"
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-gold-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-neutral-300 mb-1">Status</label>
                  <input
                    type="text"
                    value={projForm.status}
                    onChange={(e) => setProjForm({ ...projForm, status: e.target.value })}
                    placeholder="e.g. Ongoing / Pre-Launch"
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-gold-500"
                  />
                </div>
              </div>

              {/* PROJECT PHOTO WITH LIVE PREVIEW */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold uppercase text-neutral-300">
                    Project Photo (Live Website Banner)
                  </label>
                  {uploadingImage && (
                    <span className="text-xs text-gold-400 font-bold flex items-center space-x-1 animate-pulse">
                      <RefreshCw className="w-3 h-3 animate-spin" />
                      <span>Uploading project photo...</span>
                    </span>
                  )}
                </div>

                {/* PROJECT PHOTO PREVIEW CARD */}
                <div className="relative rounded-2xl overflow-hidden border-2 border-gold-500/50 bg-neutral-950 aspect-[16/9] w-full max-h-56 flex items-center justify-center group shadow-xl">
                  {projForm.image ? (
                    <img
                      src={projForm.image}
                      alt="Project Preview"
                      className="w-full h-full object-cover transition-transform group-hover:scale-105"
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1000&q=80';
                      }}
                    />
                  ) : (
                    <div className="text-center p-6 text-neutral-500 space-y-1">
                      <Image className="w-8 h-8 mx-auto text-neutral-600" />
                      <p className="text-xs font-bold">No photo selected</p>
                    </div>
                  )}

                  <div className="absolute top-2.5 left-2.5 bg-black/85 backdrop-blur-md px-3 py-1 rounded-lg border border-gold-400 text-gold-300 text-[11px] font-bold flex items-center space-x-1.5 shadow">
                    <Sparkles className="w-3.5 h-3.5 text-gold-400" />
                    <span>Live Website Project Banner</span>
                  </div>

                  <div className="absolute bottom-2.5 right-2.5">
                    <label className="px-4 py-2 rounded-xl bg-gold-500 hover:bg-gold-400 text-black text-xs font-black cursor-pointer shadow-xl flex items-center space-x-1.5 transition-all hover:scale-105 active:scale-95">
                      <Upload className="w-3.5 h-3.5" />
                      <span>{uploadingImage ? 'Uploading...' : 'Upload New Photo'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        disabled={uploadingImage}
                        onChange={(e) => {
                          if (e.target.files?.[0]) {
                            handleFileUpload(e.target.files[0], (url) => {
                              setProjForm(prev => ({ ...prev, image: url }));
                              showToast('New project photo uploaded and preview updated!');
                            });
                          }
                        }}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>

                <div className="flex gap-2 pt-1">
                  <input
                    type="text"
                    value={projForm.image || ''}
                    onChange={(e) => setProjForm({ ...projForm, image: e.target.value })}
                    placeholder="Paste direct photo URL"
                    className="flex-1 bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-gold-500"
                  />
                  <label className="px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-xs font-bold text-white cursor-pointer flex items-center space-x-1 border border-neutral-700">
                    <Upload className="w-3.5 h-3.5 text-gold-400" />
                    <span>Browse</span>
                    <input
                      type="file"
                      accept="image/*"
                      disabled={uploadingImage}
                      onChange={(e) => {
                        if (e.target.files?.[0]) {
                          handleFileUpload(e.target.files[0], (url) => {
                            setProjForm(prev => ({ ...prev, image: url }));
                            showToast('New project photo uploaded and preview updated!');
                          });
                        }
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
                  value={projForm.description}
                  onChange={(e) => setProjForm({ ...projForm, description: e.target.value })}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-gold-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-neutral-300 mb-1">Highlights</label>
                <input
                  type="text"
                  value={projForm.highlights}
                  onChange={(e) => setProjForm({ ...projForm, highlights: e.target.value })}
                  placeholder="e.g. HMDA Approved, Clubhouse, Swimming Pool"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-gold-500"
                />
              </div>

              <div className="pt-4 border-t border-neutral-800 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setProjectModalOpen(false)}
                  className="py-2.5 px-4 rounded-xl bg-neutral-800 text-xs font-bold text-neutral-300"
                >
                  Cancel
                </button>
                <button type="submit" className="py-2.5 px-6 rounded-xl gold-gradient-btn text-black font-extrabold text-xs shadow-lg">
                  {editingProjectId ? 'Save Changes' : 'Publish Project'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 3. CATEGORY MODAL (ADD / EDIT) */}
      {/* ========================================================= */}
      {categoryModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-neutral-900 border border-neutral-800 rounded-3xl max-w-md w-full p-6 sm:p-8 my-8 shadow-2xl animate-fade-in">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
              <h2 className="text-xl font-serif font-bold text-white">
                {editingCategorySlug ? 'Edit Category' : 'Add New Category'}
              </h2>
              <button onClick={() => setCategoryModalOpen(false)} className="text-neutral-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveCategory} className="mt-6 space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-neutral-300 mb-1">Category Name *</label>
                <input
                  type="text"
                  required
                  value={catForm.name}
                  onChange={(e) => setCatForm({ ...catForm, name: e.target.value })}
                  placeholder="e.g. Farm Houses"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-gold-500"
                />
              </div>

              {!editingCategorySlug && (
                <div>
                  <label className="block text-xs font-bold uppercase text-neutral-300 mb-1">Slug (URL identifier)</label>
                  <input
                    type="text"
                    value={catForm.slug}
                    onChange={(e) => setCatForm({ ...catForm, slug: e.target.value })}
                    placeholder="e.g. farm-houses (auto-generated if empty)"
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-gold-500"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-bold uppercase text-neutral-300 mb-1">Description</label>
                <textarea
                  rows="3"
                  value={catForm.description}
                  onChange={(e) => setCatForm({ ...catForm, description: e.target.value })}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-gold-500"
                />
              </div>

              <div className="pt-4 border-t border-neutral-800 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setCategoryModalOpen(false)}
                  className="py-2.5 px-4 rounded-xl bg-neutral-800 text-xs font-bold text-neutral-300"
                >
                  Cancel
                </button>
                <button type="submit" className="py-2.5 px-6 rounded-xl gold-gradient-btn text-black font-extrabold text-xs shadow-lg">
                  {editingCategorySlug ? 'Save Changes' : 'Create Category'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 4. SERVICE MODAL (ADD / EDIT - DIRECT WEBSITE SYNC) */}
      {/* ========================================================= */}
      {serviceModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-neutral-900 border border-neutral-800 rounded-3xl max-w-xl w-full p-6 sm:p-8 my-8 shadow-2xl animate-fade-in max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
              <h2 className="text-xl font-serif font-bold text-white">
                {editingServiceId ? 'Edit Advisory Service' : 'Add New Advisory Service'}
              </h2>
              <button onClick={() => setServiceModalOpen(false)} className="text-neutral-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveService} className="mt-6 space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-neutral-300 mb-1">Service Title *</label>
                <input
                  type="text"
                  required
                  value={servForm.title}
                  onChange={(e) => setServForm({ ...servForm, title: e.target.value })}
                  placeholder="e.g. NRI Property Portfolio Advisory"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-gold-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-neutral-300 mb-1">Subtitle / Tagline</label>
                <input
                  type="text"
                  value={servForm.tagline}
                  onChange={(e) => setServForm({ ...servForm, tagline: e.target.value })}
                  placeholder="e.g. End-to-End Discovery, Site Visits & Closing Support"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-gold-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-neutral-300 mb-1">Service Description *</label>
                <textarea
                  rows="3"
                  required
                  value={servForm.description}
                  onChange={(e) => setServForm({ ...servForm, description: e.target.value })}
                  placeholder="Comprehensive scope and advisory details..."
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-gold-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-neutral-300 mb-1">
                  Deliverables Checklist (one per line)
                </label>
                <textarea
                  rows="4"
                  value={servForm.deliverables}
                  onChange={(e) => setServForm({ ...servForm, deliverables: e.target.value })}
                  placeholder="HMDA & DTCP layout verification&#10;Micro-market price benchmarking&#10;Customized site visits with personal advisor"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2 text-xs text-white font-mono focus:outline-none focus:border-gold-500"
                />
              </div>

              <div className="pt-4 border-t border-neutral-800 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setServiceModalOpen(false)}
                  className="py-2.5 px-4 rounded-xl bg-neutral-800 text-xs font-bold text-neutral-300"
                >
                  Cancel
                </button>
                <button type="submit" className="py-2.5 px-6 rounded-xl gold-gradient-btn text-black font-extrabold text-xs shadow-lg">
                  {editingServiceId ? 'Save Changes' : 'Publish Service'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
