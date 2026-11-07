-- ==============================================================================
-- SUPER BEST PROPERTIES — COMPLETE PRODUCTION SUPABASE DATABASE SCHEMA
-- Run this in your Supabase SQL Editor: https://supabase.com/dashboard/project/gidrbkijntosrjaapiua/sql
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

-- 4. PROPERTY CATEGORIES (15 Categories)
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
    status TEXT DEFAULT 'New', -- New, Contacted, Interested, Follow-up Required, Converted, Closed
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

-- Enable RLS on all tables
ALTER TABLE public.admin_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.website_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.property_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media_library ENABLE ROW LEVEL SECURITY;

-- PUBLIC READ POLICIES (Website Visitors can view published content)
CREATE POLICY "Public Read Website Settings" ON public.website_settings FOR SELECT USING (true);
CREATE POLICY "Public Read Categories" ON public.property_categories FOR SELECT USING (true);
CREATE POLICY "Public Read Properties" ON public.properties FOR SELECT USING (published = true);
CREATE POLICY "Public Read Projects" ON public.projects FOR SELECT USING (true);
CREATE POLICY "Public Read Services" ON public.services FOR SELECT USING (true);
CREATE POLICY "Public Read Testimonials" ON public.testimonials FOR SELECT USING (true);
CREATE POLICY "Public Read Media" ON public.media_library FOR SELECT USING (true);

-- PUBLIC INSERT POLICIES (Visitors can submit inquiries)
CREATE POLICY "Public Insert Enquiries" ON public.enquiries FOR INSERT WITH CHECK (true);

-- FULL ACCESS POLICIES (For Authenticated Users & Anon Key while in development)
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

INSERT INTO public.website_settings (id, site_name, tagline, phone, whatsapp_number, email, address)
VALUES (
    'primary_settings',
    'Super Best Properties',
    'Building Opportunities. Creating Wealth.',
    '+91 7075539189',
    '917075539189',
    'contact@superbestproperties.com',
    'H.No 5-5-35/193, Prashanth Nagar, Vanasthalipuram, Hyderabad, Telangana 500070'
) ON CONFLICT (id) DO NOTHING;

-- Seed Categories
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
ON CONFLICT (slug) DO NOTHING;
