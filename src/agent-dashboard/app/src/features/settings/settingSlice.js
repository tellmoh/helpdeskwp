import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import settingService from './settingService';

const initialState = {
	settings: [],
	pages: [],
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: '',
};

// Get settings
export const getSettings = createAsyncThunk(
	'settings/getSettings',
	async ( _, thunkAPI ) => {
		try {
			return await settingService.getSettings();
		} catch ( error ) {
			const message =
				( error.response &&
					error.response.data &&
					error.response.data.message ) ||
				error.message ||
				error.toString();
			return thunkAPI.rejectWithValue( message );
		}
	}
);

// Save settings
export const saveSettings = createAsyncThunk(
	'settings/saveSettings',
	async ( settings, thunkAPI ) => {
		try {
			return await settingService.saveSettings( settings );
		} catch ( error ) {
			const message =
				( error.response &&
					error.response.data &&
					error.response.data.message ) ||
				error.message ||
				error.toString();
			return thunkAPI.rejectWithValue( message );
		}
	}
);

// Get pages
export const getPages = createAsyncThunk(
	'settings/getPages',
	async ( _, thunkAPI ) => {
		try {
			return await settingService.getPages();
		} catch ( error ) {
			const message =
				( error.response &&
					error.response.data &&
					error.response.data.message ) ||
				error.message ||
				error.toString();
			return thunkAPI.rejectWithValue( message );
		}
	}
);

export const settingSlice = createSlice( {
	name: 'ticket',
	initialState,
	reducers: {
		setSetting: ( state, action ) => {
			const { name, value } = action.payload;

			state.settings[ name ] = value;
		},
		setPage: ( state, action ) => {
			const { pageID, pageName } = action.payload;

			state.settings[ 'pageID' ] = pageID;
			state.settings[ 'pageName' ] = pageName;
		},
		addEmails: ( state, action ) => {
			const emails = [ ...state.settings.emails ];

			emails.push( {
				host: '',
				user: '',
				password: '',
				port: '',
				ssl: false,
				protocol: '',
				category: '',
				agent: '',
			} );

			state.settings[ 'emails' ] = emails;
		},
		setEmails: ( state, action ) => {
			const { name, value, index } = action.payload;

			state.settings.emails[ index ][ name ] = value;
		},
		removeEmail: ( state, action ) => {
			state.settings.emails.splice( action.payload, 1 );
		},
		setRuleName: ( state, action ) => {
			const { value, index } = action.payload;

			state.settings.rules[ index ].name = value;
		},
		setMatch: ( state, action ) => {
			const { value, index } = action.payload;

			state.settings.rules[ index ].match = value;
		},
		addRule: ( state, action ) => {
			const rules = [ ...state.settings.rules ];

			rules.push( {
				name: '',
				match: '',
				status: false,
				actions: [
					{
						action: '',
						actionValue: '',
					},
				],
				filters: [
					{
						filter: '',
						operation: '',
						value: '',
						normal_value: '',
					},
				],
			} );

			state.settings.rules = rules;
		},
		addFilter: ( state, action ) => {
			const filters = [
				...state.settings.rules[ action.payload ].filters,
			];

			filters.push( {
				name: '',
				match: '',
				filter: '',
				operation: '',
				value: '',
				normal_value: '',
			} );

			state.settings.rules[ action.payload ].filters = filters;
		},
		setFilter: ( state, action ) => {
			const { name, value, index, ruleIndex } = action.payload;

			state.settings.rules[ ruleIndex ].filters[ index ][ name ] = value;
		},
		addAction: ( state, action ) => {
			const actions = [
				...state.settings.rules[ action.payload ].actions,
			];

			actions.push( {
				action: '',
				actionValue: '',
			} );

			state.settings[ 'rules' ][ action.payload ].actions = actions;
		},
		setAction: ( state, action ) => {
			const { name, value, index, ruleIndex } = action.payload;

			state.settings.rules[ ruleIndex ].actions[ index ][ name ] = value;
		},
		removeRule: ( state, action ) => {
			state.settings.rules.splice( action.payload, 1 );
			settingService.saveSettings( state.settings );
		},
	},
	extraReducers: ( builder ) => {
		builder
			.addCase( getSettings.pending, ( state ) => {
				state.isLoading = true;
			} )
			.addCase( getSettings.fulfilled, ( state, action ) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.settings = action.payload;
			} )
			.addCase( getSettings.rejected, ( state, action ) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			} )
			.addCase( getPages.pending, ( state ) => {
				state.isLoading = true;
			} )
			.addCase( getPages.fulfilled, ( state, action ) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.pages = action.payload;
			} )
			.addCase( getPages.rejected, ( state, action ) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			} )
			.addCase( saveSettings.pending, ( state ) => {
				state.isLoading = true;
			} )
			.addCase( saveSettings.fulfilled, ( state, action ) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.settings = action.payload;
			} )
			.addCase( saveSettings.rejected, ( state, action ) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			} );
	},
} );

export const {
	setSetting,
	setPage,
	addEmails,
	setEmails,
	removeEmail,
	addRule,
	setFilter,
	removeRule,
	addFilter,
	setAction,
	addAction,
	setRuleName,
	setMatch,
} = settingSlice.actions;
export default settingSlice.reducer;
