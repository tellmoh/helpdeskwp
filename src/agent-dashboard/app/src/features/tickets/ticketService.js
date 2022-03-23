import axios from 'axios';

const API_URL = `${ helpdesk_agent_dashboard.url }wp/v2/ticket/`;

const config = {
	headers: {
		'X-WP-Nonce': helpdesk_agent_dashboard.nonce,
		'Content-Type': 'application/json',
	},
};

// Get tickets
const getTickets = async ( args ) => {
	var url;

	const { page, filters } = args;

	if ( filters ) {
		const category = filters.category
			? `&ticket_category=${ filters.category }`
			: '';
		const type = filters.type ? `&ticket_type=${ filters.type }` : '';
		const agent = filters.agent ? `&ticket_agent=${ filters.agent }` : '';
		const priority = filters.priority
			? `&ticket_priority=${ filters.priority }`
			: '';
		const status = filters.status
			? `&ticket_status=${ filters.status }`
			: '';

		url = `${ API_URL }?page=${ page }${ category }${ type }${ status }${ priority }${ agent }`;
	} else {
		url = `${ API_URL }?page=${ page }`;
	}

	const response = await axios.get( url );

	const data = {
		data: response.data,
		totalPages: response.headers[ 'x-wp-totalpages' ],
	};

	return data;
};

// Delete ticket
const deleteTicket = async ( id ) => {
	const response = await axios.delete( API_URL + id, config );

	return response.data;
};

// Update ticket properties
const updateProperties = async ( args ) => {
	const { ticket, filters } = args;

	const data = {
		ticket,
		properties: filters,
	};

	await axios.put(
		`${ helpdesk_agent_dashboard.url }helpdesk/v1/tickets`,
		JSON.stringify( data ),
		config
	);
};

const ticketService = {
	getTickets,
	deleteTicket,
	updateProperties,
};

export default ticketService;
