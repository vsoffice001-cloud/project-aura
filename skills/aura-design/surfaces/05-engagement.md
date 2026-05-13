# Surface 05 — Engagement

**Buyer's question:** "What's it like to actually work with you?"
**North stars:** Linear authenticated views × Vercel dashboard × Stripe customer portal × Notion shared workspaces · `references/design-systems/{linear,stripe}/`
**Brand variant:** Editorial light DEFAULT (working context · less fatiguing for back-and-forth). Cinematic dark optional toggle.

Engagement = **the post-purchase relationship surface**. Tier A's relationship ends at PDF download. Ken's wedge: structured ongoing engagement = upsell channel + custom-research lead-gen + retention defense. Surfaces include client portal · request-tracker · scheduled-call manager · custom-research workspace · invoice/license center · feedback loop.

---

## Information architecture

### 05a. Client portal home (`/portal`)

```
[Workspace switcher band — sticky top, after main nav]
  Org name + role (Admin / Member / Viewer) · "Switch workspace" dropdown · Invite teammate CTA

[Action queue — top of fold, the "what needs me" zone]
  Title: "Needs your input · 3 items" (Linear inbox pattern)
  Cards: 
    - "Q3 Healthcare custom research — analyst awaiting your review"
    - "Renewal due 2026-08-15 · 23 days"
    - "1 new comment on 'India semiconductor' query thread"
  Each = clickable card · primary CTA inline · dismiss/snooze affordance

[Active engagements grid]
  Card: engagement title · type (Custom research / Subscription / Advisory) · status pill · next milestone · primary contact analyst (avatar + name)
  Status pills: Active · In review · Awaiting client · Delivered · Archived
  Filter by type · status · sector

[Scheduled calls band]
  Calendar mini-view (next 7 days · upcoming calls highlighted)
  Card per call: time · attendees · agenda preview · [Join] [Reschedule] [Add to calendar]
  Empty state: "No calls scheduled · [Book intro call w/ analyst]"

[Recent deliverables]
  3-col grid · most recent delivered reports / dashboards / data-cuts
  Card: thumbnail · title · delivered date · [View] CTA

[Footer — quick links + analyst contact]
  Primary analyst card (avatar · name · role · timezone · "Send a message" CTA)
```

### 05b. Engagement detail (`/portal/engagements/[id]`)

```
[Header band — editorial light]
  Breadcrumb: Portal / Engagements / Q3 Healthcare custom research
  H1: engagement title (Noto Serif 39px)
  Sub: type · status pill · started date · contract value (visible to Admin role only)
  Action row (right): [Message analyst] [Add file] [Request milestone] [...] menu

[Tab nav]
  Overview · Files · Conversations · Milestones · Invoices · Settings
  Active tab: 2px brand-red bottom border · 600 weight

[Overview tab]
  Engagement summary (analyst-edited markdown · client-comment-able)
  Milestone timeline (vertical · current milestone highlighted · past = check · future = dot)
  Key contacts grid (analysts + client team)
  Linked deliverables (reports / dashboards / queries / files)

[Conversations tab]
  Thread list (left) · Active thread (right) · 60/40 split
  Thread = analyst messages + client replies + file attachments + status updates (Linear-style)
  Compose: markdown · attach files · @-mention teammates · "Send to analyst" CTA
  Anti-pattern: real-time chat is wrong fit. Async-thread default (Substack inbox pattern). Notifications email + in-portal.

[Files tab]
  Drag-and-drop upload zone (top)
  File list: name · uploader · date · size · download · share-link
  Folder structure: by milestone OR flat (toggle)
  Versioning: replace file → version chain visible

[Milestones tab]
  Vertical timeline: each milestone = card (title · description · due-date · status · deliverable · analyst sign-off)
  Status transitions: Planned → In progress → Awaiting client → Delivered
  Client can: comment · approve · request-revision · add-context (markdown)
  Analyst-only: edit milestone · attach deliverable · mark complete

[Invoices tab — Admin role only]
  Invoice list table: invoice # · date · amount · status (Paid / Outstanding / Overdue) · download · pay-now (Stripe redirect)
  Anti-pattern: don't reinvent billing. Embed Stripe customer-portal iframe.

[Settings tab — Admin role only]
  Engagement details · contract docs · team access (per-user role) · notification prefs · archive
```

