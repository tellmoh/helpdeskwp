import { __ } from '@wordpress/i18n';
import { useState } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';

const Responses = () => {
	const [ result, setResult ] = useState( null );
	const [ toggle, setToggle ] = useState( false );

	const search = async ( key ) => {
		const url = `${ helpdesk_agent_dashboard.url }wp/v2/search?search=${ key }&subtype=response&per_page=99`;

		await axios
			.get( url )
			.then( function ( res ) {
				setResult( res.data );
			} )
			.catch( function ( err ) {
				console.log( err );
			} );
	};

	const insertContent = async ( id ) => {
		const content = document.querySelector( '.helpdesk-editor .ProseMirror' );
		const url     = `${ helpdesk_agent_dashboard.url }wp/v2/response/${ id }`;

		await axios
			.get( url )
			.then( function ( res ) {
				if ( res.data.content.rendered ) {
					content.innerHTML += res.data.content.rendered;
				}
			} )
			.catch( function ( err ) {
				console.log( err );
			} );
			setToggle( false );
	}

    return (
		<div id="canned-responses">
			<Button onClick={ () => setToggle( ! toggle ) }>
				<svg fill="#0051af" viewBox="0 0 24 24" width="30">
					<path d="M22 4c0-1.1-.9-2-2-2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h9v-8h7V4z"></path>
					<path d="M22.5 16h-2.2l1.7-4h-5v6h2v5z"></path>
				</svg>
			</Button>
			{ toggle && (
				<div id="helpdesk-responses">
					<input
						type="text"
						placeholder={ __( 'Search', 'helpdeskwp' ) }
						onChange={ ( e ) => search( e.target.value ) }
					/>
					<div className="helpdesk-search-result">
						<ul>
							{ result &&
								result.map( ( result ) => {
									return (
										<li
											key={ result.id }
											className="helpdesk-search-result-item"
										>
											<Button onClick={() => insertContent( result.id )}>
												{ result.title }
											</Button>
										</li>
									);
								} ) }
						</ul>
					</div>
				</div>
			) }
		</div>
    )
}

export default Responses;
