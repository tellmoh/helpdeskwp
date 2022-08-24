import { __ } from '@wordpress/i18n';
import { useState, useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
	saveSettings,
	getPages,
	getSettings,
	setSetting,
	setPage,
} from '../features/settings/settingSlice';
import axios from 'axios';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Select from 'react-select';
import { FiltersContext } from '../contexts/FiltersContext';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CannedResponses from './CannedResponses';
import CircularProgress from '@mui/material/CircularProgress';
import Emails from './Emails';
import Automations from '../components/modules/Automations';

const theme = createTheme( {
	palette: {
		primary: {
			main: '#0051af',
		},
	},
} );

function TabPanel( props ) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={ value !== index }
			id={ `vertical-tabpanel-${ index }` }
			aria-labelledby={ `vertical-tab-${ index }` }
			{ ...other }
		>
			{ value === index && <Box sx={ { p: 3 } }>{ children }</Box> }
		</div>
	);
}

function a11yProps( index ) {
	return {
		id: `vertical-tab-${ index }`,
		'aria-controls': `vertical-tabpanel-${ index }`,
	};
}

const Settings = () => {
	const [ value, setValue ] = useState( 0 );
	const [ categoryTerm, setCategory ] = useState( '' );
	const [ typeTerm, setType ] = useState( '' );
	const [ priorityTerm, setPriority ] = useState( '' );
	const [ statusTerm, setStatus ] = useState( '' );

	const { settings, pages, isLoading, isError, message } = useSelector(
		( state ) => state.setting
	);

	const defaultStatus = [ 'Open', 'Close', 'Pending', 'Resolved' ];

	const dispatch = useDispatch();

	useEffect( () => {
		if ( isError ) {
			console.log( message );
		}

		dispatch( getPages() );
		dispatch( getSettings() );
	}, [] );

	const {
		category,
		type,
		status,
		priority,
		takeCategory,
		takeType,
		takeStatus,
		takePriority,
		deleteTerms,
	} = useContext( FiltersContext );

	const onSettingsChange = ( event ) => {
		const target = event.target;
		const name = target.name;
		const value =
			target.type === 'checkbox' ? target.checked : target.value;

		const args = {
			name,
			value,
		};

		dispatch( setSetting( args ) );
	};

	const onPageChange = ( page ) => {
		const args = {
			pageID: page.value,
			pageName: page.label,
		};

		dispatch( setPage( args ) );
	};

	const handleChange = ( event, newValue ) => {
		setValue( newValue );
	};

	const addNewTerm = async ( taxonomy, name ) => {
		const data = {
			type: 'addTerm',
			taxonomy: taxonomy,
			termName: name,
		};

		const config = {
			headers: {
				'X-WP-Nonce': helpdesk_agent_dashboard.nonce,
				'Content-Type': 'application/json',
			},
		};

		await axios.post(
			`${ helpdesk_agent_dashboard.url }helpdesk/v1/settings`,
			JSON.stringify( data ),
			config
		);
	};

	const addNewCategory = async () => {
		await addNewTerm( 'ticket_category', categoryTerm );
		setCategory( '' );
		takeCategory();
	};

	const addNewType = async () => {
		await addNewTerm( 'ticket_type', typeTerm );
		setType( '' );
		takeType();
	};

	const addNewPriority = async () => {
		await addNewTerm( 'ticket_priority', priorityTerm );
		setPriority( '' );
		takePriority();
	};

	const addNewStatus = async () => {
		await addNewTerm( 'ticket_status', statusTerm );
		setStatus( '' );
		takeStatus();
	};

	const deleteCategory = async ( id, taxonomy ) => {
		await deleteTerms( id, taxonomy );
		takeCategory();
	};

	const deleteType = async ( id, taxonomy ) => {
		await deleteTerms( id, taxonomy );
		takeType();
	};

	const deletePriority = async ( id, taxonomy ) => {
		await deleteTerms( id, taxonomy );
		takePriority();
	};

	const deleteStatus = async ( id, taxonomy ) => {
		await deleteTerms( id, taxonomy );
		takeStatus();
	};

	let pagesList = [];
	pages &&
		pages.map( ( page ) => {
			pagesList.push( { value: page.id, label: page.title.rendered } );
		} );

	if ( isLoading ) {
		return (
			<div id="hdw-loading">
				<CircularProgress />
			</div>
		);
	}

	return (
		<ThemeProvider theme={ theme }>
			<div className="helpdesk-main helpdesk-settings">
				<Box
					sx={ {
						flexGrow: 1,
						bgcolor: 'background.paper',
						display: 'flex',
						border: '1px solid #dbe0f3',
						boxShadow: '0 0 20px -15px #344585',
						borderRadius: '7px',
					} }
				>
					<Tabs
						orientation="vertical"
						value={ value }
						onChange={ handleChange }
						sx={ { borderRight: 1, borderColor: 'divider' } }
					>
						<Tab
							label={ __( 'Portal Page', 'helpdeskwp' ) }
							{ ...a11yProps( 0 ) }
						/>
						<Tab
							label={ __( 'Integrations', 'helpdeskwp' ) }
							{ ...a11yProps( 1 ) }
						/>
						<Tab
							label={ __( 'Emails', 'helpdeskwp' ) }
							{ ...a11yProps( 2 ) }
						/>
						<Tab
							label={ __( 'Automations', 'helpdeskwp' ) }
							{ ...a11yProps( 3 ) }
						/>
						<Tab
							label={ __( 'Docs', 'helpdeskwp' ) }
							{ ...a11yProps( 4 ) }
						/>
						<Tab
							label={ __( 'Canned Responses', 'helpdeskwp' ) }
							{ ...a11yProps( 5 ) }
						/>
						<Tab
							label={ __( 'Category', 'helpdeskwp' ) }
							{ ...a11yProps( 6 ) }
						/>
						<Tab
							label={ __( 'Type', 'helpdeskwp' ) }
							{ ...a11yProps( 7 ) }
						/>
						<Tab
							label={ __( 'Priority', 'helpdeskwp' ) }
							{ ...a11yProps( 8 ) }
						/>
						<Tab
							label={ __( 'Status', 'helpdeskwp' ) }
							{ ...a11yProps( 9 ) }
						/>
					</Tabs>
					<TabPanel value={ value } index={ 0 }>
						<p style={ { margin: '5px 0' } }>
							{ __(
								'Select the support portal page',
								'helpdeskwp'
							) }
						</p>
						<div style={ { marginBottom: '10px' } }>
							<small>
								{ __(
									'This page will set as the support portal page',
									'helpdeskwp'
								) }
							</small>
						</div>
						{ settings && (
							<Select
								options={ pagesList }
								onChange={ onPageChange }
								defaultValue={ {
									value: settings.pageID,
									label: settings.pageName,
								} }
							/>
						) }
						<div style={ { marginTop: '16px' } }>
							<Button
								variant="contained"
								onClick={ () =>
									dispatch( saveSettings( settings ) )
								}
							>
								{ __( 'Save', 'helpdeskwp' ) }
							</Button>
						</div>
					</TabPanel>
					<TabPanel value={ value } index={ 1 }>
						<p style={ { margin: '5px 0' } }>
							{ __( 'WooCommerce (Pro)', 'helpdeskwp' ) }
						</p>
						{ settings && (
							<input
								type="checkbox"
								defaultChecked={ settings.woo ? true : false }
								name="woo"
								onChange={ onSettingsChange }
							/>
						) }

						<p style={ { margin: '5px 0' } }>
							{ __(
								'Easy Digital Downloads (Pro)',
								'helpdeskwp'
							) }
						</p>
						{ settings && (
							<input
								type="checkbox"
								defaultChecked={ settings.edd ? true : false }
								name="edd"
								onChange={ onSettingsChange }
							/>
						) }

						<div style={ { marginTop: '16px' } }>
							<Button
								variant="contained"
								onClick={ () =>
									dispatch( saveSettings( settings ) )
								}
							>
								{ __( 'Save', 'helpdeskwp' ) }
							</Button>
						</div>
					</TabPanel>
					<TabPanel value={ value } index={ 2 }>
						<Emails onChange={ onSettingsChange } />
					</TabPanel>
					<TabPanel
						value={ value }
						index={ 3 }
						className="automations-tab"
					>
						<Automations />
					</TabPanel>
					<TabPanel value={ value } index={ 4 }>
						<p style={ { margin: '5px 0' } }>
							{ __( 'Docs slug', 'helpdeskwp' ) }
						</p>
						<div style={ { marginBottom: '10px' } }>
							<small>
								{ __(
									'After changing the slug you need to update the permalinks.',
									'helpdeskwp'
								) }
							</small>
						</div>
						<input
							type="text"
							name="docsSlug"
							defaultValue={ settings && settings.docsSlug }
							onChange={ onSettingsChange }
						/>
						<div style={ { marginTop: '16px' } }>
							<Button
								variant="contained"
								onClick={ () =>
									dispatch( saveSettings( settings ) )
								}
							>
								{ __( 'Save', 'helpdeskwp' ) }
							</Button>
						</div>
					</TabPanel>
					<TabPanel value={ value } index={ 5 }>
						<CannedResponses />
					</TabPanel>
					<TabPanel value={ value } index={ 6 }>
						<input
							type="text"
							placeholder={ __( 'Category', 'helpdeskwp' ) }
							value={ categoryTerm }
							onChange={ ( e ) => setCategory( e.target.value ) }
						/>
						<Button
							variant="contained"
							className="add-new-btn"
							onClick={ addNewCategory }
						>
							{ __( 'Add', 'helpdeskwp' ) }
						</Button>
						<div className="helpdesk-terms-list">
							{ category &&
								category.map( ( category ) => {
									return (
										<div
											key={ category.id }
											className="helpdesk-term"
										>
											<span>{ category.name }</span>
											<div className="helpdesk-delete-term">
												<Button
													onClick={ () =>
														deleteCategory(
															category.id,
															'ticket_category'
														)
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
						</div>
					</TabPanel>
					<TabPanel value={ value } index={ 7 }>
						<input
							type="text"
							placeholder={ __( 'Type', 'helpdeskwp' ) }
							value={ typeTerm }
							onChange={ ( e ) => setType( e.target.value ) }
						/>
						<Button
							variant="contained"
							className="add-new-btn"
							onClick={ addNewType }
						>
							{ __( 'Add', 'helpdeskwp' ) }
						</Button>
						<div className="helpdesk-terms-list">
							{ type &&
								type.map( ( type ) => {
									return (
										<div
											key={ type.id }
											className="helpdesk-term"
										>
											<span>{ type.name }</span>
											<div className="helpdesk-delete-term">
												<Button
													onClick={ () =>
														deleteType(
															type.id,
															'ticket_type'
														)
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
						</div>
					</TabPanel>
					<TabPanel value={ value } index={ 8 }>
						<input
							type="text"
							placeholder={ __( 'Priority', 'helpdeskwp' ) }
							value={ priorityTerm }
							onChange={ ( e ) => setPriority( e.target.value ) }
						/>
						<Button
							variant="contained"
							className="add-new-btn"
							onClick={ addNewPriority }
						>
							{ __( 'Add', 'helpdeskwp' ) }
						</Button>
						<div className="helpdesk-terms-list">
							{ priority &&
								priority.map( ( priority ) => {
									return (
										<div
											key={ priority.id }
											className="helpdesk-term"
										>
											<span>{ priority.name }</span>
											<div className="helpdesk-delete-term">
												<Button
													onClick={ () =>
														deletePriority(
															priority.id,
															'ticket_priority'
														)
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
						</div>
					</TabPanel>
					<TabPanel value={ value } index={ 9 }>
						<input
							type="text"
							placeholder={ __( 'Status', 'helpdeskwp' ) }
							value={ statusTerm }
							onChange={ ( e ) => setStatus( e.target.value ) }
						/>
						<Button
							variant="contained"
							className="add-new-btn"
							onClick={ addNewStatus }
						>
							{ __( 'Add', 'helpdeskwp' ) }
						</Button>
						<div className="helpdesk-terms-list">
							{ status &&
								status.map( ( status ) => {
									return (
										<div
											key={ status.id }
											className="helpdesk-term"
										>
											<span>{ status.name }</span>
											<div className="helpdesk-delete-term">
												{ defaultStatus.indexOf(
													status.name
												) === -1 && (
													<Button
														onClick={ () =>
															deleteStatus(
																status.id,
																'ticket_status'
															)
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
												) }
											</div>
										</div>
									);
								} ) }
						</div>
					</TabPanel>
				</Box>
			</div>
		</ThemeProvider>
	);
};

export default Settings;
