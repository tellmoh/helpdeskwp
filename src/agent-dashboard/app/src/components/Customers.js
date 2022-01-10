import { useState, useEffect } from 'react';
import axios from 'axios';
import { Outlet, Link } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Stack from '@mui/material/Stack';

const Customers = () => {
	const [ customer, setCustomer ] = useState( null );
	const [ page, setPage ] = useState( 1 );
	const [ totalPages, setTotalPages ] = useState();

	const fetchCustomers = async ( page ) => {
		const url = `${ helpdesk_agent_dashboard.url }helpdesk/v1/settings/customers/?page=${ page }`;

		const config = {
			headers: {
				'X-WP-Nonce': helpdesk_agent_dashboard.nonce,
				'Content-Type': 'application/json',
			},
		};

		let data;
		await axios.get( url, config ).then( ( res ) => {
			data = [ res.data, res.headers[ 'hdw_totalpages' ] ];
		} );

		return data;
	};

	const getCustomers = async ( page = 1 ) => {
		const customers = await fetchCustomers( page );
		setCustomer( customers[ 0 ] );
		setTotalPages( parseInt( customers[ 1 ] ) );
	};

	useEffect( () => {
		getCustomers();
	}, [] );

	const handleChange = ( event, value ) => {
		setPage( value );
		getCustomers( value );
	};

	const theme = createTheme( {
		palette: {
			primary: {
				main: '#0051af',
			},
		},
	} );

	return (
		<div className="helpdesk-main">
			<div className="helpdesk-customers" style={ { width: '100%' } }>
				{ customer &&
					customer.map( ( customer ) => {
						return (
							<div
								key={ customer.id }
								className="helpdesk-customer"
							>
								<Link to={ `/customer/${ customer.id }` }>
									<h4
										className="primary"
										style={ {
											margin: '5px 0',
											fontSize: '16px',
										} }
									>
										{ customer.name }
									</h4>
								</Link>
								<div
									className="helpdesk-customer-email"
									style={ { marginBottom: '5px' } }
								>
									{ customer.email }
								</div>
							</div>
						);
					} ) }
				<ThemeProvider theme={ theme }>
					<Stack spacing={ 2 }>
						<Pagination
							count={ totalPages }
							page={ page }
							color="primary"
							shape="rounded"
							onChange={ handleChange }
						/>
					</Stack>
				</ThemeProvider>
			</div>
			<Outlet />
		</div>
	);
};

export default Customers;
