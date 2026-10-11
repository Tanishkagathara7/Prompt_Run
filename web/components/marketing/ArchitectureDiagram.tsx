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
      name: 'Next.js 16 Runway Command',
      role: 'FINANCIAL RUNWAY WORKSPACE',
      badge: 'NODE 01',
      accentBg: 'from-emerald-500/10 to-transparent',
      badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      tech: ['Next.js App Router', 'React 19', 'Tailwind CSS', 'Lenis Smooth Motion', 'Paise Formatter'],
      specs: 'High-density ₹10,000 budget operations center. Live daily burn allowances, reactive What-If simulators, and integer-precision cashflow trackers.',
    },
    backend: {
      id: 'backend',
      name: 'Node.js / Express Core Server',
      role: 'FINANCIAL CALCULATION ENGINE',
      badge: 'CORE ENGINE',
      accentBg: 'from-blue-500/10 to-transparent',
      badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
      tech: ['Express.js', 'Integer Math', 'JWT Auth', 'Runway Validator', 'RBAC Middleware'],
      specs: 'Central financial engine running on port 5000. Performs safe burn projections, commitment locking, and atomic MongoDB Atlas transactions.',
    },
    analytics: {
      id: 'analytics',
      name: 'Burn Rate & What-If Pipeline',
      role: 'IMPULSE PREDICTION ENGINE',
      badge: 'SIMULATOR',
      accentBg: 'from-amber-500/10 to-transparent',
      badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
      tech: ['What-If Projection', 'Deficit Warning', 'Paise Aggregation', 'Category Burn'],
      specs: 'Mathematical simulation engine predicting allowance reductions before impulse purchases are confirmed and ring-fencing savings buffers.',
    },
    database: {
      id: 'database',
      name: 'MongoDB Atlas Persistence',
      role: 'PAISE LEDGER DATASTORE',
      badge: 'PERSISTENCE',
      accentBg: 'from-violet-500/10 to-transparent',
      badgeColor: 'bg-violet-50 text-violet-700 border-violet-200',
      tech: ['Transaction Schemas', 'Budget Profiles', 'Savings Collections', 'Indexed Queries'],
      specs: 'Primary persistent datastore. Enforces schema validations and indexed queries across all financial transactions, commitments, and user profiles.',
    },
  };

  const active = nodes[selectedNode];

  return (
    <div className="w-full space-y-8 select-none">
      <div className="topology-header max-w-2xl space-y-2">
        <div className="text-xs font-mono font-bold tracking-wider text-emerald-600 uppercase">
          {'// 08. FINANCIAL TOPOLOGY & DATA BUS'}
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900">
          CENTRAL BUDGET RUNWAY TOPOLOGY
        </h2>
        <p className="text-sm text-zinc-600">
          Authoritative financial calculation engine and integer paise ledger powering the SurvivalRun command center.
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
                        Select &rarr;
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
                <span>Click to view specs</span>
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
              <span className="text-xs font-mono text-zinc-400">• ACTIVE INSPECTOR</span>
            </div>
            <h3 className="text-2xl font-bold tracking-tight text-zinc-900 mt-1">
              {active.name}
            </h3>
          </div>
          <span className="text-xs font-mono font-semibold text-zinc-500 uppercase">
            {active.role}
          </span>
        </div>

        <p className="text-sm text-zinc-600 leading-relaxed max-w-3xl">
          {active.specs}
        </p>

        <div>
          <div className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-wider mb-2">
            Integrated Technologies & Modules
          </div>
          <div className="flex flex-wrap gap-2">
            {active.tech.map((t) => (
              <span
                key={t}
                className="px-3 py-1 rounded-lg bg-zinc-100/80 border border-zinc-200 text-zinc-800 text-xs font-mono font-medium"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
