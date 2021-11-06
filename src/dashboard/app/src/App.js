import { Toaster } from 'react-hot-toast'
import List from './components/List'
import Filters from './components/Filters'
import './index.css'

const App = () => {
    return (
        <>
            <List />
            <Filters />
            <Toaster />
        </>
    )
}

export default App
