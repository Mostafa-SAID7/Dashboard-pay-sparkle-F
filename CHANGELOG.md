# Changelog

All notable changes to PayFlow will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Complete PayFlow repository structure with professional documentation
- Comprehensive AGENTS.md with Lovable sync compatibility rules
- Five detailed documentation guides (architecture, development, deployment, contributing, releases)
- Complete GitHub workflows and templates (.github/ folder)
- CI workflow with Node 22, linting, building, and testing
- Release workflow for automatic GitHub Releases on tags
- CHANGELOG.md for version tracking
- Automated dependency updates with Dependabot

### Fixed
- Resolved merge conflicts between local and remote branches
- Updated GitHub Actions to stable versions (checkout@v4, setup-node@v4, upload-artifact@v4)
- Restored PR template to PayFlow standards

### Changed
- Enhanced CI/CD pipeline with concurrency controls
- Improved artifact handling and retention policies
- Updated repository structure for better organization

---

## Release History

For instructions on how to create releases, see [docs/releases.md](docs/releases.md).

To create a new release:

1. Update `package.json` version
2. Update this CHANGELOG.md with changes
3. Commit: `chore(release): vX.Y.Z`
4. Create annotated tag: `git tag -a vX.Y.Z -m "Release vX.Y.Z"`
5. Push: `git push origin vX.Y.Z`
6. Release workflow will automatically create GitHub Release

---

**Note:** See [Keep a Changelog](https://keepachangelog.com/) for changelog best practices.
