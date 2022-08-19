import { __ } from '@wordpress/i18n';
import { useContext, useState, useEffect } from 'react';
import { FiltersContext } from '../contexts/FiltersContext';
import Pagination from '@mui/material/Pagination';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import { Outlet, Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Filters from '../components/Filters';
import { useSelector, useDispatch } from 'react-redux';
import {
	getTickets,
	deleteTicket,
	bulkAction,
} from '../features/tickets/ticketSlice';
import CircularProgress from '@mui/material/CircularProgress';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';

const MySwal = withReactContent( Swal );

const TicketsList = () => {
	const { filters } = useContext( FiltersContext );
	const [ page, setPage ] = useState( 1 );
	const [ checked, setChecked ] = useState( [] );

	const { tickets, isLoading, isError, message, totalPages } = useSelector(
		( state ) => state.ticket
	);

	const handleChange = ( event, value ) => {
		const args = {
			page: value,
			filters: filters,
		};

		setPage( value );
		dispatch( getTickets( args ) );
	};

	const handleToggle = ( value ) => () => {
		const currentIndex = checked.indexOf( value );
		const newChecked = [ ...checked ];

		if ( currentIndex === -1 ) {
			newChecked.push( value );
		} else {
			newChecked.splice( currentIndex, 1 );
		}

		setChecked( newChecked );
	};

	const dispatch = useDispatch();

	useEffect( () => {
		if ( isError ) {
			console.log( message );
		}

		const args = {
			page: 1,
			filters: filters,
		};

		dispatch( getTickets( args ) );
	}, [] );

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
				dispatch( deleteTicket( id ) );
				MySwal.fire( 'Deleted', '', 'success' );
			} else if ( result.dismiss === Swal.DismissReason.cancel ) {
				MySwal.fire( 'Cancelled', '', 'error' );
			}
		} );
	};

	const deleteTickets = () => {
		const args = {
			tickets: checked,
			action: 'delete',
		};

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
				dispatch( bulkAction( args ) );
				MySwal.fire( 'Deleted', '', 'success' );
			} else if ( result.dismiss === Swal.DismissReason.cancel ) {
				MySwal.fire( 'Cancelled', '', 'error' );
			}
		} );

		setChecked( [] );
	};

	const closeTickets = () => {
		const args = {
			tickets: checked,
			action: 'close',
		};

		dispatch( bulkAction( args ) );

		setChecked( [] );
	};

	if ( isLoading ) {
		return (
			<div id="hdw-loading">
				<CircularProgress />
			</div>
		);
	}

	return (
		<ThemeProvider theme={ theme }>
			<div className="helpdesk-main">
				{ checked.length ? (
					<Box className="bulk-action-tickets">
						<Button
							variant="outlined"
							color="error"
							onClick={ () => deleteTickets() }
						>
							{ __( 'Delete', 'helpdeskwp' ) }
						</Button>
						<Button
							variant="outlined"
							color="primary"
							onClick={ () => closeTickets() }
							sx={ { marginLeft: '5px' } }
						>
							{ __( 'Close', 'helpdeskwp' ) }
						</Button>
					</Box>
				) : (
					''
				) }

				<div className="helpdesk-tickets">
					<List
						sx={ {
							padding: 0,
						} }
					>
						{ tickets &&
							tickets.map( ( ticket ) => {
								const labelId = `checkbox-list-label-${ ticket.id }`;

								return (
									<ListItem
										key={ ticket.id }
										className="tickets-list-item"
										disablePadding
									>
										<ListItemButton
											className="ticket-check"
											role={ undefined }
											onClick={ handleToggle(
												ticket.id
											) }
											dense
										>
											<ListItemIcon>
												<Checkbox
													edge="start"
													checked={
														checked.indexOf(
															ticket.id
														) !== -1
													}
													tabIndex={ -1 }
													disableRipple
													inputProps={ {
														'aria-labelledby':
															labelId,
													} }
												/>
											</ListItemIcon>
										</ListItemButton>
										<Box
											key={ ticket.id }
											className="helpdesk-ticket"
											data-ticket-status={ ticket.status }
											sx={ {
												width: '100%',
											} }
										>
											<Link
												to={ `/ticket/${ ticket.id }` }
											>
												<h4 className="ticket-title primary">
													{ ticket.title.rendered }
												</h4>
											</Link>
											<div className="ticket-meta">
												<div
													className="helpdesk-w-50"
													style={ { margin: 0 } }
												>
													<div className="helpdesk-username">
														{ __(
															'By',
															'helpdeskwp'
														) }
														: { ticket.user }
													</div>
													<div className="helpdesk-category">
														{ __(
															'In',
															'helpdeskwp'
														) }
														: { ticket.category }
													</div>
													<div className="helpdesk-type">
														{ __(
															'Type',
															'helpdeskwp'
														) }
														: { ticket.type }
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
															handleDelete(
																ticket.id
															)
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
										</Box>
									</ListItem>
								);
							} ) }
					</List>
					<Stack spacing={ 2 }>
						<Pagination
							count={ parseInt( totalPages ) }
							page={ page }
							color="primary"
							shape="rounded"
							onChange={ handleChange }
							sx={ {
								paddingLeft: '20px',
							} }
						/>
					</Stack>
				</div>
				<Filters />
				<Outlet />
			</div>
		</ThemeProvider>
	);
};

export default TicketsList;
