# Semantic Versioning Guide

This project follows **Semantic Versioning 2.0.0** specification. Learn more at [semver.org](https://semver.org/).

## Version Format

The version is formatted as `MAJOR.MINOR.PATCH` (e.g., `1.2.3`):

- **MAJOR**: Incompatible API changes
- **MINOR**: New functionality in a backwards-compatible manner
- **PATCH**: Backwards-compatible bug fixes

Pre-release versions use the format `MAJOR.MINOR.PATCH-PRERELEASE` (e.g., `1.0.0-beta.1`)

## Commit Convention

This project uses **Conventional Commits** to automatically determine version bumps.

### Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Commit Types

| Type | Release Impact | Description |
|------|---|---|
| `feat` | `MINOR` | A new feature |
| `fix` | `PATCH` | A bug fix |
| `perf` | `PATCH` | A performance improvement |
| `docs` | None | Documentation changes |
| `style` | None | Code style changes (formatting, semicolons, etc.) |
| `refactor` | None | Code refactoring without feature changes |
| `ci` | None | CI/CD configuration changes |
| `test` | None | Test additions or modifications |

### Breaking Changes

Add `BREAKING CHANGE:` in the footer to trigger a `MAJOR` version bump:

```
feat(api): redesign endpoint structure

BREAKING CHANGE: The /api/users endpoint has been removed in favor of /api/v2/users
```

Or use `!` after the scope:

```
feat(api)!: redesign endpoint structure
```

## Examples

### Feature Commit (triggers MINOR bump)
```
feat(auth): add two-factor authentication support
```
Result: `1.0.0` → `1.1.0`

### Bug Fix Commit (triggers PATCH bump)
```
fix(dashboard): resolve chart rendering issue
```
Result: `1.0.0` → `1.0.1`

### Breaking Change Commit (triggers MAJOR bump)
```
feat(api)!: remove deprecated endpoints

BREAKING CHANGE: /api/v1/data endpoint removed
```
Result: `1.0.0` → `2.0.0`

### Non-Release Commits
```
docs: update README with new features
test: add unit tests for auth module
chore: update dependencies
```
These commits do NOT trigger version bumps.

## Release Workflow

### On `main` Branch
- Automatic release on every push
- Production release with standard versioning
- GitHub Release created with changelog
- Version tags automatically created

### On `develop` Branch
- Beta pre-releases created (e.g., `1.0.0-beta.1`)
- Tagged as `beta` channel
- Can be used for testing new features

## Viewing Release History

- **GitHub Releases**: Visit the Releases page to see all releases
- **CHANGELOG.md**: Automatically generated changelog file
- **Git Tags**: View all version tags with `git tag`

## Local Development

### Check Next Version
```bash
npm run semantic-release -- --dry-run
```

### Manual Version Bump (NOT recommended)
```bash
npm version patch      # Bumps to next patch version
npm version minor      # Bumps to next minor version
npm version major      # Bumps to next major version
```

## Best Practices

1. ✅ Use conventional commit format for all commits
2. ✅ Write clear, descriptive commit messages
3. ✅ Include breaking changes in footer when applicable
4. ✅ Run tests before committing
5. ✅ Use feature branches and pull requests
6. ✅ Keep commits atomic (one logical change per commit)

## Troubleshooting

### Release not created?
- Ensure commits follow Conventional Commits format
- Check that the branch is `main` or `develop`
- Verify GitHub Actions workflow passed
- Check workflow logs for errors

### Wrong version bumped?
- Review commit messages for proper type/scope format
- Verify breaking changes are marked with `BREAKING CHANGE:` or `!`
- Check `.releaserc` configuration

### Need to create a release manually?
Contact the maintainers - manual releases should be rare with this automation in place.
