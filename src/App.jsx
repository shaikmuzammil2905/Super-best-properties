import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import WhatsAppChatbot from './components/WhatsAppChatbot';

// Pages
import HomePage from './pages/HomePage';
import CategoriesPage from './pages/CategoriesPage';
import PropertiesPage from './pages/PropertiesPage';
import PropertyOrCategoryDispatcher from './pages/PropertyOrCategoryDispatcher';
import PropertyDetailsPage from './pages/PropertyDetailsPage';
import ProjectsPage from './pages/ProjectsPage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import ContactPage from './pages/ContactPage';
import AdminPage from './pages/AdminPage';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFA] text-[#171717]">
      <ScrollToTop />
      
      {/* Hide public header on admin portal for clean security */}
      {!isAdmin && <Header />}

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/properties" element={<PropertiesPage />} />
          <Route path="/properties/:slug" element={<PropertyOrCategoryDispatcher />} />
          <Route path="/property/:slug" element={<PropertyDetailsPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:slug" element={<ProjectsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/admin" element={<AdminPage />} />
          {/* Fallback route */}
          <Route path="*" element={<HomePage />} />
        </Routes>
      </main>

      {/* Hide public footer on admin portal */}
      {!isAdmin && <Footer />}

      {/* Floating WhatsApp Chatbot on all public pages */}
      {!isAdmin && <WhatsAppChatbot />}
    </div>
  );
}

