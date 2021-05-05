import ServerNode from "../ServerNode";
import NodeParameter from "../../core/NodeParameter";
import Feature from "../../core/Feature";

export default class FilterDuplicates extends ServerNode {
	constructor(options = {}) {
		super({
			// Defaults
			name: 'FilterDuplicates',
			summary: 'Remove duplicates',
			category: 'Workflow',
			defaultInPorts: ['Input'],
			defaultOutPorts: ['Output'],			
			// Explicitly configured
			...options,
		})
	}

    async run() {
        const attribute = this.getParameterValue('attribute');

		const compareValues = this.input().map(feature => {
			return attribute.split('.').reduce((traversed, part) => {
				return traversed[part]
			}, feature.original)
		})

		console.log()

		this.output(
			this.unique(compareValues).map(u => new Feature(u))
		);
    }
	
	getParameters() {
		return [
			...super.getParameters(),
            NodeParameter.string('attribute').withDescription("attribute to filter on, may use dot notation")
		]
	}

	unique(a) {
		var prims = {"boolean":{}, "number":{}, "string":{}}, objs = [];
	
		return a.filter(function(item) {
			var type = typeof item;
			if(type in prims)
				return prims[type].hasOwnProperty(item) ? false : (prims[type][item] = true);
			else
				return objs.indexOf(item) >= 0 ? false : objs.push(item);
		});
	}	
}