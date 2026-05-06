---
name: test-driven-development
description: Test-driven development with red-green-refactor, vertical slices, behavior tests through public interfaces, and boundary-only mocking. Use when building features or fixing bugs with TDD, adding regression tests, or designing testable interfaces.
compatibility: opencode
---

## Use When

- The user asks for TDD, regression tests, integration tests, test-first development, or red-green-refactor.
- A bug fix needs a durable regression test.
- A feature can be built in thin vertical slices.

## Philosophy

- Tests should verify behavior through public interfaces, not implementation details.
- Good tests describe what the system does and survive internal refactors.
- Bad tests mock internal collaborators, test private methods, assert call counts/order, or break when behavior is unchanged.

## Workflow

1. Confirm the public interface and the most important behaviors to test.
2. Identify the correct seam: the place where the real user/caller-observable behavior can be exercised.
3. Define success criteria before coding.
4. Build one vertical slice at a time. Do not write all tests first and all implementation later.
5. Red: write one failing test for one behavior.
6. Green: write the minimal production code to pass that test.
7. Repeat for the next behavior, learning from the previous slice.
8. Refactor only when green. Run tests after each refactor step.
9. After the fix/feature, run the original reproduction or broader relevant checks.

## Test Quality Checklist

- Test describes behavior, not implementation.
- Test uses the public interface or a real external seam.
- Test would survive internal refactors.
- Test has one logical assertion or one coherent behavior.
- Code added is minimal for the current test.
- No speculative future behavior added.

## Mocking Rules

- Mock at true system boundaries: external APIs, time/randomness, network, sometimes filesystem/database.
- Do not mock your own internal modules just because it is convenient.
- Prefer test DB/local stand-ins over mocks when they exercise the real integration better.
- Prefer typed SDK-style boundary functions over generic fetchers with conditional mock logic.

## Never Do

- Do not write horizontal slices: all tests, then all implementation.
- Do not refactor while red.
- Do not create implementation-detail tests that lock in the current structure.
- Do not weaken or remove tests to make implementation easier.
