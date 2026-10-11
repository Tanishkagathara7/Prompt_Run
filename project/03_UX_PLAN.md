# 03. UX & UI Design Plan: Survive the Month
**Project**: Survive the Month  
**Target Design Standard**: Linear / Vercel High-Density Precision  
**Styling Framework**: Tailwind CSS v4 + Accessible Semantics

---

## 1. Visual Design Philosophy & Color Palette

Survive the Month employs an ultra-clean, high-contrast, clarity-focused theme engineered to eliminate cognitive overload during stressful financial moments.

### Primary Tokens
- **Brand Primary Accent**: Emerald `#10B981` (Health, solvency, controlled runway)
- **Deep Emerald Background**: `#064E3B` to `#047857` (Gradients and hero highlights)
- **Warning / Caution**: Amber `#F59E0B` (Low allowance warning, upcoming payment alert)
- **Danger / Critical**: Rose / Crimson `#EF4444` (Negative balance, essential shortfall)
- **Neutral Dark Surface**: Slate `#0F172A` / `#1E293B` (Command center dark contrast)
- **Typography**: Inter / Outfit sans-serif hierarchy for maximum tabular numeric legibility.

---

## 2. Responsive Breakpoint Layouts

### A. Desktop ($\ge 1280\text{px}$)
- **Left Navigation Rail (`w-64`)**: Fixed persistent sidebar housing Brand Logo, Navigation Links (Command Center, Survival Ledger, What-If Simulator, Protected Vault, Alerts), User Profile, and Quick Action button.
- **Top Bar**: Search bar, current Day indicator ($d/30$), quick date selector, notification center bell.
- **3-Column Bento Command Center**:
  - Column 1 (Hero Metric): Giant Spendable Runway Gauge with radial progress and integer paise currency display.
  - Column 2 (Burn Rate): Safe Daily Allowance, Days Remaining ($30 - d + 1$), and Burn Rate Pace.
  - Column 3 (Forecast & Commitments): Month-End Projected Balance, Essential Shortfall alerts, and upcoming bills.
- **Data Table**: High-density transaction ledger with sortable columns, category badges, essential/discretionary pills, and inline editing.

### B. Laptop ($1024\text{px} - 1279\text{px}$)
- Compact sidebar navigation (`w-56`).
- 2-Column responsive grid adapting bento cards with maintained padding (`p-6`).

### C. Tablet ($768\text{px} - 1023\text{px}$)
- Collapsible navigation drawer activated by hamburger icon.
- Single-to-dual column hybrid layouts.
- Interactive charts automatically resize using responsive container queries.

### D. Mobile Web ($< 768\text{px}$)
- Drawer menu with minimum $44 \times 44\text{px}$ touch targets.
- Single-column card stream replacing multi-column tables for effortless thumb scrolling.
- Sticky bottom action bar for instant "Log Expense" and "What-If Simulate".

---

## 3. UI/UX Interaction States

Every data component strictly implements four discrete states:
1. **Loading State**: Shimmer pulse skeletons matching the exact geometry of the loaded cards. No blank viewports or jarring layout shifts (CLS < 0.05).
2. **Empty State**: Contextual illustrations and actionable copy (e.g., *"No expenses logged today. You have saved ₹333 towards your buffer! Add an expense or simulate a purchase."*).
3. **Success State**: Immediate optimistic UI updates paired with non-intrusive toast alerts and color-coded status pills.
4. **Error State**: Non-blocking inline error banners with retry triggers and human-readable recovery suggestions.

---

## 4. Accessibility (a11y) & Usability Compliance
- Semantic landmarks (`<header>`, `<main>`, `<nav>`, `<aside>`, `<footer>`) on all views.
- Rigorous heading hierarchy (one single `<h1>` per page, sequential `<h2>` and `<h3>`).
- Focus-visible rings (`focus-visible:ring-2 focus-visible:ring-emerald-500`) on all buttons, links, and inputs.
- High color contrast meeting WCAG 2.1 AA (minimum 4.5:1 ratio for text).
- `aria-label` and `aria-live` regions for dynamic balance adjustments and simulator verdict announcements.
- `@media (prefers-reduced-motion: reduce)` support to prevent motion sickness.
