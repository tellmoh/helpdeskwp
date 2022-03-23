import { configureStore } from '@reduxjs/toolkit';
import ticketReducer from '../features/tickets/ticketSlice';
import settingReducer from '../features/settings/settingSlice';

export const store = configureStore( {
	reducer: {
		ticket: ticketReducer,
		setting: settingReducer,
	},
} );
