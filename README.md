# Next.js App Router Boilerplate

A production-ready, minimal starter template for Next.js 16 projects with modern tooling and best practices.

## Features

- **Route groups**: `/(public)` marketing surface, `/(auth)` flows, and `/(protected)` dashboard
- **Middleware-protected routes** with lightweight cookie-based session management
- **shadcn/ui sidebar** with collapsible state, keyboard shortcuts, and persisted cookies
- **Tailwind CSS v4** with claymorphism theme tokens from tweakcn
- **Theme switching** via `next-themes` with dark/light mode support
- **Code quality tools**: ESLint, Prettier, Husky, lint-staged, and Commitlint
- **Git hooks**: Pre-commit linting/formatting and commit message validation
- **CI/CD**: GitHub Actions for automated testing and releases

No databases, external auth, or complex setup—just a clean starting point that works with `pnpm`, `npm`, `yarn`, or `bun`.

## Stack

- Next.js 16 + React 19 (App Router)
- Tailwind CSS v4 + tweakcn tokens
- shadcn/ui sidebar, buttons, inputs, tooltips
- next-themes for dark/light state
- TypeScript, ESLint, Turbopack dev server

## Getting Started

### Prerequisites

- Node.js >= 20
- npm, yarn, pnpm, or bun

### Installation

```bash
# Clone the repository
# Using HTTPS
git clone https://github.com/adil77672/nextjs-starter.git my-app

# Or using SSH
git clone git@github.com:adil77672/nextjs-starter.git my-app

cd my-app

# Install dependencies
yarn        # or pnpm install / npm install / bun install

# Setup Git hooks (Husky)
yarn prepare

# Run development server (uses Turbopack on port 3003)
yarn dev
```

Visit http://localhost:3003 to explore:

- Landing page (`/marketing`) with CLI cheatsheet + demo auth widget
- Sign-in experience (`/sign-in`)
- Protected dashboard (`/`) guarded by middleware

### Available Scripts

```bash
# Development
yarn dev              # Start dev server with Turbopack
yarn build            # Build for production
yarn start            # Start production server

# Code Quality
yarn lint             # Run ESLint
yarn lint:fix         # Fix ESLint errors
yarn format           # Format code with Prettier
yarn format:check     # Check code formatting
```

## Project Structure

This is a comprehensive Next.js App Router structure supporting both frontend and full-stack applications.

```
project-root/
├── src/
│   ├── app/                          # App Router directory
│   │   ├── (auth)/                   # Route group: Authentication routes
│   │   │   ├── layout.tsx            # Auth-specific layout (no sidebar)
│   │   │   ├── sign-in/
│   │   │   │   └── page.tsx          # /sign-in route
│   │   │   └── sign-up/
│   │   │       └── page.tsx          # /sign-up route (example)
│   │   │
│   │   ├── (protected)/              # Route group: Protected routes
│   │   │   ├── layout.tsx            # Protected layout (with sidebar)
│   │   │   ├── page.tsx              # / (root dashboard - protected)
│   │   │   ├── dashboard/
│   │   │   │   └── page.tsx          # /dashboard route
│   │   │   ├── settings/
│   │   │   │   ├── page.tsx          # /settings route
│   │   │   │   └── [id]/             # Dynamic route example
│   │   │   │       └── page.tsx      # /settings/[id]
│   │   │   └── profile/
│   │   │       └── [userId]/         # Dynamic segment
│   │   │           └── page.tsx      # /profile/[userId]
│   │   │
│   │   ├── (public)/                 # Route group: Public routes
│   │   │   ├── layout.tsx            # Public layout (minimal)
│   │   │   ├── marketing/
│   │   │   │   └── page.tsx          # /marketing route
│   │   │   └── about/
│   │   │       └── page.tsx          # /about route (example)
│   │   │
│   │   ├── api/                      # API Routes (Backend)
│   │   │   ├── auth/
│   │   │   │   ├── login/
│   │   │   │   │   └── route.ts      # POST /api/auth/login
│   │   │   │   ├── register/
│   │   │   │   │   └── route.ts      # POST /api/auth/register
│   │   │   │   └── session/
│   │   │   │       └── route.ts      # GET /api/auth/session
│   │   │   ├── users/
│   │   │   │   ├── route.ts          # GET/POST /api/users
│   │   │   │   └── [id]/
│   │   │   │       └── route.ts      # GET/PUT/DELETE /api/users/[id]
│   │   │   └── webhook/
│   │   │       └── route.ts          # POST /api/webhook
│   │   │
│   │   ├── layout.tsx                # Root layout (global)
│   │   ├── page.tsx                  # Root page (redirects to protected)
│   │   ├── not-found.tsx             # 404 page
│   │   ├── error.tsx                 # Error boundary
│   │   ├── loading.tsx               # Loading UI
│   │   ├── global-error.tsx          # Global error boundary
│   │   ├── template.tsx              # Template (re-renders on navigation)
│   │   ├── index.css                 # Global styles + Tailwind
│   │   └── lib/
│   │       └── utils.ts              # Utility functions
│   │
│   ├── components/                   # React components
│   │   ├── ui/                       # shadcn/ui components
│   │   │   ├── button.tsx
│   │   │   ├── input.tsx
│   │   │   ├── sidebar.tsx
│   │   │   └── ...
│   │   ├── auth-panel.tsx            # Auth UI component
│   │   ├── theme-provider.tsx        # Theme context
│   │   ├── theme-toggle.tsx          # Theme switcher
│   │   └── hooks/
│   │       └── use-mobile.ts         # Custom hooks
│   │
│   ├── lib/                          # Shared utilities
│   │   └── utils.ts                  # Helper functions (cn, etc.)
│   │
│   └── server/                       # Server-only code
│       └── actions.ts                # Server actions (optional)
│
├── public/                            # Static assets
│   ├── favicon.ico
│   ├── images/
│   └── ...
│
├── middleware.ts                      # Next.js middleware (runs on edge)
├── next.config.ts                     # Next.js configuration
├── tsconfig.json                      # TypeScript configuration
├── tailwind.config.ts                 # Tailwind CSS config (if needed)
├── postcss.config.mjs                 # PostCSS configuration
├── .eslintrc.json                     # ESLint configuration
├── .prettierrc.json                   # Prettier configuration
├── commitlint.config.ts               # Commitlint configuration
├── .husky/                            # Git hooks
│   ├── pre-commit                    # Pre-commit hook
│   └── commit-msg                     # Commit message hook
└── package.json                       # Dependencies & scripts
```

