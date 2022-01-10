import { __ } from '@wordpress/i18n';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Outlet, Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Toaster } from 'react-hot-toast';
import Properties from '../components/Properties';
import PropertyContextProvider from '../contexts/PropertyContext';
import TextEditor from '../components/editor/Editor';
import Image from '../components/Image';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

const InputMedia = styled( 'input' )( {
	display: 'none',
} );

const Ticket = () => {
	const [ singleTicket, setSingleTicket ] = useState( null );
	const [ replies, setReplies ] = useState( null );
	const [ reply, setReply ] = useState( '' );

	let params = useParams();

	useEffect( () => {
		takeTicket();
	}, [] );

	useEffect( () => {
		takeReplies();
	}, [] );

	const handleReplyChange = ( reply ) => {
		setReply( reply );
	};

	const takeTicket = async () => {
		const ticket = await fetchSingleTicket( params.id );
		setSingleTicket( ticket );
	};

	const fetchSingleTicket = async ( id ) => {
		let data;
		await axios
			.get( `${ user_dashboard.url }wp/v2/ticket/${ id }` )
			.then( ( res ) => {
				data = res.data;
			} );

		return data;
	};

	const takeReplies = async () => {
		const replies = await fetchReplies( params.id );
		setReplies( replies );
	};

	const fetchReplies = async ( id ) => {
		const config = {
			headers: {
				'X-WP-Nonce': user_dashboard.nonce,
			},
		};

		let data;
		await axios
			.get(
				`${ user_dashboard.url }helpdesk/v1/replies/?parent=${ id }`,
				config
			)
			.then( ( res ) => {
				data = res.data;
			} );

		return data;
	};

	const sendReply = async ( data ) => {
		const config = {
			headers: {
				'X-WP-Nonce': user_dashboard.nonce,
				'Content-Type': 'multipart/form-data',
			},
		};

		await axios
			.post( `${ user_dashboard.url }helpdesk/v1/replies`, data, config )
			.then( function () {
				toast( 'Sent.', {
					duration: 2000,
					style: {
						marginTop: 50,
					},
				} );
			} )
			.catch( function ( err ) {
				toast( "Couldn't send the reply.", {
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

	const submitReply = ( event ) => {
		event.preventDefault();

		const pictures = document.getElementById( 'helpdesk-pictures' );
		const fileLength = pictures.files.length;
		const files = pictures;

		let formData = new FormData();
		formData.append( 'reply', reply );
		formData.append( 'parent', params.id );

		for ( let i = 0; i < fileLength; i++ ) {
			formData.append( 'pictures[]', pictures.files[ i ] );
		}

		sendReply( formData );
		setReply( '' );
		document.querySelector( '.helpdesk-editor .ProseMirror' ).innerHTML =
			'';
	};

	const refreshTicket = () => {
		takeReplies();
	};

	return (
		<>
			<div className="helpdesk-tickets helpdesk-single-ticket">
				<Link to="/">
					<span className="helpdesk-back primary">
						{ __( 'Back', 'helpdeskwp' ) }
					</span>
				</Link>
				<div className="refresh-ticket">
					<Button onClick={ refreshTicket }>
						<svg
							fill="#0051af"
							width="23px"
							aria-hidden="true"
							viewBox="0 0 24 24"
						>
							<path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"></path>
						</svg>
					</Button>
				</div>
				{ singleTicket && (
					<div className="helpdesk-single-ticket">
						<h1>{ singleTicket.title.rendered }</h1>
					</div>
				) }
				<div className="helpdesk-add-new-reply helpdesk-submit">
					<form onSubmit={ submitReply }>
						<TextEditor onChange={ handleReplyChange } />
						<div
							className="helpdesk-w-50"
							style={ { paddingRight: '10px' } }
						>
							<p>{ __( 'Image', 'helpdeskwp' ) }</p>
							<label htmlFor="helpdesk-pictures">
								<InputMedia
									accept="image/*"
									id="helpdesk-pictures"
									type="file"
									multiple
								/>
								<Button
									variant="contained"
									component="span"
									className="helpdesk-upload"
								>
									{ __( 'Upload', 'helpdeskwp' ) }
								</Button>
							</label>
						</div>
						<div
							className="helpdesk-w-50"
							style={ { paddingRight: '10px' } }
						>
							<div className="helpdesk-submit-btn">
								<input
									type="submit"
									value={ __( 'Send', 'helpdeskwp' ) }
								/>
							</div>
						</div>
					</form>
				</div>
				<div className="helpdesk-ticket-replies">
					{ replies &&
						replies.map( ( reply ) => {
							return (
								<div key={ reply.id } className="ticket-reply">
									<span className="by-name">
										{ reply.author }
									</span>
									<span className="reply-date">
										{ reply.date }
									</span>
									<div className="ticket-reply-body">
										{ reply.reply && (
											<div
												dangerouslySetInnerHTML={ {
													__html: reply.reply,
												} }
											/>
										) }
									</div>
									{ reply.images && (
										<div className="ticket-reply-images">
											{ reply.images.map(
												( img, index ) => {
													return (
														<Image
															key={ index }
															width={ 100 }
															src={ img }
														/>
													);
												}
											) }
										</div>
									) }
								</div>
							);
						} ) }
				</div>
				<Outlet />
				<Toaster />
			</div>
			<PropertyContextProvider>
				<Properties
					ticket={ params.id }
					ticketContent={ singleTicket }
				/>
			</PropertyContextProvider>
		</>
	);
};

export default Ticket;
