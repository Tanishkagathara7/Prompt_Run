/**
 * Precision Financial Engine for "Broke But Functional — Survive the Month"
 * 
 * Rules:
 * - Starting budget: ₹10,000 (1,000,000 paise).
 * - Timeline: 30 days total.
 * - Integer arithmetic in paise (1 INR = 100 paise) prevents IEEE 754 floating point drift.
 * - Clean separation of actual ledger vs simulated decision scenarios.
 */

export type TransactionType = 'income' | 'expense';
export type ExpenseCategory =
  | 'essential_rent_bills'
  | 'staple_groceries'
  | 'transit_commute'
  | 'medical_health'
  | 'discretionary_dining'
  | 'entertainment_shopping'
  | 'unexpected_emergency';

export type CommitmentFrequency = 'monthly' | 'weekly' | 'daily';

export interface FinancialTransaction {
  id: string;
  title: string;
  amountPaise: number; // Positive integer in paise
  type: TransactionType;
  category: ExpenseCategory;
  isEssential: boolean;
  date: string; // YYYY-MM-DD or ISO string
  notes?: string;
  isSimulated?: boolean;
}

export interface SavingsGoal {
  id: string;
  name: string;
  targetAmountPaise: number;
  currentAmountPaise: number;
  deadlineDay: number; // 1 to 30
  category?: string;
}

export interface RecurringCommitment {
  id: string;
  name: string;
  amountPaise: number;
  dueDay: number; // 1 to 30
  frequency: CommitmentFrequency;
  isEssential: boolean;
  category: ExpenseCategory;
  isActive: boolean;
}

export interface FinancialScenario {
  id: string;
  label: string;
  description: string;
  type: 'one_off_expense' | 'unexpected_emergency' | 'additional_income' | 'new_subscription' | 'savings_deposit' | 'category_cut';
  amountPaise: number;
  category?: ExpenseCategory;
  isEssential?: boolean;
  recurringDueDay?: number;
}

export type RiskLevel = 'low' | 'moderate' | 'high' | 'critical';

export interface FinancialMetrics {
  startingBudgetPaise: number;
  totalIncomePaise: number;
  totalSpentPaise: number;
  essentialSpentPaise: number;
  discretionarySpentPaise: number;
  
  // Balance available to spend (excludes locked savings)
  remainingSpendablePaise: number;
  
  // Total money in protected savings
  protectedSavingsPaise: number;
  
  // Future commitments still to be paid this month
  upcomingCommitmentsPaise: number;
  
  currentDay: number; // e.g. Day 12
  totalDays: number; // 30
  daysRemaining: number; // 30 - currentDay + 1
  
  // Daily safe allowance: remainingSpendable / daysRemaining
  safeDailyAllowancePaise: number;
  
  // Month-end forecast balance
  projectedMonthEndBalancePaise: number;
  
  // Will essential obligations remain covered?
  canCoverEssentialCommitments: boolean;
  essentialShortfallPaise: number;
  
  // Financial Health Score: 0 to 100
  financialHealthScore: number;
  healthStatusText: string;
  riskLevel: RiskLevel;
  riskExplanation: string;
  
  // Key Insights
  actionableInsights: {
    id: string;
    type: 'positive' | 'warning' | 'critical' | 'suggestion';
    title: string;
    message: string;
    impactPaise?: number;
  }[];
}

export interface SimulationResult {
  scenario: FinancialScenario;
  originalMetrics: FinancialMetrics;
  simulatedMetrics: FinancialMetrics;
  deltas: {
    remainingBalanceDeltaPaise: number;
    dailyAllowanceDeltaPaise: number;
    projectedEndBalanceDeltaPaise: number;
    healthScoreDelta: number;
    riskChanged: boolean;
  };
  tradeoffAnalysis: string;
  recommendation: 'favorable' | 'manageable' | 'hazardous' | 'catastrophic';
}

export const INITIAL_BUDGET_PAISE = 1000000; // ₹10,000.00
export const TOTAL_SIMULATION_DAYS = 30;

/**
 * Currency Formatting: Indian Rupee standard format
 */
export function formatINR(amountPaise: number, includeDecimals = false): string {
  const isNegative = amountPaise < 0;
  const absPaise = Math.abs(amountPaise);
  const rupees = Math.floor(absPaise / 100);
  const paise = absPaise % 100;
  
  const formattedRupees = new Intl.NumberFormat('en-IN').format(rupees);
  
  const formatted = includeDecimals && paise > 0
    ? `₹${formattedRupees}.${paise.toString().padStart(2, '0')}`
    : `₹${formattedRupees}`;
    
  return isNegative ? `-${formatted}` : formatted;
}

