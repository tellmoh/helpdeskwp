import { __ } from '@wordpress/i18n';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';

const Merge = ( { takeReplies } ) => {
	const [ result, setResult ] = useState( null );
	const [ checked, setChecked ] = useState( [] );
	const [ toggle, setToggle ] = useState( {
		left: false,
	} );

	let params = useParams();

	const handleToggle = ( value ) => () => {
		const currentIndex = checked.indexOf( value );
		const newChecked = [ ...checked ];

		if ( currentIndex === -1 ) {
			newChecked.push( value );
		} else {
			newChecked.splice( currentIndex, 1 );
		}

		setChecked( newChecked );
	};

	const toggleDrawer = ( open ) => () => {
		setToggle( { ...toggle, [ 'left' ]: open } );
	};

	const search = async ( key ) => {
		const url = `${ helpdesk_agent_dashboard.url }wp/v2/search?search=${ key }&subtype=ticket&per_page=99`;

		await axios
			.get( url )
			.then( function ( res ) {
				setResult( res.data );
			} )
			.catch( function ( err ) {
				console.log( err );
			} );
	};

	const mergeTickets = async () => {
		const url = `${ helpdesk_agent_dashboard.url }hdwp/v1/modules/merge`;

		const config = {
			headers: {
				'X-WP-Nonce': helpdesk_agent_dashboard.nonce,
				'Content-Type': 'application/json',
			},
		};

		const data = {
			tickets: checked,
			parent: params.id,
		};

		const response = await axios.post(
			url,
			JSON.stringify( data ),
			config
		);

		if ( response ) {
			takeReplies();
		}
	};

	const list = () => (
		<Box
			sx={ {
				width: 400,
				padding: '20px',
			} }
			className="merge-box"
		>
			<input
				type="text"
				placeholder={ __( 'Search ticket title', 'helpdeskwp' ) }
				onChange={ ( e ) => search( e.target.value ) }
			/>

			<List
				sx={ {
					width: '100%',
					maxWidth: 360,
				} }
			>
				{ result &&
					result.map( ( result ) => {
						const labelId = `checkbox-list-label-${ result.id }`;

						return (
							<ListItem key={ result.id } disablePadding>
								<ListItemButton
									role={ undefined }
									onClick={ handleToggle( result.id ) }
									dense
								>
									<ListItemIcon>
										<Checkbox
											edge="start"
											checked={
												checked.indexOf( result.id ) !==
												-1
											}
											tabIndex={ -1 }
											disableRipple
											inputProps={ {
												'aria-labelledby': labelId,
											} }
										/>
									</ListItemIcon>
									<ListItemText
										id={ labelId }
										primary={ result.title }
									/>
								</ListItemButton>
							</ListItem>
						);
					} ) }
			</List>
			{ result && (
				<Button
					onClick={ () => mergeTickets() }
					className="helpdesk-back"
					style={ { float: 'right' } }
				>
					<span style={ { color: '#0051af' } }>
						{ __( 'Merge into this ticket', 'helpdeskwp' ) }
					</span>
				</Button>
			) }
		</Box>
	);

	return (
		<div className="merge-drawer">
			<Button
				className="helpdesk-back"
				onClick={ toggleDrawer( true ) }
				style={ { marginLeft: '5px' } }
			>
				<span className="primary">{ __( 'Merge', 'helpdeskwp' ) }</span>
			</Button>
			<Drawer
				anchor={ 'left' }
				open={ toggle[ 'left' ] }
				onClose={ toggleDrawer( false ) }
			>
				{ list() }
			</Drawer>
		</div>
	);
};

export default Merge;