### 05c. Custom-research request flow

```
[Step 1 — Brief intake (a real form, but minimal)]
  Goal (1 textarea, 200-char hint)
  Sector + sub-sector (catalog dropdown)
  Region/country (catalog)
  Methodology preferences (chip multi-select · NOT hard requirement)
  Deadline (date picker)
  Budget range (range slider · NOT exact $)
  
  Anti-pattern: don't ask for company-size · headcount · "describe your project" 5-paragraph essay. Stripe pattern: minimum to qualify, expand on call.

[Step 2 — Match w/ analyst]
  Live-suggest 2-3 analysts based on sector + region · avatar + bio + recent reports authored
  Client picks OR "Let Ken match" CTA

[Step 3 — Schedule intro call]
  Embedded scheduler (Cal.com or similar) · analyst's availability · 15-min default
  Outcome: call booked · engagement created in portal · email confirmation

[Step 4 — Engagement live]
  Redirects to engagement detail page (05b) · status: "Brief in review"
```

### 05d. Account / billing

```
[Account home]
  Profile: name · email · role · tz · password (Stripe pattern — minimum)
  Org: name · members (table w/ role per user) · invite link · default workspace
  Billing: payment method · invoices list · subscription status · upgrade/downgrade CTA

[Subscription detail]
  Current plan · features included · usage meter (reports purchased / queries run / storage used)
  Upgrade: side-by-side plan compare · annual/monthly toggle · upgrade CTA → Stripe checkout
  Cancel: 1-click w/ reason capture (Stripe-pattern · no retention modal trap)

[Anti-pattern]
  Don't build retention dark-patterns ("Are you sure?" modals · 3-step cancel · "speak to retention specialist"). Cancel = 1 click. Stripe-grade.
```

---

## Type system (working surface, dense)

| Element | Size | Font | Notes |
|---|---|---|---|
| Page h1 | 39px | Noto Serif 600 | smaller than marketing |
| Card title (h3) | 16-18px | DM Sans 600 | NOT serif — same as dashboards |
| Body | 14-15px | DM Sans 400 | dense reading |
| Action queue card title | 16px | DM Sans 600 | scannable |
| Status pill | 12.8px | DM Sans 600 | small caps · color-coded |
| Timeline event | 14px | DM Sans 400 | tabular-nums for dates |
| Table cells | 14px | DM Sans 400 | numeric tabular-nums |

---

## Color use (status semantics)

Status colors via tokens · NEVER raw:
- Active / Healthy → `--color-status-success` (green)
- In progress / Pending → `--color-status-info` (blue/periwinkle accent)
- Awaiting client → `--color-status-warning` (amber)
- Overdue / Failed → `--color-status-error` (brand-red — overlaps brand. OK because portal context = working, not marketing)
- Delivered / Archived → `--color-text-subtle` (neutral)

**Brand red usage in portal:**
- Primary CTA (consistent w/ other surfaces)
- Overdue/error status (semantic, not decorative)
- Active tab indicator
- NEVER for friendly hover bg (Cat 13.6 — semantic-pollution)

---

## Motion system (restraint)

Engagement = working surface · less motion than marketing (same as dashboards).

| Element | Library | Trigger | Pattern |
|---|---|---|---|
| Action queue card entrance | Framer | mount | fade-up 60ms stagger · once per session |
| Tab transition | Framer | tab change | content fade 150ms · NOT slide |
| Timeline event reveal | Framer | inView | fade-up · 80ms stagger |
| File upload progress | native + Framer | drag-over / upload | dashed border highlight · progress bar fill |
| Modal entrance | Framer | open | fade + scale 0.96→1 · 200ms · ease-out |
| Smooth scroll | OFF (working surface) — same override as Dashboard | — | native instant scroll |

---

## Density rules

