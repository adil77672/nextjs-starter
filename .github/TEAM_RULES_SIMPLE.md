# Team Rules

Team, please follow these rules on **all projects** to keep our workflow clean and consistent:

## 🔹 Branch Creation

Always create new branches from the correct base branch:

**Features & bugfixes:**

```bash
git checkout develop
git pull origin develop
git checkout -b feature/your-branch
```

**Hotfixes:**

```bash
git checkout main
git pull origin main
git checkout -b hotfix/your-hotfix
```

❌ **Do NOT create new branches from old feature branches.**

## 🔹 Branch Naming

Use clear, proper naming:

- `feature/login-screen`
- `bugfix/sidebar-issue`
- `hotfix/payment-crash`

## 🔹 Commit Rules

Follow Conventional Commits:

```
type(scope): message
```

**Examples:**

- `feat(auth): add login API`
- `fix(ui): fix button alignment`
- `docs: update README`

**Types:** `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `chore`, `ci`, `build`

## 🔹 Before Committing

Run these every time:

```bash
yarn lint
yarn format:check
# or npm/pnpm/bun depending on project
```

**Never commit:**

- `.env` files
- Secrets
- Build folders
- `node_modules`

## 🔹 Pull Requests

- PR titles must follow commit format
- Include a clear description
- All PRs need review
- Don't merge your own PR
- Keep PRs small and focused

---

**Questions?** Check `.github/TEAM_RULES.md` for detailed guidelines.
