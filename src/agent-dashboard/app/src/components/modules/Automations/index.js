import { __ } from '@wordpress/i18n';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addRule } from '../../../features/settings/settingSlice';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Edit from './Edit';
import Add from './Add';
import DeleteRule from './DeleteRule';

const Automations = () => {
	const { settings } = useSelector( ( state ) => state.setting );

	const dispatch = useDispatch();

	const [ toggle, setToggle ] = useState( false );

	const openDrawer = () => {
		dispatch( addRule() );
		setToggle( true );
	};

	const closeDrawer = () => {
		setToggle( false );
	};

	return (
		<Box>
			<Box className="ticket-automations">
				<Button
					className="helpdesk-back"
					onClick={ openDrawer }
					style={ { marginLeft: '5px' } }
				>
					<span className="primary">
						{ __( 'Add Rule', 'helpdeskwp' ) }
					</span>
				</Button>
				<Drawer open={ toggle } onClose={ closeDrawer }>
					{ <Add /> }
				</Drawer>
			</Box>

			<Box>
				{ settings.rules &&
					settings.rules.map( ( rule, index ) => {
						return (
							<Box className="helpdesk-ticket">
								<h4 className="ticket-title primary">
									{ settings.rules[ index ].name }
								</h4>
								{
									<>
										<Edit index={ index } />
										<DeleteRule index={ index } />
									</>
								}
							</Box>
						);
					} ) }
			</Box>
		</Box>
	);
};

export default Automations;
