import { __ } from '@wordpress/i18n';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent( Swal );

const Customer = () => {
	const [ customer, setCustomer ] = useState( null );
	const [ tickets, setTickets ] = useState( null );
	const [ page, setPage ] = useState( 1 );
	const [ totalPages, setTotalPages ] = useState();

	let params = useParams();

	useEffect( () => {
		getCustomer();
	}, [] );

	useEffect( () => {
		takeTickets();
	}, [] );

	const theme = createTheme( {
		palette: {
			primary: {
				main: '#0051af',
			},
		},
	} );

	let config = {
		headers: {
			'X-WP-Nonce': helpdesk_agent_dashboard.nonce,
			'Content-Type': 'application/json',
		},
	};

	const fetchCustomer = async () => {
		const url = `${ helpdesk_agent_dashboard.url }helpdesk/v1/settings/customer/${ params.id }`;

		let data;
		await axios.get( url, config ).then( ( res ) => {
			data = res.data;
		} );

		return data;
	};

	const getCustomer = async () => {
		const customer = await fetchCustomer();
		setCustomer( customer );
	};

	const takeTickets = async ( page = 1 ) => {
		const tickets = await fetchTickets( page );
		setTickets( tickets[ 0 ] );
		setTotalPages( parseInt( tickets[ 1 ] ) );
	};

	const fetchTickets = async ( page ) => {
		const url = `${ helpdesk_agent_dashboard.url }wp/v2/ticket/?author=${ params.id }&page=${ page }`;

		let data;
		await axios.get( url ).then( ( res ) => {
			data = [ res.data, res.headers[ 'x-wp-totalpages' ] ];
		} );

		return data;
	};

	const handleChange = ( event, value ) => {
		setPage( value );
		takeTickets( value );
	};

	const deleteTicket = async ( id ) => {
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

	const handleDelete = ( id ) => {
		MySwal.fire( {
			title: 'Are you sure?',
			text: "You won't be able to revert this!",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Delete',
			cancelButtonText: 'Cancel',
			reverseButtons: true,
		} ).then( ( result ) => {
			if ( result.isConfirmed ) {
				deleteTicket( id );
				MySwal.fire( 'Deleted', '', 'success' );
			} else if ( result.dismiss === Swal.DismissReason.cancel ) {
				MySwal.fire( 'Cancelled', '', 'error' );
			}
		} );
	};

	return (
		<div className="helpdesk-main">
			<div className="helpdesk-tickets">
				{ tickets &&
					tickets.map( ( ticket ) => {
						return (
							<div
								key={ ticket.id }
								className="helpdesk-ticket"
								data-ticket-status={ ticket.status }
							>
								<Link to={ `/ticket/${ ticket.id }` }>
									<h4 className="ticket-title primary">
										{ ticket.title.rendered }
									</h4>
								</Link>
								<div className="ticket-meta">
									<div
										className="helpdesk-w-50"
										style={ { margin: 0 } }
									>
										<div className="helpdesk-category">
											{ __( 'In', 'helpdeskwp' ) }:{ ' ' }
											{ ticket.category }
										</div>
										<div className="helpdesk-type">
											{ __( 'Type', 'helpdeskwp' ) }:{ ' ' }
											{ ticket.type }
										</div>
									</div>
									<div
										className="helpdesk-w-50"
										style={ {
											textAlign: 'right',
											margin: 0,
										} }
									>
										<Button
											className="helpdesk-delete-ticket"
											onClick={ ( e ) =>
												handleDelete( ticket.id )
											}
										>
											<svg
												width="20"
												fill="#0051af"
												viewBox="0 0 24 24"
												aria-hidden="true"
											>
												<path d="M14.12 10.47 12 12.59l-2.13-2.12-1.41 1.41L10.59 14l-2.12 2.12 1.41 1.41L12 15.41l2.12 2.12 1.41-1.41L13.41 14l2.12-2.12zM15.5 4l-1-1h-5l-1 1H5v2h14V4zM6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9z"></path>
											</svg>
										</Button>
									</div>
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
			<div className="helpdesk-sidebar">
				<div className="helpdesk-properties">
					{ customer &&
						customer.map( ( customer ) => {
							return (
								<div
									key={ customer.id }
									className="helpdesk-customer-info"
								>
									<span className="ticket-title primary">
										{ __( 'Name:', 'helpdeskwp' ) }
									</span>
									<p style={ { margin: '5px 0' } }>
										{ customer.name }
									</p>
									<br />
									<span className="ticket-title primary">
										{ __( 'Email:', 'helpdeskwp' ) }
									</span>
									<p style={ { margin: '5px 0' } }>
										{ customer.email }
									</p>
								</div>
							);
						} ) }
				</div>
			</div>
		</div>
	);
};

export default Customer;
