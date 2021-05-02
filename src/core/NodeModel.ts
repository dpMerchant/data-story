import { NodeModel as DefaultNodeModel, NodeModelGenerics } from '@projectstorm/react-diagrams';
import { BasePositionModelOptions } from '@projectstorm/react-canvas-core';
import PortModel from './PortModel'
import _ from 'lodash'
import UID from './utils/UID'
import NodeParameter from './NodeParameter';

export interface NodeModelOptions extends BasePositionModelOptions {
    name: string,
    inPorts: any[],
    outPorts: any[],
    parameters: any[],
}

export default class NodeModel extends DefaultNodeModel {
    options: NodeModelOptions
    parent: any
    features: []
	category: string
	summary: string
	editableInPorts: false
	editableOutPorts: false
	name: string
	nodeReact: 'Node'
	parameters: NodeParameter[]
	serverNodeType: string
	id: string

	constructor(options) {
		// Make id easier on humans
		const id = options.id ?? `Node_${options.name}_${options.serial}_${UID()}`
		super({
			...options,
            type: 'NodeModel',            
            id
        });

		this.id = id
		this.category = options.category;
		this.summary = options.summary
		this.editableInPorts = options.editableInPorts
		this.editableOutPorts = options.editableOutPorts
		this.name = options.name
		this.nodeReact = options.nodeReact
		this.parameters = options.parameters
		this.serverNodeType = options.serverNodeType

		if(options.inPorts) {
			options.inPorts.forEach(name => {
				this.addPort(
					new PortModel({
						in: true,
						name: name,
						parent: this,
					})
				);  
			})
		}

		if(options.outPorts) {
			options.outPorts.forEach(name => {
				this.addPort(
					new PortModel({
						in: false,
						name: name,
						parent: this,                    
					})
				);  
			})
		}

    }

	serialize() {
		return {
            ...super.serialize(),
			parameters: this.parameters,
			category: this.category,
			summary: this.summary,
			editableInPorts: this.editableInPorts,
			editableOutPorts: this.editableOutPorts,
			name: this.name,
			nodeReact: this.nodeReact,
			serverNodeType: this.serverNodeType,
		};
    }

    parameter(name) {
        return this.parameters.find((parameter) => {
            return parameter.name == name
        })
    }

    getDisplayName() {
        return this.parameter('node_name').value
    }

    getDiagramModel() {
        return this.parent.parent
    }

    getInPorts() {
        return _.pickBy(this.getPorts(), function(port, key) {
            return port.options.in
        });
    }

    getOutPorts() {
        return _.pickBy(this.getPorts(), function(port, key) {
            return !port.options.in
        });        
    }
    
    dependencies() {
        let cached = this.getDiagramModel().getCachedNodeDependencies(this.id)
        if(cached !== null) {
            return cached;
        }

        let inPorts = Object.values(this.getInPorts())
        let linkLists = inPorts.map((port: any) => port.links).flat()
        let links = linkLists.map(linkList => Object.values(linkList)).flat()

        let dependencies = links.map((link: any) => link.sourcePort.parent)

        let deepDependencies = dependencies.map(d => d.dependencies())

        let result = dependencies.concat(deepDependencies.flat())

        this.getDiagramModel().setCachedNodeDependencies(this.id, result)

        return result
    }

    dependsOn(n2) {
        return this.dependencies().map(d => d.options.id).includes(n2.options.id)
    }

    isInspectable() {
        return Boolean(this.features)
    }
}