import ServerNode from "../ServerNode";
import NodeParameter from "../../core/NodeParameter";

const placeholder =
`// You may use the feature api here ie,
// feature.get('some_property')
// feature.set('some_property', 123)`

export default class Evaluate extends ServerNode {
    category: string = 'Workflow'    
    summary = "Evaluate javascript"
	name = 'Evaluate'

    async run() {
        const expression = this.getParameterValue('expression');
        this.output(
            this.input().map(feature => {
                eval(expression)
                return feature
            })
        );
    }
	
	getParameters() {
		return [
			...super.getParameters(),
            NodeParameter.js('expression')
				.withDescription("javascript code to execute on each feature")
				.withValue(placeholder)
		]
	}		
}