- **Tab nav:** 44px height · `--space-tab-px` horizontal · 2px active border
- **Card padding:** `--space-card-md` consistent w/ surface 02
- **Table row:** 44px comfortable · 32px compact (user toggle)
- **Timeline gutter:** 24px between events · 2px guide line through dots
- **Sidebar (if used):** 240px expanded · matches dashboard pattern

---

## Anti-patterns (Engagement-specific)

1. **Real-time chat shoehorned in** — async threads (Linear inbox pattern). Real-time = battery drain + presence-anxiety.
2. **"Are you sure?" cancel modals** — Stripe-grade 1-click cancel. Reason capture optional.
3. **Form-gated milestone updates** — client comment / approve / request-revision = inline, no form. Friction kills feedback loop.
4. **Notification spam** — default = digest email daily + in-portal badge. Granular controls in settings.
5. **Role-based UI w/ "request access" loops** — show what's gated · "Ask admin for access" link inline · NEVER hide gated features (creates confusion).
6. **Custom in-house file upload** — use battle-tested (Uppy or platform-native). Building file upload from scratch = 10+ hidden bugs.
7. **Building chat/voice/video in-house** — use platform integrations (Cal.com for scheduling · email for async · Stripe Connect for billing). Don't reinvent the wheel.
8. **Retention dark-patterns on cancel** — see Cat 13.3. Stripe-grade.

---

## DS components used

```ts
import {
  Button, CTALink, Card, Badge, StatusDot, Avatar,
  MenuItem, Divider, InlineLink, ScrollToTop,
  // Status pill = Badge variant w/ semantic theme
} from '@kenresearch/design-system/atoms';

import {
  StatCard, SearchBar, AuthButtons,
  // Engagement-specific molecules (Phase 2.x):
  // ActionQueueCard, EngagementCard, MilestoneEvent, FileRow, ConversationThread, InvoiceRow
} from '@kenresearch/design-system/molecules';

import {
  TopNavigation,
  AuthPopover,
  // Engagement organisms (Phase 2.x):
  // ActionQueue, EngagementGrid, ScheduledCallsBand, EngagementDetailHeader, TabbedEngagementBody, 
  // ConversationThreadList, FilesUploadZone, MilestoneTimeline, InvoicesTable, AccountSettings
} from '@kenresearch/design-system/organisms';
```

**Future DS additions needed (Phase 2.x):**
- `EngagementCard`, `ActionQueueCard`, `MilestoneEvent` molecules
- `MilestoneTimeline`, `FilesZone`, `ConversationThreadList` organisms
- `useEngagement` hook (status state · role permissions)
- `useNotifications` hook (digest + in-portal badge)
- Status-color token group `semantic.engagement.{active,inProgress,awaiting,overdue,delivered,archived}` (extends current `semantic.status.*`)

---

## Integration points

| Concern | Integration |
|---|---|
| Scheduling | Cal.com OR Google Calendar embed |
| Billing | Stripe customer portal (iframe redirect) |
| File storage | S3 + signed URLs (backend scope) · client UI uses Uppy or React-DropZone |
| Auth | NextAuth (per CLAUDE.md prod stack) · roles: Admin / Member / Viewer · org-scoped |
| Notifications | Backend digest job (Celery) + in-portal badge |
| Async threads | Backend (Django) · WebSocket only for "new message" presence indicator (NOT for real-time typing) |

**Backend out-of-scope for Aura build per CLAUDE.md.** Design as-if + mock APIs for frontend prototype. Real wire happens at handover.

---

## Recipe pointer

Recipe TBD: `design-system/recipes/engagement-portal.md` (Phase 2.x). Likely 3 separate recipes: portal-home · engagement-detail · custom-research-flow. For now build from this surface file.

---

## Cross-surface citations

- Topbar `<TopNavigation>` workspace-switcher slot shared w/ surface 04 (Dashboard app shell) — different render-prop slot config
- StatusDot atom shared w/ surface 04 (live-data indicator)
- Cite-block NOT used here (engagement is private workspace, citation = surface 03)
- Filter strip pattern shared w/ surface 02 (Report Store) + surface 04 (Dashboard) — same `<FilterStrip>` organism, different dimensions
- StatCard shared w/ surfaces 01 + 03 + 04
