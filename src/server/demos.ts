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
		grid_type: 'boxes',
		// Södermalm
		grid_min_x: 18.01826477050781,
		grid_min_y: 59.29674702504426,
		grid_max_x: 18.116455078125,
		grid_max_y: 59.32618430580267,

		// // Greater Stockholm area
		// grid_min_x: 17.782745361328125,
		// grid_min_y: 59.2163658770415,
		// grid_max_x: 18.30665588378906,		
		// grid_max_y: 59.41853568293486,

		// Trial and error approxiamtes something like 1000 x 1000 meters
		grid_spacing_x: 0.00437431579,
		grid_spacing_y: 0.00975251197,
	})			
	.add(HTTPRequest, {
		url: 'https://layers.enirocdn.com/{{ feature.y_min }}/{{ feature.x_min }}/{{ feature.y_max }}/{{ feature.x_max }}/17/se_realestate.json',
		features_path: 'data.se_realestate'
	})
	.add(DownloadJSON, { filename: 'realestates_sthlm.json'})
	.finish()
