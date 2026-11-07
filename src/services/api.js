import { initialCategories, initialProperties, initialProjects, initialSiteContent } from '../data/mockData';
import { supabase } from './supabaseClient';

const API_BASE = '/api';

// Initial 7 Live Services from Website
export const initialServices = [
  {
    id: 'srv-1',
    title: 'Residential Property Advisory',
    tagline: 'Plots, Apartments, Villas & Independent Houses',
    description: 'Comprehensive guidance on identifying and securing ideal residential plots, luxury apartments, standalone independent villas, and gated community housing opportunities tailored to family lifestyles and future value appreciation.',
    deliverables: [
      'HMDA & DTCP layout verification',
      'Micro-market price benchmarking',
      'Architectural & Vastu compliance check',
      'Customized site visits with personal advisor'
    ],
    displayOrder: 1
  },
  {
    id: 'srv-2',
    title: 'Commercial Property Solutions',
    tagline: 'High-Street Retail, Corporate Offices & Godowns',
    description: 'Assistance in identifying and acquiring prime commercial plots, Grade-A IT office spaces, high-footfall retail showrooms, warehousing godowns, and business premises across Hyderabad’s most vibrant economic corridors.',
    deliverables: [
      'High rental yield forecasting',
      'Lease tenure & tenant feasibility',
      'Location footfall & highway transit analysis',
      'Commercial zoning & fire clearance checks'
    ],
    displayOrder: 2
  },
  {
    id: 'srv-3',
    title: 'Property Investment Advisory',
    tagline: 'High-ROI Land, Commercial & Residential Wealth Creation',
    description: 'Helping investors, HNIs and NRIs evaluate high-potential land, residential, and commercial property opportunities aligned with their risk profiles, capital preservation goals, and aggressive multi-year appreciation objectives.',
    deliverables: [
      'Macro & micro-market growth analytics',
      'Exit strategy planning & liquidity review',
      'Portfolio diversification roadmaps',
      'Quarterly capital appreciation reports'
    ],
    displayOrder: 3
  },
  {
    id: 'srv-4',
    title: 'Land & Development Opportunities',
    tagline: 'Joint Ventures, Plotted Layouts & Farm Parcels',
    description: 'Connecting interested buyers, builders, and institutional investors with strategic land parcels, joint-development opportunities, agricultural holdings, and property owners with clear, unencumbered titles.',
    deliverables: [
      'Direct landowner negotiations',
      'Joint development ratio structuring',
      'Title search & boundary survey reports',
      'Master plan & master road connectivity'
    ],
    displayOrder: 4
  },
  {
    id: 'srv-5',
    title: 'Property Buying & Selling Assistance',
    tagline: 'End-to-End Discovery, Site Visits & Closing Support',
    description: 'Professional assistance in property discovery, shortlisting, private site visits, price negotiations, buyer-seller alignment, and smooth, secure transaction coordination from agreement to registration.',
    deliverables: [
      'Curated shortlists matching exact budget',
      'Scheduled chauffeured site inspections',
      'Fair market valuation & negotiation',
      'Escrow & documentation assistance'
    ],
    displayOrder: 5
  },
  {
    id: 'srv-6',
    title: 'Legal & Documentation Assistance',
    tagline: 'Title Scrutiny, Link Documents & RERA Verification',
    description: 'Helping customers navigate property-related legal documentation, 30-year link document verification, encumbrance certificates (EC), municipal sanctions, and revenue records with clarity and confidence.',
    deliverables: [
      '30-year Encumbrance Certificate scrutiny',
      'Revenue land record & Dharani verification',
      'HMDA / DTCP / GHMC approval confirmation',
      'Safe deed drafting with experienced legal counsel'
    ],
    displayOrder: 6
  },
  {
    id: 'srv-7',
    title: 'Bank Loan & Financial Assistance',
    tagline: 'Competitive Home Loans & Fast Sanctions',
    description: 'Connecting eligible customers with suitable property financing options through leading nationalized and private banking institutions (SBI, HDFC, ICICI, etc.) with doorstep document pickup and preferential interest rates.',
    deliverables: [
      'Pre-approved loan eligibility assessment',
      'Tie-ups with leading national banks',
      'Doorstep document collection & fast clearance',
      'Transparent processing with no hidden charges'
    ],
    displayOrder: 7
  }
];

