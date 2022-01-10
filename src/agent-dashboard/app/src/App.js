import Tickets from './components/Tickets';
import Ticket from './routes/Ticket';
import TopBar from './components/TopBar';
import Settings from './components/Settings';
import Overview from './components/Overview';
import Customers from './components/Customers';
import Customer from './routes/Customer';
import {
  MemoryRouter,
  Routes,
  Route
} from "react-router-dom";
import './index.scss';

const pageSlug = window.location.pathname

const App = () => {
    return (
        <MemoryRouter basename={pageSlug} initialEntries={[pageSlug]}>
        <TopBar />
            <Routes>
                <Route path="/" element={<Tickets />} />
                <Route path="ticket/:id" element={<Ticket />} />
                <Route path="customer">
                    <Route path=":customerId" element={<Customer />} />
                </Route>
                <Route path="settings" element={<Settings />} />
                <Route path="overview" element={<Overview />} />
                <Route path="customers" element={<Customers />} />
            </Routes>
        </MemoryRouter>
    )
}

export default App;
