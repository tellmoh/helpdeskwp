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

    const takeTickets = async (page = 1) => {
        const ticket = await fetchTickets(page)
        setTicket(ticket[0])
        setTotalPages(parseInt(ticket[1]))
    }

    const fetchTickets = async (page) => {
        let data
        await axios.get(`${helpdesk_dashboard.url}wp/v2/ticket/?page=${page}`)
            .then( (res) => {
                data = [
                    res.data,
                    res.headers['x-wp-totalpages']
                ]
            })

        return data
    }

    return (
        <TicketContext.Provider value={{ ticket, totalPages, takeTickets }}>
            {props.children}
        </TicketContext.Provider>
    )
}

export default TicketContextProvider
