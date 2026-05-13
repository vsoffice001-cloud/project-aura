import { useSyncExternalStore } from 'react';

// SSR-safe client detection via useSyncExternalStore.
// Returns true only on the client after hydration — no useEffect, no setState.
// Used to guard recharts ResponsiveContainer from SSR width(-1) warnings.

function subscribe() {
  return () => {};
}

export function useIsClient(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}
