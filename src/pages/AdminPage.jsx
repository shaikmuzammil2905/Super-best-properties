import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { 
  ShieldCheck, 
  Lock, 
  LogOut, 
  Building, 
  Layers, 
  MessageSquare, 
  Settings, 
  Plus, 
  Trash2, 
  Edit3, 
  Check, 
  X, 
  Search, 
  ExternalLink, 
  Upload, 
  MessageCircle, 
  Eye, 
  Sparkles,
  Home,
  CheckCircle2,
  RefreshCw
} from 'lucide-react';

export default function AdminPage() {
  const [token, setToken] = useState(localStorage.getItem('sbp_admin_token') || '');
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loading, setLoading] = useState(false);

  // Active Admin Tab
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'properties' | 'projects' | 'categories' | 'enquiries' | 'content'

  // Admin Data State
  const [stats, setStats] = useState(null);
  const [properties, setProperties] = useState([]);
  const [projects, setProjects] = useState([]);
  const [categories, setCategories] = useState([]);
  const [enquiries, setEnquiries] = useState([]);
  const [siteContent, setSiteContent] = useState(null);

  // Property Modal Form State
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
    amenities: '100% Vastu, Car Parking, Power Backup, Security',
    mapCoordinates: '17.3850, 78.4867'
  });

  // Project Modal Form State
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState(null);
  const [projForm, setProjForm] = useState({
    name: '',
    tagline: '',
    location: 'Tellapur, Hyderabad',
    type: 'Villas & Apartments',
    status: 'Ongoing',
    priceRange: '₹ 80L - 2 Cr',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1000&q=80',
    description: '',
    highlights: 'HMDA Approved, Clubhouse, Swimming Pool'
  });

  // Load all data when token is valid
  useEffect(() => {
    if (token) {
      loadAllAdminData();
    }
  }, [token]);

  const loadAllAdminData = async () => {
    setLoading(true);
    try {
      const [s, props, projs, cats, enqs, content] = await Promise.all([
        api.getAdminStats(token),
        api.getProperties(),
        api.getProjects(),
        api.getCategories(),
        api.getEnquiries(token),
        api.getContent()
      ]);
      setStats(s);
      setProperties(props);
      setProjects(projs);
      setCategories(cats);
      setEnquiries(enqs);
      setSiteContent(content);
    } catch (err) {
      console.error('Failed to load admin data:', err);
      if (err.message.includes('Unauthorized') || err.message.includes('Forbidden')) {
        handleLogout();
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    setLoading(true);
    try {
      const res = await api.login(username, password);
      if (res.token) {
        localStorage.setItem('sbp_admin_token', res.token);
        setToken(res.token);
      }
    } catch (err) {
      setLoginError(err.message || 'Invalid username or password');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('sbp_admin_token');
    setToken('');
    setPassword('');
  };

  // ========================
  // PROPERTY ACTIONS
  // ========================
  const handleOpenAddProperty = () => {
    setEditingPropertyId(null);
    setPropForm({
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
    setPropertyModalOpen(true);
  };

  const handleOpenEditProperty = (prop) => {
    setEditingPropertyId(prop.id);
    setPropForm({
      title: prop.title,
      categorySlug: prop.categorySlug,
      categoryName: prop.categoryName,
      price: prop.price,
      priceNumber: prop.priceNumber,
      location: prop.location,
      city: prop.city || 'Hyderabad',
      area: prop.area,
      areaSqFt: prop.areaSqFt,
      bedrooms: prop.bedrooms,
      bathrooms: prop.bathrooms,
      status: prop.status,
      featured: prop.featured,
      images: prop.images || [],
      description: prop.description,
      amenities: Array.isArray(prop.amenities) ? prop.amenities.join(', ') : (prop.amenities || ''),
      mapCoordinates: prop.mapCoordinates || ''
    });
    setPropertyModalOpen(true);
  };

  const handleSaveProperty = async (e) => {
    e.preventDefault();
    try {
      const selectedCat = categories.find(c => c.slug === propForm.categorySlug);
      const payload = {
        ...propForm,
        categoryName: selectedCat ? selectedCat.name : propForm.categoryName,
        priceNumber: Number(propForm.priceNumber) || 0,
        areaSqFt: Number(propForm.areaSqFt) || 0,
        amenities: propForm.amenities.split(',').map(s => s.trim()).filter(Boolean)
      };

      if (editingPropertyId) {
        await api.updateProperty(editingPropertyId, payload, token);
      } else {
        await api.createProperty(payload, token);
      }
      setPropertyModalOpen(false);
      loadAllAdminData();
    } catch (err) {
      alert('Error saving property: ' + err.message);
    }
  };

  const handleDeleteProperty = async (id, title) => {
    if (!window.confirm(`Are you sure you want to permanently delete "${title}"?`)) return;
    try {
      await api.deleteProperty(id, token);
      loadAllAdminData();
    } catch (err) {
      alert('Error deleting: ' + err.message);
    }
  };

  const handleToggleFeatured = async (prop) => {
    try {
      await api.updateProperty(prop.id, { featured: !prop.featured }, token);
      loadAllAdminData();
    } catch (err) {
      alert('Error: ' + err.message);
    }
  };

  const handleToggleStatus = async (prop) => {
    const nextStatus = prop.status.toLowerCase() === 'available' ? 'Sold' : 'Available';
    try {
      await api.updateProperty(prop.id, { status: nextStatus }, token);
      loadAllAdminData();
    } catch (err) {
      alert('Error: ' + err.message);
    }
  };

  // Handle Image Upload inside Property Modal
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      const url = await api.uploadImage(file, token);
      setPropForm(prev => ({
        ...prev,
        images: [url, ...prev.images]
      }));
    } catch (err) {
      alert('Image upload failed: ' + err.message);
    }
  };

  // ========================
  // ENQUIRY ACTIONS
  // ========================
  const handleUpdateEnquiryStatus = async (id, status) => {
    try {
      await api.updateEnquiry(id, { status }, token);
      loadAllAdminData();
    } catch (err) {
      alert('Error updating status: ' + err.message);
    }
  };

  const handleDeleteEnquiry = async (id) => {
    if (!window.confirm('Delete this enquiry?')) return;
    try {
      await api.deleteEnquiry(id, token);
      loadAllAdminData();
    } catch (err) {
      alert('Error deleting enquiry: ' + err.message);
    }
  };

  // ========================
  // CONTENT UPDATE ACTION
  // ========================
  const handleSaveContent = async (e) => {
    e.preventDefault();
    try {
      await api.updateContent(siteContent, token);
      alert('Website content successfully updated and live!');
      loadAllAdminData();
    } catch (err) {
      alert('Error saving content: ' + err.message);
    }
  };

  // ===================================
  // 1. LOGIN SCREEN
  // ===================================
  if (!token) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-neutral-900 border border-gold-500/40 rounded-3xl p-8 shadow-2xl text-white space-y-6">
          <div className="text-center space-y-2">
            <img src="/assets/logo.png" alt="Super Best Properties" className="h-16 mx-auto object-contain" />
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 text-xs font-bold uppercase tracking-wider mt-2">
              <Lock className="w-3.5 h-3.5" />
              <span>Secure Admin Control Center</span>
            </div>
            <h2 className="text-2xl font-serif font-bold text-white">Administrator Portal</h2>
            <p className="text-xs text-gray-400">Enter your credentials to manage properties and enquiries.</p>
          </div>

          {loginError && (
            <div className="p-3.5 rounded-xl bg-red-950/50 border border-red-500/50 text-red-300 text-xs text-center">
              {loginError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">Admin Username</label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-neutral-800 border border-neutral-700 focus:border-gold-500 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">Admin Password</label>
              <input
                type="password"
                required
                placeholder="Default: admin123"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-neutral-800 border border-neutral-700 focus:border-gold-500 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none"
              />
              <span className="block text-[11px] text-gray-500 mt-1">Hint: default password is <code>admin123</code></span>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl gold-gradient-btn text-black font-extrabold text-sm tracking-wide shadow-lg hover:shadow-gold-500/40 transition-all flex items-center justify-center space-x-2"
            >
              <span>{loading ? 'Authenticating...' : 'Sign In to Admin Panel'}</span>
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ===================================
  // 2. LOGGED-IN ADMIN DASHBOARD
  // ===================================
  return (
    <div className="min-h-screen bg-neutral-900 text-gray-100 flex flex-col">
      
      {/* Admin Top Navigation Bar */}
      <header className="bg-neutral-950 border-b border-gold-500/30 px-4 sm:px-8 py-3.5 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center space-x-4">
          <img src="/assets/logo.png" alt="Super Best Properties" className="h-10 w-auto object-contain" />
          <div className="hidden sm:block border-l border-neutral-800 pl-4">
            <span className="text-xs font-extrabold text-gold-400 tracking-wider uppercase block">Admin Dashboard</span>
            <span className="text-[11px] text-gray-400">Live Database Connected</span>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={loadAllAdminData}
            title="Refresh database"
            className="p-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-gray-300 text-xs font-medium flex items-center space-x-1"
          >
            <RefreshCw className="w-4 h-4" />
            <span className="hidden sm:inline">Sync</span>
          </button>

          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-1.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-gold-400 text-xs font-semibold flex items-center space-x-1"
          >
            <span>Live Website</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <button
            onClick={handleLogout}
            className="p-2 rounded-xl bg-red-950/50 hover:bg-red-900/60 border border-red-500/40 text-red-300 text-xs font-semibold flex items-center space-x-1"
            title="Sign Out"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
        
        {/* Navigation Tabs */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-2 border-b border-neutral-800 text-sm">
          {[
            { id: 'overview', label: 'Dashboard Overview', icon: Sparkles },
            { id: 'properties', label: `Properties (${properties.length})`, icon: Building },
            { id: 'projects', label: `Projects (${projects.length})`, icon: Layers },
            { id: 'categories', label: `Categories (${categories.length})`, icon: Home },
            { id: 'enquiries', label: `Enquiries (${enquiries.length})`, icon: MessageSquare },
            { id: 'content', label: 'Website Content', icon: Settings },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl font-semibold text-xs sm:text-sm whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-gold-500 text-black shadow-md'
                    : 'bg-neutral-800/80 hover:bg-neutral-800 text-gray-300'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* =========================================
            TAB 1: OVERVIEW & STATS
        ========================================= */}
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-fade-in">
            {/* Stat Cards Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              
              <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-5 text-center">
                <span className="text-xs uppercase font-bold text-gray-400">Total Properties</span>
                <span className="block text-3xl font-extrabold text-white mt-1">{stats?.totalProperties || properties.length}</span>
              </div>

              <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-5 text-center">
                <span className="text-xs uppercase font-bold text-emerald-400">Available</span>
                <span className="block text-3xl font-extrabold text-emerald-400 mt-1">{stats?.availableProperties || 0}</span>
              </div>

              <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-5 text-center">
                <span className="text-xs uppercase font-bold text-red-400">Sold Out</span>
                <span className="block text-3xl font-extrabold text-red-400 mt-1">{stats?.soldProperties || 0}</span>
              </div>

              <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-5 text-center">
                <span className="text-xs uppercase font-bold text-gold-400">Featured</span>
                <span className="block text-3xl font-extrabold text-gold-400 mt-1">{stats?.featuredProperties || 0}</span>
              </div>

              <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-5 text-center">
                <span className="text-xs uppercase font-bold text-cyan-400">Projects</span>
                <span className="block text-3xl font-extrabold text-cyan-400 mt-1">{stats?.totalProjects || projects.length}</span>
              </div>

              <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-5 text-center">
                <span className="text-xs uppercase font-bold text-purple-400">Enquiries</span>
                <span className="block text-3xl font-extrabold text-purple-400 mt-1">{stats?.totalEnquiries || enquiries.length}</span>
              </div>

            </div>

            {/* Recent Enquiries Preview */}
            <div className="bg-neutral-950 border border-neutral-800 rounded-3xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-serif font-bold text-white">Recent Customer Enquiries</h3>
                  <p className="text-xs text-gray-400">Leads submitted via website forms & WhatsApp bot</p>
                </div>
                <button
                  onClick={() => setActiveTab('enquiries')}
                  className="text-xs font-bold text-gold-400 hover:underline"
                >
                  View All Enquiries →
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-gray-300">
                  <thead className="bg-neutral-900 text-gray-400 uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="p-3">Customer</th>
                      <th className="p-3">Phone</th>
                      <th className="p-3">Interested Property</th>
                      <th className="p-3">Budget</th>
                      <th className="p-3">Status</th>
                      <th className="p-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-800">
                    {enquiries.slice(0, 5).map((enq) => (
                      <tr key={enq.id} className="hover:bg-neutral-900/60">
                        <td className="p-3 font-semibold text-white">{enq.name}</td>
                        <td className="p-3">
                          <a href={`tel:${enq.phone}`} className="text-gold-400 hover:underline">{enq.phone}</a>
                        </td>
                        <td className="p-3">{enq.propertyTitle || enq.propertyType}</td>
                        <td className="p-3">{enq.budget}</td>
                        <td className="p-3">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            enq.status === 'New' ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/30' : 'bg-neutral-800 text-gray-300'
                          }`}>
                            {enq.status}
                          </span>
                        </td>
                        <td className="p-3">
                          <a
                            href={`https://wa.me/91${enq.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hello ${enq.name}, greetings from Super Best Properties regarding your property enquiry.`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white font-semibold text-[11px]"
                          >
                            <MessageCircle className="w-3 h-3 fill-current" />
                            <span>WhatsApp</span>
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* =========================================
            TAB 2: PROPERTIES MANAGEMENT
        ========================================= */}
        {activeTab === 'properties' && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-serif font-bold text-white">Property Listings Manager</h3>
                <p className="text-xs text-gray-400">Add, edit, delete, mark as featured, or update property availability.</p>
              </div>

              <button
                onClick={handleOpenAddProperty}
                className="px-5 py-2.5 rounded-xl gold-gradient-btn text-black font-extrabold text-xs sm:text-sm flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Property</span>
              </button>
            </div>

            {/* Properties Table */}
            <div className="bg-neutral-950 border border-neutral-800 rounded-3xl overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-gray-300">
                  <thead className="bg-neutral-900 text-gray-400 uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="p-3.5">Property</th>
                      <th className="p-3.5">Category</th>
                      <th className="p-3.5">Price</th>
                      <th className="p-3.5">Location</th>
                      <th className="p-3.5">BHK / Area</th>
                      <th className="p-3.5">Featured</th>
                      <th className="p-3.5">Status</th>
                      <th className="p-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-800">
                    {properties.map((p) => (
                      <tr key={p.id} className="hover:bg-neutral-900/60">
                        <td className="p-3.5">
                          <div className="flex items-center space-x-3">
                            <img
                              src={(p.images && p.images[0]) || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=200&q=80'}
                              alt={p.title}
                              className="w-12 h-10 object-cover rounded-lg shrink-0 border border-neutral-700"
                            />
                            <div className="max-w-xs">
                              <span className="font-bold text-white block truncate">{p.title}</span>
                              <span className="text-[10px] text-gray-400 block truncate">{p.slug}</span>
                            </div>
                          </div>
                        </td>
                        <td className="p-3.5">
                          <span className="px-2 py-0.5 rounded-md bg-neutral-800 text-gold-400 font-semibold text-[10px]">
                            {p.categoryName}
                          </span>
                        </td>
                        <td className="p-3.5 font-bold text-white">{p.price}</td>
                        <td className="p-3.5 truncate max-w-xs">{p.location}</td>
                        <td className="p-3.5">{p.bedrooms} • {p.area}</td>
                        <td className="p-3.5">
                          <button
                            onClick={() => handleToggleFeatured(p)}
                            className={`px-2.5 py-1 rounded-full text-[10px] font-bold transition-colors ${
                              p.featured ? 'bg-gold-500 text-black' : 'bg-neutral-800 text-gray-500 hover:text-white'
                            }`}
                          >
                            {p.featured ? '★ Featured' : 'Normal'}
                          </button>
                        </td>
                        <td className="p-3.5">
                          <button
                            onClick={() => handleToggleStatus(p)}
                            className={`px-2.5 py-1 rounded-full text-[10px] font-bold transition-colors ${
                              p.status.toLowerCase() === 'available' ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/40' : 'bg-red-950 text-red-400 border border-red-500/40'
                            }`}
                          >
                            {p.status}
                          </button>
                        </td>
                        <td className="p-3.5 text-right space-x-2">
                          <button
                            onClick={() => handleOpenEditProperty(p)}
                            className="p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-gold-400"
                            title="Edit Property"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteProperty(p.id, p.title)}
                            className="p-1.5 rounded-lg bg-neutral-800 hover:bg-red-900/60 text-red-400"
                            title="Delete Property"
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
          </div>
        )}

        {/* =========================================
            TAB 3: PROJECTS MANAGEMENT
        ========================================= */}
        {activeTab === 'projects' && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-serif font-bold text-white">Landmark Projects Manager</h3>
                <p className="text-xs text-gray-400">Manage residential and commercial development projects.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((proj) => (
                <div key={proj.id} className="bg-neutral-950 border border-neutral-800 rounded-2xl p-5 space-y-3">
                  <div className="aspect-[16/8] rounded-xl overflow-hidden bg-neutral-900">
                    <img src={proj.image} alt={proj.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-gold-400 uppercase">{proj.type}</span>
                    <h4 className="text-lg font-bold text-white">{proj.name}</h4>
                    <p className="text-xs text-gray-400">{proj.location}</p>
                    <p className="text-xs text-gray-300 mt-2 line-clamp-2">{proj.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =========================================
            TAB 4: CATEGORIES MANAGEMENT
        ========================================= */}
        {activeTab === 'categories' && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h3 className="text-xl font-serif font-bold text-white">15 Property Categories</h3>
              <p className="text-xs text-gray-400">Categories matching Reference Image 3 ("What are you looking for?").</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {categories.map((c) => (
                <div key={c.id || c.slug} className="bg-neutral-950 border border-neutral-800 rounded-2xl p-4 flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-sm text-white">{c.name}</h4>
                    <span className="text-xs text-gold-400 font-mono">/properties/{c.slug}</span>
                    <p className="text-[11px] text-gray-400 mt-1">{c.propertyCount || 0} Properties listed</p>
                  </div>
                  <a
                    href={`/properties/${c.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-gold-400"
                    title="View Page"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =========================================
            TAB 5: ENQUIRIES MANAGEMENT
        ========================================= */}
        {activeTab === 'enquiries' && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-serif font-bold text-white">Customer Inquiries & Leads</h3>
                <p className="text-xs text-gray-400">Total {enquiries.length} enquiries recorded in database.</p>
              </div>
            </div>

            <div className="bg-neutral-950 border border-neutral-800 rounded-3xl overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-gray-300">
                  <thead className="bg-neutral-900 text-gray-400 uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="p-3.5">Date</th>
                      <th className="p-3.5">Customer Name</th>
                      <th className="p-3.5">Phone</th>
                      <th className="p-3.5">Email</th>
                      <th className="p-3.5">Interested In</th>
                      <th className="p-3.5">Budget</th>
                      <th className="p-3.5">Message / Requirements</th>
                      <th className="p-3.5">Status</th>
                      <th className="p-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-800">
                    {enquiries.map((e) => (
                      <tr key={e.id} className="hover:bg-neutral-900/60">
                        <td className="p-3.5 text-gray-400 whitespace-nowrap">
                          {new Date(e.createdAt || Date.now()).toLocaleDateString()}
                        </td>
                        <td className="p-3.5 font-bold text-white">{e.name}</td>
                        <td className="p-3.5">
                          <a href={`tel:${e.phone}`} className="text-gold-400 hover:underline">{e.phone}</a>
                        </td>
                        <td className="p-3.5 text-gray-400">{e.email || '—'}</td>
                        <td className="p-3.5 font-medium text-white">{e.propertyTitle || e.propertyType}</td>
                        <td className="p-3.5">{e.budget}</td>
                        <td className="p-3.5 max-w-xs text-gray-300">{e.message}</td>
                        <td className="p-3.5">
                          <select
                            value={e.status}
                            onChange={(ev) => handleUpdateEnquiryStatus(e.id, ev.target.value)}
                            className="bg-neutral-900 border border-neutral-700 text-xs rounded-lg px-2 py-1 text-gold-400 focus:outline-none"
                          >
                            <option value="New">New</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Contacted">Contacted</option>
                            <option value="Closed">Closed</option>
                          </select>
                        </td>
                        <td className="p-3.5 text-right space-x-2 whitespace-nowrap">
                          <a
                            href={`https://wa.me/91${e.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hello ${e.name}, greetings from Super Best Properties regarding your property enquiry for ${e.propertyTitle || 'property'}.`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white font-semibold text-[11px]"
                          >
                            <MessageCircle className="w-3 h-3 fill-current" />
                            <span>WhatsApp</span>
                          </a>
                          <button
                            onClick={() => handleDeleteEnquiry(e.id)}
                            className="p-1.5 rounded-lg bg-neutral-800 hover:bg-red-900 text-red-400"
                            title="Delete"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* =========================================
            TAB 6: WEBSITE CONTENT MANAGEMENT
        ========================================= */}
        {activeTab === 'content' && siteContent && (
          <div className="space-y-6 animate-fade-in max-w-3xl">
            <div>
              <h3 className="text-xl font-serif font-bold text-white">Live Website Content & Info</h3>
              <p className="text-xs text-gray-400">All edits made here immediately reflect on the live website.</p>
            </div>

            <form onSubmit={handleSaveContent} className="bg-neutral-950 border border-neutral-800 rounded-3xl p-6 sm:p-8 space-y-4">
              <div>
                <label className="block text-xs font-bold text-gold-400 uppercase tracking-wider mb-1">Company Contact Number</label>
                <input
                  type="text"
                  value={siteContent.phone || ''}
                  onChange={(e) => setSiteContent({ ...siteContent, phone: e.target.value })}
                  className="w-full bg-neutral-900 border border-neutral-700 focus:border-gold-500 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gold-400 uppercase tracking-wider mb-1">Office Address</label>
                <textarea
                  rows="2"
                  value={siteContent.address || ''}
                  onChange={(e) => setSiteContent({ ...siteContent, address: e.target.value })}
                  className="w-full bg-neutral-900 border border-neutral-700 focus:border-gold-500 rounded-xl px-4 py-2 text-sm text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gold-400 uppercase tracking-wider mb-1">Hero Heading</label>
                <input
                  type="text"
                  value={siteContent.heroHeading || ''}
                  onChange={(e) => setSiteContent({ ...siteContent, heroHeading: e.target.value })}
                  className="w-full bg-neutral-900 border border-neutral-700 focus:border-gold-500 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gold-400 uppercase tracking-wider mb-1">Hero Sub-Heading</label>
                <input
                  type="text"
                  value={siteContent.heroSubHeading || ''}
                  onChange={(e) => setSiteContent({ ...siteContent, heroSubHeading: e.target.value })}
                  className="w-full bg-neutral-900 border border-neutral-700 focus:border-gold-500 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gold-400 uppercase tracking-wider mb-1">Founder Name</label>
                <input
                  type="text"
                  value={siteContent.founder?.name || 'D. Suresh Baabu'}
                  onChange={(e) => setSiteContent({
                    ...siteContent,
                    founder: { ...siteContent.founder, name: e.target.value }
                  })}
                  className="w-full bg-neutral-900 border border-neutral-700 focus:border-gold-500 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gold-400 uppercase tracking-wider mb-1">Founder Qualifications</label>
                <input
                  type="text"
                  value={siteContent.founder?.qualifications || ''}
                  onChange={(e) => setSiteContent({
                    ...siteContent,
                    founder: { ...siteContent.founder, qualifications: e.target.value }
                  })}
                  className="w-full bg-neutral-900 border border-neutral-700 focus:border-gold-500 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gold-400 uppercase tracking-wider mb-1">Founder Profile Tagline</label>
                <input
                  type="text"
                  value={siteContent.founder?.profile || ''}
                  onChange={(e) => setSiteContent({
                    ...siteContent,
                    founder: { ...siteContent.founder, profile: e.target.value }
                  })}
                  className="w-full bg-neutral-900 border border-neutral-700 focus:border-gold-500 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none"
                />
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  className="px-8 py-3 rounded-xl gold-gradient-btn text-black font-extrabold text-sm tracking-wide shadow-lg"
                >
                  Save & Publish Live Changes
                </button>
              </div>
            </form>
          </div>
        )}

      </div>

      {/* =========================================
          ADD / EDIT PROPERTY MODAL POPUP
      ========================================= */}
      {propertyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-2xl bg-neutral-950 border border-gold-500/40 rounded-3xl p-6 sm:p-8 text-white shadow-2xl max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setPropertyModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-2xl font-serif font-bold text-white mb-4">
              {editingPropertyId ? 'Edit Property Listing' : 'Add New Property Listing'}
            </h3>

            <form onSubmit={handleSaveProperty} className="space-y-4 text-xs">
              <div>
                <label className="block text-neutral-400 font-bold uppercase mb-1">Property Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Royal Gated Villa"
                  value={propForm.title}
                  onChange={(e) => setPropForm({ ...propForm, title: e.target.value })}
                  className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-gold-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-neutral-400 font-bold uppercase mb-1">Category *</label>
                  <select
                    value={propForm.categorySlug}
                    onChange={(e) => {
                      const selected = categories.find(c => c.slug === e.target.value);
                      setPropForm({
                        ...propForm,
                        categorySlug: e.target.value,
                        categoryName: selected ? selected.name : propForm.categoryName
                      });
                    }}
                    className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-gold-500"
                  >
                    {categories.map((c) => (
                      <option key={c.slug} value={c.slug}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-neutral-400 font-bold uppercase mb-1">Price Badge (Display) *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. ₹ 68 Lakhs or ₹ 1.25 Cr"
                    value={propForm.price}
                    onChange={(e) => setPropForm({ ...propForm, price: e.target.value })}
                    className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-gold-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-neutral-400 font-bold uppercase mb-1">Price in Rupees (Number) *</label>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 6800000"
                    value={propForm.priceNumber}
                    onChange={(e) => setPropForm({ ...propForm, priceNumber: e.target.value })}
                    className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-gold-500"
                  />
                </div>

                <div>
                  <label className="block text-neutral-400 font-bold uppercase mb-1">Location *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Tellapur, Hyderabad"
                    value={propForm.location}
                    onChange={(e) => setPropForm({ ...propForm, location: e.target.value })}
                    className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-gold-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-neutral-400 font-bold uppercase mb-1">Bedrooms / Configuration</label>
                  <input
                    type="text"
                    placeholder="e.g. 3 BHK or Plot"
                    value={propForm.bedrooms}
                    onChange={(e) => setPropForm({ ...propForm, bedrooms: e.target.value })}
                    className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-neutral-400 font-bold uppercase mb-1">Area</label>
                  <input
                    type="text"
                    placeholder="e.g. 2,000 Sq.Ft"
                    value={propForm.area}
                    onChange={(e) => setPropForm({ ...propForm, area: e.target.value })}
                    className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-neutral-400 font-bold uppercase mb-1">Status</label>
                  <select
                    value={propForm.status}
                    onChange={(e) => setPropForm({ ...propForm, status: e.target.value })}
                    className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none"
                  >
                    <option value="Available">Available</option>
                    <option value="Sold">Sold</option>
                  </select>
                </div>
              </div>

              {/* Upload image */}
              <div>
                <label className="block text-neutral-400 font-bold uppercase mb-1">Upload Property Photo</label>
                <div className="flex items-center space-x-3">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="text-xs text-gray-400 file:mr-3 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-gold-500 file:text-black hover:file:bg-gold-400 cursor-pointer"
                  />
                </div>
              </div>

              <div>
                <label className="block text-neutral-400 font-bold uppercase mb-1">Image URLs (comma-separated)</label>
                <input
                  type="text"
                  value={propForm.images.join(', ')}
                  onChange={(e) => setPropForm({
                    ...propForm,
                    images: e.target.value.split(',').map(s => s.trim()).filter(Boolean)
                  })}
                  className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-neutral-400 font-bold uppercase mb-1">Key Amenities (comma-separated)</label>
                <input
                  type="text"
                  placeholder="e.g. 100% Vastu, Car Parking, Clubhouse, Swimming Pool"
                  value={propForm.amenities}
                  onChange={(e) => setPropForm({ ...propForm, amenities: e.target.value })}
                  className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-neutral-400 font-bold uppercase mb-1">Description</label>
                <textarea
                  rows="3"
                  value={propForm.description}
                  onChange={(e) => setPropForm({ ...propForm, description: e.target.value })}
                  className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none"
                />
              </div>

              <div className="flex items-center space-x-2 pt-2">
                <input
                  type="checkbox"
                  id="featCheck"
                  checked={propForm.featured}
                  onChange={(e) => setPropForm({ ...propForm, featured: e.target.checked })}
                  className="w-4 h-4 accent-gold-500 cursor-pointer"
                />
                <label htmlFor="featCheck" className="text-sm font-semibold text-gray-200 cursor-pointer">
                  Display as Featured Property on Homepage
                </label>
              </div>

              <div className="pt-4 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setPropertyModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-neutral-800 text-gray-300 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl gold-gradient-btn text-black font-extrabold"
                >
                  Save Property
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

