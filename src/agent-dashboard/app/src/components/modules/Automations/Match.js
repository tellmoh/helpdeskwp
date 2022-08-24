import { __ } from '@wordpress/i18n';
import Box from '@mui/material/Box';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { useSelector, useDispatch } from 'react-redux';
import { setMatch } from '../../../features/settings/settingSlice';

const Match = ( { index } ) => {
	const { settings } = useSelector( ( state ) => state.setting );

	const dispatch = useDispatch();

	const onRuleMatchChange = ( event ) => {
		const target = event.target;
		const value = target.value;

		const args = {
			value,
			index,
		};

		dispatch( setMatch( args ) );
	};

	return (
		<Box>
			<FormControl>
				<RadioGroup
					row
					aria-labelledby="match-label"
					name="match"
					value={
						settings.rules[ index ].match &&
						settings.rules[ index ].match
					}
					onChange={ onRuleMatchChange }
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
	);
};

export default Match;
