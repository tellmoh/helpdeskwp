import { configureStore } from '@reduxjs/toolkit';
import ticketReducer from '../features/tickets/ticketSlice';

export const store = configureStore( {
	reducer: {
		ticket: ticketReducer,
	},
} );
