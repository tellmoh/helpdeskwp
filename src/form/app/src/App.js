import TicketContextProvider from './contexts/TicketContext'
import AddTicket from './components/AddTicket'
import './index.css'

const App = () => {
    return (
        <TicketContextProvider>
            <AddTicket />
        </TicketContextProvider>
    )
}

export default App
