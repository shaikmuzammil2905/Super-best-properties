import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { getDatabase, saveDatabase } from './data/db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;
const UPLOADS_DIR = path.join(__dirname, '../uploads');

// Ensure uploads folder exists
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

// Multer storage for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOADS_DIR);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    cb(null, uniqueName);
  }
});
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  }
});

app.use(cors());
app.use(express.json());

// Serve uploaded files
app.use('/uploads', express.static(UPLOADS_DIR));
// Serve public assets if accessed via backend
app.use('/assets', express.static(path.join(__dirname, '../public/assets')));

// Simple Auth Middleware
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized. Admin token required.' });
  }
  const token = authHeader.split(' ')[1];
  if (token !== 'sbp-admin-token-2026') {
    return res.status(403).json({ error: 'Forbidden. Invalid session token.' });
  }
  next();
};

// ========================
// AUTH ROUTES
// ========================
app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;
  const db = getDatabase();
  if (username === db.admin.username && password === db.admin.passwordHash) {
    return res.json({
      success: true,
      token: 'sbp-admin-token-2026',
      user: { username: db.admin.username }
    });
  }
  return res.status(401).json({ error: 'Invalid username or password' });
});

// ========================
// PROPERTIES ROUTES
// ========================
app.get('/api/properties', (req, res) => {
  const db = getDatabase();
  let properties = [...db.properties];
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
  if (featured === 'true') {
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

  // Sorting
  if (sort === 'price-low') {
    properties.sort((a, b) => a.priceNumber - b.priceNumber);
  } else if (sort === 'price-high') {
    properties.sort((a, b) => b.priceNumber - a.priceNumber);
  } else if (sort === 'area-high') {
    properties.sort((a, b) => (b.areaSqFt || 0) - (a.areaSqFt || 0));
  } else {
    // Newest first
    properties.sort((a, b) => new Date(b.createdDate || 0) - new Date(a.createdDate || 0));
  }

  res.json(properties);
});

app.get('/api/properties/:idOrSlug', (req, res) => {
  const db = getDatabase();
  const { idOrSlug } = req.params;
  const prop = db.properties.find(p => p.id === idOrSlug || p.slug === idOrSlug);
  if (!prop) {
    return res.status(404).json({ error: 'Property not found' });
  }
  // Also find similar properties in same category
  const similar = db.properties
    .filter(p => p.id !== prop.id && (p.categorySlug === prop.categorySlug || p.city === prop.city))
    .slice(0, 3);

  res.json({ property: prop, similar });
});

app.post('/api/properties', authMiddleware, (req, res) => {
  const db = getDatabase();
  const newProp = {
    id: `prop-${Date.now()}`,
    slug: req.body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') + `-${Date.now().toString().slice(-4)}`,
    title: req.body.title,
    categorySlug: req.body.categorySlug || 'apartments',
    categoryName: req.body.categoryName || 'Apartment',
    price: req.body.price,
    priceNumber: Number(req.body.priceNumber) || 0,
    location: req.body.location,
    city: req.body.city || 'Hyderabad',
    area: req.body.area || '1,200 Sq.Ft',
    areaSqFt: Number(req.body.areaSqFt) || 1200,
    bedrooms: req.body.bedrooms || '2 BHK',
    bathrooms: req.body.bathrooms || '2 Baths',
    status: req.body.status || 'Available',
    featured: Boolean(req.body.featured),
    images: req.body.images && req.body.images.length > 0 ? req.body.images : ['https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1000&q=80'],
    description: req.body.description || '',
    amenities: Array.isArray(req.body.amenities) ? req.body.amenities : (req.body.amenities || '').split(',').map(s => s.trim()).filter(Boolean),
    mapCoordinates: req.body.mapCoordinates || '17.3850, 78.4867',
    createdDate: new Date().toISOString()
  };

  db.properties.unshift(newProp);
  // Update category property count
  const cat = db.categories.find(c => c.slug === newProp.categorySlug);
  if (cat) {
    cat.propertyCount = (cat.propertyCount || 0) + 1;
  }
  saveDatabase(db);
  res.status(201).json(newProp);
});

app.put('/api/properties/:id', authMiddleware, (req, res) => {
  const db = getDatabase();
  const index = db.properties.findIndex(p => p.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'Property not found' });
  }
  const updated = {
    ...db.properties[index],
    ...req.body,
    id: db.properties[index].id, // protect id
    amenities: Array.isArray(req.body.amenities)
      ? req.body.amenities
      : (typeof req.body.amenities === 'string'
        ? req.body.amenities.split(',').map(s => s.trim()).filter(Boolean)
        : db.properties[index].amenities)
  };
  db.properties[index] = updated;
  saveDatabase(db);
  res.json(updated);
});

