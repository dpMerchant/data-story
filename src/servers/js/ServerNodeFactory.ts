import Create from './nodes/Create'
import Inspect from './nodes/Inspect'

export default class ServerNodeFactory {
    protected static nodes = {
        Create,
        Inspect,
    }

    static find(type: string) {
        return this.nodes[type]
    }

    static all() {
        return Object.values(this.nodes)
    }

    static hydrate(node, diagram) {
        return this.find(node.options.serverNodeType).hydrate(node, diagram)
    }
}