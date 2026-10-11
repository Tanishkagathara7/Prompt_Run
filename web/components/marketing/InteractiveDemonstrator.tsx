'use client';

import React, { useState } from 'react';
import { Terminal, CheckCircle2, ShieldCheck } from 'lucide-react';
import { domainConfig } from '@/lib/domain.config';

export const InteractiveDemonstrator: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);

  const _entity = domainConfig.domain.primaryEntityName;
  const _category = domainConfig.domain.categories[0] || 'Operational';

  const steps = [
    {
      id: 0,
      phase: '01',
      title: 'Log Any Everyday Expense',
      client: 'STEP 1: ENTER PURCHASE',
      accent: 'blue',
      badgeBg: 'bg-blue-50 text-blue-700 border-blue-200',
      description:
        'Enter what you spent — like groceries, snacks, or medicine. The app tracks every single rupee and paisa without rounding errors.',
      requestMethod: 'YOU ENTER',
      requestPath: 'Grocery Receipt',
      payload: `Item: Weekend Grocery Restock
Amount: ₹650.00 (Exact)
Category: Essentials
Today: Day 14 of 30`,
      responseStatus: 'SAVED TO LEDGER',
      responseDetail: 'Remaining Monthly Runway: ₹5,420.00 across 16 days',
      systemMetrics: [
        { label: 'Amount Deducted', value: '₹650.00' },
        { label: 'Impact on Daily Burn', value: '-₹40.62 / day' },
      ],
    },
    {
      id: 1,
      phase: '02',
      title: 'Automatic Daily Limit Recalculation',
      client: 'STEP 2: SMART MATH',
      accent: 'lavender',
      badgeBg: 'bg-violet-50 text-violet-700 border-violet-200',
      description:
        'The calculator isolates rent, bills, and emergency savings, then splits the remaining free money evenly across all remaining days.',
      requestMethod: 'AUTO-CALCULATION',
      requestPath: 'Formula Breakdown',
      payload: `Starting Monthly Budget: ₹10,000.00
Locked Bills (Rent & WiFi): -₹3,000.00
Protected Savings Cushion: -₹1,500.00
Spent So Far: -₹4,580.00
Safe Free Cash: ₹920.00 for 16 Days`,
      responseStatus: 'NEW SAFE SPEND LIMIT',
      responseDetail: 'You can safely spend up to ₹338.75 today without entering debt.',
      systemMetrics: [
        { label: 'Safe Daily Ceiling', value: '₹338.75 / day' },
        { label: 'Runway Health', value: '100% Solvency' },
      ],
    },
    {
      id: 2,
      phase: '03',
      title: 'Test Before Buying (Impulse Shield)',
      client: 'STEP 3: TEST "WHAT-IF?"',
      accent: 'green',
      badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      description:
        'Want to buy something unplanned? Test the price first to preview how it will change your daily allowance before spending real cash.',
      requestMethod: 'SIMULATOR TEST',
      requestPath: 'Impulse Check',
      payload: `Proposed Purchase: ₹1,200.00 Weekend Dinner
Current Daily Allowance: ₹338.75 / day
Projected Allowance If Purchased: ₹263.75 / day
Alert: Reduces daily allowance by 22% for the rest of the month!`,
      responseStatus: 'IMPULSE WARNING ISSUED',
      responseDetail: 'Your ₹1,500 emergency savings cushion remains completely untouched.',
      systemMetrics: [
        { label: 'Overspending Shield', value: 'Protected' },
        { label: 'Savings Protected', value: '₹1,500.00' },
      ],
    },
  ];

  const current = steps[activeStep];

  return (
    <div className="workflow-container w-full space-y-6 select-none">
      {/* Step Selector Tabs */}
      <div role="tablist" aria-label="Workflow Phases" className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        {steps.map((step, idx) => {
          const isActive = activeStep === idx;
          return (
            <button
              key={step.id}
              role="tab"
              id={`workflow-tab-${step.id}`}
              aria-selected={isActive}
              aria-controls={`workflow-panel-${step.id}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => setActiveStep(idx)}
              className={`p-5 rounded-xl text-left transition-all duration-200 border cursor-pointer flex flex-col justify-between min-h-[140px] relative overflow-hidden ${
                isActive
                  ? 'bg-white border-blue-600 shadow-lg shadow-blue-500/[0.12] ring-2 ring-blue-500/25'
                  : 'bg-white/80 hover:bg-white border-black/[0.08] hover:border-black/[0.16] shadow-xs hover:-translate-y-0.5'
              }`}
            >
              {isActive && (
                <span className="absolute top-0 left-0 right-0 h-1 bg-blue-600" />
              )}
              <div className="flex items-center justify-between w-full mb-3">
                <span
                  className={`text-xs font-mono font-bold px-2.5 py-0.5 rounded-md border ${
                    isActive ? step.badgeBg : 'bg-zinc-100 text-zinc-600 border-zinc-200'
                  }`}
                >
                  STEP {step.phase}
                </span>
                <span className="text-xs font-mono text-zinc-400">0{idx + 1}/03</span>
              </div>
              <div className="text-sm font-semibold text-zinc-900 leading-snug my-auto">
                {step.title}
              </div>
              <div className="flex items-center justify-between w-full pt-3 mt-2 border-t border-zinc-100 text-xs font-medium text-zinc-500">
                <span>{step.client}</span>
                {isActive ? (
                  <span className="text-blue-600 font-bold text-[11px] flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
                    Selected
                  </span>
                ) : (
                  <span className="text-zinc-400 text-[11px]">Click to see &rarr;</span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Execution Stage */}
      <div
        role="tabpanel"
        id={`workflow-panel-${current.id}`}
        aria-labelledby={`workflow-tab-${current.id}`}
        className="bento-card p-6 sm:p-8 space-y-6"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-black/[0.06] pb-5">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold border ${current.badgeBg}`}>
                {current.client}
              </span>
              <span className="text-xs text-zinc-400 font-mono">• INTERACTIVE STEP</span>
            </div>
            <h3 className="text-xl font-bold tracking-tight text-zinc-900">
              {current.title}
            </h3>
            <p className="text-sm text-zinc-600 max-w-2xl font-normal">
              {current.description}
            </p>
          </div>

          <div className="flex items-center gap-3 font-mono text-xs">
            {current.systemMetrics.map((m, i) => (
              <div key={i} className="p-2.5 rounded-lg bg-zinc-50 border border-zinc-200/80 shadow-xs">
                <div className="text-[10px] text-zinc-400 uppercase font-semibold">{m.label}</div>
                <div className="text-zinc-900 font-bold mt-0.5">{m.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Request & Response Split Display */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* User Input Stream */}
          <div className="rounded-xl bg-zinc-50/80 text-zinc-900 p-4 font-mono text-xs space-y-3 shadow-xs border border-zinc-200/80">
            <div className="flex items-center justify-between border-b border-zinc-200/80 pb-2 text-xs">
              <span className="text-zinc-600 flex items-center gap-1.5 font-semibold">
                <Terminal className="w-3.5 h-3.5 text-blue-600" />
                {current.requestMethod}
              </span>
              <span className="text-blue-600 font-bold">
                {current.requestPath}
              </span>
            </div>
            <pre className="text-zinc-800 overflow-x-auto p-2.5 bg-white rounded-lg text-xs leading-relaxed border border-zinc-200/60 shadow-2xs font-sans whitespace-pre-wrap">
              {current.payload}
            </pre>
          </div>

          {/* System Response Stream */}
          <div className="rounded-xl bg-zinc-50/80 text-zinc-900 p-4 font-mono text-xs space-y-3 shadow-xs border border-zinc-200/80">
            <div className="flex items-center justify-between border-b border-zinc-200/80 pb-2 text-xs">
              <span className="text-zinc-600 flex items-center gap-1.5 font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                AUTOMATIC PROTECTION
              </span>
              <span className="text-emerald-700 font-bold text-xs font-mono">
                {current.responseStatus}
              </span>
            </div>
            <div className="space-y-2 p-2.5 bg-white rounded-lg border border-zinc-200/60 shadow-2xs font-sans">
              <div className="text-zinc-800 text-xs font-medium">{current.responseDetail}</div>
              <div className="text-emerald-700 text-xs flex items-center gap-1.5 font-semibold pt-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Zero Deficit Safety Checks Active
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
