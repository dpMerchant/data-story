import { NodeDescription } from "../../core/NodeDescription";
import ServerNode from "../ServerNode";
import axios from 'axios';
import Feature from "../../core/Feature";

export default class HTTPRequest extends ServerNode {
    public static category: string = 'Reader'
    public static inPorts: Array<string> = ['Input']
    public static outPorts: Array<string> = ['Data', 'Response'];
    public static summary = 'Make a HTTP request'

    async run() {
        for await (let feature of this.input()) {
            await this.request(feature).then((result) => {
                if(result) {
                    this.output([new Feature(result)], 'Response')
                }

                if(result && result.data) {
                    this.output(result.data.map(i => new Feature(i)), 'Data')
                }
            })
        }                
    }

    static describe() : NodeDescription {
        let description = super.describe()

        description.parameters.push(
            {
                name: 'url',
                fieldType: 'String_',
                value: 'https://jsonplaceholder.typicode.com/{{ feature.resource }}',
            },
            {
                fieldType: 'String_',
                name: 'verb',
                value: 'GET',
            },
            {
                name: 'data',
                fieldType: 'JSON_',
                value: '{}',
            },
            {
                name: 'config',
                fieldType: 'JSON_',
                value: JSON.stringify({}),
            },
            {
                name: 'starter',
                fieldType: 'Boolean_',
                value: true,
            },            
        )

        return description
    }

    protected request(feature: Feature) {
        if(this.getParameterValue('verb', feature) == 'GET') {
            return axios.get(
                this.getParameterValue('url', feature),
                this.getParameterValue('config')
            )
        }

        if(this.getParameterValue('verb') == 'POST') {
            return axios.post(
                this.getParameterValue('url', feature),
                this.getParameterValue('data'),
                this.getParameterValue('config')
            )   
        }

        if(this.getParameterValue('verb') == 'DELETE') {
            return axios.delete(
                this.getParameterValue('url', feature),
                JSON.parse(this.getParameterValue('config'))
            )   
        }        
    } 
}