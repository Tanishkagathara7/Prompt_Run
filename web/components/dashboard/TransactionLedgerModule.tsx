'use client';

import React, { useState } from 'react';
import {
  Plus,
  Trash2,
  Calendar,
  AlertCircle,
  Tag,
  CheckCircle,
  X,
  CreditCard,
  IndianRupee,
  Edit3,
} from 'lucide-react';
import { useFinancial } from '@/lib/context/FinancialContext';
import {
  ExpenseCategory,
  TransactionType,
  FinancialTransaction,
  formatINR,
  parseINRToPaise,
} from '@/lib/financialEngine';

const CATEGORY_LABELS: Record<ExpenseCategory, string> = {
  essential_rent_bills: 'Rent & Core Utilities',
  staple_groceries: 'Staple Groceries',
  transit_commute: 'Transit & Commute',
  medical_health: 'Medical & Health',
  discretionary_dining: 'Dining & Takeout',
  entertainment_shopping: 'Entertainment & Leisure',
  unexpected_emergency: 'Emergency & Repairs',
};

export const TransactionLedgerModule: React.FC = () => {
  const { transactions, addTransaction, updateTransaction, deleteTransaction, currentDay } = useFinancial();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTxId, setEditingTxId] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [amountRupees, setAmountRupees] = useState('');
  const [type, setType] = useState<TransactionType>('expense');
  const [category, setCategory] = useState<ExpenseCategory>('staple_groceries');
  const [isEssential, setIsEssential] = useState(true);
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const openAddModal = () => {
    setEditingTxId(null);
    setTitle('');
    setAmountRupees('');
    setType('expense');
    setCategory('staple_groceries');
    setIsEssential(true);
    setIsModalOpen(true);
  };

  const openEditModal = (tx: FinancialTransaction) => {
    setEditingTxId(tx.id);
    setTitle(tx.title);
    setAmountRupees((tx.amountPaise / 100).toString());
    setType(tx.type);
    setCategory(tx.category);
    setIsEssential(tx.isEssential);
    setIsModalOpen(true);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amountPaise = parseINRToPaise(amountRupees);
    if (!title.trim() || amountPaise <= 0) return;

    if (editingTxId) {
      updateTransaction(editingTxId, {
        title: title.trim(),
        amountPaise,
        type,
        category,
        isEssential: type === 'expense' ? isEssential : false,
      });
    } else {
      addTransaction({
        title: title.trim(),
        amountPaise,
        type,
        category,
        isEssential: type === 'expense' ? isEssential : false,
        date: new Date().toISOString().split('T')[0],
        notes: `Recorded on simulation day ${currentDay}`,
      });
    }

    setTitle('');
    setAmountRupees('');
    setEditingTxId(null);
    setIsModalOpen(false);
  };

  const filteredTransactions = transactions.filter((t) => {
    if (filterCategory === 'all') return true;
    if (filterCategory === 'essential') return t.isEssential;
    if (filterCategory === 'discretionary') return !t.isEssential && t.type === 'expense';
    if (filterCategory === 'income') return t.type === 'income';
    return t.category === filterCategory;
  });

  return (
    <div id="ledger" className="bg-white rounded-2xl sm:rounded-3xl border border-[#E6E9F0] p-4 sm:p-6 lg:p-8 shadow-sm space-y-5 sm:space-y-6">
      {/* Module Header */}
      <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-3 sm:gap-4 border-b border-[#E6E9F0] pb-4 sm:pb-5">
        <div>
          <div className="text-[10px] sm:text-xs font-bold text-[#68728A] uppercase tracking-wider">
            TRANSACTION & CASH LEDGER
          </div>
          <h3 className="text-lg sm:text-xl font-black text-[#101226] tracking-tight mt-0.5">
            Active 30-Day Cash Flow Records
          </h3>
          <p className="text-xs text-[#68728A] mt-0.5 sm:mt-1">
            Every transaction is verified in integer paise to eliminate rounding error across the budget runway.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="inline-flex items-center justify-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-[#101226] hover:bg-black text-white text-xs font-bold transition-all shadow-sm cursor-pointer self-start xs:self-auto shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add Transaction</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2">
        {[
          { id: 'all', label: 'All Records' },
          { id: 'essential', label: 'Essential Costs' },
          { id: 'discretionary', label: 'Discretionary' },
          { id: 'income', label: 'Income (+)' },
        ].map((f) => (
          <button
            key={f.id}
            onClick={() => setFilterCategory(f.id)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer border ${
              filterCategory === f.id
                ? 'bg-[#EDE9FE] text-[#5B45F5] border-[#5B45F5]/30'
                : 'bg-[#F8F9FC] text-[#68728A] border-[#E6E9F0] hover:text-[#101226]'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Transaction List */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-[#E6E9F0] text-[11px] font-bold text-[#68728A] uppercase tracking-wider">
              <th className="pb-3 px-3">Item / Description</th>
              <th className="pb-3 px-3">Classification</th>
              <th className="pb-3 px-3">Date</th>
              <th className="pb-3 px-3 text-right">Amount</th>
              <th className="pb-3 px-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E6E9F0]">
            {filteredTransactions.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-10 text-center text-zinc-400">
                  <div className="font-semibold text-zinc-600">No expenses or transactions logged yet.</div>
                  <div className="text-[11px] text-zinc-400 mt-1">Click &ldquo;+ Add Transaction&rdquo; above to record your first expense or income.</div>
                </td>
              </tr>
            ) : (
              filteredTransactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-[#F8F9FC] transition-colors">
                  <td className="py-3 px-3 font-bold text-[#101226]">
                    <div>{tx.title}</div>
                    {tx.notes && <div className="text-[11px] font-normal text-[#68728A]">{tx.notes}</div>}
                  </td>
                  <td className="py-3 px-3">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                        tx.type === 'income'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : tx.isEssential
                          ? 'bg-blue-50 text-blue-700 border-blue-200'
                          : 'bg-amber-50 text-amber-700 border-amber-200'
                      }`}
                    >
                      {tx.type === 'income' ? 'Income' : tx.isEssential ? 'Essential' : 'Discretionary'}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-[#68728A] font-mono text-[11px]">
                    {tx.date}
                  </td>
                  <td className="py-3 px-3 text-right font-black">
                    <span className={tx.type === 'income' ? 'text-emerald-600' : 'text-[#101226]'}>
                      {tx.type === 'income' ? '+' : '-'}{formatINR(tx.amountPaise)}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right">
                    <div className="inline-flex items-center gap-1 justify-end">
                      <button
                        onClick={() => openEditModal(tx)}
                        className="p-1.5 rounded-lg text-zinc-400 hover:text-[#5B45F5] hover:bg-[#EDE9FE] transition-colors cursor-pointer"
                        title="Edit record"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => deleteTransaction(tx.id)}
                        className="p-1.5 rounded-lg text-zinc-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                        title="Delete record"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Add / Edit Transaction Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-[100] animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl border border-zinc-200 space-y-5">
            <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
              <h4 className="text-base font-black text-[#101226]">
                {editingTxId ? 'Edit Transaction Record' : 'Log Real Transaction'}
              </h4>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-zinc-700 mb-1">
                  Description / Payee
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Grocery Store, Coffee, Book"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 text-xs focus:outline-none focus:border-[#5B45F5]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-zinc-700 mb-1">
                    Amount (₹ INR)
                  </label>
                  <input
                    type="number"
                    min="1"
                    step="1"
                    required
                    placeholder="e.g., 250"
                    value={amountRupees}
                    onChange={(e) => setAmountRupees(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 text-xs font-mono font-bold focus:outline-none focus:border-[#5B45F5]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-700 mb-1">
                    Flow Type
                  </label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value as TransactionType)}
                    className="w-full px-3 py-2.5 rounded-xl border border-zinc-200 text-xs bg-white focus:outline-none focus:border-[#5B45F5]"
                  >
                    <option value="expense">Expense (-)</option>
                    <option value="income">Income (+)</option>
                  </select>
                </div>
              </div>

              {type === 'expense' && (
                <>
                  <div>
                    <label className="block text-xs font-bold text-zinc-700 mb-1">
                      Expense Category
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value as ExpenseCategory)}
                      className="w-full px-3 py-2.5 rounded-xl border border-zinc-200 text-xs bg-white focus:outline-none focus:border-[#5B45F5]"
                    >
                      {Object.entries(CATEGORY_LABELS).map(([k, label]) => (
                        <option key={k} value={k}>
                          {label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <input
                      type="checkbox"
                      id="isEssentialInput"
                      checked={isEssential}
                      onChange={(e) => setIsEssential(e.target.checked)}
                      className="rounded border-zinc-300 text-[#5B45F5] focus:ring-0"
                    />
                    <label htmlFor="isEssentialInput" className="text-xs font-medium text-zinc-700 cursor-pointer">
                      Essential Expense (Survival Need vs Discretionary Want)
                    </label>
                  </div>
                </>
              )}

              <div className="pt-3 flex items-center justify-end gap-2 border-t border-zinc-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-zinc-200 text-xs font-semibold text-zinc-600 hover:bg-zinc-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#101226] text-white text-xs font-bold hover:bg-black cursor-pointer shadow-sm"
                >
                  {editingTxId ? 'Save Changes' : 'Confirm & Commit'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
