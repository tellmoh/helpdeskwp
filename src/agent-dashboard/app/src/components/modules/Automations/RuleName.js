import { __ } from '@wordpress/i18n';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import { useSelector, useDispatch } from 'react-redux';
import { setRuleName } from '../../../features/settings/settingSlice';

const RuleName = ( { index } ) => {
	const { settings } = useSelector( ( state ) => state.setting );

	const dispatch = useDispatch();

	const onRuleNameChange = ( event ) => {
		const target = event.target;
		const value = target.value;

		const args = {
			value,
			index,
		};

		dispatch( setRuleName( args ) );
	};

	return (
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
						settings.rules[ index ].name &&
						settings.rules[ index ].name
					}
					onChange={ onRuleNameChange }
				/>
			</FormControl>
		</Box>
	);
};

export default RuleName;
