import express from 'express';
import cors from 'cors';
import { initialCategories, initialProperties, initialProjects, initialSiteContent } from '../src/data/mockData.js';

const app = express();
app.use(cors());
app.use(express.json());

// In-memory properties for serverless function lifetime
let propertiesStore = [...initialProperties];
let enquiriesStore = [
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

// Support both /api/* and /* paths so Vercel rewrites work seamlessly
const prefixes = ['/api', ''];

prefixes.forEach(prefix => {
  // Properties
  app.get(`${prefix}/properties`, (req, res) => {
    let properties = [...propertiesStore];
    const { type, location, minPrice, maxPrice, bedrooms, status, featured, search, sort } = req.query;

    if (type && type !== 'all' && type !== 'Select Type') {
      properties = properties.filter(p => p.categorySlug === type || p.categoryName.toLowerCase() === type.toLowerCase());
    }
    if (location && location !== 'all' && location !== 'Select Location') {
      properties = properties.filter(p => p.location.toLowerCase().includes(location.toLowerCase()));
    }
    if (bedrooms && bedrooms !== 'all' && bedrooms !== 'Any') {
      properties = properties.filter(p => p.bedrooms.toLowerCase().includes(bedrooms.toLowerCase()));
    }
    if (status && status !== 'all') {
      properties = properties.filter(p => p.status.toLowerCase() === status.toLowerCase());
    }
    if (featured === 'true' || featured === true) {
      properties = properties.filter(p => p.featured === true);
    }
    if (search) {
      const s = search.toLowerCase();
      properties = properties.filter(p =>
        p.title.toLowerCase().includes(s) ||
        p.location.toLowerCase().includes(s) ||
        p.categoryName.toLowerCase().includes(s) ||
        p.description.toLowerCase().includes(s)
      );
    }
    if (minPrice) {
      properties = properties.filter(p => p.priceNumber >= Number(minPrice));
    }
    if (maxPrice) {
      properties = properties.filter(p => p.priceNumber <= Number(maxPrice));
    }

    if (sort === 'price-low') {
      properties.sort((a, b) => a.priceNumber - b.priceNumber);
    } else if (sort === 'price-high') {
      properties.sort((a, b) => b.priceNumber - a.priceNumber);
    } else if (sort === 'area-high') {
      properties.sort((a, b) => (b.areaSqFt || 0) - (a.areaSqFt || 0));
    } else {
      properties.sort((a, b) => new Date(b.createdDate || 0) - new Date(a.createdDate || 0));
    }

    res.json(properties);
  });

  app.get(`${prefix}/properties/:idOrSlug`, (req, res) => {
    const { idOrSlug } = req.params;
    const prop = propertiesStore.find(p => p.id === idOrSlug || p.slug === idOrSlug) || propertiesStore[0];
    const similar = propertiesStore
      .filter(p => p.id !== prop.id && (p.categorySlug === prop.categorySlug || p.city === prop.city))
      .slice(0, 3);
    res.json({ property: prop, similar });
  });

  app.post(`${prefix}/properties`, (req, res) => {
    const newProp = {
      ...req.body,
      id: `prop-${Date.now()}`,
      slug: (req.body.title || 'property').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') + `-${Date.now().toString().slice(-4)}`,
      createdDate: new Date().toISOString()
    };
    propertiesStore.unshift(newProp);
    res.status(201).json(newProp);
  });

  app.put(`${prefix}/properties/:id`, (req, res) => {
    const index = propertiesStore.findIndex(p => p.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ error: 'Property not found' });
    }
    propertiesStore[index] = { ...propertiesStore[index], ...req.body, id: propertiesStore[index].id };
    res.json(propertiesStore[index]);
  });

  app.delete(`${prefix}/properties/:id`, (req, res) => {
    propertiesStore = propertiesStore.filter(p => p.id !== req.params.id);
    res.json({ success: true });
  });

  // Categories
  app.get(`${prefix}/categories`, (req, res) => {
    const catsWithCounts = initialCategories.map(cat => ({
      ...cat,
      propertyCount: propertiesStore.filter(p => p.categorySlug === cat.slug).length || cat.propertyCount || 3
    }));
    res.json(catsWithCounts);
  });

  app.get(`${prefix}/categories/:slug`, (req, res) => {
    const { slug } = req.params;
    const normalized = slug.toLowerCase();
    const category = initialCategories.find(c => 
      c.slug === normalized || 
      c.slug.replace(/s$/, '') === normalized.replace(/s$/, '') ||
      c.name.toLowerCase().replace(/[^a-z0-9]/g, '') === normalized.replace(/[^a-z0-9]/g, '')
    ) || initialCategories[0];

    let properties = propertiesStore.filter(p => 
      p.categorySlug === category.slug || 
      p.categorySlug.replace(/s$/, '') === normalized.replace(/s$/, '')
    );

    // If no direct property matches, provide curated properties
    if (properties.length === 0) {
      properties = [
        {
          id: `prop-gen-1-${category.slug}`,
          title: `Premium ${category.name} in Tellapur`,
          slug: `premium-${category.slug}-tellapur`,
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
        }
      ];
    }

    res.json({ category, properties });
  });

  // Projects
  app.get(`${prefix}/projects`, (req, res) => {
    res.json(initialProjects);
  });

  app.get(`${prefix}/projects/:idOrSlug`, (req, res) => {
    const { idOrSlug } = req.params;
    const project = initialProjects.find(p => p.id === idOrSlug || p.slug === idOrSlug) || initialProjects[0];
    res.json(project);
  });

  // Site Content
  app.get([`${prefix}/content`, `${prefix}/site-content`], (req, res) => {
    res.json(initialSiteContent);
  });

  // Auth
  app.post(`${prefix}/auth/login`, (req, res) => {
    const { username, password } = req.body;
    if (username === 'admin' && (password === 'admin123' || password === 'admin')) {
      return res.json({ success: true, token: 'sbp-admin-token-2026', user: { username: 'admin' } });
    }
    res.status(401).json({ error: 'Invalid credentials' });
  });

  // Enquiries
  app.get(`${prefix}/enquiries`, (req, res) => {
    res.json(enquiriesStore);
  });

  app.post(`${prefix}/enquiries`, (req, res) => {
    const newEnq = {
      ...req.body,
      id: `enq-${Date.now()}`,
      status: 'New',
      createdAt: new Date().toISOString()
    };
    enquiriesStore.unshift(newEnq);
    res.status(201).json({ success: true, enquiry: newEnq });
  });

  // Admin stats
  app.get(`${prefix}/admin/stats`, (req, res) => {
    res.json({
      totalProperties: propertiesStore.length,
      availableProperties: propertiesStore.filter(p => p.status.toLowerCase() === 'available').length,
      soldProperties: propertiesStore.filter(p => p.status.toLowerCase() === 'sold').length,
      featuredProperties: propertiesStore.filter(p => p.featured === true).length,
      totalProjects: initialProjects.length,
      totalEnquiries: enquiriesStore.length,
      recentEnquiries: enquiriesStore.slice(0, 5)
    });
  });

  // Health
  app.get(`${prefix}/health`, (req, res) => {
    res.json({ status: 'ok', time: new Date().toISOString() });
  });
});

export default app;
