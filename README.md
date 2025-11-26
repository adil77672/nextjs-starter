# Next.js App Router Boilerplate

A production-ready, minimal starter template for Next.js 16 projects with modern tooling and best practices.

## Features

- **Route groups**: `/(auth)` authentication flows and `/(protected)` dashboard
- **Middleware-protected routes** with lightweight cookie-based session management
- **shadcn/ui sidebar** with collapsible state, keyboard shortcuts, and persisted cookies
- **Tailwind CSS v4** with claymorphism theme tokens from tweakcn
- **Theme switching** via `next-themes` with dark/light mode support
- **Form Management**: React Hook Form with Zod validation for type-safe forms
- **Data Fetching**: TanStack Query (React Query) for server state management
- **Code quality tools**: ESLint, Prettier, Husky, lint-staged, and Commitlint
- **Git hooks**: Pre-commit linting/formatting and commit message validation
- **CI/CD**: GitHub Actions for automated testing and releases

No databases, external auth, or complex setup—just a clean starting point that works with `pnpm`, `npm`, `yarn`, or `bun`.

## Stack

- Next.js 16 + React 19 (App Router)
- Tailwind CSS v4 + tweakcn tokens
- shadcn/ui sidebar, buttons, inputs, tooltips
- next-themes for dark/light state
- **React Hook Form** - Performant form management
- **Zod** - TypeScript-first schema validation
- **TanStack Query (React Query)** - Powerful data synchronization
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

