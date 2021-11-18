import { useContext, useState } from 'react'
import Button from '@mui/material/Button';
import { TicketContext } from '../contexts/TicketContext';
import { Link } from "react-router-dom";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const MyTickets = () => {
    const {
        ticket,
        takeTickets,
        totalPages
    } = useContext(TicketContext)

    const [page, setPage] = useState(1);

    const handleChange = (event, value) => {
        setPage(value);
        takeTickets(value);
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
            <Link to="add-new-ticket">
                <Button variant="outlined" id="new-ticket">
                    Add new ticket
                </Button>
            </Link>
            {ticket && ticket.map((ticket) => {
                return (
                    <div key={ticket.id} className="helpdesk-ticket">
                        <Link to={`/ticket/${ticket.id}`}>
                            <h4 className="ticket-title primary">{ticket.title.rendered}</h4>
                        </Link>
                        <div className="ticket-meta">
                            <div className="helpdesk-username">{ticket.user}</div>
                            <div className="helpdesk-category">in: {ticket.category}</div>
                            <div className="helpdesk-type">Type: {ticket.type}</div>
                        </div>
                    </div>
                )
            })}
            <Stack spacing={2}>
                <Pagination count={totalPages} page={page} color="primary" shape="rounded" onChange={handleChange}/>
            </Stack>
        </ThemeProvider>
    )
}

export default MyTickets
