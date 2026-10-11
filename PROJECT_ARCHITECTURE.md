# Project Architecture: Survive the Month
**Project**: Broke But Functional — Survive the Month  
**Repository**: `Tanishkagathara7/Prompt_Run`  
**Deployments**:
- **Backend API**: Render (`https://prompt-run.onrender.com/api`)
- **Frontend Web**: Vercel (`https://prompt-run-tawny.vercel.app`)

---

## 1. System Topology Overview

Survive the Month is built on a high-velocity, two-tier architecture tailored for sub-second micro-budget calculations, deterministic ledger operations, and resilient cloud hosting.

```
┌────────────────────────────────────────────────────────────────────────┐
│                   Web Client (Vercel Production)                       │
│                   Next.js 16 App Router (Turbopack)                    │
│                                                                        │
│  ┌──────────────────────┐  ┌───────────────────┐  ┌─────────────────┐  │
│  │  Marketing & Story   │  │   Auth System     │  │ Command Center  │  │
│  │  /page.tsx (Public)  │  │  /login & /signup │  │ /dashboard      │  │
│  └──────────────────────┘  └───────────────────┘  └─────────────────┘  │
│                                                            │           │
│  ┌─────────────────────────────────────────────────────────┴─────────┐ │
│  │  Client Financial Engine (web/lib/financialEngine.ts)             │ │
│  │  - Integer-Paise Precision Math (1 INR = 100 Paise)               │ │
│  │  - Dynamic Safe Daily Allowance Calculator                        │ │
│  │  - "What-If" Impulse Decision Simulator                           │ │
│  │  - Protected Savings Cushion Lock                                 │ │
│  └─────────────────────────────────────────────────────────┬─────────┘ │
│                                                            │           │
│  web/lib/api/client.ts (Configured with Render Fallback)   │           │
└────────────────────────────────────┬───────────────────────┴───────────┘
                                     │ HTTPS REST / Bearer JWT
                                     ▼
┌────────────────────────────────────────────────────────────────────────┐
│                   Backend API (Render Production)                      │
│                   Node.js + Express + TypeScript                       │
│                                                                        │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │ Security & Middleware                                            │  │
│  │ - Helmet Security Headers                                        │  │
│  │ - CORS Policy (Vercel preview + localhost origins)               │  │
│  │ - express-rate-limit (Brute-force protection)                    │  │
│  │ - JWT Token Extraction & User Identity Verification              │  │
│  └──────────────────────────────────────────────────────────────────┘  │
│                                     │                                  │
│  ┌──────────────────────────────────┴───────────────────────────────┐  │
│  │ Controllers & Business Services                                  │  │
│  │ - /api/auth: Register, Login, JWT issuing                        │  │
│  │ - /api/items: Financial transaction ledger CRUD                  │  │
│  │ - /api/analytics: Aggregate burn rate, essential breakdown       │  │
│  │ - /api/notifications: Upcoming commitment reminders              │  │
│  │ - /api/files: Multer receipt attachment processor                │  │
│  └──────────────────────────────────┬───────────────────────────────┘  │
└─────────────────────────────────────┼──────────────────────────────────┘
                                      │ Mongoose ODM
                                      ▼
             ┌──────────────────────────────────────────────────┐
             │       MongoDB Atlas Dedicated Cluster            │
             │                                                  │
             │  Collections:                                    │
             │  • users (Profiles, cycle allowance)             │
             │  • domainitems (Financial ledger entries)        │
             │  • notifications (Commitment alerts)             │
             │  • files (Uploaded receipts)                     │
             └──────────────────────────────────────────────────┘
```

---

## 2. Directory Structure

```
prmopt_run/
├── project/                      # Authoritative FQE Blueprint Specifications
│   ├── PROBLEM_STATEMENT.md      # Broke But Functional - Survive the Month
│   ├── 02_PRODUCT_SPEC.md        # 5 core functional modules
│   ├── 03_UX_PLAN.md             # Responsive breakpoints & interaction states
│   ├── 05_DATA_MODEL.md          # Integer paise data schemas & invariants
│   └── 13_CHANGE_LOG.md          # Architectural pivot & release log
│
├── web/                          # Next.js 16 App Router (Vercel)
│   ├── app/                      # App router pages & layouts
│   │   ├── page.tsx              # Bespoke Survive the Month landing page
│   │   ├── (auth)/               # Unified authentication view
│   │   └── (app)/                # Authenticated workspace
│   │       ├── dashboard/        # Telemetry runway command center
│   │       ├── items/            # High-density transaction ledger
│   │       └── ...
│   ├── components/               # Modular UI components
│   │   ├── auth/                 # Brand-consistent authentication views
│   │   ├── dashboard/            # Interactive runway widgets & simulator
│   │   ├── layout/               # Sidebar, Topbar, CommandPalette
│   │   └── ui/                   # Reusable accessible primitives
│   ├── lib/
│   │   ├── api/                  # Axios/fetch API client with Render fallback
│   │   ├── financialEngine.ts    # Canonical integer-paise math engine
│   │   ├── financialEngine.test.ts # Web verification suite
│   │   └── domain.config.ts      # Domain configuration
│   └── next.config.ts            # Optimized compression & security headers
│
├── backend/                      # Node.js + Express API (Render)
│   ├── src/
│   │   ├── __tests__/            # Comprehensive test suite (Node test runner)
│   │   │   ├── financialEngine.test.ts # Financial math & risk tests
│   │   │   ├── auth.test.ts      # JWT auth tests
│   │   │   └── domainItem.test.ts# Ledger CRUD tests
│   │   ├── controllers/          # Route controllers
│   │   ├── models/               # Mongoose schemas
│   │   ├── routes/               # Express route handlers
│   │   ├── seeds/                # Realistic financial seed data
│   │   └── index.ts              # Express application entry point
│   └── package.json
│
└── docs/
    └── financial-rules.md        # Canonical financial accounting rules
```

---

## 3. Deployment Topology & Environments

| Component | Provider | Live URL | Fallback Configuration |
|---|---|---|---|
| **Frontend** | Vercel | `https://prompt-run-tawny.vercel.app` | Auto-detects Render API backend when `NEXT_PUBLIC_API_URL` is omitted |
| **Backend** | Render | `https://prompt-run.onrender.com` | `/api/health` monitoring, CORS preconfigured for Vercel production |
| **Database** | MongoDB Atlas | Cloud Cluster | Connection pooling, auto-reconnect, indexed queries on `userId` |

---

## 4. Architectural Guarantees & Constraints

1. **Integer-Paise Precision**:
   Every monetary calculation ($1\text{ INR} = 100\text{ paise}$) avoids floating-point roundoff errors ($0.1 + 0.2 \neq 0.3$). User inputs are safely parsed via `Math.round(val * 100)` and localized using `Intl.NumberFormat('en-IN')`.
2. **Timeline Boundary Protection**:
   The simulation cycle is strictly bounded to 30 days. Day 30 and beyond clamp remaining days to 1 to guarantee zero division-by-zero crashes.
3. **Double-Entry Reversal Discipline**:
   Modifying or deleting a transaction restores the previous balance delta before computing updated totals, ensuring ledger immutability and audit compliance.
