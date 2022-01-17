import { __ } from '@wordpress/i18n';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import toast from 'react-hot-toast';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const Tags = () => {
	const [ tag, setTag ] = useState( '' );
	const [ name, setName ] = useState( '' );
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
		takeTags( value );
	};

	const url = `${ helpdesk_agent_dashboard.url }wp/v2/docs_tag`;

	useEffect( () => {
		takeTags();
	}, [] );

	const takeTags = async ( page = 1 ) => {
		const tag = await fetchTags( page );
		setTag( tag[ 0 ] );
		setTotalPages( parseInt( tag[ 1 ] ) );
	};

	const fetchTags = async ( page ) => {
		let data;
		await axios.get( `${ url }?page=${ page }` ).then( ( res ) => {
			data = [ res.data, res.headers[ 'x-wp-totalpages' ] ];
		} );

		return data;
	};

	const addNewTag = async () => {
		const data = {
			type: 'addTerm',
			taxonomy: 'docs_tag',
			termName: name,
		};

		await axios
			.post(
				`${ helpdesk_agent_dashboard.url }helpdesk/v1/settings`,
				JSON.stringify( data ),
				config
			)
			.then( function () {
				toast( 'Added.', {
					duration: 2000,
					style: {
						marginTop: 50,
					},
				} );
			} )
			.catch( function ( err ) {
				toast( "Couldn't add.", {
					duration: 2000,
					icon: '❌',
					style: {
						marginTop: 50,
					},
				} );
				console.log( err );
			} );

		takeTags();
		setName( '' );
	};

	const deleteTag = async ( id ) => {
		await axios
			.delete(
				`${ helpdesk_agent_dashboard.url }helpdesk/v1/settings/${ id }`,
				{
					headers: {
						'X-WP-Nonce': helpdesk_agent_dashboard.nonce,
						'Content-Type': 'application/json',
					},
					data: {
						taxonomy: 'docs_tag',
					},
				}
			)
			.then( function ( res ) {
				console.log( res.data );
			} )
			.catch( function ( err ) {
				console.log( err );
			} );

		takeTags();
	};

	return (
		<div>
			<input
				type="text"
				placeholder={ __( 'Tag', 'helpdeskwp' ) }
				value={ name }
				onChange={ ( e ) => setName( e.target.value ) }
			/>
			<Button
				variant="contained"
				className="add-new-btn"
				onClick={ addNewTag }
			>
				{ __( 'Add', 'helpdeskwp' ) }
			</Button>
			{ tag &&
				tag.map( ( tag ) => {
					return (
						<div key={ tag.id } className="helpdesk-term">
							<p style={ { marginBottom: '20px' } }>
								{ tag.name }
							</p>
							<a
								href={ `${ helpdesk_agent_dashboard.tag_edit_link }${ tag.id }` }
								target="_blank"
							>
								{ __( 'Edit', 'helpdeskwp' ) }
							</a>
							<div className="helpdesk-delete-term">
								<Button onClick={ () => deleteTag( tag.id ) }>
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

export default Tags;
