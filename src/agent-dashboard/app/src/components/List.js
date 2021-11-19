import { useContext, useState } from 'react'
import { TicketContext } from '../contexts/TicketContext'
import { FiltersContext } from '../contexts/FiltersContext'
import Pagination from '@mui/material/Pagination';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import { Link } from "react-router-dom";

const List = () => {
    const { ticket, totalPages, takeTickets } = useContext(TicketContext)
    const { filters } = useContext(FiltersContext)
    const [page, setPage] = useState(1);

    const handleChange = (event, value) => {
        setPage(value);
        takeTickets(value, filters)
    };

    const theme = createTheme({
        palette: {
            primary: {
                main: '#0051af'
            }
        }
    });

    return (
        <ThemeProvider theme={theme}>
            <div className="helpdesk-tickets-list">
                {ticket && ticket.map((ticket) => {
                    return (
                        <div key={ticket.id} className="helpdesk-ticket">
                            <Link to={`/ticket/${ticket.id}`}>
                                <h4 className="ticket-title primary">{ticket.title.rendered}</h4>
                            </Link>
                            <div className="ticket-meta">
                                <div className="helpdesk-username">By: {ticket.user}</div>
                                <div className="helpdesk-category">in: {ticket.category}</div>
                                <div className="helpdesk-type">Type: {ticket.type}</div>
                            </div>
                        </div>
                    )
                })}
                <Stack spacing={2}>
                    <Pagination count={totalPages} page={page} color="primary" shape="rounded" onChange={handleChange}/>
                </Stack>
            </div>
        </ThemeProvider>
    )
}

export default List
