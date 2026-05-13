// Charts barrel — Step 4 (Highcharts theme + 5 presets, DS-token-only)
// SSR: Highcharts is browser-only — wrap consumer with next/dynamic({ ssr: false })
// Theme reads CSS custom properties at runtime (--chart-palette-1..8, etc.)

export { kenHighchartsTheme, buildKenHighchartsTheme, mergePreset, readToken } from './highchartsTheme';
export * from './presets/index';
