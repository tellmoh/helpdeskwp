import App from './App';
import Ticket from './routes/ticket';
import TicketContextProvider from './contexts/TicketContext'
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

ReactDOM.render(
  <TicketContextProvider>
    <BrowserRouter basename="/dev/wp-admin/admin.php">
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="ticket">
          <Route path=":ticketId" element={<Ticket />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </TicketContextProvider>,
  document.getElementById('helpdesk-dashboard')
);
