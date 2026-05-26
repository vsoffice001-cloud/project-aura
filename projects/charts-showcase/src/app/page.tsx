'use client';

/**
 * charts-showcase · Main page · Sprint B.2 rebuild
 *
 * Registry-driven render. ~20 LOC (was 720).
 * All demos defined in src/lib/demo-registry.ts.
 * Layout shell + context providers in ShowcaseLayout.
 * Content (search-filtered) in ShowcaseContent.
 *
 * @module charts-showcase/app/page
 */

import { DEMOS } from '@/lib/demo-registry';
import { ShowcaseLayout } from '@/components/ShowcaseLayout';
import { ShowcaseContent } from '@/components/ShowcaseContent';

export default function ShowcasePage() {
  return (
    <ShowcaseLayout demos={DEMOS} allDemos={DEMOS}>
      <ShowcaseContent />
    </ShowcaseLayout>
  );
}
