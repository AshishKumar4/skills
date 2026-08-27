---
name: code-quality-audit
description: Deep code quality and architecture audit for DRY, type safety, comments, bloat, dead code, module depth, seams/adapters, source-of-truth drift, and maintainability.
compatibility: opencode
---

## Use When

- The user asks for code quality, architecture, DRY, duplication, comments, type safety, cleanup, bloat, refactoring, or `right and proper way` analysis.
- The task involves broad cleanup, PR readiness, deep review, or finding hacky patterns.

## Standards

- Clean, elegant, readable, well typed, maintainable, readable, composable, well crafted, strictly DRY, non-hacky, 99th percentile code.
- Prefer source-of-truth schemas, generated/shared types, existing helpers, framework APIs, and shared code paths.
- No unnecessary bloat, dead code, debug scaffolding, stale comments, redundant wrappers, duplicate state, drift-prone lists, or parallel systems.
- Comments should be rare and explain non-obvious why/constraints. Flag comments that restate code or sound AI-generated.

## Architecture Vocabulary

- **Module:** anything with an interface and implementation.
- **Interface:** everything callers must know: types, invariants, error modes, ordering, config, and behavior.
- **Implementation:** the code inside.
- **Depth:** leverage at the interface. Deep modules hide meaningful complexity behind a smaller interface; shallow modules pass complexity through under new names.
- **Seam:** where behavior can be altered without editing callers.
- **Adapter:** concrete implementation satisfying an interface at a real seam.
- **Locality:** change, bugs, and knowledge concentrated in one place.
- **Leverage:** what callers get because a module hides complexity.

## Audit Workflow

1. Inspect current patterns and source-of-truth types/schemas/configs before proposing changes.
2. Find duplicate logic, duplicate state, redundant wrappers, re-export clutter, stale comments, unsafe casts, dead paths, unelegant code and solutions, flawed design and logic etc.
3. Apply the deletion test: if deleting an abstraction and inlining call sites makes code clearer, the abstraction should not exist.
4. And on contrary, If generalizing and introducing abstractions can reduce overall code and make code cleaner, more maintainable and understandable, Please do. Such abstractions should be elegant, clean and minimal yet powerful.
5. Use seams/adapters only at real boundaries: external APIs, SDKs, storage, network calls, UI/backend boundaries, trust boundaries.
6. Treat the interface as the test surface. If tests must reach past the interface, the module is probably the wrong shape.
7. Do not expose internal seams only because tests use them. Internal seams can stay private to the implementation.
8. Do not propose interfaces yet. Present deepening candidates first: files, problem, solution, benefits in locality/leverage, and tests that improve.
9. Classify findings by severity and risk.

## Output Format

- Findings first, ordered by severity.
- Each finding: files/lines, problem, evidence, impact, recommended smallest correct fix.
- Deepening opportunities: files, problem, solution, benefits, test impact.
- What not to change.
- Verification recommendations.