### Route Organization

#### Route Groups `(folder)`
- **Purpose**: Organize routes without affecting URL structure
- **Examples**:
  - `(auth)` - Authentication pages (no sidebar)
  - `(protected)` - Dashboard pages (with sidebar)
  - `(public)` - Marketing pages (minimal layout)

#### Dynamic Routes `[param]`
- **Single segment**: `[id]/page.tsx` → `/users/123`
- **Catch-all**: `[...slug]/page.tsx` → `/docs/a/b/c`
- **Optional catch-all**: `[[...slug]]/page.tsx` → `/docs` or `/docs/a/b`

#### Special Files
- `layout.tsx` - Shared UI for route segment
- `page.tsx` - Unique UI for route
- `loading.tsx` - Loading UI (Suspense boundary)
- `error.tsx` - Error UI (Error boundary)
- `not-found.tsx` - 404 page
- `template.tsx` - Re-renders on navigation
- `route.ts` - API route handler

### API Routes Structure

```typescript
// src/app/api/users/[id]/route.ts
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  // Handle GET /api/users/[id]
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  // Handle PUT /api/users/[id]
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  // Handle DELETE /api/users/[id]
}
```

### Middleware

`middleware.ts` runs on the Edge runtime before requests complete:

```typescript
// Protects routes, handles redirects, sets headers
export function middleware(request: NextRequest) {
  // Your logic here
}

export const config = {
  matcher: ['/((?!_next|_vercel|.*\\..*).*)'],
}
```

## Adding shadcn/ui components

The sidebar was installed with the shadcn CLI, and you can pull in any additional component the same way:

```bash
npx shadcn@latest add button
```

You’ll be prompted for the project config (already stored in `components.json`) and the base color (we default to “Neutral”). The CLI will add the component files under `src/components/ui/` and update `src/app/index.css` if new tokens are required. After the command finishes, import the component with the `@/components/ui/*` alias.

## Auth & Middleware

`middleware.ts` inspects a demo cookie (`demo-auth`) to:

- Redirect anonymous users away from `/` and `/dashboard` to `/marketing`.
- Skip auth screens when a session exists.

Customize the cookie name, routes, or handler logic to integrate your real backend.

## Theming

All tokens are defined in `src/app/index.css` and surfaced through shadcn’s palette variables:

```
@layer base {
  :root { ...clay colors... }
  .dark { ...night palette... }
}
```

