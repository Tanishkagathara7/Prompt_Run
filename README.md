# Survive the Month (SurvivalRun)
> **Broke But Functional — High-Density Financial Runway & Decision Simulator for a ₹10,000 / 30-Day Budget.**

[![Frontend Vercel](https://img.shields.io/badge/Frontend-Vercel%20Live-10B981?style=flat&logo=vercel)](https://prompt-run-tawny.vercel.app)
[![Backend Render](https://img.shields.io/badge/Backend-Render%20Live-46E3B7?style=flat&logo=render)](https://prompt-run.onrender.com/api/health)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Next.js 16](https://img.shields.io/badge/Next.js-16-black?style=flat&logo=next.js)](https://nextjs.org/)

---

## 🌟 Live Deployments

- **Web Frontend**: [https://prompt-run-tawny.vercel.app](https://prompt-run-tawny.vercel.app)
- **Backend API**: [https://prompt-run.onrender.com](https://prompt-run.onrender.com)
- **Backend Health Check**: [https://prompt-run.onrender.com/api/health](https://prompt-run.onrender.com/api/health)

---

## 📖 The Problem We Solve

Young adults, college students, interns, and early-career professionals regularly face critical month-end cash shortages. Traditional personal finance tools fail them because they assume steady investment portfolios and complex multi-month budgeting.

**Survive the Month** provides an immediate, battle-tested answer to the urgent question:  
***"Can I afford dinner tonight and still make my rent on the 24th?"***

### Core Capabilities:
1. **64-Bit Integer-Paise Precision Engine**: All balances, commitments, and simulations operate in integer paise ($1\text{ INR} = 100\text{ paise}$) to prevent catastrophic floating-point rounding errors.
2. **Dynamic Safe Daily Burn Allowance**: Recalculates spend limits day by day ($\lfloor \text{Spendable} / d_{\text{remaining}} \rfloor$) while locking upcoming mandatory obligations.
3. **The "What-If" Impulse Decision Simulator**: Real-time sandbox allowing users to test potential purchases before spending money. Calculates instant impacts on daily allowance and flags essential shortfalls.
4. **Essential vs Discretionary Ledger**: Strict segregation ensuring vital rent, groceries, and transit obligations are never cannibalized by cafe hangouts or impulse splurges.
5. **Protected Savings Cushion**: Lockable reserve vault shielded from daily spendable calculations.

---

## 🏗️ Architecture & Technology Stack

| Layer | Technology | Details |
|---|---|---|
| **Frontend** | Next.js 16 (App Router), React 19, Tailwind CSS | Deployed on Vercel with image optimization & HTTP cache headers |
| **Backend** | Node.js + Express + TypeScript | Deployed on Render with rate limiting, Helmet security & JWT auth |
| **Database** | MongoDB Atlas via Mongoose | Connection pooling, indexed ownership queries |
| **Testing** | Node.js Test Runner + tsx | Comprehensive unit tests for financial math, auth, and ledger CRUD |
| **Design System** | Accessible High-Density UI | Linear/Vercel-inspired dark theme, WCAG 2.1 AA compliant |

---

## 🚀 Quick Start & Local Development

### 1. Prerequisites
- Node.js $\ge 20.x$
- MongoDB Atlas account or local MongoDB instance

### 2. Installation
Clone the repository and install all root, web, and backend dependencies:
```bash
git clone https://github.com/Tanishkagathara7/Prompt_Run.git
cd Prompt_Run
npm run install:all
```

### 3. Environment Configuration
**Frontend (`web/.env.local`)**:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```
*(In production, web automatically falls back to `https://prompt-run.onrender.com/api`)*

**Backend (`backend/.env`)**:
```env
PORT=5000
MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/survive-the-month?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret_token
```

### 4. Running the Development Servers
Run both Web client and Backend API concurrently:
```bash
npm run dev
```
- Web Application: `http://localhost:3000`
- Backend API: `http://localhost:5000/api`

---

## 🧪 Testing & Verification

Run the automated financial engine and backend test suite:
```bash
# Test backend routes, controllers, and integer financial logic
npm --prefix backend test

# Test web client financial math and What-If simulator
npx tsx web/lib/financialEngine.test.ts
```

All 7 core test scenarios verify:
- Initial ₹10,000 budget allocations
- Mid-month essential vs discretionary burn
- Protected savings isolation and emergency unlocking
- What-If simulation accuracy without state mutation
- Clamped division protection on Day 30

---

## 📑 Authoritative Blueprint Documentation

All specifications are documented under `project/`:
- [PROBLEM_STATEMENT.md](file:///project/PROBLEM_STATEMENT.md): Problem context, personas, and winning features.
- [02_PRODUCT_SPEC.md](file:///project/02_PRODUCT_SPEC.md): Functional module specifications.
- [03_UX_PLAN.md](file:///project/03_UX_PLAN.md): Responsive layout rules and accessibility guidelines.
- [05_DATA_MODEL.md](file:///project/05_DATA_MODEL.md): Mongoose schemas and mathematical formulas.
- [13_CHANGE_LOG.md](file:///project/13_CHANGE_LOG.md): Architectural pivot & release log.

---

## 📄 License
MIT License. Built for the Hackathon with production-grade engineering standards.
