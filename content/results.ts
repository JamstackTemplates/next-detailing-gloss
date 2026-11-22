interface Reading {
  before: number;
  after: number;
}

export interface Result {
  id: string;
  title: string;
  vehicle: string;
  panel: string;
  packageId: string;
  areaId: string;
  defects: string[];
  /** Gloss units at 20°. Include both reading pairs for measured exterior shots. */
  gloss?: Reading;
  /** Total measured paint depth in microns. */
  paintDepth?: Reading;
  /** Hex colour used for the drawn bodywork or seat. */
  paint: string;
  featured: boolean;
}

export const results: Result[] = [
  { id: 'mustang-bonnet', title: 'Shadow Black under inspection', vehicle: '2017 Ford Mustang GT, Shadow Black', panel: 'Bonnet', packageId: 'two-step-correction', areaId: 'chandler', defects: ['Swirls', 'Wash marring', 'Bird-etch'], gloss: { before: 38, after: 91 }, paintDepth: { before: 128, after: 122 }, paint: '#27343E', featured: true },
  { id: 'model3-door', title: 'Wash marring on Deep Blue', vehicle: '2021 Tesla Model 3, Deep Blue', panel: 'Driver door', packageId: 'one-step-polish', areaId: 'scottsdale', defects: ['Automatic car-wash marring'], gloss: { before: 54, after: 86 }, paintDepth: { before: 112, after: 109 }, paint: '#1B4D90', featured: false },
  { id: 'tacoma-tailgate', title: 'Water spots on Cement', vehicle: '2019 Toyota Tacoma, Cement', panel: 'Tailgate', packageId: 'ceramic-coating', areaId: 'gilbert', defects: ['Water spots', 'Oxidation'], gloss: { before: 46, after: 88 }, paintDepth: { before: 140, after: 136 }, paint: '#657176', featured: false },
  { id: 'civic-roof', title: 'Sun haze on Crimson Pearl', vehicle: '2015 Honda Civic, Crimson Pearl', panel: 'Roof', packageId: 'two-step-correction', areaId: 'mesa', defects: ['Sun oxidation', 'Clear coat haze'], gloss: { before: 22, after: 84 }, paintDepth: { before: 104, after: 97 }, paint: '#7D3543', featured: false },
  { id: 'm3-wing', title: 'Polishing trails on Portimao Blue', vehicle: '2020 BMW M340i, Portimao Blue', panel: 'Front wing', packageId: 'one-step-polish', areaId: 'paradise-valley', defects: ['Holograms from a previous polish'], gloss: { before: 61, after: 89 }, paintDepth: { before: 118, after: 115 }, paint: '#235B76', featured: false },
  { id: 'wrangler-seats', title: 'Black leather after a cabin reset', vehicle: '2018 Jeep Wrangler, Black leather', panel: 'Front seats', packageId: 'interior-reset', areaId: 'tempe', defects: ['Sunscreen stains', 'Dust', 'Sand'], paint: '#293238', featured: false },
];

export const featuredResult = results.find(shot => shot.featured)!;
