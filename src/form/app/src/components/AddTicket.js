import { useContext } from 'react'
import { TicketContext } from '../contexts/TicketContext'
import { Form, Input, Select, Textarea } from './Components'

const AddTicket = () => {

    const { createTicket } = useContext(TicketContext)
    const onSubmit = (data) => createTicket(data);

    return (
        <Form className="helpdesk-add-ticket" onSubmit={onSubmit}>
            <h4>Submit a ticket</h4>

            <span>Subject</span>
            <Input name="title" type="text" />

            <span>Name</span>
            <Input name="name" type="text" />

            <span>Email</span>
            <Input name="email" type="email" />

            <span>Category</span>
            <Select name="category" options={['theme', 'plugin']} />

            <span>Type</span>
            <Select name="type" options={['Sale', 'Bug']} />

            <span>Description</span>
            <Textarea name="description" />

            <button>Submit</button>
        </Form>
    )
}

export default AddTicket
