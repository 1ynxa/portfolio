export type UciCategory =
  | 'WT'   // WorldTour
  | '1.Pro' // ProSeries
  | '2.Pro'
  | '1.1'
  | '1.2'
  | '2.1'
  | '2.2';

export type RaceStatus = 'confirmed' | 'tentative' | 'cancelled';
export type MemberRole = 'rider' | 'ds' | 'mechanic' | 'doctor' | 'soigneur' | 'coach' | 'manager';
export type RiderStatus = 'active' | 'injured' | 'suspended';
export type EquipmentType = 'road_bike' | 'tt_bike' | 'wheel' | 'component' | 'clothing';
export type Condition = 'excellent' | 'good' | 'needs-service' | 'retired';

export interface Race {
  id: string;
  name: string;
  uciCategory: UciCategory;
  startDate: string; // ISO date
  endDate: string;
  country: string;
  countryCode: string;
  stageCount: number;
  assignedRiderIds: string[];
  assignedStaffIds: string[];
  status: RaceStatus;
  distance?: number; // total km
  elevation?: number; // total meters
  description?: string;
}

export interface TeamMember {
  id: string;
  firstName: string;
  lastName: string;
  role: MemberRole;
  nationality: string;
  countryCode: string;
  dateOfBirth: string;
  contractStart: string;
  contractEnd: string;
  licenseExpiry: string;
  passportExpiry: string;
  email: string;
  phone: string;
  status: RiderStatus;
  specialties?: string[]; // e.g. 'climber', 'sprinter', 'tt'
  uciRanking?: number;
  photoUrl?: string;
}

export interface Equipment {
  id: string;
  type: EquipmentType;
  brand: string;
  model: string;
  serialNumber: string;
  assignedTo: string | null; // TeamMember id
  condition: Condition;
  lastService: string;
  purchaseDate: string;
  notes?: string;
  weight?: number; // grams
}

export interface ActivityItem {
  id: string;
  type: 'race_added' | 'rider_assigned' | 'equipment_updated' | 'member_added';
  description: string;
  timestamp: string;
  userId?: string;
}
