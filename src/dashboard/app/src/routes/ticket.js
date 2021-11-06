import { useContext } from 'react'
import { TicketContext } from '../contexts/TicketContext'
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const Ticket = () => {
    const { getTicket } = useContext(TicketContext)

    let params = useParams();

    return (
        <div>
            <Link to="/">
                Back
            </Link>
            {getTicket(params.ticketId)}
            <h2>Ticket: {params.ticketId}</h2>
        </div>
    )
}

export default Ticket
