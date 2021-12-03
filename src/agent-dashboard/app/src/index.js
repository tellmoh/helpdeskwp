import App from './App';
import Ticket from './routes/Ticket';
import TicketContextProvider from './contexts/TicketContext'
import FiltersContextProvider from './contexts/FiltersContext'
import Settings from './components/Settings';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

ReactDOM.render(
  <TicketContextProvider>
    <FiltersContextProvider>
      <BrowserRouter basename="/dev/wp-admin/admin.php">
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="settings" element={<Settings />} />
          <Route path="ticket">
            <Route path=":ticketId" element={<Ticket />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </FiltersContextProvider>
  </TicketContextProvider>,
  document.getElementById('helpdesk-agent-dashboard')
);
