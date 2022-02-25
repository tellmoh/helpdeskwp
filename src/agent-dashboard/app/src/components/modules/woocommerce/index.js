import { __ } from '@wordpress/i18n';
import { useState, useEffect } from 'react';
import axios from 'axios';

const WooCommerce = ( { user } ) => {
	const [ purchase, setPurchase ] = useState( null );

	useEffect( () => {
		takePurchase();
	}, [] );

	const takePurchase = async () => {
		const purchase = await fetchPurchase();
		setPurchase( purchase );
	};

	const fetchPurchase = async () => {
		const url = `${ helpdesk_agent_dashboard.url }hdwp/v1/modules/woo-purchase/${ user }`;

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
		purchase && (
			<div
				className="helpdesk-properties"
				style={ { marginTop: '18px' } }
			>
				<h3 style={ { marginBottom: '15px' } }>
					{ __( 'WooCommerce Products', 'helpdeskwp' ) }
				</h3>
				{ ! purchase.length == 0 ? (
					purchase.map((purchase, index) => {
                        return (
                            <p key={ index }>{ purchase }</p>
                        )
                    })
				) : (
					<span>{ __( 'No Products', 'helpdeskwp' ) }</span>
				) }
			</div>
		)
	);
};

export default WooCommerce;
