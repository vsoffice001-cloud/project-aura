import { useEffect, useState, useCallback } from 'react';

export type TemplateVariant = 'a' | 'b' | 'c' | 'd' | 'e';

const STORAGE_KEY = 'cs-template';
const VALID: TemplateVariant[] = ['a', 'b', 'c', 'd', 'e'];

function readInitial(): TemplateVariant {
  if (typeof window === 'undefined') return 'a';
  const params = new URLSearchParams(window.location.search);
  const fromUrl = params.get('v') as TemplateVariant | null;
  if (fromUrl && VALID.includes(fromUrl)) return fromUrl;
  const fromStorage = window.localStorage.getItem(STORAGE_KEY) as TemplateVariant | null;
  if (fromStorage && VALID.includes(fromStorage)) return fromStorage;
  return 'a';
}

export function useTemplateVariant() {
  const [variant, setVariantState] = useState<TemplateVariant>(() => readInitial());

  const setVariant = useCallback((next: TemplateVariant) => {
    setVariantState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
      const url = new URL(window.location.href);
      url.searchParams.set('v', next);
      window.history.replaceState({}, '', url.toString());
    } catch {
      /* noop */
    }
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLElement && ['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;
      if (e.key === 'ArrowRight') {
        const idx = VALID.indexOf(variant);
        setVariant(VALID[(idx + 1) % VALID.length]);
      } else if (e.key === 'ArrowLeft') {
        const idx = VALID.indexOf(variant);
        setVariant(VALID[(idx - 1 + VALID.length) % VALID.length]);
      } else if (['1', '2', '3', '4', '5'].includes(e.key)) {
        setVariant(VALID[parseInt(e.key, 10) - 1]);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [variant, setVariant]);

  return { variant, setVariant };
}

export const TEMPLATE_META: Record<TemplateVariant, { label: string; name: string; tagline: string }> = {
  a: { label: 'A', name: 'Editorial', tagline: 'Tombstone · Authoritative' },
  b: { label: 'B', name: 'Data Story', tagline: 'Scrollytelling · Analytical' },
  c: { label: 'C', name: 'Report', tagline: 'Chaptered · Longform' },
  d: { label: 'D', name: 'Dashboard', tagline: 'Metrics · CFO View' },
  e: { label: 'E', name: 'Cinematic', tagline: 'Journey · Flagship' },
};
