import { useState, useEffect, createContext } from 'react'
import toast from 'react-hot-toast'
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

    const createTicket = async (data) => {
        const config = {
            headers: {
              'X-WP-Nonce': helpdesk_form.nonce,
              'Content-Type': 'application/json'
            }
        }

        await axios.post(`${helpdesk_form.url}helpdesk/v1/tickets`, JSON.stringify(data), config)
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

        takeForm()
    }

    return (
        <TicketContext.Provider value={{ createTicket }}>
            {props.children}
        </TicketContext.Provider>
    )
}

export default TicketContextProvider