app.delete('/api/properties/:id', authMiddleware, (req, res) => {
  const db = getDatabase();
  const prop = db.properties.find(p => p.id === req.params.id);
  if (!prop) {
    return res.status(404).json({ error: 'Property not found' });
  }
  db.properties = db.properties.filter(p => p.id !== req.params.id);
  const cat = db.categories.find(c => c.slug === prop.categorySlug);
  if (cat && cat.propertyCount > 0) {
    cat.propertyCount -= 1;
  }
  saveDatabase(db);
  res.json({ success: true, message: 'Property deleted successfully' });
});

// ========================
// CATEGORIES ROUTES
// ========================
app.get('/api/categories', (req, res) => {
  const db = getDatabase();
  // Recalculate live property counts
  const categoriesWithCounts = db.categories.map(cat => ({
    ...cat,
    propertyCount: db.properties.filter(p => p.categorySlug === cat.slug).length
  }));
  res.json(categoriesWithCounts);
});

app.get('/api/categories/:slug', (req, res) => {
  const db = getDatabase();
  const { slug } = req.params;
  const category = db.categories.find(c => c.slug === slug);
  if (!category) {
    return res.status(404).json({ error: 'Category not found' });
  }
  const properties = db.properties.filter(p => p.categorySlug === slug);
  res.json({ category, properties });
});

app.post('/api/categories', authMiddleware, (req, res) => {
  const db = getDatabase();
  const newCat = {
    id: `cat-${Date.now()}`,
    name: req.body.name,
    slug: req.body.slug || req.body.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
    icon: req.body.icon || 'Building',
    description: req.body.description || '',
    image: req.body.image || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1000&q=80',
    enabled: true,
    propertyCount: 0
  };
  db.categories.push(newCat);
  saveDatabase(db);
  res.status(201).json(newCat);
});

app.put('/api/categories/:id', authMiddleware, (req, res) => {
  const db = getDatabase();
  const index = db.categories.findIndex(c => c.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'Category not found' });
  }
  db.categories[index] = { ...db.categories[index], ...req.body };
  saveDatabase(db);
  res.json(db.categories[index]);
});

app.delete('/api/categories/:id', authMiddleware, (req, res) => {
  const db = getDatabase();
  db.categories = db.categories.filter(c => c.id !== req.params.id);
  saveDatabase(db);
  res.json({ success: true });
});

// ========================
// PROJECTS ROUTES
// ========================
app.get('/api/projects', (req, res) => {
  const db = getDatabase();
  res.json(db.projects);
});

app.get('/api/projects/:idOrSlug', (req, res) => {
  const db = getDatabase();
  const { idOrSlug } = req.params;
  const project = db.projects.find(p => p.id === idOrSlug || p.slug === idOrSlug);
  if (!project) {
    return res.status(404).json({ error: 'Project not found' });
  }
  res.json(project);
});

app.post('/api/projects', authMiddleware, (req, res) => {
  const db = getDatabase();
  const newProject = {
    id: `proj-${Date.now()}`,
    name: req.body.name,
    slug: req.body.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
    tagline: req.body.tagline || '',
    location: req.body.location || '',
    type: req.body.type || '',
    status: req.body.status || 'Ongoing',
    featured: Boolean(req.body.featured),
    priceRange: req.body.priceRange || '',
    image: req.body.image || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1000&q=80',
    description: req.body.description || '',
    highlights: Array.isArray(req.body.highlights) ? req.body.highlights : (req.body.highlights || '').split(',').map(s => s.trim()).filter(Boolean)
  };
  db.projects.push(newProject);
  saveDatabase(db);
  res.status(201).json(newProject);
});

