/**
 * SourceCitation · canonical provenance type for ALL data blocks on PDP v0.4.
 *
 * @what  Typed citation w/ 3-tier classification (primary · secondary · derived).
 *        Every chart · stat · annotation must reference one or more citations.
 *        Replaces wallpaper "Ken Research" strings w/ structured provenance.
 *
 * @why   Stakeholder + tech-team contract: knowing where each datum comes from
 *        is a sales tool (proves rigor), an SEO tool (LLM/Google rewards sourced
 *        pages), and a legal cover (claims like "AUD 6,547.8 Mn" need attribution).
 *        Bare "Ken Research Analysis" on every chart erodes trust through repetition.
 *
 * @when  Use the SourceCluster molecule to render. Use SOURCES_REGISTRY in
 *        `src/lib/sources.ts` to look up citations by ID — never define inline.
 *
 * @how   Section component imports SOURCES_REGISTRY · references by string id ·
 *        passes array to SourceCluster. Backend CMS will swap mock registry for
 *        real per-chart sources field later · types stay stable.
 *
 * Source tier semantics:
 *   - primary:    Ken Research's own field research (CATI · expert calls · surveys)
 *                 Ken-unique IP · premium signal · cite by interview count + month/yr
 *   - secondary:  Public 3rd-party citation · ABS · World Bank · IBISWorld · ASX filings
 *                 Verifiable · cite w/ org + publication + year
 *   - derived:    Output of Ken's proprietary model (forecasts · CAGRs · interpolations)
 *                 Cite w/ "Ken Forecast Model" + base inputs
 */

export type SourceTier = 'primary' | 'secondary' | 'derived';

export interface SourceCitation {
  /** Unique id · used as key in SOURCES_REGISTRY lookup */
  id: string;

  /** 3-tier classification · drives visual treatment in SourceCluster */
  tier: SourceTier;

  /** Issuing organization (e.g. "ABS" · "Lineage" · "Ken Primary" · "Ken Forecast Model") */
  org: string;

  /** Publication or report title (e.g. "Cat. 8731 Refrigerated Warehousing Survey") · optional */
  title?: string;

  /** Year of source publication or model build */
  year: number;

  /** Month/quarter (e.g. "Nov" · "Q3") · optional for finer-grained citation */
  period?: string;

  /** Public URL where the source can be verified · optional (not all sources are crawlable) */
  url?: string;

  /**
   * Internal note shown in hover-tooltip · explains methodology context.
   * E.g. "30+ CATI interviews · field surveys 2024" for Ken Primary.
   * E.g. "Government refrigerated warehousing capacity census" for ABS.
   */
  internalNote?: string;

  /** When tier='derived' · list base citation ids this model output draws from */
  derivedFrom?: string[];
}

/**
 * SourceTierMeta · per-tier visual + label config consumed by SourceCluster.
 * Defined here (not in SourceCluster) so it can be referenced in docs + tests.
 */
export const SOURCE_TIER_META: Record<SourceTier, {
  label: string;
  dotColor: string;
  textColor: string;
  description: string;
}> = {
  primary: {
    label: 'Primary',
    dotColor: 'var(--color-brand-red, #b01f24)',
    textColor: 'var(--semantic-ink-strong)',
    description: 'Ken Research field work · CATI · expert interviews · player surveys',
  },
  secondary: {
    label: 'Secondary',
    dotColor: 'rgba(50, 90, 140, 0.85)',
    textColor: 'var(--semantic-ink-strong)',
    description: 'Verifiable 3rd-party publication · government · trade body · public filings',
  },
  derived: {
    label: 'Derived',
    dotColor: 'rgba(180, 130, 50, 0.85)',
    textColor: 'var(--semantic-ink-strong)',
    description: 'Ken proprietary forecast model output · blends primary + secondary inputs',
  },
};
