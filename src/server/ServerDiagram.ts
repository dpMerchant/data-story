import { SerializedDiagramModel } from "../core/types/SerializedDiagramModel"

export default class ServerDiagram {
    links: any[] = []
    nodes: any[] = []
    cachedNodeDependencyMap: {[T:string]: string[];} = {
        // id1: [d1, d2, ...]
    }	
 
    static hydrate(data: SerializedDiagramModel, factory) {
        let instance = new this()
		
        for (const [key, value] of Object.entries(data)) {
            
            if(key === 'layers') {
				instance.links = Object.values(data.layers[0].models)

                instance.nodes = Object.values(data.layers[1].models).map(node => {
                    return factory.hydrate(node, instance)
                })				
                
                continue
            }
            
            instance[key] = value
        }

        return instance
    }

    async run() {
        for await (let node of this.executionOrder()) {
            await node.run()
        }
        
        return new Promise((callback) => {
            return callback({
                data: {
                    diagram: this
                } 
            })
        })
    }

    find(id: string) {
        let searchables = this.nodes
            .concat(this.nodes.map(node => node.ports).flat())
            .concat(this.links)

        return searchables.find(entity => entity.id == id)
    }

	findByName(name: string) {
        let searchables = this.nodes
            .concat(this.nodes.map(node => node.ports).flat())
            .concat(this.links)

        return searchables.find(entity => entity.name == name)		
	}

    addNode(node) {
        this.nodes.push(node)

        return this
    }

    executionOrder() {
        this.clearCachedNodeDependencies();

        let r = this.nodes.sort(function(n1, n2) {

            if (n2.dependsOn(n1)) {
                return -1;
            }

            if (n1.dependsOn(n2)) {
              return 1;
            }

            return 0;
          });

		  return r
    }

    getCachedNodeDependencies(id) {
        return this.cachedNodeDependencyMap[id] ?? null
    }

    setCachedNodeDependencies(id, dependencies) {
        this.cachedNodeDependencyMap[id] = dependencies
    }

    clearCachedNodeDependencies() {
        this.cachedNodeDependencyMap = {}
    }	
}