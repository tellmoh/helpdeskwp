import { __ } from '@wordpress/i18n';
import { useState } from 'react';
import RulesList from './RulesList';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const Edit = ( { index } ) => {
	const [ toggle, setToggle ] = useState( false );

	const openDrawer = () => {
		setToggle( true );
	};

	const closeDrawer = () => {
		setToggle( false );
	};

	return (
		<Box className="ticket-automations">
			<Button
				className="helpdesk-back"
				onClick={ openDrawer }
				style={ { border: 'none' } }
			>
				{ __( 'Edit', 'helpdeskwp' ) }
			</Button>
			<Drawer open={ toggle } onClose={ closeDrawer }>
				{ <RulesList ruleIndex={ index } /> }
			</Drawer>
		</Box>
	);
};

export default Edit;