- Sign-in page (`/sign-in`) with React Hook Form + Zod validation
- Sign-up page (`/sign-up`) for new user registration
- Forgot password flow (`/forgot-password` → `/verify-otp` → `/reset-password`)
- Protected dashboard (`/`) guarded by middleware
- Profile page (`/profile`) with user information

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
│   │   ├── providers/
│   │   │   └── query-provider.tsx    # React Query provider
│   │   ├── auth-panel.tsx            # Auth UI component
│   │   ├── logout-button.tsx         # Logout button component
│   │   ├── theme-provider.tsx        # Theme context
│   │   ├── theme-toggle.tsx          # Theme switcher
│   │   └── hooks/
│   │       └── use-mobile.ts         # Custom hooks
│   │
│   ├── lib/                          # Shared utilities
│   │   ├── api/
│   │   │   └── auth.ts               # React Query hooks for auth
│   │   ├── validations/
│   │   │   └── auth.ts               # Zod schemas for forms
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
export async function GET(request: Request, { params }: { params: { id: string } }) {
  // Handle GET /api/users/[id]
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  // Handle PUT /api/users/[id]
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
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
  matcher: ["/((?!_next|_vercel|.*\\..*).*)"],
}
```

## Adding shadcn/ui components

The sidebar was installed with the shadcn CLI, and you can pull in any additional component the same way:

```bash
npx shadcn@latest add button
```

You'll be prompted for the project config (already stored in `components.json`) and the base color (we default to "Neutral"). The CLI will add the component files under `src/components/ui/` and update `src/app/index.css` if new tokens are required. After the command finishes, import the component with the `@/components/ui/*` alias.

## Form Management & Validation

This boilerplate uses **React Hook Form** with **Zod** for type-safe, performant form handling.

### React Hook Form

**Purpose**: High-performance form library with minimal re-renders.

**Key Benefits**:

- Uncontrolled components (better performance)
- Built-in validation support
- Easy error handling
- TypeScript support

**Example Usage**:

```typescript
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema, type SignInInput } from "@/lib/validations/auth";

export function SignInForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInInput>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = async (data: SignInInput) => {
    // Handle form submission
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("email")} />
      {errors.email && <p>{errors.email.message}</p>}

      <input {...register("password")} type="password" />
      {errors.password && <p>{errors.password.message}</p>}

      <button type="submit" disabled={isSubmitting}>
        Submit
      </button>
    </form>
  );
}
```

### Zod Validation

**Purpose**: TypeScript-first schema validation library.

**Location**: `src/lib/validations/`

**Example Schema**:

```typescript
import { z } from "zod"

export const signInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

export type SignInInput = z.infer<typeof signInSchema>
```

**Features**:

- Type inference from schemas
- Runtime validation
- Custom error messages
- Composable schemas

**Available Schemas**:

- `signInSchema` - Sign in form validation
- `signUpSchema` - Registration with password confirmation
- `forgotPasswordSchema` - Email validation for password reset
- `verifyOtpSchema` - OTP verification (6 digits)
- `resetPasswordSchema` - New password with confirmation

### Creating New Forms

1. **Define Zod Schema** (`src/lib/validations/`):

```typescript
export const myFormSchema = z.object({
  name: z.string().min(2, "Name required"),
  email: z.string().email("Invalid email"),
})
```

2. **Use in Component**:

```typescript
const {
  register,
  handleSubmit,
  formState: { errors },
} = useForm({
  resolver: zodResolver(myFormSchema),
})
```

## Data Fetching with React Query

This boilerplate uses **TanStack Query (React Query)** for server state management.

### Setup

The `QueryProvider` is already configured in `src/app/layout.tsx`:

```typescript
import { QueryProvider } from '@/components/providers/query-provider';

export default function RootLayout({ children }) {
  return (
    <QueryProvider>
      {children}
    </QueryProvider>
  );
}
```

### Custom Hooks

Pre-built hooks are available in `src/lib/api/auth.ts`:

**Queries** (data fetching):

```typescript
import { useSession } from "@/lib/api/auth";

function Profile() {
  const { data, isLoading, error } = useSession();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return <div>Welcome, {data?.user?.name}</div>;
}
```

**Mutations** (data modification):

```typescript
import { useSignIn, useSignUp, useSignOut } from "@/lib/api/auth";

function SignInForm() {
  const signInMutation = useSignIn();

  const onSubmit = async (data) => {
    try {
      await signInMutation.mutateAsync(data);
      // Success - redirect handled automatically
    } catch (error) {
      // Error handling
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* form fields */}
      <button disabled={signInMutation.isPending}>
        {signInMutation.isPending ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
}
```

### Available Hooks

| Hook                  | Purpose                   | Type     |
| --------------------- | ------------------------- | -------- |
| `useSession()`        | Get current user session  | Query    |
| `useSignIn()`         | Sign in user              | Mutation |
| `useSignUp()`         | Register new user         | Mutation |
| `useSignOut()`        | Sign out user             | Mutation |
| `useForgotPassword()` | Request password reset    | Mutation |
| `useVerifyOtp()`      | Verify OTP code           | Mutation |
| `useResetPassword()`  | Reset password with token | Mutation |

### Creating Custom Hooks

```typescript
import { useQuery, useMutation } from "@tanstack/react-query"

// Query example
export function useUser(userId: string) {
  return useQuery({
    queryKey: ["user", userId],
    queryFn: async () => {
      const response = await fetch(`/api/users/${userId}`)
      return response.json()
    },
  })
}

// Mutation example
export function useUpdateUser() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: UserData) => {
      const response = await fetch("/api/users", {
        method: "PUT",
        body: JSON.stringify(data),
      })
      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] })
    },
  })
}
```

### React Query Benefits

- **Automatic caching** - Reduces unnecessary API calls
- **Background refetching** - Keeps data fresh
- **Optimistic updates** - Instant UI feedback
- **Error handling** - Built-in retry logic
- **Loading states** - Easy loading/error management

## Auth & Middleware

`middleware.ts` inspects a demo cookie (`demo-auth`) to:

- Redirect anonymous users away from `/` and `/dashboard` to `/sign-in`.
- Skip auth screens when a session exists.
- Handle password reset flow routes.

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
    "*.{ts,tsx,js,jsx}": ["eslint --fix", "prettier --write"],
    "*.{json,css,md}": ["prettier --write"]
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

### Commit Message Structure

All commit messages must follow the **Conventional Commits** format:

```
<type>(<scope>): <subject>

