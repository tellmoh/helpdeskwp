import { __ } from '@wordpress/i18n';
import { useState } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import toast from 'react-hot-toast';
import TextEditor from '../../../../user-dashboard/app/src/components/editor/Editor';

const EditReply = ( { id, takeReplies } ) => {
    const [ content, setContent ] = useState( '' );
    const [ toggle, setToggle ] = useState( false );

    let config = {
        headers: {
            'X-WP-Nonce': helpdesk_agent_dashboard.nonce,
        },
    };

    const getReply = async ( id ) => {
		const url = `${ helpdesk_agent_dashboard.url }helpdesk/v1/replies/edit/${ id }`;

        setToggle( true );

		await axios
			.get( url, config )
			.then( function ( res ) {
				setContent( res.data )
			} )
			.catch( function ( err ) {
				console.log( err );
			} );

        insertContent(id)
	}

    const handleContentChange = ( content ) => {
		setContent( content );
	};

    const insertContent = ( id ) => {
        const idSelector = `${'.helpdesk-ticket-replies [data-id='}'${id}'${']'}`;
        const content = document.querySelector( `${idSelector} ${'.ticket-reply-body div'}` );
        const editor  = document.querySelector( `${idSelector} ${'.ProseMirror'}` );

        editor.innerHTML = content.innerHTML;
    }

    const submitReply = ( event ) => {
        event.preventDefault();

		let formData = new FormData();
		formData.append( 'reply', content );

		updateReply( formData );
		setContent( '' );
        setToggle( false )
    }

    const updateReply = async ( data ) => {
        const url = `${ helpdesk_agent_dashboard.url }helpdesk/v1/replies/edit/${ id }`;

		await axios
			.post(
				url,
				data,
				config
			)
			.then( function () {
				toast( 'Updated.', {
					duration: 2000,
					style: {
						marginTop: 50,
					},
				} );
			} )
			.catch( function ( err ) {
				toast( "Couldn't update the reply.", {
					duration: 2000,
					icon: '❌',
					style: {
						marginTop: 50,
					},
				} );
				console.log( err );
			} );

		takeReplies();
	};

    return (
        <span className="reply-edit">
            <Button
                onClick={ () => getReply( id ) }
                className="edit-reply-btn"
            >
                Edit
            </Button>
            { toggle && (
                <div id="reply-edit" className="helpdesk-submit">
                    <button
                        onClick={() => setToggle( false )}
                        className="edit-close-btn"
                    >
                        <svg viewBox="0 0 24 24" width="15">
                            <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
                        </svg>
                    </button>
                    <form onSubmit={ submitReply }>
                        <TextEditor onChange={ handleContentChange } />
                        <input
                            type="submit"
                            value={ __( 'Update', 'helpdeskwp' ) }
                        />
                    </form>
                </div>
            ) }
        </span>
    )
}

export default EditReply;