// Helper to normalize property records so images and amenities are ALWAYS arrays
export function normalizeProperty(p) {
  if (!p) return null;

  // Clean images to always be a valid array of URL strings
  let images = [];
  if (Array.isArray(p.images)) {
    images = p.images.filter(Boolean);
  } else if (typeof p.images === 'string' && p.images.trim()) {
    try {
      const parsed = JSON.parse(p.images);
      images = Array.isArray(parsed) ? parsed.filter(Boolean) : [p.images.trim()];
    } catch {
      images = [p.images.trim()];
    }
  } else if (p.image && typeof p.image === 'string' && p.image.trim()) {
    images = [p.image.trim()];
  }
  
  if (images.length === 0) {
    images = ['https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1000&q=80'];
  }

  // Clean amenities to always be an array of strings
  let amenities = [];
  if (Array.isArray(p.amenities)) {
    amenities = p.amenities.map(a => typeof a === 'string' ? a.trim() : String(a)).filter(Boolean);
  } else if (typeof p.amenities === 'string' && p.amenities.trim()) {
    try {
      const parsed = JSON.parse(p.amenities);
      amenities = Array.isArray(parsed) 
        ? parsed.map(a => typeof a === 'string' ? a.trim() : String(a)).filter(Boolean)
        : p.amenities.split(',').map(s => s.trim()).filter(Boolean);
    } catch {
      amenities = p.amenities.split(',').map(s => s.trim()).filter(Boolean);
    }
  }

  return {
    ...p,
    categorySlug: p.category_slug || p.categorySlug || 'apartments',
    categoryName: p.category_name || p.categoryName || 'Apartment',
    priceNumber: p.price_number || p.priceNumber || 0,
    areaSqFt: p.area_sq_ft || p.areaSqFt || 0,
    mapCoordinates: p.map_coordinates || p.mapCoordinates || '17.3850, 78.4867',
    createdDate: p.created_at || p.createdDate || new Date().toISOString(),
    images,
    amenities
  };
}

// Helper to get local stored properties or fallback to mockData
function getLocalProperties() {
  try {
    const stored = localStorage.getItem('sbp_db_properties');
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed.map(normalizeProperty);
    }
  } catch {}
  return initialProperties.map(normalizeProperty);
}

function saveLocalProperties(props) {
  try {
    localStorage.setItem('sbp_db_properties', JSON.stringify(props));
  } catch {}
}

function getLocalCategories() {
  try {
    const stored = localStorage.getItem('sbp_db_categories');
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {}
  return [...initialCategories];
}

function saveLocalCategories(cats) {
  try {
    localStorage.setItem('sbp_db_categories', JSON.stringify(cats));
  } catch {}
}

function getLocalProjects() {
  try {
    const stored = localStorage.getItem('sbp_db_projects');
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {}
  return [...initialProjects];
}

function saveLocalProjects(projs) {
  try {
    localStorage.setItem('sbp_db_projects', JSON.stringify(projs));
  } catch {}
}

function getLocalServices() {
  try {
    const stored = localStorage.getItem('sbp_db_services');
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {}
  return [...initialServices];
}

function saveLocalServices(services) {
  try {
    localStorage.setItem('sbp_db_services', JSON.stringify(services));
  } catch {}
}

// Enquiries start strictly at 0 (zero) as requested
function getLocalEnquiries() {
  try {
    const stored = localStorage.getItem('sbp_db_enquiries');
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed)) {
        return parsed.filter(e => 
          e.id !== 'enq-seed-1' &&
          !e.id?.includes('seed') &&
          !e.id?.startsWith('enq-1') &&
          !e.id?.startsWith('enq-2') &&
          e.name !== 'Rajesh Kumar Verma' &&
          !e.email?.includes('example.com')
        );
      }
    }
  } catch {}
  return []; // ZERO enquiries initially
}

function saveLocalEnquiries(enqs) {
  try {
    localStorage.setItem('sbp_db_enquiries', JSON.stringify(enqs));
  } catch {}
}

function getLocalSettings() {
  try {
    const stored = localStorage.getItem('sbp_db_settings');
    if (stored) return JSON.parse(stored);
  } catch {}
  return {
    siteName: 'Super Best Properties',
    tagline: 'Building Opportunities. Creating Wealth.',
    phone: '+91 7075539189',
    whatsappNumber: '917075539189',
    email: 'contact@superbestproperties.com',
    address: 'H.No 5-5-35/193, Prashanth Nagar, Vanasthalipuram, Hyderabad, Telangana 500070',
    googleMapsUrl: 'https://maps.google.com/?q=Vanasthalipuram,Hyderabad',
    headerAnnouncement: 'RERA & HMDA Approved Layouts in Hyderabad Growth Corridors',
    facebookUrl: 'https://facebook.com',
    instagramUrl: 'https://instagram.com',
    linkedinUrl: 'https://linkedin.com',
    youtubeUrl: 'https://youtube.com',
    seoTitle: 'Super Best Properties | Real Estate Advisory & Property Solutions Hyderabad',
    seoDescription: 'Discover verified plots, flats, independent houses, gated community villas and landmark commercial projects across Hyderabad with Super Best Properties.'
  };
}

