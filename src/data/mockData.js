// Comprehensive standalone data with realistic real estate photography
// Used for immediate offline/Vercel fallback and initial database seeding

export const initialCategories = [
  {
    id: 'cat-1',
    name: 'Independent House',
    slug: 'independent-house',
    icon: 'Home',
    description: 'Standalone private luxury villas and independent houses with spacious compounds, private car porch, and open terraces in peaceful residential layouts.',
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1000&q=80',
    enabled: true,
    propertyCount: 4
  },
  {
    id: 'cat-2',
    name: 'Plot',
    slug: 'plots',
    icon: 'Square',
    description: 'HMDA & DTCP approved open residential & commercial investment plots with clear titles, 40-60ft BT roads, underground utilities, and bank loan facilities.',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1000&q=80',
    enabled: true,
    propertyCount: 5
  },
  {
    id: 'cat-3',
    name: 'Flat',
    slug: 'flats',
    icon: 'Building',
    description: 'Modern 2 BHK, 3 BHK & 4 BHK residential flats in prime growth corridors with lift, dedicated parking, 24/7 security, and power backup.',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1000&q=80',
    enabled: true,
    propertyCount: 6
  },
  {
    id: 'cat-4',
    name: 'Apartment',
    slug: 'apartments',
    icon: 'Building2',
    description: 'Premium high-rise gated community apartments with clubhouse, swimming pool, indoor badminton, gym, and landscaped podium gardens.',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=80',
    enabled: true,
    propertyCount: 5
  },
  {
    id: 'cat-5',
    name: 'Shops',
    slug: 'shops',
    icon: 'Store',
    description: 'Prime main road commercial retail shops, shopping complex spaces, and high-footfall business outlets for guaranteed rental yields.',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1000&q=80',
    enabled: true,
    propertyCount: 3
  },
  {
    id: 'cat-6',
    name: 'Gated Community Villas',
    slug: 'gated-community-villas',
    icon: 'Castle',
    description: 'Ultra-luxurious gated community triplex villas with world-class clubhouse, 24/7 CCTV surveillance, private landscaped lawn, and 100% Vastu compliance.',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1000&q=80',
    enabled: true,
    propertyCount: 4
  },
  {
    id: 'cat-7',
    name: 'Function Halls',
    slug: 'function-halls',
    icon: 'Columns',
    description: 'Spacious air-conditioned convention centres, banquet halls, and wedding venues with grand dining halls, commercial kitchens, and valet parking.',
    image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1000&q=80',
    enabled: true,
    propertyCount: 2
  },
  {
    id: 'cat-8',
    name: 'Agriculture Land',
    slug: 'agriculture-land',
    icon: 'Trees',
    description: 'Fertile red soil agricultural lands, organic farming plots, and strategic highway-facing land parcels with verified Dharani link records.',
    image: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1000&q=80',
    enabled: true,
    propertyCount: 3
  },
  {
    id: 'cat-9',
    name: 'Farm House',
    slug: 'farm-houses',
    icon: 'Warehouse',
    description: 'Scenic weekend retreat farmhouses with private swimming pool, fruit orchards, party lawns, gazebos, and peaceful green surroundings.',
    image: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=1000&q=80',
    enabled: true,
    propertyCount: 3
  },
  {
    id: 'cat-10',
    name: 'Godown / Warehouse',
    slug: 'godowns',
    icon: 'Archive',
    description: 'Heavy industrial grade warehouses, logistics godowns, and cargo storage spaces with 32ft clear center height, dock levellers, and trailer turning bays.',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1000&q=80',
    enabled: true,
    propertyCount: 2
  },
  {
    id: 'cat-11',
    name: 'Offices',
    slug: 'offices',
    icon: 'Briefcase',
    description: 'Furnished and warm-shell commercial corporate office spaces in Hyderabad IT corridors, Hitec City, and Gachibowli financial hubs.',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1000&q=80',
    enabled: true,
    propertyCount: 4
  },
  {
    id: 'cat-12',
    name: 'Sharing Office',
    slug: 'sharing-offices',
    icon: 'Users',
    description: 'Plug-and-play coworking desks, shared team cabins, meeting rooms with high-speed leased line internet and cafeteria amenities.',
    image: 'https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?auto=format&fit=crop&w=1000&q=80',
    enabled: true,
    propertyCount: 3
  },
  {
    id: 'cat-13',
    name: 'PG Hostel',
    slug: 'pg-hostels',
    icon: 'Bed',
    description: 'Well-maintained executive paying guest hostels for men and women with nutritious homestyle food, high-speed WiFi, and daily housekeeping.',
    image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1000&q=80',
    enabled: true,
    propertyCount: 3
  },
  {
    id: 'cat-14',
    name: 'PG Building',
    slug: 'pg-buildings',
    icon: 'Hotel',
    description: 'Complete commercial multi-floor PG buildings ready for immediate lease, institutional accommodation, or purchase with high recurring rental yield.',
    image: 'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?auto=format&fit=crop&w=1000&q=80',
    enabled: true,
    propertyCount: 2
  },
  {
    id: 'cat-15',
    name: 'Guest House',
    slug: 'guest-houses',
    icon: 'Compass',
    description: 'Furnished luxury guest houses, service apartments, and transit homes for corporate executives, VIP families, and visitors in prime localities.',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80',
    enabled: true,
    propertyCount: 2
  }
];

