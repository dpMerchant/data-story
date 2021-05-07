import Create from '../../../../src/server/nodes/Create'
import { when } from "../ServerNodeTester";

it('creates an empty object by default', async () => {
    await when(Create).hasDefaultParameters()
		.assertCanRun()
		.assertOutput([{}])
		.finish()
});

it('can create complex object from json', async () => {
    await when(Create).hasParameters({ contents: '{"foo": "bar"}'})
		.assertCanRun()
		.assertOutput([{foo: 'bar'}])
		.finish()
});

it('can create a string', async () => {
    await when(Create).hasParameters({ feature_type: 'string', contents: 'This is a string'})
		.assertCanRun()
		.assertOutput(['This is a string'])
		.finish()
});

it('can create a float', async () => {
    await when(Create).hasParameters({ feature_type: 'float', contents: '13.37'})
		.assertCanRun()
		.assertOutput([13.37])
		.finish()
});

it('can create an integer', async () => {
    await when(Create).hasParameters({ feature_type: 'integer', contents: '1337'})
		.assertCanRun()
		.assertOutput([1337])
		.finish()
});