function saveLocalSettings(settings) {
  try {
    localStorage.setItem('sbp_db_settings', JSON.stringify(settings));
  } catch {}
}

function getLocalMedia() {
  try {
    const stored = localStorage.getItem('sbp_db_media');
    if (stored) return JSON.parse(stored);
  } catch {}
  return [
    {
      id: 'media-1',
      fileName: 'Tellapur Luxury Villa',
      url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1000&q=80',
      publicId: 'seed-1',
      format: 'jpg',
      bytes: 245000,
      associatedSection: 'Properties',
      uploadedAt: '2026-03-01T10:00:00Z'
    },
    {
      id: 'media-2',
      fileName: 'Open Plots Sunrise',
      url: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1000&q=80',
      publicId: 'seed-2',
      format: 'jpg',
      bytes: 310000,
      associatedSection: 'Hero Banner',
      uploadedAt: '2026-03-01T11:00:00Z'
    }
  ];
}

function saveLocalMedia(media) {
  try {
    localStorage.setItem('sbp_db_media', JSON.stringify(media));
  } catch {}
}

function filterAndSortProps(propsList, params = {}) {
  let props = [...propsList];
  const { type, location, minPrice, maxPrice, bedrooms, status, featured, search, sort } = params;

  if (type && type !== 'all' && type !== 'Select Type') {
    props = props.filter(p => p.categorySlug === type || (p.categoryName && p.categoryName.toLowerCase() === type.toLowerCase()));
  }
  if (location && location !== 'all' && location !== 'Select Location') {
    props = props.filter(p => p.location && p.location.toLowerCase().includes(location.toLowerCase()));
  }
  if (bedrooms && bedrooms !== 'all' && bedrooms !== 'Any') {
    props = props.filter(p => p.bedrooms && p.bedrooms.toLowerCase().includes(bedrooms.toLowerCase()));
  }
  if (status && status !== 'all') {
    props = props.filter(p => p.status && p.status.toLowerCase() === status.toLowerCase());
  }
  if (featured === 'true' || featured === true) {
    props = props.filter(p => p.featured === true);
  }
  if (search) {
    const s = search.toLowerCase();
    props = props.filter(p =>
      (p.title && p.title.toLowerCase().includes(s)) ||
      (p.location && p.location.toLowerCase().includes(s)) ||
      (p.categoryName && p.categoryName.toLowerCase().includes(s)) ||
      (p.description && p.description.toLowerCase().includes(s))
    );
  }
  if (minPrice) {
    props = props.filter(p => p.priceNumber >= Number(minPrice));
  }
  if (maxPrice) {
    props = props.filter(p => p.priceNumber <= Number(maxPrice));
  }

  if (sort === 'price-low') {
    props.sort((a, b) => a.priceNumber - b.priceNumber);
  } else if (sort === 'price-high') {
    props.sort((a, b) => b.priceNumber - a.priceNumber);
  } else if (sort === 'area-high') {
    props.sort((a, b) => (b.areaSqFt || 0) - (a.areaSqFt || 0));
  } else {
    props.sort((a, b) => new Date(b.createdDate || b.createdAt || 0) - new Date(a.createdDate || a.createdAt || 0));
  }

  return props;
}

