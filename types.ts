
export enum MaterialCategory {
  METAL = 'Metal Scraps',
  LAB_EQUIPMENT = 'Lab Equipment',
  TIMBER = 'Timber Offcuts',
  ELECTRONICS = 'Electronic Components',
  CHEMICALS = 'Chemical Containers',
  PLASTIC = 'Plastic Scrap'
}

export interface MaterialItem {
  id: string;
  name: string;
  category: MaterialCategory;
  description: string;
  quantity: string;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  weightKg: number;
  imageUrl: string;
  donorName: string;
  postedAt: string;
}

export interface RequestItem {
  id: string;
  requesterName: string;
  materialNeeded: string;
  urgency: 'Low' | 'Medium' | 'High';
  description: string;
  postedAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'industry' | 'lab';
}

export interface ImpactStats {
  totalDivertedKg: number;
  carbonSavedKg: number;
  itemsRedistributed: number;
  activeUsers: number;
}
