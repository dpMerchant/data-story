import Evaluate from '../../../../src/server/nodes/Evaluate'
import { when } from "../ServerNodeTester";

it('can execute javascript per feature', async () => {
    await when(Evaluate).hasInput([{nbr: 3}]).and().parameters({
		expression: `
			let newValue = feature.get('nbr') * 3
			feature.set('nbr', newValue)
		`
	})
		.assertOutput([{nbr: 9}])
		.finish()
});

it('can execute javascript globally', async () => {
    await when(Evaluate).hasInput([1,2,3]).and().parameters({
		evaluation_context: 'global',
		expression: `
			this.output(
				this.input().reverse()
			)
		`
	})
		.assertOutput([3,2,1])
		.finish()
});