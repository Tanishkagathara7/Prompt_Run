import {
  calculateFinancialMetrics,
  simulateDecisionScenario,
  formatINR,
  parseINRToPaise,
  FinancialTransaction,
  RecurringCommitment,
  SavingsGoal,
  FinancialScenario,
  INITIAL_BUDGET_PAISE,
} from './financialEngine';
import assert from 'node:assert/strict';

console.log('🧪 Starting Financial Engine Verification Tests...\n');

// TEST 1: Initial starting budget (₹10,000, 30 days) with 0 transactions
const initial = calculateFinancialMetrics({
  currentDay: 1,
  transactions: [],
  commitments: [],
  savingsGoals: [],
});

assert.equal(initial.startingBudgetPaise, 1000000, 'Starting budget must be 1,000,000 paise (₹10,000)');
assert.equal(initial.remainingSpendablePaise, 1000000, 'Remaining spendable must be ₹10,000 with 0 expenses');
assert.equal(initial.daysRemaining, 30, 'Days remaining on Day 1 must be 30');
assert.equal(initial.safeDailyAllowancePaise, Math.floor(1000000 / 30), 'Safe daily allowance must be ₹333 (33333 paise)');
assert.equal(formatINR(initial.remainingSpendablePaise), '₹10,000', 'Formatted currency must be ₹10,000');
console.log('✅ Test 1 Passed: Initial ₹10,000 budget & day 1 calculations verified.');

// TEST 2: Add essential vs discretionary transactions on Day 10
const testTransactions: FinancialTransaction[] = [
  {
    id: 'tx-1',
    title: 'Room Rent Shared Share',
    amountPaise: 350000, // ₹3,500
    type: 'expense',
    category: 'essential_rent_bills',
    isEssential: true,
    date: '2026-10-02',
  },
  {
    id: 'tx-2',
    title: 'Groceries (Rice, Dal, Eggs)',
    amountPaise: 120000, // ₹1,200
    type: 'expense',
    category: 'staple_groceries',
    isEssential: true,
    date: '2026-10-05',
  },
  {
    id: 'tx-3',
    title: 'Cafe Hangout',
    amountPaise: 45000, // ₹450
    type: 'expense',
    category: 'discretionary_dining',
    isEssential: false,
    date: '2026-10-08',
  },
];

const testCommitments: RecurringCommitment[] = [
  {
    id: 'comm-1',
    name: 'Broadband Internet',
    amountPaise: 70000, // ₹700
    dueDay: 18,
    frequency: 'monthly',
    isEssential: true,
    category: 'essential_rent_bills',
    isActive: true,
  },
  {
    id: 'comm-2',
    name: 'Music Stream Subscription',
    amountPaise: 11900, // ₹119
    dueDay: 22,
    frequency: 'monthly',
    isEssential: false,
    category: 'entertainment_shopping',
    isActive: true,
  },
];

const testGoals: SavingsGoal[] = [
  {
    id: 'goal-1',
    name: 'Emergency Fund',
    targetAmountPaise: 200000, // ₹2,000
    currentAmountPaise: 100000, // ₹1,000 locked
    deadlineDay: 30,
  },
];

const midMonth = calculateFinancialMetrics({
  currentDay: 10,
  transactions: testTransactions,
  commitments: testCommitments,
  savingsGoals: testGoals,
});

// Total spent: 3500 + 1200 + 450 = ₹5,150 (515000 paise)
assert.equal(midMonth.totalSpentPaise, 515000, 'Total spent must be ₹5,150');
assert.equal(midMonth.essentialSpentPaise, 470000, 'Essential spent must be ₹4,700');
assert.equal(midMonth.discretionarySpentPaise, 45000, 'Discretionary spent must be ₹450');
assert.equal(midMonth.protectedSavingsPaise, 100000, 'Protected savings must be ₹1,000');

// Remaining spendable: 10000 - 5150 - 1000 = ₹3,850 (385000 paise)
assert.equal(midMonth.remainingSpendablePaise, 385000, 'Remaining spendable must be ₹3,850');

// Days remaining: 30 - 10 + 1 = 21 days
assert.equal(midMonth.daysRemaining, 21, 'Days remaining must be 21');
assert.equal(midMonth.safeDailyAllowancePaise, Math.floor(385000 / 21), 'Daily allowance must be ₹183');

// Upcoming commitments: 700 + 119 = ₹819
assert.equal(midMonth.upcomingCommitmentsPaise, 81900, 'Upcoming commitments must be ₹819');

// Projected month-end balance: 3850 - 819 = ₹3,031
assert.equal(midMonth.projectedMonthEndBalancePaise, 303100, 'Projected month end balance must be ₹3,031');
assert.equal(midMonth.canCoverEssentialCommitments, true, 'Must be able to cover upcoming essential commitments');
console.log('✅ Test 2 Passed: Mid-month ledger, savings locking, and commitment deductions verified.');

// TEST 3: Decision Simulator - Simulate an unexpected emergency bill of ₹2,500
const emergencyScenario: FinancialScenario = {
  id: 'scen-emerg-1',
  label: 'Unexpected Dental Visit',
  description: 'Urgent clinic consultation and medicine',
  type: 'unexpected_emergency',
  amountPaise: 250000, // ₹2,500
  isEssential: true,
};

const simResult = simulateDecisionScenario({
  scenario: emergencyScenario,
  baseTransactions: testTransactions,
  baseCommitments: testCommitments,
  baseSavingsGoals: testGoals,
  currentDay: 10,
});

