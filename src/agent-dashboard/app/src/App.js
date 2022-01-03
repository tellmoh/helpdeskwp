import Tickets from './components/Tickets';
import Ticket from './routes/Ticket';
import TopBar from './components/TopBar';
import Settings from './components/Settings';
import Overview from './components/Overview';
import {
  MemoryRouter,
  Routes,
  Route
} from "react-router-dom";
import './index.css';

const pageSlug = window.location.pathname

const App = () => {
    return (
        <MemoryRouter basename={pageSlug} initialEntries={[pageSlug]}>
        <TopBar />
            <Routes>
                <Route path="/" element={<Tickets />} />
                <Route path="ticket">
                    <Route path=":ticketId" element={<Ticket />} />
                </Route>
                <Route path="settings" element={<Settings />} />
                <Route path="overview" element={<Overview />} />
            </Routes>
        </MemoryRouter>
    )
}

export default App;
