import { NodeDescription } from "../../core/NodeDescription";
import ServerNode from "../ServerNode";
import NodeParameter from "../../core/NodeParameter";
import ServerNodeInterface from "../ServerNodeInterface";

export default class Sleep extends ServerNode implements ServerNodeInterface {
    public static category: string = 'Workflow'    
    public static summary = 'Sleep x seconds'    

    async run() {
        this.output(
            this.input()
        );

        return new Promise(resolve => {
            let wait = setTimeout(() => {
                if(typeof wait !== "undefined"){
                    clearTimeout(wait);
                }
                resolve('Node complete');
            }, parseInt(this.getParameter('seconds_to_sleep').value) * 1000)
        })        
    }

    static describe() : NodeDescription {
        let description = super.describe()

        description.parameters.push(
            NodeParameter.make('seconds_to_sleep').withFieldType("Number").withValue(5),            
        )

        return description
    }    
}