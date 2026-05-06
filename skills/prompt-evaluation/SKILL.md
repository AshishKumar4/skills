---
name: prompt-evaluation
description: Prompt and agent-behavior workflow for system prompts, tool/mode gating, prompt bloat, raw model request/response analysis, evals, benchmarks, judges, and subagent behavior.
compatibility: opencode
---

## Use When

- Editing or reviewing system prompts, agent instructions, tool descriptions, skills, mode/tool gating, memory, evals, benchmarks, or agent behavior.
- The user mentions prompt bloat, raw requests/responses, transcripts, judge models, evals, subagents, tool misuse, mode regressions, or delegated coding sessions.

## Principles

- Avoid prompt bloat. Prefer concise, targeted edits that replace, tighten, or gate existing text.
- Preserve important constraints from original prompts unless explicitly removed.
- Gate instructions by actual tool availability and mode. Do not reference unavailable tools.
- Prefer deterministic system design over relying only on model obedience.
- Inspect raw model requests/responses, transcripts, tool events, and background events before diagnosing behavior.
- Use judge/eval/subagent results as signals, not truth. Filter false positives and validate important claims manually.

## Subagent/Delegation Rules

- Use subagents for whole coherent problems, not tiny chores.
- One session per problem is the default; the session owns its internal parallelism.
- Do not repeatedly poll long-running delegated sessions with shell/git/file/build/status commands unless there is a concrete blocker.
- Use mid-flight steering only when new information changes the task or the session is off track.
- Verify delegated output before reporting success.

## Workflow

1. Identify exact observed behavior and desired behavior.
2. Inspect current prompt/tool/mode text and raw requests/responses.
3. Classify issue: missing instruction, overbroad instruction, conflict, prompt bloat, bad gating, unavailable tool reference, deterministic system gap.
4. Propose concise edits and explain what they replace.
5. Validate with evals, replay, raw samples, static checks, or manual inspection.
6. Track variants, results, false positives, and regressions.

## Skill Authoring Rules

- The skill description is the trigger surface. It must clearly say what the skill does and when to use it.
- Keep `SKILL.md` short and operational. Split rarely needed details into adjacent reference files.
- Add scripts for deterministic repeated operations such as validation, formatting, extraction, or report generation.
- Avoid time-sensitive claims in skills.
- Use consistent terminology across related skills.
- Review whether a new skill should be a separate skill, a reference file under an existing skill, or a rule in `AGENTS.md`.

## Never Do

- Do not add duplicate or contradictory prompt sections.
- Do not remove important constraints only to shorten text.
- Do not trust judge output without manual triage.
- Do not leak hidden slash-command directives into user-visible prompts.
- Do not create a new skill with a vague description such as “helps with docs” or “improves code.”
