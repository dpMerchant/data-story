import NodeParameter from "../../core/NodeParameter";
import ServerNode from "../ServerNode";

export default class Clone_ extends ServerNode {
    category: string = 'Workflow'    
    summary = 'Make a set of clones'
	name = 'Clone_'

    async run() {
        this.output(
            [
				this.input(),
				...Array(
					this.getParameterValue('number_of_clones')
				).fill(this.input())
			].flat()
        )
    }

	getParameters() {
		return [
			...super.getParameters(),
            NodeParameter.number('number_of_clones').withValue(10),
		]
	}	
}