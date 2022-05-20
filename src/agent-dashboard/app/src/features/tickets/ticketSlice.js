import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import ticketService from './ticketService';

const initialState = {
	tickets: [],
	totalPages: 1,
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: '',
};

// Get tickets
export const getTickets = createAsyncThunk(
	'tickets/getAll',
	async ( args, thunkAPI ) => {
		try {
			return await ticketService.getTickets( args );
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

// Delete ticket
export const deleteTicket = createAsyncThunk(
	'tickets/delete',
	async ( id, thunkAPI ) => {
		try {
			return await ticketService.deleteTicket( id );
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

// Update ticket properties
export const updateProperties = createAsyncThunk(
	'tickets/updateproperties',
	async ( args, thunkAPI ) => {
		try {
			return await ticketService.updateProperties( args );
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

// Bulk action tickets
export const bulkAction = createAsyncThunk(
	'tickets/bulkaction',
	async ( args, thunkAPI ) => {
		try {
			return await ticketService.bulkAction( args );
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

export const ticketSlice = createSlice( {
	name: 'ticket',
	initialState,
	reducers: {},
	extraReducers: ( builder ) => {
		builder
			.addCase( getTickets.pending, ( state ) => {
				state.isLoading = true;
			} )
			.addCase( getTickets.fulfilled, ( state, action ) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.tickets = action.payload.data;
				state.totalPages = action.payload.totalPages;
			} )
			.addCase( getTickets.rejected, ( state, action ) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			} )
			.addCase( deleteTicket.pending, ( state ) => {
				state.isLoading = true;
			} )
			.addCase( deleteTicket.fulfilled, ( state, action ) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.tickets = state.tickets.filter(
					( ticket ) => ticket.id !== action.payload.id
				);
			} )
			.addCase( deleteTicket.rejected, ( state, action ) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			} )
			.addCase( updateProperties.pending, ( state ) => {
				state.isLoading = true;
			} )
			.addCase( updateProperties.fulfilled, ( state, action ) => {
				state.isLoading = false;
				state.isSuccess = true;
			} )
			.addCase( updateProperties.rejected, ( state, action ) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			} )
			.addCase( bulkAction.pending, ( state ) => {
				state.isLoading = true;
			} )
			.addCase( bulkAction.fulfilled, ( state, action ) => {
				state.isLoading = false;
				state.isSuccess = true;

				if ( action.payload ) {
					action.payload.map( ( id ) => {
						state.tickets = state.tickets.filter(
							( ticket ) => ticket.id !== id
						);
					} );
				}
			} )
			.addCase( bulkAction.rejected, ( state, action ) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			} );
	},
} );

export default ticketSlice.reducer;
