import App from './App';
import TicketContextProvider from './contexts/TicketContext';
import Ticket from './routes/Ticket';
import AddTicket from './routes/AddTicket';
import { Toaster } from 'react-hot-toast';
import './index.css';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

ReactDOM.render(
  <TicketContextProvider>
    <BrowserRouter basename="/dev/user-dashboard/">
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="add-new-ticket" element={<AddTicket />} />
        <Route path="ticket">
          <Route path=":ticketId" element={<Ticket />} />
        </Route>
      </Routes>
    </BrowserRouter>
    <Toaster />
  </TicketContextProvider>,
  document.getElementById('helpdesk-user-dashboard')
);