export const initialProperties = [
  // 1. Featured property 1 from Reference Image 1
  {
    id: 'prop-1',
    title: 'Sunrise Elite Residency 2BHK',
    slug: 'sunrise-elite-residency-2bhk',
    categorySlug: 'apartments',
    categoryName: 'Apartment',
    price: '₹ 68 Lakhs',
    priceNumber: 6800000,
    location: 'Vanasthalipuram, Hyderabad',
    city: 'Hyderabad',
    area: '1,150 Sq.Ft',
    areaSqFt: 1150,
    bedrooms: '2 BHK',
    bathrooms: '2 Baths',
    status: 'Available',
    featured: true,
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Impeccably designed 2 BHK apartment in a premium residential community near Vanasthalipuram Main Road. Features spacious living areas, east-facing Vastu compliance, covered car parking, 24/7 security, power backup, and close proximity to schools, hospitals, and metro connectivity.',
    amenities: ['100% Vastu Compliant', 'Covered Car Parking', '24/7 Security & CCTV', 'Power Backup', 'Kids Play Area', 'High Speed Elevators'],
    mapCoordinates: '17.3421, 78.5701',
    createdDate: '2026-01-15'
  },
  // 2. Featured property 2 from Reference Image 1
  {
    id: 'prop-2',
    title: 'The Grand Royal Villa',
    slug: 'the-grand-royal-villa',
    categorySlug: 'gated-community-villas',
    categoryName: 'Gated Community Villas',
    price: '₹ 1.25 Cr',
    priceNumber: 12500000,
    location: 'Tellapur, Hyderabad',
    city: 'Hyderabad',
    area: '2,000 Sq.Ft',
    areaSqFt: 2000,
    bedrooms: '3 BHK',
    bathrooms: '4 Baths',
    status: 'Available',
    featured: true,
    images: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Luxury 3 BHK independent triplex villa in a landmark gated enclave at Tellapur. Surrounded by lush greenery, modern architecture, private landscaped garden, terrace deck, clubhouse access, swimming pool, and seamless access to Financial District.',
    amenities: ['Private Garden', 'Clubhouse & Gym', 'Swimming Pool', '2 Car Parking', 'Solar Water Heating', 'Grand Entrance Arch'],
    mapCoordinates: '17.4789, 78.2911',
    createdDate: '2026-01-20'
  },
  // 3. Featured property 3 from Reference Image 1
  {
    id: 'prop-3',
    title: 'Emerald Palms Modern Villa',
    slug: 'emerald-palms-modern-villa',
    categorySlug: 'independent-house',
    categoryName: 'Independent House',
    price: '₹ 95 Lakhs',
    priceNumber: 9500000,
    location: 'Kompally, Hyderabad',
    city: 'Hyderabad',
    area: '1,350 Sq.Ft',
    areaSqFt: 1350,
    bedrooms: '2 BHK',
    bathrooms: '3 Baths',
    status: 'Available',
    featured: true,
    images: [
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Chic modern duplex independent home with premium finishes, Italian marble flooring in living spaces, modular kitchen, open terrace, and peaceful residential neighborhood with quick highway access.',
    amenities: ['Exclusive Borewell & Manjeera Water', 'Modular Kitchen', 'Compound Wall & Gate', 'Spacious Balcony', 'Vastu Approved'],
    mapCoordinates: '17.5451, 78.4902',
    createdDate: '2026-02-01'
  },
  // 4. Featured property 4 from Reference Image 1
  {
    id: 'prop-4',
    title: 'Prestige Skyline Luxury 3BHK',
    slug: 'prestige-skyline-luxury-3bhk',
    categorySlug: 'flats',
    categoryName: 'Flat',
    price: '₹ 72 Lakhs',
    priceNumber: 7200000,
    location: 'Gachibowli, Hyderabad',
    city: 'Hyderabad',
    area: '1,750 Sq.Ft',
    areaSqFt: 1750,
    bedrooms: '3 BHK',
    bathrooms: '3 Baths',
    status: 'Available',
    featured: true,
    images: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1560185127-6ed189bf02f4?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Expansive 3 BHK high-rise flat with scenic city views, natural ventilation, imported fittings, dedicated banquet, squash court, EV charging bays, and proximity to major IT tech parks and international schools.',
    amenities: ['EV Charging Point', 'Banquet Hall', 'Squash Court', '2 Reserved Parkings', 'Smart Home Wiring', '24/7 Security'],
    mapCoordinates: '17.4401, 78.3489',
    createdDate: '2026-02-05'
  },
  // 5. Plots
  {
    id: 'prop-5',
    title: 'Green Valley HMDA Residential Plot',
    slug: 'green-valley-hmda-residential-plot',
    categorySlug: 'plots',
    categoryName: 'Plot',
    price: '₹ 45 Lakhs',
    priceNumber: 4500000,
    location: 'Shamshabad, Hyderabad',
    city: 'Hyderabad',
    area: '200 Sq.Yards',
    areaSqFt: 1800,
    bedrooms: 'Plot',
    bathrooms: '-',
    status: 'Available',
    featured: false,
    images: [
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Clear title HMDA approved residential plot located on the growth corridor of Shamshabad near RGI Airport. 40ft blacktop roads, underground drainage, water supply pipeline, electricity with streetlights, and immediate registration with bank loan facility.',
    amenities: ['HMDA Approved', 'Clear Title', 'Bank Loan Available', 'Underground Drainage', '40 Ft BT Roads', 'Electricity with Street Lights'],
    mapCoordinates: '17.2501, 78.4312',
    createdDate: '2026-02-10'
  },
  {
    id: 'prop-6',
    title: 'DTCP Prime Commercial Plot',
    slug: 'dtcp-prime-commercial-plot',
    categorySlug: 'plots',
    categoryName: 'Plot',
    price: '₹ 85 Lakhs',
    priceNumber: 8500000,
    location: 'Hayathnagar, Hyderabad',
    city: 'Hyderabad',
    area: '300 Sq.Yards',
    areaSqFt: 2700,
    bedrooms: 'Plot',
    bathrooms: '-',
    status: 'Available',
    featured: false,
    images: [
      'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Highway-facing prime commercial corner plot ideal for shopping complexes, commercial buildings, hospital, or showrooms. 60ft wide road frontage, complete legal documentation verified.',
    amenities: ['Highway Facing', 'Corner Plot', '60 Ft Road Frontage', 'Commercial Clear Title'],
    mapCoordinates: '17.3245, 78.6012',
    createdDate: '2026-02-12'
  },
  // 6. Shops
  {
    id: 'prop-7',
    title: 'Main Road Commercial Retail Shop',
    slug: 'main-road-commercial-retail-shop',
    categorySlug: 'shops',
    categoryName: 'Shops',
    price: '₹ 42 Lakhs',
    priceNumber: 4200000,
    location: 'Vanasthalipuram Main Road, Hyderabad',
    city: 'Hyderabad',
    area: '450 Sq.Ft',
    areaSqFt: 450,
    bedrooms: 'Commercial',
    bathrooms: '1 Restroom',
    status: 'Available',
    featured: false,
    images: [
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'High footfall ground floor commercial retail space on Vanasthalipuram Main Road. Rolling shutter, wide glass front, customer parking, ideal for pharmacy, clinic, boutique, or grocery store.',
    amenities: ['Main Road Facing', 'Heavy Footfall', 'Glass Facade', 'Customer Parking', '3-Phase Power'],
    mapCoordinates: '17.3411, 78.5689',
    createdDate: '2026-02-14'
  },
  // 7. Function Halls
  {
    id: 'prop-8',
    title: 'The Royal Grand Convention & Banquet Hall',
    slug: 'the-royal-grand-convention-banquet-hall',
    categorySlug: 'function-halls',
    categoryName: 'Function Halls',
    price: '₹ 8.5 Cr',
    priceNumber: 85000000,
    location: 'LB Nagar, Hyderabad',
    city: 'Hyderabad',
    area: '15,000 Sq.Ft',
    areaSqFt: 15000,
    bedrooms: 'Commercial Venue',
    bathrooms: '8 Restrooms',
    status: 'Available',
    featured: false,
    images: [
      'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Established air-conditioned convention center with seating capacity of 1,200+ guests, dining hall for 600, commercial industrial kitchen, bridal green rooms, and parking capacity for 150+ four-wheelers.',
    amenities: ['Central Air Conditioning', 'Commercial Kitchen', 'Green Rooms', '150+ Car Parking', 'High Power Generator'],
    mapCoordinates: '17.3512, 78.5521',
    createdDate: '2026-02-15'
  },
  // 8. Agriculture Land
  {
    id: 'prop-9',
    title: 'Fertile 5-Acre Farm Land Parcel',
    slug: 'fertile-5-acre-farm-land-parcel',
    categorySlug: 'agriculture-land',
    categoryName: 'Agriculture Land',
    price: '₹ 1.8 Cr',
    priceNumber: 18000000,
    location: 'Ibrahimpatnam, Hyderabad',
    city: 'Hyderabad',
    area: '5 Acres',
    areaSqFt: 217800,
    bedrooms: 'Land',
    bathrooms: '-',
    status: 'Available',
    featured: false,
    images: [
      'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Rich fertile red soil agricultural land with high water table, 2 heavy borewells, electricity transformer, fencing on all sides, approach tar road, ideal for organic farming or dairy farm.',
    amenities: ['Red Soil', '2 Heavy Borewells', 'Fenced Boundary', 'Electricity Connection', 'Tar Road Access'],
    mapCoordinates: '17.2012, 78.6501',
    createdDate: '2026-02-18'
  },
  // 9. Farm House
  {
    id: 'prop-10',
    title: 'Serene Oasis Luxury Farmhouse',
    slug: 'serene-oasis-luxury-farmhouse',
    categorySlug: 'farm-houses',
    categoryName: 'Farm House',
    price: '₹ 2.4 Cr',
    priceNumber: 24000000,
    location: 'Moinabad, Hyderabad',
    city: 'Hyderabad',
    area: '1.5 Acres',
    areaSqFt: 65340,
    bedrooms: '3 BHK Villa',
    bathrooms: '4 Baths',
    status: 'Available',
    featured: false,
    images: [
      'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Stunning weekend retreat villa situated in the green belt of Moinabad. Includes swimming pool, gazebo, mango and guava fruit orchard, barbecue counter, open lawn for 200 guests, and solar power setup.',
    amenities: ['Private Swimming Pool', 'Fruit Orchard', 'Party Lawns', 'Solar Backup', 'Caretaker Quarters'],
    mapCoordinates: '17.3214, 78.2711',
    createdDate: '2026-02-20'
  },
  // 10. Godown / Warehouse
  {
    id: 'prop-11',
    title: 'High-Ceiling Logistics Warehouse / Godown',
    slug: 'high-ceiling-logistics-warehouse-godown',
    categorySlug: 'godowns',
    categoryName: 'Godown / Warehouse',
    price: '₹ 3.6 Cr',
    priceNumber: 36000000,
    location: 'Kothur, Hyderabad',
    city: 'Hyderabad',
    area: '22,000 Sq.Ft',
    areaSqFt: 22000,
    bedrooms: 'Industrial',
    bathrooms: 'Office & Restrooms',
    status: 'Available',
    featured: false,
    images: [
      'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Pre-engineered PEB warehouse structure with 32ft center height, laser-screed industrial flooring, dock levellers, trailer turning radius, fire hydrant system, and dedicated administrative cabin.',
    amenities: ['32 Ft Height PEB Shed', 'Dock Levellers', 'Fire Hydrant System', 'Trailer In-Out Access', 'Security Watchtower'],
    mapCoordinates: '17.1421, 78.2891',
    createdDate: '2026-02-22'
  },
  // 11. Offices
  {
    id: 'prop-12',
    title: 'Grade-A Corporate IT Office Space',
    slug: 'grade-a-corporate-it-office-space',
    categorySlug: 'offices',
    categoryName: 'Offices',
    price: '₹ 1.85 Cr',
    priceNumber: 18500000,
    location: 'Madhapur / Hitec City, Hyderabad',
    city: 'Hyderabad',
    area: '3,200 Sq.Ft',
    areaSqFt: 3200,
    bedrooms: '45 Workstations',
    bathrooms: '3 Restrooms',
    status: 'Available',
    featured: false,
    images: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Furnished modern office space with 45 ergonomic workstations, 2 executive director cabins, 12-seater conference room with video conferencing, server room, and cafeteria in the center of Hitec City.',
    amenities: ['Fully Furnished', '100% DG Power Backup', 'Central AC', 'Conference Room', 'Reserved Basement Parking'],
    mapCoordinates: '17.4489, 78.3752',
    createdDate: '2026-02-25'
  },
  // 12. Sharing Office
  {
    id: 'prop-13',
    title: 'Prime Coworking & Shared Office Space',
    slug: 'prime-coworking-shared-office-space',
    categorySlug: 'sharing-offices',
    categoryName: 'Sharing Office',
    price: '₹ 6,500 / Seat',
    priceNumber: 6500,
    location: 'Kondapur, Hyderabad',
    city: 'Hyderabad',
    area: '4,000 Sq.Ft',
    areaSqFt: 4000,
    bedrooms: '60 Seats',
    bathrooms: 'Shared Restrooms',
    status: 'Available',
    featured: false,
    images: [
      'https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Flexible plug-and-play dedicated desks and private cabins with high-speed leased line internet, unlimited beverages, meeting room credits, reception desk, and business address services.',
    amenities: ['High Speed Leased Line', 'Pantry & Beverages', 'Conference Rooms', 'Reception Support', 'Biometric Access'],
    mapCoordinates: '17.4682, 78.3562',
    createdDate: '2026-02-27'
  },
  // 13. PG Hostel
  {
    id: 'prop-14',
    title: 'Executive Luxury PG Hostel Facility',
    slug: 'executive-luxury-pg-hostel-facility',
    categorySlug: 'pg-hostels',
    categoryName: 'PG Hostel',
    price: '₹ 8,500 / Month',
    priceNumber: 8500,
    location: 'Gachibowli, Hyderabad',
    city: 'Hyderabad',
    area: '6,000 Sq.Ft',
    areaSqFt: 6000,
    bedrooms: '30 Rooms',
    bathrooms: 'Attached Baths',
    status: 'Available',
    featured: false,
    images: [
      'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Premier executive accommodation for working professionals with 3-times homestyle hygienic food, high-speed WiFi, daily housekeeping, washing machines, RO drinking water, and biometric security.',
    amenities: ['Homestyle Meals', 'High Speed WiFi', 'Washing Machines', 'Attached Bathrooms', 'Daily Housekeeping'],
    mapCoordinates: '17.4398, 78.3491',
    createdDate: '2026-03-01'
  },
  // 14. PG Building
  {
    id: 'prop-15',
    title: 'G+4 Commercial PG Building for Lease/Sale',
    slug: 'g4-commercial-pg-building-lease-sale',
    categorySlug: 'pg-buildings',
    categoryName: 'PG Building',
    price: '₹ 4.2 Cr',
    priceNumber: 42000000,
    location: 'Madhapur, Hyderabad',
    city: 'Hyderabad',
    area: '10,500 Sq.Ft',
    areaSqFt: 10500,
    bedrooms: '42 Rooms',
    bathrooms: '42 Attached Baths',
    status: 'Available',
    featured: false,
    images: [
      'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Purpose-built commercial PG building generating steady high rental returns. 42 air-conditioned rooms with attached washrooms, commercial dining hall, lift, generator, and continuous 100% occupancy history.',
    amenities: ['Elevator / Lift', 'Commercial Kitchen', '100% Occupancy Track', 'High Rental Yield', 'Solar Water Heaters'],
    mapCoordinates: '17.4491, 78.3842',
    createdDate: '2026-03-02'
  },
  // 15. Guest House
  {
    id: 'prop-16',
    title: 'Banjara Hills Corporate Guest House',
    slug: 'banjara-hills-corporate-guest-house',
    categorySlug: 'guest-houses',
    categoryName: 'Guest House',
    price: '₹ 5.5 Cr',
    priceNumber: 55000000,
    location: 'Banjara Hills Road No. 12, Hyderabad',
    city: 'Hyderabad',
    area: '4,500 Sq.Ft',
    areaSqFt: 4500,
    bedrooms: '6 Suites',
    bathrooms: '6 Luxury Baths',
    status: 'Available',
    featured: false,
    images: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Exclusive boutique guest house in prestigious Banjara Hills with 6 presidential guest suites, personalized chef dining service, VIP lounge, landscaped patio, and high-level corporate security.',
    amenities: ['Presidential Suites', 'Chef Dining', 'Private Lounge', 'Concierge Service', 'Prime Elite Address'],
    mapCoordinates: '17.4125, 78.4382',
    createdDate: '2026-03-03'
  }
];

export const initialProjects = [
  {
    id: 'proj-1',
    name: 'Super Best Royal Enclave',
    slug: 'super-best-royal-enclave',
    tagline: 'HMDA & RERA Approved Luxury Gated Community',
    location: 'Tellapur, Hyderabad',
    type: 'Villas & Premium Apartments',
    status: 'Under Construction',
    featured: true,
    priceRange: '₹ 95 Lakhs - 2.5 Cr',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1000&q=80',
    description: 'An architectural marvel spread across 18 verdant acres featuring 120 contemporary triplex villas and two luxury high-rise apartment towers with a 25,000 sq.ft clubhouse.',
    highlights: ['18 Acres Master Plan', '25,000 Sq.Ft Grand Clubhouse', 'Olympic Length Pool', 'Close to Financial District']
  },
  {
    id: 'proj-2',
    name: 'Super Best Green Meadows',
    slug: 'super-best-green-meadows',
    tagline: 'DTCP & HMDA Approved Smart Open Plots',
    location: 'Shamshabad Highway Corridor, Hyderabad',
    type: 'Open Residential Plots',
    status: 'Ready for Registration',
    featured: true,
    priceRange: '₹ 25 Lakhs - 65 Lakhs',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1000&q=80',
    description: 'Strategically located smart plotted development with 100% Vastu, avenue plantation, underground cabling, parks, and phenomenal appreciation potential near RGI Airport.',
    highlights: ['Clear Titles with Immediate Registration', 'Bank Loans Approved', 'Underground Utilities', 'High Appreciation Corridor']
  },
  {
    id: 'proj-3',
    name: 'Super Best Golden Heights',
    slug: 'super-best-golden-heights',
    tagline: 'Ultra-Luxury High-Rise 3 & 4 BHK Towers',
    location: 'Gachibowli Financial District, Hyderabad',
    type: 'Luxury Apartments',
    status: 'Launching Soon',
    featured: true,
    priceRange: '₹ 1.4 Cr - 3.2 Cr',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=80',
    description: 'Spectacular 35-storey twin towers redefining luxury living in Hyderabad, designed by world-renowned architects with sky lounges, infinity pool, and smart home automation.',
    highlights: ['35-Storey Sky Living', 'Infinity Sky Pool', '100% Smart Automation', 'Panoramic City Views']
  },
  {
    id: 'proj-4',
    name: 'Super Best Silicon Tech Park',
    slug: 'super-best-silicon-tech-park',
    tagline: 'Next-Gen Grade-A Commercial & Co-Working Hub',
    location: 'Hitec City, Hyderabad',
    type: 'Commercial & Retail',
    status: 'Ready for Occupancy',
    featured: true,
    priceRange: 'Lease & Outright Purchase',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1000&q=80',
    description: 'Premier business destination offering retail high-street shops on lower levels and flexible corporate office spaces with LEED Platinum green building certification.',
    highlights: ['LEED Platinum Certified', 'Multi-Level Car Parking', 'High Street Retail Zone', '24/7 Redundant Power']
  }
];

export const initialSiteContent = {
  companyName: 'SUPER BEST PROPERTIES',
  tagline: 'Building Opportunities. Creating Wealth.',
  subTagline: 'PLOTS | FLATS | HOUSES | VILLAS',
  phone: '7075539189',
  address: 'Vanasthalipuram Main Road, Hyderabad, Telangana – 500070',
  heroHeading: 'Find Your Perfect Property',
  heroSubHeading: 'Plots | Flats | Houses | Villas',
  heroDescription: 'Your dream property is just a search away.',
  aboutUsSummary: 'Super Best Properties is a professional real estate advisory and property solutions firm dedicated to helping individuals, families and investors make informed, confident and value-driven property decisions. With a strong understanding of the real estate landscape across Hyderabad and Telangana, we offer comprehensive guidance and access to opportunities across residential, commercial and investment properties.',
  founder: {
    name: 'D. Suresh Baabu',
    image: '/assets/founder.png',
    qualifications: 'B.Com, MHRM, PGDCA, PGDBM, Diploma in Film Making, Diploma in Labour & Administrative Law.',
    profile: 'A Multi-Solopreneur – Living Many Dreams at Once.',
    experience: 'Over 25+ Years of Versatile Experience in Various Industrial Sectors.'
  }
};
