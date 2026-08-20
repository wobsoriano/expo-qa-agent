'use agent';

import { $ } from 'zx';
import { defineTool, useInstruction, useModel, useTool } from '@flue/runtime';
import * as v from 'valibot';
import instructions from './instructions.md';

const { CLERK_TEST_EMAIL, CLERK_TEST_PASSWORD } = process.env;

const agentDevice = defineTool({
	name: 'agent_device',
	description: 'Run one agent-device command and return its output.',
	input: v.object({ args: v.array(v.string()) }),
	async run({ data }) {
		const command = $`agent-device ${data.args} --session qa-run`;
		const { stdout, stderr } = await command.nothrow().quiet();
		return `${stdout}${stderr}`.slice(0, 8000);
	},
});

export function QaAgent() {
	useModel('anthropic/claude-haiku-4-5');
	useTool(agentDevice);
	useInstruction(`Sign in with ${CLERK_TEST_EMAIL} / ${CLERK_TEST_PASSWORD}.`);
	return instructions;
}
