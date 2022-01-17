import { __ } from '@wordpress/i18n';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import toast from 'react-hot-toast';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const Categories = () => {
	const [ category, setCategory ] = useState( '' );
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
		takeCategories( value );
	};

	const url = `${ helpdesk_agent_dashboard.url }wp/v2/docs_category`;

	useEffect( () => {
		takeCategories();
	}, [] );

	const takeCategories = async ( page = 1 ) => {
		const category = await fetchCategories( page );
		setCategory( category[ 0 ] );
		setTotalPages( parseInt( category[ 1 ] ) );
	};

	const fetchCategories = async ( page ) => {
		let data;
		await axios.get( `${ url }?page=${ page }` ).then( ( res ) => {
			data = [ res.data, res.headers[ 'x-wp-totalpages' ] ];
		} );

		return data;
	};

	const addNewCategory = async () => {
		const data = {
			type: 'addTerm',
			taxonomy: 'docs_category',
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

		takeCategories();
		setName( '' );
	};

	const deleteCategory = async ( id ) => {
		await axios
			.delete(
				`${ helpdesk_agent_dashboard.url }helpdesk/v1/settings/${ id }`,
				{
					headers: {
						'X-WP-Nonce': helpdesk_agent_dashboard.nonce,
						'Content-Type': 'application/json',
					},
					data: {
						taxonomy: 'docs_category',
					},
				}
			)
			.then( function ( res ) {
				console.log( res.data );
			} )
			.catch( function ( err ) {
				console.log( err );
			} );

		takeCategories();
	};

	return (
		<div>
			<input
				type="text"
				placeholder={ __( 'Category', 'helpdeskwp' ) }
				value={ name }
				onChange={ ( e ) => setName( e.target.value ) }
			/>
			<Button
				variant="contained"
				className="add-new-btn"
				onClick={ addNewCategory }
			>
				{ __( 'Add', 'helpdeskwp' ) }
			</Button>
			{ category &&
				category.map( ( category ) => {
					return (
						<div key={ category.id } className="helpdesk-term">
							<p style={ { marginBottom: '20px' } }>
								{ category.name }
							</p>
							<a
								href={ `${ helpdesk_agent_dashboard.cat_edit_link }${ category.id }` }
								target="_blank"
							>
								{ __( 'Edit', 'helpdeskwp' ) }
							</a>
							<div className="helpdesk-delete-term">
								<Button
									onClick={ () =>
										deleteCategory( category.id )
									}
								>
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

export default Categories;
