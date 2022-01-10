import { __ } from '@wordpress/i18n';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const OtherTickets = ( { user } ) => {
	const [ tickets, setTickets ] = useState( null );

	useEffect( () => {
		takeTickets();
	}, [] );

	const takeTickets = async () => {
		const tickets = await fetchTickets();
		setTickets( tickets );
	};

	const fetchTickets = async () => {
		let data;
		await axios
			.get(
				`${ helpdesk_agent_dashboard.url }wp/v2/ticket/?author=${ user }`
			)
			.then( ( res ) => {
				data = res.data;
			} );

		return data;
	};

	return (
		<div className="helpdesk-other-tickets helpdesk-properties">
			<h3>{ __( 'Other tickets', 'helpdeskwp' ) }</h3>
			{ tickets &&
				tickets.map( ( ticket ) => {
					return (
						<div
							key={ ticket.id }
							className="helpdesk-user-tickets"
						>
							<Link to={ `/ticket/${ ticket.id }` }>
								<h4 className="ticket-title primary">
									{ ticket.title.rendered }
								</h4>
							</Link>
						</div>
					);
				} ) }
		</div>
	);
};

export default OtherTickets;
