import { DiagramModelBuilder } from "./../core/DiagramModelBuilder";
import Clone_ from "./nodes/Clone_";
import Create from "./nodes/Create";
import CreateGrid from "./nodes/CreateGrid";
import CreateJSON from "./nodes/CreateJSON";
import DownloadJSON from "./nodes/DownloadJSON";
import Evaluate from "./nodes/Evaluate";
import Flatten from "./nodes/Flatten";
import HTTPRequest from "./nodes/HTTPRequest";
import Inspect from "./nodes/Inspect";
import Map from "./nodes/Map";

export const WithParameters = DiagramModelBuilder.begin()
	.add(Create)
	.add(Clone_, {number_of_clones: 4})
	.add(Inspect)
	.finish()

export const WorkingWithJSON = DiagramModelBuilder.begin()
	.add(CreateJSON)
	.add(Clone_, {number_of_clones: 4})
	.add(HTTPRequest)
	.add(Inspect)
	.add(Inspect)
	.add(Inspect)		
	.finish()

export const CleanupOldGithubRepos = DiagramModelBuilder.begin()
	.add(HTTPRequest)
	.finish()

export const ScrapingAMapService = DiagramModelBuilder.begin()
	.add(CreateGrid, {
		grid_start_x: 1,
		grid_start_y: 1,
		grid_end_x: 5,
		grid_end_y: 5,
		grid_size_x: 123,
		grid_size_y: 123,		
		grid_spacing_x: 2,
		grid_spacing_y: 2,
	})			
	.add(Evaluate, {
		expression: 
			`feature.set('zoom', 17)
			let d_x = 0.00437431579
			let d_y = 0.00975251197
			
			feature.set('x_min', feature.get('x'))
			feature.set('y_min', feature.get('y'))
			feature.set('x_max', feature.get('x') + d_x)
			feature.set('y_max', feature.get('y') + d_y)	
		`.replace(/\t{3}/g, '')
	})
	.add(HTTPRequest, {
		url: 'https://layers.enirocdn.com/{{ feature.y_min }}/{{ feature.x_min }}/{{ feature.y_max }}/{{ feature.x_max }}/{{ feature.zoom }}/se_realestate.json',
		features_path: 'data.se_realestate'
	})
	.add(DownloadJSON)
	.finish()

	// SÖDERMALM [0], STORSTOCKHOLM [1]
	// {
	// 	"type": "FeatureCollection",
	// 	"features": [
	// 	  {
	// 		"type": "Feature",
	// 		"properties": {},
	// 		"geometry": {
	// 		  "type": "Polygon",
	// 		  "coordinates": [
	// 			[
	// 			  [
	// 				18.01826477050781,
	// 				59.29674702504426
	// 			  ],
	// 			  [
	// 				18.116455078125,
	// 				59.29674702504426
	// 			  ],
	// 			  [
	// 				18.116455078125,
	// 				59.32618430580267
	// 			  ],
	// 			  [
	// 				18.01826477050781,
	// 				59.32618430580267
	// 			  ],
	// 			  [
	// 				18.01826477050781,
	// 				59.29674702504426
	// 			  ]
	// 			]
	// 		  ]
	// 		}
	// 	  },
    // {
	// 	"type": "Feature",
	// 	"properties": {},
	// 	"geometry": {
	// 	  "type": "Polygon",
	// 	  "coordinates": [
	// 		[
	// 		  [
	// 			17.782745361328125,
	// 			59.2163658770415
	// 		  ],
	// 		  [
	// 			18.30665588378906,
	// 			59.2163658770415
	// 		  ],
	// 		  [
	// 			18.30665588378906,
	// 			59.41853568293486
	// 		  ],
	// 		  [
	// 			17.782745361328125,
	// 			59.41853568293486
	// 		  ],
	// 		  [
	// 			17.782745361328125,
	// 			59.2163658770415
	// 		  ]
	// 		]
	// 	  ]
	// 	}
	//   }	
	// 	]
	//   }

