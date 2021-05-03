import ServerNode from "../ServerNode";
import NodeParameter from "../../core/NodeParameter";
import Feature from "../../core/Feature";

export default class OutputProvider extends ServerNode {
	constructor(options = {}) {
		super({
			// Defaults
			name: 'OutputProvider',
			summary: 'Provides output ports from JSON',
			category: 'Workflow',
			defaultInPorts: [],
			defaultOutPorts: [],
			editableOutPorts: true,
			// Explicitly configured
			...options,
		})
	}

    async run() {
        const outputs = this.getParameterValue('outputs')

		for(const {key, value} of outputs) {
			this.output(key, value.map(v => new Feature(v)))
		}
    }
	
	getParameters() {
		return [
			...super.getParameters(),
            NodeParameter.json('outputs').withValue(JSON.stringify({
				o1: [1,2,3],
				o2: [4,5,6],
			}, null, 4)),
		]
	}		
}