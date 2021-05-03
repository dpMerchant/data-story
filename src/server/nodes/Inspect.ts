import ServerNode from "../ServerNode";

export default class Inspect extends ServerNode {
    public category: string = 'Workflow'
    public features: any[]
    public summary = 'Display features in a table'    
    defaultOutPorts: string[] = []	
	public name = 'Inspect'

    async run() {
        this.features = this.input();
    }
}