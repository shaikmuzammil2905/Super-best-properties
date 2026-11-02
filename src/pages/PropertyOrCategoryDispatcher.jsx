import React from 'react';
import { useParams } from 'react-router-dom';
import CategoryListingPage from './CategoryListingPage';
import PropertyDetailsPage from './PropertyDetailsPage';

const knownCategorySlugs = [
  'independent-house',
  'independent-houses',
  'plot',
  'plots',
  'flat',
  'flats',
  'apartment',
  'apartments',
  'shop',
  'shops',
  'gated-community-villa',
  'gated-community-villas',
  'function-hall',
  'function-halls',
  'agriculture-land',
  'agricultural-land',
  'farm-house',
  'farm-houses',
  'godown',
  'godowns',
  'warehouse',
  'office',
  'offices',
  'sharing-office',
  'sharing-offices',
  'pg-hostel',
  'pg-hostels',
  'pg-building',
  'pg-buildings',
  'guest-house',
  'guest-houses'
];

export default function PropertyOrCategoryDispatcher() {
  const { slug } = useParams();
  const normalized = (slug || '').toLowerCase();

  // If the slug matches any category pattern or contains category keywords
  if (knownCategorySlugs.includes(normalized) || knownCategorySlugs.some(k => normalized === k.replace(/s$/, ''))) {
    return <CategoryListingPage />;
  }

  // Otherwise, treat as a property details page
  return <PropertyDetailsPage />;
}
