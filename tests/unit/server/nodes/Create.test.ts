import Create from '../../../../src/server/nodes/Create'
import { when } from "../ServerNodeTester";

it('creates an empty object by default', async () => {
    await when(Create).hasDefaultParameters()
		.assertCanRun()
		.assertOutput([{}])
		.finish()
});