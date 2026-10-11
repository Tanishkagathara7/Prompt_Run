# Project Architecture

## Overview

A two-tier web platform with a Next.js 16 frontend and a Node.js/Express backend, connected via REST API, using MongoDB Atlas for persistence.

```
┌─────────────────────────────────────────────────────┐
│                   Web Client                        │
│          Next.js 16 App Router (port 3000)          │
│                                                     │
│  ┌─────────────┐  ┌──────────────┐  ┌───────────┐  │
│  │  Marketing  │  │  Auth Pages  │  │ App Pages │  │
│  │  (public)   │  │  /login      │  │ /dashboard│  │
│  │  page.tsx   │  │  /signup     │  │ /items    │  │
│  └─────────────┘  └──────────────┘  └───────────┘  │
│                                                     │
│  lib/api/client.ts ──────────────────────────────┐  │
└──────────────────────────────────────────────────┼──┘
                                                   │ REST
                                                   ▼
┌─────────────────────────────────────────────────────┐
│                  Backend API                        │
│          Node.js + Express (port 5000)              │
│                                                     │
│  Routes → Controllers → Services → Models           │
│                                                     │
│  /api/auth        JWT + OAuth (Google, GitHub)      │
│  /api/items       DomainItem CRUD                   │
│  /api/files       Multer file upload                │
│  /api/analytics   Aggregated metrics                │
│  /api/notifications Push + in-app alerts           │
└──────────────────────────────────────────────────┬──┘
                                                   │
                                                   ▼
                           ┌────────────────────────┐
                           │   MongoDB Atlas         │
                           │   (Mongoose ODM)        │
                           │                        │
                           │   User                 │
                           │   DomainItem           │
                           │   Notification         │
                           └────────────────────────┘
```

## Directory Structure

```
Build_Fast/
│
├── web/                          # Next.js 16 App Router
│   ├── app/
│   │   ├── page.tsx              # Marketing landing page
│   │   ├── layout.tsx            # Root layout + providers
│   │   ├── (auth)/               # Login / Signup UI
│   │   ├── (app)/                # Authenticated workspace
│   │   │   ├── dashboard/
│   │   │   ├── items/
│   │   │   ├── ai-assistant/
│   │   │   ├── files/
│   │   │   └── notifications/
│   │   └── auth/callback/        # OAuth redirect handlers
│   ├── components/
│   │   ├── auth/                 # Auth UI (login form, OAuth)
│   │   ├── background/           # Decorative background systems
│   │   ├── dashboard/            # Dashboard widgets
│   │   ├── layout/               # Shell, Sidebar, Topbar
│   │   ├── loading/              # Loading screens
│   │   ├── marketing/            # Landing page sections
│   │   ├── seo/                  # JSON-LD structured data
│   │   └── ui/                   # Shared UI primitives
│   ├── lib/
│   │   ├── api/                  # Typed API client layer
│   │   │   ├── client.ts         # Base fetch client + auth headers
│   │   │   ├── auth.ts           # Auth API methods
│   │   │   └── domain.ts         # DomainItem CRUD methods
│   │   ├── context/              # React Contexts (Auth, Toast, Loading)
│   │   ├── animations/           # GSAP / Lenis scroll animations
│   │   ├── domain.config.ts      # UI labels, nav, landing config
│   │   ├── types.ts              # Shared TS types (DomainItem, User)
│   │   ├── seo.ts                # SEO config + canonical URL
│   │   └── utils.ts              # Utility functions
│   └── public/                   # Static assets
│
├── backend/                      # Node.js + Express API
│   └── src/
│       ├── index.ts              # Server entry point
│       ├── models/               # Mongoose schemas
│       │   ├── User.ts
│       │   └── DomainItem.ts
│       ├── controllers/          # Route handlers
│       ├── services/             # Business logic
│       ├── routes/               # Express routers
│       ├── middleware/           # Auth, error handling
│       ├── config/               # DB connection, env
│       ├── seeds/                # Demo data seeding
│       ├── types/                # Backend TS types
│       ├── utils/                # Helpers
│       └── __tests__/            # Jest test suite
│
├── scripts/                      # Domain generation
│   └── analyzer/
│       ├── productGenerationEngine.ts   # Applies generated spec to web/
│       └── problemStatementAnalyzer.ts  # Parses problem text → spec
│
├── docs/                         # Project documentation
│   └── PROBLEM_STATEMENT.md
│
├── .agents/                      # AI agent configuration
│   └── skills/
│       ├── code-review/
│       ├── project-pivot/
│       └── web-ux/
│
├── package.json                  # Workspace scripts
├── tsconfig.json                 # Root TS config (scripts/)
├── README.md
└── PROJECT_ARCHITECTURE.md
```

## Key Patterns

### Authentication
- JWT stored in `localStorage` via `TOKEN_STORAGE_KEY`
- Auth state managed by `AuthContext` (React Context)
- Protected routes: `web/app/(app)/layout.tsx` redirects unauthenticated users

### Data Flow
1. Component calls `itemsApi.getItems()` from `web/lib/api/domain.ts`
2. API layer attaches Bearer token via `web/lib/api/client.ts`
3. Express route → Controller → Service → Mongoose model → MongoDB
4. Response mapped to `DomainItem[]` TypeScript type

### Domain Adaptability
The platform is domain-neutral. Run `npm run generate:product` with a problem statement to rewrite all UI labels, navigation, and entity names via `web/lib/domain.config.ts`.
