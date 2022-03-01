import { useState, useEffect, createContext } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

export const SettingsContext = createContext();

const SettingsContextProvider = ( props ) => {
	const [ settings, setSettings ] = useState( null );

    let config = {
		headers: {
			'X-WP-Nonce': helpdesk_agent_dashboard.nonce,
			'Content-Type': 'application/json',
		},
	};

	useEffect( () => {
		takeSettings();
	}, [] );

	const takeSettings = async () => {
		const settings = await fetchSettings();
		setSettings( settings );
	};

	const fetchSettings = async () => {
		const url = `${ helpdesk_agent_dashboard.url }helpdesk/v1/settings`;

		let data;
		await axios.get( url, config ).then( ( res ) => {
			data = res.data;
		} );

		return data;
	};

    const handleSave = async () => {
		const data = {
			type: 'saveSettings',
			settings: settings,
		};

		await axios
			.post(
				`${ helpdesk_agent_dashboard.url }helpdesk/v1/settings`,
				JSON.stringify( data ),
				config
			)
			.then( function () {
				toast( 'Saved.', {
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
	};

    const onSettingsChange = (event) => {
		const target = event.target
		const name   = target.name
		const value  = target.type === 'checkbox' ? target.checked : target.value;

		settings[name] = value

		setSettings( settings );
	}

    const onPageChange = ( page ) => {
		settings.pageID   = page.value
		settings.pageName = page.label

		setSettings( settings );
	};

	return (
		<SettingsContext.Provider
			value={ {
				settings,
                handleSave,
                onSettingsChange,
                onPageChange
			} }
		>
			{ props.children }
		</SettingsContext.Provider>
	);
};

export default SettingsContextProvider;
