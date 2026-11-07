-- ==============================================================================
-- SUPER BEST PROPERTIES — COMPLETE PRODUCTION SUPABASE DATABASE SCHEMA
-- Run this in your Supabase SQL Editor: https://supabase.com/dashboard/project/gidrbkijntosrjaapiua/sql
-- Safe to run multiple times (idempotent with IF NOT EXISTS & DROP POLICY IF EXISTS)
-- ==============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. ADMIN PROFILES
CREATE TABLE IF NOT EXISTS public.admin_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT UNIQUE NOT NULL,
    full_name TEXT DEFAULT 'Administrator',
    role TEXT DEFAULT 'super_admin',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. WEBSITE SETTINGS
CREATE TABLE IF NOT EXISTS public.website_settings (
    id TEXT PRIMARY KEY DEFAULT 'primary_settings',
    site_name TEXT DEFAULT 'Super Best Properties',
    tagline TEXT DEFAULT 'Building Opportunities. Creating Wealth.',
    phone TEXT DEFAULT '+91 7075539189',
    whatsapp_number TEXT DEFAULT '917075539189',
    email TEXT DEFAULT 'contact@superbestproperties.com',
    address TEXT DEFAULT 'H.No 5-5-35/193, Prashanth Nagar, Vanasthalipuram, Hyderabad, Telangana 500070',
    google_maps_url TEXT DEFAULT 'https://maps.google.com/?q=Vanasthalipuram,Hyderabad',
    header_announcement TEXT DEFAULT 'RERA & HMDA Approved Layouts in Hyderabad Growth Corridors',
    facebook_url TEXT DEFAULT 'https://facebook.com',
    instagram_url TEXT DEFAULT 'https://instagram.com',
    linkedin_url TEXT DEFAULT 'https://linkedin.com',
    youtube_url TEXT DEFAULT 'https://youtube.com',
    seo_title TEXT DEFAULT 'Super Best Properties | Real Estate Advisory & Property Solutions Hyderabad',
    seo_description TEXT DEFAULT 'Discover verified plots, flats, independent houses, gated community villas and landmark commercial projects across Hyderabad with Super Best Properties.',
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. PROPERTY CATEGORIES (15 Real Estate Categories)
CREATE TABLE IF NOT EXISTS public.property_categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    icon_name TEXT,
    display_order INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. PROPERTIES TABLE
CREATE TABLE IF NOT EXISTS public.properties (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT UNIQUE,
    category_slug TEXT NOT NULL,
    category_name TEXT NOT NULL,
    price TEXT NOT NULL,
    price_number NUMERIC NOT NULL DEFAULT 0,
    location TEXT NOT NULL,
    city TEXT DEFAULT 'Hyderabad',
    area TEXT NOT NULL,
    area_sq_ft NUMERIC DEFAULT 0,
    bedrooms TEXT,
    bathrooms TEXT,
    status TEXT DEFAULT 'Available',
    featured BOOLEAN DEFAULT false,
    published BOOLEAN DEFAULT true,
    images JSONB DEFAULT '[]'::jsonb,
    description TEXT,
    amenities TEXT,
    map_coordinates TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. LANDMARK PROJECTS TABLE
CREATE TABLE IF NOT EXISTS public.projects (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT UNIQUE,
    tagline TEXT,
    location TEXT NOT NULL,
    type TEXT NOT NULL,
    status TEXT DEFAULT 'Ongoing',
    price_range TEXT,
    image TEXT,
    description TEXT,
    highlights TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 7. CUSTOMER LEADS & INQUIRIES
CREATE TABLE IF NOT EXISTS public.enquiries (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT,
    property_id TEXT,
    property_title TEXT,
    property_type TEXT,
    budget TEXT,
    message TEXT,
    source TEXT DEFAULT 'Website Form',
    status TEXT DEFAULT 'New',
    internal_notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 8. SERVICES TABLE
CREATE TABLE IF NOT EXISTS public.services (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    tagline TEXT,
    description TEXT,
    deliverables JSONB DEFAULT '[]'::jsonb,
    display_order INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 9. TESTIMONIALS TABLE
CREATE TABLE IF NOT EXISTS public.testimonials (
    id TEXT PRIMARY KEY,
    client_name TEXT NOT NULL,
    role TEXT,
    location TEXT,
    rating INT DEFAULT 5,
    quote TEXT NOT NULL,
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 10. MEDIA LIBRARY (Cloudinary Asset Tracking)
CREATE TABLE IF NOT EXISTS public.media_library (
    id TEXT PRIMARY KEY,
    file_name TEXT,
    url TEXT NOT NULL,
    public_id TEXT,
    format TEXT,
    bytes NUMERIC,
    associated_section TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

ALTER TABLE public.admin_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.website_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.property_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media_library ENABLE ROW LEVEL SECURITY;

-- Clean existing policies so script can be safely re-run
DROP POLICY IF EXISTS "Public Read Website Settings" ON public.website_settings;
DROP POLICY IF EXISTS "Public Read Categories" ON public.property_categories;
DROP POLICY IF EXISTS "Public Read Properties" ON public.properties;
DROP POLICY IF EXISTS "Public Read Projects" ON public.projects;
DROP POLICY IF EXISTS "Public Read Services" ON public.services;
DROP POLICY IF EXISTS "Public Read Testimonials" ON public.testimonials;
DROP POLICY IF EXISTS "Public Read Media" ON public.media_library;
DROP POLICY IF EXISTS "Public Insert Enquiries" ON public.enquiries;

DROP POLICY IF EXISTS "Anon Full Access Properties" ON public.properties;
DROP POLICY IF EXISTS "Anon Full Access Categories" ON public.property_categories;
DROP POLICY IF EXISTS "Anon Full Access Projects" ON public.projects;
DROP POLICY IF EXISTS "Anon Full Access Enquiries" ON public.enquiries;
DROP POLICY IF EXISTS "Anon Full Access Settings" ON public.website_settings;
DROP POLICY IF EXISTS "Anon Full Access Services" ON public.services;
DROP POLICY IF EXISTS "Anon Full Access Testimonials" ON public.testimonials;
DROP POLICY IF EXISTS "Anon Full Access Media" ON public.media_library;

-- PUBLIC READ POLICIES
CREATE POLICY "Public Read Website Settings" ON public.website_settings FOR SELECT USING (true);
CREATE POLICY "Public Read Categories" ON public.property_categories FOR SELECT USING (true);
CREATE POLICY "Public Read Properties" ON public.properties FOR SELECT USING (published = true);
CREATE POLICY "Public Read Projects" ON public.projects FOR SELECT USING (true);
CREATE POLICY "Public Read Services" ON public.services FOR SELECT USING (true);
CREATE POLICY "Public Read Testimonials" ON public.testimonials FOR SELECT USING (true);
CREATE POLICY "Public Read Media" ON public.media_library FOR SELECT USING (true);

-- PUBLIC INSERT POLICIES (Enquiry submissions)
CREATE POLICY "Public Insert Enquiries" ON public.enquiries FOR INSERT WITH CHECK (true);

-- FULL ACCESS POLICIES (Authenticated Admin + Anon API Key)
CREATE POLICY "Anon Full Access Properties" ON public.properties FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Anon Full Access Categories" ON public.property_categories FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Anon Full Access Projects" ON public.projects FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Anon Full Access Enquiries" ON public.enquiries FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Anon Full Access Settings" ON public.website_settings FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Anon Full Access Services" ON public.services FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Anon Full Access Testimonials" ON public.testimonials FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Anon Full Access Media" ON public.media_library FOR ALL USING (true) WITH CHECK (true);

-- ==============================================================================
-- INITIAL SEED DATA
-- ==============================================================================

-- 1. Website Settings
INSERT INTO public.website_settings (id, site_name, tagline, phone, whatsapp_number, email, address)
VALUES (
    'primary_settings',
    'Super Best Properties',
    'Building Opportunities. Creating Wealth.',
    '+91 7075539189',
    '917075539189',
    'contact@superbestproperties.com',
    'H.No 5-5-35/193, Prashanth Nagar, Vanasthalipuram, Hyderabad, Telangana 500070'
) ON CONFLICT (id) DO UPDATE SET
    site_name = EXCLUDED.site_name,
    tagline = EXCLUDED.tagline,
    phone = EXCLUDED.phone,
    whatsapp_number = EXCLUDED.whatsapp_number;

-- 2. Seed 15 Categories
INSERT INTO public.property_categories (slug, name, description, display_order) VALUES
('independent-house', 'Independent House', 'Standalone luxury houses with private compound and clear title deeds', 1),
('plots', 'Plots', 'Residential and open plots in prime approved layouts with clear demarcation', 2),
('flats', 'Flat', 'Ready to move and under construction residential flats', 3),
('apartments', 'Apartment', 'Modern high-rise luxury apartments with modern amenities', 4),
('shops', 'Shops', 'High footfall retail shops and commercial frontage units', 5),
('gated-community-villas', 'Gated Community Villas', 'Ultra-luxury gated community villas with security and clubhouse', 6),
('function-halls', 'Function Halls', 'Convention centres and celebration halls with expansive parking', 7),
('agriculture-land', 'Agriculture Land', 'Fertile farm lands and clear title agricultural holdings', 8),
('farm-houses', 'Farm House', 'Weekend getaway retreats, resort villas and luxury farm houses', 9),
('godowns', 'Godown / Warehouse', 'Industrial storage units, logistics facilities and heavy-duty godowns', 10),
('offices', 'Offices', 'Grade-A corporate office suites and IT park commercial spaces', 11),
('sharing-offices', 'Sharing Office', 'Plug and play co-working desks, collaborative workstations and private cabins', 12),
('pg-hostels', 'PG Hostel', 'Running paying guest facilities and student accommodation hostels', 13),
('pg-buildings', 'PG Building', 'Standalone commercial buildings primed for PG hostel operations', 14),
('guest-houses', 'Guest House', 'Hospitality suites, corporate transit homes and boutique guest properties', 15)
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    display_order = EXCLUDED.display_order;

-- 3. Seed Initial Properties
INSERT INTO public.properties (id, title, slug, category_slug, category_name, price, price_number, location, city, area, area_sq_ft, bedrooms, bathrooms, status, featured, published, images, description, amenities, map_coordinates) VALUES
('prop-1', 'The Grand Royal Villa', 'the-grand-royal-villa', 'gated-community-villas', 'Gated Community Villas', '₹ 1.85 Cr', 18500000, 'Tellapur Growth Corridor, Hyderabad', 'Hyderabad', '3,450 Sq.Ft', 3450, '4 BHK', '4 Baths', 'Available', true, true, '["https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1000&q=80", "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=80"]'::jsonb, 'Ultra-luxury triplex gated community villa in Tellapur. 100% Vastu compliant, clubhouse, private garden, 24/7 security, HMDA approved layout with clear link documents.', 'Clubhouse, Swimming Pool, 100% Vastu, 24/7 Security, 40ft Roads, Solar Fencing', '17.4789, 78.2911'),
('prop-2', 'HMDA Approved Villa Plots', 'hmda-approved-villa-plots-tellapur', 'plots', 'Plots', '₹ 45 Lakhs', 4500000, 'Tellapur, Outer Ring Road, Hyderabad', 'Hyderabad', '200 Sq.Yards', 1800, 'Plot', '-', 'Available', true, true, '["https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1000&q=80"]'::jsonb, 'Premium residential plots with underground drainage, electricity, avenue plantation, and immediate registration. Strategic proximity to Financial District.', 'Underground Electricity, Water Pipeline, 40-60ft BT Roads, Clear Title, HMDA Layout', '17.4720, 78.2890'),
('prop-3', 'Skyline Luxury Residences', 'skyline-luxury-residences-gachibowli', 'apartments', 'Apartment', '₹ 1.25 Cr', 12500000, 'Financial District, Gachibowli, Hyderabad', 'Hyderabad', '2,100 Sq.Ft', 2100, '3 BHK', '3 Baths', 'Available', true, true, '["https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1000&q=80"]'::jsonb, 'High-rise residential apartment with panoramic city views, modern Italian marble flooring, biometric security, and dedicated EV parking.', 'Gymnasium, Banquet Hall, EV Charging, High Speed Lifts, Infinity Pool', '17.4401, 78.3489'),
('prop-4', 'Airport Corridor Open Plots', 'airport-corridor-open-plots-shamshabad', 'plots', 'Plots', '₹ 38 Lakhs', 3800000, 'Shamshabad Airport Zone, Hyderabad', 'Hyderabad', '180 Sq.Yards', 1620, 'Open Plot', '-', 'Available', true, true, '["https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1000&q=80"]'::jsonb, 'High capital growth open plots near Rajiv Gandhi International Airport. Ready for construction with DTCP approval and clear titles.', 'DTCP Approved, Spot Registration, Bank Loan Available, Compound Wall', '17.2501, 78.4312')
ON CONFLICT (id) DO NOTHING;

-- 4. Seed Initial Inquiry
INSERT INTO public.enquiries (id, name, phone, email, property_type, property_title, budget, message, status)
VALUES (
    'enq-seed-1',
    'Rajesh Kumar Verma',
    '9848012345',
    'rajesh.verma@example.com',
    'Gated Community Villas',
    'The Grand Royal Villa',
    '₹ 1.5 Cr - 2 Cr',
    'Interested in site visit for The Grand Royal Villa in Tellapur this weekend.',
    'New'
) ON CONFLICT (id) DO NOTHING;
