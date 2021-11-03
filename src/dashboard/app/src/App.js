import TicketContextProvider from './contexts/TicketContext'
import { Toaster } from 'react-hot-toast'
import List from './components/List'
import Filters from './components/Filters'
import './index.css'

const App = () => {
    return (
        <TicketContextProvider>
            <List />
            <Filters />
            <Toaster />
        </TicketContextProvider>
    )
}

export default App
