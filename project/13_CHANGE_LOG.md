# 13. Architecture & Domain Changelog
**Project**: Survive the Month  
**Repository**: `Tanishkagathara7/Prompt_Run`  
**Deployment**: Render (Backend) + Vercel (Frontend)

---

## [v1.1.0] - 2026-10-11: Full Domain Alignment & FQE v3.1 Compliance

### Changed & Added:
1. **Domain Alignment to "Broke But Functional - Survive the Month"**:
   - Replaced generic SaaS starter items with authentic ₹10,000 / 30-day budget runway mechanics.
   - Built canonical financial engine `web/lib/financialEngine.ts` and companion test suite `web/lib/financialEngine.test.ts` operating strictly with 64-bit integer paise arithmetic ($1\text{ INR} = 100\text{ paise}$).
2. **Authoritative Project Documentation Suite**:
   - Created `project/PROBLEM_STATEMENT.md` defining core problem framing, target personas (Frugal Survivor, Budget Buddy), and winning differentiators.
   - Created `project/02_PRODUCT_SPEC.md` documenting the 5 core functional modules (Command Center, High-Density Ledger, Commitments Shield, What-If Simulator, Protected Vault).
   - Created `project/03_UX_PLAN.md` detailing responsive breakpoint rules (Desktop 1280px, Laptop 1024px, Tablet 768px, Mobile < 768px) and accessible WCAG 2.1 AA interaction states.
   - Created `project/05_DATA_MODEL.md` establishing integer-paise Mongo schemas, relations, and calculation formulas.
   - Updated `PROJECT_ARCHITECTURE.md` and root `README.md` to reflect production 2-tier architecture, API routes, and cloud deployment topology.
3. **Seed Payloads & Test Enhancements**:
   - Seeded 10 authentic financial runway items in `backend/src/seeds/datasets/generic.ts` including essential rent, groceries, emergency medical cushion, and zero-spend hacks.
   - Added backend unit tests `backend/src/__tests__/financialEngine.test.ts` verifying safe daily burn calculations, integer paise parsing, and impulse simulation.
4. **Web Performance & SEO Optimizations**:
   - Upgraded `web/next.config.ts` with Gzip compression (`compress: true`), modern image formats (`AVIF`, `WebP`), aggressive asset caching headers, and `poweredByHeader: false`.
   - Verified clean zero-error build via `npm run web:build`.
5. **Production Deployments Verified**:
   - Backend live on Render: `https://prompt-run.onrender.com/api`
   - Frontend live on Vercel: `https://prompt-run-tawny.vercel.app`
