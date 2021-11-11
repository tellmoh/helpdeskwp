import { useState, useEffect, createContext } from 'react'
import axios from 'axios'

export const FiltersContext = createContext()

const FiltersContextProvider = (props) => {
    const [category, setCategory] = useState('');
    const [type, setType] = useState('');
    const [agents, setAgents] = useState('');
    const [status, setStatus] = useState('');
    const [priority, setPriority] = useState('');

    useEffect(() => {
        takeCategory()
    }, [])

    useEffect(() => {
        takeType()
    }, [])

    useEffect(() => {
        takeAgents()
    }, [])

    useEffect(() => {
        takeStatus()
    }, [])

    useEffect(() => {
        takePriority()
    }, [])

    const takeCategory = async () => {
        const category = await fetchCategory()
        setCategory(category)
    }

    const fetchCategory = async () => {
        let data;
        await axios.get(`${helpdesk_dashboard.url}wp/v2/ticket_category/?per_page=50`)
            .then( (res) => {
                data = res.data
            })
        return data
    }

    const takeType = async () => {
        const type = await fetchType()
        setType(type)
    }

    const fetchType = async () => {
        let data;
        await axios.get(`${helpdesk_dashboard.url}wp/v2/ticket_type/?per_page=50`)
            .then( (res) => {
                data = res.data
            })
        return data
    }

    const takeStatus = async () => {
        const status = await fetchStatus()
        setStatus(status)
    }

    const fetchStatus = async () => {
        let data;
        await axios.get(`${helpdesk_dashboard.url}wp/v2/ticket_status/?per_page=50`)
            .then( (res) => {
                data = res.data
            })
        return data
    }

    const takePriority = async () => {
        const priority = await fetchPriority()
        setPriority(priority)
    }

    const fetchPriority = async () => {
        let data;
        await axios.get(`${helpdesk_dashboard.url}wp/v2/ticket_priority/?per_page=50`)
            .then( (res) => {
                data = res.data
            })
        return data
    }

    const takeAgents = async () => {
        const agents = await fetchAgents()
        setAgents(agents)
    }

    const fetchAgents = async () => {
        let data;
        await axios.get(`${helpdesk_dashboard.url}wp/v2/ticket_agent/?per_page=50`)
            .then( (res) => {
                data = res.data
            })
        return data
    }

    return (
        <FiltersContext.Provider value={{ category, type, agents, status, priority }}>
            {props.children}
        </FiltersContext.Provider>
    )
}

export default FiltersContextProvider
