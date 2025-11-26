# Contributing Guide

Thank you for your interest in contributing! This document provides guidelines for contributing to this project.

## 📚 Quick Links

- **Team Rules**: [`.github/TEAM_RULES.md`](.github/TEAM_RULES.md) - Complete team guidelines
- **Branch Protection**: [`.github/BRANCH_PROTECTION.md`](.github/BRANCH_PROTECTION.md) - How to protect branches
- **Project Structure**: See [README.md](README.md#project-structure) - Code organization

## 🚀 Getting Started

1. **Fork the repository**
2. **Clone your fork**:

   ```bash
   git clone https://github.com/YOUR_USERNAME/nextjs-starter.git
   cd nextjs-starter
   ```

3. **Add upstream remote**:

   ```bash
   git remote add upstream https://github.com/adil77672/nextjs-starter.git
   ```

4. **Install dependencies**:

   ```bash
   yarn install
   yarn prepare  # Setup Husky hooks
   ```

5. **Create a branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## 📝 Commit Guidelines

### Format

All commits **MUST** follow Conventional Commits:

```
<type>(<scope>): <subject>
```

### Examples

```bash
feat: add user authentication
fix(ui): resolve sidebar overlap
docs: update README
refactor(auth): simplify login flow
```

### Types

- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation
- `style` - Formatting
- `refactor` - Code restructuring
- `perf` - Performance
- `test` - Tests
- `chore` - Maintenance

**See [TEAM_RULES.md](.github/TEAM_RULES.md) for complete commit rules.**

## 🌿 Branch Guidelines

### Naming

```
<type>/<description>
```

### Examples

```bash
feature/user-authentication
bugfix/sidebar-overlap
hotfix/security-patch
chore/update-dependencies
```

**See [TEAM_RULES.md](.github/TEAM_RULES.md) for complete branch rules.**

## 🔄 Pull Request Process

1. **Update your fork**:

   ```bash
   git checkout develop
   git pull upstream develop
   git push origin develop
   ```

2. **Create your branch**:

   ```bash
   git checkout -b feature/your-feature
   ```

3. **Make your changes**:
   - Write clean, tested code
   - Follow code style guidelines
   - Update documentation if needed

4. **Commit your changes**:

   ```bash
   git add .
   git commit -m "feat: your feature description"
   ```

5. **Push to your fork**:

   ```bash
   git push origin feature/your-feature
   ```

6. **Create Pull Request**:
   - Go to your fork on GitHub
   - Click "New Pull Request"
   - Fill out the PR template
   - Wait for review

## ✅ PR Checklist

Before submitting, ensure:

- [ ] Code follows style guidelines
- [ ] All tests pass
- [ ] Linting passes (`yarn lint`)
- [ ] Formatting is correct (`yarn format:check`)
- [ ] Commit messages follow convention
- [ ] Branch name follows convention
- [ ] PR description is complete
- [ ] No breaking changes (or documented)

## 🎯 Code Standards

- **TypeScript** - Use proper types, avoid `any`
- **ESLint** - Follow configured rules
- **Prettier** - Auto-format on save
- **React Hook Form** - Use for all forms
- **Zod** - Validate all form inputs
- **React Query** - Use for data fetching

## 📖 Documentation

- Update README if adding features
- Add JSDoc comments for complex functions
- Update type definitions if needed

## 🐛 Reporting Issues

Use GitHub Issues to report bugs or request features:

1. Check if issue already exists
2. Use clear, descriptive title
3. Provide steps to reproduce
4. Include environment details
5. Add screenshots if applicable

## 💬 Getting Help

- Check [TEAM_RULES.md](.github/TEAM_RULES.md) for guidelines
- Review existing PRs for examples
- Ask questions in PR comments

---

Thank you for contributing! 🎉
