'use client';

import React from 'react';
import { ArrowUpRight } from 'lucide-react';

/**
 * AuthOrbitalBackground
 * Decorative background for the auth pages with orbital geometry.
 */
export const AuthOrbitalBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none select-none z-0" aria-hidden="true">
      {/* Top-right orbital arc decoration */}
      <div className="hidden xl:block absolute top-12 right-2">
        <div className="relative w-[480px] h-[480px]">
          <svg width="480" height="480" viewBox="0 0 480 480" className="overflow-visible">
            <circle cx="240" cy="240" r="180" fill="none" stroke="rgba(32, 32, 82, 0.12)" strokeWidth="1" strokeDasharray="5 7" />
            <circle cx="240" cy="240" r="210" fill="none" stroke="rgba(32, 32, 82, 0.06)" strokeWidth="0.75" />
            <path d="M 60 240 A 180 180 0 0 1 420 240" fill="none" stroke="rgba(32, 32, 82, 0.18)" strokeWidth="1.2" />
            <circle cx="60" cy="240" r="3.5" fill="#38BDF8" />
            <circle cx="420" cy="240" r="4" fill="#F472B6" />
          </svg>

          {/* Status pill badge */}
          <div className="absolute top-10 right-4">
            <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-black/[0.08] shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-pink-500 animate-pulse" />
              <span className="font-serif italic text-zinc-700 text-xs tracking-wide">Zero sync drift verified.</span>
              <span className="text-[9px] font-mono uppercase tracking-wider text-zinc-400 border-l border-zinc-200 pl-2">SECURE SESSION</span>
              <ArrowUpRight className="w-3 h-3 text-zinc-400" />
            </div>
          </div>

          <div className="hidden 2xl:block absolute top-28 right-0">
            <div className="text-[10px] font-mono font-semibold tracking-[0.25em] text-zinc-400/80 uppercase" style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}>
              AUTH // KEYSTONE // 256-BIT
            </div>
          </div>
        </div>
      </div>

      {/* Bottom-left ambient arc */}
      <div className="hidden md:block absolute -bottom-20 -left-16 lg:left-2 opacity-70">
        <div className="relative w-[440px] h-[440px]">
          <svg width="320" height="320" viewBox="0 0 320 320" className="absolute top-12 left-12 overflow-visible">
            <circle cx="140" cy="160" r="100" fill="none" stroke="rgba(32, 32, 82, 0.12)" strokeWidth="1" strokeDasharray="4 6" />
            <path d="M 40 160 A 100 100 0 0 1 240 160" fill="none" stroke="rgba(32, 32, 82, 0.16)" strokeWidth="1" />
            <circle cx="40" cy="160" r="3" fill="#38BDF8" />
            <circle cx="240" cy="160" r="3" fill="#10B981" />
          </svg>
        </div>
      </div>
    </div>
  );
};
