import Select from 'react-select';

export function Category({ onChange, category }) {
    let cat = [{ value: '', label: 'None' }];

    {category && category.map((category) => {
        cat.push({ value: category.id, label: category.name });
    })}
    const local = JSON.parse(localStorage.getItem('Category'))
    return(
        <div>
            <p>Category</p>
            <Select
                defaultValue={local}
                onChange={onChange}
                options={cat}
            />
        </div>
    )
}

export function Priority({ onChange, priority }) {
    let pri = [{ value: '', label: 'None' }];

    {priority && priority.map((priority) => {
        pri.push({ value: priority.id, label: priority.name });
    })}
    const local = JSON.parse(localStorage.getItem('Priority'))
    return(
        <div>
            <p>Priority</p>
            <Select
                defaultValue={local}
                onChange={onChange}
                options={pri}
            />
        </div>
    )
}

export function Status({ onChange, status }) {
    let sta = [{ value: '', label: 'None' }];

    {status && status.map((status) => {
        sta.push({ value: status.id, label: status.name });
    })}
    const local = JSON.parse(localStorage.getItem('Status'))
    return(
        <div>
            <p>Status</p>
            <Select
                defaultValue={local}
                onChange={onChange}
                options={sta}
            />
        </div>
    )
}

export function Type({ onChange, type }) {
    let typ = [{ value: '', label: 'None' }];

    {type && type.map((type) => {
        typ.push({ value: type.id, label: type.name });
    })}
    const local = JSON.parse(localStorage.getItem('Type'))
    return(
        <div>
            <p>Type</p>
            <Select
                defaultValue={local}
                onChange={onChange}
                options={typ}
            />
        </div>
    )
}

export function Agent({ onChange, agents }) {
    let agent = [{ value: '', label: 'None' }];

    {agents && agents.map((agents) => {
        agent.push({ value: agents.id, label: agents.name });
    })}
    const local = JSON.parse(localStorage.getItem('Agent'))
    return(
        <div>
            <p>Agent</p>
            <Select
                defaultValue={local}
                onChange={onChange}
                options={agent}
            />
        </div>
    )
}