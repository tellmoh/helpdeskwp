import axios from 'axios';

const API_URL = `${ helpdesk_agent_dashboard.url }helpdesk/v1/settings`;

const config = {
	headers: {
		'X-WP-Nonce': helpdesk_agent_dashboard.nonce,
		'Content-Type': 'application/json',
	},
};

// Get settings
const getSettings = async () => {
	const response = await axios.get( API_URL, config );

	return response.data;
};

// Save settings
const saveSettings = async ( settings ) => {
	if (
		'object' !== typeof settings ||
		Object.entries( settings ).length === 0
	) {
		return;
	}

	const data = {
		type: 'saveSettings',
		settings: settings,
	};

	const response = await axios.post(
		API_URL,
		JSON.stringify( data ),
		config
	);

	return response.data;
};

// Get pages
const getPages = async () => {
	const url = `${ helpdesk_agent_dashboard.url }wp/v2/pages/?per_page=100`;

	const response = await axios.get( url );

	return response.data;
};

const settingService = {
	getSettings,
	saveSettings,
	getPages,
};

export default settingService;
