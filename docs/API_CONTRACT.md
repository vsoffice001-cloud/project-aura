# API Contract · Django Backend ↔ Frontend Consumer

**Status:** DRAFT · 2026-05-13 · Django team to validate
**Source:** Mirrors `projects/reports-pdp-v2/src/lib/mock-data.ts` shapes + `@kenresearch/design-system/types`
**For:** Tech team building Django CMS post-handover

---

## How to use this doc

1. **Mock data lives in consumer** (`src/lib/mock-data.ts`) · serves as fixture for frontend dev.
2. **Django implements endpoints below** · returning same shapes.
3. **Consumer flips mock→real** by reading `NEXT_PUBLIC_API_URL` env var (see `.env.example`).
4. **Type contract** lives in `@kenresearch/design-system/types` · import directly into Django response serializers.

---

## Endpoints (12 minimum for reports-pdp-v2)

### 1 · Report listing (Report Store)

```http
GET /api/reports?industry=&subIndustry[]=&tag[]=&region[]=&year[]=&format[]=&sort=date&page=1
```

**Response:**
```ts
{
  items: ReportItem[];           // PAGE_SIZE items (default 12)
  total: number;                 // total matching after filters
  totalPages: number;
  page: number;                  // echoed
  filters: {
    appliedIndustries: string[];
    appliedRegions: string[];
    // ...echoed for client-side state
  };
}
```

**Type:** `ReportItem` from `@kenresearch/design-system/types`.

### 2 · Report detail (Reports PDP)

```http
GET /api/reports/[slug]
Authorization: Bearer <token>   // optional · drives access tier
```

**Response:** Full `ReportDetailV2` shape (see `projects/reports-pdp-v2/src/lib/mock-data.ts` for canonical shape · ~300 LOC):

```ts
{
  slug: string;
  meta: { title, subtitle, breadcrumbs, ... };
  accessTier: 'public' | 'metered' | 'lead-gated' | 'login-gated' | 'paid';
  heroCockpit: { tabs: HeroTab[], metadata };
  schemaMeta: { type, datePublished, ... };
  modules: {
    keyStats: StatData[];
    executiveSummary: { content, gated };
    reportScope: { ... };
    reportFacts: { facts, answers };
    marketOverview: { ... };
    segmentation: { ... };
    methodology: { steps, dataSources };
    competitiveLandscape: { competitors, comparison };
    forecast: { years, scenarios };
    challengesSolutions: { rows };
    regulatory: { authorities };
    taxonomy: { branches };
    futureOutlook: { ... };
    related: { reports: ReportItem[] };
    faq: FAQItem[];
    // ...30 modules total · see SCHEMA.md
  };
  authors: AuthorBio[];
  pricing: { tiers, contactCta };
}
```

### 3 · Lead capture (4 form types)

```http
POST /api/leads
Content-Type: application/json

{
  "type": "sample" | "analyst-call" | "customization" | "dataset-unlock",
  "reportSlug": string,
  "ctaLocation": string,       // analytics breadcrumb
  "sectionName": string,
  "fullName": string,
  "email": string,
  "company": string,
  "designation": string,
  "phone": string,
  "country": string,
  "message"?: string
}
```

**Response:**
```ts
{ status: 'received', leadId: string, expectedResponseTime: '24h' }
```

### 4 · Industries · regions · sectors · tags (filter source-of-truth)

```http
GET /api/catalog/industries  → IndustryData[]    (label, count, subs[])
GET /api/catalog/regions     → RegionData[]      (label, count)
GET /api/catalog/sectors     → SectorItem[]      (name, count)
GET /api/catalog/tags        → string[]
GET /api/catalog/years       → string[]
```

### 5 · Search

```http
GET /api/search?q=<query>&type=reports|industries|tags
```

**Response:** `{ items: ReportItem[] | IndustryData[] | string[], total }`

### 6 · Daily highlights · analyst picks · trending (Report Store home)

```http
GET /api/highlights/daily       → DataHighlight[]
GET /api/analysts/picks         → AnalystPick[]
GET /api/reports/trending       → ReportItem[]
GET /api/reports/recently-viewed → ReportItem[]   // requires auth · user-specific
GET /api/reports/recommended    → ReportItem[]   // requires auth · personalized
GET /api/reports/upcoming       → ReportItem[]
```

### 7 · Stats (Key Market Indicators)

```http
GET /api/stats/market-indicators → StatData[]
```

### 8 · Analytics events (mirror frontend events)

```http
POST /api/analytics/event

{
  "event": "report_viewed" | "lead_form_open" | "lead_form_submit" | ... (21 events total),
  "properties": { reportSlug, ctaLocation, accessTier, ... }
}
```

Or wire to GTM · GA · Leadfeeder directly in frontend (per CLAUDE.md L40 marketing tools list).

---

## Access tier resolution

Frontend reads access-tier from `GET /api/reports/[slug]` response. Backend logic:

| Tier | Trigger |
|---|---|
| `public` | Anonymous user · all metadata + first chart |
| `metered` | Anonymous · first 3 charts/dataset · quota tracked via cookie |
| `lead-gated` | Quota exceeded · email captured · all charts (no datasets) |
| `login-gated` | Logged in (NextAuth) · no paid subscription · charts + previews |
| `paid` | Active subscription · everything unlocked |

Frontend conditionally renders per tier. Backend gates response payload.

---

## Schema.org JSON-LD (9 types · already implemented in frontend)

Backend doesn't generate · frontend builds from response data:

- Report → `Article` + `Dataset`
- Author → `Person`
- Organization → `Organization` (Ken Research)
- FAQs → `FAQPage` (inline · NOT injector)
- Breadcrumbs → `BreadcrumbList`
- Pricing → `Offer`
- Methodology → `HowTo`

See `projects/reports-pdp-v2/src/components/SchemaInjector.tsx`.

---

## Error responses

Standard HTTP codes + JSON body:

```json
{
  "error": "report_not_found",
  "message": "Report 'invalid-slug' does not exist",
  "code": 404
}
```

Frontend handles via Next 16 `error.tsx` + `not-found.tsx`.

---

## Auth flow

NextAuth wires post-handover · tech-team owns. Frontend reads `useSession()` · passes JWT to backend via `Authorization: Bearer <token>`. Django validates.

---

## Mock-to-real flip

In frontend (`src/lib/api.ts` to be created · currently inline mock):

```ts
// CURRENT (mock):
export async function getReport(slug: string) {
  return MOCK_REPORTS[slug];
}

// POST-HANDOVER (real):
export async function getReport(slug: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/reports/${slug}`);
  if (!res.ok) throw new Error(`Report not found: ${slug}`);
  return res.json();
}
```

---

## TODO · Django team to validate

- [ ] Confirm all 12 endpoint signatures match Django ORM capabilities
- [ ] Decide auth: JWT (NextAuth) vs session cookies vs API key
- [ ] Decide caching: edge cache · Redis · stale-while-revalidate
- [ ] Decide pagination: offset+limit vs cursor-based
- [ ] Decide search: Postgres FTS vs Elasticsearch vs Algolia
- [ ] Decide analytics ingestion: backend POST vs direct frontend → GTM
- [ ] Add OpenAPI / Swagger spec generation
- [ ] Add `.env.example` for Django backend
- [ ] CMS admin UI: who manages reports (per PRD §39)?

---

**Status:** DRAFT · awaiting Django team review
**Next review:** post tech-intake (request adjustments via Slack/email)
