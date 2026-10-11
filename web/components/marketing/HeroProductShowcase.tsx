'use client';

import React, { useRef, useState } from 'react';
import {
  LayoutDashboard,
  Layers,
  FolderOpen,
  Bell,
  Search,
  CheckCircle2,
  AlertTriangle,
  ShieldCheck,
} from 'lucide-react';

export const HeroProductShowcase: React.FC = () => {
  const stageRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'ledger' | 'files' | 'notifications'>('dashboard');

  return (
    <>
      {/* ========================================================
          HERO MAIN STAGE: 3D ISOMETRIC TABLET MOCKUP WITH STYLUS
         ======================================================== */}
      <div className="w-full relative py-0 select-none">
        {/* 3D Perspective Stage Container */}
        <div className="tablet-perspective-stage relative max-w-5xl mx-auto pt-2 pb-4 px-2 sm:px-6">
          {/* Playful background decorative shapes */}
          <div className="absolute -top-10 -left-12 w-64 h-64 bg-emerald-200/40 rounded-full blur-2xl pointer-events-none -z-10" />
          <div className="absolute -bottom-8 left-1/4 w-80 h-32 bg-blue-300/30 rounded-full blur-2xl pointer-events-none -z-10" />
          <div className="absolute top-1/4 -right-10 w-72 h-72 bg-indigo-200/40 rounded-full blur-2xl pointer-events-none -z-10" />
          
          {/* 3D Isometric Tablet Body */}
          <div
            ref={stageRef}
            className="tablet-3d-body relative rounded-[2.5rem] bg-[#1E242B] p-3 sm:p-4 border-2 border-zinc-700/60 shadow-2xl transition-transform duration-300 overflow-hidden"
          >
            {/* Tablet Camera Pinhole & Sensor */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-30 pointer-events-none">
              <span className="w-2 h-2 rounded-full bg-zinc-900 border border-zinc-700/80" />
              <span className="w-1 h-1 rounded-full bg-emerald-600/60" />
            </div>

            {/* Glossy Screen Glare overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.04] via-transparent to-white/[0.08] pointer-events-none z-20 rounded-[2rem]" />

            {/* Inner Tablet Screen Container */}
            <div className="relative rounded-[2rem] bg-white overflow-hidden shadow-inner flex flex-col min-h-[490px] text-zinc-800">
              
              {/* Tablet Top Navigation Bar */}
              <div className="h-14 bg-[#FAFCFF] border-b border-[#EEF2F6] px-4 sm:px-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 flex-shrink-0 flex items-center justify-center">
                      <svg width="24" height="24" viewBox="0 0 32 32" fill="none">
                        <path d="M3 16H8L11.5 6.5L18 25.5L22 16H29" stroke="#5C4CF6" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-extrabold text-[15px] tracking-tight text-[#161828] leading-none">
                        SurvivalRun
                      </span>
                      <span className="text-[8px] font-bold tracking-[0.06em] text-[#8C95A6] uppercase mt-0.5">
                        RUNWAY COMMAND
                      </span>
                    </div>
                  </div>
                  <span className="hidden sm:inline-flex text-[11px] px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-mono font-bold border border-emerald-200">
                    Day 14 of 30 • 16 Days Left
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 pl-2 pr-3 py-1 rounded-full bg-white border border-[#E8ECF2] text-xs font-semibold text-[#161828] shadow-2xs">
                    <div className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-[10px] shadow-xs">
                      ₹
                    </div>
                    <span className="font-medium font-mono text-xs">₹10,000.00 Budget</span>
                  </div>
                </div>
              </div>

              {/* Tablet Two-Column Layout (Exact Same Sidebar + Main Data Stage) */}
              <div className="flex flex-1 overflow-hidden">
                
                {/* Left Mini Sidebar — Exact Match to web/components/layout/Sidebar.tsx */}
                <div className="w-48 sm:w-56 bg-[#FAFCFF] border-r border-[#EEF2F6] p-3 flex flex-col justify-between hidden sm:flex select-none">
                  <div className="space-y-3">
                    {/* Search trigger mock */}
                    <div className="h-9 px-3 rounded-xl bg-white border border-[#E8ECF2] text-[#8E98A8] flex items-center justify-between text-xs shadow-2xs">
                      <div className="flex items-center gap-2">
                        <Search className="w-3.5 h-3.5 text-[#9AA3B4]" />
                        <span className="text-[11px]">Search...</span>
                      </div>
                      <kbd className="text-[9px] px-1.5 py-0.5 rounded bg-[#F4F6FA] border border-[#E3E7EE] text-[#788294]">
                        Ctrl K
                      </kbd>
                    </div>

                    {/* Category Label */}
                    <div className="px-2 text-[9px] font-bold text-[#8E98A8] uppercase tracking-wider">
                      WORKSPACE
                    </div>

                    {/* Navigation Items (Interactive Tabs) */}
                    <nav className="space-y-1">
                      <button
                        type="button"
                        onClick={() => setActiveTab('dashboard')}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-all cursor-pointer ${
                          activeTab === 'dashboard'
                            ? 'bg-[#0E1025] text-white shadow-xs font-semibold'
                            : 'text-[#626E82] hover:text-[#161828] hover:bg-[#F2F5FA] font-medium'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <LayoutDashboard className={`w-4 h-4 ${activeTab === 'dashboard' ? 'text-[#6D5AFB]' : 'text-[#7B8699]'}`} />
                          <span>Runway Dashboard</span>
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setActiveTab('ledger')}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-all cursor-pointer ${
                          activeTab === 'ledger'
                            ? 'bg-[#0E1025] text-white shadow-xs font-semibold'
                            : 'text-[#626E82] hover:text-[#161828] hover:bg-[#F2F5FA] font-medium'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <Layers className={`w-4 h-4 ${activeTab === 'ledger' ? 'text-[#6D5AFB]' : 'text-[#7B8699]'}`} />
                          <span>Expense Ledger</span>
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setActiveTab('files')}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-all cursor-pointer ${
                          activeTab === 'files'
                            ? 'bg-[#0E1025] text-white shadow-xs font-semibold'
                            : 'text-[#626E82] hover:text-[#161828] hover:bg-[#F2F5FA] font-medium'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <FolderOpen className={`w-4 h-4 ${activeTab === 'files' ? 'text-[#6D5AFB]' : 'text-[#7B8699]'}`} />
                          <span>Receipts &amp; Files</span>
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setActiveTab('notifications')}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-all cursor-pointer ${
                          activeTab === 'notifications'
                            ? 'bg-[#0E1025] text-white shadow-xs font-semibold'
                            : 'text-[#626E82] hover:text-[#161828] hover:bg-[#F2F5FA] font-medium'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <Bell className={`w-4 h-4 ${activeTab === 'notifications' ? 'text-[#6D5AFB]' : 'text-[#7B8699]'}`} />
                          <span>Alerts</span>
                        </div>
                        <span className="min-w-4 h-4 px-1 flex items-center justify-center text-[10px] font-bold rounded-full bg-[#EDE8FF] text-[#5C4CF6]">
                          2
                        </span>
                      </button>
                    </nav>
                  </div>

                  {/* Sidebar Bottom Telemetry + User */}
                  <div className="space-y-2 pt-2 border-t border-[#EEF2F6]">
                    <div className="h-8 px-2.5 rounded-lg bg-[#ECFDF5] border border-[#D1FAE5] flex items-center justify-between text-[11px]">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
                        <span className="font-bold text-[#141824] text-[11px]">Telemetry Active</span>
                      </div>
                      <span className="font-mono text-[10.5px] font-bold text-[#059669]">24ms</span>
                    </div>

                    <div className="flex items-center gap-2 px-1 pt-1">
                      <div className="w-7 h-7 rounded-full bg-[#EDE8FF] border border-[#DDD6FE] text-[#5C4CF6] flex items-center justify-center font-bold text-[11px]">
                        TK
                      </div>
                      <div className="min-w-0">
                        <p className="text-[11px] font-bold text-[#161828] truncate leading-tight">Tanish</p>
                        <p className="text-[9px] text-[#8692A6] truncate leading-tight">runner@survivalrun.app</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Main Content Area: Changes with Selected Interactive Tab */}
                <div className="flex-1 p-5 sm:p-6 space-y-5 overflow-x-auto bg-white">
                  {activeTab === 'dashboard' && (
                    <>
                      {/* Dashboard Header Bar */}
                      <div className="flex items-center justify-between pb-2 border-b border-zinc-100">
                        <div>
                          <div className="text-base font-bold tracking-tight text-zinc-900" role="presentation">
                            30-Day Budget Runway Command
                          </div>
                          <div className="text-xs text-zinc-500 font-medium">Safe Daily Burn Rate &amp; Impulse Protection</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-md tabular-nums font-semibold">
                            ₹5,420.00 Remaining (16 Days)
                          </span>
                        </div>
                      </div>

                      {/* Summary Metric Cards */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200/80">
                          <div className="text-[11px] text-emerald-800 font-semibold uppercase tracking-wider">Safe Daily Allowance</div>
                          <div className="text-xl font-bold text-emerald-950 mt-1">₹338.75 / day</div>
                          <div className="text-[10px] text-emerald-700 mt-1 font-medium">16 days remaining runway</div>
                        </div>
                        <div className="p-3.5 rounded-xl bg-blue-50/70 border border-blue-200/80">
                          <div className="text-[11px] text-blue-800 font-semibold uppercase tracking-wider">Locked Commitments</div>
                          <div className="text-xl font-bold text-blue-950 mt-1">₹3,000.00</div>
                          <div className="text-[10px] text-blue-700 mt-1 font-medium">Ring-fenced for Rent &amp; WiFi</div>
                        </div>
                        <div className="p-3.5 rounded-xl bg-violet-50/70 border border-violet-200/80">
                          <div className="text-[11px] text-violet-800 font-semibold uppercase tracking-wider">Protected Cushion</div>
                          <div className="text-xl font-bold text-violet-950 mt-1">₹1,500.00</div>
                          <div className="text-[10px] text-violet-700 mt-1 font-medium">Emergency reserve shielded</div>
                        </div>
                      </div>

                      {/* Focused Table Preview */}
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="font-semibold text-zinc-800 text-sm">Recent Ledger Entries (Paise Precision)</div>
                          <span className="text-xs text-zinc-500 font-mono">Live Sync</span>
                        </div>

                        <div className="rounded-xl border border-zinc-200 overflow-hidden shadow-xs">
                          <table className="w-full text-left text-xs" aria-label="Recent Runway Transactions">
                            <thead className="bg-zinc-50 border-b border-zinc-200 text-zinc-600 font-semibold">
                              <tr>
                                <th className="px-3.5 py-2.5">Transaction</th>
                                <th className="px-3.5 py-2.5">Category</th>
                                <th className="px-3.5 py-2.5">Amount</th>
                                <th className="px-3.5 py-2.5">Runway Impact</th>
                                <th className="px-3.5 py-2.5">What-If Verdict</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-100 text-zinc-700">
                              <tr className="hover:bg-zinc-50/60 transition-colors">
                                <td className="px-3.5 py-2.5 font-medium text-zinc-900">Weekly Grocery Restock</td>
                                <td className="px-3.5 py-2.5 text-zinc-600">Essentials</td>
                                <td className="px-3.5 py-2.5 font-mono font-semibold text-zinc-900">₹850.00</td>
                                <td className="px-3.5 py-2.5 font-mono text-xs text-emerald-600">-₹53/day safe</td>
                                <td className="px-3.5 py-2.5">
                                  <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                                    <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Safe Purchase
                                  </span>
                                </td>
                              </tr>
                              <tr className="hover:bg-zinc-50/60 transition-colors">
                                <td className="px-3.5 py-2.5 font-medium text-zinc-900">Late Night Food Delivery</td>
                                <td className="px-3.5 py-2.5 text-zinc-600">Discretionary</td>
                                <td className="px-3.5 py-2.5 font-mono font-semibold text-zinc-900">₹420.00</td>
                                <td className="px-3.5 py-2.5 font-mono text-xs text-amber-600">-₹26/day drop</td>
                                <td className="px-3.5 py-2.5">
                                  <span className="inline-flex items-center gap-1 text-[11px] font-medium text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                                    <AlertTriangle className="w-3 h-3 text-amber-500" /> Impulse Warning
                                  </span>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </>
                  )}

                  {activeTab === 'ledger' && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between pb-2 border-b border-zinc-100">
                        <div>
                          <div className="text-base font-bold text-zinc-900">Full Expense Ledger</div>
                          <div className="text-xs text-zinc-500">All 30-day transactions tracked with integer paise accuracy</div>
                        </div>
                        <span className="text-xs font-mono bg-zinc-100 px-2.5 py-1 rounded text-zinc-700 font-semibold">
                          Total Logged: ₹4,580.00
                        </span>
                      </div>
                      <div className="rounded-xl border border-zinc-200 overflow-hidden text-xs">
                        <table className="w-full text-left">
                          <thead className="bg-zinc-50 border-b border-zinc-200 font-semibold text-zinc-600">
                            <tr>
                              <th className="px-3.5 py-2.5">Date</th>
                              <th className="px-3.5 py-2.5">Description</th>
                              <th className="px-3.5 py-2.5">Category</th>
                              <th className="px-3.5 py-2.5">Paise Precision</th>
                              <th className="px-3.5 py-2.5">Status</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-zinc-100">
                            <tr className="hover:bg-zinc-50">
                              <td className="px-3.5 py-2.5 font-mono">Day 14</td>
                              <td className="px-3.5 py-2.5 font-medium">Grocery Restock</td>
                              <td className="px-3.5 py-2.5 text-zinc-600">Essentials</td>
                              <td className="px-3.5 py-2.5 font-mono font-bold">85000 paise</td>
                              <td className="px-3.5 py-2.5 text-emerald-600 font-semibold">Settled</td>
                            </tr>
                            <tr className="hover:bg-zinc-50">
                              <td className="px-3.5 py-2.5 font-mono">Day 12</td>
                              <td className="px-3.5 py-2.5 font-medium">Metro Metro Card Topup</td>
                              <td className="px-3.5 py-2.5 text-zinc-600">Transit</td>
                              <td className="px-3.5 py-2.5 font-mono font-bold">50000 paise</td>
                              <td className="px-3.5 py-2.5 text-emerald-600 font-semibold">Settled</td>
                            </tr>
                            <tr className="hover:bg-zinc-50">
                              <td className="px-3.5 py-2.5 font-mono">Day 08</td>
                              <td className="px-3.5 py-2.5 font-medium">WiFi Broadband Bill</td>
                              <td className="px-3.5 py-2.5 text-zinc-600">Commitment</td>
                              <td className="px-3.5 py-2.5 font-mono font-bold">79900 paise</td>
                              <td className="px-3.5 py-2.5 text-blue-600 font-semibold">Locked</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {activeTab === 'files' && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between pb-2 border-b border-zinc-100">
                        <div>
                          <div className="text-base font-bold text-zinc-900">Receipts &amp; Audit Files</div>
                          <div className="text-xs text-zinc-500">Digitized proof of essential bills and grocery slips</div>
                        </div>
                        <span className="text-xs font-mono bg-blue-50 text-blue-700 border border-blue-200 px-2.5 py-1 rounded font-semibold">
                          3 Uploaded Slips
                        </span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="p-3 rounded-xl border border-zinc-200 bg-zinc-50/60 flex items-center justify-between">
                          <div className="flex items-center gap-2.5">
                            <FolderOpen className="w-5 h-5 text-blue-600" />
                            <div>
                              <div className="text-xs font-semibold text-zinc-900">Supermarket_Invoice_Day14.pdf</div>
                              <div className="text-[10px] text-zinc-500 font-mono">₹850.00 • 240 KB</div>
                            </div>
                          </div>
                          <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">Verified</span>
                        </div>
                        <div className="p-3 rounded-xl border border-zinc-200 bg-zinc-50/60 flex items-center justify-between">
                          <div className="flex items-center gap-2.5">
                            <FolderOpen className="w-5 h-5 text-blue-600" />
                            <div>
                              <div className="text-xs font-semibold text-zinc-900">WiFi_Bill_Receipt.pdf</div>
                              <div className="text-[10px] text-zinc-500 font-mono">₹799.00 • 112 KB</div>
                            </div>
                          </div>
                          <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">Verified</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'notifications' && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between pb-2 border-b border-zinc-100">
                        <div>
                          <div className="text-base font-bold text-zinc-900">Runway Alerts &amp; Advisories</div>
                          <div className="text-xs text-zinc-500">Autonomous budget notifications protecting month-end solvency</div>
                        </div>
                        <span className="text-xs font-mono bg-amber-50 text-amber-700 border border-amber-200 px-2.5 py-1 rounded font-semibold">
                          2 Priority Alerts
                        </span>
                      </div>
                      <div className="space-y-2.5 text-xs">
                        <div className="p-3 rounded-xl border border-emerald-200 bg-emerald-50/60 flex items-start gap-3">
                          <ShieldCheck className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                          <div>
                            <div className="font-bold text-emerald-950">Savings Cushion Safe</div>
                            <div className="text-emerald-800 text-[11px] mt-0.5">₹1,500.00 remains locked. You are projected to finish Day 30 with ₹1,820 surplus!</div>
                          </div>
                        </div>
                        <div className="p-3 rounded-xl border border-amber-200 bg-amber-50/60 flex items-start gap-3">
                          <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
                          <div>
                            <div className="font-bold text-amber-950">Daily Burn Warning</div>
                            <div className="text-amber-800 text-[11px] mt-0.5">Yesterday spend exceeded safe allowance by ₹81. Remaining daily ceiling adjusted to ₹338.75/day.</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
