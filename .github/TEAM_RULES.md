# Team Rules & Guidelines

This document outlines the standard rules and best practices for all our projects. All team members must follow these guidelines across all repositories.

## ⚠️ Important: Branch Creation

When creating a new branch, **always start from the correct base branch**:

- **Features & Bugfixes**: Start from `develop` (or `main` if no develop exists)
- **Hotfixes**: Start from `main`

**Wrong way** ❌:

```bash
git checkout feature/old-branch
git checkout -b feature/new-branch  # ❌ Creates from old branch!
```

**Correct way** ✅:

```bash
git checkout develop
git pull origin develop
git checkout -b feature/new-branch  # ✅ Creates from develop!
```

## 📝 Commit Rules

### Commit Message Format

All commits **MUST** follow the Conventional Commits format:

```
<type>(<scope>): <subject>

[optional body]

[optional footer]
```

### Required Format

- **Type** is required and must be one of: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `chore`, `ci`, `build`, `revert`
- **Scope** is optional (e.g., `auth`, `ui`, `api`)
- **Subject** is required:
  - Use imperative mood ("add" not "added")
  - First letter lowercase
  - No period at the end
  - Maximum 72 characters

### Examples

✅ **Valid commits**:

```bash
feat: add user authentication
fix(ui): resolve sidebar overlap issue
refactor(auth): update authentication flow
docs: update README with setup instructions
chore: update dependencies
```

❌ **Invalid commits** (will be rejected):

```bash
Added user authentication          # Missing type
fix bug                            # Missing colon
FEAT: new feature                  # Wrong case
feat: Add user authentication      # Capital letter
feat: add user authentication.     # Period at end
```

### Commit Rules

1. ✅ **One logical change per commit**
   - Don't mix unrelated changes
   - Keep commits focused and atomic

2. ✅ **Write clear, descriptive messages**
   - Explain what and why, not how
   - Reference issues when applicable

3. ✅ **Test before committing**
   - Code should compile without errors
   - Run linting: `yarn lint`
   - Run formatting: `yarn format:check`

4. ❌ **Never commit**:
   - Secrets or API keys
   - `.env` files
   - `node_modules`
   - Build artifacts
   - Temporary files

## 🌿 Branch Rules

### Branch Naming Convention

All branches **MUST** follow this format:

```
<type>/<description>
```

### Branch Types

| Type        | Use Case                  | Example                       |
| ----------- | ------------------------- | ----------------------------- |
| `feature/`  | New features              | `feature/user-authentication` |
| `bugfix/`   | Bug fixes                 | `bugfix/sidebar-overlap`      |
| `hotfix/`   | Critical production fixes | `hotfix/security-patch`       |
| `release/`  | Release preparation       | `release/v1.0.0`              |
| `chore/`    | Maintenance tasks         | `chore/update-dependencies`   |
| `refactor/` | Code refactoring          | `refactor/auth-flow`          |
| `docs/`     | Documentation             | `docs/api-documentation`      |

### Branch Rules

1. ✅ **Always branch from the correct base branch**:

   **For features and bugfixes**: Branch from `develop` (or `main` if no develop branch exists)

   ```bash
   # Step 1: Switch to develop branch (THIS IS THE ORIGIN/STARTING POINT)
   git checkout develop

   # Step 2: Pull latest changes from remote
   git pull origin develop

   # Step 3: Create and switch to your new feature branch FROM develop
   git checkout -b feature/your-feature
   ```

   **For hotfixes**: Branch from `main`

   ```bash
   git checkout main
   git pull origin main
   git checkout -b hotfix/security-patch
   ```

   **⚠️ Important**:
   - The `-b` flag creates a new branch **FROM your current branch**
   - If you're on `develop`, the new branch will be created **FROM develop**
   - If you're on `feature/old-branch`, the new branch will be created **FROM that old branch** (WRONG!)
   - Always switch to `develop` (or `main`) first!

