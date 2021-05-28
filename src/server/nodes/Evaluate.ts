import ServerNode from "../ServerNode";
import NodeParameter from "../../core/NodeParameter";

const placeholder =
`// PER FEATURE mode lets you use the feature api ie,
// feature.get('some_property')
// feature.set('some_property', 123)

// GLOBAL mode gives full control
// use this.input() and this.output()
`

export default class Evaluate extends ServerNode {
	constructor(options = {}) {
		super({
			// Defaults
			name: 'Evaluate',
			summary: 'Evaluate javascript',
			category: 'Workflow',
			defaultInPorts: ['Input'],
			defaultOutPorts: ['Output'],			
			// Explicitly configured
			...options,
		})
	}

    async run() {
		return this.getParameterValue('evaluation_context') == 'per_feature'
			? this.runPerFeature()
			: this.runGlobal()
    }

	runPerFeature() {
        this.output(
            this.input().map(feature => {
                eval(this.getExpression())
                return feature
            })
        );
	}

	runGlobal() {
		eval(this.getExpression())
	}

	getExpression() {
		return this.getParameterValue('expression')
	}
	
	getParameters() {
		return [
			...super.getParameters(),
			NodeParameter.select('evaluation_context')
				.withOptions(['per_feature', 'global'])
				.withValue('per_feature'),
            NodeParameter.js('expression')
				.withDescription("javascript code to execute")
				.withValue(placeholder)
		]
	}		
}