#!/usr/bin/env bash
# Runs the QA agent against the app on your booted simulator.
#
#   ./scripts/qa-local.sh "Signing in shows the account email and a sign out button"
#   ./scripts/qa-local.sh          # falls back to this branch's pull request
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
BUNDLE_ID="com.wobsoriano.expo-clerk-qa-agent"
# Always the pinned binary: a different global agent-device would replace the
# daemon and drop the session out from under the agent.
AGENT_DEVICE="$ROOT/agent-qa/node_modules/.bin/agent-device"

if [ $# -ge 1 ]; then
  message="Check the following: $1"
else
  echo "No instruction given, reading the pull request for this branch..."
  message="$(printf 'Pull request under review:\n\nTitle: %s\n\nDescription:\n%s' \
    "$(gh pr view --json title --jq '.title')" "$(gh pr view --json body --jq '.body')")"
fi

"$AGENT_DEVICE" open "$BUNDLE_ID" --session qa-run --relaunch >/dev/null

cd "$ROOT/agent-qa"
npm run --silent qa -- --message "$message"
