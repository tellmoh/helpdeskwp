import { useState, useEffect, createContext } from 'react';
import axios from 'axios';

export const FiltersContext = createContext();

const FiltersContextProvider = ( props ) => {
	const [ filterCategory, setFilterCategory ] = useState( '' );
	const [ filterPriority, setFilterPriority ] = useState( '' );
	const [ filterStatus, setFilterStatus ] = useState( '' );
	const [ filterType, setFilterType ] = useState( '' );
	const [ filterAgent, setFilterAgent ] = useState( '' );

	const [ category, setCategory ] = useState( '' );
	const [ type, setType ] = useState( '' );
	const [ agents, setAgents ] = useState( '' );
	const [ status, setStatus ] = useState( '' );
	const [ priority, setPriority ] = useState( '' );

	const handleCategoryChange = ( category ) => {
		setFilterCategory( category );
		const local = JSON.stringify( {
			value: category.value,
			label: category.label,
		} );
		localStorage.setItem( 'Category', local );
	};

	const handlePriorityChange = ( priority ) => {
		setFilterPriority( priority );
		const local = JSON.stringify( {
			value: priority.value,
			label: priority.label,
		} );
		localStorage.setItem( 'Priority', local );
	};

	const handleStatusChange = ( status ) => {
		setFilterStatus( status );
		const local = JSON.stringify( {
			value: status.value,
			label: status.label,
		} );
		localStorage.setItem( 'Status', local );
	};

	const handleTypeChange = ( type ) => {
		setFilterType( type );
		const local = JSON.stringify( {
			value: type.value,
			label: type.label,
		} );
		localStorage.setItem( 'Type', local );
	};

	const handleAgentChange = ( agent ) => {
		setFilterAgent( agent );
		const local = JSON.stringify( {
			value: agent.value,
			label: agent.label,
		} );
		localStorage.setItem( 'Agent', local );
	};

	const localFilters = {
		category: JSON.parse( localStorage.getItem( 'Category' ) ),
		priority: JSON.parse( localStorage.getItem( 'Priority' ) ),
		status: JSON.parse( localStorage.getItem( 'Status' ) ),
		type: JSON.parse( localStorage.getItem( 'Type' ) ),
		agent: JSON.parse( localStorage.getItem( 'Agent' ) ),
	};

	const filters = {
		category: localFilters.category
			? localFilters.category.value
			: filterCategory.value,
		priority: localFilters.priority
			? localFilters.priority.value
			: filterPriority.value,
		status: localFilters.status
			? localFilters.status.value
			: filterStatus.value,
		type: localFilters.type ? localFilters.type.value : filterType.value,
		agent: localFilters.agent
			? localFilters.agent.value
			: filterAgent.value,
	};

	useEffect( () => {
		takeCategory();
	}, [] );

	useEffect( () => {
		takeType();
	}, [] );

	useEffect( () => {
		takeAgents();
	}, [] );

	useEffect( () => {
		takeStatus();
	}, [] );

	useEffect( () => {
		takePriority();
	}, [] );

	const takeCategory = async () => {
		const category = await fetchCategory();
		setCategory( category );
	};

	const fetchCategory = async () => {
		let data;
		await axios
			.get(
				`${ helpdesk_agent_dashboard.url }wp/v2/ticket_category/?per_page=50`
			)
			.then( ( res ) => {
				data = res.data;
			} );
		return data;
	};

	const takeType = async () => {
		const type = await fetchType();
		setType( type );
	};

	const fetchType = async () => {
		let data;
		await axios
			.get(
				`${ helpdesk_agent_dashboard.url }wp/v2/ticket_type/?per_page=50`
			)
			.then( ( res ) => {
				data = res.data;
			} );
		return data;
	};

	const takeStatus = async () => {
		const status = await fetchStatus();
		setStatus( status );
	};

	const fetchStatus = async () => {
		let data;
		await axios
			.get(
				`${ helpdesk_agent_dashboard.url }wp/v2/ticket_status/?per_page=50`
			)
			.then( ( res ) => {
				data = res.data;
			} );
		return data;
	};

	const takePriority = async () => {
		const priority = await fetchPriority();
		setPriority( priority );
	};

	const fetchPriority = async () => {
		let data;
		await axios
			.get(
				`${ helpdesk_agent_dashboard.url }wp/v2/ticket_priority/?per_page=50`
			)
			.then( ( res ) => {
				data = res.data;
			} );
		return data;
	};

	const takeAgents = async () => {
		const agents = await fetchAgents();
		setAgents( agents );
	};

	const fetchAgents = async () => {
		let data;
		await axios
			.get(
				`${ helpdesk_agent_dashboard.url }wp/v2/ticket_agent/?per_page=50`
			)
			.then( ( res ) => {
				data = res.data;
			} );
		return data;
	};

	const deleteTerms = async ( id, taxonomy ) => {
		await axios
			.delete(
				`${ helpdesk_agent_dashboard.url }helpdesk/v1/settings/${ id }`,
				{
					headers: {
						'X-WP-Nonce': helpdesk_agent_dashboard.nonce,
						'Content-Type': 'application/json',
					},
					data: {
						taxonomy: taxonomy,
					},
				}
			)
			.then( function ( res ) {
				console.log( res.data );
			} )
			.catch( function ( err ) {
				console.log( err );
			} );
	};

	return (
		<FiltersContext.Provider
			value={ {
				category,
				type,
				agents,
				status,
				priority,
				handleCategoryChange,
				handlePriorityChange,
				handleStatusChange,
				handleTypeChange,
				handleAgentChange,
				takeCategory,
				takeType,
				takeAgents,
				takeStatus,
				takePriority,
				deleteTerms,
				filters,
			} }
		>
			{ props.children }
		</FiltersContext.Provider>
	);
};

export default FiltersContextProvider;
