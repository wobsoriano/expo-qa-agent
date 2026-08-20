'use agent';

import { $ } from 'zx';
import { defineTool, useModel, useTool } from '@flue/runtime';
import * as v from 'valibot';

const SESSION = 'qa-run';

const agentDevice = defineTool({
	name: 'agent_device',
	description:
		'Run one agent-device command against the iOS simulator: `snapshot -i` to inspect, `press`/`fill` to act, `help` to discover the rest. The session flag is added for you.',
	input: v.object({ args: v.array(v.string()) }),
	async run({ data }) {
		const { stdout, stderr } = await $`agent-device ${data.args} --session ${SESSION}`.nothrow().quiet();
		return `${stdout}${stderr}`.slice(0, 8000);
	},
});

export function QaAgent() {
	useModel('anthropic/claude-haiku-4-5');
	useTool(agentDevice);

	return [
		'You QA an Expo app on an iOS simulator, as a black box. It is already installed and open.',
		`Sign in when asked with ${process.env.CLERK_TEST_EMAIL} and password ${process.env.CLERK_TEST_PASSWORD}.`,
		'Infer the acceptance criteria from the pull request, and always check the app renders its main screen.',
		'Verify every step against a snapshot before judging it. Never assume.',
		'Reply with only one line per step: the criterion, PASS or FAIL, and what you saw.',
		'No preamble, no narration, no headings. End with exactly "QA: PASS" or "QA: FAIL".',
	].join('\n');
}
