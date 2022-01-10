import { __ } from '@wordpress/i18n';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from "react-router-dom";
import Pagination from '@mui/material/Pagination';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Stack from '@mui/material/Stack';

const Customer = () => {
    const [customer, setCustomer] = useState(null)
    const [tickets, setTickets] = useState(null)
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState()

    let params = useParams();

    useEffect(() => {
        getCustomer()
    }, [])

    useEffect(() => {
        takeTickets()
    },[])

    const theme = createTheme({
        palette: {
            primary: {
                main: '#0051af'
            }
        }
    });

    const fetchCustomer = async () => {
        const url = `${helpdesk_agent_dashboard.url}helpdesk/v1/settings/customer/${params.customerId}`

        const config = {
            headers: {
                'X-WP-Nonce': helpdesk_agent_dashboard.nonce,
                'Content-Type': 'application/json',
            }
        }

        let data
        await axios.get(url, config)
            .then( (res) => {
                data = res.data
            })

        return data
    }

    const getCustomer = async () => {
        const customer = await fetchCustomer()
        setCustomer(customer)
    }

    const takeTickets = async (page = 1) => {
        const tickets = await fetchTickets(page)
        setTickets(tickets[0])
        setTotalPages(parseInt(tickets[1]))
    }

    const fetchTickets = async (page) => {
        const url = `${helpdesk_agent_dashboard.url}wp/v2/ticket/?author=${params.customerId}&page=${page}`

        let data
        await axios.get(url)
        .then( (res) => {
            data = [
                res.data,
                res.headers['x-wp-totalpages']
            ]
        })

        return data
    }

    const handleChange = (event, value) => {
        setPage(value);
        takeTickets(value)
    };

    return (
        <div className="helpdesk-main">
            <div className="helpdesk-tickets">
                {tickets && tickets.map((ticket) => {
                    return (
                        <div key={ticket.id} className="helpdesk-ticket" data-ticket-status={ticket.status}>
                            <Link to={`/ticket/${ticket.id}`}>
                                <h4 className="ticket-title primary">{ticket.title.rendered}</h4>
                            </Link>
                            <div className="ticket-meta">
                                <div className="helpdesk-category">{ __( 'In', 'helpdeskwp' ) }: {ticket.category}</div>
                                <div className="helpdesk-type">{ __( 'Type', 'helpdeskwp' ) }: {ticket.type}</div>
                            </div>
                        </div>
                    )
                })}

                <ThemeProvider theme={theme}>
                    <Stack spacing={2}>
                        <Pagination count={totalPages} page={page} color="primary" shape="rounded" onChange={handleChange}/>
                    </Stack>
                </ThemeProvider>
            </div>
            <div className="helpdesk-sidebar">
                <div className="helpdesk-properties">
                    {customer && customer.map((customer) => {
                        return (
                            <div key={customer.id} className="helpdesk-customer-info">
                                <span className="ticket-title primary">
                                    { __( 'Name:', 'helpdeskwp' ) }
                                </span>
                                <p style={{ margin: '5px 0' }}>{customer.name}</p>
                                <br />
                                <span className="ticket-title primary">
                                    { __( 'Email:', 'helpdeskwp' ) }
                                </span>
                                <p style={{ margin: '5px 0' }}>{customer.email}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Customer;
