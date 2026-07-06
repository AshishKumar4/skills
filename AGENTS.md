# Global Rules

## Writing/Editing style rules

- Whenever writing textual deliverables on behalf of me, please ensure you write it in my voice and style. and avoid using any AI-generated language patterns.
- Such patterns can include overly formal language, excessive use of filler words, robotic phrasing, defensive language, overly cautious phrasing or antithesis (eg, "It's not X, It's Y").

## How I Want You To Work

- Build the right solution, not the quickest patch.
- Research and plan everything properly and thoroughly. Nothing should be skipped or left for later unless I explicitly defer it.
- Always strive for concise, simple solutions.
- If a problem can be solved in a simpler way, which is elegant and clean as well, propose it.
- Prefer the smallest correct production-quality change, but do not use “minimal” as an excuse for hacky, incomplete, fragile, or low-quality work.
- Every changed line should trace back to the task, the root cause, or a clearly related cleanup. No unrelated improvements, drive-by refactors, or features beyond what was asked.
- If I ask you to continue, go ahead, implement, fix, or build, keep going through implementation, verification, cleanup, and final summary unless I stop you.
- Ask only when intent, product direction, or compatibility requirements are genuinely unclear. Do not ask avoidable questions when the requirement is clear.
- Preserve unrelated user changes and dirty worktrees. Do not touch unrelated files.
- Do not commit, push, rebase, deploy, or create PRs unless I explicitly ask.
- Use pnpm if the project already uses it, otherwise use bun.
- Never use npm or yarn.

## Planning And No-Code Boundaries

- If I say `plan`, `plan first`, `pure planning mode`, `research only`, `report first`, `read-only`, `make no changes`, or `no code changes`, do not modify files.
- In planning mode, still investigate properly: read code, logs, docs, PR diffs, transcripts, raw requests/responses, and current behavior as needed.
- For ambiguous, risky, large, or regression-prone work, first investigate deeply, then give the absolute best plan before editing.
- Before substantial implementation, plan deeply and thoroughly enough to avoid hacky or incomplete work; then execute against the plan.
- Plans should be grounded in current evidence and should include what will change, what will not change, regression risks, and verification.

## Debugging And Regressions

- For bugs and regressions, find the root cause before changing code.
- No speculations. Either be 100% confident something is true, or say what is confirmed, what is unknown, and what evidence is missing.
- Before you state a root cause, approve a plan, say something is fixed, say a PR is ready, or dismiss a reviewer finding, self-challenge it as if I asked: “can you bet $1000 on this?”
- Do another round of revision until you are 100% confident. If you cannot get to 100%, say exactly what evidence is missing and how to get it.
- Trace the actual code path, logs, transcripts, raw requests/responses, docs, API behavior, PR diffs, recent commits, and reproducible evidence. Do not guess.
- For regressions, compare against the last known good behavior or recent commits before proposing fixes.
- Prefer deterministic system fixes over prompt-only fixes when the system can mechanically prevent the problem.
- Do not add broad retries, fallbacks, guards, migrations, compatibility layers, or defensive code unless the evidence shows they are needed.

## Code Quality

- I want clean, elegant, beautiful, readable, maintainable, well typed, strictly DRY, non-hacky code.
- Always strive for concise, simple solutions.
- If a problem can be solved in a simpler way, which is elegant and clean as well, propose it.
- Everything should be done the right and proper way rather than quick and hacky.
- No hacky stuff anywhere. No unnecessary bloat. No duplicacies/redundancies. No drift-prone parallel systems.
- Question every new thing: new file, new abstraction, new state, new fallback, new config, new dependency, new validation, new cap, new migration, new compatibility layer. Add it only if it is concretely needed.
- Prefer existing utilities, schemas, generated/shared types, framework APIs, source-of-truth configs, and shared code paths before creating new ones.
- Avoid duplicate logic, duplicate state, mirror state, shadow copies, unnecessary wrappers, redundant re-exports, hardcoded drift-prone lists, and parallel systems.
- Never use `any`, `unknown`, unsafe casts, non-null assertions, and type assertions. They hide real issues. Narrow trust boundaries explicitly.
- Do not add migrations, backward-compatibility code, preflights, feature flags, fallbacks, defensive code, new files, or abstractions unless there is concrete need.
- Remove dead code, stale comments, debug scaffolding, unused config/env vars, deferred feature remnants, and redundant paths when clearly in scope.
- Comments should be rare, concise, and professional. No unnecessary/overly verbose comments. No stupid comments. Add comments only for non-obvious why/constraints; remove comments that restate code, explain the change, or sound AI-generated.

