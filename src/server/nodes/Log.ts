import ServerNode from "../ServerNode";

export default class Log extends ServerNode {
	constructor(options = {}) {
		super({
			// Defaults
			name: 'Log',
			summary: 'log inputs to console',
			category: 'Workflow',
			defaultInPorts: ['Input'],
			defaultOutPorts: [],			
			// Explicitly configured
			...options,
		})
	}

    async run() {
		// do like this to help when searching for console littering
		const method = 'log'

        console.group('DataStory Log Node: ' + this.id)
			console[method](this.input().map(f => f.original));
			console[method](JSON.stringify(this.input().map(f => f.original)))
        console.groupEnd();
    }
}