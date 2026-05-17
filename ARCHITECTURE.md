# Deployment & Versioning Architecture

## System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                        Developer Workflow                       │
│  Create Branch → Commit → Push → Create PR → Code Review       │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                    GitHub Actions Workflows                     │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  1. COMMITLINT WORKFLOW (on all PRs)                           │
│     └─ Validates commit messages match conventional format      │
│                                                                 │
│  2. DEPLOY WORKFLOW (on push/PR)                               │
│     ├─ Lint Code                                               │
│     ├─ Run Tests                                               │
│     ├─ Generate Coverage Reports                               │
│     ├─ Build Application                                       │
│     └─ Deploy to Staging/Production based on branch            │
│                                                                 │
│  3. RELEASE WORKFLOW (on push to main)                         │
│     ├─ Analyze Commits                                         │
│     ├─ Determine Version Number                                │
│     ├─ Generate Changelog                                      │
│     ├─ Create GitHub Release                                   │
│     └─ Update package.json version                             │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                    Version & Release Tags                       │
│                                                                 │
│  Git Tag: v1.2.3                                               │
│  GitHub Release with changelog                                 │
│  CHANGELOG.md updated                                          │
│  package.json version bumped                                   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                    Deployment Environments                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  STAGING (develop branch)          PRODUCTION (main branch)    │
│  └─ Beta Pre-releases              └─ Stable Releases          │
│    (e.g., 1.0.0-beta.1)              (e.g., 1.0.0)            │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## Versioning Flow

```
COMMIT TYPE → VERSION BUMP → RELEASE

feat(scope):        → MINOR    → v1.1.0
fix(scope):         → PATCH    → v1.0.1
docs/style/etc:     → NONE     → (no release)
feat(scope)!:       → MAJOR    → v2.0.0 (breaking change)
```

## File Structure

```
/home/enock/mod3project/
├── .github/
│   └── workflows/
│       ├── deploy.yml              # Deploy workflow
│       ├── release.yml             # Release workflow
│       └── commitlint.yml          # Commit validation
├── .husky/
│   └── commit-msg                  # Local commit hook
├── src/                            # Application source
├── my-app/                         # React app
├── .releaserc                      # Semantic-release config
├── .commitlintrc.json              # Commit linting config
├── .gitignore                      # Git ignore patterns
├── package.json                    # Root config (UPDATED)
├── CHANGELOG.md                    # Auto-generated changelog
├── README.md                       # Updated with CI/CD info
├── SETUP_COMPLETE.md               # Setup checklist
├── DEPLOYMENT_QUICKSTART.md        # 5-minute quick start
├── DEPLOYMENT.md                   # Complete deployment guide
├── VERSIONING.md                   # Versioning reference
└── ARCHITECTURE.md                 # This file
```

## Configuration Files

### `.releaserc`
Controls semantic-release behavior:
- Analyzes commits to determine version bumps
- Generates changelog from commits
- Creates GitHub releases
- Updates package.json versions
- Publishes release notes

### `.commitlintrc.json`
Enforces commit message format:
- Validates type (feat, fix, etc.)
- Ensures proper scope and subject
- Prevents invalid commits
- Works with GitHub Actions

### `.gitignore`
Prevents committing unnecessary files:
- Dependencies (node_modules)
- Build outputs (dist/)
- Environment files
- IDE and OS files

## Workflow Triggers

### Deploy Workflow (`deploy.yml`)
- **Trigger**: Push or PR to `main` or `develop`
- **Jobs**:
  - `test-and-build`: Always runs (linting, tests, build)
  - `deploy-staging`: Runs on push to `develop`
  - `deploy-production`: Runs on push to `main`

### Release Workflow (`release.yml`)
- **Trigger**: Push to `main` (main only!)
- **Jobs**:
  - `release`: Creates semantic release on push
  - `validate-pr`: Validates PRs with conventional commits

### Commitlint Workflow (`commitlint.yml`)
- **Trigger**: PR to `main`
- **Job**: Validates all commit messages in PR

## Branch Strategy

### Main Branch (`main`)
```
Purpose: Production-ready code
├─ All PRs must pass checks
├─ Merge triggers automatic release
├─ Version bumped automatically
└─ Deployed to production
```

### Develop Branch (`develop`)
```
Purpose: Integration and staging
├─ Feature branches merge here
├─ Deploy to staging on push
├─ Beta pre-releases created
└─ Merge to main when ready
```

### Feature Branches
```
Naming: feature/*, fix/*, refactor/*, etc.
├─ Created from develop
├─ Require PR to develop
├─ Must pass all checks
└─ Deleted after merge
```

