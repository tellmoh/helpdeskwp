import { useContext, useState } from 'react'
import { TicketContext } from '../contexts/TicketContext'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const List = () => {
    const { ticket, totalPages, takeTickets } = useContext(TicketContext)
    const [page, setPage] = useState(1);
    const handleChange = (event, value) => {
        setPage(value);
        takeTickets(value)
    };

    const tickets = ticket.map((ticket) => {
        return (
            <div key={ticket.id} className="helpdesk-ticket">
                <h4 className="ticket-title">{ticket.title.rendered}</h4>
                <div className="helpdesk-username">{ticket.user}</div>
                <div className="helpdesk-category">in: {ticket.category}</div>
            </div>
        )
    })

    return (
        <>
            {tickets}
            <Stack spacing={2}>
                <Pagination count={totalPages} page={page} color="primary" onChange={handleChange}/>
            </Stack>
        </>
    )
}

export default List