2. ✅ **Use descriptive names**
   - Good: `feature/user-profile-page`
   - Bad: `feature/stuff`, `fix/bug`, `test`

3. ✅ **Keep branches focused**
   - One feature/fix per branch
   - Don't mix unrelated changes

4. ✅ **Keep branches up to date**

   ```bash
   # Regularly sync with develop
   git checkout develop
   git pull origin develop
   git checkout feature/your-feature
   git rebase develop  # or git merge develop
   ```

5. ❌ **Never push directly to**:
   - `main` branch (protected)
   - `develop` branch (if protected)

6. ✅ **Delete branches after merge**
   - Clean up merged branches
   - Keep repository organized

## 🔄 Pull Request Rules

### PR Requirements

1. ✅ **All PRs must**:
   - Have a descriptive title following commit format
   - Include a description explaining changes
   - Reference related issues (e.g., `Closes #123`)
   - Pass all CI checks
   - Have at least 1 approval (if required)

2. ✅ **PR Title Format**:

   ```
   <type>(<scope>): <description>
   ```

   Example: `feat(auth): add password reset flow`

3. ✅ **PR Description Template**:

   ```markdown
   ## Description

   Brief description of changes

   ## Type of Change

   - [ ] Bug fix
   - [ ] New feature
   - [ ] Breaking change
   - [ ] Documentation update

   ## Testing

   - [ ] Tests pass locally
   - [ ] Manual testing completed

   ## Checklist

   - [ ] Code follows style guidelines
   - [ ] Self-review completed
   - [ ] Comments added for complex code
   - [ ] Documentation updated
   - [ ] No new warnings generated
   ```

### PR Workflow

1. **Create Branch** → Make changes → Commit
2. **Push Branch** → `git push origin feature/your-feature`
3. **Create PR** → On GitHub, create Pull Request
4. **Wait for Review** → Address review comments
5. **Merge** → After approval, merge via GitHub UI
6. **Delete Branch** → Clean up after merge

### PR Review Rules

1. ✅ **Reviewers must**:
   - Check code quality and style
   - Verify tests are included
   - Ensure no breaking changes (unless documented)
   - Approve or request changes

2. ✅ **Authors must**:
   - Address all review comments
   - Update PR description if needed
   - Keep PR up to date with base branch

3. ❌ **Don't merge your own PR** (unless solo project)
   - Always get at least one review
   - Use "Squash and merge" for cleaner history

## 🧹 Code Quality Rules

### Before Committing

1. ✅ **Run linting**:

   ```bash
   yarn lint
   yarn lint:fix  # Auto-fix issues
   ```

2. ✅ **Check formatting**:

   ```bash
   yarn format:check
   yarn format  # Auto-format
   ```

3. ✅ **Test your changes**:
   ```bash
   yarn build  # Ensure it builds
   yarn dev    # Test locally
   ```

### Code Style

1. ✅ **Follow project's linting rules** (ESLint, etc.)
2. ✅ **Use code formatter** (Prettier, etc.) - format on save
3. ✅ **Use TypeScript** (if project uses it) - No `any` types without justification
4. ✅ **Write meaningful variable/function names**
5. ✅ **Add comments for complex logic**
6. ✅ **Keep functions small and focused**
7. ✅ **Follow framework conventions** (React, Vue, Angular, etc.)

### File Organization

1. ✅ **Follow project structure**:
   - Organize files logically by feature/domain
   - Keep related files together
   - Use consistent naming conventions
   - Follow framework-specific conventions (Next.js, React, Vue, etc.)
   - Check project's README for structure guidelines

2. ✅ **Use proper imports**:
   - Use absolute imports when configured
   - Avoid deep relative paths (`../../../`)
   - Group imports: external → internal → relative
   - Use path aliases when available
   - Follow project's import conventions

## 🚫 What NOT to Do

### Never Commit

