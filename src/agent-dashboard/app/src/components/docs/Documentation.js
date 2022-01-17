import { __ } from '@wordpress/i18n';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import toast from 'react-hot-toast';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const Documentation = () => {
	const [ docs, setDocs ] = useState( '' );
	const [ title, setTitle ] = useState( '' );
	const [ page, setPage ] = useState( 1 );
	const [ totalPages, setTotalPages ] = useState();

	let config = {
		headers: {
			'X-WP-Nonce': helpdesk_agent_dashboard.nonce,
			'Content-Type': 'application/json',
		},
	};

	const handleChange = ( event, value ) => {
		setPage( value );
		takeDocs( value );
	};

	const url = `${ helpdesk_agent_dashboard.url }wp/v2/documentation`;

	useEffect( () => {
		takeDocs();
	}, [] );

	const takeDocs = async ( page = 1 ) => {
		const docs = await fetchDocs( page );
		setDocs( docs[ 0 ] );
		setTotalPages( parseInt( docs[ 1 ] ) );
	};

	const fetchDocs = async ( page ) => {
		let data;
		await axios.get( `${ url }?page=${ page }` ).then( ( res ) => {
			data = [ res.data, res.headers[ 'x-wp-totalpages' ] ];
		} );

		return data;
	};

	const addNewDocs = async () => {
		const data = {
			title: title,
			status: 'publish',
		};

		await axios
			.post( url, JSON.stringify( data ), config )
			.then( function () {
				toast( 'Added.', {
					duration: 2000,
					style: {
						marginTop: 50,
					},
				} );
			} )
			.catch( function ( err ) {
				toast( "Couldn't save.", {
					duration: 2000,
					icon: '❌',
					style: {
						marginTop: 50,
					},
				} );
				console.log( err );
			} );

		takeDocs();
		setTitle( '' );
	};

	const deleteDocs = async ( id ) => {
		await axios
			.delete( `${ url }/${ id }`, config )
			.then( function () {
				toast( 'Deleted.', {
					duration: 2000,
					style: {
						marginTop: 50,
					},
				} );
			} )
			.catch( function ( err ) {
				toast( "Couldn't delete.", {
					duration: 2000,
					icon: '❌',
					style: {
						marginTop: 50,
					},
				} );
				console.log( err );
			} );

		takeDocs();
	};

	return (
		<div>
			<input
				type="text"
				placeholder={ __( 'Docs', 'helpdeskwp' ) }
				value={ title }
				onChange={ ( e ) => setTitle( e.target.value ) }
			/>
			<Button
				variant="contained"
				className="add-new-btn"
				onClick={ addNewDocs }
			>
				{ __( 'Add', 'helpdeskwp' ) }
			</Button>
			{ docs &&
				docs.map( ( docs ) => {
					return (
						<div key={ docs.id } className="helpdesk-term">
							<p style={ { marginBottom: '20px' } }>
								{ docs.title.rendered }
							</p>
							<a href={ docs.link } target="_blank">
								{ __( 'View', 'helpdeskwp' ) }
							</a>
							<a
								href={ `${ helpdesk_agent_dashboard.posts_edit_link }${ docs.id }&action=edit` }
								target="_blank"
							>
								{ __( 'Edit', 'helpdeskwp' ) }
							</a>
							<div className="helpdesk-delete-term">
								<Button onClick={ () => deleteDocs( docs.id ) }>
									<svg
										width="20"
										fill="#bfbdbd"
										viewBox="0 0 24 24"
									>
										<path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
									</svg>
								</Button>
							</div>
						</div>
					);
				} ) }
			<Stack spacing={ 2 }>
				<Pagination
					count={ totalPages }
					page={ page }
					color="primary"
					shape="rounded"
					onChange={ handleChange }
				/>
			</Stack>
		</div>
	);
};

export default Documentation;
