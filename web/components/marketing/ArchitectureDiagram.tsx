'use client';

import React, { useState } from 'react';

interface ArchNode {
  id: string;
  name: string;
  role: string;
  badge: string;
  accentBg: string;
  badgeColor: string;
  tech: string[];
  specs: string;
}

export const ArchitectureDiagram: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<string>('backend');

  const nodes: Record<string, ArchNode> = {
    web: {
      id: 'web',
      name: 'Daily Budget Planner',
      role: 'YOUR COMMAND SCREEN',
      badge: 'SCREEN 01',
      accentBg: 'from-emerald-500/10 to-transparent',
      badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      tech: ['Live Balance', 'Daily Spending Limit', 'Visual Charts', 'Instant Updates', 'Works On Mobile & Laptop'],
      specs: 'Your clear everyday view showing exactly how much you can spend today, your total remaining balance, and how many days are left in the month.',
    },
    backend: {
      id: 'backend',
      name: 'Smart Budget Calculator',
      role: 'AUTOMATIC MATH ENGINE',
      badge: 'SMART BRAIN',
      accentBg: 'from-blue-500/10 to-transparent',
      badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
      tech: ['Accurate to the Paisa', 'Auto Subtracts Rent & Bills', 'Instant Recalculation', 'Zero Math Errors', 'Safe Login Protection'],
      specs: 'The quiet background engine that does all the hard math for you. Whenever you buy something, it recalculates your safe daily spending limit in milliseconds.',
    },
    analytics: {
      id: 'analytics',
      name: '“What-If?” Decision Tester',
      role: 'IMPULSE BUY PROTECTOR',
      badge: 'SPEND SIMULATOR',
      accentBg: 'from-amber-500/10 to-transparent',
      badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
      tech: ['Test Before You Buy', 'Overspending Warnings', 'Month-End Predictor', 'Emergency Savings Shield', 'Habit Insights'],
      specs: 'Wondering if you can afford that weekend dinner or new shoes? Test the price here first. It warns you if the purchase will ruin your remaining daily allowance.',
    },
    database: {
      id: 'database',
      name: 'Safe Records Vault',
      role: 'PRIVATE DIGITAL STORAGE',
      badge: 'SAFE STORAGE',
      accentBg: 'from-violet-500/10 to-transparent',
      badgeColor: 'bg-violet-50 text-violet-700 border-violet-200',
      tech: ['Private Password Lock', 'Receipt & Slip Storage', 'Never Loses Data', 'Protected Savings Lock', 'Always Synced'],
      specs: 'Keeps all your past receipts, grocery logs, and bills organized in one safe private place so you never lose track of where your ₹10,000 went.',
    },
  };

  const active = nodes[selectedNode];

  return (
    <div className="w-full space-y-8 select-none">
      <div className="topology-header max-w-2xl space-y-2">
        <div className="text-xs font-mono font-bold tracking-wider text-emerald-600 uppercase">
          {'// 08. HOW IT KEEPS YOU SOLVENT'}
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900">
          How Your ₹10,000 Is Protected 24/7
        </h2>
        <p className="text-sm text-zinc-600">
          Four simple parts work together seamlessly so you never run out of money before month-end.
        </p>
      </div>

      {/* Interactive Topology Bento Grid */}
      <div role="tablist" aria-label="Architecture Nodes" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Object.values(nodes).map((node) => {
          const isSelected = selectedNode === node.id;
          return (
            <button
              key={node.id}
              role="tab"
              aria-selected={isSelected}
              onClick={() => setSelectedNode(node.id)}
              className={`topology-node-btn p-5 rounded-2xl text-left transition-all duration-200 border relative overflow-hidden cursor-pointer group flex flex-col justify-between min-h-[145px] ${
                isSelected
                  ? 'bg-white border-blue-600 shadow-lg shadow-blue-500/[0.12] ring-2 ring-blue-500/25'
                  : 'bg-white/80 hover:bg-white border-black/[0.06] hover:border-black/[0.16] shadow-sm hover:-translate-y-0.5'
              }`}
            >
              {isSelected && (
                <span className="absolute top-0 left-0 right-0 h-1 bg-blue-600" />
              )}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${node.badgeColor}`}>
                    {node.badge}
                  </span>
                  <div className="flex items-center gap-1.5">
                    {isSelected ? (
                      <span className="text-[10px] font-bold font-mono text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-200 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
                        Selected
                      </span>
                    ) : (
                      <span className="text-[10px] font-mono text-zinc-400 group-hover:text-zinc-600">
                        View &rarr;
                      </span>
                    )}
                  </div>
                </div>

                <div className="font-bold text-zinc-900 text-base leading-snug">
                  {node.name}
                </div>

                <div className="text-[11px] font-mono text-zinc-500 mt-1">
                  {node.role}
                </div>
              </div>

              <div className="pt-2.5 mt-2 border-t border-zinc-100 flex items-center justify-between text-[11px] text-zinc-400">
                <span>Click to see how it works</span>
                <span className={`transition-transform duration-200 ${isSelected ? 'text-blue-600 translate-x-0.5' : 'group-hover:translate-x-0.5'}`}>
                  &rarr;
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Detailed Spec Sheet */}
      <div className="topology-detail-card bento-card p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-black/[0.06] pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className={`text-xs font-mono font-bold px-2.5 py-0.5 rounded-full border ${active.badgeColor}`}>
                {active.badge}
              </span>
              <span className="text-xs font-mono text-zinc-400">• FEATURE PREVIEW</span>
            </div>
            <h3 className="text-2xl font-bold tracking-tight text-zinc-900 mt-1">
              {active.name}
            </h3>
          </div>
          <span className="text-xs font-mono font-semibold text-zinc-500 uppercase">
            {active.role}
          </span>
        </div>

        <p className="text-sm sm:text-base text-zinc-600 leading-relaxed max-w-3xl font-normal">
          {active.specs}
        </p>

        <div>
          <div className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-wider mb-2">
            What This Does For You
          </div>
          <div className="flex flex-wrap gap-2">
            {active.tech.map((t) => (
              <span
                key={t}
                className="px-3 py-1 rounded-lg bg-zinc-100/80 border border-zinc-200 text-zinc-800 text-xs font-medium"
              >
                ✓ {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