app.put('/api/projects/:id', authMiddleware, (req, res) => {
  const db = getDatabase();
  const index = db.projects.findIndex(p => p.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'Project not found' });
  }
  db.projects[index] = { ...db.projects[index], ...req.body };
  saveDatabase(db);
  res.json(db.projects[index]);
});

app.delete('/api/projects/:id', authMiddleware, (req, res) => {
  const db = getDatabase();
  db.projects = db.projects.filter(p => p.id !== req.params.id);
  saveDatabase(db);
  res.json({ success: true });
});

// ========================
// ENQUIRIES ROUTES
// ========================
app.get('/api/enquiries', authMiddleware, (req, res) => {
  const db = getDatabase();
  res.json(db.enquiries || []);
});

app.post('/api/enquiries', (req, res) => {
  const { name, phone, email, propertyType, propertyTitle, budget, message, source } = req.body;
  if (!name || !phone) {
    return res.status(400).json({ error: 'Name and Phone number are required' });
  }
  const db = getDatabase();
  const newEnquiry = {
    id: `enq-${Date.now()}`,
    name,
    phone,
    email: email || '',
    propertyType: propertyType || 'General Enquiry',
    propertyTitle: propertyTitle || 'General',
    budget: budget || 'Flexible',
    message: message || '',
    source: source || 'Website Form',
    status: 'New',
    createdAt: new Date().toISOString()
  };
  if (!db.enquiries) db.enquiries = [];
  db.enquiries.unshift(newEnquiry);
  saveDatabase(db);
  res.status(201).json({ success: true, enquiry: newEnquiry });
});

app.put('/api/enquiries/:id', authMiddleware, (req, res) => {
  const db = getDatabase();
  const index = db.enquiries.findIndex(e => e.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'Enquiry not found' });
  }
  db.enquiries[index] = { ...db.enquiries[index], ...req.body };
  saveDatabase(db);
  res.json(db.enquiries[index]);
});

app.delete('/api/enquiries/:id', authMiddleware, (req, res) => {
  const db = getDatabase();
  db.enquiries = db.enquiries.filter(e => e.id !== req.params.id);
  saveDatabase(db);
  res.json({ success: true });
});

// ========================
// SITE CONTENT ROUTES
// ========================
app.get('/api/content', (req, res) => {
  const db = getDatabase();
  res.json(db.siteContent);
});

app.put('/api/content', authMiddleware, (req, res) => {
  const db = getDatabase();
  db.siteContent = { ...db.siteContent, ...req.body };
  saveDatabase(db);
  res.json(db.siteContent);
});

// ========================
// IMAGE UPLOAD ROUTE
// ========================
app.post('/api/upload', authMiddleware, upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No image file uploaded' });
  }
  const fileUrl = `/uploads/${req.file.filename}`;
  res.json({ url: fileUrl });
});

// ========================
// DASHBOARD STATS ROUTE
// ========================
app.get('/api/admin/stats', authMiddleware, (req, res) => {
  const db = getDatabase();
  const totalProperties = db.properties.length;
  const availableProperties = db.properties.filter(p => p.status.toLowerCase() === 'available').length;
  const soldProperties = db.properties.filter(p => p.status.toLowerCase() === 'sold').length;
  const featuredProperties = db.properties.filter(p => p.featured === true).length;
  const totalProjects = db.projects.length;
  const totalEnquiries = (db.enquiries || []).length;
  const recentEnquiries = (db.enquiries || []).slice(0, 5);

  res.json({
    totalProperties,
    availableProperties,
    soldProperties,
    featuredProperties,
    totalProjects,
    totalEnquiries,
    recentEnquiries
  });
});

// ========================
// PRODUCTION CLIENT SERVING
// ========================
const distPath = path.join(__dirname, '../dist');
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  app.get('*', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Server running smoothly on http://localhost:${PORT}`);
});
