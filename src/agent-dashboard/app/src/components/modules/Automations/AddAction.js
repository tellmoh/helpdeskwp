import { __ } from '@wordpress/i18n';
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { useSelector, useDispatch } from 'react-redux';
import { useContext } from 'react';
import { FiltersContext } from '../../../contexts/FiltersContext';
import { setAction } from '../../../features/settings/settingSlice';

const AddAction = ( { index, ruleIndex } ) => {
	const { settings } = useSelector( ( state ) => state.setting );

	const { category, type, agents, status, priority } =
		useContext( FiltersContext );

	let cat = [];
	category &&
		category.map( ( category ) => {
			cat.push( category.name );
		} );

	let pri = [];
	priority &&
		priority.map( ( priority ) => {
			pri.push( priority.name );
		} );

	let sta = [];
	status &&
		status.map( ( status ) => {
			sta.push( status.name );
		} );

	let typ = [];
	type &&
		type.map( ( type ) => {
			typ.push( type.name );
		} );

	let agent = [];
	agents &&
		agents.map( ( agents ) => {
			agent.push( agents.name );
		} );

	const dispatch = useDispatch();

	const selectedAction =
		settings.rules[ ruleIndex ].actions[ index ].action &&
		settings.rules[ ruleIndex ].actions[ index ].action;

	let selectItem = [];
	if ( selectedAction === 'priority' ) {
		selectItem = pri;
	} else if ( selectedAction === 'category' ) {
		selectItem = cat;
	} else if ( selectedAction === 'status' ) {
		selectItem = sta;
	} else if ( selectedAction === 'type' ) {
		selectItem = typ;
	} else if ( selectedAction === 'agent' ) {
		selectItem = agent;
	}

	const onActionChange = ( event, index, ruleIndex ) => {
		const target = event.target;
		const name = target.name;
		const value =
			target.type === 'checkbox' ? target.checked : target.value;

		const args = {
			name,
			value,
			index,
			ruleIndex,
		};

		dispatch( setAction( args ) );
	};

	return (
		<Box className="ticket-automations-action">
			<FormControl fullWidth>
				<InputLabel id="actions-select-label">
					{ __( 'Actions', 'helpdeskwp' ) }
				</InputLabel>
				<Select
					labelId="actions-select-label"
					id="actions-select"
					value={
						settings.rules[ ruleIndex ].actions[ index ].action &&
						settings.rules[ ruleIndex ].actions[ index ].action
					}
					label="Actions"
					onChange={ ( e ) => onActionChange( e, index, ruleIndex ) }
					name="action"
				>
					<MenuItem value={ 'category' }>
						{ __( 'Set category as', 'helpdeskwp' ) }
					</MenuItem>
					<MenuItem value={ 'priority' }>
						{ __( 'Set priority as', 'helpdeskwp' ) }
					</MenuItem>
					<MenuItem value={ 'status' }>
						{ __( 'Set status as', 'helpdeskwp' ) }
					</MenuItem>
					<MenuItem value={ 'type' }>
						{ __( 'Set type as', 'helpdeskwp' ) }
					</MenuItem>
					<MenuItem value={ 'agent' }>
						{ __( 'Set agent as', 'helpdeskwp' ) }
					</MenuItem>
					<MenuItem value={ 'deleteTicket' }>
						{ __( 'Delete the ticket', 'helpdeskwp' ) }
					</MenuItem>
				</Select>
			</FormControl>
			{ selectedAction == 'deleteTicket' ? (
				''
			) : (
				<FormControl fullWidth>
					<InputLabel id="value-select-label">
						{ __( 'Value', 'helpdeskwp' ) }
					</InputLabel>
					<Select
						labelId="value-select-label"
						id="value-select"
						value={
							settings.rules[ ruleIndex ].actions[ index ]
								.actionValue &&
							settings.rules[ ruleIndex ].actions[ index ]
								.actionValue
						}
						label="Value"
						onChange={ ( e ) =>
							onActionChange( e, index, ruleIndex )
						}
						name="actionValue"
					>
						{ selectItem.map( ( item ) => {
							return <MenuItem value={ item }>{ item }</MenuItem>;
						} ) }
					</Select>
				</FormControl>
			) }
		</Box>
	);
};

export default AddAction;
