import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

export function Category({ value, onChange, category }) {
    return(
        <div>
            <p>Category</p>
            <Select
                displayEmpty
                value={value}
                onChange={onChange}
            >
                <MenuItem value="">
                    <em>None</em>
                </MenuItem>
                {category && category.map((category) => {
                    return <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>
                })}
            </Select>
        </div>
    )
}

export function Priority({ value, onChange, priority }) {
    return(
        <div>
            <p>Priority</p>
            <Select
                displayEmpty
                value={value}
                onChange={onChange}
            >
                <MenuItem value="">
                    <em>None</em>
                </MenuItem>
                {priority && priority.map((priority) => {
                    return <MenuItem key={priority.id} value={priority.id}>{priority.name}</MenuItem>
                })}
            </Select>
        </div>
    )
}

export function Status({ value, onChange, status }) {
    return(
        <div>
            <p>Status</p>
            <Select
                displayEmpty
                value={value}
                onChange={onChange}
            >
                <MenuItem value="">
                    <em>None</em>
                </MenuItem>
                {status && status.map((status) => {
                    return <MenuItem key={status.id} value={status.id}>{status.name}</MenuItem>
                })}
            </Select>
        </div>
    )
}

export function Type({ value, onChange, type }) {
    return(
        <div>
            <p>Type</p>
            <Select
                displayEmpty
                value={value}
                onChange={onChange}
            >
                <MenuItem value="">
                    <em>None</em>
                </MenuItem>
                {type && type.map((type) => {
                    return <MenuItem key={type.id} value={type.id}>{type.name}</MenuItem>
                })}
            </Select>
        </div>
    )
}

export function Agent({ value, onChange, agents }) {
    return(
        <div>
            <p>Agent</p>
            <Select
                displayEmpty
                value={value}
                onChange={onChange}
            >
                <MenuItem value="">
                    <em>None</em>
                </MenuItem>
                {agents && agents.map((agent) => {
                    return <MenuItem key={agent.id} value={agent.id}>{agent.name}</MenuItem>
                })}
            </Select>
        </div>
    )
}