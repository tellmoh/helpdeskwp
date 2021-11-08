import { useContext, useState } from 'react'
import { TicketContext } from '../contexts/TicketContext'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { Link } from "react-router-dom";

const List = () => {
    const { ticket, totalPages, takeTickets } = useContext(TicketContext)
    const [page, setPage] = useState(1);
    const handleChange = (event, value) => {
        setPage(value);
        takeTickets(value)
    };

    return (
        <div className="helpdesk-tickets">
            {ticket && ticket.map((ticket) => {
                return (
                    <div key={ticket.id} className="helpdesk-ticket">
                        <Link to={`/ticket/${ticket.id}`}>
                            <h4 className="ticket-title">{ticket.title.rendered}</h4>
                        </Link>
                        <div className="helpdesk-username">{ticket.user}</div>
                        <div className="helpdesk-category">in: {ticket.category}</div>
                        <div className="helpdesk-type">Type: {ticket.type}</div>
                    </div>
                )
            })}
            <Stack spacing={2}>
                <Pagination count={totalPages} page={page} color="primary" onChange={handleChange}/>
            </Stack>
        </div>
    )
}

export default List
