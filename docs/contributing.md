# Contributing to PayFlow

Thank you for your interest in contributing to PayFlow! This guide will help you understand how to contribute effectively and maintain code quality.

## 🎯 Code of Conduct

We are committed to providing a welcoming and inclusive environment. All contributors are expected to:

- Be respectful and constructive
- Welcome diverse perspectives
- Focus on what is best for the community
- Show empathy towards other members

Unacceptable behavior includes harassment, discrimination, or abuse of any kind.

---

## 🚀 Getting Started

### 1. Fork the Repository

1. Go to [Dashboard-pay-sparkle-F](https://github.com/Mostafa-SAID7/Dashboard-pay-sparkle-F)
2. Click **"Fork"** in the top-right corner
3. This creates your own copy of the repository

### 2. Clone Your Fork

```bash
git clone https://github.com/YOUR_USERNAME/Dashboard-pay-sparkle-F.git
cd Dashboard-pay-sparkle-F
```

### 3. Add Upstream Remote

```bash
git remote add upstream https://github.com/Mostafa-SAID7/Dashboard-pay-sparkle-F.git
```

This allows you to sync with the main repository.

### 4. Install Dependencies

```bash
npm ci
npm run dev
```

---

## 📋 Before You Start

### Check for Existing Issues

1. Browse [GitHub Issues](https://github.com/Mostafa-SAID7/Dashboard-pay-sparkle-F/issues)
2. Look for labels: `good first issue`, `help wanted`, `bug`, `enhancement`
3. Comment on the issue to express interest

### Discuss Major Changes

For significant changes (new features, major refactors), open a **Discussion** first:

1. Go to [Discussions](https://github.com/Mostafa-SAID7/Dashboard-pay-sparkle-F/discussions)
2. Describe your idea and approach
3. Get feedback before starting work

**This prevents wasted effort on changes that may not be accepted.**

---

## 🔄 Development Workflow

### 1. Create a Feature Branch

```bash
git checkout -b feature/your-feature-name
```

**Branch naming conventions:**

| Type | Format | Example |
|------|--------|---------|
| Feature | `feature/description` | `feature/payment-modal` |
| Bug Fix | `fix/description` | `fix/sidebar-layout` |
| Documentation | `docs/description` | `docs/api-guide` |
| Refactor | `refactor/description` | `refactor/component-structure` |
| Performance | `perf/description` | `perf/bundle-size` |

### 2. Make Your Changes

Follow the [Development Guide](./development.md) for:
- TypeScript best practices
- Component naming conventions
- File organization
- Code style

**Key guidelines:**
- Write meaningful commit messages
- Keep commits small and focused
- Test your changes locally
- Update documentation if needed

### 3. Commit Changes

Use **Conventional Commits** format:

```bash
git commit -m "type: description"
```

**Commit types:**

| Type | Scope | Example |
|------|-------|---------|
| `feat` | New feature | `feat: add payment modal` |
| `fix` | Bug fix | `fix: resolve sidebar overflow` |
| `docs` | Documentation | `docs: update setup guide` |
| `refactor` | Code refactor | `refactor: simplify payment logic` |
| `perf` | Performance | `perf: optimize bundle size` |
| `test` | Tests | `test: add payment modal tests` |
| `chore` | Maintenance | `chore: update dependencies` |
| `ci` | CI/CD | `ci: add lint check to workflow` |

**Good commit examples:**
```
feat: add dark mode toggle to sidebar
fix: prevent sidebar overflow on mobile
docs: update development setup guide
refactor: extract payment logic to custom hook
```

**Bad commit examples:**
```
Update files
Fix stuff
Final changes
...
```

### 4. Keep Your Branch Updated

```bash
git fetch upstream
git rebase upstream/main
```

This ensures your branch has the latest changes from main.

### 5. Push to Your Fork

```bash
git push origin feature/your-feature-name
```

### 6. Create a Pull Request

1. Go to [Pull Requests](https://github.com/Mostafa-SAID7/Dashboard-pay-sparkle-F/pulls)
2. Click **"New Pull Request"**
3. Select your branch and fill out the template

---

## 📝 Pull Request Guidelines

### PR Title

Keep it short and descriptive:

```
feat: add payment method selector component
fix: resolve mobile sidebar navigation bug
docs: update deployment guide
```

### PR Description

Use the provided template and include:

1. **What** – Brief description of changes
2. **Why** – Reason for the change
3. **How** – Implementation approach
4. **Testing** – How you tested the changes
5. **Related Issues** – Links to related issues/discussions

**Template:**

```markdown
## Description
Brief description of what this PR does.

## Motivation
Why is this change needed?

## Changes
- [ ] Feature/fix 1
- [ ] Feature/fix 2
- [ ] Documentation updated

## Testing
How did you test this? Screenshots/videos if applicable.

## Related Issues
Closes #123
```

### PR Checklist

Before submitting, ensure:

- [ ] Branch is up-to-date with `main`
- [ ] All tests pass: `npm run test`
- [ ] Linting passes: `npm run lint`
- [ ] Build works: `npm run build`
- [ ] Code follows conventions
- [ ] No unnecessary console.logs or debug code
- [ ] Documentation is updated
- [ ] Commit messages are clear
- [ ] No breaking changes (or justified in description)

---

## 🔍 Code Review Process

### What to Expect

1. **Automated Checks** – Linting, tests, build verification
2. **Maintainer Review** – Code quality, design, approach
3. **Feedback** – Questions, suggestions, or requests for changes

### Responding to Feedback

- **Be open to suggestions** – Reviews improve code quality
- **Ask questions** – If feedback is unclear, ask for clarification
- **Push updates** – Don't force-push; new commits will be added to the PR
- **Re-request review** – After addressing feedback, request another review

### Approval & Merge

Once approved:
1. Maintainer will squash and merge your PR
2. Your branch can be deleted
3. Your changes are live!

---

## 🚀 Types of Contributions

### 1. Bug Fixes

**What to do:**
- Reproduce the bug locally
- Add a failing test
- Fix the bug
- Verify the test passes

**PR focus:**
- Clear description of the bug
- Steps to reproduce
- Expected vs actual behavior
- Before/after screenshots (if visual)

### 2. Features

**What to do:**
- Discuss the feature in an issue/discussion first
- Follow the [Architecture Guide](./architecture.md)
- Add tests for new functionality
- Update documentation

**PR focus:**
- Link to related discussion/issue
- Explain the design approach
- Highlight key changes
- Demo of the feature (screenshots/video)

### 3. Documentation

**What to do:**
- Improve clarity and completeness
- Fix typos and grammatical errors
- Add examples and use cases
- Update outdated information

**PR focus:**
- What documentation is improved
- Why it was needed
- Link to related issues

### 4. Performance

**What to do:**
- Benchmark before and after
- Profile to identify bottlenecks
- Implement optimization
- Verify improvement

**PR focus:**
- Metrics (bundle size, load time, memory)
- Before and after comparison
- Implementation details

### 5. Refactoring

**What to do:**
- Improve code structure without changing behavior
- Maintain all tests passing
- Document the rationale

**PR focus:**
- Clear explanation of why refactoring is beneficial
- Confirmation that behavior is unchanged
- Any performance implications

---

## 🧪 Testing Requirements

### Run Tests Locally

```bash
npm run test
```

### Writing Tests

Tests should:
- Test behavior, not implementation
- Be isolated and independent
- Have clear, descriptive names
- Cover happy path and edge cases

**Test example:**

```typescript
describe('PaymentCard', () => {
  it('displays payment amount', () => {
    const { getByText } = render(
      <PaymentCard amount={100} status="completed" />
    );
    expect(getByText('$100.00')).toBeInTheDocument();
  });

  it('shows error state when status is failed', () => {
    const { getByRole } = render(
      <PaymentCard amount={100} status="failed" />
    );
    expect(getByRole('alert')).toHaveClass('error');
  });
});
```

### Coverage

- Aim for >80% coverage for new code
- Focus on critical paths
- Don't worry about 100% coverage (diminishing returns)

---

## 📚 Documentation Updates

When making changes, update relevant documentation:

| Change Type | Update |
|-------------|--------|
| New component | Add to [Architecture Guide](./architecture.md) |
| New API endpoint | Add to [Development Guide](./development.md) |
| New npm script | Update [Development Guide](./development.md) |
| Database schema change | Update [Architecture Guide](./architecture.md) |
| Deployment change | Update [Deployment Guide](./deployment.md) |

Keep documentation in sync with code!

---

## 🆘 Getting Help

**Stuck or have questions?**

1. **Check existing issues** – Your question might be answered there
2. **Review documentation** – See [docs/](../docs/)
3. **Open a discussion** – Ask on [GitHub Discussions](https://github.com/Mostafa-SAID7/Dashboard-pay-sparkle-F/discussions)
4. **Ask in PR** – Leave a comment in your PR requesting help
5. **Reach out** – Comment on an issue or discussion

**No question is too simple. We're here to help!**

---

## 📋 Common Scenarios

### Scenario: Local Branch is Behind Main

```bash
git fetch upstream
git rebase upstream/main
git push origin feature/your-feature-name --force-with-lease
```

**Never use `git push --force`** (it loses history). Use `--force-with-lease` instead.

### Scenario: Made a Mistake in a Commit

For unpushed commits:
```bash
git reset HEAD~1
# Make corrections
git add .
git commit -m "correct message"
```

For pushed commits:
```bash
git revert <commit-hash>
git push origin feature/your-feature-name
```

### Scenario: Want to Contribute but Don't Know What

1. Look for **`good first issue`** label
2. Pick one and comment "I'd like to work on this"
3. Start coding!

---

## 🎉 After Your PR is Merged

Congratulations! Your contribution is now part of PayFlow.

- Delete your local and remote branches:
  ```bash
  git branch -d feature/your-feature-name
  git push origin --delete feature/your-feature-name
  ```

- Update your fork:
  ```bash
  git checkout main
  git pull upstream main
  git push origin main
  ```

- Look for your contribution in the next release
- Consider contributing again! 😊

---

## 📚 Additional Resources

- [Development Guide](./development.md) – Setup and local development
- [Architecture Guide](./architecture.md) – Project structure and design
- [Conventional Commits](https://www.conventionalcommits.org/) – Commit message standard
- [GitHub Flow Guide](https://guides.github.com/introduction/flow/) – Git workflow
- [How to Write a Good PR](https://github.blog/2015-01-21-how-to-write-the-perfect-pull-request/) – PR best practices

---

## 🙏 Recognition

Contributors are recognized for their work:

- Listed in commit history
- Featured in release notes
- Thanked in project documentation
- Invited to join the team (if interested in long-term contribution)

---

## 📞 Questions?

- **Issues:** https://github.com/Mostafa-SAID7/Dashboard-pay-sparkle-F/issues
- **Discussions:** https://github.com/Mostafa-SAID7/Dashboard-pay-sparkle-F/discussions
- **Live App:** https://pay-sparkle.vercel.app

---

**Thank you for contributing to PayFlow! 🎉**

Together, we build a better payments dashboard.

Last Updated: September 2024
