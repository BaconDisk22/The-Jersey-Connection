# Guarded CI/CD Setup — The Jersey Connection

This automation only targets `BaconDisk22/The-Jersey-Connection`, branch `main`.

## Configured by repository files
- `pr-checks.yml`: PR validation and Intel Mac DMG/ZIP smoke packaging.
- `macos-intel.yml`: Intel Mac build on every main push or version tag; only tags publish prereleases.
- `branch-pr.yml`: proposes pull requests when feature/fix/automation branches are pushed.
- `guarded-automerge.yml`: **never checks out untrusted PR code**. Only attempts GitHub's native auto-merge after successful PR checks, for own-repo `automation/*` branches authored by BaconDisk22 or Dependabot. It refuses changes to workflows, desktop runtime, package manifests, shell scripts, and release-related code. It **fails closed** if branch protection requiring `validate` cannot be verified.
- `dependabot.yml`: weekly npm and Actions dependency PRs.

## Repository settings that still require owner/admin action
1. Settings → Actions → General: enable GitHub Actions, allow the repository's actions, and (if desired) **Allow GitHub Actions to create and approve pull requests**.
2. Settings → General → Pull Requests: enable **Allow auto-merge** and squash merging.
3. Settings → Branches or Rulesets: protect `main`; require PRs, require passing checks `validate` and `intel-package`, block force pushes/deletions, and require branches to be current before merge. Enable required review for security-sensitive changes if desired.
4. Settings → Actions → General → Workflow permissions: ensure workflows can request the minimal declared `pull-requests: write` and `contents: write` permissions where needed.
5. Test with a harmless `automation/docs-smoke-test` PR after branch protection is enabled.

**Important:** The PR creation workflow uses the default `GITHUB_TOKEN`; PRs it creates may not trigger additional Actions runs automatically because of GitHub's recursion protections. Pushing a new commit or opening the PR manually can trigger checks. Dependabot updates to package manifests are intentionally **not** auto-merged because those files are guarded.

## Release process
After a validated version bump, push an annotated tag `vX.Y.Z` from a trusted `main` commit. The Mac workflow builds unsigned Intel DMG and ZIP packages and attempts a GitHub prerelease. A successful CI build is **not** equivalent to notarization or hardware testing.

## Current limitations
No workflow can automatically resolve semantic merge conflicts safely. No automation generates product features on its own. The repo settings above cannot be enforced by committing YAML alone. Until they are enabled and verified, this is **automation code prepared**, not a claim that guarded auto-merge is active.