## Semantic Release Process

```
Step 1: Analyze Commits
  └─ Read commits since last release
  └─ Determine type (feat, fix, breaking)

Step 2: Calculate Version
  ├─ feat → MINOR (1.0.0 → 1.1.0)
  ├─ fix → PATCH (1.0.0 → 1.0.1)
  ├─ breaking → MAJOR (1.0.0 → 2.0.0)
  └─ none → skip release

Step 3: Generate Changelog
  ├─ Create release notes from commits
  ├─ Organize by type (Features, Fixes, etc.)
  └─ Add to CHANGELOG.md

Step 4: Create Release
  ├─ Update package.json version
  ├─ Create git tag (v1.2.3)
  ├─ Create GitHub Release
  └─ Push changes to repository
```

## Continuous Integration Checklist

Every push to `main` triggers:
```
[1] Lint Code
    ├─ ESLint validation
    └─ Code style checks

[2] Run Tests
    ├─ Unit tests
    ├─ Integration tests
    └─ Coverage reports

[3] Build Application
    ├─ Vite build
    ├─ Bundle optimization
    └─ Artifact creation

[4] Semantic Release
    ├─ Version calculation
    ├─ Changelog generation
    └─ GitHub Release creation

[5] Deploy to Production
    └─ Custom deployment script
```

## Integration Points

### GitHub Actions ↔ Semantic Release
- Semantic Release runs in GitHub Actions
- Creates commits with version changes
- Pushes tags to repository
- Creates release with assets

### Conventional Commits ↔ Semantic Versioning
- Commit format determines version bump
- Automated, no manual versioning needed
- Changelog auto-generated from commits
- Clear project history

### GitHub PRs ↔ Commit Validation
- Commitlint validates PR commits
- Fails if commits don't match format
- Prevents invalid commits from merging
- Ensures smooth release process

## Environment Variables & Secrets

### Required GitHub Secrets
```
GITHUB_TOKEN - Auto-provided by GitHub Actions
```

### Optional Custom Secrets
```
DEPLOY_TOKEN         # For deployment
AWS_ACCESS_KEY_ID    # For AWS deployments
VERCEL_TOKEN         # For Vercel deployments
slack_webhook        # For notifications
```

## Monitoring & Observability

### GitHub Actions Dashboard
- View all workflow runs
- Check build status
- Review step-by-step logs
- Download artifacts

### GitHub Releases Page
- View all releases
- Download binaries
- Read changelog
- Track version history

### CHANGELOG.md
- Auto-updated with each release
- Human-readable version history
- Organized by type and version
- Semantic information preserved

## Troubleshooting Flow

```
Issue: Workflow Failed?
├─ Check logs in Actions tab
├─ Look for specific error message
├─ Run same command locally
└─ Fix and push again

Issue: Release Not Created?
├─ Verify commits follow format
├─ Check branch is main
├─ Review commit-analyzer logs
└─ Ensure breaking change noted

Issue: Deployment Failed?
├─ Check deployment script exists
├─ Verify credentials/secrets
├─ Test deployment locally
└─ Check environment setup
```

## Performance & Optimization

### Caching
- NPM cache: Speeds up dependency installation
- Docker layers: Cached if available

### Artifacts
- Build artifacts stored for 7 days
- Coverage reports uploaded to Codecov
- Release assets attached to GitHub Release

### Parallel Jobs
- Test and build run in parallel for each Node version
- Faster feedback (tests run on 18.x and 20.x)

## Security Considerations

### Commit Signing (Optional)
```bash
git commit -S -m "feat: description"  # Sign commits
```

### Branch Protection
Recommended GitHub settings:
```
✅ Require PR reviews
✅ Require status checks to pass
✅ Require commits to be signed
✅ Restrict who can push
```

### Token Management
```
GITHUB_TOKEN: Auto-managed, no action needed
Custom tokens: Store in GitHub Secrets (never in code)
```

## Next Steps

1. **Review** this architecture
2. **Configure** deployment commands in `.github/workflows/deploy.yml`
3. **Add** deployment secrets to GitHub
4. **Test** with a feature branch
5. **Monitor** first automatic release
6. **Celebrate** automated deployment! 🎉

---

For more information:
- [DEPLOYMENT.md](DEPLOYMENT.md) - Detailed deployment guide
- [VERSIONING.md](VERSIONING.md) - Semantic versioning reference
- [DEPLOYMENT_QUICKSTART.md](DEPLOYMENT_QUICKSTART.md) - Quick start guide
