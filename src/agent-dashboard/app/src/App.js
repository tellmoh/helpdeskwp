import Tickets from './components/Tickets';
import Ticket from './routes/Ticket';
import TopBar from './components/TopBar';
import Settings from './components/Settings';
import Overview from './components/Overview';
import Customers from './components/Customers';
import Customer from './routes/Customer';
import Docs from './components/docs';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import './index.scss';

const pageSlug = window.location.pathname;

const App = () => {
	return (
		<MemoryRouter basename={ pageSlug } initialEntries={ [ pageSlug ] }>
			<TopBar />
			<Routes>
				<Route path="/" element={ <Tickets /> } />
				<Route path="ticket/:id" element={ <Ticket /> } />
				<Route path="customer/:id" element={ <Customer /> } />
				<Route path="settings" element={ <Settings /> } />
				<Route path="overview" element={ <Overview /> } />
				<Route path="customers" element={ <Customers /> } />
				<Route path="docs" element={ <Docs /> } />
			</Routes>
		</MemoryRouter>
	);
};

export default App;
