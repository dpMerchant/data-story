import React from 'react';
import Header from './Header';
import Toolbar from './Toolbar';
import pages from './pages/factory'
import { observer } from "mobx-react"
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EngineFactory from '../../core/EngineFactory'
import store from "../store/main"
import Cookie from '../utils/Cookie';
import { DiagramModelBuilder } from '../DiagramModelBuilder'
import CreateJSON from '../../server/nodes/CreateJSON';
import HTTPRequest from '../../server/nodes/HTTPRequest';
import Flatten from '../../server/nodes/Flatten';
import DownloadJSON from '../../server/nodes/DownloadJSON';
import Map from '../../server/nodes/Map';
import Inspect from '../../server/nodes/Inspect';
import OutputProvider from '../../server/nodes/OutputProvider';
import { nonCircularJsonStringify } from '../utils/nonCircularJsonStringify'
import Evaluate from '../../server/nodes/Evaluate';

export default observer(class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            booted: false
        }
    }

    render() {
        return (
            <div >
                <Header />
                <Toolbar store={store} />
                {this.state.booted && this.renderActivePage()}
                <ToastContainer style={{paddingTop: '0px'}} />
            </div>
        );
    }

    renderActivePage()
    {
        let Page =  pages(this.props.store.metadata.page)
        return (<Page store={store} />)
    }
    
    componentDidMount() {
        this.boot()
        this.registerKeybindings()
        //this.registerExitConfirmation()
    }

    boot() {
        this.props.store.metadata.client.boot({
            story: window.location.href.split("/datastory").pop().replace('/', '')
        }).then((response) => {
            this.props.store.setEngine(
                EngineFactory.loadOrCreate(
                    response.data.serializedModel ?? null
                )
            )

			this.bootDemos()
			

            this.props.store.setAvailableNodes(
                response.data.capabilities.availableNodes
            );

            this.props.store.setStories(
                Cookie.keys()
            );


            this.setState({
                booted: true
            })
        })
        .catch(error => {
            console.log('Boot error', error)
            this.showBootFailureToast()
        });
    }

	bootDemos() {
		let b = DiagramModelBuilder.begin()
			.addNode(CreateJSON)			
			.addNode(Evaluate)
			.addNode(HTTPRequest)
			.addNode(Map)
			.addNode(Flatten)
			.addNode(DownloadJSON)
			.finish()			

		this.props.store.metadata.client.save('bb', b)

		// this.props.store.metadata.client.save(
		// 	'List todos from an API',
		// 	b		
		// )

	}

    registerKeybindings() {
        Mousetrap.bind(
            'shift+d',
            (e) => {
                this.props.store.setPage('Workbench')
            }
        );

        Mousetrap.bind(
            'shift+t',
            (e) => {
                this.props.store.setPage('Inspector')
            }
        ); 

        Mousetrap.bind(
            'shift+l',
            (e) => {
                this.props.store.setPage('Log   ')
            }
        );         
    }
    
    registerExitConfirmation() {
        window.onbeforeunload = function(e) {
            return "Do you want to exit this page?";
        };        
    }

    showBootFailureToast()
    {
        toast.info(' Could not Boot! Check console.', {
            position: "bottom-right",
            transition: Slide,
            autoClose: 3500,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
    }
})