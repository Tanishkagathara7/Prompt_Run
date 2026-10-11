# Financial Rules & Canonical Accounting Engine
**Project**: Broke But Functional — Survive the Month  
**Target Goal**: Guide users to manage a ₹10,000 budget over a 30-day timeline with zero arithmetic drift, clear essential prioritization, protected savings shielding, and robust decision simulation.

---

## 1. Core Principles & Currency Representation

1. **Integer Arithmetic (Paise Precision)**
   - All internal monetary values are represented as positive or signed 64-bit safe integers in **Paise** ($1\text{ INR} = 100\text{ Paise}$).
   - Starting Budget: $\text{₹}10,000.00 = 1,000,000\text{ paise}$.
   - Never use floating point math ($0.1 + 0.2 \neq 0.3$) or formatted currency strings for calculations.
   - User inputs in Rupees are parsed to exact paise via `parseINRToPaise(val) = Math.round(Number(val) * 100)`.
   - Currency display uses `formatINR(amountPaise)` using Indian numbering formatting (`en-IN`).

2. **Timeline Definition**
   - The simulation timeline is strictly bounded from Day 1 to Day 30 ($N = 30$).
   - Current simulation day: $d \in [1, 30]$.
   - Days remaining in cycle: $d_{\text{remaining}} = 30 - d + 1$ (including current day).
   - Minimum remaining days is clamped to 1 to prevent division-by-zero errors.

---

## 2. Canonical Data Models

### A. Transactions (`FinancialTransaction`)
- **Income**: Money flowing into the budget ($+ \Delta$). Increases available spendable runway immediately.
- **Expense**: Money leaving the budget ($- \Delta$). Categorized as:
  - **Essential**: Non-negotiable survival needs (rent, basic groceries, utilities, vital medications).
  - **Discretionary**: Optional wants (cafe hangouts, luxury entertainment, takeout).
- Transactions have explicit ledger immutability attributes; editing an existing transaction reverses its previous impact before applying new parameters.

### B. Recurring Commitments (`RecurringCommitment`)
- Scheduled obligations due on a specific calendar day $dueDay \in [1, 30]$.
- Status: `isActive` (true/false).
- Upcoming obligations: Active commitments where $dueDay \ge d$ (due today or in the future).
- Passed obligations: Commitments where $dueDay < d$ have already matured.
- Essential commitments: Obligations tagged as `isEssential = true` (e.g. broadband for remote work, rent, electricity).

### C. Protected Savings Goals (`SavingsGoal`)
- Shielded funds parked in targets (e.g. emergency buffer, goal fund).
- Money deposited into a savings goal is **locked** and strictly deducted from the daily spendable runway.
- Funds in savings can only be unlocked explicitly through an emergency withdrawal.
- Unlocking savings increases the spendable runway.

---

## 3. Financial Calculation Formulas

### 1. Total Inflow & Outflow
$$\text{TotalIncome} = \sum_{t \in \text{Transactions}, t.\text{type} = \text{'income'}} t.\text{amountPaise}$$
$$\text{TotalSpent} = \sum_{t \in \text{Transactions}, t.\text{type} = \text{'expense'}} t.\text{amountPaise}$$
$$\text{EssentialSpent} = \sum_{t \in \text{Expenses}, t.\text{isEssential} = \text{true}} t.\text{amountPaise}$$
$$\text{DiscretionarySpent} = \sum_{t \in \text{Expenses}, t.\text{isEssential} = \text{false}} t.\text{amountPaise}$$

### 2. Protected Savings
$$\text{ProtectedSavings} = \sum_{g \in \text{SavingsGoals}} \max(0, g.\text{currentAmountPaise})$$

### 3. Spendable Balance (Runway)
$$\text{RemainingSpendable} = \text{StartingBudget} + \text{TotalIncome} - \text{TotalSpent} - \text{ProtectedSavings}$$

### 4. Upcoming Obligations
$$\text{UpcomingCommitments} = \sum_{c \in \text{Commitments}, c.\text{isActive} = \text{true} \land c.\text{dueDay} \ge d} c.\text{amountPaise}$$
$$\text{UpcomingEssentialCommitments} = \sum_{c \in \text{Commitments}, c.\text{isActive} = \text{true} \land c.\text{isEssential} = \text{true} \land c.\text{dueDay} \ge d} c.\text{amountPaise}$$

### 5. Safe Daily Spending Allowance
$$\text{SafeDailyAllowance} = \max\left(0, \left\lfloor \frac{\text{RemainingSpendable}}{d_{\text{remaining}}} \right\rfloor\right)$$

### 6. Projected Month-End Forecast
$$\text{ProjectedMonthEndBalance} = \text{RemainingSpendable} - \text{UpcomingCommitments}$$

### 7. Essential Commitment Coverage & Shortfall
$$\text{CanCoverEssentials} = \text{RemainingSpendable} \ge \text{UpcomingEssentialCommitments}$$
$$\text{EssentialShortfall} = \begin{cases} 
0 & \text{if } \text{CanCoverEssentials} \\
\text{UpcomingEssentialCommitments} - \text{RemainingSpendable} & \text{otherwise}
\end{cases}$$

### 8. Financial Health Score (0 - 100)
Calculated deterministically using four weighted pillars:
- **Runway Solvency** (Projected balance ratio)
- **Essential Obligation Coverage**
- **Daily Burn Rate Discipline**
- **Savings Buffer Health**

Clamped between $5$ and $100$.

### 9. Risk Classification
- **Critical**: $\text{ProjectedMonthEndBalance} < 0$ OR $\text{CanCoverEssentials} = \text{false}$.
- **High**: $\text{SafeDailyAllowance} < \text{₹}150/\text{day}$ OR $\text{RemainingSpendable} < \text{₹}1,000$.
- **Moderate**: $\text{ProjectedMonthEndBalance} < \text{₹}1,000$ OR $\text{DiscretionarySpent} > \text{EssentialSpent}$.
- **Low**: Healthy runway, commitments fully covered, daily allowance sustainable.

---

## 4. "What-If" Decision Simulation Rules
- Simulations take a clone of current baseline ledger data.
- Never mutate active transactions, goals, or commitments during preview.
- Present side-by-side delta metrics:
  - Spendable Runway $\Delta$
  - Safe Daily Allowance $\Delta$
  - Month-End Projected Balance $\Delta$
  - Financial Health Score $\Delta$
- User can explicitly discard or "Apply to Real Ledger".
