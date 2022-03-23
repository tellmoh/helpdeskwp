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

export const { setSetting, setPage } = settingSlice.actions;
export default settingSlice.reducer;
