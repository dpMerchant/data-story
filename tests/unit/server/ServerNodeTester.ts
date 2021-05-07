import DiagramModel from "../../../src/core/DiagramModel"
import { DiagramModelBuilder } from "../../../src/core/DiagramModelBuilder"
import Feature from "../../../src/core/Feature"
import Server from "../../../src/server/Server"
import ServerDiagram from "../../../src/server/ServerDiagram"
import ServerNode from "../../../src/server/ServerNode"
import ServerNodeFactory from '../../../src/server/ServerNodeFactory'

export class ServerNodeTester {
	diagram: DiagramModel
	runResult: ServerDiagram
	nodeClass
	parameterKeyValues: {}
	shouldDoAssertCanRun = false
	shouldDoAssertOutputs = false
	outputMap = {}
	hasRun = false
	ranSuccessfully: boolean

	constructor(nodeClass) {
		this.nodeClass = nodeClass
	}

	begin() {
		return this
	}

	has() {
		return this	
	}

	hasDefaultParameters() {
		return this
	}

	parameters(obj) {
		return this
	}

	assertCanRun() {
		this.shouldDoAssertCanRun = true
		return this
	}

	assertOutput(features: any[]) {
		return this.assertOutputs({
			Output: features
		})
	}

	assertOutputs(outputMap: {}) {
		this.shouldDoAssertOutputs = true
		this.outputMap = outputMap
		return this
	}

	async finish() {
		this.setupDiagram()
		this.shouldDoAssertCanRun && this.doAssertCanRun()
		this.shouldDoAssertOutputs && this.doAssertOutputs()
	}

	protected setupDiagram() {
		this.diagram = DiagramModelBuilder.begin()
			.add(this.nodeClass, this.parameterKeyValues)
			.finish()
	}

	protected async doAssertCanRun() {
		await this.runOnce()

		expect(this.ranSuccessfully).toBe(true)
	}

	protected async doAssertOutputs() {
		await this.runOnce()

		let serverDiagram = this.runResult

		// Check explicitly provided port outputs
		for(const [portName, expected] of Object.entries(this.outputMap)) {
			let port = serverDiagram.findByName(portName)
			let expectedFeatures = (expected as any).map(f => new Feature(f))
			expect(port.features).toStrictEqual(expectedFeatures)
		}

		// Check that no other ports emits feautures
		let ports = serverDiagram.findByName(this.nodeClass.name).ports
		let outputingPorts = ports.filter(p => p.features && p.features.length).map(p => p.name)
		const msg = 'There was a port outputting features that was not listed!'
		expect({msg, keys: Object.keys(this.outputMap)}).toEqual({msg, keys: outputingPorts})
	}

	protected async runOnce() {
        if(this.hasRun) return

		let server = new Server

		await server.run(this.diagram).then((result: any) => {
			this.runResult = result.data.diagram
			this.ranSuccessfully = true
		}).catch(f => {
			this.ranSuccessfully = false
		})

		this.hasRun = true
	}
}

export function when(nodeClass) {
	return new ServerNodeTester(nodeClass)
}