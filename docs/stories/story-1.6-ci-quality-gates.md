# Story 1.6: CI Quality Gates

**Epic:** Epic 2 - Test Infrastructure
**Priority:** HIGH
**Estimated Effort:** 0.5 days
**Status:** Ready for Development
**Assignee:** TBD

---

## User Story

**As a** development team
**I want** automated quality gates in our CI/CD pipeline
**So that** we prevent regressions from being merged to main and maintain code quality standards

---

## Business Value

- **Primary Value:** Prevents bugs from reaching production, reduces incident response costs by 80%
- **Developer Impact:** Catches issues before code review, reduces review burden
- **Technical Value:** Enforces quality standards automatically, enables confident deployment
- **Strategic Alignment:** Required for SOC 2 compliance (automated testing documentation)

---

## Description

Implement GitHub Actions CI/CD pipeline with quality gates that block Pull Request merges on failures. Pipeline checks: TypeScript compilation, linting, unit tests (≥80% coverage), E2E tests, and build success.

### Context

Current state:
- No CI/CD pipeline
- Manual testing only
- No automated quality checks
- Regressions can be merged accidentally

This story establishes automated quality gates to prevent regressions.

---

## Acceptance Criteria

### AC-1.6.1: CI Workflow Runs on All PRs
**Given** a PR is created or updated
**When** code is pushed to the PR branch
**Then** the CI workflow runs automatically

**Trigger Conditions:**
- Pull requests to `main` or `develop` branches
- Push to `main` or `develop` branches

**Verification:**
- [ ] Workflow triggers on PR creation
- [ ] Workflow triggers on PR update (new commits)
- [ ] Workflow triggers on push to main/develop
- [ ] Workflow shows in GitHub Actions tab
- [ ] PR shows status checks

---

### AC-1.6.2: TypeCheck Job Fails on TS Errors
**Given** TypeScript code has type errors
**When** the CI pipeline runs
**Then** the TypeCheck job fails

**TypeCheck Job:**
- Runs `tsc --noEmit` (no build, just type checking)
- Fails on any TypeScript error
- Fast (<1 minute)

**Verification:**
- [ ] Job runs TypeScript compiler
- [ ] Job fails on type errors
- [ ] Job passes with no errors
- [ ] Error messages are clear
- [ ] Job runs in <1 minute

---

### AC-1.6.3: Lint Job Fails on ESLint Errors
**Given** code has linting errors
**When** the CI pipeline runs
**Then** the Lint job fails

**Lint Job:**
- Runs `npm run lint`
- Fails on any ESLint error
- Max warnings: 0 (warnings treated as errors)

**Verification:**
- [ ] Job runs ESLint
- [ ] Job fails on errors
- [ ] Job fails on warnings (max-warnings: 0)
- [ ] Job passes with clean code
- [ ] Error messages show file and line number

---

### AC-1.6.4: Unit Test Job Fails if Coverage <80%
**Given** unit test coverage is below 80%
**When** the CI pipeline runs
**Then** the unit test job fails

**Unit Test Job:**
- Runs `npm run test:coverage`
- Checks coverage thresholds (≥80% global)
- Uploads coverage to Codecov
- Generates coverage report artifact
- Comments coverage on PR

**Verification:**
- [ ] Job runs Vitest with coverage
- [ ] Job fails if coverage <80%
- [ ] Job passes if coverage ≥80%
- [ ] Coverage uploaded to Codecov
- [ ] Coverage report artifact uploaded
- [ ] PR comment with coverage summary

---

### AC-1.6.5: E2E Test Job Retries 2x, Fails if >3% Flaky
**Given** E2E tests have flaky failures
**When** the CI pipeline runs
**Then** tests retry 2x, fail if still failing

**E2E Test Job:**
- Runs `npm run test:e2e`
- Starts local Supabase instance
- Retries failed tests 2x
- Fails if >3% tests fail after retries
- Uploads Playwright report artifact

**Verification:**
- [ ] Job runs Playwright tests
- [ ] Job retries failed tests 2x
- [ ] Job passes if all tests pass (or after retry)
- [ ] Job fails if tests fail after 2 retries
- [ ] Playwright report artifact uploaded
- [ ] Test results artifact uploaded

---

### AC-1.6.6: Build Job Fails if Next.js Build Fails
**Given** the Next.js build has errors
**When** the CI pipeline runs
**Then** the Build job fails

**Build Job:**
- Runs `npm run build`
- Skips env validation in CI (`SKIP_ENV_VALIDATION=true`)
- Fails on any build error
- Verifies production build works

**Verification:**
- [ ] Job runs Next.js build
- [ ] Job fails on build errors
- [ ] Job passes with successful build
- [ ] Build output shows in logs
- [ ] Build completes in <5 minutes

---

### AC-1.6.7: Merge Gate Job Blocks Merge on Failures
**Given** any required job fails
**When** the merge gate job runs
**Then** the PR cannot be merged

