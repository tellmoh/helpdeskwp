import { Toaster } from 'react-hot-toast'
import List from './components/List'
import Filters from './components/Filters'
import './index.css'
import TopBar from './components/TopBar'

const App = () => {
    return (
        <>
            <TopBar />
            <div className="helpdesk-main">
                <List />
                <Filters />
                <Toaster />
            </div>
        </>
    )
}

export default App
