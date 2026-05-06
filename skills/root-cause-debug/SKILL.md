---
name: root-cause-debug
description: Evidence-first root-cause debugging for bugs, regressions, production issues, workspace/sandbox failures, logs, transcripts, and raw request/response investigations.
compatibility: opencode
---

## Use When

- The task involves a bug, regression, production issue, flaky behavior, workspace/sandbox failure, event-stream issue, auth/proxy issue, CI failure, or unclear behavior.
- The user provides logs, transcripts, audit logs, Sentry/observability data, HARs, raw AI gateway requests/responses, PR diffs, screenshots, or asks for root cause / what exactly went wrong.
- The user says `pure investigation`, `research only`, `no code changes`, or `make no changes`.

## Workflow

1. Identify the user's current ask and whether changes are allowed.
2. Extract evidence artifacts: IDs, timestamps, logs, transcripts, raw requests/responses, screenshots, PR/MR numbers, commits, branches, environment, and file paths.
3. Build a feedback loop before hypothesizing when feasible: failing test, local repro, curl/API script, Playwright/browser script, raw trace replay, throwaway harness, bisection harness, or differential old-vs-new run.
4. Reproduce the exact user-described failure. Wrong bug = wrong fix.
5. Build a timeline. Preserve exact ordering when it matters.
6. Separate confirmed facts, likely hypotheses, and unknowns. No speculations.
7. Generate 3-5 ranked falsifiable hypotheses before testing. Each hypothesis must predict what evidence would confirm or falsify it.
8. Instrument one variable at a time. Prefer debugger/REPL or targeted logs at boundaries that distinguish hypotheses. Never “log everything and grep.”
9. Tag temporary debug logs with a unique prefix so cleanup is easy.
10. Trace the relevant code path and runtime lifecycle end-to-end.
11. For regressions, compare against last known good behavior and recent commits/PRs.
12. Identify the concrete failing transition, invariant, code path, state owner, external API behavior, or missing call.
13. Self-challenge the conclusion as if asked “can you bet $1000 on this?” If the evidence is not strong enough, say what is missing.
14. Propose the smallest correct fix. Avoid broad retries, guards, fallbacks, shims, migrations, or compatibility code unless evidence shows they fix the actual failure.
15. Add a regression test before or with the fix when there is a correct seam. If no correct seam exists, say that architecture is preventing the bug from being locked down.
16. Define verification: tests, local repro, logs, raw replay, staging/prod evidence, screenshots, or API checks.
17. Cleanup before declaring done: remove tagged debug logs, throwaway harnesses, prototypes, and temporary instrumentation unless explicitly retained.

## Workspace/Sandbox Checklist

- Trace Workspace DO, sandbox/container lifecycle, hibernation/wake, backup/restore, keep-alive, OpenCode sessions, SSE/background events, ports/services, and frontend state.
- Verify whether the visible audit log proves actual backend behavior, or only that a user-facing event was emitted.
- Check raw model requests/responses for agent behavior bugs. Do not infer what the model saw from UI alone.

## Feedback Loop Examples

- Failing test at the seam that reaches the bug.
- HTTP script against a running dev/staging endpoint.
- CLI invocation with fixture input and expected output.
- Playwright script asserting DOM, console, and network behavior.
- Replay of a captured request, event, transcript, or log sequence through the target code path.
- `git bisect run` or equivalent when a regression window is known.
- Stress loop for nondeterministic failures to raise reproduction rate.

If no loop can be built, stop and say what was tried and what artifact/access is needed.

## Output Format

- Current ask and constraints.
- Evidence inspected.
- Timeline.
- Confirmed facts vs hypotheses.
- Root cause and proof.
- Confidence level and any evidence gap.
- Targeted fix direction.
- Verification plan or exact checks run.
- Residual risk.

## Never Do

- Do not patch before root cause unless the user explicitly asks for a quick mitigation.
- Do not say `likely` or `probably` as a conclusion.
- Do not anchor on a single hypothesis before generating alternatives.
- Do not add debug logs without a cleanup strategy.
- Do not summarize away timestamps, IDs, exact errors, or event ordering.
- Do not repeat secrets, API keys, raw credentials, full sensitive URLs, or HAR secrets in summaries/docs/commits.
