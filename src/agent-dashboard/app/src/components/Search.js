import { useState } from 'react';
import { __ } from '@wordpress/i18n';
import Button from '@mui/material/Button';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Search = () => {
	const [ key, setKey ] = useState( '' );
	const [ result, setResult ] = useState( null );
	const [ toggle, setToggle ] = useState( false );

	const handleClick = ( event ) => {
		event.preventDefault();
		search( key );
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

	return (
		<div className="helpdesk-search">
			{ toggle && (
				<div className="helpdesk-search-toggle">
					<input
						type="text"
						value={ key }
						onChange={ ( e ) => setKey( e.target.value ) }
					/>
					<Button
						variant="contained"
						className="helpdesk-search-btn"
						onClick={ handleClick }
					>
						{ __( 'Search', 'helpdeskwp' ) }
					</Button>
					<div className="helpdesk-search-result">
						<ul>
							{ result &&
								result.map( ( result ) => {
									return (
										<li
											key={ result.id }
											className="helpdesk-search-result-item"
										>
											<Link
												to={ `/ticket/${ result.id }` }
											>
												{ result.title }
											</Link>
										</li>
									);
								} ) }
						</ul>
					</div>
				</div>
			) }
			<Button onClick={ () => setToggle( ! toggle ) }>
				<svg fill="#0051af" viewBox="0 0 24 24" width="30">
					<path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
				</svg>
			</Button>
		</div>
	);
};

export default Search;
