import { __ } from '@wordpress/i18n';
import Box from '@mui/material/Box';
import { useSelector, useDispatch } from 'react-redux';
import AddAction from './AddAction';
import AddFilter from './AddFilter';
import Button from '@mui/material/Button';
import {
	setFilter,
	addAction,
	addFilter,
	saveSettings,
} from '../../../features/settings/settingSlice';
import RuleName from './RuleName';
import Match from './Match';

const RulesList = ( { ruleIndex } ) => {
	const { settings } = useSelector( ( state ) => state.setting );

	const dispatch = useDispatch();

	const onRulesChange = ( event, index ) => {
		const target = event.target;
		const name = target.name;
		const value =
			target.type === 'checkbox' ? target.checked : target.value;

		const args = {
			name,
			value,
			index,
		};

		dispatch( setFilter( args ) );
	};

	return (
		<Box
			sx={ {
				width: 500,
				padding: '20px',
			} }
			className="add-new-rule"
		>
			<RuleName index={ ruleIndex } />
			<Match index={ ruleIndex } />
			<Box>
				{ settings.rules[ ruleIndex ].filters &&
					settings.rules[ ruleIndex ].filters.map(
						( filter, index ) => {
							return (
								<Box>
									{
										<AddFilter
											index={ index }
											ruleIndex={ ruleIndex }
											onChange={ onRulesChange }
										/>
									}
								</Box>
							);
						}
					) }

				<Box>
					<Button
						className="helpdesk-back"
						onClick={ () => dispatch( addFilter( ruleIndex ) ) }
					>
						<span className="primary">
							{ __( 'Add new filter', 'helpdeskwp' ) }
						</span>
					</Button>
				</Box>

				{ settings.rules[ ruleIndex ].actions &&
					settings.rules[ ruleIndex ].actions.map(
						( action, index ) => {
							return (
								<Box>
									{
										<AddAction
											index={ index }
											ruleIndex={ ruleIndex }
											onChange={ onRulesChange }
										/>
									}
								</Box>
							);
						}
					) }

				<Box>
					<Button
						className="helpdesk-back"
						onClick={ () => dispatch( addAction( ruleIndex ) ) }
					>
						<span className="primary">
							{ __( 'Add new action', 'helpdeskwp' ) }
						</span>
					</Button>
				</Box>

				<Box>
					<Button
						className="helpdesk-back"
						onClick={ () => dispatch( saveSettings( settings ) ) }
					>
						<span className="primary">
							{ __( 'Save', 'helpdeskwp' ) }
						</span>
					</Button>
				</Box>
			</Box>
		</Box>
	);
};

export default RulesList;