assert.equal(simResult.deltas.remainingBalanceDeltaPaise, -250000, 'Delta must exactly equal -₹2,500');
assert.equal(simResult.simulatedMetrics.remainingSpendablePaise, 385000 - 250000, 'Simulated balance must be ₹1,350');
assert.equal(simResult.simulatedMetrics.safeDailyAllowancePaise, Math.floor(135000 / 21), 'Simulated daily allowance must drop to ₹64/day');
assert.ok(simResult.simulatedMetrics.financialHealthScore < midMonth.financialHealthScore, 'Health score must decrease after emergency');
console.log('✅ Test 3 Passed: "What If?" decision simulation correctly calculates deltas without mutating base data.');

// TEST 4: Parsing and formatting edge cases
assert.equal(parseINRToPaise('₹10,000'), 1000000);
assert.equal(parseINRToPaise('250.50'), 25050);
assert.equal(formatINR(-50000), '-₹500');
console.log('✅ Test 4 Passed: Parsing and formatting helpers are precision-safe.');

// TEST 5: Transaction Editing and Deletion exact reversal
// Original midMonth had testTransactions with total spent 515000 paise
// If we edit tx-3 (Cafe Hangout, ₹450) to ₹600 (60000 paise):
const updatedTransactions = testTransactions.map((t) =>
  t.id === 'tx-3' ? { ...t, amountPaise: 60000 } : t
);
const afterEdit = calculateFinancialMetrics({
  currentDay: 10,
  transactions: updatedTransactions,
  commitments: testCommitments,
  savingsGoals: testGoals,
});
// 515000 - 45000 + 60000 = 530000
assert.equal(afterEdit.totalSpentPaise, 530000, 'Total spent after edit must be ₹5,300');
assert.equal(afterEdit.remainingSpendablePaise, 370000, 'Remaining spendable must be ₹3,700');

// If we delete tx-3 entirely:
const afterDelete = calculateFinancialMetrics({
  currentDay: 10,
  transactions: testTransactions.filter((t) => t.id !== 'tx-3'),
  commitments: testCommitments,
  savingsGoals: testGoals,
});
// 515000 - 45000 = 470000
assert.equal(afterDelete.totalSpentPaise, 470000, 'Total spent after delete must be ₹4,700');
assert.equal(afterDelete.remainingSpendablePaise, 430000, 'Remaining spendable must be ₹4,300');
console.log('✅ Test 5 Passed: Transaction editing and deletion reversal verified.');

// TEST 6: Savings Goal Deposit & Emergency Withdrawal
// Increasing goal-1 from ₹1,000 to ₹1,500 locks extra ₹500
const goalsWithDeposit: SavingsGoal[] = testGoals.map((g) =>
  g.id === 'goal-1' ? { ...g, currentAmountPaise: 150000 } : g
);
const afterDeposit = calculateFinancialMetrics({
  currentDay: 10,
  transactions: testTransactions,
  commitments: testCommitments,
  savingsGoals: goalsWithDeposit,
});
assert.equal(afterDeposit.protectedSavingsPaise, 150000, 'Protected savings must be ₹1,500');
assert.equal(afterDeposit.remainingSpendablePaise, 335000, 'Remaining spendable drops by ₹500 to ₹3,350');

// Unlocking ₹500 restores remaining spendable
const goalsWithWithdraw: SavingsGoal[] = goalsWithDeposit.map((g) =>
  g.id === 'goal-1' ? { ...g, currentAmountPaise: 100000 } : g
);
const afterWithdraw = calculateFinancialMetrics({
  currentDay: 10,
  transactions: testTransactions,
  commitments: testCommitments,
  savingsGoals: goalsWithWithdraw,
});
assert.equal(afterWithdraw.protectedSavingsPaise, 100000, 'Protected savings restored to ₹1,000');
assert.equal(afterWithdraw.remainingSpendablePaise, 385000, 'Remaining spendable restored to ₹3,850');
console.log('✅ Test 6 Passed: Savings deposit locking and emergency withdrawal restoration verified.');

// TEST 7: Deficit, Shortfall and Boundary Handling
const deficitTransactions: FinancialTransaction[] = [
  {
    id: 'tx-heavy',
    title: 'Major Emergency',
    amountPaise: 1200000, // ₹12,000 (exceeds ₹10,000 budget)
    type: 'expense',
    category: 'unexpected_emergency',
    isEssential: true,
    date: '2026-10-15',
  },
];
const deficitMetrics = calculateFinancialMetrics({
  currentDay: 15,
  transactions: deficitTransactions,
  commitments: testCommitments,
  savingsGoals: [],
});
assert.ok(deficitMetrics.remainingSpendablePaise < 0, 'Spendable runway must be negative (-₹2,000)');
assert.equal(deficitMetrics.safeDailyAllowancePaise, 0, 'Safe daily allowance cannot be negative');
assert.equal(deficitMetrics.riskLevel, 'critical', 'Risk level must be critical during deficit');
assert.equal(deficitMetrics.canCoverEssentialCommitments, false, 'Must flag essential commitment inability');
assert.ok(deficitMetrics.essentialShortfallPaise > 0, 'Essential shortfall must be calculated');
console.log('✅ Test 7 Passed: Deficit handling, shortfall detection, and non-negative allowance verified.\n');

console.log('🎉 All Core Financial Engine Rules Tested and Verified Successfully!');
