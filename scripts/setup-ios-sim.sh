#!/usr/bin/env bash
# Prepares the iOS simulator for a QA run: installs the app build and hands
# an open agent-device session to the QA agent.
set -euo pipefail

APP_PATH="${1:?usage: setup-ios-sim.sh <path-to-simulator-.app>}"
BUNDLE_ID="com.wobsoriano.expo-clerk-qa-agent"

xcrun simctl install booted "$APP_PATH"
agent-device open "$BUNDLE_ID" --session qa-run
