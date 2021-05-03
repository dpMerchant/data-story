import ServerNode from "../ServerNode";
// @ts-ignore
import _ from 'lodash'
import NodeParameter from "../../core/NodeParameter";

export default class RegExpFilter extends ServerNode {
	constructor(options = {}) {
		super({
			// Defaults
			name: 'RegExpFilter',
			summary: 'Filter features matching an attribute regular expression',
			category: 'Workflow',
			defaultInPorts: ['Input'],
			defaultOutPorts: ['Passed', 'Failed'],
			// Explicitly configured
			...options,
		})
	}

    serialize() {
        let description = super.serialize()

        description.parameters.push(
            NodeParameter.string('attribute').withValue('name'),
            NodeParameter.string('expression').withValue('/test|draft|dummy/'),            
        )

        return description
    }

	getParameters() {
		return [
			...super.getParameters(),
            NodeParameter.string('attribute').withValue('name'),
            NodeParameter.string('expression').withValue('/test|draft|dummy/'),            
		]
	}	

    async run() {
        this.output(this.matching(), 'Passed');
        this.output(this.notMatching(), 'Failed');
    }

    protected matching() {
        return this.filterByRegExp(this.input())
    }

    protected notMatching() {
        return this.filterByRegExp(this.input(), true)
    }    
    
    protected filterByRegExp(features, returnFailed = false) {
        return features.filter(feature => {
            let expression = this.getExpression()
            let column = this.getParameterValue('attribute')

            return returnFailed
                ? !expression.test(feature.original[column])
                : expression.test(feature.original[column])
        })
    }

    protected getExpression() {
        let cleaned = _.trim(this.getParameterValue('expression'), '/')
        return RegExp(cleaned)
    }
}