- ❌ Secrets, API keys, passwords
- ❌ `.env` files (use `.env.example`)
- ❌ `node_modules/`
- ❌ Build artifacts (`.next/`, `dist/`)
- ❌ Temporary files
- ❌ Large binary files
- ❌ Personal notes or TODOs

### Never Do

- ❌ Force push to shared branches
- ❌ Commit directly to `main` or `develop`
- ❌ Skip code reviews
- ❌ Ignore linting errors
- ❌ Commit broken code
- ❌ Mix unrelated changes in one commit
- ❌ Write vague commit messages

## ✅ Best Practices

### Daily Workflow

1. **Start of day**:

   ```bash
   git checkout develop
   git pull origin develop
   ```

2. **Create feature branch**:

   ```bash
   git checkout -b feature/your-feature
   ```

3. **Make changes and commit**:

   ```bash
   git add .
   git commit -m "feat: your feature description"
   ```

4. **Push and create PR**:

   ```bash
   git push origin feature/your-feature
   # Create PR on GitHub
   ```

5. **After PR merge**:
   ```bash
   git checkout develop
   git pull origin develop
   git branch -d feature/your-feature  # Delete local branch
   ```

### Communication

1. ✅ **Use PR comments** for discussions
2. ✅ **Mention reviewers** when PR is ready
3. ✅ **Update PR description** if scope changes
4. ✅ **Link related issues** in PR description

### Security

1. ✅ **Never commit secrets**
2. ✅ **Use environment variables**
3. ✅ **Review dependencies** for security updates
4. ✅ **Report vulnerabilities** privately

## 📋 Checklist for Every PR

Before submitting a PR, ensure:

- [ ] Code follows style guidelines
- [ ] All tests pass
- [ ] Linting passes (`yarn lint`)
- [ ] Formatting is correct (`yarn format:check`)
- [ ] No console.logs or debug code
- [ ] Documentation updated (if needed)
- [ ] Commit messages follow convention
- [ ] Branch name follows convention
- [ ] PR description is complete
- [ ] Related issues are referenced

## 🎯 Quick Reference

### Commit Types

```
feat:     New feature
fix:      Bug fix
docs:     Documentation
style:    Formatting
refactor: Code restructuring
perf:     Performance
test:     Tests
chore:    Maintenance
ci:       CI/CD
build:    Build system
revert:   Revert commit
```

### Branch Types

```
feature/  - New features
bugfix/   - Bug fixes
hotfix/   - Critical fixes
release/  - Releases
chore/    - Maintenance
refactor/ - Refactoring
docs/     - Documentation
```

### Common Commands

```bash
# Step 1: Switch to base branch (develop or main)
git checkout develop

# Step 2: Pull latest changes
git pull origin develop

# Step 3: Create and switch to new branch FROM develop
git checkout -b feature/your-feature

# Step 4: Make changes and commit
git add .
git commit -m "feat: add user profile"

# Step 5: Push branch to remote
git push origin feature/your-feature

# Step 6: Sync your branch with latest develop (if needed)
git checkout develop
git pull origin develop
git checkout feature/your-feature
git rebase develop  # or git merge develop
```

**Key Point**: `git checkout -b feature/your-feature` creates a branch **FROM your current branch**. Always be on `develop` (or `main`) before creating a new branch!

### Project-Specific Commands

Each project may have different commands. Check the project's `package.json` for available scripts:

- `npm run` or `yarn` or `pnpm run` - List all available scripts
- Common scripts: `dev`, `build`, `test`, `lint`, `format`
- Always check project README for specific commands

```

## 🆘 Need Help?

- **Commit format issues?** Check `.github/TEAM_RULES.md` (this file)
- **Branch protection?** See `.github/BRANCH_PROTECTION.md`
- **Git workflow?** See `README.md` Branch Structure section
- **Code style?** Check `eslint.config.mjs` and `.prettierrc.json`

---

**Remember**: These rules ensure code quality, maintainability, and smooth collaboration. Following them makes everyone's life easier! 🚀
```
