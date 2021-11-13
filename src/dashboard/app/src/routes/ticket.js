import { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import { Outlet, Link } from "react-router-dom";
import axios from 'axios'
import toast from 'react-hot-toast'
import { Toaster } from 'react-hot-toast'
import Properties from '../components/Properties';

const Ticket = () => {
    const [singleTicket, setSingleTicket] = useState(null)
    const [replies, setReplies] = useState(null)
    const [reply, setReply] = useState('')

    let params = useParams();

    useEffect(() => {
        takeTicket()
    }, [])

    useEffect(() => {
        takeReplies()
    }, [])

    const takeTicket = async () => {
        const ticket = await fetchSingleTicket(params.ticketId)
        setSingleTicket(ticket)
    }

    const fetchSingleTicket = async (id) => {
        let data
        await axios.get(`${helpdesk_dashboard.url}wp/v2/ticket/${id}`)
            .then( (res) => {
                data = res.data
            })

        return data
    }

    const takeReplies = async () => {
        const replies = await fetchReplies(params.ticketId)
        setReplies(replies)
    }

    const fetchReplies = async (id) => {
        const config = {
            headers: {
                'X-WP-Nonce': helpdesk_dashboard.nonce,
            }
        }

        let data
        await axios.get(`${helpdesk_dashboard.url}helpdesk/v1/replies/?parent=${id}`, config)
            .then( (res) => {
                data = res.data
            })

        return data
    }

    const sendReply = async (data) => {
        const config = {
            headers: {
              'X-WP-Nonce': helpdesk_dashboard.nonce,
              'Content-Type': 'multipart/form-data',
            }
        }

        await axios.post(`${helpdesk_dashboard.url}helpdesk/v1/replies`, data, config)
        .then(function () {
            toast('Sent.', {
                duration: 2000,
                style: {
                    marginTop: 50
                },
            })
        })
        .catch(function (err) {
            toast('Couldn\'t send the reply.', {
                duration: 2000,
                icon: '❌',
                style: {
                    marginTop: 50
                },
            })
            console.log(err)
        })

        takeReplies()
    }

    const submitReply = (event) => {
        event.preventDefault()

        let formData = new FormData();
        formData.append("reply", reply);
        formData.append("parent", params.ticketId);

        sendReply(formData)
        setReply('')
    }

    return (
        <>
            <div className="helpdesk-tickets">
                <Link to="/?page=helpdesk">
                    Back
                </Link>
                {singleTicket &&
                    <div className="helpdesk-single-ticket">
                        <h1>{singleTicket.title.rendered}</h1>
                        <div>By: {singleTicket.user}</div>
                        <div>In: {singleTicket.category}</div>
                        <div>Type: {singleTicket.type}</div>
                    </div>
                }
                <div className="helpdesk-add-new-reply">
                    <form onSubmit={submitReply}>
                        <textarea name="reply" rows="10" value={reply} onChange={(e) => setReply(e.target.value)}></textarea>
                        <input type="submit" value="Send" />
                    </form>
                </div>
                <div className="helpdesk-ticket-replies">
                {replies &&
                    replies.map((reply) => {
                        return (
                            <div key={reply.id} className="ticket-reply">
                                <span className="by-name">{reply.author}</span>
                                <div className="ticket-reply-body">
                                    {reply.reply &&
                                        <div dangerouslySetInnerHTML={{__html: reply.reply}} />
                                    }
                                </div>
                            </div>
                        )
                    })
                }
                </div>
                <Outlet />
                <Toaster />
            </div>
            <Properties ticket={params.ticketId} />
        </>
    )
}

export default Ticket
