# Getting Started with Deployment & Versioning

This guide will help you set up and use the automated deployment and semantic versioning workflow.

## Quick Setup (5 minutes)

### 1. Install Dependencies
```bash
cd /home/enock/mod3project
npm install
npm install --prefix my-app
```

### 2. Install Semantic Release & Git Hooks
```bash
npm install
npx husky install
npx husky add .husky/pre-commit "npm run lint --prefix my-app"
npx husky add .husky/commit-msg "npx --no -- commitlint --edit \$1"
```

### 3. Verify Setup
```bash
# Test the app builds successfully
npm run build

# Run tests
npm run test

# Run linting
npm run lint
```

## Understanding the Workflow

### What Happens When You Push Code?

**Push to `develop` branch:**
1. ✅ Tests run and code is linted
2. ✅ Application builds successfully
3. 🚀 Automatic deployment to staging
4. 📝 Beta pre-release created (e.g., `1.0.0-beta.1`)

**Push to `main` branch:**
1. ✅ Tests run and code is linted
2. ✅ Application builds successfully
3. 🔖 Automatic version bump and release
4. 🚀 Automatic deployment to production
5. 📋 CHANGELOG.md automatically updated
6. 🏷️ GitHub Release created

## Semantic Versioning Basics

Version format: `MAJOR.MINOR.PATCH` (e.g., `1.2.3`)

| Commit Type | Example | Version Change |
|---|---|---|
| `feat:` | `feat(auth): add login` | `1.0.0` → `1.1.0` |
| `fix:` | `fix(chart): resolve issue` | `1.0.0` → `1.0.1` |
| `BREAKING CHANGE:` | `feat!: redesign API` | `1.0.0` → `2.0.0` |

See [VERSIONING.md](VERSIONING.md) for detailed examples.

## Common Workflows

### Feature Development

```bash
# 1. Create feature branch
git checkout -b feature/my-feature

# 2. Make changes
# ... edit files ...

# 3. Test locally
npm run lint
npm run test
npm run build

# 4. Commit with conventional format
git commit -m "feat(dashboard): add expense charts"

# 5. Push and create PR
git push origin feature/my-feature
# Then create a PR on GitHub to merge into develop
```

### Bug Fix

```bash
# 1. Create fix branch
git checkout -b fix/critical-issue

# 2. Fix the bug
# ... edit files ...

# 3. Commit with fix type
git commit -m "fix(auth): resolve login validation"

# 4. Push and create PR to main
git push origin fix/critical-issue
# Create PR to merge into main for quick production fix
```

### Breaking Changes

```bash
# 1. Create branch
git checkout -b feature/api-redesign

# 2. Make breaking changes
# ... edit files ...

# 3. Commit with BREAKING CHANGE footer
git commit -m "feat(api): redesign endpoints

BREAKING CHANGE: Old /api/v1 endpoints removed"

# 4. This will automatically bump MAJOR version
```

## Deployment Targets

The workflows are configured but need your deployment commands:

### Add Staging Deployment
Edit `.github/workflows/deploy.yml` → `deploy-staging` job:

```yaml
- name: Deploy to staging environment
  run: npm run deploy:staging
```

Add to `my-app/package.json`:
```json
"scripts": {
  "deploy:staging": "vercel deploy --prod"
}
```

### Add Production Deployment
Edit `.github/workflows/deploy.yml` → `deploy-production` job:

```yaml
- name: Deploy to production environment
  run: npm run deploy:production
```

Add to `my-app/package.json`:
```json
"scripts": {
  "deploy:production": "vercel deploy"
}
```

## Monitoring Releases

1. **View Releases**: Go to GitHub repo → **Releases** tab
2. **View Changelog**: Check [CHANGELOG.md](CHANGELOG.md)
3. **View Workflow Logs**: Go to **Actions** tab
4. **Check Version**: `npm list` in project root

## Troubleshooting

### "Workflow didn't create a release"
✓ Check commit messages follow `feat:`, `fix:`, etc.  
✓ Verify you pushed to `main` branch  
✓ Check GitHub Actions logs for errors  

### "Linting failed"
```bash
npm run lint --prefix my-app  # See what's wrong
npm run lint --prefix my-app -- --fix  # Auto-fix issues
```

### "Tests failed"
```bash
npm run test --prefix my-app  # Run tests locally first
npm run test --prefix my-app -- --coverage  # See coverage
```

### "Build failed"
```bash
npm run build --prefix my-app  # Debug locally
```

## Important Files

| File | Purpose |
|---|---|
| [DEPLOYMENT.md](DEPLOYMENT.md) | Detailed deployment guide |
| [VERSIONING.md](VERSIONING.md) | Semantic versioning guide |
| [.releaserc](.releaserc) | Semantic-release configuration |
| [.github/workflows/deploy.yml](.github/workflows/deploy.yml) | Deploy workflow |
| [.github/workflows/release.yml](.github/workflows/release.yml) | Release workflow |
| [.commitlintrc.json](.commitlintrc.json) | Commit message rules |

## Next Steps

1. ✅ Install dependencies: `npm install`
2. ✅ Test locally: `npm run test` and `npm run build`
3. ✅ Configure deployment commands in `.github/workflows/deploy.yml`
4. ✅ Add GitHub Secrets for deployment credentials
5. ✅ Create a feature branch and make your first commit
6. ✅ Push and watch GitHub Actions automate everything!

## Resources

- [Semantic Versioning](https://semver.org/)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Semantic Release](https://github.com/semantic-release/semantic-release)

---

**Questions?** Check the detailed guides: [DEPLOYMENT.md](DEPLOYMENT.md) and [VERSIONING.md](VERSIONING.md)
