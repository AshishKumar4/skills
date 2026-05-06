#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SRC="${HOME}/.config/opencode"

cp "${SRC}/AGENTS.md" "${ROOT}/AGENTS.md"
mkdir -p "${ROOT}/skills"
for name in root-cause-debug code-quality-audit planning-review review-fix-loop frontend-polish prompt-evaluation test-driven-development; do
  rm -rf "${ROOT}/skills/${name}"
  cp -R "${SRC}/skills/${name}" "${ROOT}/skills/${name}"
done

echo "Synced installed AGENTS.md and skills into repo"
