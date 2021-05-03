import ServerNode from "../ServerNode";

export default class Alert extends ServerNode {
	constructor(options = {}) {
		super({
			// Defaults
			name: 'Alert',
			summary: 'Alert with content of first feature',
			category: 'Workflow',
			defaultInPorts: ['Input'],
			defaultOutPorts: [],			
			// Explicitly configured
			...options,
		})
	}

    async run() {
        // alert(
		// 	this.input()[0]?.original ?? 'Alert!'
		// ) 
    }   
}