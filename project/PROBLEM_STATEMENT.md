# Problem Statement: Broke But Functional — Survive the Month
**Domain**: Personal Micro-Budget Runway & Survival Decision Engine  
**Target Scenario**: Managing a ₹10,000 budget over a strictly bounded 30-day timeline  
**Platform**: Survive the Month (SurvivalRun)

---

## 1. Executive Summary & Problem Framing

Young adults, college students, interns, and early-stage professionals frequently experience critical month-end cash crunches. Traditional personal finance software (e.g., Mint, YNAB, generic spreadsheet templates) fails this demographic because:
1. **Wrong Abstractions**: They assume steady monthly savings, complex investment portfolios, and amortized retirement planning. They do not address the acute existential question: *"Can I afford dinner tonight and still pay my rent on the 24th?"*
2. **Floating-Point Drift**: Currency roundoff errors in standard JavaScript math result in discrepancy accumulation, destroying user trust when dealing with tight margins.
3. **Delayed Feedback**: Monthly retrospective charts tell users they overspent after the catastrophe has already occurred.
4. **Discretionary vs. Essential Conflation**: Treating a cafe coffee the same as essential electricity bills causes users to underestimate upcoming non-negotiable commitments.

**Survive the Month** is an opinionated, high-velocity financial runway engine designed specifically for the ₹10,000 / 30-day survival constraint.

---

## 2. Target Users & User Personas

### Persona A: The Frugal Survivor (Primary)
- **Profile**: A student, intern, or entry-level professional living on a fixed stipend of ₹10,000 for the month.
- **Pain Points**:
  - Unclear daily spending allowance causing accidental early depletion of funds.
  - Forgetting scheduled upcoming non-negotiable payments (rent share, electricity, phone recharge).
  - Impulsive spending decisions without understanding month-end consequences.
- **Key Need**: Instant visibility into today's safe spend ceiling, remaining days, and survival trajectory.

### Persona B: The Budget Accountability Buddy (Secondary)
- **Profile**: A trusted friend, sibling, or financial mentor helping the survivor stay disciplined.
- **Pain Points**:
  - Lack of objective data on whether the survivor is on track or about to run out of money.
- **Key Need**: Transparent ledger inspection, commitment verification, and zero-spend streak tracking.

---

## 3. Core Requirements & Constraints

| Parameter | Specification | Enforcement Mechanism |
|---|---|---|
| **Starting Runway** | ₹10,000.00 | Initial baseline cycle allocation ($1,000,000\text{ paise}$) |
| **Simulation Duration** | 30 Days ($d \in [1, 30]$) | Bounded time horizon; remaining days $30 - d + 1$ |
| **Arithmetic Precision** | Integer Paise Math | $1\text{ INR} = 100\text{ Paise}$; zero IEEE-754 floating drift |
| **Separation of Concerns** | Essential vs Discretionary | Strict ledger categorization with essential commitments shielding |
| **Protected Savings** | Lockable emergency buffer | Dedicated goal isolation deducted from daily spendable runway |

---

## 4. Key Differentiators & Winning Features

### 1. Integer-Paise Financial Engine
All balances, inflows, outflows, commitments, and savings goals are computed with 64-bit safe integer paise. Formatting occurs strictly at the presentation boundary via Indian currency localization (`en-IN`).

### 2. The "What-If" Impulse Decision Simulator
Before tapping a UPI QR code or making an impulse purchase, the user can simulate the purchase in real time:
- Calculates immediate delta on the **Safe Daily Allowance**.
- Flags if the purchase triggers an **Essential Shortfall** against upcoming bills.
- Computes new projected month-end balance.
- Returns clear green/amber/red verdicts: *"Safe to Buy"*, *"Caution: Tightens Daily Burn"*, or *"Blocked: Breaches Essential Bills"*.

### 3. Dynamic Safe Daily Burn Allowance
Rather than dividing total cash by 30 once, the safe daily burn dynamically recalculates each day:
$$\text{SafeDailyAllowance} = \max\left(0, \left\lfloor \frac{\text{RemainingSpendable}}{d_{\text{remaining}}} \right\rfloor\right)$$
Upcoming scheduled obligations are segregated so essential bills are never accidentally spent on daily food.

### 4. Protected Savings Cushion
Users can lock an emergency cushion (e.g. ₹1,000) that is immediately cordoned off from daily spendable calculations. Funds cannot be spent without explicit emergency unlocking.

---

## 5. Verification & Acceptance Criteria
1. **Ledger Accuracy**: $\text{RemainingSpendable} = \text{StartingBudget} + \text{Income} - \text{Expenses} - \text{ProtectedSavings}$ holds across all transactions.
2. **Zero Division by Zero**: Day 30 and beyond cleanly clamped to 1 minimum remaining day.
3. **Predictive Alerts**: Critical risk status triggered whenever projected month-end balance drops below ₹0.
4. **Cross-Platform Responsive UX**: Flawless interaction on Mobile Web (< 768px), Tablet (768px - 1024px), and Desktop (1280px+).
