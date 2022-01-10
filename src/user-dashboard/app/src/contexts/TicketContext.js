import { useState, useEffect, createContext } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';

export const TicketContext = createContext();

const TicketContextProvider = ( props ) => {
	const [ ticket, setTicket ] = useState( [] );
	const [ type, setType ] = useState( [] );
	const [ category, setCategory ] = useState( [] );
	const [ totalPages, setTotalPages ] = useState();

	useEffect( () => {
		takeTickets();
	}, [] );

	useEffect( () => {
		takeType();
	}, [] );

	useEffect( () => {
		takeCategory();
	}, [] );

	const takeTickets = async ( page = 1 ) => {
		const ticket = await fetchTickets( page );
		setTicket( ticket[ 0 ] );
		setTotalPages( parseInt( ticket[ 1 ] ) );
	};

	const fetchTickets = async ( page ) => {
		let data;
		await axios
			.get(
				`${ user_dashboard.url }wp/v2/ticket/?page=${ page }&author=${ user_dashboard.user }`
			)
			.then( ( res ) => {
				data = [ res.data, res.headers[ 'x-wp-totalpages' ] ];
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
			.get( `${ user_dashboard.url }wp/v2/ticket_type/` )
			.then( ( res ) => {
				data = res.data;
			} );

		return data;
	};

	const takeCategory = async () => {
		const category = await fetchCategory();
		setCategory( category );
	};

	const fetchCategory = async () => {
		let data;
		await axios
			.get( `${ user_dashboard.url }wp/v2/ticket_category/` )
			.then( ( res ) => {
				data = res.data;
			} );

		return data;
	};

	const createTicket = async ( data ) => {
		const config = {
			headers: {
				'X-WP-Nonce': user_dashboard.nonce,
				'Content-Type': 'multipart/form-data',
			},
		};

		await axios
			.post( `${ user_dashboard.url }helpdesk/v1/tickets`, data, config )
			.then( function () {
				toast( 'Created.', {
					duration: 2000,
					icon: '✅',
					style: {
						marginTop: 50,
					},
				} );
			} )
			.catch( function ( err ) {
				toast( "Couldn't create.", {
					duration: 2000,
					icon: '❌',
					style: {
						marginTop: 50,
					},
				} );
				console.log( err );
			} );

		takeTickets();
	};

	const deleteTicket = async ( id ) => {
		const config = {
			headers: {
				'X-WP-Nonce': user_dashboard.nonce,
				'Content-Type': 'application/json',
			},
		};

		await axios
			.delete(
				`${ user_dashboard.url }helpdesk/v1/tickets/${ id }`,
				config
			)
			.then( function ( res ) {
				console.log( res.data.id );
			} )
			.catch( function ( err ) {
				console.log( err );
			} );

		takeTickets();
	};

	const updateProperties = async ( ticket, properties ) => {
		const config = {
			headers: {
				'X-WP-Nonce': user_dashboard.nonce,
				'Content-Type': 'application/json',
			},
		};

		const data = {
			ticket: ticket,
			properties: properties,
		};

		await axios
			.put(
				`${ user_dashboard.url }helpdesk/v1/tickets`,
				JSON.stringify( data ),
				config
			)
			.then( function () {
				toast( 'Updated.', {
					duration: 2000,
					style: {
						marginTop: 50,
					},
				} );
			} )
			.catch( function ( err ) {
				toast( "Couldn't update the ticket.", {
					duration: 2000,
					icon: '❌',
					style: {
						marginTop: 50,
					},
				} );
				console.log( err );
			} );

		takeTickets();
	};

	return (
		<TicketContext.Provider
			value={ {
				createTicket,
				type,
				category,
				ticket,
				takeTickets,
				totalPages,
				updateProperties,
				deleteTicket,
			} }
		>
			{ props.children }
		</TicketContext.Provider>
	);
};

export default TicketContextProvider;
