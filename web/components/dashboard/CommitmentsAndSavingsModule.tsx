'use client';

import React, { useState } from 'react';
import {
  CalendarClock,
  PiggyBank,
  Plus,
  Trash2,
  Check,
  X,
  Lock,
} from 'lucide-react';
import { useFinancial } from '@/lib/context/FinancialContext';
import {
  formatINR,
  parseINRToPaise,
} from '@/lib/financialEngine';

export const CommitmentsAndSavingsModule: React.FC = () => {
  const {
    commitments,
    toggleCommitment,
    deleteCommitment,
    addCommitment,
    savingsGoals,
    addSavingsGoal,
    contributeToGoal,
    withdrawFromGoal,
    currentDay,
    metrics,
  } = useFinancial();

  const [newSubName, setNewSubName] = useState('');
  const [newSubRupees, setNewSubRupees] = useState('');
  const [newSubDueDay, setNewSubDueDay] = useState(25);
  const [isSubEssential, setIsSubEssential] = useState(false);
  const [showSubModal, setShowSubModal] = useState(false);

  const [depositGoalId, setDepositGoalId] = useState<string | null>(null);
  const [depositAmountRupees, setDepositAmountRupees] = useState('');

  const [withdrawGoalId, setWithdrawGoalId] = useState<string | null>(null);
  const [withdrawAmountRupees, setWithdrawAmountRupees] = useState('');

  const [showGoalModal, setShowGoalModal] = useState(false);
  const [newGoalName, setNewGoalName] = useState('');
  const [newGoalTargetRupees, setNewGoalTargetRupees] = useState('');
  const [newGoalDeadline, setNewGoalDeadline] = useState(30);

  const handleAddGoal = (e: React.FormEvent) => {
    e.preventDefault();
    const targetPaise = parseINRToPaise(newGoalTargetRupees);
    if (!newGoalName.trim() || targetPaise <= 0) return;

    addSavingsGoal({
      name: newGoalName.trim(),
      targetAmountPaise: targetPaise,
      currentAmountPaise: 0,
      deadlineDay: newGoalDeadline,
    });

    setNewGoalName('');
    setNewGoalTargetRupees('');
    setShowGoalModal(false);
  };

  const handleAddSub = (e: React.FormEvent) => {
    e.preventDefault();
    const amountPaise = parseINRToPaise(newSubRupees);
    if (!newSubName.trim() || amountPaise <= 0) return;

    addCommitment({
      name: newSubName.trim(),
      amountPaise,
      dueDay: newSubDueDay,
      frequency: 'monthly',
      isEssential: isSubEssential,
      category: isSubEssential ? 'essential_rent_bills' : 'entertainment_shopping',
      isActive: true,
    });

    setNewSubName('');
    setNewSubRupees('');
    setShowSubModal(false);
  };

  const handleDeposit = (goalId: string) => {
    const amountPaise = parseINRToPaise(depositAmountRupees);
    if (amountPaise > 0) {
      contributeToGoal(goalId, amountPaise);
      setDepositGoalId(null);
      setDepositAmountRupees('');
    }
  };

  const handleWithdraw = (goalId: string) => {
    const amountPaise = parseINRToPaise(withdrawAmountRupees);
    if (amountPaise > 0) {
      withdrawFromGoal(goalId, amountPaise);
      setWithdrawGoalId(null);
      setWithdrawAmountRupees('');
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
      {/* 1. Commitments & Subscriptions (7 Cols) */}
      <div className="lg:col-span-7 bg-white rounded-2xl sm:rounded-3xl border border-[#E6E9F0] p-4 sm:p-6 lg:p-8 shadow-sm flex flex-col justify-between space-y-5 sm:space-y-6">
        <div>
          <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-3 border-b border-[#E6E9F0] pb-4">
            <div>
              <div className="flex items-center gap-2">
                <CalendarClock className="w-4 h-4 text-[#5B45F5]" />
                <span className="text-[10px] sm:text-xs font-bold text-[#68728A] uppercase tracking-wider">
                  COMMITMENTS & SUBSCRIPTIONS
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-black text-[#101226] mt-0.5">
                Upcoming Scheduled Obligations
              </h3>
            </div>

            <button
              onClick={() => setShowSubModal(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#F8F9FC] hover:bg-[#EDE9FE] text-[#5B45F5] border border-[#E6E9F0] text-xs font-bold transition-colors cursor-pointer self-start xs:self-auto"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Bill</span>
            </button>
          </div>

          <div className="divide-y divide-[#E6E9F0] mt-3">
            {commitments.length === 0 ? (
              <div className="py-8 text-center text-zinc-400 text-xs">No recurring commitments tracked.</div>
            ) : (
              commitments.map((comm) => {
                const isPast = comm.dueDay < currentDay;
                return (
                  <div key={comm.id} className="py-3.5 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => toggleCommitment(comm.id)}
                        className={`w-6 h-6 rounded-lg border flex items-center justify-center transition-colors cursor-pointer ${
                          comm.isActive
                            ? 'bg-[#101226] border-[#101226] text-white'
                            : 'bg-zinc-50 border-zinc-300 text-transparent'
                        }`}
                        title={comm.isActive ? 'Active commitment' : 'Paused / Cancelled'}
                      >
                        <Check className="w-3.5 h-3.5" />
                      </button>

                      <div>
                        <div className={`text-xs font-bold ${comm.isActive ? 'text-[#101226]' : 'text-zinc-400 line-through'}`}>
                          {comm.name}
                        </div>
                        <div className="text-[11px] text-[#68728A] flex items-center gap-2">
                          <span>Due Day {comm.dueDay} of 30</span>
                          <span>•</span>
                          <span className={comm.isEssential ? 'text-blue-600 font-semibold' : 'text-zinc-500'}>
                            {comm.isEssential ? 'Essential Bill' : 'Optional Service'}
                          </span>
                          {isPast && <span className="text-emerald-600 font-bold">• Due Passed</span>}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-xs font-black text-[#101226]">
                        {formatINR(comm.amountPaise)}
                      </span>
                      <button
                        onClick={() => deleteCommitment(comm.id)}
                        className="p-1 text-zinc-300 hover:text-rose-600 transition-colors cursor-pointer"
                        title="Delete commitment"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-[#F8F9FC] border border-[#E6E9F0] text-xs text-[#68728A] flex items-center justify-between">
          <span>Total upcoming commitments reserved from runway:</span>
          <span className="font-black text-[#101226]">
            {formatINR(metrics.upcomingCommitmentsPaise)}
          </span>
        </div>
      </div>

      {/* 2. Protected Savings Goals (5 Cols) */}
      <div className="lg:col-span-5 bg-white rounded-2xl sm:rounded-3xl border border-[#E6E9F0] p-4 sm:p-6 lg:p-8 shadow-sm flex flex-col justify-between space-y-5 sm:space-y-6">
        <div>
          <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-3 border-b border-[#E6E9F0] pb-4">
            <div>
              <div className="flex items-center gap-2">
                <PiggyBank className="w-4 h-4 text-emerald-600" />
                <span className="text-[10px] sm:text-xs font-bold text-[#68728A] uppercase tracking-wider">
                  PROTECTED SAVINGS GOALS
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-black text-[#101226] mt-0.5">
                Shielded Cash Reserves
              </h3>
            </div>

            <div className="flex items-center gap-2 self-start xs:self-auto">
              <button
                onClick={() => setShowGoalModal(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#F8F9FC] hover:bg-[#DCFCE7] text-emerald-700 border border-[#E6E9F0] text-xs font-bold transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>New Goal</span>
              </button>

              <div className="px-2.5 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 font-mono text-xs font-bold">
                <Lock className="w-3.5 h-3.5 inline mr-1" />
                <span>{formatINR(metrics.protectedSavingsPaise)}</span>
              </div>
            </div>
          </div>

          <div className="space-y-4 mt-4">
            {savingsGoals.length === 0 ? (
              <div className="py-8 text-center text-zinc-400 text-xs">
                No savings goals created yet. Click &ldquo;+ New Goal&rdquo; above to set up a target!
              </div>
            ) : (
              savingsGoals.map((g) => {
                const progressPct = Math.min(100, Math.round((g.currentAmountPaise / g.targetAmountPaise) * 100));
                return (
                  <div key={g.id} className="p-4 rounded-2xl bg-[#F8F9FC] border border-[#E6E9F0] space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-xs font-bold text-[#101226]">{g.name}</div>
                        <div className="text-[11px] text-[#68728A]">Target: {formatINR(g.targetAmountPaise)} by Day {g.deadlineDay}</div>
                      </div>
                      <span className="text-xs font-mono font-bold text-emerald-600 bg-white px-2 py-0.5 rounded-lg border border-[#E6E9F0]">
                        {progressPct}%
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-zinc-200 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-emerald-500 h-full rounded-full transition-all duration-300"
                        style={{ width: `${progressPct}%` }}
                      />
                    </div>

                    <div className="flex items-center justify-between text-xs pt-1">
                      <span className="text-[#68728A] text-[11px]">
                        Locked: <strong className="text-[#101226]">{formatINR(g.currentAmountPaise)}</strong>
                      </span>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => {
                            setWithdrawGoalId(null);
                            setDepositGoalId(g.id);
                          }}
                          className="px-2.5 py-1 rounded-lg bg-emerald-600 text-white font-bold text-[10px] hover:bg-emerald-700 transition-colors cursor-pointer"
                        >
                          + Deposit
                        </button>
                        {g.currentAmountPaise > 0 && (
                          <button
                            onClick={() => {
                              setDepositGoalId(null);
                              setWithdrawGoalId(g.id);
                            }}
                            className="px-2.5 py-1 rounded-lg bg-white border border-zinc-200 text-zinc-700 font-bold text-[10px] hover:bg-zinc-50 transition-colors cursor-pointer"
                            title="Unlock funds for emergency spending"
                          >
                            Unlock Funds
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Inline Deposit Field */}
                    {depositGoalId === g.id && (
                      <div className="pt-2 flex items-center gap-2">
                        <input
                          type="number"
                          min="1"
                          placeholder="₹ Amount to Deposit"
                          value={depositAmountRupees}
                          onChange={(e) => setDepositAmountRupees(e.target.value)}
                          className="w-full px-2.5 py-1.5 bg-white border border-zinc-300 rounded-lg text-xs"
                        />
                        <button
                          onClick={() => handleDeposit(g.id)}
                          className="px-3 py-1.5 bg-[#101226] text-white text-xs font-bold rounded-lg cursor-pointer"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setDepositGoalId(null)}
                          className="p-1.5 text-zinc-400 hover:text-zinc-600 cursor-pointer"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}

                    {/* Inline Withdraw Field */}
                    {withdrawGoalId === g.id && (
                      <div className="pt-2 flex items-center gap-2">
                        <input
                          type="number"
                          min="1"
                          placeholder="₹ Amount to Unlock"
                          value={withdrawAmountRupees}
                          onChange={(e) => setWithdrawAmountRupees(e.target.value)}
                          className="w-full px-2.5 py-1.5 bg-white border border-zinc-300 rounded-lg text-xs"
                        />
                        <button
                          onClick={() => handleWithdraw(g.id)}
                          className="px-3 py-1.5 bg-rose-600 text-white text-xs font-bold rounded-lg cursor-pointer"
                        >
                          Unlock
                        </button>
                        <button
                          onClick={() => setWithdrawGoalId(null)}
                          className="p-1.5 text-zinc-400 hover:text-zinc-600 cursor-pointer"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-emerald-50/60 border border-emerald-100 text-[11px] text-emerald-900 leading-snug">
          💡 Money locked in goals is automatically deducted from your daily safe-spend budget to safeguard you from accidental impulse spending.
        </div>
      </div>

      {/* Add Subscription Modal */}
      {showSubModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-[100] animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl border border-zinc-200 space-y-5">
            <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
              <h4 className="text-base font-black text-[#101226]">Track New Commitment</h4>
              <button
                onClick={() => setShowSubModal(false)}
                className="p-1 rounded-lg text-zinc-400 hover:text-zinc-700 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddSub} className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold text-[#68728A] mb-1">SERVICE / BILL NAME</label>
                <input
                  type="text"
                  value={newSubName}
                  onChange={(e) => setNewSubName(e.target.value)}
                  placeholder="e.g. Electricity Bill or Gym Membership"
                  required
                  className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs text-zinc-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#5B45F5]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-[#68728A] mb-1">AMOUNT (₹ INR)</label>
                  <input
                    type="number"
                    min="1"
                    value={newSubRupees}
                    onChange={(e) => setNewSubRupees(e.target.value)}
                    placeholder="e.g. 499"
                    required
                    className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs text-zinc-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#5B45F5]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#68728A] mb-1">DUE ON DAY (1-30)</label>
                  <input
                    type="number"
                    min="1"
                    max="30"
                    value={newSubDueDay}
                    onChange={(e) => setNewSubDueDay(parseInt(e.target.value, 10))}
                    required
                    className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs text-zinc-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#5B45F5]"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="isSubEssential"
                  checked={isSubEssential}
                  onChange={(e) => setIsSubEssential(e.target.checked)}
                  className="w-4 h-4 rounded text-[#5B45F5]"
                />
                <label htmlFor="isSubEssential" className="text-xs font-semibold text-[#101226] cursor-pointer">
                  Non-negotiable essential bill (e.g. utilities)
                </label>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-zinc-100">
                <button
                  type="button"
                  onClick={() => setShowSubModal(false)}
                  className="px-4 py-2 rounded-xl border border-zinc-200 text-xs font-bold text-zinc-600 hover:bg-zinc-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#101226] text-white text-xs font-bold hover:bg-black shadow-sm cursor-pointer"
                >
                  Track Commitment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Savings Goal Modal */}
      {showGoalModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-[100] animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl border border-zinc-200 space-y-5">
            <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
              <h4 className="text-base font-black text-[#101226]">Create Savings Goal</h4>
              <button
                onClick={() => setShowGoalModal(false)}
                className="p-1 rounded-lg text-zinc-400 hover:text-zinc-700 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddGoal} className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold text-[#68728A] mb-1">GOAL NAME / PURPOSE</label>
                <input
                  type="text"
                  value={newGoalName}
                  onChange={(e) => setNewGoalName(e.target.value)}
                  placeholder="e.g. Month-End Rent Cushion or Emergency Medical"
                  required
                  className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs text-zinc-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-[#68728A] mb-1">TARGET (₹ INR)</label>
                  <input
                    type="number"
                    min="1"
                    value={newGoalTargetRupees}
                    onChange={(e) => setNewGoalTargetRupees(e.target.value)}
                    placeholder="e.g. 2000"
                    required
                    className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs text-zinc-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#68728A] mb-1">DEADLINE DAY (1-30)</label>
                  <input
                    type="number"
                    min="1"
                    max="30"
                    value={newGoalDeadline}
                    onChange={(e) => setNewGoalDeadline(parseInt(e.target.value, 10))}
                    required
                    className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs text-zinc-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                </div>
              </div>

              <div className="p-3 rounded-xl bg-emerald-50 text-[11px] text-emerald-800 leading-snug">
                Protected funds are shielded from daily discretionary spending to ensure you reach day 30 with reserves.
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-zinc-100">
                <button
                  type="button"
                  onClick={() => setShowGoalModal(false)}
                  className="px-4 py-2 rounded-xl border border-zinc-200 text-xs font-bold text-zinc-600 hover:bg-zinc-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-700 text-white text-xs font-bold hover:bg-emerald-800 shadow-sm cursor-pointer"
                >
                  Create Goal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
