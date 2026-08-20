'use agent';

import { $ } from 'zx';
import { defineTool, useModel, useTool } from '@flue/runtime';
import * as v from 'valibot';

const agentDevice = defineTool({
	name: 'agent_device',
	description:
		'Run one agent-device CLI command to drive the iOS simulator. Loop: snapshot -i, act on refs (press/fill), re-snapshot, verify. Pass the subcommand and its flags as args.',
	input: v.object({ args: v.array(v.string()) }),
	async run({ data }) {
		const result = await $`agent-device ${data.args}`.nothrow().quiet();
		return {
			output: {
				ok: result.exitCode === 0,
				stdout: result.stdout.slice(0, 8000),
				stderr: result.stderr.slice(0, 2000),
			},
		};
	},
});

export function QaAgent() {
	useModel('anthropic/claude-sonnet-5');
	useTool(agentDevice);

	return [
		'You QA an Expo app installed on a booted iOS simulator. Bundle id: com.wobsoriano.expo-clerk-qa-agent.',
		'Pass --session qa-run to every agent_device call so your commands share one session.',
		'Open the app first, then verify each acceptance step from snapshots, never assume.',
		'When done, close the session, then reply with one pass/fail line per step and what you observed.',
	].join('\n');
}
