import { calculateFinancialMetrics, parseINRToPaise, formatINR } from '../web/lib/financialEngine';

// Case 1: Zero balances & Day 30 boundaries
const zeroResult = calculateFinancialMetrics({
  startingBudgetPaise: 0,
  currentDay: 30,
  transactions: [],
  commitments: [],
  savingsGoals: [],
});
console.log('Zero balance allowance:', zeroResult.safeDailyAllowancePaise, 'daysRemaining:', zeroResult.daysRemaining);

// Case 2: Negative / Deficit spendable
const deficitResult = calculateFinancialMetrics({
  startingBudgetPaise: 1000000,
  currentDay: 15,
  transactions: [{ id: '1', title: 'Overspend', amountPaise: 1500000, type: 'expense', category: 'unexpected_emergency', isEssential: true, date: '2026-10-15' }],
  commitments: [],
  savingsGoals: [],
});
console.log('Deficit allowance (clamped to 0):', deficitResult.safeDailyAllowancePaise, 'spendable:', deficitResult.remainingSpendablePaise, 'risk:', deficitResult.riskLevel);

// Case 3: Decimal INR amounts and paise conversion precision
const decimalTest = parseINRToPaise('₹10,500.75');
console.log('Parsed ₹10,500.75 to paise:', decimalTest, 'Matches 1050075:', decimalTest === 1050075);
console.log('Formatted back:', formatINR(decimalTest, true));

// Case 4: Day > 30 clamp
const dayClamp = calculateFinancialMetrics({ currentDay: 35, transactions: [], commitments: [], savingsGoals: [] });
console.log('Day 35 clamped to day:', dayClamp.currentDay, 'daysRemaining:', dayClamp.daysRemaining);

// Case 5: Large values safe from IEEE-754 overflow
const large = calculateFinancialMetrics({ startingBudgetPaise: 100000000000, currentDay: 1, transactions: [], commitments: [], savingsGoals: [] });
console.log('Large value allowance:', large.safeDailyAllowancePaise);