export function parseINRToPaise(rupeesInput: string | number): number {
  if (typeof rupeesInput === 'number') {
    return Math.round(rupeesInput * 100);
  }
  const clean = rupeesInput.replace(/[^0-9.-]+/g, '');
  const parsed = parseFloat(clean);
  if (isNaN(parsed)) return 0;
  return Math.round(parsed * 100);
}

/**
 * Core Deterministic Calculation Engine
 */
export function calculateFinancialMetrics(params: {
  startingBudgetPaise?: number;
  currentDay: number;
  transactions: FinancialTransaction[];
  commitments: RecurringCommitment[];
  savingsGoals: SavingsGoal[];
}): FinancialMetrics {
  const startingBudgetPaise = params.startingBudgetPaise ?? INITIAL_BUDGET_PAISE;
  const currentDay = Math.min(Math.max(1, params.currentDay), TOTAL_SIMULATION_DAYS);
  const daysRemaining = Math.max(1, TOTAL_SIMULATION_DAYS - currentDay + 1);

  let totalIncomePaise = 0;
  let totalSpentPaise = 0;
  let essentialSpentPaise = 0;
  let discretionarySpentPaise = 0;

  for (const t of params.transactions) {
    if (t.type === 'income') {
      totalIncomePaise += t.amountPaise;
    } else {
      totalSpentPaise += t.amountPaise;
      if (t.isEssential) {
        essentialSpentPaise += t.amountPaise;
      } else {
        discretionarySpentPaise += t.amountPaise;
      }
    }
  }

  // Calculate locked protected savings
  const protectedSavingsPaise = params.savingsGoals.reduce(
    (sum, g) => sum + Math.max(0, g.currentAmountPaise),
    0
  );

  // Compute spendable balance: Starting + Income - Total Spent - Locked Savings
  const remainingSpendablePaise = startingBudgetPaise + totalIncomePaise - totalSpentPaise - protectedSavingsPaise;

  // Upcoming commitments still due from currentDay onward
  let upcomingCommitmentsPaise = 0;
  let upcomingEssentialCommitmentsPaise = 0;

  for (const c of params.commitments) {
    if (c.isActive && c.dueDay >= currentDay) {
      upcomingCommitmentsPaise += c.amountPaise;
      if (c.isEssential) {
        upcomingEssentialCommitmentsPaise += c.amountPaise;
      }
    }
  }

  // Safe daily allowance considering remaining spendable balance
  const safeDailyAllowancePaise = Math.max(0, Math.floor(remainingSpendablePaise / daysRemaining));

  // Projected Month-End balance (spendable minus future commitments)
  const projectedMonthEndBalancePaise = remainingSpendablePaise - upcomingCommitmentsPaise;

  // Can essential commitments be met?
  const canCoverEssentialCommitments = remainingSpendablePaise >= upcomingEssentialCommitmentsPaise;
  const essentialShortfallPaise = canCoverEssentialCommitments
    ? 0
    : upcomingEssentialCommitmentsPaise - remainingSpendablePaise;

  // Compute Financial Health Score (0 to 100)
  // Factors:
  // 1. Runway solvency (40% weight): Projected month-end balance ratio
  // 2. Essential obligations coverage (30% weight)
  // 3. Discretionary ratio discipline (15% weight)
  // 4. Savings progress (15% weight)
  let healthScore = 50;

  // Factor 1: Solvency
  if (projectedMonthEndBalancePaise >= 250000) {
    healthScore += 25; // Good surplus (>₹2,500)
  } else if (projectedMonthEndBalancePaise >= 100000) {
    healthScore += 15; // Moderate surplus (>₹1,000)
  } else if (projectedMonthEndBalancePaise >= 0) {
    healthScore += 5; // Breaking even
  } else if (projectedMonthEndBalancePaise >= -150000) {
    healthScore -= 20; // Mild deficit
  } else {
    healthScore -= 35; // Severe deficit
  }

  // Factor 2: Essential Coverage
  if (canCoverEssentialCommitments) {
    healthScore += 15;
  } else {
    healthScore -= 25;
  }

  // Factor 3: Daily burn rate safety
  const benchmarkDailySpend = Math.floor(startingBudgetPaise / TOTAL_SIMULATION_DAYS); // ~₹333/day
  if (safeDailyAllowancePaise >= benchmarkDailySpend) {
    healthScore += 10;
  } else if (safeDailyAllowancePaise < benchmarkDailySpend * 0.5) {
    healthScore -= 10;
  }

  // Factor 4: Savings goal presence
  if (protectedSavingsPaise >= 100000) {
    healthScore += 10;
  } else if (protectedSavingsPaise > 0) {
    healthScore += 5;
  }

  // Clamp health score between 5 and 100
  const financialHealthScore = Math.min(100, Math.max(5, Math.round(healthScore)));

  // Risk Level determination
  let riskLevel: RiskLevel = 'low';
  let healthStatusText = 'Solid Financial Trajectory';
  let riskExplanation = 'Spending is sustainable and upcoming commitments are covered.';

  if (projectedMonthEndBalancePaise < 0 || !canCoverEssentialCommitments) {
    riskLevel = 'critical';
    healthStatusText = 'High Deficit Risk';
    riskExplanation = `Projected deficit of ${formatINR(Math.abs(projectedMonthEndBalancePaise))} before Day 30. Essential commitments are at risk.`;
  } else if (safeDailyAllowancePaise < 15000 || remainingSpendablePaise < 100000) {
    riskLevel = 'high';
    healthStatusText = 'Tight Runway Alert';
    riskExplanation = `Safe spending is under ${formatINR(15000)}/day. Unplanned expenses will trigger a budget breach.`;
  } else if (projectedMonthEndBalancePaise < 100000 || discretionarySpentPaise > essentialSpentPaise) {
    riskLevel = 'moderate';
    healthStatusText = 'Cautious Balance';
    riskExplanation = 'Discretionary spending is high relative to remaining days. Limit non-essential buys.';
  }

  // Actionable Insights Generation
  const actionableInsights: FinancialMetrics['actionableInsights'] = [];

  if (!canCoverEssentialCommitments) {
    actionableInsights.push({
      id: 'ins-essential-risk',
      type: 'critical',
      title: 'Essential Shortfall Warning',
      message: `You are short by ${formatINR(essentialShortfallPaise)} to cover non-negotiable rent and utility commitments.`,
      impactPaise: essentialShortfallPaise,
    });
  }

  if (safeDailyAllowancePaise < 20000 && daysRemaining > 5) {
    actionableInsights.push({
      id: 'ins-burn-rate',
      type: 'warning',
      title: 'Cap Daily Discretionary Spend',
      message: `Stick to ${formatINR(safeDailyAllowancePaise)}/day for the next ${daysRemaining} days to finish the month cash-positive.`,
      impactPaise: safeDailyAllowancePaise,
    });
  }

  if (upcomingCommitmentsPaise > 0) {
    actionableInsights.push({
      id: 'ins-commitments',
      type: 'suggestion',
      title: 'Scheduled Commitments Ahead',
      message: `${formatINR(upcomingCommitmentsPaise)} is reserved for upcoming bills and active subscriptions.`,
      impactPaise: upcomingCommitmentsPaise,
    });
  }

  if (protectedSavingsPaise > 0) {
    actionableInsights.push({
      id: 'ins-savings-healthy',
      type: 'positive',
      title: 'Protected Savings Buffer',
      message: `${formatINR(protectedSavingsPaise)} is securely parked in your savings goals and shielded from daily spending.`,
      impactPaise: protectedSavingsPaise,
    });
  }

  return {
    startingBudgetPaise,
    totalIncomePaise,
    totalSpentPaise,
    essentialSpentPaise,
    discretionarySpentPaise,
    remainingSpendablePaise,
    protectedSavingsPaise,
    upcomingCommitmentsPaise,
    currentDay,
    totalDays: TOTAL_SIMULATION_DAYS,
    daysRemaining,
    safeDailyAllowancePaise,
    projectedMonthEndBalancePaise,
    canCoverEssentialCommitments,
    essentialShortfallPaise,
    financialHealthScore,
    healthStatusText,
    riskLevel,
    riskExplanation,
    actionableInsights,
  };
}

