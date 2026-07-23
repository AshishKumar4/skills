#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SRC="${HOME}/.config/opencode"

cp "${SRC}/AGENTS.md" "${ROOT}/AGENTS.md"
mkdir -p "${ROOT}/skills"
for dir in "${ROOT}"/skills/*/; do
  name="$(basename "${dir}")"
  if [ ! -d "${SRC}/skills/${name}" ]; then
    echo "skip ${name} (not installed in ${SRC}/skills)"
    continue
  fi
  rm -rf "${ROOT}/skills/${name}"
  cp -R "${SRC}/skills/${name}" "${ROOT}/skills/${name}"
done

echo "Synced installed AGENTS.md and skills into repo"
