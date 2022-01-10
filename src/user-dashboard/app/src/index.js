import App from './App';
import TicketContextProvider from './contexts/TicketContext';
import Ticket from './routes/Ticket';
import AddTicket from './routes/AddTicket';
import { Toaster } from 'react-hot-toast';
import './index.scss';
import { MemoryRouter, Routes, Route } from 'react-router-dom';

const pageSlug = window.location.pathname;

ReactDOM.render(
	<TicketContextProvider>
		<MemoryRouter basename={ pageSlug } initialEntries={ [ pageSlug ] }>
			<Routes>
				<Route path="/" element={ <App /> } />
				<Route path="add-new-ticket" element={ <AddTicket /> } />
				<Route path="ticket/:id" element={ <Ticket /> } />
			</Routes>
		</MemoryRouter>
		<Toaster />
	</TicketContextProvider>,
	document.getElementById( 'helpdesk-user-dashboard' )
);
