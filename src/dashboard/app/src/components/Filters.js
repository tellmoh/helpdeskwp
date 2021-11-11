import { useState, useEffect, useContext } from 'react'
import axios from 'axios';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { TicketContext } from '../contexts/TicketContext'

const Filters = () => {
    const { applyFilters } = useContext(TicketContext)
    const [filterCategory, setFilterCategory] = useState('');
    const [filterPriority, setFilterPriority] = useState('');
    const [filterStatus, setFilterStatus] = useState('');
    const [filterType, setFilterType] = useState('');
    const [filterAgent, setFilterAgent] = useState('');

    const [category, setCategory] = useState('');
    const [type, setType] = useState('');
    const [agents, setAgents] = useState('');
    const [status, setStatus] = useState('');
    const [priority, setPriority] = useState('');

    const handleCategoryChange = (event) => {
        setFilterCategory(event.target.value);
    };

    const handlePriorityChange = (event) => {
        setFilterPriority(event.target.value);
    };

    const handleStatusChange = (event) => {
        setFilterStatus(event.target.value);
    };

    const handleTypeChange = (event) => {
        setFilterType(event.target.value);
    };

    const handleAgentChange = (event) => {
        setFilterAgent(event.target.value);
    };

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
        const config = {
            headers: {
              'X-WP-Nonce': helpdesk_dashboard.nonce,
            }
        }

        let data;
        await axios.get(`${helpdesk_dashboard.url}wp/v2/users?roles=support_agent_role&?per_page=50`, config)
            .then( (res) => {
                data = res.data
            })
        return data
    }

    const apply = () => {
        const filters = {
            category: filterCategory,
            priority: filterPriority,
            status: filterStatus,
            type: filterType,
            agent: filterAgent
        }
        applyFilters(filters)
    }

    return (
        <div className="helpdesk-filters">
            <h3>Filters</h3>
            <div>
                <p>Category</p>
                <Select
                    displayEmpty
                    value={filterCategory}
                    onChange={handleCategoryChange}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    {category && category.map((category) => {
                        return <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>
                    })}
                </Select>
            </div>
            <div>
                <p>Priority</p>
                <Select
                    displayEmpty
                    value={filterPriority}
                    onChange={handlePriorityChange}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    {priority && priority.map((priority) => {
                        return <MenuItem key={priority.id} value={priority.id}>{priority.name}</MenuItem>
                    })}
                </Select>
            </div>
            <div>
                <p>Status</p>
                <Select
                    displayEmpty
                    value={filterStatus}
                    onChange={handleStatusChange}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    {status && status.map((status) => {
                        return <MenuItem key={status.id} value={status.id}>{status.name}</MenuItem>
                    })}
                </Select>
            </div>
            <div>
                <p>Type</p>
                <Select
                    displayEmpty
                    value={filterType}
                    onChange={handleTypeChange}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    {type && type.map((type) => {
                        return <MenuItem key={type.id} value={type.id}>{type.name}</MenuItem>
                    })}
                </Select>
            </div>
            <div>
                <p>Agent</p>
                <Select
                    displayEmpty
                    value={filterAgent}
                    onChange={handleAgentChange}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    {agents && agents.map((agent) => {
                        return <MenuItem key={agent.id} value={agent.id}>{agent.name}</MenuItem>
                    })}
                </Select>
            </div>
            <Stack direction="column">
                <Button variant="contained" onClick={apply}>Apply</Button>
            </Stack>
        </div>
    )
}

export default Filters
