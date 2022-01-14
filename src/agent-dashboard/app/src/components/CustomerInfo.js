import { __ } from '@wordpress/i18n';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const CustomerInfo = ( { user } ) => {
	const [ customer, setCustomer ] = useState( null );

	useEffect( () => {
		takeCustomer();
	}, [] );

	const takeCustomer = async () => {
		const customer = await fetchCustomer();
		setCustomer( customer );
	};

	const fetchCustomer = async () => {
		const url = `${ helpdesk_agent_dashboard.url }helpdesk/v1/settings/customer/${ user }`;

		const config = {
			headers: {
				'X-WP-Nonce': helpdesk_agent_dashboard.nonce,
				'Content-Type': 'application/json',
			},
		};

		let data;
		await axios.get( url, config ).then( ( res ) => {
			data = res.data;
		} );

		return data;
	};

	return (
		<div className="helpdesk-properties" style={ { marginTop: '18px' } }>
			<h3 style={ { marginBottom: '15px' } }>
				{ __( 'Customer', 'helpdeskwp' ) }
			</h3>
			{ customer &&
				customer.map( ( customer ) => {
					return (
						<div
							key={ customer.id }
							className="helpdesk-customer-info"
						>
							<span className="primary">
								{ __( 'Name:', 'helpdeskwp' ) }
							</span>
							<Link to={ `/customer/${ user }` }>
								<p style={ { margin: '5px 0' } }>
									{ customer.name }
								</p>
							</Link>
							<br />
							<span className="primary">
								{ __( 'Email:', 'helpdeskwp' ) }
							</span>
							<p style={ { margin: '5px 0' } }>
								{ customer.email }
							</p>
						</div>
					);
				} ) }
		</div>
	);
};

export default CustomerInfo;
