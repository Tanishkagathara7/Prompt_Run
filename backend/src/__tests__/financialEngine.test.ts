import test from 'node:test';
import assert from 'node:assert/strict';

// Core financial mathematical functions matching financial-rules.md
export const INITIAL_BUDGET_PAISE = 1000000; // ₹10,000 in integer paise

export function parseINRToPaise(val: number | string): number {
  const num = typeof val === 'string' ? parseFloat(val.replace(/,/g, '')) : val;
  if (isNaN(num)) return 0;
  return Math.round(num * 100);
}

export function formatINR(paise: number): string {
  const rupees = paise / 100;
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: paise % 100 === 0 ? 0 : 2,
  }).format(rupees);
}

export interface FinancialMetricInput {
  startingBudgetPaise?: number;
  currentDay: number; // 1 to 30
  transactions: Array<{
    amountPaise: number;
    type: 'income' | 'expense';
    isEssential: boolean;
  }>;
  commitments: Array<{
    amountPaise: number;
    dueDay: number;
    isEssential: boolean;
    isActive: boolean;
  }>;
  savingsGoals: Array<{
    currentAmountPaise: number;
    isLocked: boolean;
  }>;
}

export function calculateRunwayMetrics(input: FinancialMetricInput) {
  const startingBudget = input.startingBudgetPaise ?? INITIAL_BUDGET_PAISE;
  const currentDay = Math.min(30, Math.max(1, input.currentDay));
  const daysRemaining = Math.max(1, 30 - currentDay + 1);

  let totalIncome = 0;
  let totalSpent = 0;
  let essentialSpent = 0;
  let discretionarySpent = 0;

  for (const t of input.transactions) {
    if (t.type === 'income') {
      totalIncome += t.amountPaise;
    } else {
      totalSpent += t.amountPaise;
      if (t.isEssential) {
        essentialSpent += t.amountPaise;
      } else {
        discretionarySpent += t.amountPaise;
      }
    }
  }

  let protectedSavings = 0;
  for (const g of input.savingsGoals) {
    if (g.isLocked) {
      protectedSavings += Math.max(0, g.currentAmountPaise);
    }
  }

  const remainingSpendable = startingBudget + totalIncome - totalSpent - protectedSavings;
  const safeDailyAllowance = Math.max(0, Math.floor(remainingSpendable / daysRemaining));

  let upcomingCommitments = 0;
  let upcomingEssentialCommitments = 0;
  for (const c of input.commitments) {
    if (c.isActive && c.dueDay >= currentDay) {
      upcomingCommitments += c.amountPaise;
      if (c.isEssential) {
        upcomingEssentialCommitments += c.amountPaise;
      }
    }
  }

  const projectedMonthEndBalance = remainingSpendable - upcomingCommitments;
  const canCoverEssentials = remainingSpendable >= upcomingEssentialCommitments;
  const essentialShortfall = canCoverEssentials ? 0 : upcomingEssentialCommitments - remainingSpendable;

  let riskLevel: 'low' | 'moderate' | 'high' | 'critical' = 'low';
  if (projectedMonthEndBalance < 0 || !canCoverEssentials) {
    riskLevel = 'critical';
  } else if (safeDailyAllowance < 15000 || remainingSpendable < 100000) {
    riskLevel = 'high';
  } else if (projectedMonthEndBalance < 100000 || discretionarySpent > essentialSpent) {
    riskLevel = 'moderate';
  }

  return {
    startingBudget,
    remainingSpendable,
    safeDailyAllowance,
    daysRemaining,
    upcomingCommitments,
    upcomingEssentialCommitments,
    projectedMonthEndBalance,
    canCoverEssentials,
    essentialShortfall,
    riskLevel,
  };
}

// SUITE TESTS
test('Financial Engine: Day 1 Initial ₹10,000 Budget Calculations', () => {
  const result = calculateRunwayMetrics({
    currentDay: 1,
    transactions: [],
    commitments: [],
    savingsGoals: [],
  });

  assert.equal(result.startingBudget, 1000000);
  assert.equal(result.remainingSpendable, 1000000);
  assert.equal(result.daysRemaining, 30);
  assert.equal(result.safeDailyAllowance, Math.floor(1000000 / 30));
  assert.equal(result.riskLevel, 'low');
});

test('Financial Engine: Essential vs Discretionary Ledger Deduction', () => {
  const result = calculateRunwayMetrics({
    currentDay: 10,
    transactions: [
      { amountPaise: 350000, type: 'expense', isEssential: true },
      { amountPaise: 120000, type: 'expense', isEssential: true },
      { amountPaise: 50000, type: 'expense', isEssential: false },
    ],
    commitments: [
      { amountPaise: 100000, dueDay: 20, isEssential: true, isActive: true },
    ],
    savingsGoals: [
      { currentAmountPaise: 100000, isLocked: true },
    ],
  });

  // 1,000,000 - 350,000 - 120,000 - 50,000 - 100,000 = 380,000 paise (₹3,800)
  assert.equal(result.remainingSpendable, 380000);
  assert.equal(result.daysRemaining, 21); // 30 - 10 + 1
  assert.equal(result.safeDailyAllowance, Math.floor(380000 / 21));
  assert.equal(result.projectedMonthEndBalance, 280000); // 380,000 - 100,000
  assert.equal(result.canCoverEssentials, true);
});

test('Financial Engine: Critical Risk Detection when Commitments Exceed Runway', () => {
  const result = calculateRunwayMetrics({
    currentDay: 20,
    transactions: [
      { amountPaise: 900000, type: 'expense', isEssential: true },
    ],
    commitments: [
      { amountPaise: 200000, dueDay: 25, isEssential: true, isActive: true }, // ₹2,000 due, only ₹1,000 left
    ],
    savingsGoals: [],
  });

  assert.equal(result.remainingSpendable, 100000);
  assert.equal(result.canCoverEssentials, false);
  assert.equal(result.essentialShortfall, 100000);
  assert.equal(result.riskLevel, 'critical');
});

test('Financial Engine: Paise Currency Formatting and Parsing', () => {
  assert.equal(parseINRToPaise(100), 10000);
  assert.equal(parseINRToPaise('3,500.50'), 350050);
  assert.equal(formatINR(1000000), '₹10,000');
  assert.equal(formatINR(350050), '₹3,500.50');
});
