import { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import { Outlet, Link } from "react-router-dom";
import axios from 'axios'
import toast from 'react-hot-toast'
import { Toaster } from 'react-hot-toast'

const Ticket = () => {
    const [singleTicket, setSingleTicket] = useState(null)
    const [comments, setComments] = useState(null)
    const [comment, setComment] = useState('')

    let params = useParams();

    useEffect(() => {
        takeTicket()
    }, [])

    useEffect(() => {
        takeComments()
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

    const takeComments = async () => {
        const comments = await fetchComments(params.ticketId)
        setComments(comments)
    }

    const fetchComments = async (id) => {
        let data
        await axios.get(`${helpdesk_dashboard.url}wp/v2/comments?post=${id}&?per_page=9999`)
            .then( (res) => {
                data = res.data
            })

        return data
    }

    const sendComment = async (data) => {
        const config = {
            headers: {
              'X-WP-Nonce': helpdesk_dashboard.nonce,
              'Content-Type': 'application/json',
            }
        }

        const commentData = {
            'content': data,
            'author': '1',
            'post': params.ticketId,
            'status': 'approve'
        }

        await axios.post(`${helpdesk_dashboard.url}wp/v2/comments`, JSON.stringify(commentData), config)
        .then(function () {
            toast('Sent.', {
                duration: 2000,
                style: {
                    marginTop: 50
                },
            })
        })
        .catch(function (err) {
            toast('Couldn\'t send the comment.', {
                duration: 2000,
                icon: '❌',
                style: {
                    marginTop: 50
                },
            })
            console.log(err)
        })

        takeComments()
    }

    const submitComment = (event) => {
        event.preventDefault()

        sendComment(comment)
        setComment('')
    }

    return (
        <div>
            <Link to="/">
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
            <div className="helpdesk-ticket-comments">
            {comments &&
                comments.map((comment) => {
                    return (
                        <div key={comment.id} className="ticket-comment">
                            <span className="by-name">{comment.author_name}</span>
                            <div className="ticket-comment-body">
                                {comment.content.rendered &&
                                    <div className="ticket-comment-content">
                                        {comment.content.rendered}
                                    </div>
                                }
                            </div>
                        </div>
                    )
                })
            }
            </div>
            <div className="helpdesk-add-new-comment">
                <form onSubmit={submitComment}>
                    <textarea name="comment" rows="10" value={comment} onChange={(e) => setComment(e.target.value)}></textarea>
                    <input type="submit" value="Send" />
                </form>
            </div>
            <Outlet />
            <Toaster />
        </div>
    )
}

export default Ticket
