import { useState, useContext } from 'react'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { TicketContext } from '../contexts/TicketContext'
import { FiltersContext } from '../contexts/FiltersContext'
import {
    Category,
    Priority,
    Status,
    Type,
    Agent
} from './FilterComponents';

const Properties = ({ ticket }) => {
    const { updateProperties } = useContext(TicketContext)
    const { category, type, agents, status, priority } = useContext(FiltersContext)

    const [filterCategory, setFilterCategory] = useState('');
    const [filterPriority, setFilterPriority] = useState('');
    const [filterStatus, setFilterStatus] = useState('');
    const [filterType, setFilterType] = useState('');
    const [filterAgent, setFilterAgent] = useState('');

    const filters = {
        category: filterCategory,
        priority: filterPriority,
        status: filterStatus,
        type: filterType,
        agent: filterAgent
    }

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

    const updateTicket = () => {
        updateProperties(ticket, filters)
    }

    return (
        <div className="helpdesk-filters">
            <h3>Properties</h3>
            <Category value={filterCategory} onChange={handleCategoryChange} category={category} />
            <Priority value={filterPriority} onChange={handlePriorityChange} priority={priority} />
            <Status value={filterStatus} onChange={handleStatusChange} status={status} />
            <Type value={filterType} onChange={handleTypeChange} type={type} />
            <Agent value={filterAgent} onChange={handleAgentChange} agents={agents} />

            <Stack direction="column">
                <Button variant="contained" onClick={updateTicket}>Update</Button>
            </Stack>
        </div>
    )
}

export default Properties
