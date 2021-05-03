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
	.add(Clone_)
	.add(HTTPRequest)
	.add(Inspect)
	.add(Inspect)
	.add(Inspect)		
	.finish()

export const CleanupOldGithubRepos = DiagramModelBuilder.begin()
	.add(HTTPRequest)
	.finish()

export const ScrapingAMapService = DiagramModelBuilder.begin()
	.add(CreateGrid)			
	.add(Evaluate)
	.add(HTTPRequest)
	.add(Map)
	.add(Flatten)
	.add(DownloadJSON)
	.add(Inspect)
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

