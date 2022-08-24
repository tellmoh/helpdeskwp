import { __ } from '@wordpress/i18n';
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux';
import { removeRule } from '../../../features/settings/settingSlice';

const DeleteRule = ( { index } ) => {
	const dispatch = useDispatch();

	const del = () => {
		dispatch( removeRule( index ) );
	};

	return (
		<Button
			className="helpdesk-back"
			onClick={ del }
			style={ { border: 'none' } }
		>
			{ __( 'Delete', 'helpdeskwp' ) }
		</Button>
	);
};

export default DeleteRule;