Update these variables to match your brand. Because Tailwind v4 reads them via `@theme inline`, every utility class stays in sync automatically.

## Code Quality & Development Tools

This project includes a complete code quality setup with automated checks and formatting.

### ESLint

**Purpose**: Catches bugs and enforces code quality rules.

**Configuration**: `.eslintrc.json`
```json
{
  "extends": ["next/core-web-vitals"],
  "rules": {
    "@next/next/no-html-link-for-pages": "off"
  }
}
```

**Usage**:
```bash
yarn lint              # Check for linting errors
yarn lint:fix          # Auto-fix linting errors
```

**What it checks**:
- React best practices
- Next.js specific rules
- TypeScript errors
- Unused variables
- Import/export issues

### Prettier

**Purpose**: Automatically formats code for consistent style.

**Configuration**: `.prettierrc.json`
```json
{
  "semi": false,
  "singleQuote": false,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 100,
  "arrowParens": "avoid",
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

**Usage**:
```bash
yarn format            # Format all files
yarn format:check      # Check if files are formatted
```

**What it formats**:
- TypeScript/JavaScript files
- JSON, CSS, Markdown
- Automatically sorts Tailwind classes (via plugin)

**Ignored files**: `.prettierignore`
- `node_modules`, `.next`, build outputs, lock files

### Husky

**Purpose**: Git hooks to run scripts at specific Git events.

**Hooks configured**:

1. **Pre-commit** (`.husky/pre-commit`):
   - Runs `lint-staged` before each commit
   - Lints and formats only staged files
   - Prevents commit if errors can't be auto-fixed

2. **Commit-msg** (`.husky/commit-msg`):
   - Validates commit message format
   - Enforces Conventional Commits

**Setup**:
```bash
yarn prepare           # Install Husky hooks (runs after npm install)
```

**How it works**:
- Automatically runs on `git commit`
- Only processes files you're committing
- Fast and efficient

### lint-staged

**Purpose**: Run linters on Git staged files only.

**Configuration**: `package.json`
```json
{
  "lint-staged": {
    "*.{ts,tsx,js,jsx}": [
      "eslint --fix",
      "prettier --write"
    ],
    "*.{json,css,md}": [
      "prettier --write"
    ]
  }
}
```

**What it does**:
- Runs ESLint on staged `.ts`, `.tsx`, `.js`, `.jsx` files
- Runs Prettier on all staged files
- Only processes changed files (fast!)

### Commitlint

**Purpose**: Validates commit messages follow Conventional Commits.

**Configuration**: `commitlint.config.ts`
```typescript
{
  extends: ['@commitlint/config-conventional'],
  ignores: [message => message.startsWith('chore: bump')]
}
```

**Valid commit formats**:
```bash
feat: add user authentication
fix: resolve sidebar overlap issue
chore: update dependencies
docs: update README
style: format code with Prettier
refactor: reorganize project structure
test: add unit tests for utils
perf: optimize image loading
```

**Invalid formats** (will be rejected):
```bash
added auth          # Missing type
fix bug            # Missing colon
FEAT: new feature  # Wrong case
```

### Workflow Summary

**On every commit**:
1. Husky pre-commit hook triggers
2. lint-staged runs on staged files
3. ESLint fixes auto-fixable issues
4. Prettier formats code
5. If errors remain, commit is blocked
6. Commit message is validated by Commitlint

**Manual checks**:
```bash
# Before committing
yarn lint:fix       # Fix linting issues
yarn format         # Format code
yarn format:check   # Verify formatting

# Check commit message format
echo "feat: my feature" | npx commitlint
```

### Configuration Files Reference

| File | Purpose |
|------|---------|
| `.eslintrc.json` | ESLint rules and configuration |
| `.prettierrc.json` | Prettier formatting rules |
| `.prettierignore` | Files to skip formatting |
| `commitlint.config.ts` | Commit message validation rules |
| `.husky/pre-commit` | Pre-commit Git hook |
| `.husky/commit-msg` | Commit message Git hook |
| `package.json` (lint-staged) | Files to lint/format on commit |

## Deploy

```bash
yarn build
yarn start
```

Works on Vercel, Netlify, Render, Railway, etc. Optionally set `NEXT_PUBLIC_APP_URL` so server components can build absolute URLs.

## GitHub Actions

The project includes pre-configured GitHub Actions workflows:

- **CI**: Runs on every push/PR - builds and lints the project
- **Release**: Automatically creates releases using semantic-release
- **Dependabot**: Monthly dependency updates

No additional GitHub configuration required—works out of the box!