/**
 * Scenario Simulator Engine
 * Tests "What If?" decisions without mutating the actual ledger.
 */
export function simulateDecisionScenario(params: {
  scenario: FinancialScenario;
  baseTransactions: FinancialTransaction[];
  baseCommitments: RecurringCommitment[];
  baseSavingsGoals: SavingsGoal[];
  currentDay: number;
  startingBudgetPaise?: number;
}): SimulationResult {
  const originalMetrics = calculateFinancialMetrics({
    startingBudgetPaise: params.startingBudgetPaise,
    currentDay: params.currentDay,
    transactions: params.baseTransactions,
    commitments: params.baseCommitments,
    savingsGoals: params.baseSavingsGoals,
  });

  // Clone structures for simulation
  const simulatedTransactions = [...params.baseTransactions];
  const simulatedCommitments = [...params.baseCommitments];
  const simulatedSavingsGoals = params.baseSavingsGoals.map((g) => ({ ...g }));

  const { scenario } = params;

  if (scenario.type === 'one_off_expense' || scenario.type === 'unexpected_emergency') {
    simulatedTransactions.push({
      id: `sim-${scenario.id}`,
      title: scenario.label,
      amountPaise: scenario.amountPaise,
      type: 'expense',
      category: scenario.category || (scenario.type === 'unexpected_emergency' ? 'unexpected_emergency' : 'discretionary_dining'),
      isEssential: scenario.isEssential ?? false,
      date: new Date().toISOString(),
      isSimulated: true,
    });
  } else if (scenario.type === 'additional_income') {
    simulatedTransactions.push({
      id: `sim-${scenario.id}`,
      title: scenario.label,
      amountPaise: scenario.amountPaise,
      type: 'income',
      category: 'essential_rent_bills',
      isEssential: false,
      date: new Date().toISOString(),
      isSimulated: true,
    });
  } else if (scenario.type === 'new_subscription') {
    simulatedCommitments.push({
      id: `sim-sub-${scenario.id}`,
      name: scenario.label,
      amountPaise: scenario.amountPaise,
      dueDay: scenario.recurringDueDay || params.currentDay + 2,
      frequency: 'monthly',
      isEssential: false,
      category: 'entertainment_shopping',
      isActive: true,
    });
  } else if (scenario.type === 'savings_deposit') {
    if (simulatedSavingsGoals.length > 0) {
      simulatedSavingsGoals[0].currentAmountPaise += scenario.amountPaise;
    } else {
      simulatedSavingsGoals.push({
        id: 'sim-goal-1',
        name: 'Emergency Buffer',
        targetAmountPaise: scenario.amountPaise * 2,
        currentAmountPaise: scenario.amountPaise,
        deadlineDay: 30,
      });
    }
  }

  const simulatedMetrics = calculateFinancialMetrics({
    startingBudgetPaise: params.startingBudgetPaise,
    currentDay: params.currentDay,
    transactions: simulatedTransactions,
    commitments: simulatedCommitments,
    savingsGoals: simulatedSavingsGoals,
  });

  const remainingBalanceDeltaPaise = simulatedMetrics.remainingSpendablePaise - originalMetrics.remainingSpendablePaise;
  const dailyAllowanceDeltaPaise = simulatedMetrics.safeDailyAllowancePaise - originalMetrics.safeDailyAllowancePaise;
  const projectedEndBalanceDeltaPaise = simulatedMetrics.projectedMonthEndBalancePaise - originalMetrics.projectedMonthEndBalancePaise;
  const healthScoreDelta = simulatedMetrics.financialHealthScore - originalMetrics.financialHealthScore;
  const riskChanged = simulatedMetrics.riskLevel !== originalMetrics.riskLevel;

  let recommendation: SimulationResult['recommendation'] = 'manageable';
  let tradeoffAnalysis = '';

  if (simulatedMetrics.projectedMonthEndBalancePaise < 0) {
    recommendation = simulatedMetrics.canCoverEssentialCommitments ? 'hazardous' : 'catastrophic';
    tradeoffAnalysis = `This decision pushes your month-end projection into a deficit of ${formatINR(Math.abs(simulatedMetrics.projectedMonthEndBalancePaise))}. It reduces your daily budget by ${formatINR(Math.abs(dailyAllowanceDeltaPaise))}/day.`;
  } else if (remainingBalanceDeltaPaise > 0) {
    recommendation = 'favorable';
    tradeoffAnalysis = `This increases your spendable runway by ${formatINR(remainingBalanceDeltaPaise)} and raises your safe daily allowance by ${formatINR(dailyAllowanceDeltaPaise)}/day.`;
  } else if (Math.abs(dailyAllowanceDeltaPaise) < 2500) {
    recommendation = 'favorable';
    tradeoffAnalysis = `Minor impact: your daily allowance changes by ${formatINR(dailyAllowanceDeltaPaise)}/day. Runway remains healthy.`;
  } else {
    recommendation = 'manageable';
    tradeoffAnalysis = `Your daily safe spend drops from ${formatINR(originalMetrics.safeDailyAllowancePaise)} to ${formatINR(simulatedMetrics.safeDailyAllowancePaise)}/day. Safe, but requires discipline.`;
  }

  return {
    scenario,
    originalMetrics,
    simulatedMetrics,
    deltas: {
      remainingBalanceDeltaPaise,
      dailyAllowanceDeltaPaise,
      projectedEndBalanceDeltaPaise,
      healthScoreDelta,
      riskChanged,
    },
    tradeoffAnalysis,
    recommendation,
  };
}
