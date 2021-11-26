import { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import { Outlet, Link } from "react-router-dom";
import axios from 'axios'
import toast from 'react-hot-toast'
import { Toaster } from 'react-hot-toast'
import Properties from '../components/Properties';
import TextEditor from '../../../../user-dashboard/app/src/components/editor/Editor';
import { Image } from 'antd';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

const InputMedia = styled('input')({
    display: 'none',
});

const Ticket = () => {
    const [singleTicket, setSingleTicket] = useState(null)
    const [replies, setReplies] = useState(null)
    const [reply, setReply] = useState('')
    const [pictures, setPictures] = useState([])

    let params = useParams();

    useEffect(() => {
        takeTicket()
    }, [])

    useEffect(() => {
        takeReplies()
    }, [])

    const handleReplyChange = (reply) => {
        setReply(reply)
    }

    const handlePicturesChange = (e) => {
        setPictures(e.target.files[0])
    }

    const takeTicket = async () => {
        const ticket = await fetchSingleTicket(params.ticketId)
        setSingleTicket(ticket)
    }

    const fetchSingleTicket = async (id) => {
        let data
        await axios.get(`${helpdesk_agent_dashboard.url}wp/v2/ticket/${id}`)
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
                'X-WP-Nonce': helpdesk_agent_dashboard.nonce,
            }
        }

        let data
        await axios.get(`${helpdesk_agent_dashboard.url}helpdesk/v1/replies/?parent=${id}`, config)
            .then( (res) => {
                data = res.data
            })

        return data
    }

    const sendReply = async (data) => {
        const config = {
            headers: {
              'X-WP-Nonce': helpdesk_agent_dashboard.nonce,
              'Content-Type': 'multipart/form-data',
            }
        }

        await axios.post(`${helpdesk_agent_dashboard.url}helpdesk/v1/replies`, data, config)
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
        formData.append("media", pictures);

        sendReply(formData)
        setReply('')
        setPictures([])
        document.querySelector(".helpdesk-editor .ProseMirror").innerHTML = '';
    }

    return (
        <>
            <div className="helpdesk-tickets">
                <Link to="/?page=helpdesk">
                    <span className="helpdesk-back primary">Back</span>
                </Link>
                {singleTicket &&
                    <div className="helpdesk-single-ticket ticket-meta">
                        <h1>{singleTicket.title.rendered}</h1>
                        <div>By: {singleTicket.user}</div>
                        <div>In: {singleTicket.category}</div>
                        <div>Type: {singleTicket.type}</div>
                    </div>
                }
                <div className="helpdesk-add-new-reply helpdesk-submit">
                    <form onSubmit={submitReply}>
                        <TextEditor onChange={handleReplyChange} />
                        <div className="helpdesk-w-50">
                            <p>Image</p>
                            <label htmlFor="contained-button-file">
                                <InputMedia accept="image/*" id="contained-button-file" multiple type="file" onChange={handlePicturesChange} />
                                <Button variant="contained" component="span" className="helpdesk-upload">Upload</Button>
                            </label>
                        </div>
                        <div className="helpdesk-w-50">
                            <div className="helpdesk-submit-btn">
                                <input type="submit" value="Send" />
                            </div>
                        </div>
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
                                {reply.images &&
                                    <div className="ticket-reply-images">
                                        <Image
                                            width={100}
                                            src={reply.images}
                                        />
                                    </div>
                                }
                            </div>
                        )
                    })
                }
                </div>
                <Outlet />
                <Toaster />
            </div>
            <Properties ticket={params.ticketId} ticketContent={singleTicket} />
        </>
    )
}

export default Ticket
