#!/usr/bin/env bash
# Prepares the iOS simulator for a QA run: installs the app build, warms the
# XCTest runner, and hands an open agent-device session to the QA agent.
set -euo pipefail

APP_PATH="${1:?usage: setup-ios-sim.sh <path-to-simulator-.app>}"
BUNDLE_ID="com.wobsoriano.expo-clerk-qa-agent"

xcrun simctl install booted "$APP_PATH"

# On a cache hit no xcodebuild runs, so the runner is built cold on first
# use and the interaction times out. Build it up front instead.
agent-device prepare ios-runner --platform ios --timeout 600000

agent-device open "$BUNDLE_ID" --session qa-run
