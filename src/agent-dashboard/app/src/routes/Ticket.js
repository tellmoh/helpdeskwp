import { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import { Outlet, Link } from "react-router-dom";
import axios from 'axios'
import toast from 'react-hot-toast'
import { Toaster } from 'react-hot-toast'
import Properties from '../components/Properties';
import TextEditor from '../../../../user-dashboard/app/src/components/editor/Editor';
import Image from '../../../../user-dashboard/app/src/components/Image';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

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

    const deleteReply = async (id) => {
        const config = {
            headers: {
                'X-WP-Nonce': helpdesk_agent_dashboard.nonce,
            }
        }

        await axios.delete(`${helpdesk_agent_dashboard.url}helpdesk/v1/replies/${id}`, config)
        .then(function (res) {
            console.log(res.statusText)
        })
        .catch(function (err) {
            console.log(err)
        })

        takeReplies()
    }

    const handleDelete = (id) => {
        MySwal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Delete',
            cancelButtonText: 'Cancel',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                deleteReply(id)
                MySwal.fire(
                    'Deleted',
                    '',
                    'success'
                )
            } else if (
                result.dismiss === Swal.DismissReason.cancel
            ) {
            MySwal.fire(
                'Cancelled',
                '',
                'error'
                )
            }
        })
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
                                <div className="helpdesk-delete-reply">
                                    <Button onClick={(e) => handleDelete(reply.id)}>
                                        <svg width="20" fill="#0051af" className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium MuiBox-root css-1om0hkc" focusable="false" viewBox="0 0 24 24" aria-hidden="true" data-testid="DeleteForeverOutlinedIcon"><path d="M14.12 10.47 12 12.59l-2.13-2.12-1.41 1.41L10.59 14l-2.12 2.12 1.41 1.41L12 15.41l2.12 2.12 1.41-1.41L13.41 14l2.12-2.12zM15.5 4l-1-1h-5l-1 1H5v2h14V4zM6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9z"></path></svg>
                                    </Button>
                                </div>
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
