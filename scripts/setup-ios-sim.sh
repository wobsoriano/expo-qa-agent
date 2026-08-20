#!/usr/bin/env bash
# Prepares the iOS simulator for a QA run: installs the app build, warms the
# XCTest runner, and hands an open agent-device session to the QA agent.
set -euo pipefail

APP_PATH="${1:?usage: setup-ios-sim.sh <path-to-simulator-.app>}"
BUNDLE_ID="com.wobsoriano.expo-clerk-qa-agent"

xcrun simctl install booted "$APP_PATH"

# Building the runner is slow on a cold machine, and slower still when the
# native build was restored from cache and never warmed Xcode. Without this
# the first interaction times out.
agent-device prepare ios-runner --platform ios --timeout 600000

agent-device open "$BUNDLE_ID" --session qa-run
