export type SerializedDiagramModel = {
	id: string,
	offsetX: number,
	offsetY: number,
	zoom: number,
	gridSize: number,
	executionOrder: string[],
	layers: any[],
	locked: boolean,
	version: string
}