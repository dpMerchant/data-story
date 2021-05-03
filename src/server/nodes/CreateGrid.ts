import Feature from "../../core/Feature";
import ServerNode from "../ServerNode";
import NodeParameter from "../../core/NodeParameter";

export default class CreateGrid extends ServerNode {
	constructor(options = {}) {
		super({
			// Defaults
			name: 'CreateGrid',
			summary: 'Create a set of objects with coordinates x and y',
			category: 'Reader',
			defaultInPorts: [],
			defaultOutPorts: ['Output'],			
			// Explicitly configured
			...options,
		})
	}

    async run() {
        let gridStartX = parseFloat(this.getParameterValue('grid_start_x'))
        let gridStartY = parseFloat(this.getParameterValue('grid_start_y'))
        let gridEndX = parseFloat(this.getParameterValue('grid_end_x'))
        let gridEndY = parseFloat(this.getParameterValue('grid_end_y'))		
        let gridSizeX = parseInt(this.getParameterValue('grid_size_x'))
        let gridSizeY = parseInt(this.getParameterValue('grid_size_y'))		
        let gridSpacingX = parseFloat(this.getParameterValue('grid_spacing_x'))
        let gridSpacingY = parseFloat(this.getParameterValue('grid_spacing_y'))

		if(gridEndX && gridEndY) {
			gridSizeX = Math.ceil((gridStartX + gridEndX)/gridSpacingX)
			gridSizeY = Math.ceil((gridStartY + gridEndY)/gridSpacingY)
		}

        let features = [];

        for(let x = 0; x < gridSizeX; x++) {
            for(let y = 0; y < gridSizeY; y++) {
                features.push(
                    new Feature({
                        x: gridStartX + x * gridSpacingX,
                        y: gridStartY + y * gridSpacingY,
                    })
                )
            }            
        }

        this.output(features);       
    }

	getParameters() {
		return [
			...super.getParameters(),
            NodeParameter.number('grid_start_x').withValue(0),
            NodeParameter.number('grid_start_y').withValue(0),
            NodeParameter.number('grid_end_x').withValue(100),
            NodeParameter.number('grid_end_y').withValue(100),
            NodeParameter.number('grid_size_x').withDescription('Ignored if grid_end_x is set'),
            NodeParameter.number('grid_size_y').withDescription('Ignored if grid_end_y is set'),
            NodeParameter.number('grid_spacing_x').withValue(1),
            NodeParameter.number('grid_spacing_y').withValue(1),             
		]
	}	
}