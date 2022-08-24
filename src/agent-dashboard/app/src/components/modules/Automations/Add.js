import { __ } from '@wordpress/i18n';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddAction from './AddAction';
import AddFilter from './AddFilter';
import { useSelector, useDispatch } from 'react-redux';
import {
	setFilter,
	addAction,
	addFilter,
	saveSettings,
} from '../../../features/settings/settingSlice';
import RuleName from './RuleName';
import Match from './Match';

const Add = () => {
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

	const lastIndex = settings.rules.at( -1 );

	return (
		<Box
			sx={ {
				width: 500,
				padding: '20px',
			} }
			className="add-new-rule"
		>
			<RuleName index={ settings.rules.length - 1 } />
			<Match index={ settings.rules.length - 1 } />
			{ lastIndex.filters &&
				lastIndex.filters.map( ( filter, index ) => {
					return (
						<Box>
							{
								<AddFilter
									index={ index }
									ruleIndex={ settings.rules.length - 1 }
									onChange={ onRulesChange }
								/>
							}
						</Box>
					);
				} ) }

			<Box>
				<Button
					className="helpdesk-back"
					onClick={ () =>
						dispatch( addFilter( settings.rules.length - 1 ) )
					}
				>
					<span className="primary">
						{ __( 'Add new filter', 'helpdeskwp' ) }
					</span>
				</Button>
			</Box>

			{ lastIndex.actions &&
				lastIndex.actions.map( ( action, index ) => {
					return (
						<Box>
							{
								<AddAction
									index={ index }
									ruleIndex={ settings.rules.length - 1 }
									onChange={ onRulesChange }
								/>
							}
						</Box>
					);
				} ) }

			<Box>
				<Button
					className="helpdesk-back"
					onClick={ () =>
						dispatch( addAction( settings.rules.length - 1 ) )
					}
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
	);
};

export default Add;
