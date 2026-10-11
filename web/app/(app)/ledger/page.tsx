'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Wallet, ShieldCheck, IndianRupee } from 'lucide-react';
import { TransactionLedgerModule } from '@/components/dashboard/TransactionLedgerModule';
import { useFinancial } from '@/lib/context/FinancialContext';
import { formatINR } from '@/lib/financialEngine';

export default function LedgerPage() {
  const { metrics, currentDay } = useFinancial();

  return (
    <div className="space-y-6 pb-16">
      {/* Top Navigation & Context Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white rounded-2xl sm:rounded-3xl border border-[#E6E9F0] p-4 sm:p-6 shadow-sm">
        <div className="flex items-start sm:items-center gap-3 sm:gap-4">
          <Link
            href="/dashboard"
            className="p-2 sm:p-2.5 rounded-xl sm:rounded-2xl bg-[#F8F9FC] border border-[#E6E9F0] text-[#68728A] hover:text-[#101226] hover:bg-[#EEF2F6] transition-all cursor-pointer shrink-0 mt-0.5 sm:mt-0"
            title="Return to Runway Dashboard"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </Link>
          <div>
            <div className="text-[10px] sm:text-xs font-bold text-[#68728A] uppercase tracking-wider">
              FINANCIAL RUNWAY • DAY {currentDay} OF 30
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-[#101226] tracking-tight mt-0.5">
              Expense & Cash Flow Ledger
            </h1>
            <p className="text-xs text-[#68728A] mt-1 leading-relaxed">
              Dedicated ledger view for logging, editing, and auditing all cash movements with integer paise precision.
            </p>
          </div>
        </div>

        {/* Quick Snapshot Badges */}
        <div className="flex items-center gap-2 sm:gap-3 self-stretch sm:self-auto justify-between sm:justify-end pt-2 sm:pt-0 border-t sm:border-t-0 border-[#E6E9F0]">
          <div className="flex-1 sm:flex-initial px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl bg-[#F8F9FC] border border-[#E6E9F0] text-center sm:text-right">
            <span className="block text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-[#68728A]">
              Remaining Runway
            </span>
            <span className="text-xs sm:text-sm font-black text-[#101226]">
              {formatINR(metrics.remainingSpendablePaise)}
            </span>
          </div>

          <div className="flex-1 sm:flex-initial px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl bg-[#5B45F5]/10 border border-[#5B45F5]/20 text-center sm:text-right">
            <span className="block text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-[#5B45F5]">
              Daily Spend Limit
            </span>
            <span className="text-xs sm:text-sm font-black text-[#5B45F5]">
              {formatINR(metrics.safeDailyAllowancePaise)}/day
            </span>
          </div>
        </div>
      </div>

      {/* Primary Dedicated Ledger Component */}
      <TransactionLedgerModule />
    </div>
  );
}
