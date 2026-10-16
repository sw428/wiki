export const paletteStorageKey = 'wiki-site-palette';

export const palettes = [
  {
    id: 'teal', label: '緑',
    light: { 1: '#087f73', 2: '#0b9284', 3: '#087f73', soft: 'rgba(8, 127, 115, 0.1)' },
    dark: { 1: '#65d8c6', 2: '#85e5d6', 3: '#167d70', soft: 'rgba(101, 216, 198, 0.12)' }
  },
  {
    id: 'yellow', label: '黄色', swatch: '#facc15',
    light: { 1: '#8a6800', 2: '#a17a00', 3: '#715500', soft: 'rgba(250, 204, 21, 0.1)' },
    dark: { 1: '#fde047', 2: '#fef08a', 3: '#a17a00', soft: 'rgba(253, 224, 71, 0.12)' }
  },
  {
    id: 'cyan', label: '水色',
    light: { 1: '#0e7490', 2: '#0891b2', 3: '#155e75', soft: 'rgba(14, 116, 144, 0.1)' },
    dark: { 1: '#67e8f9', 2: '#a5f3fc', 3: '#0e7490', soft: 'rgba(103, 232, 249, 0.12)' }
  },
  {
    id: 'blue', label: '青',
    light: { 1: '#2563eb', 2: '#3b82f6', 3: '#1d4ed8', soft: 'rgba(37, 99, 235, 0.1)' },
    dark: { 1: '#93c5fd', 2: '#bfdbfe', 3: '#1d4ed8', soft: 'rgba(147, 197, 253, 0.12)' }
  },
  {
    id: 'indigo', label: '藍',
    light: { 1: '#4f46e5', 2: '#6366f1', 3: '#4338ca', soft: 'rgba(79, 70, 229, 0.1)' },
    dark: { 1: '#a5b4fc', 2: '#c7d2fe', 3: '#4338ca', soft: 'rgba(165, 180, 252, 0.12)' }
  },
  {
    id: 'purple', label: '紫',
    light: { 1: '#7c3aed', 2: '#8b5cf6', 3: '#6d28d9', soft: 'rgba(124, 58, 237, 0.1)' },
    dark: { 1: '#c4b5fd', 2: '#ddd6fe', 3: '#6d28d9', soft: 'rgba(196, 181, 253, 0.12)' }
  },
  {
    id: 'pink', label: 'ピンク',
    light: { 1: '#db2777', 2: '#ec4899', 3: '#be185d', soft: 'rgba(219, 39, 119, 0.1)' },
    dark: { 1: '#f9a8d4', 2: '#fbcfe8', 3: '#be185d', soft: 'rgba(249, 168, 212, 0.12)' }
  },
  {
    id: 'orange', label: 'オレンジ', swatch: '#f97316',
    light: { 1: '#c2410c', 2: '#ea580c', 3: '#9a3412', soft: 'rgba(249, 115, 22, 0.1)' },
    dark: { 1: '#fdba74', 2: '#fed7aa', 3: '#c2410c', soft: 'rgba(253, 186, 116, 0.12)' }
  }
];

function findPalette(id) {
  return palettes.find(palette => palette.id === id) || palettes[0];
}

export function applyPalette(root, id) {
  const palette = findPalette(id);
  for (const mode of ['light', 'dark']) {
    for (const [key, value] of Object.entries(palette[mode])) {
      root.style.setProperty(`--wiki-brand-${key}-${mode}`, value);
    }
  }
  root.dataset.wikiPalette = palette.id;
  return palette.id;
}

export function loadPalette(storage) {
  try { return findPalette(storage?.getItem(paletteStorageKey)).id; }
  catch { return palettes[0].id; }
}

export function savePalette(storage, id) {
  try { storage?.setItem(paletteStorageKey, findPalette(id).id); }
  catch { /* 保存できない環境でも、画面上の配色切り替えは使える。 */ }
}
