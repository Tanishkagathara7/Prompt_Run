'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Code2,
  Monitor,
  Smartphone,
  Sparkles,
} from 'lucide-react';
import { MarketingNav } from '@/components/marketing/MarketingNav';
import { Highlight } from '@/components/marketing/Highlight';
import { InteractiveDemonstrator } from '@/components/marketing/InteractiveDemonstrator';
import { ArchitectureDiagram } from '@/components/marketing/ArchitectureDiagram';
import { HeroProductShowcase } from '@/components/marketing/HeroProductShowcase';
import { FAQAccordion } from '@/components/marketing/FAQAccordion';
import { MarketingFooter } from '@/components/marketing/MarketingFooter';
import { SmoothScrollProvider } from '@/components/marketing/SmoothScrollProvider';
import { scrollTo } from '@/lib/animations/lenis';
import { createHeroEntranceTimeline } from '@/lib/animations/hero';
import { initScrollStory } from '@/lib/animations/scroll';
import { initHeroTypographyAnimation } from '@/lib/animations/heroTypography';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { domainConfig } from '@/lib/domain.config';
import { EditorialBackgroundSystem } from '@/components/background/EditorialBackgroundSystem';
import { LoadingScreen } from '@/components/loading/LoadingScreen';
import { useLoading } from '@/lib/context/LoadingContext';
import { TiltCard } from '@/components/ui/TiltCard';

