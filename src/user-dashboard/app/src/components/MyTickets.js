import { __ } from '@wordpress/i18n';
import { useContext, useState } from 'react';
import Button from '@mui/material/Button';
import { TicketContext } from '../contexts/TicketContext';
import { Link } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent( Swal );

const MyTickets = () => {
	const { ticket, takeTickets, totalPages, deleteTicket } = useContext(
		TicketContext
	);

	const [ page, setPage ] = useState( 1 );

	const handleChange = ( event, value ) => {
		setPage( value );
		takeTickets( value );
	};

	const theme = createTheme( {
		palette: {
			primary: {
				main: '#0051af',
			},
		},
	} );

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
		<ThemeProvider theme={ theme }>
			<Link to="add-new-ticket">
				<Button variant="outlined" id="new-ticket">
					{ __( 'Add new ticket', 'helpdeskwp' ) }
				</Button>
			</Link>
			{ ticket &&
				ticket.map( ( ticket ) => {
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
										{ __( 'Type', 'helpdeskwp' ) }Type:{ ' ' }
										{ ticket.type }
									</div>
								</div>
								<div
									className="helpdesk-w-50"
									style={ { textAlign: 'right', margin: 0 } }
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
	);
};

export default MyTickets;
