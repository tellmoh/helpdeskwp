import TicketContextProvider from './contexts/TicketContext'
import { Toaster } from 'react-hot-toast'
import AddTicket from './components/AddTicket'
import './index.css'

const App = () => {
    return (
        <TicketContextProvider>
            <AddTicket />
            <Toaster />
        </TicketContextProvider>
    )
}

export default App
