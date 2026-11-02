const API_BASE = '/api';

export const api = {
  // Auth
  async login(username, password) {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Login failed');
    return data;
  },

  // Properties
  async getProperties(params = {}) {
    const query = new URLSearchParams();
    Object.entries(params).forEach(([key, val]) => {
      if (val !== undefined && val !== null && val !== '') {
        query.append(key, val);
      }
    });
    const res = await fetch(`${API_BASE}/properties?${query.toString()}`);
    if (!res.ok) throw new Error('Failed to fetch properties');
    return res.json();
  },

  async getProperty(idOrSlug) {
    const res = await fetch(`${API_BASE}/properties/${idOrSlug}`);
    if (!res.ok) throw new Error('Property not found');
    return res.json();
  },

  async createProperty(propertyData, token) {
    const res = await fetch(`${API_BASE}/properties`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(propertyData)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to create property');
    return data;
  },

  async updateProperty(id, propertyData, token) {
    const res = await fetch(`${API_BASE}/properties/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(propertyData)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to update property');
    return data;
  },

  async deleteProperty(id, token) {
    const res = await fetch(`${API_BASE}/properties/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to delete property');
    return data;
  },

  // Categories
  async getCategories() {
    const res = await fetch(`${API_BASE}/categories`);
    if (!res.ok) throw new Error('Failed to fetch categories');
    return res.json();
  },

  async getCategory(slug) {
    const res = await fetch(`${API_BASE}/categories/${slug}`);
    if (!res.ok) throw new Error('Category not found');
    return res.json();
  },

  async updateCategory(id, data, token) {
    const res = await fetch(`${API_BASE}/categories/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(data)
    });
    return res.json();
  },

  // Projects
  async getProjects() {
    const res = await fetch(`${API_BASE}/projects`);
    if (!res.ok) throw new Error('Failed to fetch projects');
    return res.json();
  },

  async getProject(idOrSlug) {
    const res = await fetch(`${API_BASE}/projects/${idOrSlug}`);
    if (!res.ok) throw new Error('Project not found');
    return res.json();
  },

  async createProject(projectData, token) {
    const res = await fetch(`${API_BASE}/projects`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(projectData)
    });
    return res.json();
  },

  async updateProject(id, projectData, token) {
    const res = await fetch(`${API_BASE}/projects/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(projectData)
    });
    return res.json();
  },

  async deleteProject(id, token) {
    const res = await fetch(`${API_BASE}/projects/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    });
    return res.json();
  },

  // Enquiries
  async submitEnquiry(enquiryData) {
    const res = await fetch(`${API_BASE}/enquiries`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(enquiryData)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to submit enquiry');
    return data;
  },

  async getEnquiries(token) {
    const res = await fetch(`${API_BASE}/enquiries`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return res.json();
  },

  async updateEnquiry(id, data, token) {
    const res = await fetch(`${API_BASE}/enquiries/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(data)
    });
    return res.json();
  },

  async deleteEnquiry(id, token) {
    const res = await fetch(`${API_BASE}/enquiries/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    });
    return res.json();
  },

  // Site Content
  async getContent() {
    const res = await fetch(`${API_BASE}/content`);
    return res.json();
  },

  async updateContent(data, token) {
    const res = await fetch(`${API_BASE}/content`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(data)
    });
    return res.json();
  },

  // Upload image
  async uploadImage(file, token) {
    const formData = new FormData();
    formData.append('image', file);
    const res = await fetch(`${API_BASE}/upload`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: formData
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Upload failed');
    return data.url;
  },

  // Admin stats
  async getAdminStats(token) {
    const res = await fetch(`${API_BASE}/admin/stats`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return res.json();
  }
};
