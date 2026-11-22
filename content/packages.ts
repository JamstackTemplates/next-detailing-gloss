export const vehicleSizes = { sedan: 'Sedan', suv: 'SUV', truck: 'Truck or van' } as const;
export type VehicleSize = keyof typeof vehicleSizes;
export const pads = ['blue', 'gold', 'white', 'orange', 'wool', 'black'] as const;
export type Pad = typeof pads[number];

export interface DetailPackage {
  /** Stable URL fragment and collection reference. */
  id: string;
  name: string;
  summary: string;
  pad: Pad;
  /** Whole USD, ordered sedan ≤ SUV ≤ truck/van. */
  prices: Record<VehicleSize, number>;
  /** Estimated on-site work in whole hours. */
  hours: number;
  includes: string[];
  requires?: string;
  /** Interior-only packages cannot have paint readings. */
  exterior: boolean;
  featured: boolean;
  available: boolean;
}

export const packages: DetailPackage[] = [
  {
    id: 'gloss-wash', name: 'Gloss Maintenance Wash', pad: 'blue',
    summary: 'A careful exterior wash that tops up the protection already on the paint.',
    prices: { sedan: 89, suv: 109, truck: 129 }, hours: 2,
    includes: ['Two-bucket hand wash', 'Wheels and tyres', 'Glass', 'Spray sealant top-up'],
    exterior: true, featured: false, available: true,
  },
  {
    id: 'interior-reset', name: 'Interior Reset', pad: 'gold',
    summary: 'A clean cabin from the seat seams to the floor mats.',
    prices: { sedan: 169, suv: 199, truck: 229 }, hours: 3,
    includes: ['Vacuum and steam', 'Leather clean and condition', 'Plastics', 'Glass', 'Mats'],
    exterior: false, featured: false, available: true,
  },
  {
    id: 'mirror-detail', name: 'Mirror Detail', pad: 'white',
    summary: 'A full interior reset and smooth, sealed paint.',
    prices: { sedan: 289, suv: 339, truck: 389 }, hours: 5,
    includes: ['Hand wash', 'Iron and clay decontamination', 'Interior reset', 'Six-month sealant'],
    exterior: true, featured: true, available: true,
  },
  {
    id: 'one-step-polish', name: 'One-Step Polish', pad: 'orange',
    summary: 'One machine-polishing pass removes about 60–70% of swirls.',
    prices: { sedan: 449, suv: 529, truck: 599 }, hours: 7,
    includes: ['Wash and decontamination', 'Single-stage machine polish'],
    exterior: true, featured: false, available: true,
  },
  {
    id: 'two-step-correction', name: 'Two-Step Correction', pad: 'wool',
    summary: 'Compounding and refining typically remove about 85–95% of swirls.',
    prices: { sedan: 799, suv: 929, truck: 1049 }, hours: 14,
    includes: ['Wash and decontamination', 'Paint depth logged per panel', 'Compound pass', 'Refining polish'],
    exterior: true, featured: false, available: true,
  },
  {
    id: 'ceramic-coating', name: 'Five-Year Ceramic Coating', pad: 'black',
    summary: 'A five-year ceramic coating with a 24-hour cure under cover.',
    prices: { sedan: 1295, suv: 1495, truck: 1695 }, hours: 16,
    includes: ['Panel preparation', 'Ceramic coating application', '24-hour cure in a garage or covered space'],
    requires: 'one-step-polish', exterior: true, featured: false, available: true,
  },
];
