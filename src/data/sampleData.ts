export interface TravelOrder {
  id: string;
  orderNumber: string;
  purpose: string;
  country: string;
  tripType: 'domestic' | 'foreign';
  dateFrom: string;
  dateTo: string;
  status: 'draft' | 'pending' | 'approved' | 'rejected';
  manager: string;
  employee: string;
  department: string;
  transport: string;
  advance: number;
  note: string;
  createdAt: string;
}

export interface TravelReport {
  id: string;
  reportNumber: string;
  orderId: string;
  orderNumber: string;
  purpose: string;
  country: string;
  tripType: 'domestic' | 'foreign';
  dateFrom: string;
  dateTo: string;
  status: 'draft' | 'submitted' | 'received' | 'returned' | 'closed';
  amountEmployee: number;
  amountCompany: number;
  lastUpdated: string;
  createdAt: string;
}

export interface Vehicle {
  id: string;
  nickname: string;
  regNumber: string;
  fuelType: string;
  consumption: number;
  isDefault: boolean;
  isActive: boolean;
  note?: string;
}

export interface TransportSegment {
  id: string;
  type: string;
  from: string;
  to: string;
  timeFrom?: string;
  timeTo?: string;
  note?: string;
  vehicleId?: string;
  km?: number;
  privateKm?: number;
}

export interface Expense {
  id: string;
  date: string;
  description: string;
  category: string;
  paymentMethod: string;
  currency: string;
  amount: number;
  vatRate?: number;
  liters?: number;
  fxRate?: number;
  note?: string;
  attachments?: string[];
}

export const sampleOrders: TravelOrder[] = [
  {
    id: '1', orderNumber: 'CP-2024-0042', purpose: 'Obchodné rokovanie s klientom',
    country: 'Česká republika', tripType: 'foreign', dateFrom: '2024-03-18', dateTo: '2024-03-20',
    status: 'approved', manager: 'Ing. Peter Novák', employee: 'Ján Kováč',
    department: 'Obchod', transport: 'Služobné vozidlo', advance: 200, note: '', createdAt: '2024-03-10',
  },
  {
    id: '2', orderNumber: 'CP-2024-0043', purpose: 'Školenie SAP modul FI',
    country: 'Slovensko', tripType: 'domestic', dateFrom: '2024-03-25', dateTo: '2024-03-25',
    status: 'pending', manager: 'Ing. Peter Novák', employee: 'Ján Kováč',
    department: 'Obchod', transport: 'Vlak', advance: 0, note: 'Jednodňové školenie v Bratislave', createdAt: '2024-03-15',
  },
  {
    id: '3', orderNumber: 'CP-2024-0044', purpose: 'Veľtrh Automechanika Frankfurt',
    country: 'Nemecko', tripType: 'foreign', dateFrom: '2024-04-10', dateTo: '2024-04-13',
    status: 'draft', manager: 'Ing. Peter Novák', employee: 'Ján Kováč',
    department: 'Obchod', transport: 'Lietadlo', advance: 500, note: '', createdAt: '2024-03-20',
  },
  {
    id: '4', orderNumber: 'CP-2024-0041', purpose: 'Audit pobočky Košice',
    country: 'Slovensko', tripType: 'domestic', dateFrom: '2024-03-05', dateTo: '2024-03-06',
    status: 'approved', manager: 'Ing. Mária Horváthová', employee: 'Ján Kováč',
    department: 'Obchod', transport: 'Súkromné vozidlo', advance: 0, note: '', createdAt: '2024-02-28',
  },
  {
    id: '5', orderNumber: 'CP-2024-0040', purpose: 'Stretnutie dodávateľov Viedeň',
    country: 'Rakúsko', tripType: 'foreign', dateFrom: '2024-02-20', dateTo: '2024-02-21',
    status: 'rejected', manager: 'Ing. Peter Novák', employee: 'Ján Kováč',
    department: 'Obchod', transport: 'Vlak', advance: 150, note: 'Chýba rozpočtové krytie', createdAt: '2024-02-12',
  },
];

export const sampleReports: TravelReport[] = [
  {
    id: '1', reportNumber: 'CS-2024-0028', orderId: '1', orderNumber: 'CP-2024-0042',
    purpose: 'Obchodné rokovanie s klientom', country: 'Česká republika', tripType: 'foreign',
    dateFrom: '2024-03-18', dateTo: '2024-03-20', status: 'submitted',
    amountEmployee: 187.50, amountCompany: 0, lastUpdated: '2024-03-22', createdAt: '2024-03-21',
  },
  {
    id: '2', reportNumber: 'CS-2024-0027', orderId: '4', orderNumber: 'CP-2024-0041',
    purpose: 'Audit pobočky Košice', country: 'Slovensko', tripType: 'domestic',
    dateFrom: '2024-03-05', dateTo: '2024-03-06', status: 'closed',
    amountEmployee: 42.30, amountCompany: 0, lastUpdated: '2024-03-15', createdAt: '2024-03-07',
  },
  {
    id: '3', reportNumber: 'CS-2024-0029', orderId: '2', orderNumber: 'CP-2024-0043',
    purpose: 'Školenie SAP modul FI', country: 'Slovensko', tripType: 'domestic',
    dateFrom: '2024-03-25', dateTo: '2024-03-25', status: 'draft',
    amountEmployee: 0, amountCompany: 0, lastUpdated: '2024-03-26', createdAt: '2024-03-26',
  },
];

export const sampleVehicles: Vehicle[] = [
  {
    id: '1', nickname: 'Škoda Octavia (firemná)', regNumber: 'PO-123AB',
    fuelType: 'diesel', consumption: 5.8, isDefault: false, isActive: true,
  },
  {
    id: '2', nickname: 'VW Golf (súkromný)', regNumber: 'PO-456CD',
    fuelType: 'petrol', consumption: 6.5, isDefault: true, isActive: true,
  },
];

export const currentUser = {
  name: 'Ján Kováč',
  email: 'jan.kovac@company.sk',
  department: 'Obchod',
  manager: 'Ing. Peter Novák',
  avatar: null,
};
