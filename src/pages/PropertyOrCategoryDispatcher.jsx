import React from 'react';
import { useParams } from 'react-router-dom';
import CategoryListingPage from './CategoryListingPage';
import PropertyDetailsPage from './PropertyDetailsPage';

const knownCategorySlugs = [
  'independent-house',
  'plots',
  'plot',
  'flats',
  'flat',
  'apartments',
  'apartment',
  'shops',
  'shop',
  'gated-community-villas',
  'function-halls',
  'agriculture-land',
  'farm-houses',
  'godowns',
  'offices',
  'sharing-offices',
  'pg-hostels',
  'pg-buildings',
  'guest-houses'
];

export default function PropertyOrCategoryDispatcher() {
  const { slug } = useParams();

  // If the slug is in our known categories, render the CategoryListingPage
  if (knownCategorySlugs.includes(slug.toLowerCase())) {
    return <CategoryListingPage />;
  }

  // Otherwise, treat as a property details page
  return <PropertyDetailsPage />;
}
