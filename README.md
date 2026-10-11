# Build Fast

A production-ready web + backend monorepo. Next.js 16 App Router on the frontend, Node.js/Express REST API on the backend, MongoDB Atlas for persistence.

## Stack

| Layer | Technology |
|---|---|
| Web Client | Next.js 16 (App Router, Turbopack) |
| Backend API | Node.js + Express |
| Database | MongoDB Atlas via Mongoose |
| Auth | JWT (email/password + Google/GitHub OAuth) |
| AI | OpenRouter AI Gateway |
| File Storage | Multer (local/cloud) |
| Styling | Tailwind CSS |

## Project Structure

```
Build_Fast/
├── web/          # Next.js 16 web client (port 3000)
├── backend/      # Express REST API (port 5000)
├── scripts/      # Domain generation engine
├── docs/         # Problem statement & planning docs
└── .agents/      # AI agent skills & config
```

## Getting Started

### Install all dependencies

```bash
npm run install:all
```

### Run both web + backend in parallel

```bash
npm run dev
```

Or individually:

```bash
npm run web       # http://localhost:3000
npm run backend   # http://localhost:5000
```

## Environment Variables

### `web/.env.local`

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### `backend/.env`

```env
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your_jwt_secret
OPENROUTER_API_KEY=...
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
GITHUB_CLIENT_ID=...
GITHUB_CLIENT_SECRET=...
```

## Domain Generation

To pivot the entire platform to a new problem domain:

```bash
npm run generate:product -- --file=docs/PROBLEM_STATEMENT.md
```

This rewrites `web/lib/productSpec.default.ts` and `docs/02_PRODUCT_SPEC.md` from your problem statement.
