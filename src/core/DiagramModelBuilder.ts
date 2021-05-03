import DiagramModel from "./DiagramModel"
import NodeModel from "./NodeModel"

export class DiagramModelBuilder {

	currentNode?: NodeModel
	diagram?: DiagramModel

	static begin() {
		return new this
	}

	add(nodeClass, parameterKeyValues = {}) {
		let diagram = this.getDiagram()

		let node = new NodeModel(
			(new nodeClass).serialize()
		)

		diagram.addNode(node)

		this.diagram = diagram

		this.currentNode = node

		return this.withParameters(parameterKeyValues)
	}

	withParameters(parameters: object) {
		for (const [name, value] of Object.entries(parameters)) {
			let parameter = this.currentNode.parameters.find(p => p.name == name)
			parameter.value = value
		}

		return this
	}

	then() {
		this.commitNode()
		return this
	}

	connectNode() {
		return this
	}

	finish() {
		return this.getDiagram()
	}

	protected commitNode() {
		if(this.currentNode === null) return
		
		this.diagram.addNode(this.currentNode)
		this.currentNode = null;
	}

	protected getDiagram() {
		return this.diagram ?? new DiagramModel()
	}
}