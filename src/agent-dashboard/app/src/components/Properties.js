import { __ } from '@wordpress/i18n';
import { useState, useContext } from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { TicketContext } from '../contexts/TicketContext';
import { FiltersContext } from '../contexts/FiltersContext';
import { Category, Priority, Status, Type, Agent } from './FilterComponents';

const Properties = ( { ticket, ticketContent } ) => {
	const { updateProperties } = useContext( TicketContext );
	const { category, type, agents, status, priority } = useContext(
		FiltersContext
	);

	const [ filterCategory, setFilterCategory ] = useState( '' );
	const [ filterPriority, setFilterPriority ] = useState( '' );
	const [ filterStatus, setFilterStatus ] = useState( '' );
	const [ filterType, setFilterType ] = useState( '' );
	const [ filterAgent, setFilterAgent ] = useState( '' );

	const filters = {
		category: filterCategory.value,
		priority: filterPriority.value,
		status: filterStatus.value,
		type: filterType.value,
		agent: filterAgent.value,
	};

	const handleCategoryChange = ( category ) => {
		setFilterCategory( category );
	};

	const handlePriorityChange = ( priority ) => {
		setFilterPriority( priority );
	};

	const handleStatusChange = ( status ) => {
		setFilterStatus( status );
	};

	const handleTypeChange = ( type ) => {
		setFilterType( type );
	};

	const handleAgentChange = ( agent ) => {
		setFilterAgent( agent );
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
						parent="properties"
						value={ ticketContent }
					/>
					<Priority
						onChange={ handlePriorityChange }
						priority={ priority }
						parent="properties"
						value={ ticketContent }
					/>
					<Status
						onChange={ handleStatusChange }
						status={ status }
						parent="properties"
						value={ ticketContent }
					/>
					<Type
						onChange={ handleTypeChange }
						type={ type }
						parent="properties"
						value={ ticketContent }
					/>
					<Agent
						onChange={ handleAgentChange }
						agents={ agents }
						parent="properties"
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
