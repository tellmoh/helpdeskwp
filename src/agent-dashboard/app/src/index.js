import App from './App';
import Ticket from './routes/Ticket';
import TicketContextProvider from './contexts/TicketContext'
import FiltersContextProvider from './contexts/FiltersContext'
import Settings from './components/Settings';
import Overview from './components/Overview';
import {
  MemoryRouter,
  Routes,
  Route
} from "react-router-dom";

const pageSlug = window.location.pathname

ReactDOM.render(
  <TicketContextProvider>
    <FiltersContextProvider>
      <MemoryRouter basename={pageSlug} initialEntries={[pageSlug]}>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="settings" element={<Settings />} />
          <Route path="overview" element={<Overview />} />
          <Route path="ticket">
            <Route path=":ticketId" element={<Ticket />} />
          </Route>
        </Routes>
      </MemoryRouter>
    </FiltersContextProvider>
  </TicketContextProvider>,
  document.getElementById('helpdesk-agent-dashboard')
);
