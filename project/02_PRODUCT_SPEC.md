# 02. Product Specification: Survive the Month
**Application**: Survive the Month (SurvivalRun)  
**Version**: 1.1.0 (Production Release)  
**Standard**: FQE v3.1 Compliant

---

## 1. Product Mission & Goals
Provide individuals operating under strict micro-budgets (₹10,000 / 30-day runway) with an unyielding financial telemetry cockpit and decision-support simulator. The platform guarantees survival through automated commitment shielding, dynamic daily burn recalculation, and predictive impulse prevention.

---

## 2. Core Functional Modules

### Module 1: Telemetry Command Center (`/dashboard`)
1. **Financial Runway Gauge**:
   - Total Starting Budget: ₹10,000 ($1,000,000\text{ paise}$).
   - Current Spendable Runway (after all expenses & locked savings).
   - Dynamic burn rate visual progress bar with danger thresholds (< 20% triggers red pulse).
2. **Safe Daily Allowance Indicator**:
   - Computes daily spend limit for today based on active remaining days ($30 - d + 1$).
   - Real-time adjustment as transactions are logged.
3. **Month-End Forecast Card**:
   - Net balance after upcoming active recurring commitments are paid.
   - Essential shortfall alert when spendable runway falls below mandatory obligations.
4. **Interactive Timeline Controller**:
   - Time scrubber allowing the user to inspect days 1 through 30.
   - Shows day progression, passed commitments vs upcoming commitments.

### Module 2: High-Density Expense Ledger (`/items`)
1. **Transaction Capture & Attributes**:
   - Monetary Amount (entered in INR, stored in integer paise).
   - Classification: Essential Need vs Discretionary Want.
   - Category tags: `Rent & Bills`, `Staple Groceries`, `Commute & Transit`, `Medical & Vital`, `Discretionary / Leisure`, `Zero-Spend Hack`.
   - Date, Merchant, and optional Receipt Proof attachment.
2. **Filtering & Sorting**:
   - Filter by Essential vs Discretionary.
   - Filter by category tag and status (`pending`, `in_progress`, `completed`).
   - Search by merchant or transaction note.

### Module 3: Recurring Commitments & Shielding
1. **Scheduled Obligations Registry**:
   - Fixed payments (e.g. Wi-Fi bill ₹699 on Day 15, Shared Rent ₹3,500 on Day 25).
   - Priority tagging (`isEssential: true`).
   - Dynamic timeline detection: automatically identifies whether obligation is upcoming ($dueDay \ge d$) or already passed ($dueDay < d$).
2. **Commitment Lock Shield**:
   - Cordoned off from daily allowance math to prevent accidental spending.

### Module 4: "What-If" Impulse Decision Simulator
1. **Interactive Sandbox**:
   - Enter proposed expense amount (₹) and category.
   - Live differential analysis:
     - New safe daily allowance after purchase.
     - New month-end balance.
     - Risk level transition (e.g. Low → Moderate, or Moderate → Critical).
2. **Verdict Engine**:
   - Green ("Affordable"): Purchase keeps daily allowance healthy and commitments intact.
   - Amber ("Caution"): Purchase decreases daily allowance below ₹150/day.
   - Red ("Dangerous"): Purchase triggers essential commitment shortfall.

### Module 5: Protected Savings Vault
1. **Emergency Buffer Allocation**:
   - Allocate portions of cash (e.g. ₹1,000) to locked emergency reserve.
   - Dedicated unlock barrier requiring explicit user confirmation.

---

## 3. Non-Functional Specifications
- **Performance**:
  - Initial load FCP < 1.2s, LCP < 2.0s.
  - Client calculations run synchronously in < 5ms with zero network latency.
- **Precision**:
  - 100% integer paise math throughout calculations.
  - Zero round-trip arithmetic drift.
- **Accessibility & SEO**:
  - WCAG 2.1 AA compliant contrast ratios.
  - Valid semantic headings (`h1` through `h3`) with no missing labels.
  - Full keyboard accessibility and visible focus-ring outlines.
