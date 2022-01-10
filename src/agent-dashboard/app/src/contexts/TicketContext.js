import { useState, createContext } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';

export const TicketContext = createContext();

const TicketContextProvider = ( props ) => {
	const [ ticket, setTicket ] = useState( [] );
	const [ totalPages, setTotalPages ] = useState();

	const takeTickets = async ( page = 1, filters ) => {
		const ticket = await fetchTickets( page, filters );
		setTicket( ticket[ 0 ] );
		setTotalPages( parseInt( ticket[ 1 ] ) );
	};

	const fetchTickets = async ( page, filters ) => {
		var url;

		if ( filters ) {
			const category = filters.category
				? `&ticket_category=${ filters.category }`
				: '';
			const type = filters.type ? `&ticket_type=${ filters.type }` : '';
			const agent = filters.agent
				? `&ticket_agent=${ filters.agent }`
				: '';
			const priority = filters.priority
				? `&ticket_priority=${ filters.priority }`
				: '';
			const status = filters.status
				? `&ticket_status=${ filters.status }`
				: '';

			url = `${ helpdesk_agent_dashboard.url }wp/v2/ticket/?page=${ page }${ category }${ type }${ status }${ priority }${ agent }`;
		} else {
			url = `${ helpdesk_agent_dashboard.url }wp/v2/ticket/?page=${ page }`;
		}

		let data;
		await axios.get( url ).then( ( res ) => {
			data = [ res.data, res.headers[ 'x-wp-totalpages' ] ];
		} );

		return data;
	};

	const deleteTicket = async ( id ) => {
		const config = {
			headers: {
				'X-WP-Nonce': helpdesk_agent_dashboard.nonce,
				'Content-Type': 'application/json',
			},
		};

		await axios
			.delete(
				`${ helpdesk_agent_dashboard.url }wp/v2/ticket/${ id }`,
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

	const applyFilters = ( filters ) => {
		takeTickets( 1, filters );
	};

	const updateProperties = async ( ticket, properties ) => {
		const config = {
			headers: {
				'X-WP-Nonce': helpdesk_agent_dashboard.nonce,
				'Content-Type': 'application/json',
			},
		};

		const data = {
			ticket: ticket,
			properties: properties,
		};

		await axios
			.put(
				`${ helpdesk_agent_dashboard.url }helpdesk/v1/tickets`,
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
				ticket,
				totalPages,
				takeTickets,
				applyFilters,
				updateProperties,
				deleteTicket,
			} }
		>
			{ props.children }
		</TicketContext.Provider>
	);
};

export default TicketContextProvider;