export const api = {
  // -------------------------------------------------------------
  // AUTHENTICATION
  // -------------------------------------------------------------
  async login(username, password) {
    if (username.includes('@')) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: username,
          password: password
        });
        if (!error && data?.session) {
          const token = data.session.access_token;
          localStorage.setItem('sbp_admin_token', token);
          return { success: true, token, user: data.user };
        }
      } catch (err) {
        console.warn('Supabase Auth notice:', err.message);
      }
    }

    const customAdminPass = localStorage.getItem('sbp_admin_custom_pass');
    const isValidPass = customAdminPass ? (password === customAdminPass) : (password === 'admin123' || password === 'admin');

    if ((username === 'admin' || username === 'admin@superbestproperties.com') && isValidPass) {
      const authData = { 
        success: true, 
        token: 'sbp-admin-token-' + Date.now(), 
        user: { username: 'admin', email: 'admin@superbestproperties.com', role: 'super_admin' } 
      };
      localStorage.setItem('sbp_admin_token', authData.token);
      return authData;
    }

    throw new Error('Invalid username or password. Please verify credentials.');
  },

  async logout() {
    try {
      await supabase.auth.signOut();
    } catch {}
    localStorage.removeItem('sbp_admin_token');
    return { success: true };
  },

  async changeAdminPassword(oldPass, newPass) {
    const customAdminPass = localStorage.getItem('sbp_admin_custom_pass');
    const currentPass = customAdminPass || 'admin123';
    if (oldPass !== currentPass) {
      throw new Error('Current password does not match.');
    }
    if (!newPass || newPass.length < 5) {
      throw new Error('New password must be at least 5 characters.');
    }
    localStorage.setItem('sbp_admin_custom_pass', newPass);
    return { success: true };
  },

  // -------------------------------------------------------------
  // PROPERTIES (BUY A PROPERTY PORTFOLIO)
  // -------------------------------------------------------------
  async getProperties(params = {}) {
    try {
      const { data, error } = await supabase.from('properties').select('*');
      if (!error && Array.isArray(data) && data.length > 0) {
        const formatted = data.map(normalizeProperty);
        saveLocalProperties(formatted);
        return filterAndSortProps(formatted, params);
      }
    } catch {}

    const localProps = getLocalProperties();
    return filterAndSortProps(localProps, params);
  },

  async getProperty(idOrSlug) {
    const props = await this.getProperties();
    const cleanSearch = (idOrSlug || '').toLowerCase().trim();
    
    // 1. Exact match by id or slug
    let prop = props.find(p => 
      (p.id && p.id.toLowerCase() === cleanSearch) || 
      (p.slug && p.slug.toLowerCase() === cleanSearch)
    );

    // 2. Fuzzy match by partial slug or title slug
    if (!prop) {
      prop = props.find(p => {
        const pSlug = (p.slug || '').toLowerCase();
        const pTitleSlug = (p.title || '').toLowerCase().replace(/[^a-z0-9]+/g, '-');
        return pSlug.includes(cleanSearch) || cleanSearch.includes(pSlug) ||
               pTitleSlug.includes(cleanSearch) || cleanSearch.includes(pTitleSlug);
      });
    }

    // 3. Fallback to first property if available
    if (!prop && props.length > 0) {
      prop = props[0];
    }

    if (!prop) {
      return { property: null, similar: [] };
    }

    const safeProp = normalizeProperty(prop);
    const similar = props
      .filter(p => p.id !== safeProp.id && (p.categorySlug === safeProp.categorySlug || p.city === safeProp.city))
      .slice(0, 3)
      .map(normalizeProperty);

    return { property: safeProp, similar };
  },

  async createProperty(propertyData, token) {
    const props = getLocalProperties();
    const newId = `prop-${Date.now()}`;
    const newSlug = (propertyData.title || 'property').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') + `-${Date.now().toString().slice(-4)}`;
    
    const newProp = normalizeProperty({
      ...propertyData,
      id: newId,
      slug: newSlug,
      createdDate: new Date().toISOString()
    });

    props.unshift(newProp);
    saveLocalProperties(props);

    try {
      await supabase.from('properties').insert([{
        id: newProp.id,
        title: newProp.title,
        slug: newProp.slug,
        category_slug: newProp.categorySlug,
        category_name: newProp.categoryName,
        price: newProp.price,
        price_number: newProp.priceNumber || 0,
        location: newProp.location,
        city: newProp.city || 'Hyderabad',
        area: newProp.area,
        area_sq_ft: newProp.areaSqFt || 0,
        bedrooms: newProp.bedrooms,
        bathrooms: newProp.bathrooms,
        status: newProp.status || 'Available',
        featured: Boolean(newProp.featured),
        published: true,
        images: newProp.images || [],
        description: newProp.description,
        amenities: typeof newProp.amenities === 'string' ? newProp.amenities : JSON.stringify(newProp.amenities),
        map_coordinates: newProp.mapCoordinates
      }]);
    } catch (err) {
      console.warn('Supabase property insert notice:', err.message);
    }

    return newProp;
  },

  async updateProperty(id, propertyData, token) {
    const props = getLocalProperties();
    const idx = props.findIndex(p => p.id === id);
    if (idx !== -1) {
      const normalized = normalizeProperty({
        ...props[idx],
        ...propertyData,
        updatedDate: new Date().toISOString()
      });
      props[idx] = normalized;
      saveLocalProperties(props);

      try {
        await supabase.from('properties').update({
          title: normalized.title,
          category_slug: normalized.categorySlug,
          category_name: normalized.categoryName,
          price: normalized.price,
          price_number: normalized.priceNumber || 0,
          location: normalized.location,
          city: normalized.city || 'Hyderabad',
          area: normalized.area,
          area_sq_ft: normalized.areaSqFt || 0,
          bedrooms: normalized.bedrooms,
          bathrooms: normalized.bathrooms,
          status: normalized.status,
          featured: Boolean(normalized.featured),
          images: normalized.images,
          description: normalized.description,
          amenities: typeof propertyData.amenities === 'string' ? propertyData.amenities : JSON.stringify(normalized.amenities),
          map_coordinates: normalized.mapCoordinates,
          updated_at: new Date().toISOString()
        }).eq('id', id);
      } catch (err) {
        console.warn('Supabase property update notice:', err.message);
      }

      return props[idx];
    }
    return propertyData;
  },

  async deleteProperty(id, token) {
    let props = getLocalProperties();
    props = props.filter(p => p.id !== id);
    saveLocalProperties(props);

    try {
      await supabase.from('properties').delete().eq('id', id);
    } catch (err) {
      console.warn('Supabase property delete notice:', err.message);
    }

    return { success: true };
  },

  // -------------------------------------------------------------
  // CATEGORIES (CRUD SUPPORT)
  // -------------------------------------------------------------
  async getCategories() {
    try {
      const { data, error } = await supabase.from('property_categories').select('*').order('display_order', { ascending: true });
      if (!error && Array.isArray(data) && data.length > 0) {
        saveLocalCategories(data);
      }
    } catch {}

    const cats = getLocalCategories();
    const props = getLocalProperties();
    return cats.map(c => ({
      ...c,
      propertyCount: props.filter(p => p.categorySlug === c.slug).length || c.propertyCount || 3
    }));
  },

  async createCategory(catData, token) {
    const cats = getLocalCategories();
    const slug = (catData.slug || catData.name || 'category').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    const newCat = {
      ...catData,
      id: `cat-${Date.now()}`,
      slug: slug,
      display_order: cats.length + 1,
      created_at: new Date().toISOString()
    };
    cats.push(newCat);
    saveLocalCategories(cats);

    try {
      await supabase.from('property_categories').insert([{
        slug: newCat.slug,
        name: newCat.name,
        description: newCat.description || '',
        icon_name: newCat.icon_name || 'Home',
        display_order: newCat.display_order
      }]);
    } catch {}

    return newCat;
  },

  async updateCategory(slug, catData, token) {
    const cats = getLocalCategories();
    const idx = cats.findIndex(c => c.slug === slug);
    if (idx !== -1) {
      cats[idx] = { ...cats[idx], ...catData };
      saveLocalCategories(cats);

      try {
        await supabase.from('property_categories').update({
          name: catData.name,
          description: catData.description,
          icon_name: catData.icon_name
        }).eq('slug', slug);
      } catch {}

      return cats[idx];
    }
    return catData;
  },

  async deleteCategory(slug, token) {
    let cats = getLocalCategories();
    cats = cats.filter(c => c.slug !== slug);
    saveLocalCategories(cats);

    try {
      await supabase.from('property_categories').delete().eq('slug', slug);
    } catch {}

    return { success: true };
  },

  async getCategory(slug) {
    const cats = await this.getCategories();
    const props = await this.getProperties();
    
    const normalizedSlug = (slug || '').toLowerCase();
    const category = cats.find(c => 
      c.slug === normalizedSlug || 
      c.slug.replace(/s$/, '') === normalizedSlug.replace(/s$/, '') ||
      c.name.toLowerCase() === normalizedSlug ||
      normalizedSlug.includes(c.slug)
    ) || {
      id: `cat-${slug}`,
      name: slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      slug: slug,
      description: `Premium verified ${slug.replace(/-/g, ' ')} listings in prime locations across Hyderabad & Telangana with DTCP/HMDA approvals.`,
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1000&q=80',
      propertyCount: 4
    };

    const matchingProperties = props.filter(p => 
      p.categorySlug === category.slug || 
      p.categorySlug.replace(/s$/, '') === normalizedSlug.replace(/s$/, '') ||
      (p.categoryName && p.categoryName.toLowerCase().includes(category.name.toLowerCase()))
    );

    return { category, properties: matchingProperties };
  },

  // -------------------------------------------------------------
  // LANDMARK PROJECTS (CRUD SUPPORT)
  // -------------------------------------------------------------
  async getProjects() {
    try {
      const { data, error } = await supabase.from('projects').select('*');
      if (!error && Array.isArray(data) && data.length > 0) {
        saveLocalProjects(data);
      }
    } catch {}
    return getLocalProjects();
  },

  async createProject(projectData, token) {
    const projs = getLocalProjects();
    const newId = `proj-${Date.now()}`;
    const newSlug = (projectData.name || 'project').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    const newProj = {
      ...projectData,
      id: newId,
      slug: newSlug,
      startingPrice: projectData.startingPrice || projectData.priceRange || '₹ 50 Lakhs',
      createdDate: new Date().toISOString()
    };
    projs.unshift(newProj);
    saveLocalProjects(projs);

    try {
      await supabase.from('projects').insert([{
        id: newProj.id,
        name: newProj.name,
        slug: newProj.slug,
        tagline: newProj.tagline || '',
        location: newProj.location || '',
        type: newProj.type || '',
        status: newProj.status || 'Ongoing',
        price_range: newProj.startingPrice,
        image: newProj.image || '',
        description: newProj.description || '',
        highlights: newProj.highlights || ''
      }]);
    } catch {}

    return newProj;
  },

  async updateProject(id, projectData, token) {
    const projs = getLocalProjects();
    const idx = projs.findIndex(p => p.id === id);
    if (idx !== -1) {
      projs[idx] = { 
        ...projs[idx], 
        ...projectData, 
        startingPrice: projectData.startingPrice || projectData.priceRange || projs[idx].startingPrice,
        updatedDate: new Date().toISOString() 
      };
      saveLocalProjects(projs);

      try {
        await supabase.from('projects').update({
          name: projectData.name,
          tagline: projectData.tagline,
          location: projectData.location,
          type: projectData.type,
          status: projectData.status,
          price_range: projectData.startingPrice || projectData.priceRange,
          image: projectData.image,
          description: projectData.description,
          highlights: projectData.highlights,
          updated_at: new Date().toISOString()
        }).eq('id', id);
      } catch {}

      return projs[idx];
    }
    return projectData;
  },

  async deleteProject(id, token) {
    let projs = getLocalProjects();
    projs = projs.filter(p => p.id !== id);
    saveLocalProjects(projs);

    try {
      await supabase.from('projects').delete().eq('id', id);
    } catch {}

    return { success: true };
  },

  // -------------------------------------------------------------
  // SERVICES (7 LIVE SERVICES - CRUD & DIRECT WEBSITE SYNC)
  // -------------------------------------------------------------
  async getServices() {
    try {
      const { data, error } = await supabase.from('services').select('*').order('display_order', { ascending: true });
      if (!error && Array.isArray(data) && data.length > 0) {
        const formatted = data.map(s => ({
          ...s,
          deliverables: Array.isArray(s.deliverables) ? s.deliverables : (typeof s.deliverables === 'string' ? JSON.parse(s.deliverables) : [])
        }));
        saveLocalServices(formatted);
        return formatted;
      }
    } catch {}

    return getLocalServices();
  },

  async createService(serviceData, token) {
    const services = getLocalServices();
    const newId = `srv-${Date.now()}`;
    const newSrv = {
      ...serviceData,
      id: newId,
      displayOrder: services.length + 1,
      deliverables: Array.isArray(serviceData.deliverables) 
        ? serviceData.deliverables 
        : (typeof serviceData.deliverables === 'string' 
            ? serviceData.deliverables.split('\n').filter(Boolean) 
            : [])
    };
    services.push(newSrv);
    saveLocalServices(services);

    try {
      await supabase.from('services').insert([{
        id: newSrv.id,
        title: newSrv.title,
        tagline: newSrv.tagline || '',
        description: newSrv.description || '',
        deliverables: newSrv.deliverables,
        display_order: newSrv.displayOrder
      }]);
    } catch {}

    return newSrv;
  },

  async updateService(id, serviceData, token) {
    const services = getLocalServices();
    const idx = services.findIndex(s => s.id === id);
    if (idx !== -1) {
      const deliverablesList = Array.isArray(serviceData.deliverables)
        ? serviceData.deliverables
        : (typeof serviceData.deliverables === 'string'
            ? serviceData.deliverables.split('\n').filter(Boolean)
            : services[idx].deliverables);

      services[idx] = { 
        ...services[idx], 
        ...serviceData,
        deliverables: deliverablesList
      };
      saveLocalServices(services);

      try {
        await supabase.from('services').update({
          title: serviceData.title,
          tagline: serviceData.tagline,
          description: serviceData.description,
          deliverables: deliverablesList
        }).eq('id', id);
      } catch {}

      return services[idx];
    }
    return serviceData;
  },

  async deleteService(id, token) {
    let services = getLocalServices();
    services = services.filter(s => s.id !== id);
    saveLocalServices(services);

    try {
      await supabase.from('services').delete().eq('id', id);
    } catch {}

    return { success: true };
  },

  // -------------------------------------------------------------
  // CUSTOMER ENQUIRIES & LEADS (REAL-TIME SUBMISSIONS)
  // -------------------------------------------------------------
  async submitEnquiry(enquiryData) {
    const enqs = getLocalEnquiries();
    const newId = `enq-${Date.now()}`;
    const newEnq = {
      ...enquiryData,
      id: newId,
      status: 'New',
      createdAt: new Date().toISOString()
    };
    enqs.unshift(newEnq);
    saveLocalEnquiries(enqs);

    // Save directly to Supabase
    try {
      await supabase.from('enquiries').insert([{
        id: newEnq.id,
        name: newEnq.name,
        phone: newEnq.phone,
        email: newEnq.email || null,
        property_id: newEnq.propertyId || null,
        property_title: newEnq.propertyTitle || null,
        property_type: newEnq.propertyType || null,
        budget: newEnq.budget || null,
        message: newEnq.message || '',
        source: newEnq.source || 'Website Form',
        status: 'New'
      }]);
    } catch (err) {
      console.warn('Supabase enquiry submit notice:', err.message);
    }

    return { success: true, enquiry: newEnq };
  },

  async getEnquiries(token) {
    try {
      // Purge any seed/mock records in Supabase so enquiries start strictly at 0
      try {
        supabase.from('enquiries').delete().eq('id', 'enq-seed-1').then(() => {});
        supabase.from('enquiries').delete().like('id', '%seed%').then(() => {});
      } catch {}

      const { data, error } = await supabase.from('enquiries').select('*').order('created_at', { ascending: false });
      if (!error && Array.isArray(data)) {
        // Exclude mock seed data so count starts strictly at 0
        const clean = data.filter(e => 
          e.id !== 'enq-seed-1' &&
          !e.id?.includes('seed') &&
          !e.id?.startsWith('enq-1') &&
          !e.id?.startsWith('enq-2') &&
          e.name !== 'Rajesh Kumar Verma' &&
          !e.email?.includes('example.com')
        );
        const formatted = clean.map(e => ({
          ...e,
          createdAt: e.created_at || e.createdAt,
          propertyTitle: e.property_title || e.propertyTitle,
          propertyType: e.property_type || e.propertyType
        }));
        saveLocalEnquiries(formatted);
        return formatted;
      }
    } catch {}

    return getLocalEnquiries();
  },

  async updateEnquiry(id, data, token) {
    const enqs = getLocalEnquiries();
    const idx = enqs.findIndex(e => e.id === id);
    if (idx !== -1) {
      enqs[idx] = { ...enqs[idx], ...data, updatedAt: new Date().toISOString() };
      saveLocalEnquiries(enqs);

      try {
        await supabase.from('enquiries').update({
          status: data.status,
          internal_notes: data.internalNotes || data.internal_notes,
          updated_at: new Date().toISOString()
        }).eq('id', id);
      } catch {}

      return enqs[idx];
    }
    return data;
  },

  async deleteEnquiry(id, token) {
    let enqs = getLocalEnquiries();
    enqs = enqs.filter(e => e.id !== id);
    saveLocalEnquiries(enqs);

    try {
      await supabase.from('enquiries').delete().eq('id', id);
    } catch {}

    return { success: true };
  },

  // -------------------------------------------------------------
  // WEBSITE SETTINGS & SITE CONTENT
  // -------------------------------------------------------------
  async getSettings() {
    try {
      const { data, error } = await supabase.from('website_settings').select('*').eq('id', 'primary_settings').single();
      if (!error && data) {
        const mapped = {
          siteName: data.site_name || data.siteName,
          tagline: data.tagline,
          phone: data.phone,
          whatsappNumber: data.whatsapp_number || data.whatsappNumber,
          email: data.email,
          address: data.address,
          googleMapsUrl: data.google_maps_url || data.googleMapsUrl,
          headerAnnouncement: data.header_announcement || data.headerAnnouncement,
          facebookUrl: data.facebook_url || data.facebookUrl,
          instagramUrl: data.instagram_url || data.instagramUrl,
          linkedinUrl: data.linkedin_url || data.linkedinUrl,
          youtubeUrl: data.youtube_url || data.youtubeUrl,
          seoTitle: data.seo_title || data.seoTitle,
          seoDescription: data.seo_description || data.seoDescription
        };
        saveLocalSettings(mapped);
        return mapped;
      }
    } catch {}

    return getLocalSettings();
  },

  async updateSettings(settings, token) {
    const updated = { ...getLocalSettings(), ...settings };
    saveLocalSettings(updated);

    try {
      await supabase.from('website_settings').upsert({
        id: 'primary_settings',
        site_name: updated.siteName,
        tagline: updated.tagline,
        phone: updated.phone,
        whatsapp_number: updated.whatsappNumber,
        email: updated.email,
        address: updated.address,
        google_maps_url: updated.googleMapsUrl,
        header_announcement: updated.headerAnnouncement,
        facebook_url: updated.facebookUrl,
        instagram_url: updated.instagramUrl,
        linkedin_url: updated.linkedinUrl,
        youtube_url: updated.youtubeUrl,
        seo_title: updated.seoTitle,
        seo_description: updated.seoDescription,
        updated_at: new Date().toISOString()
      });
    } catch {}

    return updated;
  },

  async getContent() {
    try {
      const stored = localStorage.getItem('sbp_db_content');
      if (stored) return JSON.parse(stored);
    } catch {}
    return initialSiteContent;
  },

  async updateContent(data, token) {
    try {
      localStorage.setItem('sbp_db_content', JSON.stringify(data));
    } catch {}
    return data;
  },

  // -------------------------------------------------------------
  // MEDIA LIBRARY
  // -------------------------------------------------------------
  async getMediaLibrary() {
    try {
      const { data, error } = await supabase.from('media_library').select('*').order('created_at', { ascending: false });
      if (!error && Array.isArray(data) && data.length > 0) {
        saveLocalMedia(data);
        return data;
      }
    } catch {}
    return getLocalMedia();
  },

  async saveMediaAsset(asset) {
    const media = getLocalMedia();
    const newAsset = {
      id: `media-${Date.now()}`,
      fileName: asset.fileName || 'Uploaded Asset',
      url: asset.url,
      publicId: asset.publicId || '',
      format: asset.format || 'jpg',
      bytes: asset.bytes || 0,
      associatedSection: asset.associatedSection || 'General',
      uploadedAt: new Date().toISOString()
    };
    media.unshift(newAsset);
    saveLocalMedia(media);

    try {
      await supabase.from('media_library').insert([{
        id: newAsset.id,
        file_name: newAsset.fileName,
        url: newAsset.url,
        public_id: newAsset.publicId,
        format: newAsset.format,
        bytes: newAsset.bytes,
        associated_section: newAsset.associatedSection
      }]);
    } catch {}

    return newAsset;
  },

  async deleteMediaAsset(id) {
    let media = getLocalMedia();
    media = media.filter(m => m.id !== id);
    saveLocalMedia(media);

    try {
      await supabase.from('media_library').delete().eq('id', id);
    } catch {}

    return { success: true };
  },

  // -------------------------------------------------------------
  // ADMIN DASHBOARD STATS
  // -------------------------------------------------------------
  async getAdminStats(token) {
    const props = await this.getProperties();
    const projs = await this.getProjects();
    const cats = await this.getCategories();
    const srvs = await this.getServices();
    const enqs = await this.getEnquiries(token);
    
    return {
      totalProperties: props.length,
      availableProperties: props.filter(p => (p.status || '').toLowerCase() === 'available').length,
      soldProperties: props.filter(p => (p.status || '').toLowerCase() === 'sold').length,
      featuredProperties: props.filter(p => p.featured === true).length,
      totalProjects: projs.length,
      totalCategories: cats.length,
      totalServices: srvs.length,
      totalEnquiries: enqs.length,
      newLeads: enqs.filter(e => (e.status || '').toLowerCase() === 'new').length,
      convertedLeads: enqs.filter(e => (e.status || '').toLowerCase() === 'converted').length,
      recentEnquiries: enqs.slice(0, 6)
    };
  }
};
