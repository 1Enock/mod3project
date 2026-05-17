# Deployment Guide

This document outlines the deployment process and workflow for the application.

## Automated Deployment Workflow

The project uses GitHub Actions for automated testing, building, and deployment.

### Workflow Overview

```
┌─────────────────┐
│  Push to Branch │
└────────┬────────┘
         │
         ├─────────────────────────────────────┐
         │                                     │
    Push to main                         Push to develop
         │                                     │
         ▼                                     ▼
   ┌──────────────┐                    ┌──────────────┐
   │ Test & Build │                    │ Test & Build │
   └──────┬───────┘                    └──────┬───────┘
          │                                    │
          ├─ Linting                          └─ Deploy to Staging
          ├─ Unit Tests                          
          ├─ Coverage Reports              
          └─ Build Application              
                 │                              
                 ├─ Semantic Release              
                 └─ Deploy to Production         
```

## Branch Strategy

### `main` Branch
- **Purpose**: Production-ready code
- **Deployment**: Automatic to production
- **Versioning**: Automatic semantic versioning
- **Release**: GitHub Release created automatically

### `develop` Branch
- **Purpose**: Development and integration
- **Deployment**: Automatic to staging
- **Versioning**: Beta pre-releases (e.g., `1.0.0-beta.1`)
- **Release**: Pre-release GitHub Release

### Feature Branches
- **Naming**: `feature/feature-name`, `fix/bug-name`
- **Deployment**: None (requires PR)
- **PR Requirements**: All checks must pass

## GitHub Actions Workflows

### 1. Deploy Workflow (`deploy.yml`)
Runs on every push and PR to `main` and `develop`.

**Jobs:**
- `test-and-build`: Linting, testing, building
- `deploy-staging`: Deploy when pushing to `develop`
- `deploy-production`: Deploy when pushing to `main`

**Artifacts:**
- Built application stored for 7 days
- Coverage reports uploaded to Codecov

### 2. Release Workflow (`release.yml`)
Runs on push to `main` for automatic releases.

**Features:**
- Semantic versioning based on commits
- Automatic changelog generation
- GitHub Release creation
- PR validation with conventional commit checks

## Local Development

### Setup
```bash
cd /home/enock/mod3project
npm install
npm install --prefix my-app
```

### Testing Before Commit
```bash
# Lint code
npm run lint --prefix my-app

# Run tests
npm run test --prefix my-app

# Build application
npm run build --prefix my-app
```

## Deployment Steps

### Deploying to Staging

1. Create a feature branch
2. Make changes and commit with conventional format
3. Push to `develop` branch
4. Staging deployment automatically triggered
5. Monitor GitHub Actions workflow

### Deploying to Production

1. Create feature branch and PR to `main`
2. All checks must pass
3. Get code review approval
4. Merge PR to `main`
5. Automatic release created (version bumped)
6. Production deployment triggered
7. GitHub Release published

## Deployment Customization

### Configure Deployment Targets

Edit `.github/workflows/deploy.yml` to add your deployment commands:

**For Staging:**
```yaml
- name: Deploy to staging environment
  run: npm run deploy:staging
```

**For Production:**
```yaml
- name: Deploy to production environment
  run: npm run deploy:production
```

### Add Custom Deploy Scripts

Add to `my-app/package.json`:
```json
{
  "scripts": {
    "deploy:staging": "your-deployment-command",
    "deploy:production": "your-deployment-command"
  }
}
```

## Environment Variables

Store deployment credentials in GitHub Secrets:

1. Go to repository Settings → Secrets and variables → Actions
2. Add secrets (e.g., `DEPLOY_TOKEN`, `AWS_ACCESS_KEY_ID`)
3. Reference in workflow:

```yaml
- name: Deploy
  env:
    DEPLOY_TOKEN: ${{ secrets.DEPLOY_TOKEN }}
  run: npm run deploy
```

## Monitoring Deployments

### View Workflow Status
- Go to **Actions** tab in GitHub
- Click on a workflow run
- View step-by-step logs

### View Releases
- Go to **Releases** page
- See version history and changelog
- Download build artifacts

### View Coverage Reports
- Codecov integration reports coverage
- Coverage artifacts available in GitHub Actions

## Rollback Procedure

If a deployment fails:

1. **Production Issues**:
   - Revert the problematic commit
   - Push to `main` (triggers new release with automatic version bump)
   - Or manually create a patch release

2. **Staging Issues**:
   - Fix the issue
   - Commit and push to `develop`
   - Automatic redeployment happens

## Troubleshooting

### Workflow Fails
- Check GitHub Actions logs
- Verify all tests pass locally
- Ensure commit messages follow conventional format
- Check for linting errors: `npm run lint --prefix my-app`

### Release Not Created
- Verify you're on `main` branch
- Check that commits follow `feat:`, `fix:`, etc. format
- Review workflow logs in Actions tab

### Deployment Hangs
- Check environment variable configuration
- Verify deployment credentials/tokens
- Review deployment script for blocking operations

## Emergency Procedures

### Emergency Hotfix
```bash
# Create urgent fix branch
git checkout -b hotfix/critical-issue main

# Make fix
# Commit with conventional format
git commit -m "fix(critical): address urgent issue"

# Push and create PR
git push origin hotfix/critical-issue
# Create PR and merge to main
```

### Manual Release (if automation fails)
```bash
cd /home/enock/mod3project
npm run release -- --dry-run  # Preview
npm run release                 # Create release
```

## Release Notes

Every release includes:
- Version number and date
- Features added
- Bugs fixed
- Breaking changes (if any)
- Contributors

See `CHANGELOG.md` for full history.

## Next Steps

1. Configure your deployment targets in `.github/workflows/deploy.yml`
2. Add deployment credentials to GitHub Secrets
3. Create your first feature and test the automation
4. Monitor the Actions tab for successful deployment
