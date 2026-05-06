---
name: planning-review
description: Planning and plan-review workflow for risky architecture changes, pure no-code planning, research mode, plan critiques, source-of-truth mapping, and approval boundaries.
compatibility: opencode
---

## Use When

- The user says `plan first`, `pure planning mode`, `research only`, `no code changes`, `make no changes`, `read-only`, `report first`, `think deeply`, `revise the plan`, or asks for plan critique.
- The change is risky, architectural, large, ambiguous, regression-prone, prompt-related, or production-facing.

## Hard Boundary

- In no-code/planning/research mode, do not edit files, commit, push, deploy, or run write-producing commands.
- Investigation is expected: read code, logs, docs, PR diffs, and current behavior. Keep the workspace unchanged.
- If the request mixes planning and implementation language, obey the stricter boundary: plan first and wait for approval.

## Plan Workflow

1. Confirm current objective and constraints.
2. Inspect enough current code/evidence to avoid guessing.
3. Describe current behavior and source of truth.
4. Identify root cause or uncertainty.
5. State design principle/invariant.
6. Compare options and reject overcooked/hacky alternatives.
7. Propose the smallest correct design.
8. List exact affected areas and what will not change.
9. Include regression risks and verification plan.
10. For unclear product/domain decisions, ask one question at a time and provide your recommended answer.
11. If the answer can be found by exploring code/docs, explore instead of asking.
12. Stop for approval if implementation was not explicitly authorized.

## Plan Review Workflow

- For another agent's plan, cross-examine against code and evidence.
- Keep correct parts, reject unsafe/bloated parts, and produce a revised final plan.
- For reviewer comments, classify each as agree/disagree/needs clarification before edits.

## Domain And Decision Docs

- If `CONTEXT.md`, `CONTEXT-MAP.md`, or `docs/adr/` exist, read relevant entries before major architecture plans.
- Use project domain vocabulary from `CONTEXT.md` when present.
- When a term is fuzzy or overloaded, propose a precise canonical term.
- Offer an ADR only when the decision is hard to reverse, surprising without context, and the result of a real tradeoff.
- Do not create or update domain docs in no-code planning mode unless explicitly asked.

## Never Do

- Do not produce a plan from assumptions.
- Do not add compatibility layers, migrations, flags, fallbacks, state, or abstractions without concrete need.
- Do not broaden scope beyond the requested slice.
- Do not ask a pile of questions at once. Walk the design tree one branch at a time.
