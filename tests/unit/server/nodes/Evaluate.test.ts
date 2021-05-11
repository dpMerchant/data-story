import Evaluate from '../../../../src/server/nodes/Evaluate'
import { when } from "../ServerNodeTester";

it('can execute javascript', async () => {
    await when(Evaluate).hasInput([{nbr: 3}]).and().parameters({
		expression: `
			let newValue = feature.get('nbr') * 3
			feature.set('nbr', newValue)
		`
	})
		.assertOutput([{nbr: 9}])
		.finish()
});