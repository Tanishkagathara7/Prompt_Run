'use client';

import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  TrendingUp,
  AlertTriangle,
  RotateCcw,
  CheckCircle2,
  DollarSign,
  ShieldAlert,
  Percent,
  Sliders,
  HelpCircle,
  X,
} from 'lucide-react';
import { useFinancial } from '@/lib/context/FinancialContext';
import {
  FinancialScenario,
  formatINR,
  parseINRToPaise,
  ExpenseCategory,
} from '@/lib/financialEngine';

const PRESET_SCENARIOS: {
  label: string;
  scenario: FinancialScenario;
}[] = [
  {
    label: 'Weekend Cafe Hangout (-₹650)',
    scenario: {
      id: 'scen-preset-cafe',
      label: 'Weekend Cafe & Dining Out',
      description: 'Discretionary hangout with friends over food and coffee',
      type: 'one_off_expense',
      amountPaise: 65000,
      category: 'discretionary_dining',
      isEssential: false,
    },
  },
  {
    label: 'Emergency Mobile Screen Repair (-₹2,200)',
    scenario: {
      id: 'scen-preset-repair',
      label: 'Sudden Screen Crack Repair',
      description: 'Accidental phone drop requiring urgent display replacement',
      type: 'unexpected_emergency',
      amountPaise: 220000,
      category: 'unexpected_emergency',
      isEssential: true,
    },
  },
  {
    label: 'Freelance Design Gig (+₹2,500)',
    scenario: {
      id: 'scen-preset-income',
      label: 'Quick Freelance Graphic Gig',
      description: 'Client payment received for poster design',
      type: 'additional_income',
      amountPaise: 250000,
      isEssential: false,
    },
  },
  {
    label: 'Netflix HD Subscription (-₹199/mo)',
    scenario: {
      id: 'scen-preset-netflix',
      label: 'New Video Streaming Plan',
      description: 'Recurring monthly entertainment commitment',
      type: 'new_subscription',
      amountPaise: 19900,
      category: 'entertainment_shopping',
      isEssential: false,
    },
  },
  {
    label: 'Lock to Savings Cushion (-₹1,000)',
    scenario: {
      id: 'scen-preset-save',
      label: 'Lock Emergency Cushion',
      description: 'Transfer cash into protected savings goal',
      type: 'savings_deposit',
      amountPaise: 100000,
      isEssential: false,
    },
  },
];