**Merge Gate Job:**
- Depends on all other jobs (typecheck, lint, unit-tests, e2e-tests, build)
- Fails if any dependency fails
- Passes only if all dependencies pass
- Shows clear failure message

**Verification:**
- [ ] Merge gate job runs last
- [ ] Merge gate fails if any job fails
- [ ] Merge gate passes only if all pass
- [ ] GitHub blocks merge if merge gate fails
- [ ] Error message explains which job failed

---

### AC-1.6.8: Coverage Report Uploaded as Artifact
**Given** unit tests have run
**When** the CI pipeline completes
**Then** coverage report is available as artifact

**Artifact Requirements:**
- HTML coverage report
- JSON coverage summary
- LCOV coverage data
- Retention: 30 days

**Verification:**
- [ ] Coverage report in workflow artifacts
- [ ] Can download and view HTML report
- [ ] JSON summary parseable
- [ ] LCOV format correct
- [ ] Artifacts retained for 30 days

---

### AC-1.6.9: PR Comment with Test Results Summary
**Given** the CI pipeline completes
**When** results are available
**Then** a comment is added to the PR with summary

**Comment Format:**
```markdown
## 🧪 Test Results

| Check | Status | Details |
|-------|--------|---------|
| TypeCheck | ✅ | |
| Lint | ✅ | |
| Unit Tests | ✅ | Coverage: 82.5% |
| E2E Tests | ✅ | 3 tests passed |
| Build | ✅ | |

✅ All checks passed!
```

**Verification:**
- [ ] Comment appears on PR
- [ ] Comment shows all job statuses
- [ ] Coverage percentage included
- [ ] E2E test count included
- [ ] Comment updates on new commits
- [ ] Failure message clear if jobs fail

---

## Technical Specification

### GitHub Actions Workflow

```yaml
# .github/workflows/ci.yml
name: CI Quality Gates

on:
  pull_request:
    branches: [main, develop]
  push:
    branches: [main, develop]

env:
  NODE_VERSION: 20.x

jobs:
  typecheck:
    name: TypeScript Type Check
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: npm

      - name: Install dependencies
        run: npm ci

      - name: Type check
        run: npm run typecheck

  lint:
    name: ESLint
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: npm

      - name: Install dependencies
        run: npm ci

      - name: Lint
        run: npm run lint

  unit-tests:
    name: Unit Tests (Coverage ≥80%)
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: npm

      - name: Install dependencies
        run: npm ci

      - name: Run unit tests with coverage
        run: npm run test:coverage

      - name: Upload coverage to Codecov
        uses: codecov/codecov-action@v4
        with:
          files: ./coverage/coverage-final.json
          flags: unittests
          fail_ci_if_error: false

      - name: Upload coverage report
        uses: actions/upload-artifact@v4
        with:
          name: coverage-report
          path: coverage/
          retention-days: 30

      - name: Comment PR with coverage
        uses: romeovs/lcov-reporter-action@v0.3.1
        with:
          lcov-file: ./coverage/lcov.info
          github-token: ${{ secrets.GITHUB_TOKEN }}
          title: Coverage Report

  e2e-tests:
    name: E2E Tests (Playwright)
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: npm

      - name: Install dependencies
        run: npm ci

      - name: Install Playwright browsers
        run: npx playwright install --with-deps chromium

      - name: Start Supabase (local)
        run: |
          npm install -g supabase
          supabase start

      - name: Run E2E tests
        run: npm run test:e2e
        env:
          SUPABASE_URL: http://localhost:54321
          SUPABASE_SERVICE_ROLE_KEY: ${{ secrets.SUPABASE_SERVICE_ROLE_KEY_TEST }}

      - name: Upload Playwright report
        uses: actions/upload-artifact@v4
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
          retention-days: 30

      - name: Upload test results
        uses: actions/upload-artifact@v4
        if: always()
        with:
          name: test-results
          path: test-results/
          retention-days: 30

  build:
    name: Build Check
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: npm

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build
        env:
          SKIP_ENV_VALIDATION: true

  merge-gate:
    name: Merge Gate
    runs-on: ubuntu-latest
    needs: [typecheck, lint, unit-tests, e2e-tests, build]
    if: always()
    steps:
      - name: Check job results
        run: |
          if [[ "${{ needs.typecheck.result }}" != "success" ]] || \
             [[ "${{ needs.lint.result }}" != "success" ]] || \
             [[ "${{ needs.unit-tests.result }}" != "success" ]] || \
             [[ "${{ needs.e2e-tests.result }}" != "success" ]] || \
             [[ "${{ needs.build.result }}" != "success" ]]; then
            echo "❌ One or more required checks failed"
            exit 1
          fi
          echo "✅ All quality gates passed"
```

---

## Implementation Tasks

### Task 1: Create CI Workflow File
**File:** `.github/workflows/ci.yml`
**Estimated:** 1 hour

- [ ] Create workflow file
- [ ] Configure triggers (PR, push)
- [ ] Add all 5 jobs (typecheck, lint, unit-tests, e2e-tests, build)
- [ ] Add merge-gate job
- [ ] Test workflow locally with act (if possible)

