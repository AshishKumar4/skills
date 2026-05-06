# My agents and skills library

I asked opencode to go through all my previous opencode session transcripts, and extract all my prompts, and then condense their essence into reusable skills and agents.md files.
Lets see where this goes

## Contents

- `AGENTS.md` - global OpenCode rules
- `skills/root-cause-debug` - evidence-first debugging and regressions
- `skills/code-quality-audit` - DRY, type safety, architecture, comments, and bloat
- `skills/planning-review` - no-code planning, risky plans, and design tradeoffs
- `skills/review-fix-loop` - PR/MR review comments, CI failures, and review-fix loops
- `skills/frontend-polish` - UI/UX, screenshots, document viewers, and product polish
- `skills/prompt-evaluation` - system prompts, tool gating, evals, and agent behavior
- `skills/test-driven-development` - red-green-refactor and behavior tests

## Install

Interactive install:

```bash
./install.sh
```

Default global OpenCode install:

```bash
node ./bin/install.mjs --yes
```

Dry run:

```bash
node ./bin/install.mjs --dry-run
```

## Options

```bash
node ./bin/install.mjs --list
node ./bin/install.mjs --verify
node ./bin/install.mjs --target=project-opencode
node ./bin/install.mjs --target=global-claude
node ./bin/install.mjs --skills=root-cause-debug,code-quality-audit
node ./bin/install.mjs --no-agents
```

Targets:

- `global-opencode` - `~/.config/opencode`
- `project-opencode` - current repo `AGENTS.md` and `.opencode/skills`
- `global-claude` - `~/.claude`

Existing files are backed up with a timestamped `.backup-*` suffix unless `--force` is used.

## Verify

```bash
./verify.sh
```

## Sync From Installed Config

If you edit the installed OpenCode config directly, sync it back into this repo:

```bash
./sync-from-installed.sh
```
