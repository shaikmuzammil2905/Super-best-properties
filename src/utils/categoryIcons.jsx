import React from 'react';
import {
  Home,
  Square,
  Building,
  Building2,
  Store,
  Castle,
  Landmark,
  Columns,
  Trees,
  Warehouse,
  Archive,
  Briefcase,
  Users,
  Bed,
  Hotel,
  BedDouble,
  Compass
} from 'lucide-react';

export function getCategoryIcon(nameOrSlug, className = "w-6 h-6") {
  const key = (nameOrSlug || '').toLowerCase();
  
  if (key.includes('independent') || key.includes('house')) {
    return <Home className={className} />;
  }
  if (key.includes('plot')) {
    return <Square className={className} />;
  }
  if (key.includes('flat')) {
    return <Building className={className} />;
  }
  if (key.includes('apartment')) {
    return <Building2 className={className} />;
  }
  if (key.includes('shop')) {
    return <Store className={className} />;
  }
  if (key.includes('gated') || key.includes('villa')) {
    return <Castle className={className} />;
  }
  if (key.includes('function') || key.includes('hall')) {
    return <Columns className={className} />;
  }
  if (key.includes('agri') || key.includes('land')) {
    return <Trees className={className} />;
  }
  if (key.includes('farm')) {
    return <Warehouse className={className} />;
  }
  if (key.includes('godown') || key.includes('warehouse')) {
    return <Archive className={className} />;
  }
  if (key.includes('sharing') || key.includes('cowork')) {
    return <Users className={className} />;
  }
  if (key.includes('office')) {
    return <Briefcase className={className} />;
  }
  if (key.includes('pg building')) {
    return <Hotel className={className} />;
  }
  if (key.includes('pg hostel') || key.includes('hostel')) {
    return <Bed className={className} />;
  }
  if (key.includes('guest')) {
    return <Compass className={className} />;
  }
  return <Building className={className} />;
}

