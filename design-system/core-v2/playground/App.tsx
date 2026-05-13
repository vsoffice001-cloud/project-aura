import React from 'react';

/**
 * Playground App — Phase C populates component previews.
 * This replaces the App.tsx + react-router-dom SPA pattern from core-v1.
 * Route structure added when atoms are promoted in Phase C.
 */
export default function App(): React.ReactElement {
  return (
    <main style={{ padding: '2rem', fontFamily: 'DM Sans, sans-serif' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>
        @kenresearch/design-system v2 — Playground
      </h1>
      <p style={{ color: '#666' }}>
        Component previews populated in Phase C (atom promotion).
      </p>
      <p style={{ color: '#666', marginTop: '0.5rem' }}>
        Run <code>pnpm storybook</code> for visual component browser.
      </p>
    </main>
  );
}