export const FinancialDecisionSimulator: React.FC = () => {
  const {
    metrics,
    activeScenario,
    simulationResult,
    startSimulation,
    clearSimulation,
    applySimulation,
    addTransaction,
    addCommitment,
    contributeToGoal,
    addSavingsGoal,
    savingsGoals,
  } = useFinancial();

  const [customLabel, setCustomLabel] = useState('');
  const [customAmountRupees, setCustomAmountRupees] = useState('');
  const [customType, setCustomType] = useState<FinancialScenario['type']>('one_off_expense');
  const [isEssential, setIsEssential] = useState(false);
  const [customCategory, setCustomCategory] = useState<ExpenseCategory>('discretionary_dining');

  const handleApplyPreset = (preset: FinancialScenario) => {
    startSimulation(preset);
  };

  const handleCustomSimulate = (e: React.FormEvent) => {
    e.preventDefault();
    const amountPaise = parseINRToPaise(customAmountRupees);
    if (!customLabel.trim() || amountPaise <= 0) return;

    const customScenario: FinancialScenario = {
      id: `custom-${Date.now()}`,
      label: customLabel.trim(),
      description: `Custom simulation decision: ${customType.replace('_', ' ')}`,
      type: customType,
      amountPaise,
      category: customCategory,
      isEssential,
    };

    startSimulation(customScenario);
  };

  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl border border-[#E6E9F0] p-4 sm:p-6 lg:p-8 shadow-sm space-y-5 sm:space-y-6 relative overflow-hidden">
      {/* Decorative gradient glow when simulation is active */}
      {simulationResult && (
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-indigo-500/10 via-emerald-500/10 to-transparent blur-3xl pointer-events-none -z-0" />
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 border-b border-[#E6E9F0] pb-4 sm:pb-5 relative z-10">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 sm:px-3 py-1 rounded-full bg-[#EDE9FE] text-[#5B45F5] text-[11px] sm:text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>INTERACTIVE FINANCIAL LAB</span>
          </div>
          <h2 className="text-lg sm:text-2xl font-black text-[#101226] tracking-tight">
            &ldquo;What If?&rdquo; Decision Simulator
          </h2>
          <p className="text-xs sm:text-sm text-[#68728A] mt-1 leading-relaxed">
            Test any expense, emergency, subscription, or income before committing. Inspect interconnected impacts on runway, daily allowance, and month-end forecast.
          </p>
        </div>

        {activeScenario && (
          <button
            onClick={clearSimulation}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-zinc-200 text-xs font-semibold text-zinc-600 hover:bg-zinc-50 transition-colors self-start sm:self-auto cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Simulation</span>
          </button>
        )}
      </div>

      {/* Preset Quick Actions */}
      <div className="space-y-3 relative z-10">
        <div className="flex items-center justify-between">
          <div className="text-xs font-bold text-[#68728A] uppercase tracking-wider">
            Quick Preset Scenarios
          </div>
          <span className="text-[11px] text-[#68728A]">
            Click any scenario to preview its impact, or apply it to your ledger
          </span>
        </div>
        <div className="flex flex-wrap gap-2.5">
          {PRESET_SCENARIOS.map((item, idx) => {
            const isSelected = activeScenario?.id === item.scenario.id;
            return (
              <div
                key={idx}
                className={`inline-flex items-center rounded-xl border transition-all ${
                  isSelected
                    ? 'bg-[#101226] text-white border-[#101226] shadow-sm'
                    : 'bg-[#F8F9FC] text-[#101226] border-[#E6E9F0] hover:border-zinc-300'
                }`}
              >
                <button
                  type="button"
                  onClick={() => handleApplyPreset(item.scenario)}
                  className={`px-3 py-2 text-xs font-semibold cursor-pointer transition-colors ${
                    isSelected ? 'text-white' : 'hover:text-[#5B45F5]'
                  }`}
                  title="Preview impact in What-If simulator"
                >
                  {item.label}
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    startSimulation(item.scenario);
                    // Commit to real ledger
                    if (item.scenario.type === 'one_off_expense' || item.scenario.type === 'unexpected_emergency') {
                      addTransaction({
                        title: item.scenario.label,
                        amountPaise: item.scenario.amountPaise,
                        type: 'expense',
                        category: item.scenario.category || 'discretionary_dining',
                        isEssential: item.scenario.isEssential ?? false,
                        date: new Date().toISOString().split('T')[0],
                        notes: `Applied quick preset: ${item.scenario.description}`,
                      });
                    } else if (item.scenario.type === 'additional_income') {
                      addTransaction({
                        title: item.scenario.label,
                        amountPaise: item.scenario.amountPaise,
                        type: 'income',
                        category: 'essential_rent_bills',
                        isEssential: false,
                        date: new Date().toISOString().split('T')[0],
                        notes: `Applied quick preset: ${item.scenario.description}`,
                      });
                    } else if (item.scenario.type === 'new_subscription') {
                      addCommitment({
                        name: item.scenario.label,
                        amountPaise: item.scenario.amountPaise,
                        dueDay: item.scenario.recurringDueDay || 25,
                        frequency: 'monthly',
                        isEssential: false,
                        category: 'entertainment_shopping',
                        isActive: true,
                      });
                    } else if (item.scenario.type === 'savings_deposit') {
                      if (savingsGoals.length > 0) {
                        contributeToGoal(savingsGoals[0].id, item.scenario.amountPaise);
                      } else {
                        addSavingsGoal({
                          name: 'Emergency Buffer',
                          targetAmountPaise: item.scenario.amountPaise * 2,
                          currentAmountPaise: item.scenario.amountPaise,
                          deadlineDay: 30,
                        });
                      }
                    }
                    clearSimulation();
                  }}
                  className={`px-2.5 py-2 text-[10px] font-bold border-l cursor-pointer transition-colors ${
                    isSelected
                      ? 'border-white/20 text-emerald-300 hover:bg-white/10'
                      : 'border-[#E6E9F0] text-emerald-700 hover:bg-emerald-50'
                  }`}
                  title="Add permanently to your real ledger"
                >
                  + Add
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Custom Scenario Builder Form */}
      <form onSubmit={handleCustomSimulate} className="bg-[#F8F9FC] p-4 sm:p-5 rounded-2xl border border-[#E6E9F0] space-y-4 relative z-10">
        <div className="text-xs font-bold text-[#101226] uppercase tracking-wider flex items-center gap-1.5">
          <Sliders className="w-3.5 h-3.5 text-[#5B45F5]" />
          <span>Or Build a Custom Decision</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3.5">
          <div className="sm:col-span-4">
            <label className="block text-[11px] font-bold text-[#68728A] mb-1">DECISION TITLE</label>
            <input
              type="text"
              value={customLabel}
              onChange={(e) => setCustomLabel(e.target.value)}
              placeholder="e.g. Concert Ticket or New Earbuds"
              required
              className="w-full px-3.5 py-2 bg-white border border-[#E6E9F0] rounded-xl text-xs text-[#101226] focus:outline-none focus:ring-2 focus:ring-[#5B45F5]"
            />
          </div>

          <div className="sm:col-span-3">
            <label className="block text-[11px] font-bold text-[#68728A] mb-1">AMOUNT (₹ INR)</label>
            <input
              type="number"
              min="1"
              step="any"
              value={customAmountRupees}
              onChange={(e) => setCustomAmountRupees(e.target.value)}
              placeholder="e.g. 1500"
              required
              className="w-full px-3.5 py-2 bg-white border border-[#E6E9F0] rounded-xl text-xs text-[#101226] focus:outline-none focus:ring-2 focus:ring-[#5B45F5]"
            />
          </div>

          <div className="sm:col-span-3">
            <label className="block text-[11px] font-bold text-[#68728A] mb-1">TYPE</label>
            <select
              value={customType}
              onChange={(e) => setCustomType(e.target.value as any)}
              className="w-full px-3 py-2 bg-white border border-[#E6E9F0] rounded-xl text-xs text-[#101226] focus:outline-none focus:ring-2 focus:ring-[#5B45F5]"
            >
              <option value="one_off_expense">One-off Expense</option>
              <option value="unexpected_emergency">Unexpected Emergency</option>
              <option value="new_subscription">New Monthly Subscription</option>
              <option value="additional_income">Additional Income (+)</option>
              <option value="savings_deposit">Deposit to Savings Goal</option>
            </select>
          </div>

          <div className="sm:col-span-2 flex items-end">
            <button
              type="submit"
              className="w-full py-2 px-3 rounded-xl bg-[#5B45F5] hover:bg-[#4834df] text-white text-xs font-bold transition-all shadow-sm cursor-pointer"
            >
              Simulate
            </button>
          </div>
        </div>
      </form>

      {/* LIVE SIMULATION COMPARISON DASHBOARD */}
      {simulationResult && (
        <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-indigo-50/70 via-white to-emerald-50/50 border-2 border-[#5B45F5]/30 space-y-5 relative z-10 shadow-sm animate-in fade-in duration-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E6E9F0] pb-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#5B45F5] animate-ping" />
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#5B45F5]">
                  SIMULATED PREVIEW ACTIVE
                </span>
              </div>
              <h3 className="text-lg font-black text-[#101226] mt-0.5">
                {simulationResult.scenario.label} ({simulationResult.scenario.type === 'additional_income' ? '+' : '-'}{formatINR(simulationResult.scenario.amountPaise)})
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={clearSimulation}
                className="px-3.5 py-1.5 rounded-xl border border-zinc-300 text-xs font-bold text-zinc-700 hover:bg-zinc-100 transition-colors cursor-pointer"
              >
                Discard
              </button>
              <button
                onClick={applySimulation}
                className="px-4 py-1.5 rounded-xl bg-[#101226] text-white text-xs font-bold hover:bg-black transition-all shadow-sm cursor-pointer"
              >
                Apply to Real Ledger
              </button>
            </div>
          </div>

          {/* 4-Metric Comparative Matrix */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Metric 1: Remaining Spendable Balance */}
            <div className="bg-white p-4 rounded-xl border border-[#E6E9F0] space-y-1">
              <span className="text-[10px] font-bold text-[#68728A] uppercase">Spendable Runway</span>
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-black text-[#101226]">
                  {formatINR(simulationResult.simulatedMetrics.remainingSpendablePaise)}
                </span>
                <span className={`text-xs font-bold ${simulationResult.deltas.remainingBalanceDeltaPaise < 0 ? 'text-rose-600' : 'text-emerald-600'}`}>
                  {simulationResult.deltas.remainingBalanceDeltaPaise < 0 ? '' : '+'}
                  {formatINR(simulationResult.deltas.remainingBalanceDeltaPaise)}
                </span>
              </div>
              <span className="text-[11px] text-[#68728A] block">
                Actual: {formatINR(simulationResult.originalMetrics.remainingSpendablePaise)}
              </span>
            </div>

            {/* Metric 2: Safe Daily Allowance */}
            <div className="bg-white p-4 rounded-xl border border-[#E6E9F0] space-y-1">
              <span className="text-[10px] font-bold text-[#68728A] uppercase">Daily Safe Allowance</span>
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-black text-[#101226]">
                  {formatINR(simulationResult.simulatedMetrics.safeDailyAllowancePaise)}/day
                </span>
                <span className={`text-xs font-bold ${simulationResult.deltas.dailyAllowanceDeltaPaise < 0 ? 'text-rose-600' : 'text-emerald-600'}`}>
                  {simulationResult.deltas.dailyAllowanceDeltaPaise < 0 ? '' : '+'}
                  {formatINR(simulationResult.deltas.dailyAllowanceDeltaPaise)}
                </span>
              </div>
              <span className="text-[11px] text-[#68728A] block">
                Actual: {formatINR(simulationResult.originalMetrics.safeDailyAllowancePaise)}/day
              </span>
            </div>

            {/* Metric 3: Month-End Forecast */}
            <div className="bg-white p-4 rounded-xl border border-[#E6E9F0] space-y-1">
              <span className="text-[10px] font-bold text-[#68728A] uppercase">Month-End Forecast</span>
              <div className="flex items-baseline gap-2">
                <span className={`text-xl font-black ${simulationResult.simulatedMetrics.projectedMonthEndBalancePaise < 0 ? 'text-rose-600' : 'text-[#101226]'}`}>
                  {formatINR(simulationResult.simulatedMetrics.projectedMonthEndBalancePaise)}
                </span>
                <span className={`text-xs font-bold ${simulationResult.deltas.projectedEndBalanceDeltaPaise < 0 ? 'text-rose-600' : 'text-emerald-600'}`}>
                  {simulationResult.deltas.projectedEndBalanceDeltaPaise < 0 ? '' : '+'}
                  {formatINR(simulationResult.deltas.projectedEndBalanceDeltaPaise)}
                </span>
              </div>
              <span className="text-[11px] text-[#68728A] block">
                Actual: {formatINR(simulationResult.originalMetrics.projectedMonthEndBalancePaise)}
              </span>
            </div>

            {/* Metric 4: Health Score & Risk */}
            <div className="bg-white p-4 rounded-xl border border-[#E6E9F0] space-y-1">
              <span className="text-[10px] font-bold text-[#68728A] uppercase">Financial Health</span>
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-black text-[#101226]">
                  {simulationResult.simulatedMetrics.financialHealthScore}/100
                </span>
                <span className={`text-xs font-bold ${simulationResult.deltas.healthScoreDelta < 0 ? 'text-rose-600' : 'text-emerald-600'}`}>
                  {simulationResult.deltas.healthScoreDelta < 0 ? '' : '+'}
                  {simulationResult.deltas.healthScoreDelta} pts
                </span>
              </div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#68728A] block">
                Risk: {simulationResult.simulatedMetrics.riskLevel}
              </span>
            </div>
          </div>

          {/* Trade-off & Decision Analysis Explanation */}
          <div className="p-4 rounded-xl bg-white border border-[#E6E9F0] flex items-start gap-3">
            <div className={`p-2 rounded-lg shrink-0 ${
              simulationResult.recommendation === 'catastrophic' || simulationResult.recommendation === 'hazardous'
                ? 'bg-rose-50 text-rose-600'
                : 'bg-emerald-50 text-emerald-600'
            }`}>
              {simulationResult.recommendation === 'catastrophic' || simulationResult.recommendation === 'hazardous' ? (
                <AlertTriangle className="w-5 h-5" />
              ) : (
                <CheckCircle2 className="w-5 h-5" />
              )}
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#101226]">
                Consequence Analysis & Recommendation ({simulationResult.recommendation})
              </div>
              <p className="text-xs text-[#68728A] mt-1 leading-relaxed">
                {simulationResult.tradeoffAnalysis}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
