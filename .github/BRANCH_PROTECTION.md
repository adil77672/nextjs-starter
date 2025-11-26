# How to Protect Your Main Branch on GitHub

This guide will walk you through protecting your `main` branch to prevent unauthorized pushes and ensure code quality.

## Step-by-Step Instructions

### 1. Navigate to Repository Settings

1. Go to your repository on GitHub: `https://github.com/adil77672/nextjs-starter`
2. Click on the **Settings** tab (top navigation bar)
3. In the left sidebar, click on **Branches**

### 2. Add Branch Protection Rule

1. Under **Branch protection rules**, click **Add branch protection rule**
2. In the **Branch name pattern** field, enter: `main`
3. You'll see various protection options appear below

### 3. Configure Protection Settings

Enable the following settings (recommended):

#### ✅ Require a pull request before merging

- Check the box: **Require a pull request before merging**
- **Required number of approvals before merging**: Set to `1` (or more if you have a team)
- ✅ **Dismiss stale pull request approvals when new commits are pushed**
- ✅ **Require review from Code Owners** (if you have a CODEOWNERS file)

#### ✅ Require status checks to pass before merging

- Check the box: **Require status checks to pass before merging**
- ✅ **Require branches to be up to date before merging**
- Under **Status checks that are required**, select:
  - `build` (if your CI workflow creates this check)
  - `lint` (if your CI workflow creates this check)

#### ✅ Require conversation resolution before merging

- Check the box: **Require conversation resolution before merging**
- This ensures all PR comments are addressed

#### ✅ Require linear history

- Check the box: **Require linear history**
- Prevents merge commits, enforces rebase/squash merges

#### ✅ Require signed commits (Optional but Recommended)

- Check the box: **Require signed commits**
- Ensures commits are cryptographically signed

#### ✅ Require deployments to succeed before merging (Optional)

- Check the box if you have deployment checks
- Only enable if you have deployment workflows

### 4. Restriction Settings

#### ✅ Restrict pushes that create files

- Check the box: **Restrict pushes that create files**
- Prevents direct file creation without PR

#### ✅ Restrict pushes that create files matching specified patterns (Optional)

- Add patterns like `*.env`, `*.key` to prevent committing secrets

#### ✅ Do not allow bypassing the above settings

- ✅ **Include administrators** - Even you (owner) must follow these rules
- This is important for security!

### 5. Save the Rule

1. Scroll to the bottom
2. Click **Create** button
3. Your `main` branch is now protected! 🎉

## What This Means

After protection is enabled:

- ❌ **No direct pushes** to `main` branch (even from you)
- ✅ **All changes** must go through Pull Requests
- ✅ **PRs must be reviewed** before merging
- ✅ **CI checks must pass** before merging
- ✅ **Linear history** is maintained

## Making Changes to Main Branch

Since you can't push directly, here's how to make changes:

### Option 1: Create a Branch and PR (Recommended)

```bash
# Create a feature branch
git checkout -b feature/your-feature

# Make your changes
git add .
git commit -m "feat: your feature"

# Push to remote
git push origin feature/your-feature

# Create Pull Request on GitHub
# Then merge via GitHub UI
```

### Option 2: Temporary Bypass (If Needed)

If you absolutely need to push directly (emergency hotfix):

1. Go to **Settings** → **Branches**
2. Temporarily uncheck **Include administrators**
3. Make your push
4. Re-enable **Include administrators**

⚠️ **Warning**: Only do this in emergencies!

## Protecting Other Branches

You can also protect `develop` branch with similar settings:

1. Follow the same steps above
2. Use branch pattern: `develop`
3. You might want fewer restrictions (e.g., allow force push for cleanup)

## Verification

To verify protection is working:

1. Try to push directly to main:
   ```bash
   git checkout main
   git push origin main
   ```
2. You should see an error like:
   ```
   ! [remote rejected] main -> main (protected branch hook declined)
   ```

## Recommended Settings Summary

For a **production-ready** repository:

```
✅ Require a pull request before merging
   - Required approvals: 1
   - Dismiss stale approvals: Yes

✅ Require status checks to pass
   - Require up to date: Yes
   - Required checks: build, lint

✅ Require conversation resolution
✅ Require linear history
✅ Restrict pushes that create files
✅ Include administrators (even owner must follow rules)
```

## Troubleshooting

### "I can't push to main even though I'm the owner"

- This is **expected behavior** when "Include administrators" is enabled
- Create a branch and PR instead
- Or temporarily disable "Include administrators" (not recommended)

### "My PR can't be merged"

- Check that all required status checks have passed
- Ensure you have the required number of approvals
- Make sure all conversations are resolved
- Ensure your branch is up to date with main

### "CI checks are not showing"

- Make sure your GitHub Actions workflow is running
- Check that workflows are creating status checks with the correct names
- Verify workflow files are in `.github/workflows/`

## Additional Security

Consider also enabling:

1. **Required reviewers** - Specific people must approve
2. **CODEOWNERS file** - Automatic reviewer assignment
3. **Security policy** - Document how to report vulnerabilities
4. **Dependabot alerts** - Automatic security updates

---

**Need help?** Check GitHub's official documentation:
https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches
