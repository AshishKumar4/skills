---
name: review-fix-loop
description: PR/MR review and CI workflow for AI reviewer triage, agree/disagree/clarify classification, CI failures, branch/worktree hygiene, and verified review-fix loops.
compatibility: opencode
---

## Use When

- Handling PR/MR review comments, AI reviewer output, CI failures, merge readiness, branch/worktree tasks, or review-fix loops.
- The user asks to address comments, validate reviewer findings, monitor a review, rebase, merge, or fix CI.

## Review Triage

1. Read current diff, comments, CI logs, target branch, and latest reviewer output.
2. For each finding classify: agree, disagree, needs clarification, already fixed, intentionally deferred.
3. If disagreeing, explain evidence: incorrect premise, existing mitigation, disproportionate scope, stale finding, or better follow-up path.
4. Fix valid issues with minimal, clean, typed changes.
5. Track carry-forward findings separately from newly introduced findings.
6. Resolve threads only after fixes are implemented, verified, and pushed if pushing was requested.

## CI Workflow

- Inspect exact failing job, log, commit SHA, branch target, and whether failure is new or carried forward.
- Reproduce the closest failing check locally when feasible.
- Prefer targeted verification first, then broader checks appropriate to the touched area.
- Report exact commands/checks run and results.

## Git Hygiene

- Check branch, target branch, worktree status, staged changes, and conflicts before PR/MR work.
- Do not commit, push, rebase, force-push, merge, or deploy unless explicitly asked.
- Preserve unrelated user changes and local artifacts. Do not include HARs, audit notes, secrets, generated junk, or unrelated files.

## Output Format

- Summary of review/CI state.
- Triage table.
- Fix plan or implemented fixes.
- Verification.
- Remaining open items/risks.

## Never Do

- Do not blindly implement reviewer comments.
- Do not claim ready-to-merge based only on code inspection if checks are available.
- Do not treat `Approved with Comments` as automatically clean when comments contain real risk.
