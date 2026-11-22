import { packages } from './packages.ts';

export interface AddOn {
  id: string;
  name: string;
  /** Whole USD. */
  price: number;
  /** References to eligible packages. */
  appliesTo: string[];
  available: boolean;
}

const allPackages = packages.map(detail => detail.id);

export const addons: AddOn[] = [
  { id: 'headlight-restore', name: 'Headlight restoration (pair)', price: 95, appliesTo: allPackages, available: true },
  { id: 'engine-bay', name: 'Engine bay detail', price: 65, appliesTo: ['mirror-detail', 'one-step-polish', 'two-step-correction', 'ceramic-coating'], available: true },
  { id: 'pet-hair', name: 'Pet hair removal', price: 45, appliesTo: ['interior-reset', 'mirror-detail'], available: true },
  { id: 'odour-treatment', name: 'Ozone odour treatment', price: 79, appliesTo: ['interior-reset', 'mirror-detail'], available: true },
  { id: 'trim-restore', name: 'Exterior trim restoration', price: 55, appliesTo: allPackages, available: true },
  { id: 'wheel-coating', name: 'Wheel face ceramic coating', price: 249, appliesTo: ['ceramic-coating'], available: true },
];