## Architecture

- Design and build things with generalizability, scalability, maintainability, and performance in mind.
- Plan to build abstractions that are minimal, focused, and composable. And Everything should be built with such abstractions over abstracted layers.
- Build abstractions to be used as primitives and building blocks for other abstractions.
- These abstractions should be designed to be as minimal as possible while being as powerful and general as possible. 
- Prefer single sources of truths
- Prefer deep modules: a small stable interface hiding meaningful complexity. Avoid shallow modules that merely pass through the same concepts under new names.
- Apply the deletion test before adding an abstraction: if removing it and inlining the call sites makes the code clearer, do not add it.
- Use seams and adapters at real boundaries: external APIs, SDKs, storage, network calls, UI/backend boundaries, and trust boundaries. Do not add adapters between tightly coupled internal functions just for neatness.
- Before extracting interfaces, identify what complexity the module will own, what policy it hides, and what callers no longer need to know.
- Preserve layering boundaries: SDK/client code should not import worker internals, UI should not duplicate backend policy, and lifecycle ownership should not be spread across unrelated layers.

## Verification

- Verify it actually works.
- Define success criteria for non-trivial work. For multi-step tasks, pair each major step with the check that proves it worked.
- Verify with the closest realistic checks: tests, typecheck, lint, build, local run, API check, logs, screenshots, UI/manual checks, deployment checks, production/staging evidence, or formal proofs where relevant.
- Add or update targeted regression tests for bug fixes when feasible.
- Prefer behavior tests through public interfaces. Mock only at real external seams unless there is a concrete reason.
- Report exact checks run and any residual risk. Do not claim readiness without evidence.

## Reviews And PRs

- For code reviews, put findings first, ordered by severity. Focus on bugs, regressions, behavioral changes, duplicated code, dead code, security risks, type-safety issues, and missing tests.
- For AI reviewer comments, first classify each finding as agree, disagree, needs clarification, already fixed, or intentionally deferred. Do not blindly apply reviewer suggestions.
- If disagreeing, explain the concrete evidence: incorrect premise, existing mitigation, disproportionate scope, stale comment, or better follow-up path.
- Review the actual current diff and surrounding code, not just the reviewer summary.
- Have proper and clear PR descriptions explaining the WHAT, WHY, and HOW of the changes, or ROOT CAUSES, EVIDENCE and REASONING for bug fixes.

## Agent And Prompt Behavior

- Use subagents for long or complex tasks such as researching, auditing, executing, or analyzing - unless you are a sub-agent yourself. Delegate with enough and complete context and expected output, then verify their results and the assumptions made by them.
- For serious reviews, risky plans, substantial implementations/PRs, prompt changes, or complex investigations, use multiple independent subagents/judges, then validate their findings yourself. Do not blindly trust them.
- For system prompt changes, avoid prompt bloat. Prefer concise, targeted edits that are gated to actual modes/tools. Do not reference tools that are unavailable.
- Use judge/eval/subagent results as signals, not truth; filter false positives and validate important claims manually.

## Skills

- Use `root-cause-debug` for production bugs, regressions, workspace/sandbox failures, raw logs, transcripts, request/response dumps, unclear failures, and evidence-first investigations.
- Use `code-quality-audit` for DRY, architecture, type safety, comments, bloat, dead code, deep/shallow module analysis, and cleanup work.
- Use `planning-review` for major plans, risky architecture changes, pure planning/no-code requests, plan critiques, and design tradeoffs.
- Use `review-fix-loop` for PR/MR review comments, AI reviewer triage, CI failures, merge readiness, and review-fix loops.
- Use `frontend-polish` for UI/UX, visuals, screenshots, document viewers, thumbnails, editors, and product polish.
- Use `prompt-evaluation` for system prompts, agent behavior, skills, tool/mode gating, prompt bloat, evals, benchmarks, and raw model request/response analysis.
- Use `test-driven-development` for red-green-refactor, vertical slices, behavior tests, regression tests, and testable interface design.