[optional body]

[optional footer(s)]
```

#### Type (Required)

The type must be one of the following:

| Type       | Description                                                | Example                                       |
| ---------- | ---------------------------------------------------------- | --------------------------------------------- |
| `feat`     | A new feature                                              | `feat: add user profile page`                 |
| `fix`      | A bug fix                                                  | `fix: resolve sidebar overlap issue`          |
| `docs`     | Documentation only changes                                 | `docs: update README with setup instructions` |
| `style`    | Code style changes (formatting, missing semi-colons, etc.) | `style: format code with Prettier`            |
| `refactor` | Code refactoring without bug fixes or features             | `refactor: reorganize authentication flow`    |
| `perf`     | Performance improvements                                   | `perf: optimize image loading`                |
| `test`     | Adding or updating tests                                   | `test: add unit tests for auth utils`         |
| `chore`    | Changes to build process or auxiliary tools                | `chore: update dependencies`                  |
| `ci`       | CI/CD configuration changes                                | `ci: update GitHub Actions workflow`          |
| `build`    | Build system or external dependencies                      | `build: update Next.js to v16`                |
| `revert`   | Revert a previous commit                                   | `revert: revert "feat: add new feature"`      |

#### Scope (Optional)

The scope specifies the area of the codebase affected:

```bash
feat(auth): add password reset flow
fix(ui): resolve sidebar collapse issue
refactor(api): reorganize user endpoints
docs(readme): add installation instructions
```

Common scopes:

- `auth` - Authentication related
- `ui` - UI components
- `api` - API routes
- `config` - Configuration files
- `deps` - Dependencies
- `readme` - Documentation

#### Subject (Required)

- Use imperative mood ("add" not "added" or "adds")
- First letter lowercase
- No period at the end
- Maximum 72 characters
- Describe what the commit does, not why

**Good examples**:

```bash
feat: add user authentication
fix: resolve sidebar overlap issue
refactor: update authentication flow
```

**Bad examples**:

```bash
feat: Added user authentication  # Wrong mood
fix: Resolve sidebar overlap issue.  # Capital letter, period
feat: add user authentication and also update the login page and fix the bug where users can't log in  # Too long
```

#### Body (Optional)

Use the body to explain **what** and **why** vs. **how**:

```bash
feat(auth): add password reset flow

Implement forgot password functionality with OTP verification.
Users can now reset their password through email verification.

Closes #123
```

#### Footer (Optional)

Reference issues, breaking changes, etc.:

```bash
feat(api): add user endpoint

BREAKING CHANGE: User endpoint now requires authentication token
Closes #456
Fixes #789
```

#### Examples

**Simple commit**:

```bash
git commit -m "feat: add user profile page"
```

**Commit with scope**:

```bash
git commit -m "fix(ui): resolve sidebar overlap issue"
```

**Commit with body**:

```bash
git commit -m "feat(auth): add password reset flow

Implement forgot password functionality with OTP verification.
Users can now reset their password through email verification."
```

**Breaking change**:

```bash
git commit -m "feat(api): update authentication endpoint

