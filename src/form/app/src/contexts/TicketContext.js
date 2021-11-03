import { useState, useEffect, createContext } from 'react'
import toast from 'react-hot-toast'
import axios from 'axios'

export const TicketContext = createContext()

const TicketContextProvider = (props) => {
    const [ticket, setTicket] = useState([])
    const [type, setType] = useState([])
    const [category, setCategory] = useState([])
    const [totalPages, setTotalPages] = useState()

    useEffect(() => {
        takeTickets()
    }, [])

    useEffect(() => {
        takeType()
    }, [])

    useEffect(() => {
        takeCategory()
    }, [])

    const takeTickets = async (page = 1) => {
        const ticket = await fetchTickets(page)
        setTicket(ticket)
        setTotalPages(parseInt(ticket[1]))
    }

    const fetchTickets = async (page) => {
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

    const takeType = async () => {
        const type = await fetchType()
        setType(type)
    }

    const fetchType = async () => {
        let data
        await axios.get(`${helpdesk_form.url}wp/v2/ticket_type/`)
            .then( (res) => {
                data = res.data
            })

        return data
    }

    const takeCategory = async () => {
        const category = await fetchCategory()
        setCategory(category)
    }

    const fetchCategory = async () => {
        let data
        await axios.get(`${helpdesk_form.url}wp/v2/ticket_category/`)
            .then( (res) => {
                data = res.data
            })

        return data
    }

    const createTicket = async (data) => {
        const config = {
            headers: {
              'X-WP-Nonce': helpdesk_form.nonce,
              'Content-Type': 'multipart/form-data',
            }
        }

        await axios.post(`${helpdesk_form.url}helpdesk/v1/tickets`, data, config)
        .then(function () {
            toast('Created.', {
                duration: 2000,
                icon: '✅',
                style: {
                    marginTop: 50
                },
            })
        })
        .catch(function (err) {
            toast('Couldn\'t create.', {
                duration: 2000,
                icon: '❌',
                style: {
                    marginTop: 50
                },
            })
            console.log(err)
        })

        takeTickets()
    }

    return (
        <TicketContext.Provider value={{ createTicket, type, category }}>
            {props.children}
        </TicketContext.Provider>
    )
}

export default TicketContextProvider
