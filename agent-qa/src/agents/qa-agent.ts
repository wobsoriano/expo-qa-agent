'use agent';

import { $ } from 'zx';
import { defineTool, useModel, useTool } from '@flue/runtime';
import * as v from 'valibot';

const SESSION = 'qa-run';

const agentDevice = defineTool({
	name: 'agent_device',
	description:
		'Drive the iOS simulator with one agent-device command: `snapshot -i` to inspect, `press`/`fill` to act, `screenshot` to capture. The session flag is added for you.',
	input: v.object({ args: v.array(v.string()) }),
	async run({ data }) {
		const result = await $`agent-device ${data.args} --session ${SESSION}`.nothrow().quiet();
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
		'You QA an Expo app on an iOS simulator, as a black box. It is already installed and open.',
		'Infer the acceptance criteria from the pull request. Always check that the main screen renders without an error overlay.',
		'Verify every step against a snapshot before judging it. Never assume.',
		'Finish with one pass/fail line per step, then exactly "QA: PASS" or "QA: FAIL".',
	].join('\n');
}
