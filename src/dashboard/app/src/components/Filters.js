import { useState, useEffect, useContext } from 'react'
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { TicketContext } from '../contexts/TicketContext'
import { FiltersContext } from '../contexts/FiltersContext'

const Filters = () => {
    const { applyFilters } = useContext(TicketContext)
    const { category, type, agents, status, priority } = useContext(FiltersContext)

    const [filterCategory, setFilterCategory] = useState('');
    const [filterPriority, setFilterPriority] = useState('');
    const [filterStatus, setFilterStatus] = useState('');
    const [filterType, setFilterType] = useState('');
    const [filterAgent, setFilterAgent] = useState('');

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
