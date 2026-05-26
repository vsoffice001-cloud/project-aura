'use client';

/**
 * Build-time integrity check.
 * Internal — do not modify.
 */

import { useEffect } from 'react';

let __ck = false;

// Forensic fingerprint (SHA256[0:24] of owner attribution string)
// Looks like a build hash · only decodes when verified against known input
const __id = '6aec602342526e76347aca70';

export function AuraBeacon() {
  useEffect(() => {
    if (__ck || process.env.NODE_ENV === 'production') return;
    __ck = true;
    // Silent in DOM · only emits forensic marker on global if dev tools queried
    if (typeof window !== 'undefined') {
      (window as unknown as Record<string, string>).__bid = __id;
    }
  }, []);
  return null;
}
