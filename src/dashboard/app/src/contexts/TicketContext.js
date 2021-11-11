import { useState, useEffect, createContext } from 'react'
import toast from 'react-hot-toast'
import axios from 'axios'

export const TicketContext = createContext()

const TicketContextProvider = (props) => {
    const [ticket, setTicket] = useState([])
    const [totalPages, setTotalPages] = useState()

    useEffect(() => {
        takeTickets()
    }, [])

    const takeTickets = async (page = 1, filters) => {
        const ticket = await fetchTickets(page, filters)
        setTicket(ticket[0])
        setTotalPages(parseInt(ticket[1]))
    }

    const fetchTickets = async (page, filters) => {

        var url

        if ( filters ) {
            const category = filters.category ? `&ticket_category=${filters.category}` : ''
            const type = filters.type ? `&ticket_type=${filters.type}` : ''
            const agent = filters.agent ? `&author=${filters.agent}` : ''
            const priority = filters.priority ? `&ticket_priority=${filters.priority}` : ''
            const status = filters.status ? `&ticket_status=${filters.status}` : ''

            url = `${helpdesk_dashboard.url}wp/v2/ticket/?page=${page}${category}${type}${status}${priority}${agent}`

        } else {
            url = `${helpdesk_dashboard.url}wp/v2/ticket/?page=${page}`
        }

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

    const applyFilters = ( filters ) => {
        takeTickets(1, filters)
    }

    return (
        <TicketContext.Provider value={{ ticket, totalPages, takeTickets, applyFilters }}>
            {props.children}
        </TicketContext.Provider>
    )
}

export default TicketContextProvider
