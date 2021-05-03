import ServerNode from "../ServerNode";
import Feature from "../../core/Feature";

export default class Create extends ServerNode {
	constructor(options = {}) {
		super({
			// Defaults
			name: 'Create',
			summary: 'Create a null feature',
			category: 'Workflow',
			defaultInPorts: [],
			defaultOutPorts: ['Output'],			
			// Explicitly configured
			...options,
		})
	}

    async run() {
        this.output([new Feature()])
    }
}