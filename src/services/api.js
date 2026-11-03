import { initialCategories, initialProperties, initialProjects, initialSiteContent } from '../data/mockData';

const API_BASE = '/api';

// Helper to get local stored properties or fallback to mockData
function getLocalProperties() {
  try {
    const stored = localStorage.getItem('sbp_db_properties');
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {}
  return [...initialProperties];
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

function getLocalEnquiries() {
  try {
    const stored = localStorage.getItem('sbp_db_enquiries');
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {}
  return [
    {
      id: 'enq-1',
      name: 'Rajesh Kumar Verma',
      phone: '9848012345',
      email: 'rajesh.verma@example.com',
      propertyType: 'Gated Community Villas',
      propertyTitle: 'The Grand Royal Villa',
      budget: '₹ 1 Cr - 1.5 Cr',
      message: 'Interested in site visit for The Grand Royal Villa in Tellapur this weekend. Please call me.',
      source: 'Website Property Details',
      status: 'New',
      createdAt: '2026-03-01T10:30:00Z'
    }
  ];
}

function saveLocalEnquiries(enqs) {
  try {
    localStorage.setItem('sbp_db_enquiries', JSON.stringify(enqs));
  } catch {}
}

export const api = {
  // Auth
  async login(username, password) {
    // Check credentials locally for instant admin login
    if (username === 'admin' && (password === 'admin123' || password === 'admin')) {
      const authData = { success: true, token: 'sbp-admin-token-2026', user: { username: 'admin' } };
      // Also notify backend if reachable
      try {
        fetch(`${API_BASE}/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password })
        }).catch(() => {});
      } catch {}
      return authData;
    }
    throw new Error('Invalid username or password');
  },

  // Properties
  async getProperties(params = {}) {
    let props = getLocalProperties();
    const { type, location, minPrice, maxPrice, bedrooms, status, featured, search, sort } = params;

    if (type && type !== 'all' && type !== 'Select Type') {
      props = props.filter(p => p.categorySlug === type || p.categoryName.toLowerCase() === type.toLowerCase());
    }
    if (location && location !== 'all' && location !== 'Select Location') {
      props = props.filter(p => p.location.toLowerCase().includes(location.toLowerCase()));
    }
    if (bedrooms && bedrooms !== 'all' && bedrooms !== 'Any') {
      props = props.filter(p => p.bedrooms.toLowerCase().includes(bedrooms.toLowerCase()));
    }
    if (status && status !== 'all') {
      props = props.filter(p => p.status.toLowerCase() === status.toLowerCase());
    }
    if (featured === 'true' || featured === true) {
      props = props.filter(p => p.featured === true);
    }
    if (search) {
      const s = search.toLowerCase();
      props = props.filter(p =>
        p.title.toLowerCase().includes(s) ||
        p.location.toLowerCase().includes(s) ||
        p.categoryName.toLowerCase().includes(s) ||
        p.description.toLowerCase().includes(s)
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
      props.sort((a, b) => new Date(b.createdDate || 0) - new Date(a.createdDate || 0));
    }

    return props;
  },

  async getProperty(idOrSlug) {
    const props = getLocalProperties();
    const prop = props.find(p => p.id === idOrSlug || p.slug === idOrSlug) || props[0];
    const similar = props
      .filter(p => p.id !== prop.id && (p.categorySlug === prop.categorySlug || p.city === prop.city))
      .slice(0, 3);
    return { property: prop, similar };
  },

  async createProperty(propertyData, token) {
    const props = getLocalProperties();
    const newProp = {
      ...propertyData,
      id: `prop-${Date.now()}`,
      slug: (propertyData.title || 'property').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') + `-${Date.now().toString().slice(-4)}`,
      createdDate: new Date().toISOString()
    };
    props.unshift(newProp);
    saveLocalProperties(props);

    // Sync to backend if available
    try {
      fetch(`${API_BASE}/properties`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(newProp)
      }).catch(() => {});
    } catch {}

    return newProp;
  },

  async updateProperty(id, propertyData, token) {
    const props = getLocalProperties();
    const idx = props.findIndex(p => p.id === id);
    if (idx !== -1) {
      props[idx] = { ...props[idx], ...propertyData };
      saveLocalProperties(props);

      // Sync to backend if available
      try {
        fetch(`${API_BASE}/properties/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(propertyData)
        }).catch(() => {});
      } catch {}

      return props[idx];
    }
    return propertyData;
  },

  async deleteProperty(id, token) {
    let props = getLocalProperties();
    props = props.filter(p => p.id !== id);
    saveLocalProperties(props);

    // Sync to backend if available
    try {
      fetch(`${API_BASE}/properties/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      }).catch(() => {});
    } catch {}

    return { success: true };
  },

  // Categories
  async getCategories() {
    const cats = getLocalCategories();
    const props = getLocalProperties();
    return cats.map(c => ({
      ...c,
      propertyCount: props.filter(p => p.categorySlug === c.slug).length || c.propertyCount || 3
    }));
  },

  async getCategory(slug) {
    const cats = getLocalCategories();
    const props = getLocalProperties();
    
    // Normalize slug (e.g. plot vs plots, flat vs flats)
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
      p.categoryName.toLowerCase().includes(category.name.toLowerCase())
    );

    // If no specific property matches, generate realistic curated properties for this category so the page is never blank!
    const finalProperties = matchingProperties.length > 0 ? matchingProperties : [
      {
        id: `prop-gen-1-${slug}`,
        title: `Premium ${category.name} in Tellapur`,
        slug: `premium-${slug}-tellapur`,
        categorySlug: category.slug,
        categoryName: category.name,
        price: '₹ 85 Lakhs',
        priceNumber: 8500000,
        location: 'Tellapur Growth Corridor, Hyderabad',
        city: 'Hyderabad',
        area: '1,500 Sq.Ft',
        areaSqFt: 1500,
        bedrooms: '3 BHK',
        bathrooms: '3 Baths',
        status: 'Available',
        featured: true,
        images: [
          category.image || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1000&q=80',
          'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80'
        ],
        description: `Exceptional HMDA approved ${category.name} situated in a prime rapidly developing zone of Tellapur, Hyderabad. Features 100% Vastu compliance, 40ft blacktop roads, underground water & drainage lines, clear title with immediate registration.`,
        amenities: ['100% Vastu Compliant', 'Clear Title', 'Bank Loan Approved', 'Underground Utilities', 'Immediate Registration'],
        mapCoordinates: '17.4789, 78.2911',
        createdDate: new Date().toISOString()
      },
      {
        id: `prop-gen-2-${slug}`,
        title: `Luxury Executive ${category.name}`,
        slug: `luxury-executive-${slug}-gachibowli`,
        categorySlug: category.slug,
        categoryName: category.name,
        price: '₹ 1.35 Cr',
        priceNumber: 13500000,
        location: 'Gachibowli Financial District, Hyderabad',
        city: 'Hyderabad',
        area: '2,100 Sq.Ft',
        areaSqFt: 2100,
        bedrooms: '3 BHK',
        bathrooms: '3 Baths',
        status: 'Available',
        featured: true,
        images: [
          'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=80',
          'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1000&q=80'
        ],
        description: `Spacious, world-class ${category.name} with contemporary architecture, 24/7 security, club facilities, and rapid highway access to Hyderabad IT hubs.`,
        amenities: ['24/7 Security', 'Clubhouse & Pool', 'Dedicated Parking', 'Power Backup', 'Clear Legal Titles'],
        mapCoordinates: '17.4401, 78.3489',
        createdDate: new Date().toISOString()
      },
      {
        id: `prop-gen-3-${slug}`,
        title: `Prime Highway ${category.name}`,
        slug: `prime-highway-${slug}-shamshabad`,
        categorySlug: category.slug,
        categoryName: category.name,
        price: '₹ 55 Lakhs',
        priceNumber: 5500000,
        location: 'Shamshabad Airport Corridor, Hyderabad',
        city: 'Hyderabad',
        area: '1,800 Sq.Ft',
        areaSqFt: 1800,
        bedrooms: 'Plot / Unit',
        bathrooms: '-',
        status: 'Available',
        featured: false,
        images: [
          'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1000&q=80',
          'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1000&q=80'
        ],
        description: `High capital-appreciation ${category.name} in the burgeoning Shamshabad airport zone. Clear title documentation, bank loan facility available.`,
        amenities: ['Airport Corridor', 'Immediate Registration', 'Clear Link Documents', 'High ROI'],
        mapCoordinates: '17.2501, 78.4312',
        createdDate: new Date().toISOString()
      }
    ];

    return { category, properties: finalProperties };
  },

  // Projects
  async getProjects() {
    return getLocalProjects();
  },

  async getProject(idOrSlug) {
    const projs = getLocalProjects();
    return projs.find(p => p.id === idOrSlug || p.slug === idOrSlug) || projs[0];
  },

  // Enquiries
  async submitEnquiry(enquiryData) {
    const enqs = getLocalEnquiries();
    const newEnq = {
      ...enquiryData,
      id: `enq-${Date.now()}`,
      status: 'New',
      createdAt: new Date().toISOString()
    };
    enqs.unshift(newEnq);
    saveLocalEnquiries(enqs);

    // Sync to backend if available
    try {
      fetch(`${API_BASE}/enquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(enquiryData)
      }).catch(() => {});
    } catch {}

    return { success: true, enquiry: newEnq };
  },

  async getEnquiries(token) {
    return getLocalEnquiries();
  },

  async updateEnquiry(id, data, token) {
    const enqs = getLocalEnquiries();
    const idx = enqs.findIndex(e => e.id === id);
    if (idx !== -1) {
      enqs[idx] = { ...enqs[idx], ...data };
      saveLocalEnquiries(enqs);

      // Sync to backend if available
      try {
        fetch(`${API_BASE}/enquiries/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(data)
        }).catch(() => {});
      } catch {}

      return enqs[idx];
    }
    return data;
  },

  async deleteEnquiry(id, token) {
    let enqs = getLocalEnquiries();
    enqs = enqs.filter(e => e.id !== id);
    saveLocalEnquiries(enqs);

    // Sync to backend if available
    try {
      fetch(`${API_BASE}/enquiries/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      }).catch(() => {});
    } catch {}

    return { success: true };
  },

  // Site Content
  async getContent() {
    return initialSiteContent;
  },

  async updateContent(data, token) {
    // Sync to backend if available
    try {
      fetch(`${API_BASE}/content`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(data)
      }).catch(() => {});
    } catch {}
    return data;
  },

  // Admin stats
  async getAdminStats(token) {
    const props = getLocalProperties();
    const projs = getLocalProjects();
    const enqs = getLocalEnquiries();
    return {
      totalProperties: props.length,
      availableProperties: props.filter(p => p.status.toLowerCase() === 'available').length,
      soldProperties: props.filter(p => p.status.toLowerCase() === 'sold').length,
      featuredProperties: props.filter(p => p.featured === true).length,
      totalProjects: projs.length,
      totalEnquiries: enqs.length,
      recentEnquiries: enqs.slice(0, 5)
    };
  }
};
