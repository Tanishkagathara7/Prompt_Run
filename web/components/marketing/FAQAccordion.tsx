'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export const FAQAccordion: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FAQItem[] = [
    {
      id: '01',
      question: 'How is the safe daily burn allowance calculated?',
      answer:
        'The engine takes your total remaining balance (from ₹10,000 starting budget), automatically subtracts all locked recurring commitments (such as rent and utility bills) and your protected savings cushion, and divides the remaining discretionary amount by the exact days left in the month. This gives you an unshakeable daily spending ceiling.',
    },
    {
      id: '02',
      question: 'Why does SurvivalRun use integer paise math instead of standard decimals?',
      answer:
        'Floating-point numbers in JavaScript can cause precision drift (like 0.1 + 0.2 = 0.30000000000000004). SurvivalRun stores and calculates every transaction in integer paise (1 Rupee = 100 paise), guaranteeing 100% mathematical accuracy across 30 days of micro-transactions with zero rounding errors.',
    },
    {
      id: '03',
      question: 'How does the "What-If" decision simulator protect against impulsive spending?',
      answer:
        'Before committing to an unplanned purchase (e.g., dining out or electronics), you enter the tentative amount into the simulator. It instantly projects your new daily safe allowance for the rest of the month and highlights potential deficit risk, allowing you to make conscious financial choices before parting with your cash.',
    },
    {
      id: '04',
      question: 'What happens to recurring commitments like rent or Wi-Fi bills?',
      answer:
        'Fixed bills are flagged as locked commitments. The moment they are entered, their total is ring-fenced from your daily spending allowance so you never accidentally spend rent money on everyday groceries.',
    },
    {
      id: '05',
      question: 'Can I lock an emergency savings cushion?',
      answer:
        'Yes. You can reserve a dedicated savings buffer (e.g., ₹1,000 to ₹2,000). The runway dashboard treats this buffer as quarantined capital, ensuring you finish the 30-day challenge with a surplus rather than hitting zero.',
    },
  ];

  return (
    <div className="space-y-3 select-none">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={faq.id}
            className={`faq-accordion-item bento-card overflow-hidden transition-all duration-300 ${
              isOpen ? 'border-blue-500/40 shadow-md ring-1 ring-blue-500/10' : 'hover:border-black/[0.14]'
            }`}
          >
            <button
              onClick={() => setOpenIndex(isOpen ? null : index)}
              aria-expanded={isOpen}
              className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-semibold text-zinc-900 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-xl"
            >
              <span className="text-base sm:text-lg tracking-tight">
                {faq.question}
              </span>
              <span
                className={`p-2 rounded-lg border border-black/[0.06] transition-transform duration-300 ${
                  isOpen
                    ? 'rotate-180 bg-blue-50 text-blue-600 border-blue-200 shadow-xs'
                    : 'bg-zinc-50 text-zinc-500'
                }`}
              >
                <ChevronDown className="w-4 h-4" />
              </span>
            </button>

            {/* Smooth CSS Grid Height Transition without layout jumps */}
            <div
              className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
                isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
              }`}
            >
              <div className="overflow-hidden">
                <div className="px-5 sm:px-6 pb-6 pt-0 text-sm text-zinc-600 leading-relaxed border-t border-black/[0.04]">
                  <div className="pt-4">{faq.answer}</div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