export default function MarketingPage() {
  const rootRef = useRef<HTMLDivElement>(null);


  const { isLoading } = useLoading();
  const heroCtxRef = useRef<gsap.Context | null>(null);
  const typoAnimRef = useRef<{ cleanup: () => void } | null>(null);
  const scrollCtxRef = useRef<gsap.Context | null>(null);

  useEffect(() => {
    // If still loading (initial site visit), wait for loader to complete
    if (isLoading) return;

    // Clean up any prior animation context before re-initializing
    if (heroCtxRef.current) {
      heroCtxRef.current.revert();
      heroCtxRef.current = null;
    }
    if (typoAnimRef.current) {
      typoAnimRef.current.cleanup();
      typoAnimRef.current = null;
    }
    if (scrollCtxRef.current) {
      scrollCtxRef.current.revert();
      scrollCtxRef.current = null;
    }

    // 1. Run the cohesive hero entrance timeline
    heroCtxRef.current = createHeroEntranceTimeline(rootRef.current);
    // 2. Start the word highlight animation synchronized right with the hero reveal
    typoAnimRef.current = initHeroTypographyAnimation(rootRef.current);
    // 3. Init scroll-driven storytelling
    scrollCtxRef.current = initScrollStory(rootRef.current);
    // Small rAF delay lets the browser paint before Refresh
    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });

    return () => {
      heroCtxRef.current?.revert();
      heroCtxRef.current = null;
      typoAnimRef.current?.cleanup();
      typoAnimRef.current = null;
      scrollCtxRef.current?.revert();
      scrollCtxRef.current = null;
    };
  }, [isLoading]);

  return (
    <SmoothScrollProvider>
      {/* Top-Level High-End Technical Product Initialization Overlay */}
      <LoadingScreen />

      <div
        ref={rootRef}
        className="min-h-screen text-zinc-900 selection:bg-zinc-900 selection:text-white relative isolate overflow-clip font-sans bg-[#FBF9F4]"
      >
        {/* Full-Page Editorial Decorative SVG Background System */}
        <EditorialBackgroundSystem />

        <MarketingNav />

        {/* ========================================================
            01. HERO SECTION: BENTO COMPOSITION & EDITORIAL TYPOGRAPHY
           ======================================================== */}
        <section className="hero-section relative min-h-screen flex flex-col justify-center items-center pt-24 sm:pt-28 pb-16 sm:pb-24 px-4 sm:px-6 overflow-hidden border-b border-black/[0.06]">
          {/* Subtle ambient lighting accent matching Auth view */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-tr from-blue-500/5 via-indigo-500/5 to-transparent blur-3xl pointer-events-none -z-10" />
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-500/[0.03] rounded-full blur-3xl pointer-events-none -translate-y-1/2 -z-10" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-pink-500/[0.025] rounded-full blur-3xl pointer-events-none translate-y-1/2 -z-10" />

          <div className="max-w-5xl mx-auto relative z-10 space-y-8 hero-text-container text-center flex flex-col items-center">
            {/* Editorial Display Headline — Unified Color with Kinetic Multi-Color Animated Transitions */}
            <div className="hero-headline-wrapper space-y-1.5 sm:space-y-3 max-w-4xl lg:max-w-5xl cursor-default select-none mx-auto py-1">
              <h1 className="text-5xl sm:text-7xl lg:text-[5.25rem] xl:text-[5.75rem] font-extrabold tracking-tight leading-[1.10] sm:leading-[1.07] text-center text-[#1E1B4B]">
                {/* Line 1: Survive Budget */}
                <div className="hero-headline-1 flex flex-wrap items-center justify-center gap-2 sm:gap-3 opacity-0">
                  <span
                    className="hero-anim-word relative inline-block px-1.5 sm:px-2 py-0.5 rounded-xl sm:rounded-2xl"
                    data-word="survive"
                    data-text-color="#FFFFFF"
                    data-base-color="#1E1B4B"
                  >
                    <span
                      className="word-highlight-bg absolute inset-0 rounded-xl sm:rounded-2xl opacity-0 pointer-events-none"
                      style={{ backgroundColor: '#5B45F5' }}
                    />
                    <span className="word-text relative z-10 text-[#1E1B4B] font-extrabold tracking-tight">
                      Survive
                    </span>
                  </span>

                  <span
                    className="hero-anim-word relative inline-block px-1.5 sm:px-2 py-0.5 rounded-xl sm:rounded-2xl"
                    data-word="budget"
                    data-text-color="#FFFFFF"
                    data-base-color="#1E1B4B"
                  >
                    <span
                      className="word-highlight-bg absolute inset-0 rounded-xl sm:rounded-2xl opacity-0 pointer-events-none"
                      style={{ backgroundColor: '#16B981' }}
                    />
                    <span className="word-text relative z-10 text-[#1E1B4B] font-extrabold tracking-tight">
                      Budget
                    </span>
                  </span>
                </div>

                {/* Line 2: for 30-Days */}
                <div className="hero-headline-2 flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-0.5 opacity-0">
                  <span
                    className="hero-anim-word relative inline-block px-1.5 sm:px-2 py-0.5 rounded-xl sm:rounded-2xl"
                    data-word="for-1"
                    data-text-color="#FFFFFF"
                    data-base-color="#1E1B4B"
                  >
                    <span
                      className="word-highlight-bg absolute inset-0 rounded-xl sm:rounded-2xl opacity-0 pointer-events-none"
                      style={{ backgroundColor: '#F59E0B' }}
                    />
                    <span className="word-text relative z-10 text-[#1E1B4B] font-extrabold tracking-tight">
                      for
                    </span>
                  </span>

                  <span
                    className="hero-anim-word relative inline-block px-1.5 sm:px-2 py-0.5 rounded-xl sm:rounded-2xl"
                    data-word="days-1"
                    data-text-color="#FFFFFF"
                    data-base-color="#1E1B4B"
                  >
                    <span
                      className="word-highlight-bg absolute inset-0 rounded-xl sm:rounded-2xl opacity-0 pointer-events-none"
                      style={{ backgroundColor: '#2563EB' }}
                    />
                    <span className="word-text relative z-10 text-[#1E1B4B] font-extrabold tracking-tight">
                      30-Days
                    </span>
                  </span>
                </div>

                {/* Line 3: with ₹10,000 Zero Deficit. */}
                <div className="hero-headline-3 flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-0.5 opacity-0">
                  <span
                    className="hero-anim-word relative inline-block px-1.5 sm:px-2 py-0.5 rounded-xl sm:rounded-2xl"
                    data-word="with-1"
                    data-text-color="#FFFFFF"
                    data-base-color="#1E1B4B"
                  >
                    <span
                      className="word-highlight-bg absolute inset-0 rounded-xl sm:rounded-2xl opacity-0 pointer-events-none"
                      style={{ backgroundColor: '#8B5CF6' }}
                    />
                    <span className="word-text relative z-10 text-[#1E1B4B] font-extrabold tracking-tight">
                      with
                    </span>
                  </span>

                  <span
                    className="hero-anim-word relative inline-block px-1.5 sm:px-2 py-0.5 rounded-xl sm:rounded-2xl"
                    data-word="amount-1"
                    data-text-color="#FFFFFF"
                    data-base-color="#1E1B4B"
                  >
                    <span
                      className="word-highlight-bg absolute inset-0 rounded-xl sm:rounded-2xl opacity-0 pointer-events-none"
                      style={{ backgroundColor: '#10B981' }}
                    />
                    <span className="word-text relative z-10 text-[#1E1B4B] font-extrabold tracking-tight">
                      ₹10,000
                    </span>
                  </span>

                  <span
                    className="hero-anim-word relative inline-block px-1.5 sm:px-2 py-0.5 rounded-xl sm:rounded-2xl"
                    data-word="zero"
                    data-text-color="#FFFFFF"
                    data-base-color="#1E1B4B"
                  >
                    <span
                      className="word-highlight-bg absolute inset-0 rounded-xl sm:rounded-2xl opacity-0 pointer-events-none"
                      style={{ backgroundColor: '#EC4899' }}
                    />
                    <span className="word-text relative z-10 text-[#1E1B4B] font-extrabold tracking-tight">
                      Zero
                    </span>
                  </span>

                  <span
                    className="hero-anim-word relative inline-block px-1.5 sm:px-2 py-0.5 rounded-xl sm:rounded-2xl"
                    data-word="deficit"
                    data-text-color="#FFFFFF"
                    data-base-color="#1E1B4B"
                  >
                    <span
                      className="word-highlight-bg absolute inset-0 rounded-xl sm:rounded-2xl opacity-0 pointer-events-none"
                      style={{ backgroundColor: '#5B45F5' }}
                    />
                    <span className="word-text relative z-10 text-[#1E1B4B] font-extrabold tracking-tight">
                      Deficit
                    </span>
                  </span>
                </div>
              </h1>
            </div>

            {/* Value Proposition & CTAs (Centered, Balanced Rhythm) */}
            <div className="max-w-2xl mx-auto space-y-6 pt-1">
              <p className="hero-copy text-base sm:text-lg text-zinc-600 leading-relaxed font-normal text-center" style={{ opacity: 0 }}>
                Live financial command center designed to conquer the 30-day survival challenge with ₹10,000. Balance daily allowances, simulate &ldquo;What If?&rdquo; impulse buys, shield emergency savings, and guarantee zero month-end deficit.
              </p>

              <div className="hero-cta flex flex-wrap items-center justify-center gap-3.5" style={{ opacity: 0 }}>
                <Link
                  href={domainConfig.landing.hero.ctaPrimary.href}
                  className="btn-primary px-7 py-3.5 text-xs font-semibold tracking-wide shadow-md shadow-zinc-950/10 inline-flex items-center"
                >
                  <span>{domainConfig.landing.hero.ctaPrimary.label}</span>
                  <ArrowUpRight className="w-4 h-4 ml-1.5 opacity-80" />
                </Link>
                <Link
                  href="#product"
                  onClick={(e: React.MouseEvent) => {
                    e.preventDefault();
                    const el = document.getElementById('product');
                    if (el) {
                      scrollTo(el, { offset: -80 });
                      window.history.pushState(null, '', '#product');
                    }
                  }}
                  className="btn-secondary px-6 py-3.5 text-xs font-semibold cursor-pointer shadow-sm hover:shadow inline-flex items-center border border-zinc-300/90 bg-white/95 hover:bg-zinc-50"
                  aria-label="Explore platform features"
                >
                  <span>{domainConfig.landing.hero.ctaSecondary.label}</span>
                  <ArrowUpRight className="w-4 h-4 ml-1.5 opacity-60" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            01.5 PRODUCT STAGE SHOWCASE (DEDICATED SECTION)
           ======================================================== */}
        <section id="product" className="product-stage-section relative pt-6 sm:pt-10 pb-8 sm:pb-12 px-4 sm:px-6 border-b border-black/[0.06] scroll-mt-20">
          <div className="max-w-5xl mx-auto relative z-10">
            <div className="hero-product-stage">
              <HeroProductShowcase />
            </div>
          </div>
        </section>

        {/* ========================================================
            02. EDITORIAL STATEMENT: CINEMATIC CONTRAST
           ======================================================== */}
        <section className="section-philosophy py-10 sm:py-14 px-4 sm:px-6 border-b border-black/[0.06]">
          <div className="max-w-5xl mx-auto space-y-5">
            <div className="philosophy-eyebrow font-mono text-xs font-semibold uppercase tracking-wider text-emerald-600">
              {'// 02. BUDGET SURVIVAL PHILOSOPHY'}
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-zinc-950 leading-tight">
              <span className="philosophy-heading-line block overflow-hidden">
                BUILT FOR ₹10,000 BUDGET SURVIVAL.
              </span>
              <span className="philosophy-heading-line block overflow-hidden mt-1 sm:mt-2">
                ENGINEERED FOR{' '}
                <span className="philosophy-highlight inline-block">
                  <Highlight variant="green">ZERO DEFICIT.</Highlight>
                </span>
              </span>
            </h2>
            <p className="philosophy-body text-base sm:text-xl text-zinc-600 leading-relaxed max-w-3xl font-normal">
              Most personal finance apps are passive record-keepers. SurvivalRun is an active financial co-pilot built for tight 30-day horizons. It treats every rupee as a unit of runway, enforces safe daily burn limits, and stops impulsive debt before it happens.
            </p>
          </div>
        </section>

        {/* ========================================================
            03. PRODUCT EXPERIENCE: BENTO GRID CAPABILITIES
           ======================================================== */}
        <section id="platform" className="section-parity py-12 sm:py-16 px-4 sm:px-6 border-b border-black/[0.06] scroll-mt-20">
          <div className="max-w-6xl mx-auto space-y-12">
            <div className="parity-header max-w-3xl space-y-2">
              <div className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-500">
                {'// 03. RUNWAY CAPABILITIES'}
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900">
                Engineered for High-Pressure Budgeting &amp; Deficit Elimination
              </h2>
            </div>

            {/* Asymmetric 2-Column Bento Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              {/* Desktop Client Bento Card */}
              <div className="parity-card lg:col-span-6 bento-card p-8 flex flex-col justify-between space-y-6 bg-white/80 backdrop-blur-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-200/60 shadow-sm">
                    <Monitor className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-zinc-900 tracking-tight">
                    Dynamic Daily Burn Calculator
                  </h3>
                  <p className="text-sm text-zinc-600 leading-relaxed">
                    Automatically computes your uncompromised daily safe-spend allowance after subtracting locked commitments (rent, utilities) and emergency cushion across all 30 days.
                  </p>
                </div>
                <div className="pt-6 border-t border-black/[0.06] space-y-2.5 text-xs font-medium text-zinc-700">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Real-Time Daily Allowance Recalculation</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Protected Emergency Buffer Locking</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Sub-25ms Live Dashboard Hydration</span>
                  </div>
                </div>
              </div>

              {/* Express REST & AI Engine Bento Card */}
              <div className="parity-card lg:col-span-6 bento-card p-8 flex flex-col justify-between space-y-6 bg-white/80 backdrop-blur-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-200/60 shadow-sm">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-zinc-900 tracking-tight">
                    What-If Decision Simulator &amp; Paise Precision
                  </h3>
                  <p className="text-sm text-zinc-600 leading-relaxed">
                    Test impulse purchases before parting with your money. Experience zero floating-point rounding errors with native integer paise accounting backed by MongoDB Atlas.
                  </p>
                </div>
                <div className="pt-6 border-t border-black/[0.06] space-y-2.5 text-xs font-medium text-zinc-700">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Instant Spend Impact &amp; Deficit Warnings</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>100% Integer Paise Mathematical Precision</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Ring-Fenced Recurring Commitments Ledger</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            04. SYNCHRONIZATION CORRIDOR: CINEMATIC DEPTH
           ======================================================== */}
        <section id="sync" className="sync-section py-16 sm:py-20 px-4 sm:px-6 border-b border-black/[0.06] scroll-mt-20">
          <div className="max-w-6xl mx-auto space-y-12">
            <div className="sync-header text-left max-w-3xl space-y-2">
              <div className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-500">
                {'// 04. INSTANT BUDGET RECALCULATION'}
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900">
                Every Rupee Logged. Runway Updated Instantly.
              </h2>
              <p className="text-sm text-zinc-600 leading-relaxed">
                Log an expense from your mobile browser or desktop. Watch your remaining daily allowance and runway health adapt immediately across all devices in under 25ms.
              </p>
            </div>

            {/* Visual Docking Cards */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center max-w-5xl">
              {/* Desktop Dispatch Preview */}
              <div className="sync-desktop-card md:col-span-7 bento-card p-6 space-y-4 bg-white/85 backdrop-blur-md transition-all duration-300 hover:shadow-lg">
                <div className="flex items-center justify-between border-b border-black/[0.06] pb-3 text-xs font-semibold text-zinc-800">
                  <span>RUNWAY TRANSACTION DISPATCH</span>
                  <span className="font-mono text-xs bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded border border-emerald-200">Integer Paise</span>
                </div>
                <div className="space-y-2 font-mono text-xs text-zinc-900 bg-zinc-50/80 p-4 rounded-xl border border-black/[0.06]">
                  <div className="text-zinc-500">{'// Deducting grocery purchase'}</div>
                  <div className="font-semibold">recordTransaction(&apos;txn_08&apos;, &#123; amountPaise: 65000, category: &apos;food&apos; &#125;)</div>
                  <div className="text-emerald-600 font-semibold">✓ Engine confirmed: Allowance adjusted to ₹338.75/day</div>
                </div>
              </div>

              {/* Database Telemetry Preview */}
              <div className="sync-mobile-card md:col-span-5 bento-card p-6 space-y-4 bg-white/85 backdrop-blur-md transition-all duration-300 hover:shadow-lg">
                <div className="flex items-center justify-between border-b border-black/[0.06] pb-3 text-xs font-semibold text-zinc-800">
                  <span>PERSISTENT RUNWAY STATE</span>
                  <span className="font-mono text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded border border-blue-200">MongoDB Atlas</span>
                </div>
                <div className="space-y-2 font-mono text-xs text-zinc-900 bg-zinc-50/80 p-4 rounded-xl border border-black/[0.06]">
                  <div className="text-zinc-500">{'// Real-time cache revalidation'}</div>
                  <div className="font-semibold">revalidateRunwaySnapshot()</div>
                  <div className="text-emerald-600 font-semibold">✓ Dashboard synced in &lt; 20ms</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            05. OPERATIONAL WORKFLOW: INTERACTIVE BENTO DEMO
           ======================================================== */}
        <section id="workflow" className="section-workflow relative z-10 py-16 sm:py-20 px-4 sm:px-6 border-b border-black/[0.06] scroll-mt-20">
          <div className="max-w-6xl mx-auto space-y-8 relative z-10">
            <div className="workflow-header max-w-2xl space-y-2">
              <div className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-500">
                {'// 05. INTERACTIVE WORKFLOW'}
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900">
                Budget Management with Live Payloads
              </h2>
            </div>

            <InteractiveDemonstrator />
          </div>
        </section>

        {/* ========================================================
            06. REAL ASSET: ENGINEERING FOUNDATION
           ======================================================== */}
        <section id="heritage" className="engineering-section py-16 sm:py-20 px-4 sm:px-6 border-b border-black/[0.06] scroll-mt-20">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="engineering-copy-col lg:col-span-5 space-y-6 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-emerald-50 text-emerald-800 border border-emerald-200/80 rounded-full text-xs font-semibold shadow-sm w-fit">
                <Code2 className="w-4 h-4 text-emerald-600" />
                <span>FINANCIAL ENGINE FOUNDATION</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 leading-tight">
                Engineered for Month-End Solvency.
              </h2>
              <p className="text-sm sm:text-base text-zinc-600 leading-relaxed">
                SurvivalRun was engineered to solve a real human problem: how to survive an entire 30-day month on a strict ₹10,000 budget without descending into debt or running out of funds before payday.
              </p>
              <p className="text-xs sm:text-sm text-zinc-500 leading-relaxed">
                Powered by a rock-solid Next.js web application and Node.js REST backend, combining strict integer paise math, real-time What-If simulations, and dynamic safe daily burn algorithms.
              </p>
              <div className="space-y-3 font-mono text-xs font-semibold text-zinc-800 pt-1">
                <div className="p-3.5 rounded-xl bg-white/80 backdrop-blur-sm border border-black/[0.06] flex items-center justify-between">
                  <span>RUNWAY MATH PRECISION</span>
                  <span className="bg-zinc-900 text-white px-2.5 py-0.5 rounded text-xs">100% INTEGER PAISE</span>
                </div>
                <div className="p-3.5 rounded-xl bg-white/80 backdrop-blur-sm border border-black/[0.06] flex items-center justify-between">
                  <span>MONTH-END TARGET</span>
                  <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-0.5 rounded text-xs">ZERO DEFICIT GUARANTEE</span>
                </div>
              </div>
            </div>

            {/* Architecture Diagram Frame */}
            <div className="lg:col-span-7 relative">
              <TiltCard maxTilt={14} perspective={1200} className="w-full">
                <div className="engineering-visual-frame bento-card p-4 sm:p-6 shadow-xl bg-white/90 backdrop-blur-md transition-all duration-300 hover:shadow-2xl">
                  <div className="relative aspect-[1921/558] w-full rounded-2xl bg-zinc-50/70 overflow-hidden border border-black/[0.06] shadow-md">
                    <Image
                      src="/logo.webp"
                      alt="SurvivalRun Logo"
                      fill
                      sizes="(max-width: 768px) 100vw, 850px"
                      className="object-cover object-center"
                      priority
                    />
                  </div>
                  <div className="pt-4 flex items-center justify-between text-zinc-800 text-xs font-medium">
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-600" />
                      Official SurvivalRun Brand
                    </span>
                    <span className="text-zinc-500 font-mono text-xs">₹10,000 Budget Command Center</span>
                  </div>
                </div>
              </TiltCard>
            </div>
          </div>
        </section>

        {/* ========================================================
            07. REAL ASSET: TANISH (CREATOR & ARCHITECT)
           ======================================================== */}
        <section className="tanish-section py-16 sm:py-20 px-4 sm:px-6 border-b border-black/[0.06]">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Real Tanish portrait in sleek frame */}
            <div className="lg:col-span-5 relative order-2 lg:order-1 flex justify-center">
              <TiltCard maxTilt={18} perspective={1000} className="max-w-xs w-full">
                <div className="tanish-portrait-frame bento-card p-3 shadow-xl bg-white/90 backdrop-blur-md transition-all duration-300 hover:shadow-2xl">
                  <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-zinc-100 border border-black/[0.06]">
                    <Image
                      src="/tanish.jpg"
                      alt="Tanish - Creator & Architect"
                      fill
                      sizes="(max-width: 768px) 100vw, 320px"
                      className="object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                  <div className="p-4 text-center">
                    <div className="font-bold text-zinc-900 text-lg">Tanish</div>
                    <div className="text-xs text-zinc-500 font-medium mt-0.5">
                      Lead Architect &amp; Financial Systems Designer
                    </div>
                  </div>
                </div>
              </TiltCard>
            </div>

            <div className="tanish-copy-col lg:col-span-7 space-y-6 order-1 lg:order-2">
              <div className="font-mono text-xs font-bold uppercase tracking-widest text-zinc-500">
                {'// 07. ARCHITECTURAL VISION'}
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 leading-tight">
                Designed with Mathematical Rigor.{' '}
                <Highlight variant="green">Built for Financial Peace.</Highlight>
              </h2>
              <p className="text-base text-zinc-600 leading-relaxed italic font-normal">
                &ldquo;Living on a ₹10,000 monthly budget shouldn&apos;t feel like gambling. By engineering integer precision, active impulse simulation, and automated daily allowances, we give people complete control over their money.&rdquo;
              </p>
              <div className="flex items-center gap-4 pt-2 text-xs font-medium">
                <div className="p-3.5 rounded-xl bg-white/85 border border-black/[0.06] shadow-sm backdrop-blur-sm">
                  <span className="text-zinc-400 block text-xs font-mono">REPOSITORY</span>
                  <span className="text-zinc-900 font-semibold">Tanishkagathara7</span>
                </div>
                <div className="p-3.5 rounded-xl bg-white/85 border border-black/[0.06] shadow-sm backdrop-blur-sm">
                  <span className="text-zinc-400 block text-xs font-mono">MISSION</span>
                  <span className="text-zinc-900 font-semibold">Survive 30 Days With ₹10k</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            08. TECHNICAL ARCHITECTURE: TOPOLOGY BENTO
           ======================================================== */}
        <section id="architecture" className="section-topology relative z-10 py-16 sm:py-20 px-4 sm:px-6 border-b border-black/[0.06] scroll-mt-20">
          <div className="max-w-6xl mx-auto space-y-8 relative z-10">
            <ArchitectureDiagram />
          </div>
        </section>

        {/* ========================================================
            09. FAQ SECTION: BENTO ACCORDION
           ======================================================== */}
        <section id="faq" className="section-faq py-16 sm:py-20 px-4 sm:px-6 border-b border-black/[0.06] scroll-mt-20">
          <div className="max-w-4xl mx-auto space-y-10">
            <div className="faq-header text-left space-y-2">
              <div className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-500">
                {'// 09. FREQUENTLY ASKED QUESTIONS'}
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900">
                Runway &amp; Financial Engine FAQ
              </h2>
            </div>

            <FAQAccordion />
          </div>
        </section>

        {/* ========================================================
            10. FINAL CTA: CINEMATIC BENTO FINALE
           ======================================================== */}
        <section className="section-cta py-16 sm:py-20 px-4 sm:px-6 border-b border-black/[0.06] relative overflow-hidden">
          <div className="max-w-4xl mx-auto text-left relative z-10 space-y-8">
            <div className="cta-badge inline-flex items-center gap-2 px-3.5 py-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200/80 rounded-full text-xs font-semibold shadow-sm">
              <Sparkles className="w-3.5 h-3.5" />
              <span>30-DAY SURVIVAL CHALLENGE</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-zinc-950 leading-tight">
              <span className="cta-headline-line block overflow-hidden">
                Survive the month.
              </span>
              <span className="cta-headline-line block overflow-hidden mt-1">
                Conquer your <Highlight variant="green">₹10,000 runway.</Highlight>
              </span>
            </h2>

            <p className="cta-subhead max-w-xl text-base text-zinc-600 leading-relaxed font-normal">
              Take complete command of your daily burn rate, protect essential bills, and lock your savings cushion today.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/signup"
                className="cta-button btn-primary px-8 py-4 text-xs font-semibold tracking-wide shadow-md shadow-zinc-950/10 hover:shadow-lg transition-all inline-flex items-center"
              >
                <span>Launch Your Runway</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
              <Link
                href="/login"
                className="cta-button btn-secondary px-8 py-4 text-xs font-semibold shadow-xs hover:shadow transition-all inline-flex items-center"
              >
                <span>Sign In</span>
                <ArrowUpRight className="w-4 h-4 ml-1.5 opacity-60" />
              </Link>
            </div>
          </div>
        </section>

        {/* ========================================================
            11. TECHNICAL FOOTER
           ======================================================== */}
        <MarketingFooter />
      </div>
    </SmoothScrollProvider>
  );
}
