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

const Filters = () => {
    const { applyFilters } = useContext(TicketContext)
    const { category, type, agents, status, priority } = useContext(FiltersContext)

    const [filterCategory, setFilterCategory] = useState('');
    const [filterPriority, setFilterPriority] = useState('');
    const [filterStatus, setFilterStatus] = useState('');
    const [filterType, setFilterType] = useState('');
    const [filterAgent, setFilterAgent] = useState('');

    const handleCategoryChange = (category) => {
        setFilterCategory(category);
        const local = JSON.stringify({ value: category.value, label: category.label })
        localStorage.setItem('Category', local);
    };

    const handlePriorityChange = (priority) => {
        setFilterPriority(priority);
        const local = JSON.stringify({ value: priority.value, label: priority.label })
        localStorage.setItem('Priority', local);
    };

    const handleStatusChange = (status) => {
        setFilterStatus(status);
        const local = JSON.stringify({ value: status.value, label: status.label })
        localStorage.setItem('Status', local);
    };

    const handleTypeChange = (type) => {
        setFilterType(type);
        const local = JSON.stringify({ value: type.value, label: type.label })
        localStorage.setItem('Type', local);
    };

    const handleAgentChange = (agent) => {
        setFilterAgent(agent);
        const local = JSON.stringify({ value: agent.value, label: agent.label })
        localStorage.setItem('Agent', local);
    };

    const localFilters = {
        category: JSON.parse(localStorage.getItem('Category')),
        priority: JSON.parse(localStorage.getItem('Priority')),
        status: JSON.parse(localStorage.getItem('Status')),
        type: JSON.parse(localStorage.getItem('Type')),
        agent: JSON.parse(localStorage.getItem('Agent'))
    }

    const filters = {
        category: localFilters.category.value ? localFilters.category.value : filterCategory.value,
        priority: localFilters.priority.value ? localFilters.priority.value : filterPriority.value,
        status: localFilters.status.value ? localFilters.status.value : filterStatus.value,
        type: localFilters.type.value ? localFilters.type.value : filterType.value,
        agent: localFilters.agent.value ? localFilters.agent.value : filterAgent.value
    }

    const apply = () => {
        applyFilters(filters)
    }

    return (
        <div className="helpdesk-filters">
            <h3>Filters</h3>
            <Category value={filterCategory} onChange={handleCategoryChange} category={category} parent="filter"/>
            <Priority onChange={handlePriorityChange} priority={priority} parent="filter" />
            <Status onChange={handleStatusChange} status={status} parent="filter" />
            <Type onChange={handleTypeChange} type={type} parent="filter" />
            <Agent onChange={handleAgentChange} agents={agents} parent="filter" />

            <Stack direction="column">
                <Button variant="contained" onClick={apply}>Apply</Button>
            </Stack>
        </div>
    )
}

export default Filters
