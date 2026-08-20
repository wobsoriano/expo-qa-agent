#!/usr/bin/env bash
# Polls simulator screenshots into a directory until killed. Uses simctl
# directly so it never contends with the agent's agent-device session.
set -euo pipefail

OUT_DIR="${1:?usage: capture-frames.sh <out-dir> [udid]}"
UDID="${2:-booted}"
INTERVAL="${CAPTURE_INTERVAL:-2}"

mkdir -p "$OUT_DIR"
i=0
while true; do
  i=$((i + 1))
  xcrun simctl io "$UDID" screenshot "$OUT_DIR/$(printf '%04d' "$i").png" >/dev/null 2>&1 || true
  sleep "$INTERVAL"
done
