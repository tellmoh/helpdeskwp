import { useState } from 'react';
import Modal from '@mui/material/Modal';

const Image = ( { src, width } ) => {
	const [ open, setOpen ] = useState( false );
	const handleOpen = () => setOpen( true );
	const handleClose = () => setOpen( false );

	return (
		<div className="helpdesk-image">
			<img src={ src } width={ width } onClick={ handleOpen } />
			<Modal
				open={ open }
				onClose={ handleClose }
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<div className="helpdesk-image-modal">
					<img src={ src } />
				</div>
			</Modal>
		</div>
	);
};

export default Image;