BREAKING CHANGE: Authentication endpoint now requires API key in headers"
```

## Branch Structure

This project follows a **Git Flow**-inspired branching strategy for organized development.

### Branch Types

#### Main Branches

- **`main`** (or `master`)
  - Production-ready code
  - Always deployable
  - Protected branch (requires PR)
  - Only merged from `develop` or hotfix branches

- **`develop`**
  - Integration branch for features
  - Latest development changes
  - Merged into `main` for releases

#### Supporting Branches

- **`feature/*`** - New features
  - Branch from: `develop`
  - Merge back to: `develop`
  - Naming: `feature/user-authentication`, `feature/dashboard-stats`
  - Delete after merge

- **`bugfix/*`** - Bug fixes
  - Branch from: `develop`
  - Merge back to: `develop`
  - Naming: `bugfix/sidebar-overlap`, `bugfix/login-error`
  - Delete after merge

- **`hotfix/*`** - Critical production fixes
  - Branch from: `main`
  - Merge back to: `main` and `develop`
  - Naming: `hotfix/security-patch`, `hotfix/critical-bug`
  - Delete after merge

- **`release/*`** - Release preparation
  - Branch from: `develop`
  - Merge back to: `main` and `develop`
  - Naming: `release/v1.0.0`, `release/v2.0.0`
  - Delete after merge

### Branch Naming Convention

```
<type>/<description>
```

**Examples**:

```bash
feature/user-authentication
feature/dashboard-analytics
bugfix/sidebar-overlap
bugfix/login-validation-error
hotfix/security-patch
hotfix/critical-api-bug
release/v1.0.0
chore/update-dependencies
refactor/auth-flow
```

### Branch Workflow

#### Creating a Feature Branch

```bash
# Start from develop
git checkout develop
git pull origin develop

# Create and switch to feature branch
git checkout -b feature/user-profile

# Make changes and commit
git add .
git commit -m "feat(profile): add user profile page"

# Push to remote
git push origin feature/user-profile
```

#### Creating a Bugfix Branch

```bash
# Start from develop
git checkout develop
git pull origin develop

# Create bugfix branch
git checkout -b bugfix/sidebar-overlap

# Fix the issue
git add .
git commit -m "fix(ui): resolve sidebar overlap issue"

# Push to remote
git push origin bugfix/sidebar-overlap
```

#### Creating a Hotfix Branch

```bash
# Start from main
git checkout main
git pull origin main

# Create hotfix branch
git checkout -b hotfix/security-patch

# Fix the critical issue
git add .
git commit -m "fix(security): patch authentication vulnerability"

# Push to remote
git push origin hotfix/security-patch
```

### Pull Request Workflow

1. **Create Branch**: Create feature/bugfix/hotfix branch
2. **Make Changes**: Implement changes with proper commits
3. **Push Branch**: Push branch to remote repository
4. **Create PR**: Open Pull Request on GitHub
5. **Code Review**: Get team approval
6. **Merge**: Merge into target branch (usually `develop` or `main`)
7. **Delete Branch**: Delete branch after merge

### Branch Protection Rules

Recommended GitHub branch protection for `main`:

- ✅ Require pull request reviews
- ✅ Require status checks to pass (CI)
- ✅ Require branches to be up to date
- ✅ Require linear history
- ✅ Include administrators
- ✅ Restrict pushes to matching branches

### Workflow Summary

**Feature Development**:

```
develop → feature/user-auth → develop → main
```

**Bug Fix**:

```
develop → bugfix/login-error → develop → main
```

**Hotfix**:

```
main → hotfix/security-patch → main + develop
```

**Release**:

```
develop → release/v1.0.0 → main + develop
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

| File                         | Purpose                         |
| ---------------------------- | ------------------------------- |
| `.eslintrc.json`             | ESLint rules and configuration  |
| `.prettierrc.json`           | Prettier formatting rules       |
| `.prettierignore`            | Files to skip formatting        |
| `commitlint.config.ts`       | Commit message validation rules |
| `.husky/pre-commit`          | Pre-commit Git hook             |
| `.husky/commit-msg`          | Commit message Git hook         |
| `package.json` (lint-staged) | Files to lint/format on commit  |

## Deploy

```bash
yarn build
yarn start
```

Works on Vercel, Netlify, Render, Railway, etc. Optionally set `NEXT_PUBLIC_APP_URL` so server components can build absolute URLs.

## Repository Access & Permissions

### Public Repository Access

This repository is **public**, which means:

- ✅ **Anyone can clone** the repository
- ✅ **Anyone can view** the code
- ✅ **Anyone can fork** the repository
- ❌ **Only you (owner) and collaborators can push** code
- ❌ **Only you (owner) and collaborators can create branches** (if protected)

### Access Levels

#### Public Access (Read-Only)

- Clone: `git clone https://github.com/adil77672/nextjs-starter.git`
- View code, issues, pull requests
- Fork the repository
- Submit pull requests (if enabled)

#### Collaborator Access (Write)

- Push code to branches
- Create new branches
- Merge pull requests (if granted permission)
- Manage issues and pull requests

### Managing Collaborators

To add collaborators who can push code:

1. Go to **Settings** → **Collaborators and teams**
2. Click **Add people**
3. Enter GitHub username or email
4. Choose permission level:
   - **Write** - Can push to branches (recommended for developers)
   - **Maintain** - Can manage repository settings
   - **Admin** - Full repository access

### Branch Protection

To ensure only you and approved collaborators can push to main branches:

#### Protect `main` Branch

1. Go to **Settings** → **Branches**
2. Click **Add branch protection rule**
3. Set branch name pattern: `main`
4. Enable:
   - ✅ **Require a pull request before merging**
     - Require approvals: 1
     - Dismiss stale pull request approvals
   - ✅ **Require status checks to pass before merging**
     - Require branches to be up to date before merging
   - ✅ **Require linear history**
   - ✅ **Include administrators** (optional)
   - ✅ **Restrict pushes that create files**
   - ✅ **Do not allow bypassing the above settings**

#### Protect `develop` Branch

Similar setup for `develop` branch (optional, but recommended):

- Require pull request reviews
- Require status checks
- Allow force pushes: ❌ (disabled)

### Fork & Pull Request Workflow

For public contributors who want to contribute:

1. **Fork the repository**

   ```bash
   # On GitHub, click "Fork" button
   ```

2. **Clone your fork**

   ```bash
   git clone https://github.com/YOUR_USERNAME/nextjs-starter.git
   cd nextjs-starter
   ```

3. **Add upstream remote**

   ```bash
   git remote add upstream https://github.com/adil77672/nextjs-starter.git
   ```

4. **Create feature branch**

   ```bash
   git checkout -b feature/your-feature
   ```

5. **Make changes and commit**

   ```bash
   git add .
   git commit -m "feat: add your feature"
   git push origin feature/your-feature
   ```

6. **Create Pull Request**
   - Go to your fork on GitHub
   - Click "New Pull Request"
   - Select your branch
   - Fill out PR description
   - Submit for review

### Permission Summary

| Action               | Public Users | Collaborators | Owner |
| -------------------- | ------------ | ------------- | ----- |
| Clone repository     | ✅           | ✅            | ✅    |
| View code            | ✅           | ✅            | ✅    |
| Fork repository      | ✅           | ✅            | ✅    |
| Create branches      | ❌\*         | ✅            | ✅    |
| Push to branches     | ❌           | ✅            | ✅    |
| Create Pull Requests | ✅           | ✅            | ✅    |
| Merge Pull Requests  | ❌           | ✅\*\*        | ✅    |
| Manage settings      | ❌           | ❌            | ✅    |
| Delete repository    | ❌           | ❌            | ✅    |

\* Can create branches in their fork  
\*\* If granted merge permission

### Security Best Practices

1. **Never commit secrets** - Use environment variables
2. **Use `.env.example`** - Document required environment variables
3. **Enable branch protection** - Prevent direct pushes to main
4. **Require PR reviews** - Code review before merging
5. **Use GitHub Secrets** - For CI/CD sensitive data
6. **Regular dependency updates** - Keep dependencies secure

### Environment Variables

Create a `.env.example` file (already in `.gitignore`):

```bash
# .env.example
NEXT_PUBLIC_APP_URL=http://localhost:3003
DATABASE_URL=your_database_url
API_KEY=your_api_key
```

**Never commit** `.env` or `.env.local` files!

## GitHub Actions

The project includes pre-configured GitHub Actions workflows:

- **CI**: Runs on every push/PR - builds and lints the project
- **Release**: Automatically creates releases using semantic-release
- **Dependabot**: Monthly dependency updates

No additional GitHub configuration required—works out of the box!
