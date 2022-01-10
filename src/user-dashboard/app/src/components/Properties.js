import { __ } from '@wordpress/i18n';
import { useState, useContext } from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { TicketContext } from '../contexts/TicketContext';
import { PropertyContext } from '../contexts/PropertyContext';
import { Category, Status, Type } from './PropertyComponents';

const Properties = ( { ticket, ticketContent } ) => {
	const { updateProperties } = useContext( TicketContext );
	const { category, type, status } = useContext( PropertyContext );

	const [ filterCategory, setFilterCategory ] = useState( '' );
	const [ filterStatus, setFilterStatus ] = useState( '' );
	const [ filterType, setFilterType ] = useState( '' );

	const filters = {
		category: filterCategory.value,
		status: filterStatus.value,
		type: filterType.value,
	};

	const handleCategoryChange = ( category ) => {
		setFilterCategory( category );
	};

	const handleStatusChange = ( status ) => {
		setFilterStatus( status );
	};

	const handleTypeChange = ( type ) => {
		setFilterType( type );
	};

	const updateTicket = () => {
		updateProperties( ticket, filters );
	};

	return (
		<>
			{ ticketContent && (
				<div className="helpdesk-properties">
					<h3>{ __( 'Properties', 'helpdeskwp' ) }</h3>
					<Category
						onChange={ handleCategoryChange }
						category={ category }
						value={ ticketContent }
					/>
					<Status
						onChange={ handleStatusChange }
						status={ status }
						value={ ticketContent }
					/>
					<Type
						onChange={ handleTypeChange }
						type={ type }
						value={ ticketContent }
					/>

					<Stack direction="column">
						<Button variant="contained" onClick={ updateTicket }>
							{ __( 'Update', 'helpdeskwp' ) }
						</Button>
					</Stack>
				</div>
			) }
		</>
	);
};

export default Properties;
