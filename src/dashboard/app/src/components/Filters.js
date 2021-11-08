import { useState, useEffect } from 'react'
import axios from 'axios';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

const Filters = () => {
    const [filterCategory, setFilterCategory] = useState('');
    const [filterPriority, setFilterPriority] = useState('');
    const [filterStatus, setFilterStatus] = useState('');
    const [filterType, setTypeStatus] = useState('');
    const [filterAgent, setAgentStatus] = useState('');
    const [category, setCategory] = useState('');
    const [type, setType] = useState('');
    const [agents, setAgents] = useState('');

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
        setTypeStatus(event.target.value);
    };

    const handleAgentChange = (event) => {
        setAgentStatus(event.target.value);
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
                    <MenuItem value={'low'}>Low</MenuItem>
                    <MenuItem value={'medium'}>Medium</MenuItem>
                    <MenuItem value={'high'}>High</MenuItem>
                    <MenuItem value={'urgent'}>Urgent</MenuItem>
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
                    <MenuItem value={'open'}>Open</MenuItem>
                    <MenuItem value={'pending'}>Pending</MenuItem>
                    <MenuItem value={'resolved'}>Resolved</MenuItem>
                    <MenuItem value={'closed'}>Closed</MenuItem>
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
                <Button variant="contained">Apply</Button>
            </Stack>
        </div>
    )
}

export default Filters
