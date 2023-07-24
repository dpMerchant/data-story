import {
  NodeDescription,
  ServiceProvider,
  Container,
  Diagram,
  NullStorage,
  Executor,
} from "@data-story/core";
import { ServerClient } from './ServerClient';
import { Computer } from "@data-story/core/dist/types/Computer";
import { SerializedReactFlow } from "../../../SerializedReactFlow";

export class JsClient implements ServerClient {
  constructor(
    private setAvailableNodes: (nodes: NodeDescription[]) => void,
    private updateEdgeCounts: (edgeCounts: Record<string, number>) => void,
    private setNodes: (nodes: any) => void,
    private setEdges: (edges: any) => void,
    // private setViewport: (viewport: any) => void,
    private app: Container,
  ) {}

  init() {
    this.setAvailableNodes([]) //this.app.descriptions())

    console.log("Connected to server: JS")
  }

  describe() {}

  run(diagram: Diagram) {
    console.log("Running in JS Client?")

    const storage = new NullStorage()    
  
    const executor = new Executor(
      diagram, 
      this.app.computers,
      storage
    )
    
    
    const execution = executor.execute();

    const handleUpdates = (iterator: AsyncIterator<any>) => {
      iterator.next().then(({ value: update, done }) => {
        if (!done) {
          // Do something with the update
          console.log("Got an update")
          console.log("DIAGRAM", diagram)
          this.updateEdgeCounts(update.counts)
          // Then wait for the next one
          handleUpdates(iterator);
        }
      });
    }
    
    // Not sure what this is but it works
    handleUpdates(execution[Symbol.asyncIterator]());
  }

  async open(name: string) {

  }

  async save(name: string, reactFlow: SerializedReactFlow) {

  }
}