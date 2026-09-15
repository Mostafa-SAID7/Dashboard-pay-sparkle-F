# PayFlow Releases

This guide explains how to create and manage releases for PayFlow using semantic versioning, Git tags, and automatic GitHub Releases.

## 📋 Release Overview

PayFlow uses:
- **Semantic Versioning** – Major.Minor.Patch (e.g., 1.2.3)
- **Git Tags** – Annotated tags with format `vX.Y.Z`
- **GitHub Releases** – Automatic release creation with assets
- **CHANGELOG.md** – Detailed change history

---

## 🔄 Release Workflow

### Step 1: Prepare Changes

Ensure all features and fixes are merged to `main`:

```bash
git checkout main
git pull origin main
```

### Step 2: Determine Version

Follow [Semantic Versioning](https://semver.org/):

| Change | Version | Example |
|--------|---------|---------|
| **Breaking Change** | Major | 1.0.0 → 2.0.0 |
| **New Feature** | Minor | 1.0.0 → 1.1.0 |
| **Bug Fix** | Patch | 1.0.0 → 1.0.1 |

### Step 3: Update Version

Update `package.json` with the new version:

```json
{
  "version": "1.2.3"
}
```

### Step 4: Update CHANGELOG.md

Move changes from `[Unreleased]` section to a new version section:

**Before:**
```markdown
## [Unreleased]

### Added
- Feature A
- Feature B

### Fixed
- Bug X
```

**After:**
```markdown
## [Unreleased]

### Added
- (nothing yet)

## [1.2.3] - 2024-09-15

### Added
- Feature A
- Feature B

### Fixed
- Bug X
```

**Date Format:** YYYY-MM-DD (today's date)

### Step 5: Commit Changes

Make a clean release commit:

```bash
git add package.json CHANGELOG.md
git commit -m "chore(release): v1.2.3

- Bump version to 1.2.3
- Update CHANGELOG with v1.2.3 changes"
```

**Commit Message Format:**
```
chore(release): vX.Y.Z

- List key changes here
- One line per major item
```

### Step 6: Create Annotated Tag

Create an annotated Git tag (never lightweight):

```bash
git tag -a v1.2.3 -m "Release v1.2.3"
```

**Tag Format:**
- Must start with `v`
- Must use semantic versioning: `vX.Y.Z`
- Annotated tags only (with `-a -m`)

### Step 7: Push Tag

Push the tag to trigger the release workflow:

```bash
git push origin v1.2.3
```

Or push both commit and tag:

```bash
git push origin main v1.2.3
```

### Step 8: Verify Release

1. Go to [GitHub Releases](https://github.com/Mostafa-SAID7/Dashboard-pay-sparkle-F/releases)
2. Check that release `v1.2.3` was created
3. Verify dist/ artifacts are attached
4. Review release notes

---

## 🤖 Automatic Release Workflow

When you push a tag matching `v*`, the GitHub Actions workflow:

1. ✅ Checks out code
2. ✅ Installs dependencies
3. ✅ Runs linting
4. ✅ Builds the application
5. ✅ Uploads dist/ artifacts
6. ✅ Creates GitHub Release
7. ✅ Generates release notes from CHANGELOG
8. ✅ Attaches build artifacts

**No manual action needed after pushing the tag!**

---

## 📝 CHANGELOG.md Guidelines

### Structure

```markdown
## [Unreleased]

### Added
- New features

### Fixed
- Bug fixes

### Changed
- Modifications to existing functionality

### Deprecated
- Features being removed soon

### Removed
- Features no longer available

### Security
- Security fixes
```

### Writing Changes

**Good:**
```markdown
### Added
- Payment modal with form validation
- Dark mode toggle in sidebar
- API integration for live data

### Fixed
- Sidebar overflow on mobile devices
- Payment calculation rounding errors
```

**Bad:**
```markdown
### Added
- stuff
- more stuff
- fixes
```

### Keep It Current

- Update CHANGELOG.md **before** creating a release
- Move `[Unreleased]` items to a new version section
- Keep `[Unreleased]` section for future changes
- Date format: YYYY-MM-DD

---

## 🏷️ Versioning Rules

### Version Numbers

Always use Semantic Versioning: `X.Y.Z`

```
1.2.3
├─ 1 = Major version (breaking changes)
├─ 2 = Minor version (new features)
└─ 3 = Patch version (bug fixes)
```

### Git Tags

```bash
# ✅ Correct
git tag -a v1.2.3 -m "Release v1.2.3"
git tag -a v2.0.0 -m "Release v2.0.0"

# ❌ Wrong
git tag -a 1.2.3 -m "..."           # Missing 'v'
git tag 1.2.3                         # Lightweight tag (not annotated)
git tag -a release-1.2.3 -m "..."   # Wrong format
```

### package.json Version

**Must always match the latest tag:**

| Latest Tag | package.json |
|-----------|--------------|
| v1.0.0 | "version": "1.0.0" |
| v1.2.3 | "version": "1.2.3" |
| v2.0.0 | "version": "2.0.0" |

---

## ⚠️ Release Checklist

Before pushing a release tag, verify:

- [ ] All changes are committed to `main`
- [ ] `package.json` has the new version number
- [ ] `CHANGELOG.md` is updated with all changes
- [ ] Version number in `package.json` matches the tag
- [ ] Release commit is written (`chore(release): vX.Y.Z`)
- [ ] Git tag is annotated (not lightweight)
- [ ] Tag name follows `vX.Y.Z` format
- [ ] `npm run lint` passes
- [ ] `npm run build` succeeds
- [ ] Tests pass: `npm run test`
- [ ] You're on the `main` branch
- [ ] Your branch is up-to-date: `git pull origin main`

---

## 🔒 Safety Rules

### Never

- ❌ Force-push to main branch
- ❌ Delete existing Git tags
- ❌ Rewrite published commits
- ❌ Create lightweight tags (always use `-a`)
- ❌ Use vague version numbers (e.g., v1.2)

### Always

- ✅ Use annotated tags
- ✅ Push tags explicitly: `git push origin vX.Y.Z`
- ✅ Update CHANGELOG before releasing
- ✅ Test before creating a release
- ✅ Use clean, descriptive commit messages

---

## 📚 Example Release Session

```bash
# 1. Prepare
git checkout main
git pull origin main

# 2. Update version
# Edit package.json: "version": "1.1.0"

# 3. Update CHANGELOG.md
# Move [Unreleased] items to [1.1.0] - 2024-09-15

# 4. Commit
git add package.json CHANGELOG.md
git commit -m "chore(release): v1.1.0

- Add payment modal feature
- Fix sidebar mobile layout
- Update documentation"

# 5. Create tag
git tag -a v1.1.0 -m "Release v1.1.0"

# 6. Push
git push origin main v1.1.0

# 7. Verify
# GitHub Actions runs automatically
# Release appears at: github.com/.../releases/tag/v1.1.0
```

---

## 🆘 Troubleshooting

### Issue: Tag Already Exists

```
error: tag 'v1.0.0' already exists
```

**Solution:** Choose a different version number or delete the tag (if unpushed):

```bash
git tag -d v1.0.0  # Delete local tag only
```

### Issue: Tag Not Pushed

If you created a tag but forgot to push it:

```bash
git push origin v1.0.0
```

### Issue: Release Workflow Failed

Check GitHub Actions logs:

1. Go to [Actions](https://github.com/Mostafa-SAID7/Dashboard-pay-sparkle-F/actions)
2. Find the failed "Release" workflow
3. View logs for errors
4. Fix the issue and re-push the tag

### Issue: Wrong Version in Tag

If you created the wrong tag, delete it (local + remote):

```bash
git tag -d v1.0.0              # Delete local
git push origin --delete v1.0.0 # Delete remote
git tag -a v1.0.1 -m "..."     # Create correct tag
git push origin v1.0.1
```

---

## 📞 Getting Help

- **Need release help?** Check [Keep a Changelog](https://keepachangelog.com/)
- **Semantic Versioning?** See [semver.org](https://semver.org/)
- **Git tags?** Read [Git tag docs](https://git-scm.com/book/en/v2/Git-Basics-Tagging)
- **GitHub Releases?** Check [GitHub help](https://docs.github.com/en/repositories/releasing-projects-on-github/managing-releases-in-a-repository)

---

**Happy releasing! 🚀**

Last Updated: September 2024
