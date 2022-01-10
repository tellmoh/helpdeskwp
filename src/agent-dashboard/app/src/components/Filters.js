import { __ } from '@wordpress/i18n';
import { useContext, useEffect } from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { TicketContext } from '../contexts/TicketContext';
import { FiltersContext } from '../contexts/FiltersContext';
import { Category, Priority, Status, Type, Agent } from './FilterComponents';

const Filters = () => {
	const { applyFilters, takeTickets } = useContext( TicketContext );
	const {
		category,
		type,
		agents,
		status,
		priority,
		handleCategoryChange,
		handlePriorityChange,
		handleStatusChange,
		handleTypeChange,
		handleAgentChange,
		filters,
	} = useContext( FiltersContext );

	const apply = () => {
		applyFilters( filters );
	};

	useEffect( () => {
		takeTickets( 1, filters );
	}, [] );

	return (
		<div className="helpdesk-sidebar">
			<div className="helpdesk-properties">
				<h3>{ __( 'Filters', 'helpdeskwp' ) }</h3>
				<Category
					onChange={ handleCategoryChange }
					category={ category }
					parent="filter"
				/>
				<Priority
					onChange={ handlePriorityChange }
					priority={ priority }
					parent="filter"
				/>
				<Status
					onChange={ handleStatusChange }
					status={ status }
					parent="filter"
				/>
				<Type
					onChange={ handleTypeChange }
					type={ type }
					parent="filter"
				/>
				<Agent
					onChange={ handleAgentChange }
					agents={ agents }
					parent="filter"
				/>

				<Stack direction="column">
					<Button variant="contained" onClick={ apply }>
						{ __( 'Apply', 'helpdeskwp' ) }
					</Button>
				</Stack>
			</div>
		</div>
	);
};

export default Filters;
