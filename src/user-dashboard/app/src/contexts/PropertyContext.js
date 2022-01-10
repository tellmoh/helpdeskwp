import { useState, useEffect, createContext } from 'react';
import axios from 'axios';

export const PropertyContext = createContext();

const PropertyContextProvider = ( props ) => {
	const [ filterCategory, setFilterCategory ] = useState( '' );
	const [ filterStatus, setFilterStatus ] = useState( '' );
	const [ filterType, setFilterType ] = useState( '' );

	const [ category, setCategory ] = useState( '' );
	const [ type, setType ] = useState( '' );
	const [ status, setStatus ] = useState( '' );

	const handleCategoryChange = ( category ) => {
		setFilterCategory( category );
	};

	const handleStatusChange = ( status ) => {
		setFilterStatus( status );
	};

	const handleTypeChange = ( type ) => {
		setFilterType( type );
	};

	const filters = {
		category: filterCategory.value,
		status: filterStatus.value,
		type: filterType.value,
	};

	useEffect( () => {
		takeCategory();
	}, [] );

	useEffect( () => {
		takeType();
	}, [] );

	useEffect( () => {
		takeStatus();
	}, [] );

	const takeCategory = async () => {
		const category = await fetchCategory();
		setCategory( category );
	};

	const fetchCategory = async () => {
		let data;
		await axios
			.get( `${ user_dashboard.url }wp/v2/ticket_category/?per_page=50` )
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
			.get( `${ user_dashboard.url }wp/v2/ticket_type/?per_page=50` )
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
			.get( `${ user_dashboard.url }wp/v2/ticket_status/?per_page=50` )
			.then( ( res ) => {
				data = res.data;
			} );
		return data;
	};

	return (
		<PropertyContext.Provider
			value={ {
				category,
				type,
				status,
				handleCategoryChange,
				handleStatusChange,
				handleTypeChange,
				filters,
			} }
		>
			{ props.children }
		</PropertyContext.Provider>
	);
};

export default PropertyContextProvider;
