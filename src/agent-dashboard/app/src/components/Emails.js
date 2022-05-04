import { __ } from '@wordpress/i18n';
import { useSelector, useDispatch } from 'react-redux';
import {
	saveSettings,
	addEmails,
	setEmails,
	removeEmail,
} from '../features/settings/settingSlice';
import { useContext } from 'react';
import { FiltersContext } from '../contexts/FiltersContext';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Switch from '@mui/material/Switch';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';

const Emails = ( { onChange } ) => {
	const { settings } = useSelector( ( state ) => state.setting );

	const dispatch = useDispatch();

	const { category, agents } = useContext( FiltersContext );

	const addMailbox = () => {
		dispatch( addEmails() );
	};

	const deleteEmail = ( index ) => {
		dispatch( removeEmail( index ) );
	};

	const onEmailChange = ( event, index ) => {
		const target = event.target;
		const name = target.name;
		const value =
			target.type === 'checkbox' ? target.checked : target.value;

		const args = {
			name,
			value,
			index,
		};

		dispatch( setEmails( args ) );
	};

	return (
		<>
			<Box sx={ { marginBottom: '30px' } }>
				<p style={ { margin: '5px 0 15px' } }>
					{ __(
						'How many messages should be imported at each connection?',
						'helpdeskwp'
					) }
				</p>
				<input
					placeholder="20"
					type="text"
					name="limit"
					defaultValue={ settings && settings.limit }
					onChange={ onChange }
				/>
			</Box>

			<Box sx={ { marginBottom: '30px' } }>
				<FormControlLabel
					control={
						<Switch
							name="is_email"
							defaultChecked={
								settings.is_email && settings.is_email
							}
							onChange={ onChange }
						/>
					}
					label={ __( 'Enable email import', 'helpdeskwp' ) }
				/>
			</Box>

			<Divider style={ { margin: '30px 0' } } />

			{ settings.emails &&
				settings.emails.map( ( email, index ) => {
					return (
						<div key={ index }>
							<Button
								variant="outlined"
								color="error"
								onClick={ () => deleteEmail( index ) }
							>
								{ __( 'Delete', 'helpdeskwp' ) }
							</Button>
							<p style={ { margin: '5px 0' } }>
								{ __( 'Host', 'helpdeskwp' ) }
							</p>
							<input
								type="text"
								name="host"
								defaultValue={
									settings.emails[ index ].host &&
									settings.emails[ index ].host
								}
								onChange={ ( e ) => onEmailChange( e, index ) }
							/>

							<p style={ { margin: '5px 0' } }>
								{ __( 'User', 'helpdeskwp' ) }
							</p>
							<input
								type="text"
								name="user"
								defaultValue={
									settings.emails[ index ].user &&
									settings.emails[ index ].user
								}
								onChange={ ( e ) => onEmailChange( e, index ) }
							/>

							<p style={ { margin: '5px 0' } }>
								{ __( 'Password', 'helpdeskwp' ) }
							</p>
							<input
								type="text"
								name="password"
								defaultValue={
									settings.emails[ index ].password &&
									settings.emails[ index ].password
								}
								onChange={ ( e ) => onEmailChange( e, index ) }
							/>

							<p style={ { margin: '5px 0' } }>
								{ __( 'Port', 'helpdeskwp' ) }
							</p>
							<input
								type="text"
								name="port"
								defaultValue={
									settings.emails[ index ].port &&
									settings.emails[ index ].port
								}
								onChange={ ( e ) => onEmailChange( e, index ) }
							/>

							<div style={ { margin: '15px 0' } }>
								<FormControlLabel
									control={
										<Switch
											name="ssl"
											defaultChecked={
												settings.emails[ index ].ssl &&
												settings.emails[ index ].ssl
											}
											onChange={ ( e ) =>
												onEmailChange( e, index )
											}
										/>
									}
									label={ __( 'SSL', 'helpdeskwp' ) }
								/>
							</div>

							<Box sx={ { minWidth: 120, marginBottom: '30px' } }>
								<FormControl fullWidth>
									<InputLabel id="protocol-select-label">
										{ __( 'Protocol', 'helpdeskwp' ) }
									</InputLabel>
									<Select
										name="protocol"
										label={ __( 'Protocol', 'helpdeskwp' ) }
										id="protocol-select-label"
										value={
											settings.emails[ index ].protocol &&
											settings.emails[ index ].protocol
										}
										defaultValue="pop3"
										onChange={ ( e ) =>
											onEmailChange( e, index )
										}
									>
										<MenuItem key="pop3" value="pop3">
											{ __( 'Pop3', 'helpdeskwp' ) }
										</MenuItem>
										<MenuItem key="imap" value="imap">
											{ __( 'Imap', 'helpdeskwp' ) }
										</MenuItem>
									</Select>
								</FormControl>
							</Box>

							<Box sx={ { minWidth: 120, marginBottom: '30px' } }>
								<FormControl fullWidth>
									<InputLabel id="category-select-label">
										{ __( 'Category', 'helpdeskwp' ) }
									</InputLabel>
									<Select
										name="category"
										label={ __( 'Category', 'helpdeskwp' ) }
										id="category-select-label"
										value={
											settings.emails[ index ].category &&
											settings.emails[ index ].category
										}
										onChange={ ( e ) =>
											onEmailChange( e, index )
										}
									>
										{ category &&
											category.map( ( category ) => {
												return (
													<MenuItem
														key={ category.id }
														value={ category.name }
													>
														{ category.name }
													</MenuItem>
												);
											} ) }
									</Select>
								</FormControl>
							</Box>

							<Box sx={ { minWidth: 120 } }>
								<FormControl fullWidth>
									<InputLabel id="agent-select-label">
										{ __( 'Agent', 'helpdeskwp' ) }
									</InputLabel>
									<Select
										name="agent"
										label={ __( 'Agent', 'helpdeskwp' ) }
										id="agent-select-label"
										value={
											settings.emails[ index ].agent &&
											settings.emails[ index ].agent
										}
										onChange={ ( e ) =>
											onEmailChange( e, index )
										}
									>
										{ agents &&
											agents.map( ( agent ) => {
												return (
													<MenuItem
														key={ agent.id }
														value={ agent.id }
													>
														{ agent.name }
													</MenuItem>
												);
											} ) }
									</Select>
								</FormControl>
							</Box>

							<Divider style={ { margin: '30px 0' } } />
						</div>
					);
				} ) }

			<div style={ { marginTop: '16px' } }>
				<Button variant="contained" onClick={ () => addMailbox() }>
					{ __( 'Add new mailbox', 'helpdeskwp' ) }
				</Button>
			</div>

			<div style={ { marginTop: '16px' } }>
				<Button
					variant="contained"
					onClick={ () => dispatch( saveSettings( settings ) ) }
				>
					{ __( 'Save', 'helpdeskwp' ) }
				</Button>
			</div>
		</>
	);
};

export default Emails;