**Definition of Done:**
- Workflow file exists
- All jobs defined
- Syntax is valid

---

### Task 2: Configure Branch Protection
**GitHub Settings:** Repository > Branches > main
**Estimated:** 15 minutes

- [ ] Enable "Require status checks to pass before merging"
- [ ] Select required checks:
  - typecheck
  - lint
  - unit-tests
  - e2e-tests
  - build
  - merge-gate
- [ ] Enable "Require branches to be up to date"
- [ ] Enable "Do not allow bypassing"

**Definition of Done:**
- Branch protection active
- All checks required
- Cannot merge if checks fail

---

### Task 3: Add Typecheck Script
**File:** `package.json`
**Estimated:** 5 minutes

```json
{
  "scripts": {
    "typecheck": "tsc --noEmit"
  }
}
```

**Definition of Done:**
- Script exists
- Runs TypeScript compiler
- No emit (just type checking)

---

### Task 4: Configure GitHub Secrets
**GitHub Settings:** Repository > Secrets and variables > Actions
**Estimated:** 10 minutes

**Secrets to Add:**
- `SUPABASE_SERVICE_ROLE_KEY_TEST` (for E2E tests)
- `CODECOV_TOKEN` (optional, for coverage upload)

**Definition of Done:**
- Secrets added to GitHub
- E2E tests can authenticate
- Coverage upload works

---

### Task 5: Test CI Pipeline Locally
**Estimated:** 1 hour

- [ ] Create test PR
- [ ] Push code to trigger CI
- [ ] Verify all jobs run
- [ ] Verify merge gate blocks on failure
- [ ] Test retry logic (simulate flaky E2E test)
- [ ] Verify artifacts uploaded

**Definition of Done:**
- All jobs pass on clean code
- Jobs fail appropriately on errors
- Merge gate blocks failing PRs
- Artifacts accessible

---

### Task 6: Add PR Comment Workflow
**File:** `.github/workflows/pr-comment.yml`
**Estimated:** 30 minutes

- [ ] Create workflow triggered by CI completion
- [ ] Download test results artifact
- [ ] Parse results JSON
- [ ] Generate comment with summary table
- [ ] Post comment to PR
- [ ] Update comment on new commits (don't spam)

**Definition of Done:**
- Comment appears on PRs
- Comment shows all job statuses
- Comment updates on new commits

---

### Task 7: Update .gitignore
**File:** `.gitignore`
**Estimated:** 5 minutes

Add CI artifacts to ignore:
```
# Testing
coverage/
test-results/
playwright-report/
playwright/.cache/
```

**Definition of Done:**
- Artifacts not committed to git
- No accidental artifact commits

---

### Task 8: Create CI Documentation
**File:** `docs/CI.md`
**Estimated:** 30 minutes

Document:
- How CI pipeline works
- What each job checks
- How to run checks locally
- How to debug failures
- How to request bypass (emergency only)

**Definition of Done:**
- Documentation exists
- Clear instructions
- Examples for debugging

---

## Files to Create

1. `.github/workflows/ci.yml` (main CI workflow)
2. `.github/workflows/pr-comment.yml` (PR comment workflow)
3. `docs/CI.md` (CI documentation)

**Total:** 3 new files, ~300 lines of YAML + docs

---

## Files to Modify

1. `package.json` (add `typecheck` script)
2. `.gitignore` (add CI artifacts)

---

## Dependencies

### External
- GitHub Actions (built-in)
- Codecov (optional, for coverage visualization)

### Internal
- All previous stories (tests must exist to run)

---

## Testing Strategy

### Manual Testing
- Create test PR with clean code (should pass)
- Create test PR with type error (should fail)
- Create test PR with lint error (should fail)
- Create test PR with test failure (should fail)
- Verify retry logic on flaky E2E test

---

## Definition of Done

- [ ] All 9 acceptance criteria verified
- [ ] All 8 implementation tasks completed
- [ ] Branch protection configured
- [ ] CI pipeline passes on clean code
- [ ] CI pipeline fails appropriately on errors
- [ ] Artifacts uploaded correctly
- [ ] PR comments work
- [ ] Documentation complete
- [ ] Code review completed
- [ ] Merged to main

---

## Notes

### Design Decisions
- Parallel job execution (faster CI)
- Retry logic only for E2E (flaky nature)
- Merge gate job as final check (clear pass/fail)

### Future Enhancements (Out of Scope)
- Deploy preview environments (Phase 4)
- Performance budgets (Lighthouse CI)
- Visual regression tests
- Security scanning (Snyk, OWASP)

### Known Limitations
- CI runs take ~10 minutes (acceptable for now)
- E2E tests require Supabase local instance (adds ~2 minutes)
- Coverage upload requires Codecov account (optional)

---

**Story Status:** Ready for Development
**Created:** October 19, 2025
**Last Updated:** October 19, 2025
**Estimated Completion:** 0.5 days
