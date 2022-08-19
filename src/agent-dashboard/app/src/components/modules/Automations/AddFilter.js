import { __ } from '@wordpress/i18n';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Divider from '@mui/material/Divider';
import { useSelector, useDispatch } from 'react-redux';
import { useContext } from 'react';
import { setFilter } from '../../../features/settings/settingSlice';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { FiltersContext } from '../../../contexts/FiltersContext';

const AddFilter = ( { index, ruleIndex } ) => {
	const { settings } = useSelector( ( state ) => state.setting );

	const { category, type, agents, status, priority } =
		useContext( FiltersContext );

	const dispatch = useDispatch();

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

	let selectFilters = [ 'agent', 'type', 'status', 'priority', 'category' ];
	let selectNormalFilters = [ 'requesterEmail', 'toEmail', 'subject' ];

	const selectedFilter =
		settings.rules[ ruleIndex ].filters[ index ].filter &&
		settings.rules[ ruleIndex ].filters[ index ].filter;

	let selectItem;
	if ( selectedFilter === 'priority' ) {
		selectItem = pri;
	} else if ( selectedFilter === 'category' ) {
		selectItem = cat;
	} else if ( selectedFilter === 'status' ) {
		selectItem = sta;
	} else if ( selectedFilter === 'type' ) {
		selectItem = typ;
	} else if ( selectedFilter === 'agent' ) {
		selectItem = agent;
	}

	const onFilterChange = ( event, index, ruleIndex ) => {
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

		dispatch( setFilter( args ) );
	};

	return (
		<Box>
			<Box sx={ { marginBottom: '30px' } }>
				<Typography variant="caption" gutterBottom component="div">
					{ __( 'Name', 'helpdeskwp' ) }
				</Typography>
				<FormControl fullWidth>
					<input
						placeholder={ __( 'Rule name', 'helpdeskwp' ) }
						type="text"
						name="name"
						value={
							settings.rules[ ruleIndex ].filters[ index ].name &&
							settings.rules[ ruleIndex ].filters[ index ].name
						}
						onChange={ ( e ) =>
							onFilterChange( e, index, ruleIndex )
						}
					/>
				</FormControl>
			</Box>

			<Box>
				<Typography variant="caption" gutterBottom component="div">
					{ __( 'Rule', 'helpdeskwp' ) }
				</Typography>
				<FormControl>
					<RadioGroup
						row
						aria-labelledby="match-label"
						name="match"
						value={
							settings.rules[ ruleIndex ].filters[ index ]
								.match &&
							settings.rules[ ruleIndex ].filters[ index ].match
						}
						onChange={ ( e ) =>
							onFilterChange( e, index, ruleIndex )
						}
					>
						<FormControlLabel
							value="any"
							control={ <Radio /> }
							label={ __( 'Match Any', 'helpdeskwp' ) }
						/>
						<FormControlLabel
							value="all"
							control={ <Radio /> }
							label={ __( 'Match All', 'helpdeskwp' ) }
						/>
					</RadioGroup>
				</FormControl>
			</Box>

			<Box>
				<Box sx={ { marginBottom: '30px', marginTop: '30px' } }>
					<FormControl fullWidth>
						<InputLabel id="filters-select-label">
							{ __( 'Filters', 'helpdeskwp' ) }
						</InputLabel>
						<Select
							labelId="filters-select-label"
							id="filters-select"
							value={
								settings.rules[ ruleIndex ].filters[ index ]
									.filter &&
								settings.rules[ ruleIndex ].filters[ index ]
									.filter
							}
							label="Filters"
							onChange={ ( e ) =>
								onFilterChange( e, index, ruleIndex )
							}
							name="filter"
						>
							<MenuItem value={ 'requesterEmail' }>
								{ __( 'Requester email', 'helpdeskwp' ) }
							</MenuItem>
							<MenuItem value={ 'toEmail' }>
								{ __( 'To email', 'helpdeskwp' ) }
							</MenuItem>
							<MenuItem value={ 'subject' }>
								{ __( 'Subject', 'helpdeskwp' ) }
							</MenuItem>
							<MenuItem value={ 'category' }>
								{ __( 'Category', 'helpdeskwp' ) }
							</MenuItem>
							<MenuItem value={ 'priority' }>
								{ __( 'Priority', 'helpdeskwp' ) }
							</MenuItem>
							<MenuItem value={ 'status' }>
								{ __( 'Status', 'helpdeskwp' ) }
							</MenuItem>
							<MenuItem value={ 'type' }>
								{ __( 'Type', 'helpdeskwp' ) }
							</MenuItem>
							<MenuItem value={ 'agent' }>
								{ __( 'Agent', 'helpdeskwp' ) }
							</MenuItem>
						</Select>
					</FormControl>

					<FormControl fullWidth>
						<InputLabel id="operations-select-label">
							{ __( 'Operations', 'helpdeskwp' ) }
						</InputLabel>
						<Select
							labelId="operations-select-label"
							id="operations-select"
							value={
								settings.rules[ ruleIndex ].filters[ index ]
									.operation &&
								settings.rules[ ruleIndex ].filters[ index ]
									.operation
							}
							label="Operations"
							onChange={ ( e ) =>
								onFilterChange( e, index, ruleIndex )
							}
							name="operation"
						>
							<MenuItem value={ 'is' }>
								{ __( 'Is', 'helpdeskwp' ) }
							</MenuItem>
							<MenuItem value={ 'isNot' }>
								{ __( 'Is not', 'helpdeskwp' ) }
							</MenuItem>
							{ selectNormalFilters.includes(
								selectedFilter
							) && (
								<MenuItem value={ 'contains' }>
									{ __( 'Contains', 'helpdeskwp' ) }
								</MenuItem>
							) }
						</Select>
					</FormControl>

					<Box>
						{ selectFilters.includes( selectedFilter ) ? (
							<FormControl fullWidth>
								<InputLabel id="value-select-label">
									{ __( 'Value', 'helpdeskwp' ) }
								</InputLabel>
								<Select
									labelId="value-select-label"
									id="value-select"
									value={
										settings.rules[ ruleIndex ].filters[
											index
										].value &&
										settings.rules[ ruleIndex ].filters[
											index
										].value
									}
									label="Value"
									onChange={ ( e ) =>
										onFilterChange( e, index, ruleIndex )
									}
									name="value"
								>
									{ selectItem.map( ( item ) => {
										return (
											<MenuItem value={ item }>
												{ item }
											</MenuItem>
										);
									} ) }
								</Select>
							</FormControl>
						) : (
							<FormControl fullWidth>
								<input
									placeholder={ __( 'Value', 'helpdeskwp' ) }
									type="text"
									name="normal_value"
									value={
										settings.rules[ ruleIndex ].filters[
											index
										].normal_value &&
										settings.rules[ ruleIndex ].filters[
											index
										].normal_value
									}
									onChange={ ( e ) =>
										onFilterChange( e, index, ruleIndex )
									}
								/>
							</FormControl>
						) }
					</Box>
				</Box>
			</Box>

			<Divider sx={ { marginBottom: '20px' } } />
		</Box>
	);
};

export default AddFilter;
