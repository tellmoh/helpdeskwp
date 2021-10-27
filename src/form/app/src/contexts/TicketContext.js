import { useState, useEffect, createContext } from 'react'
import axios from 'axios'

export const TicketContext = createContext()

const TicketContextProvider = (props) => {
    const [ticket, setTicket] = useState([])
    const [totalPages, setTotalPages] = useState()

    useEffect(() => {
        takeForm()
    }, [])

    const takeForm = async (page = 1) => {
        const ticket = await fetchForm(page)
        setTicket(ticket)
        setTotalPages(parseInt(ticket[1]))
    }

    const fetchForm = async (page) => {
        let data
        await axios.get(`${helpdesk_form.url}wp/v2/ticket/?page=${page}`)
            .then( (res) => {
                data = [
                    res.data,
                    res.headers['x-wp-totalpages']
                ]
            })

        return data
    }

    return (
        <TicketContext.Provider value={{}}>
            {props.children}
        </TicketContext.Provider>
    )
}

export default TicketContextProvider
