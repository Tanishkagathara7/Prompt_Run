'use client';

import React from 'react';
import {
  TrendingUp,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  Calendar,
  IndianRupee,
  ShieldCheck,
  Flame,
  CheckCircle2,
  Lock,
} from 'lucide-react';
import { useFinancial } from '@/lib/context/FinancialContext';
import { formatINR } from '@/lib/financialEngine';
import { FinancialDecisionSimulator } from '@/components/dashboard/FinancialDecisionSimulator';
import { CommitmentsAndSavingsModule } from '@/components/dashboard/CommitmentsAndSavingsModule';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';

export default function DashboardPage() {
  const {
    currentDay,
    setCurrentDay,
    metrics,
    simulationResult,
    resetToDefaultState,
  } = useFinancial();

  const isSimulated = !!simulationResult;
  const displayMetrics = isSimulated ? simulationResult.simulatedMetrics : metrics;

  return (
    <div className="space-y-8 pb-16">
      {/* Simulation Banner If Active */}
      {isSimulated && (
        <div className="p-4 rounded-2xl bg-[#5B45F5] text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-lg shadow-[#5B45F5]/20 animate-in fade-in">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-white animate-ping" />
            <div>
              <span className="text-xs font-black uppercase tracking-wider">
                SIMULATION SCENARIO ACTIVE
              </span>
              <p className="text-xs opacity-90">
                You are viewing projected metrics for &ldquo;{simulationResult.scenario.label}&rdquo;. Real data remains safely untouched.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span className="text-xs font-mono font-bold bg-white/20 px-3 py-1 rounded-xl">
              Day {currentDay} of 30
            </span>
          </div>
        </div>
      )}

      {/* Hero Header */}
      <div className="bg-white rounded-2xl sm:rounded-3xl border border-[#E6E9F0] p-4 sm:p-6 lg:p-8 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative overflow-hidden">
        <div className="space-y-3 max-w-2xl">
          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex items-center gap-2 px-2.5 sm:px-3 py-1 rounded-full bg-[#101226] text-white text-[10px] sm:text-[11px] font-bold">
              <span className="w-2 h-2 rounded-full bg-[#16B981]" />
              <span>₹10,000 SURVIVAL RUNWAY</span>
            </div>

            <div className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full bg-[#DCFCE7] text-[10px] sm:text-[11px] font-bold text-[#16B981]">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>STATUS: {displayMetrics.healthStatusText.toUpperCase()}</span>
            </div>
          </div>

          <h1 className="text-xl sm:text-3xl lg:text-4xl font-black tracking-tight text-[#101226]">
            Runway Command Center
          </h1>

          <p className="text-xs sm:text-sm text-[#68728A] leading-relaxed">
            Live 30-day budget dashboard connecting remaining spendable balance, daily burn rate allowance, scheduled commitments, and protected savings.
          </p>

          {/* Day Stepper Control */}
          <div className="pt-1 sm:pt-2 flex flex-wrap items-center gap-2 sm:gap-3">
            <div className="flex items-center gap-1.5 sm:gap-2 bg-[#F8F9FC] px-2.5 sm:px-3.5 py-1.5 rounded-xl border border-[#E6E9F0] text-xs font-bold text-[#101226]">
              <Calendar className="w-3.5 h-3.5 text-[#5B45F5] shrink-0" />
              <span className="hidden xs:inline">Simulation Day:</span>
              <span className="xs:hidden">Day:</span>
              <select
                value={currentDay}
                onChange={(e) => setCurrentDay(parseInt(e.target.value, 10))}
                className="bg-white border border-[#E6E9F0] rounded-lg px-2 py-0.5 text-xs font-mono font-bold focus:outline-none"
              >
                {Array.from({ length: 30 }, (_, i) => i + 1).map((d) => (
                  <option key={d} value={d}>
                    Day {d} of 30 ({30 - d + 1} days left)
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={resetToDefaultState}
              className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl border border-[#E6E9F0] bg-white hover:bg-zinc-50 text-xs font-semibold text-zinc-600 transition-colors cursor-pointer"
              title="Reset state to initial clean slate"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* Right Metric Highlight (Health Score Gauge) */}
        <div className="flex flex-col xs:flex-row lg:flex-col items-start xs:items-center lg:items-start gap-3 sm:gap-4 lg:gap-6 pt-4 lg:pt-0 border-t lg:border-t-0 lg:border-l border-[#E6E9F0] lg:pl-8">
          <div className="space-y-1 text-left w-full">
            <div className="text-[10px] sm:text-xs font-bold text-[#68728A] uppercase tracking-wider">
              FINANCIAL HEALTH SCORE
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl sm:text-5xl font-black tracking-tight text-[#101226]">
                <AnimatedCounter value={displayMetrics.financialHealthScore} />
              </span>
              <span className="text-xs sm:text-sm font-bold text-[#68728A]">/100</span>
            </div>
            <div className="text-xs font-semibold pt-0.5">
              <span
                className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] sm:text-[11px] font-bold ${
                  displayMetrics.riskLevel === 'critical'
                    ? 'bg-rose-100 text-rose-700'
                    : displayMetrics.riskLevel === 'high'
                    ? 'bg-amber-100 text-amber-800'
                    : displayMetrics.riskLevel === 'moderate'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-emerald-100 text-emerald-800'
                }`}
              >
                Risk: {displayMetrics.riskLevel.toUpperCase()}
              </span>
            </div>
            <p className="text-[10px] sm:text-[11px] text-[#68728A] pt-1 max-w-xs leading-snug">
              {displayMetrics.riskExplanation}
            </p>
          </div>
        </div>
      </div>

      {/* 4 Core Financial KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-5">
        {/* Card 1: Spendable Balance */}
        <div className="bg-white rounded-2xl sm:rounded-3xl border border-[#E6E9F0] p-4 sm:p-6 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] sm:text-[11px] font-bold text-[#68728A] uppercase tracking-wider">
              SPENDABLE RUNWAY
            </span>
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <IndianRupee className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
          </div>
          <div className="mt-2.5 sm:mt-3">
            <div className="text-2xl sm:text-3xl font-black text-[#101226]">
              <AnimatedCounter
                value={Math.round(displayMetrics.remainingSpendablePaise / 100)}
                formatter={(val) => `₹${val.toLocaleString('en-IN')}`}
              />
            </div>
            <p className="text-[11px] sm:text-xs text-[#68728A] mt-0.5 sm:mt-1">
              Available cash (excluding locked savings)
            </p>
          </div>
          <div className="mt-3 sm:mt-4 pt-2.5 sm:pt-3 border-t border-[#E6E9F0] text-[10px] sm:text-[11px] text-[#68728A] flex justify-between">
            <span>Spent: {formatINR(displayMetrics.totalSpentPaise)}</span>
            <span>Saved: {formatINR(displayMetrics.protectedSavingsPaise)}</span>
          </div>
        </div>

        {/* Card 2: Safe Daily Allowance */}
        <div className="bg-white rounded-2xl sm:rounded-3xl border border-[#E6E9F0] p-4 sm:p-6 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] sm:text-[11px] font-bold text-[#68728A] uppercase tracking-wider">
              SAFE DAILY ALLOWANCE
            </span>
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-indigo-50 text-[#5B45F5] flex items-center justify-center shrink-0">
              <Flame className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
          </div>
          <div className="mt-2.5 sm:mt-3">
            <div className="text-2xl sm:text-3xl font-black text-[#101226] flex items-baseline">
              <AnimatedCounter
                value={Math.round(displayMetrics.safeDailyAllowancePaise / 100)}
                formatter={(val) => `₹${val.toLocaleString('en-IN')}`}
              />
              <span className="text-xs sm:text-sm font-semibold text-[#68728A] ml-1">/day</span>
            </div>
            <p className="text-[11px] sm:text-xs text-[#68728A] mt-0.5 sm:mt-1">
              Max daily spend for {displayMetrics.daysRemaining} remaining days
            </p>
          </div>
          <div className="mt-3 sm:mt-4 pt-2.5 sm:pt-3 border-t border-[#E6E9F0] text-[10px] sm:text-[11px] text-[#68728A] flex justify-between">
            <span>Timeline: Day {currentDay}/30</span>
            <span className="font-bold text-[#101226]">{displayMetrics.daysRemaining} days left</span>
          </div>
        </div>

        {/* Card 3: Month-End Forecast */}
        <div className="bg-white rounded-2xl sm:rounded-3xl border border-[#E6E9F0] p-4 sm:p-6 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] sm:text-[11px] font-bold text-[#68728A] uppercase tracking-wider">
              MONTH-END FORECAST
            </span>
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
          </div>
          <div className="mt-2.5 sm:mt-3">
            <div className={`text-2xl sm:text-3xl font-black ${displayMetrics.projectedMonthEndBalancePaise < 0 ? 'text-rose-600' : 'text-[#101226]'}`}>
              <AnimatedCounter
                value={Math.round(displayMetrics.projectedMonthEndBalancePaise / 100)}
                formatter={(val) => (val < 0 ? `-₹${Math.abs(val).toLocaleString('en-IN')}` : `₹${val.toLocaleString('en-IN')}`)}
              />
            </div>
            <p className="text-[11px] sm:text-xs text-[#68728A] mt-0.5 sm:mt-1">
              Projected balance after upcoming bills
            </p>
          </div>
          <div className="mt-3 sm:mt-4 pt-2.5 sm:pt-3 border-t border-[#E6E9F0] text-[10px] sm:text-[11px] text-[#68728A] flex justify-between items-center">
            <span>Future Bills: {formatINR(displayMetrics.upcomingCommitmentsPaise)}</span>
            <span className={displayMetrics.canCoverEssentialCommitments ? 'text-emerald-600 font-bold' : 'text-rose-600 font-bold'}>
              {displayMetrics.canCoverEssentialCommitments ? '✓ Solvent' : '⚠ Deficit'}
            </span>
          </div>
        </div>

        {/* Card 4: Protected Savings Buffer */}
        <div className="bg-white rounded-2xl sm:rounded-3xl border border-[#E6E9F0] p-4 sm:p-6 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] sm:text-[11px] font-bold text-[#68728A] uppercase tracking-wider">
              PROTECTED SAVINGS
            </span>
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
              <Lock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
          </div>
          <div className="mt-2.5 sm:mt-3">
            <div className="text-2xl sm:text-3xl font-black text-[#101226]">
              <AnimatedCounter
                value={Math.round(displayMetrics.protectedSavingsPaise / 100)}
                formatter={(val) => `₹${val.toLocaleString('en-IN')}`}
              />
            </div>
            <p className="text-[11px] sm:text-xs text-[#68728A] mt-0.5 sm:mt-1">
              Locked against discretionary impulse spending
            </p>
          </div>
          <div className="mt-3 sm:mt-4 pt-2.5 sm:pt-3 border-t border-[#E6E9F0] text-[10px] sm:text-[11px] text-[#68728A] flex justify-between">
            <span>Essential Spent: {formatINR(displayMetrics.essentialSpentPaise)}</span>
            <span>Fun Spent: {formatINR(displayMetrics.discretionarySpentPaise)}</span>
          </div>
        </div>
      </div>

      {/* SIGNATURE INTERACTIVE FEATURE: What-If Decision Simulator */}
      <FinancialDecisionSimulator />

      {/* Commitments & Savings Module */}
      <CommitmentsAndSavingsModule />
    </div>
  );
}
