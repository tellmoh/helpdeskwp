import { useState, useEffect } from 'react';
import { __ } from '@wordpress/i18n';
import axios from 'axios';
import { Outlet, Link } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

const Customers = () => {
	const [ customer, setCustomer ] = useState( null );
	const [ page, setPage ] = useState( 1 );
	const [ totalPages, setTotalPages ] = useState();
	const [ key, setKey ] = useState( '' );
	const [ result, setResult ] = useState( null );

	let config = {
		headers: {
			'X-WP-Nonce': helpdesk_agent_dashboard.nonce,
			'Content-Type': 'application/json',
		},
	};

	const fetchCustomers = async ( page ) => {
		const url = `${ helpdesk_agent_dashboard.url }helpdesk/v1/settings/customers/?page=${ page }`;

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

	const handleSearch = ( event ) => {
		event.preventDefault();
		search( key );
	};

	const search = async ( key ) => {
		const url = `${ helpdesk_agent_dashboard.url }wp/v2/users?search=${ key }&roles=contributor&per_page=99`;

		await axios
			.get( url, config )
			.then( function ( res ) {
				setResult( res.data );
			} )
			.catch( function ( err ) {
				console.log( err );
			} );
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
				<div className="helpdesk-customers-search">
					<form onSubmit={ handleSearch }>
						<input
							type="text"
							value={ key }
							onChange={ ( e ) => setKey( e.target.value ) }
							style={ {
								width: '89%',
								marginRight: '5px',
							} }
						/>
						<Button
							type="submit"
							variant="contained"
							className="helpdesk-search-btn"
							style={ {
								padding: '11px 16px',
								marginTop: '-3px',
								marginLeft: '5px',
							} }
						>
							{ __( 'Search', 'helpdeskwp' ) }
						</Button>
					</form>
				</div>
				<div className="helpdesk-search-result">
					<ul>
						{ result &&
							result.map( ( result ) => {
								return (
									<li
										key={ result.id }
										className="helpdesk-search-result-item helpdesk-customer"
									>
										<Link to={ `/customer/${ result.id }` }>
											<h4
												className="primary"
												style={ {
													margin: '5px 0',
													fontSize: '16px',
												} }
											>
												{ result.name }
											</h4>
										</Link>
									</li>
								);
							} ) }
					</ul>
				</div>
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
